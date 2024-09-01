import React, { forwardRef } from 'react'
import {Box, Input, Container, Button, Heading} from '@chakra-ui/react'
const RoomsFilter = forwardRef(({}, ref) => {
    <Box
        zIndex={45} top={0} left={0} pos={'fixed'} width={"100%"} h={"100vh"} bg={'rgba(252,252,252,0.75)'} display={'flex'} alignItems={'center'}
        justifyContent={'center'} ref={ref}
    >

        <Container>
            <Heading my={2} size={'md'} textAlign={'center'}>Filter Par Nombres de Chambres</Heading>
            <Input my={2} name='bed_rooms' placeholder='le nombre minimum de chambres' type='number' />
            <Input my={2} name='living_rooms' placeholder='le nombre minimum de salon' type='number' />
            <Input my={2} name='bath_rooms' placeholder='le nombre minimum de sanitaires' type='number' />
            <Input my={2} name='garages' placeholder='le nombre minimum de garages' type='number' />
            <Input my={2} name='bed_rooms' placeholder='le nombre minimum de chambres' type='number' />
            <Button variant='solid' colorScheme='blue' size={'md'} w={"100%"} mt={4}>Sauvgarder</Button>
        </Container>

    </Box>
})

export default RoomsFilter