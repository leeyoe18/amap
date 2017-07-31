/**
 * Created by yoe on 2017/7/21.
 */

import Dimensions from 'Dimensions';

export function getDeviceType () {
    const device = Dimensions.get('window');
    if(device.width * device.scale < 900) {
        return 'phone';
    }
    return 'pad';
}