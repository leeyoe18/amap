/**
 * Created by yoe on 2017/7/6.
 */
import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View, TouchableOpacity, ScrollView, ListView} from 'react-native';
import Dimensions from 'Dimensions';

import { Card, Button, SegmentedControl, Icon, Flex, Popup } from 'antd-mobile';

const statusMap = {
    0: '红灯',
    1: '黄灯',
    2: '绿灯',
    3: '蓝灯',
    4: '白灯'
};

class ListsPopup extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds
        };
    }

    toPath = (data) => {
        const { navigate } = this.props.navigation;
        navigate('Detail', {
            path: data.id,
            title: data.name
        });
    };

    hidePopup = () => {
        Popup.hide();
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.ds.cloneWithRows(this.props.data)}
                    renderHeader={(rowData) => (
                        <View style={styles.header}>
                            <Text>项目列表</Text>
                            <TouchableOpacity style={styles.cross} onPress={this.hidePopup}>
                                <Icon type="cross" />
                            </TouchableOpacity>
                        </View>
                    )}
                    renderRow={(rowData) => {
                        return (
                            <Card style={[styles.card]} key={rowData.id}>
                                <Card.Header
                                    title={
                                        <View>
                                            <Text style={styles.cardTitle} onPress={()=>this.toPath(rowData)}>
                                                {rowData.name}
                                            </Text>
                                        </View>
                                    }
                                />
                                <Card.Body>
                                    <TouchableOpacity onPress={()=>this.props.animatedTo(rowData)} style={styles.cardBody}>
                                        <Text style={styles.text}>
                                            年份: {rowData.year}  状态: {statusMap[rowData.status]}
                                        </Text>
                                    </TouchableOpacity>
                                </Card.Body>
                            </Card>
                        )
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height / 2 - 50
    },
    mapType: {
        position: 'absolute',
        top: 16,
        right: 16,
        height: 32,
        width: 140
    },
    cross: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    header: {
        padding: 16
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardText: {
        fontSize: 24,
        textAlign: 'right',
        color: '#ccc'
    },
    cardTitle: {
        color: '#108ee9'
    },
    text: {
        fontSize: 13
    },
    card: {
        padding: 8,
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    marginBottom: {
        marginBottom: 8
    },
    noMarginBottom: {
        marginBottom: 0
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100
    },
    cardBody: {
        padding: 16,
        backgroundColor: 'rgba(153, 204, 255, .3)'
    }
});

export default ListsPopup;