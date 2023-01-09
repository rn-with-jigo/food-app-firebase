import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAssets } from '../assets/appAssets'

interface SelectorComponentProps {
    selectorList: Array | undefined,
    isSelector: Boolean | String,
    setIsSelector: void | undefined,
    setSelectedIndex: void,
    selectedIndex: Number | String | undefined,
}

const SelectorComponent = (props: SelectorComponentProps) => {

    const { selectorList, isSelector, setIsSelector, selectedIndex, setSelectedIndex } = props;


    const renderSelector = ({ item, index }) => {
        return (
            <View style={{
                height: 55,
                width: "90%",
                paddingLeft: 20,
            }}>
                <TouchableOpacity style={styles.sel_item_container}
                    onPress={() => {
                        setSelectedIndex(index);
                        if (setIsSelector) {
                            setIsSelector(!isSelector);
                        }
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