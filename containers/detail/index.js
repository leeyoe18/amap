/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text
} from 'react-native';
import Dimensions from 'Dimensions';
import { Tabs, Toast } from 'antd-mobile';
import { get } from '../../services/project';
import BaseInfo from './base-info';
import Status from './node-status';
import Issue from './issue';
import Inspect from './inspect';
import AMap from '../a-map';
import Invest from './invest';
import Progress from './progress';

const TabPane = Tabs.TabPane;

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        Toast.loading('Loading...', 0);
        const { navigate, state } = this.props.navigation;
        get('getProject/' + state.params.path, null, (data) => {
            Toast.hide();
            if(data.pass) {
                this.setState({
                    data: data.data
                });
            }
        });
    }

    render() {
        const mapData = [];
        if(this.state.data.geo) {
            mapData[0] = this.state.data.geo;
        }
        return (
            <View style={styles.container}>
                <Tabs>
                    <TabPane tab="基础信息" key="baseInfo">
                        <BaseInfo data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="工作进度" key="progress">
                        <Progress data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="项目月度投资" key="month">
                        <Invest data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="项目节点状态" key="node">
                        <Status data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="项目问题" key="problem">
                        <Issue data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="项目督查" key="ducha">
                        <Inspect data={this.state.data}/>
                    </TabPane>
                    <TabPane tab="项目地理位置" key="location">
                        <View style={styles.map}>
                            <AMap
                                data={mapData}
                                mapStyle={styles.mapStyle}
                            />
                        </View>
                    </TabPane>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        overflow: 'scroll',
        backgroundColor: '#fff'
    },
    map: {
        height: Dimensions.get('window').height - 60
    },
    mapStyle: {
        marginTop: 16,
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').height - 170
    }
});