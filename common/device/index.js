/**
 * Created by yoe on 2017/7/21.
 */

import DeviceInfo from 'react-native-device-info';

export function getDeviceType () {
    if(DeviceInfo.isTablet()) {
        return 'pad';
    }
    return 'phone';
}