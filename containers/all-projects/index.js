/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text, TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import { Card, Tabs, List, WingBlank, Flex, SegmentedControl, Button, Toast, Icon, Popup } from 'antd-mobile';
import { get } from '../../services/project';
import AMap from '../a-map';
import Table from './table';
import { isTablet } from '../../common/device';

const Item = List.Item;

export default class AllProjects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            activeKey: 'all',
            mapData: [],
            type: 'map',
            index: 0
        };
    }

    componentWillMount() {
        Toast.loading('Loading...', 0);
    }

    componentDidMount() {
        get('getProjects', null, (data) => {
            Toast.hide();
            if(data.pass) {
                this.setState({
                    data: data.data,
                    header: data.data.header,
                    mapData: data.data.rows
                });
                // this.props.setTotal(data.data.rows.length);
            }
        });
    }

    getYears = (data) => {
        let results = {};
        if(data.rows) {
            data.rows.forEach(item => {
                const year = item.year;
                if(!results[year]) {
                    results[year] = [item];
                } else {
                    results[year].push(item);
                }
            });
        }
        return results;
    };

    onChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        if(index === 0) {
            this.setState({
                mapData: this.state.data.rows
            });
        } else {
            const years = this.getYears(this.state.data);
            const year = Object.keys(years)[index - 1];
            this.setState({
                mapData: years[year]
            });
        }
    };

    onChangeType = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        if(index === 0) {
            this.setState({
                type: 'map'
            });
        } else {
            this.setState({
                type: 'table'
            });
        }
    };

    handleClick = (data) => {
        const { navigate } = this.props.navigation;
        navigate('Detail', {
            path: data.id,
            title: data.name
        });
    };

    handleValueChange = (index) => {
        if(index === 0) {
            this.setState({
                mapData: this.state.data.rows,
                index
            });
        } else {
            const years = this.getYears(this.state.data);
            const year = Object.keys(years)[index - 1];
            this.setState({
                mapData: years[year],
                index
            });
        }
        Popup.hide();
    };

    showItems = () => {
        const years = this.getYears(this.state.data);
        let total = 0;
        if(this.state.data.rows) total = this.state.data.rows.length;
        const items = [`全部 (${total})`];
        for(const year of Object.keys(years)) {
            const item = years[year];
            items.push(`${year} (${item.length})`);
        }
        Popup.show(<View>
            <List>
                {
                    items.map((i, index) => (
                        <List.Item key={index}>
                            <TouchableOpacity onPress={()=>this.handleValueChange(index)}>
                                <Text style={this.state.index === index ? styles.activeText : null}>
                                    {i}
                                </Text>
                            </TouchableOpacity>
                        </List.Item>
                    ))
                }
            </List>
        </View>, {
            animationType: 'slide-down', maskClosable: true
        });
    };

    render() {
        const years = this.getYears(this.state.data);
        let total = 0;
        if(this.state.data.rows) total = this.state.data.rows.length;
        const items = [`全部 (${total})`];
        for(const year of Object.keys(years)) {
            const item = years[year];
            items.push(`${year} (${item.length})`);
        }
        let type = (
            <View>
                <Text>正在加载数据</Text>
            </View>
        );
        if(total > 0) {
            type = (
                <AMap
                    data={this.state.mapData}
                    navigation={this.props.navigation}
                />
            );
        }
        if(this.state.type === 'table') {
            const columns = this.state.header.map(data => {
                let render = null;
                if(data.key === 'isAttention') {
                    render = (rowData) => {
                        return <Text style={rowData.isAttention? styles.green : ''}>{rowData.isAttention ? '是' : '否'}</Text>;
                    };
                } else if(data.key === 'long' || data.key === 'lat') {
                    render = (rowData) => {
                        return <Text>{(rowData[data.key]).toFixed(4)}</Text>;
                    }
                } else if(data.key === 'status') {
                    render = (rowData) => {
                        return <View style={styles['style' + rowData.status]} />;
                    }
                }
                return {
                    title: data.title,
                    dataIndex: data.key,
                    key: data.key,
                    render
                };
            });
            columns.push({
                title: 'Action',
                key: 'Action',
                isBtn: true,
                render: (data) => (
                    <Button style={styles.btn} onClick={() => {this.handleClick(data)}}>
                        详情
                    </Button>
                )
            });
            type = (
                <View style={styles.table}>
                    <Table
                        columns={columns}
                        data={this.state.mapData}
                        header={this.state.header}
                    />
                </View>
            );
        }
        return (
            <Card style={styles.card}>
                <Card.Body>
                    <WingBlank style={styles.toolbar}>
                        <Flex>
                            <Flex.Item style={styles.total}>
                                {
                                    isTablet() ? (
                                        <SegmentedControl
                                            selectedIndex={0}
                                            values={items}
                                            onChange={this.onChange}
                                        />
                                    ) : <Button style={styles.btns} onClick={this.showItems}>{items[this.state.index]}</Button>
                                }
                            </Flex.Item>
                            <Flex.Item>
                                <SegmentedControl
                                    selectedIndex={0}
                                    values={['地图', '表格']}
                                    onChange={this.onChangeType}
                                />
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                    {type}
                </Card.Body>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: Dimensions.get('window').height - 70
    },
    toolbar: {
        marginBottom: 12
    },
    total: {
        flex: isTablet() ? 6 : 1,
        marginRight: 8
    },
    style0: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        backgroundColor: '#e62424',
        borderColor: '#ccc'
    },
    style1: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        backgroundColor: '#fdfd09',
        borderColor: '#ccc'
    },
    style2: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        backgroundColor: '#18ef57',
        borderColor: '#ccc'
    },
    style3: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        backgroundColor: '#266fea',
        borderColor: '#ccc'
    },
    style4: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        backgroundColor: '#fff',
        borderColor: '#ccc'
    },
    status: {
        width: 60,
        flexDirection: 'column',
    },
    btn: {
        width: 70,
        height: 30
    },
    green: {
        color: '#008000'
    },
    table: {
        height: Dimensions.get('window').height - 190,
        paddingBottom: 32
    },
    btns: {
        height: 30
    },
    activeText: {
        color: '#3b99fc'
    }
});