import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { navString } from './constants/navStrings'
import { EDITITEMDETAIL, HOMESCREEN, ITEMDETAILSSCREEN, LOADDERSCREEN, LOGINSCREEN, MODULECREATORSCREEN, ORDERDETAILS, PRODUCTDETAILSSCREEN, PRODUCTMODULESSCREEN, SPLASHSCREEN } from './screens/screen'

const AppNavigation = () => {
    const AppNav = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <AppNav.Navigator initialRouteName={navString.Splashscreen}>
                <AppNav.Screen component={SPLASHSCREEN} name={navString.Splashscreen} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
                <AppNav.Screen component={LOGINSCREEN} name={navString.Login} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
                <AppNav.Screen component={HOMESCREEN} name={navString.Homescreen} options={{
                    headerBackVisible: false,
                    headerBackButtonMenuEnabled: false,
                }} />
                <AppNav.Screen component={LOADDERSCREEN} name={navString.Loadder} options={{
                    headerShown: false, headerBackButtonMenuEnabled: false,
                    presentation: "transparentModal",
                    animation: 'fade'
                }} />
                <AppNav.Screen component={EDITITEMDETAIL} name={navString.Edititemdetailscreen} options={{
                    title: "Edit Item"
                }} />
                <AppNav.Screen component={ORDERDETAILS} name={navString.OrderDetails} options={{
                    title: "Order Detials"
                }} />
                <AppNav.Screen component={ITEMDETAILSSCREEN} name={navString.ItemDetailsScreen} options={{
                    title: "Edit Item"
                }} />
                <AppNav.Screen component={MODULECREATORSCREEN} name={navString.ModuleCreatorScreen} options={{
                    title: "Create Module",
                    presentation:"modal",
                }} />
                <AppNav.Screen component={PRODUCTDETAILSSCREEN} name={navString.ProductDetailsScreen} options={{
                    title: "Product Details"
                }} />
                <AppNav.Screen component={PRODUCTMODULESSCREEN} name={navString.ProductModulesScreen} options={{
                    title: "Create Module",
                    presentation:"modal",
                }} />
            </AppNav.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation