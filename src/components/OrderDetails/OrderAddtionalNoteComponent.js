import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderAddtionalNoteComponent = () => {
    return (
        <View style={styles.ord_addtional_main_container}>
            <Text style={styles.ord_adtional_text_style}>{`\t`}Here is the mention all additional things mention while ordering by the user.Here is the mention all additional things mention while ordering by the user.</Text>
        </View>
    )
}

export default OrderAddtionalNoteComponent

const styles = StyleSheet.create({
    ord_addtional_main_container: {
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
    ord_adtional_text_style: {
        fontWeight: "700",
        fontSize: 16,
        color: "gray",
        fontStyle: "italic",
        textAlign: "justify",
        lineHeight: 22,
    },
})