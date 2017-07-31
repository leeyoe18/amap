/**
 * Created by yoe on 2017/7/6.
 */
import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';
import Dimensions from 'Dimensions';

import { Card, Button, SegmentedControl, Icon, Flex } from 'antd-mobile';

const statusMap = {
    0: '红灯',
    1: '黄灯',
    2: '绿灯',
    3: '蓝灯',
    4: '白灯'
};

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            markerData: {}
        };
    }

    render() {
        return (
            <View style={styles.tip}>
                <Card>
                    <Card.Header
                        title={
                            <Text style={styles.cardTitle} onPress={this.props.toPath}>
                                {this.props.markerData.name}
                            </Text>
                        }
                        extra={
                            <TouchableOpacity onPress={this.props.hideCard} style={styles.cardExtra}>
                                <Text style={styles.cardText} onClick={this.props.hideCard}>
                                    &times;
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                    <Card.Body>
                        <Flex>
                            <Flex.Item>
                                <Text style={styles.text}>批次: {this.props.markerData.batch}</Text>
                                <Text style={styles.text}>年份: {this.props.markerData.year}</Text>
                                <Text style={styles.text}>关注: {this.props.markerData.isAttention ? '是' : '否'}</Text>
                                <Text style={styles.text}>状态: {statusMap[this.props.markerData.status]}</Text>
                            </Flex.Item>
                            <Flex.Item>
                                <View style={styles.imageBody}>
                                    <Image
                                        style={styles.img}
                                        source={require('../../img/gc1.jpg')}
                                    />
                                </View>
                            </Flex.Item>
                        </Flex>
                        <View style={styles.btnView}>
                            <Button
                                size="small"
                                style={styles.btn}
                                onClick={this.props.toPath}
                                type="primary"
                            >
                                详情
                            </Button>
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tip: {
        position: 'absolute',
        top: 72,
        right: 48,
        width: 300,
        height: 300
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
        marginLeft: 16,
        marginBottom: 8
    },
    cardExtra: {
        height: 16,
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    btn: {
        marginTop: 8
    },
    img: {
        width: 120,
        height: 100
    },
    imageBody: {
        padding: 8
    },
    btnView: {
        paddingHorizontal: 16
    }
});

export default Info;