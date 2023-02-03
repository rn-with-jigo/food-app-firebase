import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAssets } from '../../assets/appAssets'
import InputTackerComponent from '../InputTackerComponent'
import CustomToast from '../CustomToast'
import { getRandomString } from '../../utils/commanStrings'
import ModuleSelectorComponent from '../ModuleSelectorComponent'

const SNPModuleComponent = ({ getItemAdded }) => {

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    const [itemAdded, setItemAdd] = useState([]);

    const [selectedActon, setSelectedAction] = useState(0);

    useEffect(() => {
        if (getItemAdded) {

            getItemAdded(itemAdded)
        }
    }, [itemAdded])

    function saveModuleitems() {
        if (!itemName || !itemPrice || selectedActon == 0) {
            return CustomToast("Please fill all details")
        }

        let obj = {};
        obj.id = getRandomString(6) || "#undefiend"
        obj.name = itemName;
        obj.price = itemPrice;
        obj.action = selectedActon == 1? null : selectedActon == 2? "+": selectedActon == 3? "-" : null

        setItemAdd([...itemAdded, obj])
        setItemName("");
        setItemPrice(null);
    }

    const RenderAddedItems = (item, index) => {
        // console.log(item, index);
        return (
            <View style={styles.item_container} key={item.id}>
                <Text>{item?.name || "undefined"}</Text>
                <Text>{"Rs. " + item?.price || "undefined"}</Text>
            </View>
        )
    }

    return (
        <View >
            {/* <View style={styles.add_item_container}>
                <TouchableOpacity style={styles.add_btn_container}>
                    <Image source={AppAssets.Add} style={{ height: 25, width: 25, tintColor: "#fff" }} />
                </TouchableOpacity>
                <Text style={styles.add_heading_text}>Click to Add new item</Text>
            </View> */}
            <InputTackerComponent
                lablename={"Item Name"}
                placeholder={"e.g regular"}
                inputValue={itemName}
                onChangeText={setItemName}
            />
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
                <TouchableOpacity style={[styles.add_item_action_container, {backgroundColor: selectedActon == 1?"tomato":null}]}
                    onPress={() => {
                        setSelectedAction(1)
                    }}
                >
                    <Text style={[styles.add_item_action_text, {color: selectedActon == 1?"#fff":"tomato"}]}>None</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.add_item_action_container, {backgroundColor: selectedActon == 2?"tomato":null}]}
                    onPress={() => {
                        setSelectedAction(2)
                    }}
                >
                    <Text style={[styles.add_item_action_text, {color: selectedActon == 2?"#fff":"tomato"}]}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.add_item_action_container, {backgroundColor: selectedActon == 3?"tomato":null}]}
                    onPress={() => {
                        setSelectedAction(3)
                    }}
                >
                    <Text style={[styles.add_item_action_text, {color: selectedActon == 3?"#fff":"tomato"}]}>Minus</Text>
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
                    {/* <FlatList 
                        data={itemAdded}
                        renderItem={renderAddedItems}
                        ItemSeparatorComponent={() => (
                            <View style={{height:3, backgroundColor:"#00000044"}}/>
                        )}
                    /> */}
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

export default SNPModuleComponent

const styles = StyleSheet.create({
    add_btn_container: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "tomato",
    },
    add_heading_text: {
        fontWeight: "600",
        color: "#000",
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
    },
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
    add_item_container: {
        height: 100,
        padding: 10,

    },
    item_container: {
        height: 45,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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