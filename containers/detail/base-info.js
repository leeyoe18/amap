/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text, ScrollView
} from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile';
import Dimensions from 'Dimensions';

const Item = Flex.Item;

export default class BaseInfo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let data = this.props.data.info || [];
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {data.map((item, index) => {
                    if(item.length > 1) {
                        return (
                            <Flex key={index} style={styles.flex}>
                                <Item style={styles.label}>
                                    <Text style={styles.padding}>{item[0].label}</Text>
                                </Item>
                                <Item style={styles.value}>
                                    <Text style={styles.padding}>{item[0].value}</Text>
                                </Item>
                                <Item style={styles.label}>
                                    <Text style={styles.padding}>{item[1].label}</Text>
                                </Item>
                                <Item style={styles.value}>
                                    <Text style={styles.padding}>{item[1].value}</Text>
                                </Item>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} style={styles.flex}>
                                <Item style={styles.label}>
                                    <Text style={styles.padding}>{item[0].label}</Text>
                                </Item>
                                <Item style={styles.long}>
                                    <Text style={styles.padding}>{item[0].value}</Text>
                                </Item>
                            </Flex>
                        )
                    }
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        marginTop: 16
    },
    label: {
        flex: 1,
        backgroundColor: '#ececec'
    },
    value: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    long: {
        flex: 3,
        backgroundColor: '#f5f5f5'
    },
    flex: {
        marginBottom: 8
    },
    padding: {
        padding: 16
    }
});