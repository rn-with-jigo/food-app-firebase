import { StyleSheet, Text, TextInput, View, TextInputProps, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppAssets } from '../assets/appAssets';

interface InputTackerComponentProps {
    lablename: String | null | undefined,
    inputValue: String | null | undefined,
    placeholder?: String | null | undefined,
    onChangeText: void | Function | undefined,
    inputProps?: TextInputProps,
    inputType?: 'price' | 'text',
}

const InputTackerComponent = (props: InputTackerComponentProps) => {

    const { inputValue, lablename, onChangeText, placeholder, inputProps, inputType } = props;

    return (
        <View style={styles.outer_contianer}>
            <Text style={styles.lable_text}>{lablename || "undefined"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <TextInput style={styles.textinput_container}
                    placeholder={placeholder || "undefined"}
                    value={inputValue || null}
                    onChangeText={onChangeText || null}
                    {...inputProps}
                />
                {inputType == "price" ?
                    <TouchableOpacity style={{
                        height: 40,
                        width: "25%",
                        backgroundColor: "pink",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        marginLeft: 10,
                    }}>
                        <Text style={{ fontWeight: "600", fontSize: 20, color: "gray" }}>{"+"}</Text>
                        <View style={{}}>
                            <Image source={AppAssets.DownIcon} style={{ height: 17, width: 17, }} />
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>
        </View>
    )
}

export default InputTackerComponent;

const styles = StyleSheet.create({
    lable_text: {
        fontWeight: "600", fontSize: 14, color: "#000"
    },
    outer_contianer: {
        marginHorizontal: 16, marginVertical: 8
    },
    textinput_container: {
        flex: 1,
        marginTop: 10,
        height: 40,
        padding: 5,
        borderWidth: 0.5, borderRadius: 5,
        paddingLeft: 15,
    }

})