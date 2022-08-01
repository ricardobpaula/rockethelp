import React from 'react'

import {
    Box,
    HStack,
    VStack,
    Text,
    Circle,
    Pressable,
    IPressableProps,
    useTheme
} from 'native-base'

import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'
import Button from './Button'

export type OrderStatus = 'open' | 'closed'

export type OrderProps = {
    id: string
    patrimony: string
    when: string
    status: OrderStatus
}

type Props = IPressableProps & {
    data: OrderProps
}

const Order:React.FC<Props> = ({data, ...rest}) => {
    const { colors } = useTheme()

    const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]
    
    return (
        <Pressable
            {...rest}
        >
            <HStack
                backgroundColor="gray.600"
                marginBottom={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="2xl"
                overflow="hidden"
            >
                <Box height="full" width={2} backgroundColor={statusColor}/>

                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        Patrimônio {data.patrimony}
                    </Text>
                    <HStack alignItems="center">
                        <ClockAfternoon size={15} color={colors.gray[300]} />
                        <Text color="gray.200" fontSize="xs" ml ={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} mr={5}>
                    {
                        data.status === 'closed'
                        ? <CircleWavyCheck size={24} color={statusColor} />
                        : <Hourglass size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>
        </Pressable>
    )
}

export default Order