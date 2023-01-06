import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import OrderInfoComponent from '../components/OrderDetails/OrderInfoComponent'
import OrderUserDetComponent from '../components/OrderDetails/OrderUserDetComponent'

const OrderDetails = ({navigation}) => {

    useEffect(() => {
        navigation.setOptions({
            headerTintColor:"tomato"
        })
    }, [])

  return (
    <ScreenWrapper>
     <View>
            <OrderInfoComponent />
            <OrderUserDetComponent />
      </View>
    </ScreenWrapper>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
})