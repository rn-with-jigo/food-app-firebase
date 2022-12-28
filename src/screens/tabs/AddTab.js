import { Dimensions, Image, Keyboard, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddTab = () => {

    const [imagedata, setImagedata] = useState(null)
    const [name, setName] = useState('')
    const [price, setPirce] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [discription, setDiscription] = useState('')
    const [imgeurl, setImageurl] = useState('')

    async function requesttogetiamge() {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the camera");
                    openGallery()
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            openGallery()
        }
    }

    async function openGallery() {
        const result = await launchImageLibrary({ mediaType: "photo" });
        if (result.didCancel) {

        } else {
            console.log("result => ", result);
            setImagedata(result)
        }
        console.log(result);
    }

    return (



        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ marginTop: 20, }}>
                        {imagedata !== null ?
                            <Image source={{ uri: imagedata.assets[0].uri }} style={styles.pick_image_style} />
                            : null}

                        <TextInput style={styles.input_text_box} placeholder="Enter item name" />
                        <TextInput style={styles.input_text_box} placeholder="Enter item price" />
                        <TextInput style={styles.input_text_box} placeholder="Enter item discount price" />
                        <TextInput style={styles.input_text_box} placeholder="Enter item discription" />

                        <TextInput style={[styles.input_text_box, { marginTop: 30, }]} placeholder="Enter image url" />
                        <Text style={{ textAlign: "center", fontSize: 16, color: "gray", fontWeight: "600" }}>OR</Text>
                        <TouchableOpacity style={styles.pick_btn_style}
                            onPress={() => {
                                requesttogetiamge();
                            }}
                        >
                            <Text>Pick image from gallery</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity style={styles.add_item_style}
                                onPress={() => {
                                    // requesttogetiamge();
                                }}
                            >
                                <Text style={{ fontWeight: "600", color: "#fff", fontSize: 18 }}>Add Item</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default AddTab

const styles = StyleSheet.create({
    add_item_style: {
        height: Dimensions.get("screen").height * 0.06,
        width: "80%",
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center", borderRadius: 5,
        elevation: 5,
    },
    container: {
        flex: 1,
    },
    input_text_box: {
        margin: 10,
        height: Dimensions.get("screen").height * 0.06,
        width: "80%",
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "center",
    },
    pick_btn_style: {
        margin: 10,
        height: Dimensions.get("screen").height * 0.06,
        width: "80%",
        borderWidth: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    pick_image_style: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        height: 200,
        marginTop: 10,
    },
})