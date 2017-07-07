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
import Dimensions from 'Dimensions';
import Echarts from 'native-echarts';

export default class Chart extends Component {

    constructor(props) {
        super(props);
    }

    getX = () => {
        let x = [];
        if(this.props.data.invest) {
            let data = this.props.data.invest.rows.map(data => data.label);
            x.push({
                boundaryGap:true,
                type : 'category',
                name : '',
                data
            });
        }
        return x;
    };

    getLegend = () => {
        let legend = [];
        if(this.props.data.invest) {
            legend = this.props.data.invest.header.map(data => data.title);
        }
        return legend;
    };

    getSeries = () => {
        let series = [];
        if(this.props.data.invest) {
            const invest = this.props.data.invest;
            series = invest.header.map(data => {
                let type = 'bar';
                if(data.key === 'annualPlan') type = 'line';
                const itemData = invest.rows.map(row => row[data.key]);
                return {
                    name: data.title,
                    data: itemData,
                    type
                }
            });
        }
        return series;
    };

    render() {
        const option = {
            title: {
                text: '项目月度投资'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                right: 0,
                data: this.getLegend()
            },
            color:['#99FFFF', '#00CCFF', '#3399FF', '#9966FF'],
            xAxis: this.getX(),
            yAxis: [
                {
                    type: 'value',
                    name: ''
                }
            ],
            series: this.getSeries()
        };
        return (
            <View style={styles.container}>
                <Echarts
                    option={option}
                    height={Dimensions.get('window').height - 150}
                    width={Dimensions.get('window').width - 32}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginTop: 16
    }
});