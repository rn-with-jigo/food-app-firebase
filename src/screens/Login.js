import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import firestore from '@react-native-firebase/firestore';
import { navString } from '../constants/navStrings';
import CustomToast from '../components/CustomToast';
import { DB_ITEMS, DB_ADMIN } from "@env"
import { storageKeys } from '../constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    // useEffect(() => {
    //     getUserData();
    // }, [])

    // const getUserData = async () => {
    //     const admins = await firestore().collection('admin').get();
    //     console.log("admins => ", admins.docs[0].data());
    // }

    async function checkLogin() {
        // console.log(navigation);
        // console.log(username);
        // return;
        if (username.length <= 0 || password.length <= 0) {
            return CustomToast("please enter datas");
        } else {
            navigation.push(navString.Loadder)

            firestore()
                .collection(DB_ADMIN)
                // Filter results
                .where('email', '==', username)
                .get()
                .then(async querySnapshot => {
                    console.log(querySnapshot._data);
                    if (querySnapshot.docs.length > 0) {
                        let uData = querySnapshot.docs[0]._data;
                        console.log(uData);
                        if (username == uData.email && password == uData.password) {
                            await AsyncStorage.setItem(storageKeys.storeUserEmail, uData.email);
                            await AsyncStorage.setItem(storageKeys.useruuid, uData.aid)
                            await AsyncStorage.setItem(storageKeys.userName, uData.name)
                            await AsyncStorage.setItem(storageKeys.userContact, uData.contact)
                            setTimeout(() => {
                                navigation.pop(1);
                                CustomToast("Welcome to User Dash..");
                                navigation.push(navString.Homescreen)
                            }, 2000)
                        } else {
                            CustomToast("password not matched");
                            navigation.pop(1);
                        }
                    } else {
                        CustomToast("password or username is not matched");
                        navigation.pop(1);
                    }
                });
            return;

            // const admins = await firestore().collection('admin').get();
            // const { docs } = admins;
            // //     console.log("admins => ", admins.docs[0].data());
            // if (docs[0]._data?.email == username && docs[0]._data?.password == password) {
            //     setTimeout(() => {
            //         navigation.pop(1);
            //         CustomToast("Welcome to Admin Dash..");
            //         navigation.push(navString.Homescreen)
            //     }, 2000)
            // } else {
            //     CustomToast("password or username is not matched");
            //     navigation.pop(1);
            // }
        }

    }

    return (
        <ScreenWrapper>
            <Text style={styles.login_admin_text}>Admin Login</Text>
            <View style={{ margin: 10, marginTop: 50, }}>
                <TextInput style={styles.input_text_box} placeholder="user email" keyboardType='email-address'
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize={false}
                />
            </View>
            <View style={{ margin: 10, }}>
                <TextInput style={styles.input_text_box} placeholder="password" secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <TouchableOpacity style={styles.login_btn_container}
                onPress={() => {
                    checkLogin();
                }}
            >
                <Text style={{ fontWeight: "600", color: "#000", fontSize: 20, }}>Login</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input_text_box: {
        height: Dimensions.get("screen").height * 0.06, paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
    },
    login_admin_text: {
        fontWeight: '600',
        fontSize: 20,
        color: "#000",
        marginTop: 70,
        textAlign: "center",
    },
    login_btn_container: {
        height: Dimensions.get("screen").height * 0.06,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "orange",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})