/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import { Icon, Button } from 'antd-mobile';

import All from '../all-projects';
import New from '../new';
import Detail from '../detail';
import Analysis from '../analysis';
import Amap from '../a-map';

const MyTab = TabNavigator({
    All: {
        screen: All,
        navigationOptions: ()=> TabOptions('所有项目','所有项目', '\ue685')
    },
    New: {
        screen: New,
        navigationOptions: ()=> TabOptions('新开工项目','新开工项目', '\ue660'),
    },
    Analysis:{
        screen: Analysis,
        navigationOptions: ()=> TabOptions('项目建设分析','项目建设分析', '\uE65C'),
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName: 'All', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{
        showLabel:true, // 是否显示label，默认开启。
        showIcon:true, // 是否显示图标，默认关闭。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
    }

});

// 初始化StackNavigator
const MyNav = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    Main:{
        screen: MyTab,
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    }
});

const StackOptions = ({navigation}) => {
    let {state,goBack} = navigation;
    // 用来判断是否隐藏或显示header
    const visible= state.params.isVisible;
    let header;
    if (visible === true){
        header = null;
    }
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize: 14,color:'white',alignSelf:'center'};
    // const headerBackTitle = false;
    // const headerLeft = (
    //     <Button
    //         style={{marginLeft:13, opacity: .1}}
    //         onClick={()=>{goBack()}}
    //     >
    //         <Icon
    //             type='check'
    //             size={30}
    //         />
    //     </Button>
    // );
    return {headerStyle,headerTitle,header, headerTitleStyle}
};

const TabOptions = (tabBarTitle,navTitle, icon) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Icon type={icon} color={focused ? '#4ECBFC' : 'white'}/>
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:14,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#49a9ee'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,headerTitle,tabBarIcon,headerTitleStyle,headerStyle,tabBarVisible};
};

export default MyNav;