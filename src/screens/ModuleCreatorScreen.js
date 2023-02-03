import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { AppAssets } from '../assets/appAssets'
import InputTackerComponent from '../components/InputTackerComponent'
import ModuleSelectorComponent from '../components/ModuleSelectorComponent'
import { options } from '../utils/commanStrings'
import SNPModuleComponent from '../components/ModuleComponents/SNPModuleComponent'
import CustomToast from '../components/CustomToast'
import { DB_MODULES } from "@env"
import firestore from '@react-native-firebase/firestore';
import uuid from "react-native-uuid"

const ModuleCreatorScreen = ({ navigation }) => {


    const [moduleName, setModuleName] = useState("");
    const [getSelectedIndex, setSelectedIndex] = useState(null);

    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            // headerTitle: "jigo"

            headerLeft: () => {
                if (Platform.OS === "ios") {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Image source={AppAssets.CloseIcon} style={{ height: 15, width: 15, }} />
                        </TouchableOpacity>
                    )
                };
            }
        })
    }, [])


    function createModule() {
        if (!moduleName || addedItems.length <= 0) {
            return CustomToast("Pleaes Provide data for create a module")
        }

        let SNPobject = {};
        SNPobject.id = uuid.v4();
        SNPobject.moduleType = options[getSelectedIndex]?.slug || undefined
        SNPobject.moduleData = (addedItems.length > 0) ? addedItems : []

        firestore().
            collection(DB_MODULES)
            .add(SNPobject)
            .then((data) => {
                console.log("create succesfullt,");
                console.log(data);
            })
    }

    const LoadComponent = useCallback(() => {
        if (getSelectedIndex != null) {
            console.log("getSelectedIndex => ", getSelectedIndex)
            return (
                <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                    {options[getSelectedIndex].slug == "SNP" ?
                        <SNPModuleComponent
                            getItemAdded={(e) => {
                                setAddedItems(e)
                            }} /> : null}

                </View>
            )
        }
        return null;
    }, [getSelectedIndex])

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <InputTackerComponent
                        inputValue={moduleName}
                        lablename="Module Name"
                        placeholder={"Enter module name"}
                        onChangeText={setModuleName}
                    />

                    <ModuleSelectorComponent
                        onSelectedIndex={(c) => {
                            console.log(c);
                            setSelectedIndex(c);
                        }}
                    />

                    <LoadComponent />

                </ScrollView>
                {addedItems.length > 0 ?
                    <TouchableOpacity style={styles.create_btn_container}
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
        </ScreenWrapper>
    )
}

export default ModuleCreatorScreen

const styles = StyleSheet.create({
    create_btn_container: {
        marginTop: 16,
        height: 40,
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 16,
    },
    heading_text: {
        fontWeight: "600",
        color: "#000",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 8,
    }
})