/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text, ScrollView, Image, Modal, TouchableOpacity,
} from 'react-native';
import { Grid, Button, Icon } from 'antd-mobile';
import config from '../../common/html';
import Dimensions from 'Dimensions';
import ImageViewer from 'react-native-image-zoom-viewer';
import { isTablet } from '../../common/device';

export default class Progress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            index: 0
        };
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

        // return (
        //     <View style={styles.flex}>
        //         {
        //             progress.map((data,index) => (
        //                 <View key={index} style={styles.item}>
        //                     <Text>{data.title}</Text>
        //                 </View>
        //             ))
        //         }
        //     </View>
        // );
    };

    showImage = () => {
        this.setState({
            visible: true
        });
    };

    hideImage = () => {
        this.setState({
            visible: false
        });
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Button onClick={this.hideImage}>关闭</Button>
            </View>
        )
    };

    renderArrowLeft = () => {
        if(this.state.index === 0) return null;
        return (
            <View>
                <Icon type={'\ue620'}/>
            </View>
        );
    };

    renderArrowRight = () => {
        if(this.state.index === this.props.data.progress.length - 1) return null;
        return (
            <View>
                <Icon type={'\ue621'}/>
            </View>
        );
    };

    handleChangePage = (index) => {
        this.setState({
            index
        });
    };

    renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity onPress={this.hideImage}>
                    <Text style={styles.footerText}>关闭</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const progress = this.props.data.progress || [];
        const data = progress.map(item => {
            return {
                img: config.html + item.url,
                text: item.title
            };
        });
        const images = progress.map(item => {
            return {
                url: config.html + item.url
            }
        });
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Grid
                    data={data}
                    columnNum={isTablet() ? 3 : 1}
                    hasLine={false}
                    renderItem={(dataItem, index) => (
                        <View key={index} style={styles.imgContainer}>
                            <View style={styles.imgContain}>
                                <TouchableOpacity onPress={this.showImage}>
                                    <Image source={{uri: dataItem.img}} style={styles.img}/>
                                </TouchableOpacity>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            {dataItem.text}
                                        </Text>
                                    </View>

                            </View>
                        </View>
                    )}
                />
                <Modal animationType="slide" visible={this.state.visible} transparent={true}>
                    <ImageViewer
                        imageUrls={images}
                        index={this.state.index}
                        onChange={this.handleChangePage}
                        renderArrowLeft={this.renderArrowLeft}
                        renderArrowRight={this.renderArrowRight}
                        renderFooter={this.renderFooter}
                    />
                </Modal>
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
        width: (Dimensions.get('window').width - 48) / ( isTablet() ? 3 : 1 ) - 42,
        height: isTablet() ? 150 : 300
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 8,
        backgroundColor: 'rgba( 0, 0, 0, .43)',
        height: 64,
        width: (Dimensions.get('window').width - 48) / ( isTablet() ? 3 : 1 )
    },
    text: {
        color: '#fff'
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    headerText: {
        fontSize: 48,
        color: '#fff',
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        bottom: 16,
        left: (Dimensions.get('window').width / 2) - 24
    },
    footerText: {
        color: '#fff',
        fontSize: 24
    }
});