/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import { Popover, Card, Button, SegmentedControl } from 'antd-mobile';

import Dimensions from 'Dimensions';

const statusMap = {
    0: '红灯',
    1: '黄灯',
    2: '绿灯',
    3: '蓝灯',
    4: '白灯'
};

export default class BaiduMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            mapType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            visible: false,
            markerData: {}
        };
    }

    componentDidMount() {

    }

    markerClick = (e) => {
        const title = e.title;
        const data = this.props.data.find(data => data.name === title);
        this.setState({
            markerData: data,
            visible: true
        });
        // console.warn(JSON.stringify(e));
    };

    mapClick = (e) => {
        if(!e.title) {
            this.hideCard();
        }
    };

    hideCard = () => {
        this.setState({
            visible: false,
            markerData: {}
        });
    };

    toPath = () => {
        const { navigate } = this.props.navigation;
        const data = this.state.markerData;
        navigate('Detail', {
            path: data.id,
            title: data.name
        });
    };

    onChangeMapType = (value) => {
        if(value === '普通') {
            this.setState({
                mapType: MapTypes.NORMAL
            });
        } else {
            this.setState({
                mapType: MapTypes.SATELLITE
            });
        }
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
        if(markers.length > 0) {
            center = markers[0];
        }
        let card = null;
        if(this.state.visible && this.props.navigation) {
            card = (
                <View style={styles.tip}>
                    <Card>
                        <Card.Header
                            title={
                                <Text style={styles.cardTitle} onPress={this.toPath}>
                                    {this.state.markerData.name}
                                </Text>
                            }
                            extra={
                                <Button onClick={this.hideCard} style={styles.cardExtra}>
                                    <Text style={styles.cardText} onClick={this.hideCard}>
                                        &times;
                                    </Text>
                                </Button>
                            }
                        />
                        <Card.Body>
                            <Text style={styles.text}>年份: {this.state.markerData.year}</Text>
                            <Text style={styles.text}>状态: {statusMap[this.state.markerData.status]}</Text>
                            <Button
                                size="small"
                                style={styles.btn}
                                onClick={this.toPath}
                                type="primary"
                            >
                                详情
                            </Button>
                        </Card.Body>
                    </Card>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={center}
                    marker={this.state.marker}
                    markers={markers}
                    style={this.props.mapStyle || styles.map}
                    onMarkerClick={this.markerClick}
                    onMapClick={this.mapClick}
                />
                <View style={styles.mapType}>
                    <SegmentedControl
                        values={['普通', '卫星']}
                        onValueChange={this.onChangeMapType}
                    />
                </View>
                {card}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
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
    tip: {
        position: 'absolute',
        top: 72,
        right: 32,
        width: 220,
        height: 280
    },
    cardText: {
        fontSize: 24,
        textAlign: 'right',
        color: '#ccc'
    },
    cardTitle: {
        color: '#108ee9'
    },
    text: {
        marginLeft: 16,
        marginBottom: 16
    },
    cardExtra: {
        height: 16,
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    btn: {
        width: 200,
        marginLeft: 8
    },
    mapType: {
        position: 'absolute',
        top: 24,
        right: 32,
        height: 32,
        width: 80
    }
});