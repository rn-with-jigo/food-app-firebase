import { Dimensions, Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputTackerComponent from '../InputTackerComponent';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { navString } from '../../constants/navStrings';
import { DB_ITEMS } from "@env";
import CustomToast from '../CustomToast';
import { getRandomString } from '../../utils/commanStrings';

const SNIPModuleComponent = ({ getItemAdded }) => {

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [selectedActon, setSelectedAction] = useState(0);

  const [isImageSelected, setIsImageSelected] = useState(false);
  const [imagedata, setImagedata] = useState(null)

  const [itemAdded, setItemAdd] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (getItemAdded) {

      getItemAdded(itemAdded)
    }
  }, [itemAdded])

  async function requesttogetiamge() {
    setIsImageSelected(true)
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          setIsImageSelected(true)
          openGallery()
        } else {
          console.log("Camera permission denied");
          setIsImageSelected(false)
        }
      } catch (err) {
        console.warn(err);
        setIsImageSelected(false)
      }
    } else {
      openGallery()
    }
  }

  async function openGallery() {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.didCancel) {

    } else {
      console.log("result => ", result);
      setImagedata(result)
      return
    }
    console.log(result);
  }
  function saveModuleitems() {
    if (!isImageSelected) {
      return CustomToast("Please Allow to access the photos permission")
    }
    if (!itemName || !itemPrice || selectedActon == 0 || imagedata == null) {
      return CustomToast("Please fill all details")
    }

    let obj = {};
    obj.id = getRandomString(6) || "#undefiend"
    obj.name = itemName;
    obj.price = itemPrice;
    obj.action = selectedActon == 1 ? null : selectedActon == 2 ? "+" : selectedActon == 3 ? "-" : null
    obj.img = imagedata.assets[0].uri

    setItemAdd([...itemAdded, obj])
    setItemName("")
    setItemPrice(null);
    setImagedata(null);
  }

  const RenderAddedItems = (item, index) => {
    // console.log(item, index);
    return (
      <View style={styles.item_container} key={item.id.toString()}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: item?.img }} style={{ height: 50, width: 50, borderRadius: 4, marginRight: 8, }} />
          <Text style={{ fontWeight: "600", fontSize: 14, }}>{item?.name || "undefined"}</Text>
        </View>
        <Text>{"Rs. " + item?.price || "undefined"}</Text>
      </View>
    )
  }

  return (
    <View>
      <InputTackerComponent
        lablename={"Item Name"}
        placeholder={"e.g regular"}
        inputValue={itemName}
        onChangeText={setItemName}
      />

      <TouchableOpacity style={styles.pick_btn_style}
        onPress={() => {
          requesttogetiamge();
        }}
      >
        <Text>Pick Image</Text>
      </TouchableOpacity>

      {imagedata !== null ?
        <Image source={{ uri: imagedata.assets[0].uri }} style={styles.pick_image_style} />
        : null}

      <InputTackerComponent
        lablename={"Item Price"}
        placeholder={"e.g 12.0"}
        // inputType={"price"}
        inputProps={{ keyboardType: "number-pad", returnKeyType: "done", }}
        inputValue={itemPrice}
        onChangeText={setItemPrice}
      />

      <Text style={{ fontWeight: "600", color: "#000", marginLeft: 16, }}>Chosse the Action</Text>
      <View style={styles.add_item_action}>
        <TouchableOpacity style={[styles.add_item_action_container, { backgroundColor: selectedActon == 1 ? "tomato" : null }]}
          onPress={() => {
            setSelectedAction(1)
          }}
        >
          <Text style={[styles.add_item_action_text, { color: selectedActon == 1 ? "#fff" : "tomato" }]}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.add_item_action_container, { backgroundColor: selectedActon == 2 ? "tomato" : null }]}
          onPress={() => {
            setSelectedAction(2)
          }}
        >
          <Text style={[styles.add_item_action_text, { color: selectedActon == 2 ? "#fff" : "tomato" }]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.add_item_action_container, { backgroundColor: selectedActon == 3 ? "tomato" : null }]}
          onPress={() => {
            setSelectedAction(3)
          }}
        >
          <Text style={[styles.add_item_action_text, { color: selectedActon == 3 ? "#fff" : "tomato" }]}>Minus</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.save_add_item_btn}
        onPress={() => {
          saveModuleitems()
        }}
      >
        <Text style={{ fontWeight: "600", color: "#fff" }}>Save Item</Text>
      </TouchableOpacity>

      {itemAdded.length > 0 ?
        <View style={{ marginTop: 16, }}>
          {
            itemAdded.map((ele, index) => (
              <RenderAddedItems {...ele} {...index} />
            ))
          }

        </View>
        : null}

    </View>
  )
}

export default SNIPModuleComponent

const styles = StyleSheet.create({

  add_item_action: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  add_item_action_container: {
    height: 40,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: .5,
  },
  add_item_action_text: {
    fontWeight: "600",
  },
  item_container: {
    height: 45,
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pick_btn_style: {
    marginTop: 10,
    height: Dimensions.get("screen").height * 0.04,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
  },
  pick_image_style: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 8,
  },
  save_add_item_btn: {
    height: 45,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "tomato",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  }
})