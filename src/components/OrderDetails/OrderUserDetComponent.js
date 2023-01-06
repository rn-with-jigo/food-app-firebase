import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderUserDetComponent = () => {

  return (
    <View style={styles.dord_user_main_container}>
        <Text style={styles.dord_user_price_text}>Rs. 500.00</Text>
        <Text style={styles.dord_user_name}>@Jeegar Goyani</Text>

        <View style={styles.dord_user_contact_container}>
            <Text style={styles.dord_user_contact}>+917621827682</Text>
            <Text style={styles.dord_user_email}>jigo@gmail.com</Text>
        </View>
        <Text style={styles.dord_user_address}>House no.127/3, Sarkesh road, gujart - 363401</Text>
    </View>
  )
}

export default OrderUserDetComponent

const styles = StyleSheet.create({
    dord_user_main_container:{
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
    dord_user_address:{
        fontWeight:'500',
        fontSize:14,
        color:"#000",
        marginTop:8,
        textAlign:"center",
    },
    dord_user_contact:{
        fontWeight:'500',
        fontSize:14,
        color:"#000",
    },
    dord_user_contact_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:8,
    },
    dord_user_email:{
        fontWeight:'500',
        fontSize:14,
        color:"#000",
    },
    dord_user_name:{
        fontWeight:'700',
        fontSize:16,
        color:"tomato",
        textAlign:"center",
        marginVertical:8,
    },
    dord_user_price_text:{
        fontWeight:'800',
        fontSize:20,
        color:"tomato",
        textAlign:"center",
    },
})