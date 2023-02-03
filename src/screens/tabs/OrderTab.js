import { DB_ORDERS, DB_USER } from "@env";
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import OrderListCard from '../../components/OrderListCard';

const OrderTab = () => {

  const [ordersLsit, setOrdersList] = useState([]);

  useEffect(() => {
    // getOrderList()
    const subscriber = firestore()
      .collection(DB_ORDERS)
      .onSnapshot(documentSnapshot => {
        // console.log('item_data data: ', documentSnapshot.docs);
        let temp_arry = [];
        documentSnapshot.docs.map((el) => {
          temp_arry.push(el._data)
        })
        console.log(temp_arry);
        setOrdersList(temp_arry)
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [])

  async function getOrderList() {
    console.log(DB_USER);
    firestore()
      .collection(DB_ORDERS)
      .get()
      .then(user_Data => {
        console.log("order_list => ", user_Data.docs);
        let temp_arry = [];
        user_Data.docs.map((el) => {
          temp_arry.push(el._data)
        })
        // console.log(temp_arry);
        setOrdersList(temp_arry)
      })
  }

  const renderOrderItems = ({ item, index }) => {
    // console.log(item?.userId);

    // let user_data = await firestore().collection(DB_USER).doc(item?.userId).get()
    // console.log(user_data);

    return (
      <OrderListCard
        orderItemsList={item?.oitems || [{}]}
        orderId={item?.oid.substring(1, 8) || null}
        orderPrice={item?.orderTotal || null}
        status={item?.isPlaced ||  null}
        date={item?.odate || null}
        paymentId={item?.orderPayId || null}
        paymentType={item?.orderPayType || null}
        userId={item?.userId || null}
        username={item?.orderBy || null}
        orderItem={item}
      />
      // <Text>Jio</Text>
    )
  }


  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={ordersLsit}
        renderItem={renderOrderItems}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
      />


    </View>
  )
}

export default OrderTab

const styles = StyleSheet.create({})