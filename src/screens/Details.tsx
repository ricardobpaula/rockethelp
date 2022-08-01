import React, { useEffect, useState } from 'react'

import {
    HStack,
    VStack,
    useTheme,
    Text,
    ScrollView,
    Box
} from 'native-base'

import firestore  from '@react-native-firebase/firestore'

import Header from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { OrderProps } from '../components/Order'
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO'
import { dateToString } from '../utils/DateUtils'
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native'
import CardDetails from '../components/CardDetails'
import Input from '../components/Input'
import Button from '../components/Button'
import { Alert } from 'react-native'
import Loading from '../components/Loading'

type RouteParams = {
    orderId: string
}

type OrderDetails = OrderProps & {
    description: string
    solution: string
    closed: string
}
const Details:React.FC<any> = () => {

    const [solution, setSolution] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
    
    const route = useRoute()

    const navigation = useNavigation()

    const { colors } = useTheme()

    const { orderId } = route.params as RouteParams

    const handleSubmit = () => {
        if(!solution.trim()){
            return Alert.alert('Solicitação', 'Informe a solução.')
        }

        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                Alert.alert('Solicitação', 'Solicitação encerrada')
                navigation.goBack()
            }).catch(() => {
                Alert.alert('Solicitação', 'Erro ao finalizar a solicitação')
            })
    }

    useEffect(() => {
        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at, solution } = doc.data()

                const closed = closed_at ? dateToString(closed_at) : null

                setOrder({
                    id: doc.id,
                    patrimony,
                    closed,
                    description,
                    solution,
                    status,
                    when: dateToString(created_at)
                })

                setIsLoading(false)
            })
    },[])

    if(isLoading){
        return <Loading />
    }
    return (
        <VStack
            flex={1}
            bg="gray.700"
        >
            <Box px={5} bg="gray.600">
                <Header title="Solicitação"/>
            </Box>

            <HStack bg="gray.500" justifyContent='center' p={4}>
                {
                    order.status === 'closed'
                    ? <CircleWavyCheck size={22} color={colors.green[300]} />
                    : < Hourglass size={22} color={colors.secondary[700]} />
                }

                <Text
                    fontSize="sm"
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
                </Text>

            </HStack>

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails 
                    title="Equipamento"
                    description={`Património ${order.patrimony}`}
                    icon={DesktopTower}
                />
                <CardDetails 
                    title="Descrição do problema"
                    description={order.description}
                    icon={ClipboardText}
                    footer={`Registrado em ${order.when}`}
                />
                <CardDetails 
                    title="Solução"
                    icon={CircleWavyCheck}
                    description={order.solution}
                    footer={order.closed && `Encerrado em ${order.closed}`}
                >
                    { order.status === 'open' &&
                        <Input
                            placeholder='Descrição da solução'
                            onChangeText={setSolution}
                            textAlignVertical="top"
                            value={solution}
                            multiline
                            h={24}

                        />
                    }
                </CardDetails>

                { order.status === 'open' &&
                    <Button
                        title='Encerrar'
                        onPress={handleSubmit}
                    />
                }
            </ScrollView>
        </VStack>
    )
}

export default Details