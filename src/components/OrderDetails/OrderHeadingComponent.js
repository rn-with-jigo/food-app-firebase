import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface OrderHeadingComponentProps {
    title: String | undefined,
}

const OrderHeadingComponent = (props: OrderHeadingComponentProps) => {
    const { title } = props;
    return (
        <View style={styles.ord_heading_container}>
            <Text style={styles.ord_heading_text_style}># {title || "This is heading"}</Text>
        </View>
    )
}

export default OrderHeadingComponent

const styles = StyleSheet.create({
    ord_heading_container: {
        paddingHorizontal: 20,
        marginVertical: 8,
    },
    ord_heading_text_style: {
        fontWeight: "700",
        color: "#000",
        fontSize: 18,
    }
})