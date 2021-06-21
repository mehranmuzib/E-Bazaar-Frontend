import React, { useContext, useState } from 'react'
import { View, Dimensions, StyleSheet, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import {
    container,
    Text,
    Left,
    Right,
    H1,
    ListItem,
    Thumbnail,
    Body,
    Container
} from 'native-base'

import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'

import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartAction'
import AuthGlobal from '../../Context/store/AuthGlobal'

var { height, width } = Dimensions.get("window")


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Cart = (props) => {

    const context = useContext(AuthGlobal)
    var [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);



    console.log('start')
    console.log(props.cartItems)




    props.cartItems.forEach(cart => {
        return (total += cart.product.price * cart.quantity)



    })


    //   setTotal(5)


    return (


        <>
            {props.cartItems.length ? (

                <Container>

                    <View style={{ height: 60 }} >
                        <ScrollView
                            contentContainerStyle={styles.scrollView}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <Text>Pull down to check updated Price</Text>
                        </ScrollView>
                    </View>

                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"red"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />


                    <View style={styles.bottomContainer}>

                        <Left>
                            <Text style={styles.price}>Tk {total}</Text>
                        </Left>
                        <Right>

                            <Button
                                title='clear'
                                color='green'
                                onPress={() => props.clearCart()}
                            />



                        </Right>

                        <Right>
                            {context.stateUser.isAuthenticated ? (

                                <Button
                                    title='checkout'
                                    color='green'
                                    onPress={() => props.navigation.navigate('Checkout')}
                                />

                            ) : (
                                <Button
                                    title='Login'
                                    color='red'
                                    onPress={() => props.navigation.navigate('Login')}
                                />
                            )}
                        </Right>
                    </View>

                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>It's empty</Text>
                    <Text>Add products to your cart to get started</Text>
                </Container>
            )}

        </>





    )
}


const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#BAEDBA',
        alignItems: 'center',
        justifyContent: 'center',

    },
});




export default connect(mapStateToProps, mapDispatchToProps)(Cart);