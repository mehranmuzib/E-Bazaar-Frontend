import { Platform } from 'react-native'



let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'http://1003050f354c.ngrok.io/api/v1/'
        : baseURL = 'http://1003050f354c.ngrok.io/api/v1/'
}

export default baseURL