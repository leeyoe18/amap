/**
 * Created by yoe on 2017/7/6.
 */
import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d';
import Dimensions from 'Dimensions';

import { Popover, Card, Button, SegmentedControl, Icon } from 'antd-mobile';
import Lists from './lists';

const statusMap = {
    0: '#e62424',
    1: '#fdfd09',
    2: '#18ef57',
    3: '#266fea',
    4: '#fff'
};

class AMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapType: 'standard',
            showsBuildings: true,
            listVisible: false
        };
    }

    onChangeMapType = (value) => {
        if(value === '普通') {
            this.setState({
                mapType: 'standard'
            });
        } else if(value === '卫星'){
            this.setState({
                mapType: 'satellite'
            });
        } else if(value === '导航'){
            this.setState({
                mapType: 'navigation'
            });
        }
    };

    _animatedTo = (data) => {
        this.mapView.animateTo({
            coordinate: {
                latitude: data.latitude || data.lat,
                longitude: data.longitude || data.long,
            }
        })
    };

    toggleList = () => {
        this.setState({
            listVisible: !this.state.listVisible
        });
    };

    render() {
        const markers = this.props.data.map(data => {
            return {
                longitude: data.long,
                latitude: data.lat,
                title: data.name,
                data: data
            };
        });
        let center = {
            longitude: 113.981718,
            latitude: 22.542449
        };
        let markerViews = null;
        if(markers.length > 0) {
            center = markers[0];
            markerViews = markers.map((marker,index) => (
                <Marker
                    title={marker.title}
                    icon={() =>
                        <View style={styles.customIcon}>
                            <Image style={[styles.customIcon, {tintColor: statusMap[marker.data.status]}]} source={require('../../img/marker.png')}/>
                        </View>
                    }
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                    key={index}
                    onPress={() => this._animatedTo(marker)}
                >
                    <View style={styles.customInfoWindow}>
                        <Text>{marker.title}</Text>
                    </View>
                </Marker>
            ))
        }
        let list = null;
        if(this.state.listVisible) {
            list = (
                <Lists {...this.props} animatedTo={this._animatedTo}/>
            );
        }
        return (
            <View style={styles.container}>
                <MapView
                    locationEnabled
                    mapType={this.state.mapType}
                    showsBuildings={this.state.showsBuildings}
                    showsLocationButton={true}
                    rotateEnabled={false}
                    zoomLevel={12}
                    coordinate={center}
                    style={this.props.mapStyle || styles.map}
                    ref={ref => this.mapView = ref}
                >
                    {markerViews}
                </MapView>
                <View style={styles.mapType}>
                    <SegmentedControl
                        values={['普通', '卫星', '导航']}
                        onValueChange={this.onChangeMapType}
                    />
                </View>
                {
                    this.props.navigation ? (
                        <View style={styles.buttons}>
                            <View style={styles.button}>
                                <TouchableOpacity  onPress={this.toggleList} >
                                    <Icon type={'\ue639'} color={this.state.listVisible ? '#108ee9' : '#666'}/>
                                </TouchableOpacity>
                            </View>
                        </View>) : null
                }
                {list}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 210
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 1,
        elevation: 4
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 1,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
    mapType: {
        position: 'absolute',
        top: 16,
        right: 64,
        height: 32,
        width: 140
    },
    buttons: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        flexDirection: 'row',
        left: 16,
        top: 16
    },
    button: {
        padding: 8,
        borderRadius: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    scroll: {
        // overflow: 'visible',
        position: 'absolute',
        top: 64,
        width: 240,
        left: 16,
        maxHeight: Dimensions.get('window').height - 300,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        borderWidth: 1,
    },
    scrollView: {
        overflow: 'visible'
    },
    invisible: {
        borderColor: '#ccc',
    },
    visible: {
        borderColor: 'rgba(16,142,233,.7)'
    }
});

export default AMap;