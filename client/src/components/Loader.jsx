import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <Box width={'100%'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Spinner colorScheme='blue' />
        </Box>
    )
}

export default Loader