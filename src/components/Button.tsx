import React from 'react'

import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base'

type Props = IButtonProps & {
    title: string
}

const Button:React.FC<Props> = ({title, ...rest}) => {
    return (
        <ButtonNativeBase
            backgroundColor="green.700"
            height={14}
            fontSize="sm"
            rounded="2xl"
            _pressed={{ bg: "green.500"}}
            marginTop={4}
            marginBottom={4}
            width="full"
            {...rest}
        >
            <Heading color="white" fontSize="md">
                {title}
            </Heading>
        </ButtonNativeBase>
    )
}

export default Button