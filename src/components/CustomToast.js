import { Alert, Platform, Text, ToastAndroid, View } from 'react-native'
import React from 'react';
import Constant from "expo-constants"

const CustomToast = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg? msg: "msg is not defined", ToastAndroid.LONG)
    } else {
        Alert.alert(Constant.expoConfig.name, msg?msg: "msg is not defined", 
        [
            {
                text: "OK",
                style:"destructive"
            }
        ])
    }

}

export default CustomToast