import React, { useState, useEffect } from "react"

import { View, StyleSheet, Dimensions, Button, ScrollView, StatusBar } from 'react-native'

import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'


import { connect } from 'react-redux'

import * as actions from '../../../Redux/Actions/cartAction'

import Toast from "react-native-toast-message"
import axios from "axios"
import baseURL from "../../../assets/common/baseUrl"
import AsyncStorage from "@react-native-community/async-storage"






var { width, height } = Dimensions.get('window')



const Confirm = (props) => {

    const [token, setToken] = useState();
    const [shippingAddress1, setShippingAddress1] = useState('')
    const [shippingAddress2, setShippingAddress2] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState('')




    const finalOrder = props.route.params;
    console.log('start')








    const confirmOrder = () => {

        setShippingAddress1(finalOrder.order.order.shippingAddress1);
        setShippingAddress2(finalOrder.order.order.shippingAddress2);
        setCity(finalOrder.order.order.city);
        setZip(finalOrder.order.order.zip);
        setPhone(finalOrder.order.order.phone);
        setUser(finalOrder.order.order.user)

        const z = finalOrder.order.order.orderItems


        console.log(finalOrder.order.order.orderItems)

        console.log('quantity is ', z[0].quantity)

        var total = 0;



        /*    {
                finalOrder.order.order.orderItems.map((x) => {
                    const z = x.product;
    
    
    
                    setOrderItems(z)
                    console.log(z)
    
                })
            } */





        if (z.length === 1) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }

        if (z.length === 2) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }

        if (z.length === 3) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }

        if (z.length === 4) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }

        if (z.length === 5) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }

        if (z.length === 6) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    },
                    {
                        "quantity": z[5].quantity,
                        "id": z[5].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }


        if (z.length === 7) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    },
                    {
                        "quantity": z[5].quantity,
                        "id": z[5].product.id
                    },
                    {
                        "quantity": z[6].quantity,
                        "id": z[6].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }



        if (z.length === 8) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    },
                    {
                        "quantity": z[5].quantity,
                        "id": z[5].product.id
                    },
                    {
                        "quantity": z[6].quantity,
                        "id": z[6].product.id
                    },
                    {
                        "quantity": z[7].quantity,
                        "id": z[7].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }


        if (z.length === 9) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    },
                    {
                        "quantity": z[5].quantity,
                        "id": z[5].product.id
                    },
                    {
                        "quantity": z[6].quantity,
                        "id": z[6].product.id
                    },
                    {
                        "quantity": z[7].quantity,
                        "id": z[7].product.id
                    },
                    {
                        "quantity": z[8].quantity,
                        "id": z[8].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }


        if (z.length === 10) {
            var order = {
                "orderItems": [
                    {
                        "quantity": z[0].quantity,
                        "id": z[0].product.id
                    },
                    {
                        "quantity": z[1].quantity,
                        "id": z[1].product.id
                    },
                    {
                        "quantity": z[2].quantity,
                        "id": z[2].product.id
                    },
                    {
                        "quantity": z[3].quantity,
                        "id": z[3].product.id
                    },
                    {
                        "quantity": z[4].quantity,
                        "id": z[4].product.id
                    },
                    {
                        "quantity": z[5].quantity,
                        "id": z[5].product.id
                    },
                    {
                        "quantity": z[6].quantity,
                        "id": z[6].product.id
                    },
                    {
                        "quantity": z[7].quantity,
                        "id": z[7].product.id
                    },
                    {
                        "quantity": z[8].quantity,
                        "id": z[8].product.id
                    },
                    {
                        "quantity": z[9].quantity,
                        "id": z[9].product.id
                    }
                ],
                "shippingAddress1": shippingAddress1,
                "shippingAddress2": shippingAddress2,
                "city": city,
                "zip": zip,
                "phone": phone,
                "user": user
            }
        }


        axios
            .post(`${baseURL}orders`, order)


            .then((res) => {

                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: "",
                    })

                    setTimeout(() => {
                        props.clearCart();
                        props.navigation.navigate("cart")
                    }, 500)
                }

            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                })
            })


    }


    return (

        <View>

            <StatusBar
                backgroundColor="green"
                barStyle="default"
            />

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.titleContainer}>



                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Confirm Order
                    </Text>

                    {props.route.params ?
                        (
                            <View style={{ borderWidth: 3, borderColor: '#56DA56' }}>

                                <Text style={styles.title}>
                                    Shipping To
                                </Text>
                                <View style={{ padding: 8 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Address: {finalOrder.order.order.shippingAddress1}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>City: {finalOrder.order.order.city}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Zip Code: {finalOrder.order.order.zip}</Text>
                                </View>
                                <Text style={styles.title}> Items: </Text>

                                {finalOrder.order.order.orderItems.map((x) => {
                                    return (
                                        <ListItem
                                            style={styles.listItem}
                                            key={x.product.name}
                                            avatar
                                        >
                                            <Left>
                                                <Thumbnail source={{ uri: x.product.image }} />
                                            </Left>
                                            <Body style={styles.body}>
                                                <Left>
                                                    <Text style={{ fontWeight: 'bold' }}>{x.product.name}</Text>
                                                </Left>
                                                <Right>
                                                    <Text style={{ fontWeight: 'bold' }}>Tk {x.product.price * x.quantity}</Text>
                                                </Right>

                                            </Body>
                                        </ListItem>
                                    )
                                })}


                            </View>

                        )

                        : null}
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Button color={'green'} title={'place order'}
                            onPress={confirmOrder}

                        />

                    </View>
                </View>


            </ScrollView>




            <Text>Total</Text>


        </View>





    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(null, mapDispatchToProps)(Confirm);