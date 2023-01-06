import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateShower from './DateShower'
import { DB_USER } from "@env";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { navString } from '../constants/navStrings';

interface OrderListCardProps {
    orderItemsList: Array | undefined,
    date: String | undefined,
    orderId: String | undefined,
    status: "Delivered" | "In Progress",
    paymentType: "COD" | "Online",
    paymentId: String | undefined,
    orderPrice: String | Number | undefined,
    userData?: Object | String | undefined,
    username?: String | undefined,
    userId: String | undefined,
}

const OrderListCard = (props: OrderListCardProps) => {

    const { date, orderId, orderItemsList, orderPrice, paymentType, paymentId, username, status, userId } = props;

    const navigation = useNavigation();

    // const [user_data, setUserData] = useState(null);

    useEffect(() => {
        // getUserDat()
    }, [])

    // async function getUserDat() {
    //     let data = await firestore()
    //         .collection(DB_USER)
    //         .doc(userId)
    //         .get()

    //     if (data) {
    //         console.log("data => ", data._data);
    //         setUserData(data._data)
    //     } else {
    //         setUserData(null)
    //     }
    // }

    const renderOrdItems = ({ item, index }) => {
        return (
            <View>
                <Image source={{ uri: item?.data?.imgeurl }} style={styles.ord_sub_item_image} />
            </View>
        )
    }

    return (
        <View style={{ marginVertical: 8, }}>
            <DateShower date={date} />
            <View style={styles.ord_item_show_main_container}>

                <TouchableOpacity style={{}}
                    onPress={() => {
                        navigation.navigate(navString.OrderDetails)
                    }}
                >

                    <View style={{
                        flexDirection: "row", alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Text style={styles.ord_item_order_text}>#{orderId || "#---"}</Text>
                        <View style={styles.ord_item_payemnt_status_container}>
                            <Text style={{ fontWeight: "700", color: "#fff" }}>{paymentType || "NaN"}</Text>
                        </View>
                    </View>

                    <Text style={{ fontWeight: "700", color: "gray", fontSize: 14 }}>{paymentId || "---"}</Text>
                    <Text style={{ fontWeight: "700", color: "tomato", fontSize: 18, marginTop: 15, }}>@{username || "----"}</Text>
                </TouchableOpacity>
                <View style={styles.ord_subtitle_price_container}>
                    <Text style={{ fontWeight: "500", color: "#000", fontSize: 16, }}>Order Items</Text>
                    <Text style={{ fontWeight: "700", color: "tomato", fontSize: 18, }}>Rs. {orderPrice || "000"}</Text>
                </View>
                <FlatList
                    data={orderItemsList || [{}, {}, {}, {}]}
                    renderItem={renderOrdItems}
                    horizontal
                    style={{ marginTop: 10, }}
                />

            </View>
        </View>
    )
}

export default OrderListCard

const styles = StyleSheet.create({
    hr_line: {
        height: 2, backgroundColor: "#00000033",
        width: "100%", alignSelf: "center",
        marginVertical: 8,
    },
    ord_item_order_text: {
        fontWeight: "700", color: "#000", fontSize: 16, marginTop: 10,
    },
    ord_item_payemnt_status_container: {
        justifyContent: "center",
        alignItems: 'center',
        height: 30,
        width: 80,
        backgroundColor: "tomato", borderRadius: 20,

    },
    ord_item_show_main_container: {
        marginTop: 16,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    ord_sub_item_image: {
        height: 60, width: 60,
        backgroundColor: "tomato",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ord_subtitle_price_container: {

        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 10,
        justifyContent: "space-between"
    },
})