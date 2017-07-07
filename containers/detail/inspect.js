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
import Table from '../all-projects/table';

export default class Issue extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let issue = this.props.data.inspect || {};
        let columns = [];
        if(issue && issue.header) {
            columns = issue.header.map(data => {
                let render = null;
                let style = null;
                if(data.key === 'month') {
                    style = {
                        flex: 0.5,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        padding: 16,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1
                    }
                } else if(data.key === 'title' || data.key === 'node') {
                    style = {
                        flex: 3,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        padding: 16,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1
                    }
                }
                return {
                    title: data.title,
                    dataIndex: data.key,
                    key: data.key,
                    render,
                    style
                };
            });
        }
        return (
            <View>
                <Table
                    columns={columns}
                    data={issue.rows || []}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        marginTop: 16
    },
    green: {
        color: '#008000'
    }
});