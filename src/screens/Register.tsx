import React, { useState } from 'react'

import { Alert } from 'react-native'

import {
    VStack,
} from 'native-base'

import { useNavigation } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore'

import Header from '../components/Header'
import Button from '../components/Button'
import Input from '../components/Input'

const Register:React.FC<any> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [patrimony, setPatrimony] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const navigation = useNavigation()
    
    const handleSubmit = () => {
        if(!patrimony.trim() || !description.trim()){
            return Alert.alert('Nova solicitação', 'Patrimônio e descrição são obrigatórios')
        }

        setIsLoading(true)

        firestore()
            .collection('orders')
            .add({patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
             })
             .then(() =>{
                Alert.alert('Nova solicitação', 'Solicitação cadastrada com sucesso.')
                navigation.goBack()
             })
             .catch(() => {
                setIsLoading(false)
                return Alert.alert('Solicitação', 'Não foi possível cadastrar a solicitação.')
             })

    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova solicitação"/>

            <Input 
                placeholder='Número do patrimônio'
                onChangeText={setPatrimony}
                value={patrimony}
            />

            <Input 
                placeholder='Descrição do problema'
                onChangeText={setDescription}
                value={description}
                flex={1}
                multiline
                textAlignVertical="top"
            />

            <Button
                title='Cadastrar'
                isLoading={isLoading}
                onPress={handleSubmit}
            />
        </VStack>
    )
}

export default Register