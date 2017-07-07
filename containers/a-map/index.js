/**
 * Created by yoe on 2017/7/6.
 */
import React, {Component} from 'react';
import {StyleSheet, Alert, Text, Image, View} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d';
import Dimensions from 'Dimensions';

class AMap extends Component {
    render() {
        return (
            <MapView
                coordinate={{
                    latitude: 39.91095,
                    longitude: 116.37296,
                }}
                style={this.props.mapStyle || styles.map}>
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 210
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
})

export default AMap;