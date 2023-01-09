import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectorComponent from '../SelectorComponent'

const OrderStatusComponent = () => {

    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        console.log("seleceted Index -< ", selectedIndex);
    }, [selectedIndex])

    const StatusList = [
        {
            id: "#S001",
            status: "IsPlaced",
        },
        {
            id: "#S002",
            status: "IsAccepted",
        },
        {
            id: "#S003",
            status: "IsCancled",
        },
        {
            id: "#S004",
            status: "IsPrepared",
        },
        {
            id: "#S005",
            status: "IsCompleted",
        },
    ]

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
                }}>Current Order Status: <Text style={{ fontWeight: "bold", color: "#000" }}>{StatusList[selectedIndex].status}</Text></Text>
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