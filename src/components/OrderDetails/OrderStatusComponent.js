import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectorComponent from '../SelectorComponent'
import { DB_ORDERS, DB_USER } from "@env";
import firestore from '@react-native-firebase/firestore';

const OrderStatusComponent = ({ oid }) => {
    // console.log("ordStatus => ", ordStatus);

    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [orderSataus, setOrderStatus] = useState(null);

    const StatusList = [
        {
            id: "#S001",
            status: "Placed",
        },
        {
            id: "#S002",
            status: "Accepted",
        },
        {
            id: "#S003",
            status: "Cancled",
        },
        {
            id: "#S004",
            status: "Prepared",
        },
        {
            id: "#S005",
            status: "Completed",
        },
    ]

    useEffect(() => {
        console.log("seleceted Index -< ", selectedIndex);
        (async () => {
            let get_id = await(await firestore().collection(DB_ORDERS).where("oid", "==", oid).get()).docs;
            // console.log(get_id[0].id);
            const subscriber = firestore()
                .collection(DB_ORDERS)
                .doc(get_id[0].id)
                .onSnapshot(documentSnapshot => {
                    // console.log('item_data data: ', documentSnapshot._data.orderStatus);
                    setOrderStatus(documentSnapshot._data.orderStatus)
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        })();
        //     setSelectedIndex(index)
        // }
    }, [selectedIndex])


    return (
        <View style={{
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: "#fff",
            marginVertical: 8,
            shadowColor: "#000",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 4,
            paddingVertical: 20,
        }}>
            <View style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{
                    fontWeight: "600",
                    color: "tomato",
                    fontSize: 14,
                    marginVertical: 10,
                }}>Current Order Status: <Text style={{ fontWeight: "bold", color: "#000" }}>{orderSataus || "---"}</Text></Text>
                <TouchableOpacity style={{
                    width: "50%",
                    height: 50,
                    backgroundColor: "tomato",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 4,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                    onPress={() => setIsSelectedOpen(true)}
                >
                    <Text style={{
                        fontWeight: "600",
                        color: "#fff",
                        fontSize: 14,
                    }}>Change Order Status</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent
                visible={isSelectedOpen}
                animationType='fade'
            >
                <View
                    style={styles.order_status_modal_container}
                >
                    <View style={styles.order_status_sub_container}>
                        <SelectorComponent
                            selectorList={StatusList}
                            isSelector={isSelectedOpen}
                            setIsSelector={setIsSelectedOpen}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            oid={oid}
                        />
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default OrderStatusComponent

const styles = StyleSheet.create({
    order_status_modal_container: {
        backgroundColor: "#00000055",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    order_status_sub_container: {
        height: Dimensions.get("screen").height * 0.45,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,
    }
})