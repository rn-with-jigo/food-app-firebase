import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAssets } from '../../assets/appAssets';
import CustomzationInfoComponents from '../CustomzationInfoComponents';

const OrderItesmsComponent = ({ item }) => {
    

    const { imgeurl, price, qty, name } = item.data;

    const [customization, setCustomization] = useState([]);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        if (item?.customization.length > 0) {
            console.log("item?.customization => ", item?.customization);
            setCustomization(item?.customization)
        }
    }, [])

    return (
        <View style={styles.ord_items_main_container}>
            <View style={{
                flexDirection: "row",
            }}>
                <View style={styles.ord_items_image_style}>
                    {(imgeurl) ?
                        (<Image source={{ uri: imgeurl }} style={{ flex: 1, borderRadius: 5, }} />)
                        : null}

                </View>
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.ord_items_name_style}>{name || "---"}</Text>
                    {/* <Text style={styles.ord_items_subcategory_text_style}>@sub_category</Text> */}
                    <View style={{ flex: 1 }} />
                    <Text style={styles.ord_items_qty_text_style}>Qty : {qty || "---"}</Text>
                </View>
                <TouchableOpacity style={styles.ord_items_info_btn}
                    onPress={() => {
                        setIsModal(true);
                    }}
                >
                    <Image source={AppAssets.InfoIcon} style={{ height: 20, width: 20, tintColor: "tomato" }} />
                </TouchableOpacity>
            </View>
            <CustomzationInfoComponents
                custmzation={customization}
                isVisiable={isModal}
                setIsVisiable={setIsModal}
            />
        </View>
    )
}

export default OrderItesmsComponent

const styles = StyleSheet.create({
    ord_items_image_style: {
        height: 70, width: 70,
        backgroundColor: "tomato",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ord_items_info_btn: {
        position: "absolute",
        bottom: 0,
        right: 10,
        padding: 5,
    },
    ord_items_main_container: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        paddingVertical: 20,
    },
    ord_items_name_style: {
        fontWeight: "700",
        color: "tomato",
        fontSize: 18,
    },
    ord_items_qty_text_style: {
        fontWeight: "700",
        color: "gray",
        fontSize: 20,
    },
    ord_items_subcategory_text_style: {
        fontWeight: "700",
        color: "gray",
        fontSize: 14,
    },
})