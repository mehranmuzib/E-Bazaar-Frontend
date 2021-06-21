import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { StatusBar } from 'react-native'

import Cart from '../Screens/Cart/Cart'
import CheckoutNavigator from './CheckOutNavigator'

const Stack = createStackNavigator()


function MyStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    title: 'Checkout'
                }}
            />


        </Stack.Navigator>
    )
}


export default function CartNavigator() {
    return <MyStack />
}