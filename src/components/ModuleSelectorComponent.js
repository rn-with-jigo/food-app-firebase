import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, StyleSheetProperties, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { AppAssets } from '../assets/appAssets'
import { options } from '../utils/commanStrings';

interface ModuleSelectorComponentProps {
    onSelectedIndex: void | Function | undefined,
    propOption?: Array | undefined,
    optionsContainerStyle?: ViewStyle | undefined,
    selectorContianerStyle?: ViewStyle,
    seletorLabel? : String | undefined,
    label? : String | undefined,
    isLabelVisiable? : Boolean | undefined,
}

const ModuleSelectorComponent = (props: ModuleSelectorComponentProps) => {

    const { onSelectedIndex, optionsContainerStyle, propOption,selectorContianerStyle,isLabelVisiable ,label , seletorLabel} = props

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [openSelector, setOpenSelector] = useState(false);

    const renderOptionItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                height: 80,
                padding: 10,
                justifyContent: "center",
            }}
                onPress={() => {
                    setSelectedItemIndex(index)
                    setOpenSelector(false);
                    onSelectedIndex(index);
                }}
            >
                <Text style={[{
                    fontWeight: "600",
                    fontSize: 14,
                }, {
                    color: selectedItemIndex == index ? "tomato" : "#000",
                }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <View style={styles.main_container}>
                {isLabelVisiable?
                <Text style={styles.heading_text}>{label || " "}</Text>
                : null}
                <TouchableOpacity style={selectorContianerStyle || styles.select_item_contaienr}
                    onPress={() => {
                        setOpenSelector(true);
                    }}
                >
                    <Text style={styles.selecte_text}>{(propOption)?propOption[selectedItemIndex]?.name  :options[selectedItemIndex]?.name || seletorLabel || " "}</Text>
                    <View style={styles.down_arrow_container}>
                        <Image source={AppAssets.DownIcon} style={{ height: 20, width: 20, }} />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={openSelector}
                transparent
                animationType='fade'
            >
                <View style={styles.outer_modal_container}>
                    <View style={optionsContainerStyle || styles.select_container}>
                        <View style={{ flex: 1, }}>
                            <FlatList
                                data={propOption || options}
                                keyExtractor={item => item.id.toString()}
                                renderItem={renderOptionItems}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 3, backgroundColor: "#00000033" }} />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModuleSelectorComponent

const styles = StyleSheet.create({
    down_arrow_container: {
        // width: "15%",
        marginRight:10,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"pink"
    },
    heading_text: {
        fontWeight: "600",
        fontSize: 14,
        color: "#000"
    },
    main_container: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    outer_modal_container: {
        flex: 1,
        backgroundColor: "#00000044",
        justifyContent: "center",
        alignItems: "center",
    },
    select_container: {
        height: "20%",
        width: '75%',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    select_item_contaienr: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowRadius: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
    },
    selecte_text: {
        flex: 1,
        fontWeight: "600",
        fontSize: 12,
        color: "#000",
    }
})