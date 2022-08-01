import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from "../screens/Home"
import Register from "../screens/Register"
import Details from "../screens/Details"

const { Navigator, Screen } = createNativeStackNavigator()

const AppRoutes:React.FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="home" component={Home}/>
            <Screen name="new" component={Register}/>
            <Screen name="details" component={Details}/>
        </Navigator>
    )
}

export default AppRoutes
