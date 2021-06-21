import React, { useState, useCallback } from "react"
import { View, FlatList, Text } from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"

import SellerCard from "../../Shared/SellerCard"

const Sellers = (props) => {

    const [sellerList, setSellerList] = useState();

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
            .get(`${baseURL}sellers`)
            .then((x) => {
                setSellerList(x.data);
            })
            .catch((error) => console.log(error))
    }

    return (
        <View>
            <FlatList
                data={sellerList}
                renderItem={({ item }) => (
                    <SellerCard navigation={props.navigation} {...item} {...item} editMode={true} />
                )}
            />
        </View>
    )
}

export default Sellers;