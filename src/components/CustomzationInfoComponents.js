import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CustomzationInfoComponentsProps {
    isVisiable: Boolean | undefined,
    setIsVisiable: void | Function | undefined,
    custmzation?: Array | Object | undefined,
}

const CustomzationInfoComponents = (props: CustomzationInfoComponentsProps) => {

    const { isVisiable, setIsVisiable, custmzation } = props;
    // console.log(custmzation);
    return (
        <Modal
            visible={isVisiable}
            transparent
            animationType='fade'
        >
            <View style={styles.cus_modal_outer_contianer}>
                <View style={styles.cus_modal_innder_container}>
                    <TouchableOpacity style={styles.cus_modal_close_btn}
                        onPress={() => {
                            if (setIsVisiable) {
                                setIsVisiable(false);
                            }
                        }}
                    >
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "#000",
                        }}>X</Text>
                    </TouchableOpacity>

                    {custmzation.length > 0 ?
                        custmzation.map((ele, index) => {

                            for (const [key, value] of Object.entries(ele)) {
                                if (!Array.isArray(value)) {
                                    return (
                                        <View >
                                            <Text style={{
                                                fontWeight: "600",
                                                fontSize: 16,
                                                color: "tomato",
                                            }}>{key}:</Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4, }}>
                                                <Text >{value?.name}</Text>
                                                <Text>Rs.   {value?.price}</Text>
                                            </View>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={{ marginTop: 10, }}>
                                            <Text style={{
                                                fontWeight: "600",
                                                fontSize: 16,
                                                color: "tomato",
                                                marginBottom: 4,
                                            }}>{key}:</Text>
                                            {value.map((e) => {
                                                return (
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text>{e?.name}</Text>
                                                        <Text>Rs. {e?.price}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    )
                                }
                            }
                        })
                        // custmzation.map((ele, index) => {
                        //     return (
                        //         <View style={{ marginVertical: 8, }} key={index}>
                        //             <Text style={{
                        //                 fontWeight: "600",
                        //                 fontSize: 16,
                        //                 color: "tomato",
                        //             }}>Custumization Details: {`(${ele.cusModuleName})` || ""} </Text>
                        //             <View style={{
                        //                 flexDirection: "row",
                        //                 justifyContent: "space-between",
                        //                 alignItems: "center",
                        //                 marginTop: 8,
                        //             }}>
                        //                 <Text style={{
                        //                     fontWeight: "500",
                        //                     fontSize: 14,
                        //                     color: "#000",
                        //                 }}>{ele.cusName || "--"}</Text>
                        //                 <Text style={{
                        //                     fontWeight: "500",
                        //                     fontSize: 14,
                        //                     color: "#000",
                        //                 }}>{"RS. " + ele.cusPrice || "--"}</Text>
                        //             </View>
                        //         </View>
                        //     )
                        // })

                        : null}
                </View>
            </View>
        </Modal>
    )
}

export default CustomzationInfoComponents

const styles = StyleSheet.create({
    cus_modal_close_btn: {
        height: 30,
        alignItems: "flex-end",
    },
    cus_modal_innder_container: {
        padding: 10,
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    cus_modal_outer_contianer: {
        flex: 1,
        backgroundColor: "#00000044",
        justifyContent: "center",
        alignItems: "center",
    },
})