import { Box, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginUser, logoutUser } from '../services/auth.service'

const Logout = () => {
    const navigate = useNavigate();
    const toast = useToast({isClosable:true, duration:3000});
    useEffect(() => {

        const logoutRequest = logoutUser()
        logoutRequest.then(res => navigate('/')).catch(err => navigate(-1));

        toast.promise(logoutRequest, {
            success: { title: "Deconnexion Reussite", message: "vous êtes déconnecté maintenant"},
            error: { title: "Erreur de deconnexion", message: "Une erreur s'est produite lors de la déconnexion"},
            loading: { title: "Patientez!", message: "Nous essayons de vous déconnecter"}
        })


    }, [])
    return (
        <Box w={'100%'} h={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'column'}>

            <Spinner color='blue.600' emptyColor='gray.200' size={'xl'} />
            <Text color={'GrayText'} fontWeight={'bold'} fontSize={14}>Deconnexion...</Text>

        </Box>
    )
}

export default Logout