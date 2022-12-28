import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppAssets } from '../assets/appAssets';
import ScreenWrapper from '../components/ScreenWrapper';
import AddTab from './tabs/AddTab';
import ItemsTab from './tabs/ItemsTab';
import NotificationTab from './tabs/NotificationTab';
import OrderTab from './tabs/OrderTab';
import TransactionTab from './tabs/TransactionTab';

const HomeScreen = ({ navigation }) => {

    const [selectedTab, setSelcetedTab] = useState(0);

    useEffect(() => {
        if (selectedTab == 0) {
            navigation.setOptions({ title: "Items" })
        } else if (selectedTab == 1) {
            navigation.setOptions({ title: "Transaction" })
        } else if (selectedTab == 2) {
            navigation.setOptions({ title: "Add" })
        } else if (selectedTab == 3) {
            navigation.setOptions({ title: "Order" })
        } else if (selectedTab == 4) {
            navigation.setOptions({ title: "Notification" })
        }
        navigation.setOptions({
            headerTintColor:"tomato"
        })
        // navigation.setOptions({
        //     gestureEnabled: false,
        // })
        // BackHandler.addEventListener('hardwareBackPress', function () {
        //     return false;
        // })
        // navigation.addListener("focus", (e) => {
        //     // e.preventDefault();
        //     console.log("e => ", e);

        //     // Prompt the user before leaving the screen
        //     // Alert.alert(
        //     //     'Discard changes?',
        //     //     'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //     //     [
        //     //         { text: "Don't leave", style: 'cancel', onPress: () => { } },
        //     //         {
        //     //             text: 'Discard',
        //     //             style: 'destructive',
        //     //             // If the user confirmed, then we dispatch the action we blocked earlier
        //     //             // This will continue the action that had triggered the removal of the screen
        //     //             onPress: () => navigation.dispatch(e.data.action),
        //     //         },
        //     //     ]
        //     // );
        // })
    }, [selectedTab])

    return (
        <ScreenWrapper isMain={true}>

            {
                selectedTab == 0 ?
                    <ItemsTab /> :
                    selectedTab == 1 ?
                        <TransactionTab /> :
                        selectedTab == 2 ?
                            <AddTab /> :
                            selectedTab == 3 ?
                                <OrderTab /> :
                                <NotificationTab />
            }

            <View style={styles.bottom_view}>

                <TouchableOpacity style={styles.bottom_btn}
                    onPress={() => {
                        setSelcetedTab(0)
                    }}
                >
                    <Image source={AppAssets.Items} style={[styles.bottom_btn_img, {tintColor: selectedTab == 0?'red':'#000'}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_btn}
                    onPress={() => {
                        setSelcetedTab(1)
                    }}
                >
                    <Image source={AppAssets.Transaction} style={[styles.bottom_btn_img, {tintColor: selectedTab == 1?'red':'#000'}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_btn}
                    onPress={() => {
                        setSelcetedTab(2)
                    }}
                >
                    <Image source={AppAssets.Add} style={[[styles.bottom_btn_img, {tintColor: selectedTab == 2?'red':'#000'}], { width: 35, height: 35 }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_btn}
                    onPress={() => {
                        setSelcetedTab(3)
                    }}
                >
                    <Image source={AppAssets.Order} style={[styles.bottom_btn_img, {tintColor: selectedTab == 3?'red':'#000'}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_btn}
                    onPress={() => {
                        setSelcetedTab(4)
                    }}
                >
                    <Image source={AppAssets.Notify} style={[styles.bottom_btn_img, {tintColor: selectedTab == 4?'red':'#000'}]} />
                </TouchableOpacity>

            </View>

        </ScreenWrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    bottom_btn: {
        height: "100%",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    bottom_btn_img: {
        width: 25,
        height: 25,
    },
    bottom_view: {
        position: "absolute",
        bottom: 0,

        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        ...Platform.select({
            ios: {
                height: 50 + Constants.statusBarHeight,
                paddingBottom: Constants.statusBarHeight,
            },
            android: {
                height: 50,
            }
        }),
        shadowColor: "gray",
        shadowOpacity: .2,
        shadowOffset: {
            height: -5,
            width: 0,
        },
        shadowRadius: 0,
    }
})