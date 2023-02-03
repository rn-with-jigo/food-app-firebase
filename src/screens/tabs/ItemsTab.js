import { DB_ITEMS } from "@env";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppAssets } from '../../assets/appAssets';
import { navString } from '../../constants/navStrings';

const ItemsTab = () => {

  const navigation = useNavigation();

  const isFocuesed = useIsFocused()

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    console.log(DB_ITEMS);
    getAllitem();
  }, [isFocuesed])

  function getAllitem() {
    firestore()
      .collection(DB_ITEMS)
      .get()
      .then(querySnapshot => {
        let tempArr = [];
        console.log('Total items: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log('item ID: ', documentSnapshot.id, documentSnapshot.data());
          tempArr.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        if (tempArr.length > 0) {
          setAllItems(tempArr)
        } else {
          setAllItems([])
        }
      });
  }

  function deleteItem(id, item) {
    if (id) {
      let getpic_from_stoage = storage().refFromURL(item.data.imgeurl)
      getpic_from_stoage.delete().then(() => console.log("item image also remove form storage"));
      firestore()
        .collection(DB_ITEMS)
        .doc(id)
        .delete()
        .then(() => {
          console.log('Item deleted!');
          getAllitem();
        });
    }
  }

  const renderItemAll = ({ item, index }) => {
    // console.log(item);
    return (
      <TouchableOpacity style={styles.item_single_container}
        onPress={() => {
          navigation.navigate(navString.ProductDetailsScreen, {itemId: item.id, itemData: item.data})
        }}
      >
        <Image source={{ uri: item.data.imgeurl }} style={styles.item_image} />

        <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
          <View style={styles.item_datails}>
            <View style={{ flex: 1, }}>
              <Text style={styles.item_name_style} numberOfLines={2} >{item.data.name}</Text>
              <Text style={styles.item_discription_style} numberOfLines={1} >{item.data.discription}</Text>
            </View>
            <View style={styles.item_price_contianer}>
              <Text style={styles.item_price_text_style}>Rs.{item.data.price}</Text>
              <Text style={styles.item_discount_price_style}>{item.data.discountprice}</Text>
            </View>
          </View>

          <View style={{ flex: 1, alignItems: "center", paddingVertical: 5, }}>
            <TouchableOpacity
              onPress={() => {
                const { data, id } = item;
                if (data && id) {

                  navigation.push(navString.Edititemdetailscreen, { id: id, data: data })
                } else {
                  alert("faild to get params")
                }
              }}
            >
              <Image source={AppAssets.Edititem} style={styles.item_edit_action} />
            </TouchableOpacity>
            <View style={{ flex: 1, }} />
            <TouchableOpacity
              onPress={() => {
                deleteItem(item.id, item)
              }}
            >
              <Image source={AppAssets.Deleteitem} style={styles.item_delete_action} />
            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderEmptyComponent = () => {
    return (
      <View style={{
        justifyContent: "center", alignItems: "center",
        height: Dimensions.get("screen").height - 200,
        width: Dimensions.get("screen").width,
      }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "orange" }}>Sorry data is empty add items</Text>

      </View>
    )
  }

  return (
    <View style={styles.item_main_conatiner}>
      {/* <View style={{padding:10, alignSelf:"flex-end"}}>
        <TouchableOpacity
          onPress={() => {
            getAllitem();
          }}
        >
          <Text style={{fontSize:14, color:"blue", fontWeight:"600"}}>Reload</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={allItems}
        renderItem={renderItemAll}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{  padding: 15, paddingBottom:80, }}
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

export default ItemsTab

const styles = StyleSheet.create({
  item_datails: {
    width: "85%",
    paddingLeft: 10,
  },
  item_delete_action: {
    height: 25,
    width: 25,
    tintColor: "tomato"
  },
  item_discount_price_style: {
    fontWeight: "700",
    fontSize: 20,
    color: "gray",
    marginLeft: 5,
    textDecorationLine: "line-through"
  },
  item_discription_style: {
    ontWeight: "400",
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  item_edit_action: {
    height: 20,
    width: 20,
  },
  item_image: {
    width: 90,
    borderRadius: 5,
  },
  item_main_conatiner: {
    flex: 1,
  },
  item_name_style: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  item_price_contianer: {
    flexDirection: "row",
  },
  item_price_text_style: {
    fontWeight: "700",
    fontSize: 20,
    color: "green",
  },
  item_single_container: {
    height: 110,
    flexDirection: "row",
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
    padding: 5,
  },
})