import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { navString } from '../constants/navStrings';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(navString.Login)
        }, 3000);
    }, [])

  return (
    <View style={styles.screen_main_container}>
      <Text style={styles.logo_text_style}>E Food</Text>
      <Text style={styles.logo_text_subtile}>Admin dash</Text>
      <Text style={styles.logo_text_subline_style}>get your food quickly.</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    logo_text_style:{
        fontWeight:"700",
        color:"tomato",
        fontSize: 30,
    },
    logo_text_subtile:{
        fontWeight:"700",
        color:"tomato",
        fontSize: 16,
    },
    logo_text_subline_style:{
        fontWeight:"500",
        color:"gray",
        fontSize: 16,
        marginTop:5,
    },
    screen_main_container:{
        flex:1, justifyContent:"center",
        alignItems:"center",
    }
})