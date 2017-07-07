/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text, ScrollView, Image
} from 'react-native';
import { Grid } from 'antd-mobile';
import Dimensions from 'Dimensions';

export default class Progress extends Component {

    constructor(props) {
        super(props);
    }

    getColumns = () => {
        const progress = this.props.data.progress || [];
        let cols = [];
        let col = [];
        progress.forEach((data, index) => {
            if((index + 1) % 3 === 0 || (index + 1) === progress.length) {
                col.push(
                    <View key={index} style={styles.item}>
                        <Text>{data.title}</Text>
                    </View>
                );
                cols.push(
                    <View key={index} style={styles.flex}>
                        {col}
                    </View>
                );
                col = [];
            } else {
                col.push(
                    <View key={index} style={styles.item}>
                        <Text>{data.title}</Text>
                    </View>
                );
            }
        });
        return cols;

        return (
            <View style={styles.flex}>
                {
                    progress.map((data,index) => (
                        <View key={index} style={styles.item}>
                            <Text>{data.title}</Text>
                        </View>
                    ))
                }
            </View>
        );
    };

    render() {
        const progress = this.props.data.progress || [];
        const data = progress.map(item => {
            return {
                img: 'http://106.15.44.21:3000' + item.url,
                text: item.title
            };
        });
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Grid
                    data={data}
                    columnNum={4}
                    hasLine={false}
                    renderItem={(dataItem, index) => (
                        <View key={index} style={styles.imgContainer}>
                            <View style={styles.imgContain}>
                                <Image source={{uri: dataItem.img}} style={styles.img}/>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        {dataItem.text}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        marginTop: 16
    },
    imgContainer: {
        padding: 8
    },
    imgContain: {
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    img: {
        width: (Dimensions.get('window').width - 48) / 4 - 42,
        height: 150
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,.43)',
        width: (Dimensions.get('window').width - 48) / 4
    },
    text: {
        color: '#fff'
    }
});