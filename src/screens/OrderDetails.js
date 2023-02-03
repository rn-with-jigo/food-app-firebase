import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import OrderInfoComponent from '../components/OrderDetails/OrderInfoComponent'
import OrderUserDetComponent from '../components/OrderDetails/OrderUserDetComponent'
import OrderItesmsComponent from '../components/OrderDetails/OrderItesmsComponent'
import OrderAddtionalNoteComponent from '../components/OrderDetails/OrderAddtionalNoteComponent'
import OrderTimeLineComponent from '../components/OrderDetails/OrderTimeLineComponent'
import OrderHeadingComponent from '../components/OrderDetails/OrderHeadingComponent'
import OrderStatusComponent from '../components/OrderDetails/OrderStatusComponent'


const OrderDetails = ({ navigation, route }) => {

  const { data } = route.params;
  
  // console.log(data);
  let orderData = {
    oid: data.oid,
    orderPayType: data.orderPayType,
    orderPayId: data.orderPayId,
    odate: data.odate
  }
  let orderUserData = {
    ouid: data.userId,
    orderBy: data.orderBy,
    orderEamil: data.orderEamil,
    orderContact: data.orderContact,
    orderTotal: data.orderTotal,
    orderAddress: data.orderAddress
  }

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: "tomato"
    })
  }, [])  

  const OrderTimeLog = [
    {
      id: 1,
      sid: "#S001",
      title: "Order is Placed",
      time: "2 Jan 2023, 6:00 PM",
    },
    {
      id: 2,
      sid: "#S002",
      title: "Order is Accepted",
      time: "2 Jan 2023, 9:00 PM",
    },
    {
      id: 3,
      sid: "#S004",
      title: "Order is Prepaed",
      time: "2 Jan 2023, 9:30 PM",
    },
    {
      id: 4,
      sid: "#S005",
      title: "Order is Completed",
      time: "2 Jan 2023, 10:00 PM",
    },
  ]

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, }}>
        <ScrollView>

          <OrderInfoComponent orderData={orderData} />

          <OrderHeadingComponent title={"Order User info"} />
          <OrderUserDetComponent orderUserData={orderUserData} />

          <OrderHeadingComponent title={"Order Items"} />
          {(data?.oitems) ? data?.oitems.length > 0 ?
            data?.oitems.map((ele, index) => {
              // console.log("ele => ",ele);
              return (
                <OrderItesmsComponent key={index} item={ele} customization={ele?.customization || []} />
              )
            })
            : null
            : null
          }


          <OrderHeadingComponent title={"Order Additional Notes"} />
          <OrderAddtionalNoteComponent />

          <OrderHeadingComponent title={"Order TimeLine"} />
          <OrderTimeLineComponent
            list={data?.oactivity || OrderTimeLog}
            reachedAtId={"#S005"}
            oid={data?.oid}
          />

          <OrderHeadingComponent title={"Order Actions"} />
          <OrderStatusComponent ordStatus={data.orderStatus} oid={data.oid} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
})