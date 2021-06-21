import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";



import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

const codes = [
    { name: "pending", code: "3" },
    { name: "canceled", code: "2" },
    { name: "accepted", code: "1" },
];


const SellerCard = (props) => {

    const [sellerStatus, setSellerStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();


    useEffect(() => {


        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));


        if (props.status == "3") {
            // setSellerStatus(<TrafficLight unavailable></TrafficLight>)
            setStatusText("pending")
            setCardColor('#F1C40F')

        } else if (props.status == "2") {
            //  setOrderStatus(<TrafficLight limited></TrafficLight>);
            setStatusText("canceled");
            setCardColor("#E74C3C");
        } else if (props.status == "1") {
            //  setOrderStatus(<TrafficLight available></TrafficLight>);
            setStatusText("accepted");
            setCardColor("#2ECC71");
        } else {
            setStatusText("pending")
            setCardColor('#F1C40F')
        }


        return () => {
            setCardColor()
            setSellerStatus()
            setStatusText()
        }

    }, [])

    const updateSeller = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const seller = {
            name: props.name,
            description: props.description,
            dateCrdered: props.dateCrdered,
            id: props.id,
            status: statusChange,
            price: props.price,
            user: props.user,
            image: props.image,
            brand: props.brand,
            category: props.category,
            bKash: props.bKash,
            VoterId: props.VoterId
        };

        axios
            .put(`${baseURL}sellers/${props.id}`, seller, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Seller Edited",
                        text2: "",
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500);
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            });


    }

    return (
        <View style={[{ backgroundColor: cardColor }, styles.container]}>
            <View style={styles.container}>
                <Text>Seller Number : #{props.id}</Text>
            </View>

            <Image
                source={{
                    uri: props.image ? props.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQfMyulj3-HwrhSTAqgkakrhGyIxxCRekBQ&usqp=CAU'
                }}
                resizeMode="contain"
                style={styles.image}

            />

            <View style={{ marginTop: 10 }}>
                <Text>
                    স্থিতি : {statusText}
                </Text>
                <Text>
                    নাম : {props.name}
                </Text>

                <Text>
                    পরিমাণ : {props.countInStock}
                </Text>
                <Text>
                    তারিখ : {props.dateCreated.split("T")[0]}
                </Text>
                <Text>
                    বিকাশ নং: {props.bKash}
                </Text>

                <Text>
                    ভোটার নং  : {props.VoterId}
                </Text>

                <View style={styles.priceContainer}>
                    <Text>দাম: </Text>
                    <Text style={styles.price}>Tk {props.price}</Text>
                </View>


                {props.editMode ? (
                    <View>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={statusChange}
                            placeholder="Change Status"
                            placeholderIconColor={{ color: "#007aff" }}
                            onValueChange={(e) => setStatusChange(e)}
                        >
                            {codes.map((c) => {
                                return (
                                    <Picker.Item key={c.code} label={c.name} value={c.code} />
                                );
                            })}


                        </Picker>

                        <EasyButton primary large onPress={() => updateSeller()}>
                            <Text style={{ color: "white" }}>আধুনিক রূপ দেওয়া</Text>
                        </EasyButton>
                    </View>
                ) : null}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    title: {
        backgroundColor: "#62B1F6",
        padding: 5,
    },
    priceContainer: {
        marginTop: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    price: {
        color: "black",
        fontWeight: "bold",
    },
    image: {
        width: '100%',
        height: 200
    },
});

export default SellerCard;