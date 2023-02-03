import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getRandomString, options1 } from '../../utils/commanStrings';
import SNPModuleComponent from '../../components/ModuleComponents/SNPModuleComponent';
import InputTackerComponent from '../../components/InputTackerComponent';
import ModuleSelectorComponent from '../../components/ModuleSelectorComponent';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore"
import { DB_ITEMS } from "@env";
import { navString } from '../../constants/navStrings';
import SwitchComponent from '../../components/SwitchComponent';
import SNIPModuleComponent from '../../components/ModuleComponents/SNIPModuleComponent';
import CustomToast from '../../components/CustomToast';

const ProductModulesScreen = ({ navigation, route }) => {
    // console.log("route");
    const { itemData, itemId } = route.params;

    const [getSelectedIndex, setSelectedIndex] = useState(null);
    const [moduleName, setModuleName] = useState("");

    const [addedItems, setAddedItems] = useState([]);
    const [isMultipleChosser, setMultipleChosser] = useState(false);

    useEffect(() => {
        console.log(itemData);
    }, [])

    async function createModule() {
        navigation.push(navString.Loadder);
        if (!moduleName || addedItems <= 0) {
            navigation.pop(1);
            return CustomToast("Please enter details");
        }
        let final_ = addedItems.map(async (e, i) => {
            console.log("e => ", e);
            const reference = storage().ref("m_" + moduleName + "_" + e.name + "_img_.png");
            const pathToFile = e.img;
            // console.log(reference.fullPath);
            await reference.putFile(pathToFile);
            const url = await storage().ref(reference.fullPath).getDownloadURL();
            console.log(url);
            e.img = url
            return e;
        })
        Promise.all(final_).then((r) => {
            console.log("r=>r> ", r);
            setAddedItems(r)
        }).then(() => {



            // return;

            let obj = {};
            obj.id = getRandomString(8);
            obj.name = moduleName;
            obj.moduleData = addedItems;
            obj.moduleType = options1[getSelectedIndex].name
            obj.moduleSlug = options1[getSelectedIndex].slug
            obj.isMutiple = isMultipleChosser

            console.log(obj);

            // console.log(itemData);

            if (itemData.hasOwnProperty("extraModule")) {
                let get_exraModules = itemData?.extraModule || [];
                if (get_exraModules.length > 0) {
                    console.log("item found more then 1");
                    get_exraModules.push(obj);
                    firestore()
                        .collection(DB_ITEMS)
                        .doc(itemId)
                        .update({
                            extraModule: get_exraModules,
                        })
                        .then((res) => {
                            console.log("res (update old one)=> ", res);
                            navigation.pop(1);
                            navigation.pop(1);
                        })
                }
            } else {
                firestore()
                    .collection(DB_ITEMS)
                    .doc(itemId)
                    .update({
                        extraModule: [obj],
                    })
                    .then((res) => {
                        console.log("res (update new)=> ", res);
                        navigation.pop(1);
                        navigation.pop(1);
                    })
            }
        })
        // setTimeout(() => {

        // }, 3000);

    }

    const LoadComponent = useCallback(() => {
        if (getSelectedIndex != null) {
            console.log("getSelectedIndex => ", getSelectedIndex)
            return (
                <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                    {options1[getSelectedIndex].slug == "SNP" ?
                        <SNPModuleComponent
                            getItemAdded={(e) => {
                                // console.log(e);
                                setAddedItems(e)
                            }} /> :
                        <SNIPModuleComponent
                            getItemAdded={(e) => {
                                setAddedItems(e)
                            }}
                        />
                    }

                </View>
            )
        }
        return null;
    }, [getSelectedIndex])

    return (
        <View style={styles.pro_main_container}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 16,
                }}
            >
                <View>
                    <InputTackerComponent
                        inputValue={setModuleName}
                        lablename="Module Name"
                        placeholder={"Enter module name"}
                        onChangeText={setModuleName}
                    />

                    <SwitchComponent
                        onSwitchStateChange={(ans) => {
                            console.log("siwthc is => ", ans);
                            setMultipleChosser(ans);
                        }}
                    />

                    <ModuleSelectorComponent
                        onSelectedIndex={(c) => {
                            console.log(c);
                            setSelectedIndex(c);
                        }}
                        seletorLabel={"Selecte Module Type"}
                    />
                    <LoadComponent />
                </View>
            </ScrollView>
            {addedItems.length > 0 ?
                <TouchableOpacity style={styles.pro_create_btn_container}
                    onPress={() => {
                        createModule()
                    }}
                >
                    <Text style={{
                        fontWeight: "600",
                        fontSize: 16,
                        color: "#fff",
                    }}>Create Module</Text>
                </TouchableOpacity>
                : null}
        </View>
    )
}

export default ProductModulesScreen

const styles = StyleSheet.create({
    pro_main_container: {
        flex: 1,
        margin: 10,
    },
    pro_create_btn_container: {
        // marginTop: 16,
        marginBottom: 10,
        height: 40,
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 16,
    }
})