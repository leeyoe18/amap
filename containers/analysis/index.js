/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, ScrollView, View
} from 'react-native';
import Dimensions from 'Dimensions';
import { Flex, Carousel } from 'antd-mobile';
import { get } from '../../services/project';
import Echarts from 'native-echarts';

export default class BaiduMapDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        get('getAnalysis', null, (data) => {
            if(data.pass) {
                this.setState({
                    data: data.data
                });
            }
        });
    }

    isPie = (data) => {
        return data.header.find(data => data.key === 'normal' || data.key === 'doing' || data.key === 'native');
    };

    getLegend = (data) => {
        return data.header.map(data => data.title);
    };

    getX = (data) => {
        if(this.isPie(data)) return false;
        return [{
            boundaryGap:true,
            type : 'category',
            name : '',
            data : data.rows.map(data => data.label)
        }];
    };

    getY = (data) => {
        if(this.isPie(data)) return false;
        return [
            {
                type : 'value',
                name : ''
            }
        ];
    };

    getColor = (index) => {
        switch(index) {
            case 0: return ['#9966FF', '#00CCCC'];
            case 1: return ['#66FF66', '#FF6633'];
            case 2: return ['#66FF66', '#FF6633'];
            case 3: return ['#3399FF', '#66FF66', '#FF6633'];
            case 4: return ['#3399FF', '#00CCFF'];
            case 5: return ['#99FFFF', '#00CCFF', '#3399FF', '#9966FF'];
            default: return ['#99FFFF', '#00CCFF', '#3399FF', '#9966FF'];
        }
    };

    getSeries = (data) => {
        let series = [];
        if(this.isPie(data)) {
            series = [{
                name: data.title,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: this.getData(data),
            }];
        } else {
            series = data.header.map(item => {
                let type = 'bar';
                if(item.key === 'annualPlan') type = 'line';
                const itemData = data.rows.map(row => row[item.key]);
                return {
                    name: item.title,
                    data: itemData,
                    type
                }
            });
        }
        return series;
    };

    getData = (data) => {
        return data.header.map(item => {
            const itemData = data.rows[0][item.key];
            return {
                name: item.title,
                value: itemData,
            }
        });
    };

    getTooltip = (data) => {
        if(this.isPie(data)) {
            return {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            };
        }
        return {
            trigger: 'axis'
        };
    };

    getCharts = () => {
        let charts = null;
        if(this.state.data.length > 0) {
            charts = this.state.data.map((data, index) => {
                const option = {
                    title: {
                        text: data.title,
                        left: 16,
                        top: 16
                    },
                    tooltip : this.getTooltip(data),
                    legend: {
                        right: 16,
                        top: 16,
                        data: this.getLegend(data)
                    },
                    xAxis : this.getX(data),
                    yAxis : this.getY(data),
                    color: this.getColor(index),
                    series : this.getSeries(data)
                };
                return (
                    <View style={styles.body} key={index}>
                        <Echarts
                            option={option}
                            height={Dimensions.get('window').height - 200}
                            width={Dimensions.get('window').width - 32}
                        />
                    </View>
                )
            });
        }
        return charts;
    };

    render() {
        return (
            <Carousel
                style={styles.container}
                autoplay={false}
                swipeSpeed={35}
            >
                {this.getCharts()}
            </Carousel>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    body: {
        padding: 16,
        marginBottom: 16
    }
});