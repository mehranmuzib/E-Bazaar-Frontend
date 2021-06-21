import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, Text } from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"
import AuthGlobal from "../../Context/store/AuthGlobal"
import AsyncStorage from "@react-native-community/async-storage"

import SellerCard from "../../Shared/SellerCard"

const Sellers = (props) => {

    const [sellerList, setSellerList] = useState();

    const context = useContext(AuthGlobal)


    useFocusEffect(
        useCallback(





            () => {



                getSellers();
                return () => {
                    setSellerList();
                }
            },
            [],
        )
    )




    const getSellers = () => {
        axios
            .get(`${baseURL}sellers/get/${context.stateUser.user.userId}`)
            .then((x) => {
                setSellerList(x.data);
            })
            .catch((error) => console.log(error))

        //    console.log(context.stateUser.user.userId)

    }

    return (
        <View>
            {context.stateUser.isAuthenticated ? (
                <FlatList
                    data={sellerList}
                    renderItem={({ item }) => (
                        <SellerCard navigation={props.navigation} {...item} />
                    )}
                />
            ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                    <Text style={{ fontWeight: "bold", justifyContent: "center", fontSize: 35 }}>দয়া করে লগইন করুন</Text>
                </View>
            )}
        </View>
    )
}

export default Sellers;