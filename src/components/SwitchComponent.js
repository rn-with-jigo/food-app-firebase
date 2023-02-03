import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface SwitchComponentProps {
    onSwitchStateChange: void | Function | undefined,
}

const SwitchComponent = (props: SwitchComponentProps) => {

    const { onSwitchStateChange } = props;

    const [isSwitch, setIsSwitch] = useState(false);
    const toggleSwitch = () => setIsSwitch(previousStat => !previousStat);

    useEffect(() => {
        if(onSwitchStateChange) onSwitchStateChange(isSwitch)
    }, [isSwitch])

    return (
        <View style={styles.swt_main_container}>
            <Text>Is multiple chosse</Text>
            <Switch trackColor={{
                false: "#00000044",
                true: "tomato",
            }}
                thumbColor={isSwitch ? "#fff" : "tomato"}
                onValueChange={toggleSwitch}
                value={isSwitch}
            />
        </View>
    )
}

export default SwitchComponent

const styles = StyleSheet.create({
    swt_main_container: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})