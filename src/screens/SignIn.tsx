import React, { useState } from 'react'

import { Alert } from 'react-native'

import {
    VStack,
    Heading,
    Icon,
    useTheme
} from 'native-base'

import {Key, Envelope} from 'phosphor-react-native'

import auth from '@react-native-firebase/auth'

import Logo from '../assets/logo_primary.svg'
import Input from '../components/Input'
import Button from '../components/Button'

const SignIn:React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { colors } = useTheme()

    const handleSignIn = () => {
        if(!email.trim() || !password.trim()){
            return Alert.alert('Entrar', 'E-mail ou senha invalidos')
        }

        setIsLoading(true)

        auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                setIsLoading(false)
                if(
                    error.code === 'auth/invalid-email' ||
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/user-not-found'){
                        return Alert.alert('Entrar', 'E-mail ou senha invalidos.')
                    }

                return Alert.alert('Entrar', 'Não foi possivel se conectar.')
            })
    }

    return (
        <VStack
            flex={1}
            alignItems='center'
            bg="gray.600"
            px={8}
            pt={24}
        >
            <Logo />

            <Heading color="gray.100" fontSize="2xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                InputLeftElement={<Icon as ={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
                placeholder='E-mail'
                autoCapitalize='none'
            />

            <Input 
                InputLeftElement={<Icon as ={<Key color={colors.gray[300]} />} ml={4} />}
                onChangeText={setPassword}
                placeholder='Senha'
                autoCapitalize='none'
                secureTextEntry
            />

            <Button 
                isLoading={isLoading}
                title='Entrar' 
                onPress={handleSignIn}/>

        </VStack>
    )
}

export default SignIn