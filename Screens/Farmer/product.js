
import React, { useContext, useState, useEffect } from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../../Shared/From/FormContainer"
import Input from "../../Shared/From/Input"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import mime from "mime";

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"


const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);
    const [user, setUser] = useState('6076b3f4dc12363fe4a7fdcd');
    const [bKash, setBKash] = useState();
    const [VoterId, setVoterId] = useState();

    const context = useContext(AuthGlobal)


    console.log(context.stateUser.user.userId)
    useEffect(() => {

        if (!props.route.params) {
            setItem(null)
        } else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
            setBKash(props.params.route.params.item.bKash)
            setVoterId(props.params.route.params.item.bKash.VoterId)

        }





        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
        // Categories

        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error to load categories"));

        //Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })();

        return () => {
            setCategories([])
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {

            setMainImage(result.uri);
            setImage(result.uri);
        }
    };

    const addProduct = () => {
        if (
            name == "" ||
            brand == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == ""
        ) {
            setError("Please fill in the form correctly")
        }

        let formData = new FormData();




        formData.append("image", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop()
        });
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);
        formData.append("user", context.stateUser.user.userId)
        formData.append("bKash", bKash)
        formData.append("VoterId", VoterId)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }


        if (item !== null) {
            axios
                .put(`http://ad59a643c32b.ngrok.io/api/v1/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        } else {

            axios
                .post(`${baseURL}sellers`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfuly added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })

        }




    }


    return (
        <View>
            {context.stateUser.isAuthenticated ? (

                <FormContainer title="পণ্য যুক্ত করুন">
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: mainImage }} />
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker} >
                            <Icon style={{ color: "white" }} name="camera" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>ব্র্যান্ড</Text>
                    </View>
                    <Input
                        placeholder="ব্র্যান্ড"
                        name="brand"
                        id="brand"
                        value={brand}
                        onChangeText={(text) => setBrand(text)}
                    />
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>নাম</Text>
                    </View>
                    <Input
                        placeholder="নাম"
                        name="name"
                        id="name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>দাম</Text>
                    </View>
                    <Input
                        placeholder="দাম"
                        name="price"
                        id="price"
                        value={price}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPrice(text)}
                    />
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>স্টকের মধ্যে গণনা</Text>
                    </View>
                    <Input
                        placeholder="স্টকের মধ্যে গণনা"
                        name="stock"
                        id="stock"
                        value={countInStock}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setCountInStock(text)}
                    />
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>বর্ণনা</Text>
                    </View>
                    <Input
                        placeholder="বর্ণনা"
                        name="description"
                        id="description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>বিকাশ নং</Text>
                    </View>
                    <Input
                        placeholder="বিকাশ"
                        name="bKash"
                        id="bKash"
                        value={bKash}
                        onChangeText={(text) => setBKash(text)}
                    />
                    <View style={styles.label}>
                        <Text style={{ textDecorationLine: "underline" }}>ভোটার নং</Text>
                    </View>
                    <Input
                        placeholder="ভোটার নং"
                        name="VoterId"
                        id="VoterId"
                        value={VoterId}
                        onChangeText={(text) => setVoterId(text)}
                    />

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select your Category"
                            selectedValue={pickerValue}
                            placeholderStyle={{ color: "#007aff" }}
                            placeholderIconColor="#007aff"
                            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                        >
                            {categories.map((c) => {
                                return <Picker.Item key={c.id} label={c.name} value={c._id} />
                            })}
                        </Picker>
                    </Item>
                    {err ? <Error message={err} /> : null}
                    <View style={styles.buttonContainer}>



                        <EasyButton
                            large
                            primary
                            onPress={() => addProduct()}
                        >
                            <Text style={styles.buttonText}>কনফার্ম</Text>
                        </EasyButton>


                    </View>
                </FormContainer>
            ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                    <Text style={{ fontWeight: "bold", justifyContent: "center", fontSize: 35 }}>দয়া করে লগইন করুন</Text>
                </View>
            )}


        </View>
    )

}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default ProductForm