import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppAssets } from '../../assets/appAssets'
import { useNavigation } from '@react-navigation/native'
import { navString } from '../../constants/navStrings'

const NotificationTab = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity style={styles.add_module_btn_container}
        onPress={() => {
          navigation.navigate(navString.ModuleCreatorScreen);
        }}
      >
        <Image source={AppAssets.Add} style={{ height: 30, width: 30, tintColor: "#fff" }} />
      </TouchableOpacity>
    </View>
  )
}

export default NotificationTab

const styles = StyleSheet.create({
  add_module_btn_container: {
    position: "absolute",
    right: 0,
    bottom: 65,
    margin: 10,
    padding: 5,
    height: 50, width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
})