import React, { useState } from 'react'
import { StyleSheet, Button, View } from 'react-native'
import CounterInput from "react-native-counter-input";

import Cart from './Cart'

import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'

const CartItem = (props) => {
    const data = props.item.item.product
    const [quantity, setQuantity] = useState(props.item.item.quantity)


    props.item.item.quantity = quantity

    console.log(quantity)




    props.item.item.total = props.item.item.quantity * props.item.item.product.price
    //  console.log(quantity)

    const incrementValue = () => {
        setQuantity(quantity + 1)
    }

    const decrementValue = () => {
        if (quantity != 1) {
            setQuantity(quantity - 1)
        }
    }

    return (

        <ListItem
            style={styles.listItem}
            key={Math.random()}
            avatar
        >
            <Left>
                <Thumbnail source={{ uri: data.image ? data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQfMyulj3-HwrhSTAqgkakrhGyIxxCRekBQ&usqp=CAU' }} />
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>

                <Text>Tk {data.price}</Text>

                <Button title='-' onPress={decrementValue} color="green" />

                <Text style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>   {quantity}</Text>

                <Button title='+' onPress={incrementValue} color="green" />




            </Body>
        </ListItem>





    )
}

const styles = StyleSheet.create({

    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
})


export default CartItem;