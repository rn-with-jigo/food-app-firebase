import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DB_ORDERS } from "@env";
import firestore from '@react-native-firebase/firestore';

interface OrderTimeLineComponentProps {
    list: Array | undefined | [],
    reachedAtId: String | undefined,
}

const OrderTimeLineComponent = (props: OrderTimeLineComponentProps) => {
    const { list, reachedAtId, oid } = props;

    const [timelineList, setTimelineList] = useState([]);

    useEffect(() => {
        // console.log(list);
        // if (list != undefined || list != null) {
        //     setTimelineList(list);
        // }
        let subscriber = firestore()
            .collection(DB_ORDERS)
            .where("oid", "==", oid)
            .onSnapshot(data_snapshot => {
                let whole_data = data_snapshot.docs[0]._data.oactivity;
                console.log(data_snapshot.docs[0]._data);
                setTimelineList(whole_data)
            })

        return () => subscriber();
    }, [])

    const renderTimeLine = (ele, index) => {
        return (
            <View style={{ marginVertical: 5, }} key={index}>
                <Text style={{
                    fontWeight: "600",
                    color: "tomato",
                    fontSize: 14
                }}>{ "Order Is "+ ele?.activityAction || "Order Placed"}</Text>
                <Text style={{
                    fontWeight: "bold",
                    color: "gray",
                    fontSize: 11,

                }}>{ele?.activityDate || "@ 2 Jan, 2023 | 6:00 AM"}</Text>
                <View style={{
                    position: "absolute",
                }}>
                    <View style={{
                        width: 2, backgroundColor: reachedAtId == ele.sid ? "green" : "gray",
                        height: 40, left: -20, zIndex: 9
                    }} />
                    <View style={{
                        height: 16, width: 16, borderRadius: 8,
                        backgroundColor: reachedAtId == ele.sid ? "green" : "gray", position: "absolute", left: -27, top: 5,
                    }} />
                </View>
            </View>
        )
    }

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
                marginLeft: 30,
            }}

            >
                {timelineList.length > 0 ? timelineList.map((ele, index) => {
                    return (
                        renderTimeLine(ele, index)
                    )
                })
                    :
                    [{}, {}, {}].map((ele, index) => {
                        return (
                            renderTimeLine(ele, index)
                        )
                    })
                }
            </View>


        </View>
    )
}

export default OrderTimeLineComponent

const styles = StyleSheet.create({})