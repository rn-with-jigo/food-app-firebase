import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAssets } from '../../assets/appAssets'
import { navString } from '../../constants/navStrings'
import firestore from "@react-native-firebase/firestore"
import { DB_ITEMS } from "@env";

const ProductDetailsScreen = ({ navigation, route }) => {

    const { itemData, itemId } = route.params;

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTintColor: "tomato",
            headerBackTitleVisible: false,
        })

        let subsribe = firestore()
            .collection(DB_ITEMS)
            .doc(itemId)
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                setProductData(documentSnapshot.data());
            });

        return () => subsribe();
    }, [])

    return (
        <View style={styles.pro_main_container}>

            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 80, }}
                >
                    <ImageBackground style={styles.pro_header_container}
                        source={{ uri: productData.imgeurl }}
                        resizeMode="cover"
                        borderRadius={20}
                    >

                    </ImageBackground>

                    <View style={{ marginTop: 24, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{
                                fontWeight: "600",
                                fontSize: 20,
                                color: "tomato",
                            }}>{productData?.name || "Product Name"}</Text>
                            <Text style={{
                                fontWeight: "600",
                                fontSize: 20,
                                color: "tomato",
                            }}
                            >
                                Rs. {productData.price || 0}
                            </Text>
                        </View>
                        <View style={{ marginTop: 16, }}>
                            <Text style={{
                                fontWeight: "600",
                                fontSize: 14,
                                color: "gray",
                            }}>{productData.discription || ""}</Text>
                        </View>
                    </View>

                    {productData.hasOwnProperty("extraModule") ?
                        <View style={styles.pro_module_found_container}>
                            <Text style={{
                                marginVertical: 8,
                                fontWeight: "600",
                                fontSize: 16,
                                color: "tomato",
                            }}>Modules</Text>
                            {productData.extraModule.map((ele, index) => {
                                // console.log(ele);
                                return (
                                    <View style={styles.pro_module_item_container} key={index}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                color: "tomato",
                                            }}
                                        >{ele?.name || "Module Name"}</Text>
                                        {ele.hasOwnProperty("moduleData") ?
                                            ele.moduleData.map((ele1, index1) => {
                                                // console.log("ele =>> ", ele1);
                                                return (
                                                    <View style={styles.pro_module_item_details_container} key={index1}>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            {ele1.hasOwnProperty("img")?
                                                            <Image source={{ uri: ele1?.img }} style={{ height: 50, width: 50, borderRadius: 4, marginRight: 8, }} />
                                                            :null}
                                                            <Text style={{
                                                                fontWeight: "600",
                                                                fontSize: 12,
                                                                color: "gray",
                                                            }}>{ele1?.name || "name"}</Text>
                                                        </View>

                                                        <Text style={{
                                                            fontWeight: "600",
                                                            fontSize: 12,
                                                            color: "tomato",
                                                        }}>Rs. {ele1?.price || "0"}</Text>
                                                    </View>
                                                )
                                            })
                                            : <Text>Module not have data</Text>}
                                    </View>
                                )
                            })}
                        </View>
                        :
                        <View style={styles.pro_module_not_found}></View>
                    }

                </ScrollView>
            </View>

            <TouchableOpacity style={styles.pro_module_create_btn}
                onPress={() => {
                    navigation.navigate(navString.ProductModulesScreen, { itemId: itemId, itemData: itemData })
                }}
            >
                <Image source={AppAssets.Add} style={{ height: 24, width: 24, tintColor: "#fff" }} />
            </TouchableOpacity>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    pro_header_container: {
        height: 200,
        width: "100%",
        backgroundColor: "#00000044",
        borderRadius: 20,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0.5,
            width: 0,
        },
        elevation: 4,
    },
    pro_main_container: {
        flex: 1,
    },
    pro_module_create_btn: {
        position: "absolute",
        bottom: 20, right: 20,
        height: 50, width: 50,
        borderRadius: 25,
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
    },
    pro_module_found_container: {
        marginVertical: 8,
    },
    pro_module_item_container: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0.5,
            width: 0,
        },
        elevation: 4,
        marginVertical: 8,
    },
    pro_module_item_details_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    pro_module_not_found: {

    },
})