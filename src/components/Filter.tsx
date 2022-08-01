import React from 'react'

import {
    Text,
    Button,
    IButtonProps,
    useTheme
} from 'native-base'

import { OrderStatus } from './Order'

type Props = IButtonProps & {
    title: string
    isActive?: boolean
    type: OrderStatus
}

const Filter:React.FC<Props> = ({ title, isActive = false, type, ...rest }) => {
    const { colors } = useTheme()
    
    const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]
    
    return (
        <Button
            variant="outline"
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor="gray.600"
            flex={1}
            size="sm"
            {...rest}
            marginBottom={4}
        >
            <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase"> 
                {title} 
            </Text>
        </Button>
    )
}

export default Filter