import React from 'react'
import {
    StyleSheet,
    Image,
    SafeAreaView,
    View
} from 'react-native'

const Header = () => {

    return (
        <View style={styles.header}>
            <Image source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ height: 60 }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        // marginTop: 20
        backgroundColor: 'white'
    }
})


export default Header;