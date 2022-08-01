import React, { useEffect, useState } from 'react'

import { Alert } from 'react-native'

import {
    VStack,
    HStack,
    IconButton,
    FlatList,
    useTheme,
    Heading,
    Text,
    Center
} from 'native-base'

import firestore from '@react-native-firebase/firestore'

import { useNavigation } from '@react-navigation/native'

import { ChatTeardropText, SignOut } from 'phosphor-react-native'

import auth from '@react-native-firebase/auth'

import Order, { OrderProps, OrderStatus } from '../components/Order'
import Logo from '../assets/logo_secondary.svg'
import Filter from '../components/Filter'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { dateToString } from '../utils/DateUtils'

const Home:React.FC = () => {
    const [selected, setSelected] = useState<OrderStatus>('open')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<OrderProps[]>([])

    const { colors } = useTheme()

    const navigation = useNavigation()

    const handleNewOrder = () => {
        navigation.navigate('new')
    }

    const handleOpenDetails = (orderId: string) => {
        navigation.navigate('details', { orderId })
    }

    const handleLogout = () => {
        auth().signOut()
            .catch(() => {
                Alert.alert('Sair', 'Erro ao sair.')
            })
    }

    useEffect(() => {
        setIsLoading(true)

        const subscriber = firestore()
            .collection('orders')
            .where('status', '==', selected)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { patrimony, description, status, created_at: createdAt } = doc.data()

                    return {
                        id: doc.id,
                        patrimony,
                        description,
                        status,
                        when: dateToString(createdAt)
                    }
                })

                setIsLoading(false)
                setOrders(data)
            })
        
        return subscriber

    }, [selected])

    return (
        <VStack
            flex={1}
            paddingBottom={10}
            backgroundColor="gray.700"
        >
            <HStack
                width="full"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="gray.600"
                paddingTop={12}
                paddingBottom={6}
                paddingX={6}
                >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]}/>}
                    onPress={handleLogout}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack
                    width="full"
                    mt={4}
                    mb={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading
                        color="gray.100"
                    >
                        Meus Chamados
                    </Heading>

                    <Text color="gray.200"> {orders.length} </Text>

                </HStack>

                <HStack space={3}>
                    <Filter
                        type="open"
                        title="Em andamento"
                        onPress={() => setSelected('open')}
                        isActive={selected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title="Finalizados"
                        onPress={() => setSelected('closed')}
                        isActive={selected === 'closed'}
                    />
                </HStack>

                {   isLoading ?
                    <Loading /> :
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Order 
                            data={item} 
                            key={item.id}
                            onPress={() => handleOpenDetails(item.id)}
                        />}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Center>
                                <ChatTeardropText color={colors.gray[300]} size={40}/>
                                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                    Você ainda não possui {'\n'}
                                    solicitações { selected === 'open'
                                        ? 'em aberto'
                                        : 'finalizadas'
                                    }
                                </Text>
                            </Center>
                        )}
                    />
                }
                <Button title='Nova solicitação' onPress={handleNewOrder}/>
            </VStack>
        </VStack>
    )
}

export default Home
