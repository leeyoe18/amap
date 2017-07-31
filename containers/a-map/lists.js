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

class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    toPath = (data) => {
        const { navigate } = this.props.navigation;
        navigate('Detail', {
            path: data.id,
            title: data.name
        });
    };

    render() {
        const cards = this.props.data.map((data,index) => (
            <Card style={[styles.card, this.props.data.length === index + 1 ? styles.noMarginBottom : styles.marginBottom]} key={data.id}>
                <Card.Header
                    title={
                        <Text style={styles.cardTitle} onPress={()=>this.toPath(data)}>
                            {data.name}
                        </Text>
                    }
                />
                <Card.Body>
                    <Text style={styles.text}>年份: {data.year}</Text>
                    <Text style={styles.text}>状态: {statusMap[data.status]}</Text>
                    <Flex>
                        <Flex.Item>
                            <Button
                                size="small"
                                style={styles.btn}
                                onClick={()=>this.props.animatedTo(data)}
                            >
                                定位
                            </Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button
                                size="small"
                                style={styles.btn}
                                onClick={()=>this.toPath(data)}
                            >
                                详情
                            </Button>
                        </Flex.Item>
                    </Flex>
                </Card.Body>
            </Card>
        ));

        return (
            <View style={styles.scroll}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {cards}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        // overflow: 'visible',
        position: 'absolute',
        top: 64,
        width: 240,
        left: 16,
        maxHeight: Dimensions.get('window').height - 300,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    scrollView: {
        overflow: 'visible'
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
        width: 100
    }
});

export default Lists;