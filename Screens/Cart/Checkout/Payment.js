import React, { useState } from 'react'
import { View, Button, ScrollView, StatusBar } from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    Body,
    Title
} from 'native-base';

import Input from '../../../Shared/From/Input'




const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Credit Card', value: 2 },
    { name: 'Mobile Banking', value: 3 }
]

const paymentCards = [
    { name: 'BKash', value: 1 },
    { name: 'Nogod', value: 2 },
    { name: 'Rocket', value: 3 },
    { name: 'Other', value: 4 }
]

const Payment = (props) => {

    const order = props.route.params;



    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    const [email, setEmail] = useState();

    console.log(props)



    return (
        <Container>

            <Header style={{ backgroundColor: 'green' }}>
                <Body>
                    <Title >Choose your payment method</Title>
                </Body>
            </Header>

            <StatusBar
                backgroundColor="green"
                barStyle="default"
            />
            <Content>
                {methods.map((item, index) => {
                    return (
                        <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right>
                                <Radio selectedColor={'green'} selected={selected == item.value} />
                            </Right>
                        </ListItem>
                    )
                })}
                {selected == 3 ? (
                    <Picker style={{ width: 200, height: 40 }}
                        mode="dropdown"
                        iosIcon={<Icon name={"arrow-down"} />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((c, index) => {
                            return <Picker.Item
                                key={c.name}
                                label={c.name}
                                value={c.name} />
                        })}

                    </Picker>


                ) : null}
                <View style={{ alignItem: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                    <Input
                        placeholder={"Enter Payment No"}
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                    <View style={{ marginTop: 60, alignSelf: 'center' }}>


                        <Button color="green"
                            title={"Confirm"}
                            onPress={() => props.navigation.navigate("Confirm", { order })} />
                    </View>
                </View>
            </Content>
        </Container>
    )
}

export default Payment;