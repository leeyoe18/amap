/**
 * Created by yoe on 2017/7/6.
 */
import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';
import Dimensions from 'Dimensions';

import { Card, Button, SegmentedControl, Icon, Flex, Popup, List } from 'antd-mobile';
import { isTablet } from '../../common/device';

class MapType extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    toggleList = () => {
        Popup.show(<View>
            <List
                renderHeader={this.renderHeader}
            >
                {
                    ['普通', '卫星', '导航'].map((i, index) => (
                        <List.Item key={index}><TouchableOpacity onPress={()=>this.handleValueChange(i)}><Text>{i}</Text></TouchableOpacity></List.Item>
                    ))
                }
            </List>
        </View>, {
            animationType: 'slide-up', maskClosable: true
        });
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text>选择地图类型</Text>
                <TouchableOpacity style={styles.cross} onPress={this.hidePopup}>
                    <Icon type="cross" />
                </TouchableOpacity>
            </View>
        )
    };

    handleValueChange = (value) => {
        this.props.onValueChange(value);
        this.hidePopup();
    };

    hidePopup = () => {
        Popup.hide();
    };

    render() {
        if(isTablet()) {
            return (
                <View style={styles.mapType}>
                    <SegmentedControl
                        values={['普通', '卫星', '导航']}
                        onValueChange={this.props.onValueChange}
                    />
                </View>
            );
        }
        return (
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <TouchableOpacity  onPress={this.toggleList} >
                        <Icon type={'\ue649'}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mapType: {
        position: 'absolute',
        top: 16,
        right: 16,
        height: 32,
        width: 140
    },
    buttons: {
        position: 'absolute',
        right: 16,
        top: 16,
        height: 64,
        width: 42
    },
    button: {
        padding: 8,
        borderRadius: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    cross: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    header: {
        padding: 16
    }
});

export default MapType;