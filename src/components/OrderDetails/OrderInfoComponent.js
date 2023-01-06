import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderInfoComponent = () => {
  return (
    <View style={styles.dord_info_container}>
            <Text style={styles.dord_order_id_text}>#ORD01gHf78djFH</Text>
            <View style={styles.dord_payment_type_container}>
                <Text style={{
                    fontWeight:"700",
                    fontSize:16,
                    color:"#fff",
                }}>COD</Text>
            </View>

            <Text style={styles.dord_payment_id_text}>tnx_0fdGj78sdfLp0</Text>

            <Text style={styles.dord_date_text}>26 Mar, 2023, 6:00 pm</Text>
        </View>
  )
}

export default OrderInfoComponent

const styles = StyleSheet.create({
    dord_date_text:{
        textAlign:"center",
        color:"tomato",
        fontWeight:"600",
        fontSize:14,
        marginTop:8,
    },
    dord_info_container:{
        padding:10,
        borderRadius:10,
        marginHorizontal:10,
        backgroundColor:"#fff",
        marginVertical:8,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        paddingVertical:20,
    },
    dord_order_id_text:{
        textAlign:"center",
        fontWeight:"700",
        color:"tomato",
        fontSize:18,
    },
    dord_payment_id_text:{
        textAlign:"center",
        color:"gray",
        fontWeight:"600",
        fontSize:14,
        marginTop:8,
    },
    dord_payment_type_container:{
        marginVertical:8,
        backgroundColor:"tomato",
        width: "30%",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        height:40,
        borderRadius:20,
    },
})