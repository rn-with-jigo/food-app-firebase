import { DB_ORDERS } from "@env";
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DateShower from "../../components/DateShower";

const TransactionTab = () => {

  const [transcation, setTranscation] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(DB_ORDERS)
      .where("orderPayType", "==", "Online")
      .onSnapshot(documentSnapshot => {
        console.log("data => |transcation |\n", documentSnapshot.size);
        let temp_arry = []
        documentSnapshot.forEach(elem => {
          temp_arry.push(elem._data)
        })
        setTranscation(temp_arry)
      })
    // .get()
    // .then(data => {
    //   console.log("data => |transcation |\n", data.docs[0]._data);
    // })
    // .onSnapshot(documentSnapshot => {
    //   // console.log('item_data data: ', documentSnapshot.docs);
    //   let temp_arry = [];
    //   documentSnapshot.docs.map((el) => {
    //     temp_arry.push(el._data)
    //   })
    //   console.log(temp_arry);
    //   setOrdersList(temp_arry)
    // });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [])

  const renderTranscationItems = ({ item, index }) => {
  
    return (
      <View>
        <DateShower date={item.odate} />
        <View style={styles.tra_item_contianer}>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Text style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#000",
            }}>#{item.oid.substring(0,18) || "---"}</Text>
            <View>
              <Text style={{ fontWeight: "bold", color: "tomato", fontSize: 14, }}>{item.status || "---"}</Text>
            </View>
          </View>

          <View style={{ marginVertical: 8, }}>
            <Text style={{ fontWeight: "600", color: "#000", fontSize: 14, }}>@{item.orderBy || "---"}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "600", color: "gray", fontSize: 14, }}>{item.orderPayId|| "---"}</Text>
            <Text style={{ fontWeight: "bold", color: "tomato", fontSize: 16, }}>Rs. { item.orderTotal.toFixed(2) || 0}</Text>
          </View>

        </View>
      </View>
    )
  }

  return (
    <View style={styles.tra_main_container}>
      <FlatList
        data={transcation}
        renderItem={renderTranscationItems}
        contentContainerStyle={{ padding: 15, paddingBottom: 80, }}
        // ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ height: 15, }} />
          )
        }}
      />
    </View>
  )
}

export default TransactionTab

const styles = StyleSheet.create({
  tra_item_contianer: {
    // flexDirection: "row",
    height: 100,
    alignSelf: "center",
    width: "90%",
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 8,
    marginTop:10,
  },
  tra_main_container: {
    flex: 1,
  }
})