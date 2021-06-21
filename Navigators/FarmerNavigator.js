import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'




import payment from '../Screens/Farmer/payment'
import product from '../Screens/Farmer/product'



const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{


                indicatorStyle: {
                    bottom: 0,
                    backgroundColor: 'green',
                    borderRadius: 10

                }

            }

            }>

            <Tab.Screen name="Current Product" component={payment} />
            <Tab.Screen name="New Product" component={product} />

        </Tab.Navigator>
    )
}

export default function CheckoutNavigator() {
    return <MyTabs />
}