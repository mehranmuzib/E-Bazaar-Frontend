import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native'

import { Left, Right, Container, H1 } from 'native-base'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartAction'
import Toast from 'react-native-toast-message'
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'


const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")
    const [quantity, setQuantity] = useState(1)


    const incrementValue = () => {
        setQuantity(quantity + 1)
    }

    const decrementValue = () => {
        if (quantity != 1) {
            setQuantity(quantity - 1)
        }
    }

    console.log(quantity)


    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])



    return (
        <Container>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQfMyulj3-HwrhSTAqgkakrhGyIxxCRekBQ&usqp=CAU'
                        }}
                        resizeMode="contain"
                        style={styles.image}

                    />
                </View>

                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>

                </View>

                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>


                </View>


            </ScrollView>


            <View style={styles.bottomContainer}>



                <Left>

                    <Text style={styles.price}>Tk {item.price} /Kg</Text>
                </Left>

                <Text style={styles.count}>count in Stock {item.countInStock}</Text>
                <Right>
                    <Button
                        title='Add'
                        color={'green'}
                        onPress={() => {
                            props.addItemToCart(item),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${item.name} added to cart`,
                                    text2: "Go to your cart to complete order"
                                })
                        }}

                    />
                </Right>
            </View>
        </Container>
    )
}




const mapToDispatchToProps = (dispatch) => {


    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 16,
        margin: 20,
        color: 'green'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center",

    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    count: {
        fontSize: 16,
        margin: 20,
        color: 'green'
    },


})


export default connect(null, mapToDispatchToProps)(SingleProduct);