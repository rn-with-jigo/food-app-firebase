import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const ScreenWrapper = ({ children, isMain = false }) => {

    const navigation = useNavigation();

    useEffect(() => {
        if (isMain) {
            // if (Platform.OS === "ios") {
            navigation.setOptions({
                gestureEnabled: false
            })
            // }
        } else {
            navigation.setOptions({
                gestureEnabled: true
            })
        }
    }, [isMain])

    if (Platform.OS === "ios") {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {children}
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styles.container}>
                {children}
            </View>
        )
    }

    // return (

    //     {
    //         Platform.OS === "ios" ?
    //             <SafeAreaView style={{ flex }}>
    //                 {children}
    //             </SafeAreaView> :
    //             children
    //     }

    // )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})