import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAssets } from '../assets/appAssets'
import { DB_ORDERS, DB_USER } from "@env";
import firestore from '@react-native-firebase/firestore';
import { commanStrings } from '../utils/commanStrings';
import randomStr from "react-native-uuid"

interface SelectorComponentProps {
    selectorList: Array | undefined,
    isSelector: Boolean | String,
    setIsSelector: void | undefined,
    setSelectedIndex: void,
    selectedIndex: Number | String | undefined,
    oid?: String | undefined,
}

const SelectorComponent = (props: SelectorComponentProps) => {

    const { selectorList, isSelector, setIsSelector, selectedIndex, setSelectedIndex, oid } = props;

    // useEffect(() => {

    // }, []);

    // async function setStatus(){
    //     let get_data = (await firestore().collection(DB_ORDERS).where("oid", "==", oid).get()).docs
    //     if(get_data.length > 0){
    //         // if(get_data[0]._data.oactivity == ){

    //         // }
    //     }
    // }

    async function setOrderStatus(status) {
        // console.log("setOrderStatus => ", selectorList[index]);
        let get_id = await (await firestore().collection(DB_ORDERS).where("oid", "==", oid).get()).docs;
        //    console.log(get_id);
        if (get_id.length > 0) {
            // console.log(get_id[0].);
            // return
            // console.log("============");
            // console.log("get_id[0]._data.oactivity ", get_id[0]._data.oactivity);
            // console.log("status ", status);
            // if (get_id[0]._data.oactivity.activityAction != status) {
                let action = null
                if (status == "Placed") {
                    action = commanStrings.order_placed
                } else if (status == "Accepted") {
                    action = commanStrings.order_accepted
                } else if (status == "Cancled") {
                    action = commanStrings.order_cancled
                } else if (status == "Prepared") {
                    action = commanStrings.order_prepared
                } else if (status == "Completed") {
                    action = commanStrings.order_Completed
                }
                firestore()
                    .collection(DB_ORDERS)
                    .doc(get_id[0].id)
                    .update({
                        orderStatus: status || "note get",
                        oactivity: [...get_id[0]._data.oactivity, {
                            activityId: randomStr.v4(),
                            activityAction: action || "not definded",
                            activityDate: new Date().toLocaleString('en', { dateStyle: "medium", timeStyle: "short" }),
                            extra: "",
                        }]
                    })
            // }
        }
    }

    const renderSelector = ({ item, index }) => {
        return (
            <View style={{
                height: 55,
                width: "90%",
                paddingLeft: 20,
            }}>
                <TouchableOpacity style={styles.sel_item_container}
                    onPress={async () => {
                        setSelectedIndex(index);
                        if (setIsSelector) {
                            setIsSelector(!isSelector);
                        }
                        setOrderStatus(item.status);

                    }}
                >
                    <Image source={selectedIndex == index ? AppAssets.RadioFillIcon : AppAssets.RadioIcon}
                        style={{
                            height: 25, width: 25,
                            tintColor: selectedIndex == index ? "tomato" : null,
                        }}
                    />
                    <Text style={[styles.sel_item_text_style,
                    { color: selectedIndex == index ? "tomato" : "#000" }]}>{item.status || "index " + index}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <FlatList
            data={selectorList || [{}, {}, {}]}
            renderItem={renderSelector}
            contentContainerStyle={{
                padding: 10,
            }}
            ItemSeparatorComponent={() => (
                <View style={{
                    height: 5,
                }} />
            )}
        />
    )
}

export default SelectorComponent

const styles = StyleSheet.create({
    sel_item_container: {
        height: 55,
        flexDirection: "row",
        alignItems: "center",
    },
    sel_item_text_style: {
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 10,
    }
})