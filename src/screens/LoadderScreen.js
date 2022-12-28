import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadderScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{padding:10, backgroundColor:"#fff", borderRadius:10,}}>
            <ActivityIndicator size={'large'} color={"#000"} />
        </View>
    </View>
  )
}

export default LoadderScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#00000033",
    }
})