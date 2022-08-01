import React from 'react'
import { Input as InputNativeBase, IInputProps } from 'native-base'

const Input:React.FC<IInputProps> = ({...rest}) => {
    return (
        <InputNativeBase 
            backgroundColor={"gray.700"}
            height={14}
            size="md"
            borderWidth={0}
            fontSize="md"
            fontFamily="body"
            color="white"
            placeholderTextColor="gray.300"
            rounded="2xl"
            marginBottom={4}
            {...rest}
        />
    )
}

export default Input