import React from 'react'
import useAuth from '../hooks/useAuth'

import Layout from './_Layout'
import { Box, Heading, Text } from '@chakra-ui/react'
import Loader from '../components/Loader'
import ResetPasswordRequestFrom from '../components/forms/ResetPasswordRequestFrom'

const ForgotPasswordPage = () => {
    const { isLoading, isLogin } = useAuth('');
    return (
        <Layout home_navbar={true} footer={true}>
            <Box h={'calc(100vh - 240px)'}>
                {!isLoading && !isLogin ? (
                    <>
                        <Box width={'100%'} h={'70px'}></Box>
                        <Box mx={'auto'} mt={3} w={'90%'} maxW={'650px'} p={4} h={'auto'}>
                            <Heading color={'blue.600'}>Mot de passe oublié?</Heading>
                            <Text color={'GrayText'} ml={1} my={2}>tapez votre email, nous vous enverrons un lien de réinitialisation de mot de passe</Text>
                            <ResetPasswordRequestFrom />
                        </Box >
                    </>
                ) : <Loader />}
            </Box>
        </Layout>
    )
}
export default ForgotPasswordPage