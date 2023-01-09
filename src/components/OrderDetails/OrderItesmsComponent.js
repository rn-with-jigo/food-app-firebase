import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderItesmsComponent = () => {
    return (
        <View style={styles.ord_items_main_container}>
            <View style={{
                flexDirection: "row",
            }}>
                <View style={styles.ord_items_image_style}></View>
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.ord_items_name_style}>Items Name which Order</Text>
                    <Text style={styles.ord_items_subcategory_text_style}>@sub_category</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.ord_items_qty_text_style}>Qty : 2</Text>
                </View>
            </View>
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
    ord_items_qty_text_style:{
        fontWeight: "700",
        color: "gray",
        fontSize: 20,
    },
    ord_items_subcategory_text_style:{
        fontWeight: "700",
        color: "gray",
        fontSize: 14,
    },
})