import React, { useEffect, useState, useCallback } from "react"
import { View, FlatList, Text, Button } from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"


import OrderCard from '../../Shared/OrderCard'


const Orders = (props) => {

    const [orderList, setOrderList] = useState();
    const [token, setToken] = useState();











    useFocusEffect(
        useCallback(
            () => {
                getOrders();
                return () => {
                    setOrderList();
                }
            },
            [],
        )
    )



    const getOrders = () => {





        axios
            .get(`${baseURL}orders`)
            .then((x) => {
                setOrderList(x.data);
            })
            .catch((error) => console.log(error))
    }

    return (
        <View>


            <FlatList
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard navigation={props.navigation} {...item} editMode={true} />
                )}
                keyExtractor={(item) => item.id}


            />


        </View>
    )
}


export default Orders