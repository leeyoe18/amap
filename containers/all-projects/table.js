/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Text, FlatList, ListView, Platform, PixelRatio
} from 'react-native';
import Dimensions from 'Dimensions';
import { Card, Tabs, List, WingBlank, Flex, Button } from 'antd-mobile';
import { isTablet } from '../../common/device';

const Item = List.Item;

export default class Table extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds
        };
    }

    componentDidMount() {

    }

    renderHeader = () => {
        return (
            <View style={styles.table}>
                <ListView
                    dataSource={this.state.ds.cloneWithRows(this.props.data)}
                    renderHeader={(rowData) => {
                        if(isTablet()) {
                            return (
                                <View style={styles.header} >
                                    {
                                        this.props.columns.map(col => (
                                            <View style={col.style || styles.col} key={col.key} >
                                                <Text>{col.title}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            )
                        } else {
                            return null;
                        }
                    }}
                    renderRow={(rowData) => {
                        if(isTablet()) {
                            return (
                                <View style={styles.row}>
                                    {
                                        this.props.columns.map(col => {
                                            if(col.render) {
                                                return (
                                                    <View style={col.style || styles.col} key={col.key}>
                                                        {col.render(rowData)}
                                                    </View>
                                                )
                                            } else {
                                                return (
                                                    <View style={col.style || styles.col} key={col.key}>
                                                        <Text>{rowData[col.dataIndex]}</Text>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                </View>
                            );
                        } else {
                            return (<List>
                                {
                                    this.props.columns.map(col => {
                                        if(col.render) {
                                            if(col.isBtn) {
                                                return (
                                                    <Item key={col.key}>{col.render(rowData)}</Item>
                                                );
                                            } else {
                                                return (
                                                    <Item extra={col.render(rowData)} key={col.key}>{col.title}</Item>
                                                );
                                            }
                                        } else {
                                            return (
                                                <Item extra={rowData[col.dataIndex]} key={col.key}>{col.title}</Item>
                                            );
                                        }
                                    })
                                }
                            </List>);
                        }
                    }}
                    renderSeparator={this._renderSeperator}
                />
            </View>
        );
    };

    _renderSeperator = (sectionID, rowID) => {
        if(isTablet() || rowID == this.props.data.length - 1) {
            return null;
        }
        return (
            <View style={styles.seperator} key={sectionID}/>
        );
    };

    render() {
        return (
            <View>
                {this.renderHeader()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    total: {
        flex: 6,
        marginRight: 8
    },
    list: {
        flex: 1
    },
    yes: {
        color: 'green'
    },
    header: {
        backgroundColor: '#f7f7f7',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    long: {
        flex: 2,
        flexDirection: 'column',
    },
    table: {
        padding: 0
    },
    seperator: {
        height: 16,
        backgroundColor: '#efefef'
    }
});