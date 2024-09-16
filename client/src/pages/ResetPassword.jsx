import React from 'react'
import Layout from './_Layout'
import { Box, Heading } from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'
import ResetChangePasswordForm from '../components/forms/ResetChangePasswordForm'
import { Navigate, useSearchParams } from 'react-router-dom'
import useValidateResetUrl from '../hooks/useValidateResetUrl'

const ResetPassword = () => {
    const { isLoading, isLogin } = useAuth();
    const [searchParams] = useSearchParams()
    const { isLoading: loadingValidUrl, isValid } = useValidateResetUrl(searchParams.get('token') || null)
    if (!isValid) return <Navigate to={'/'} />
    return (
        <Layout footer={true} navbar={true}>
            <Box p={4} w={'100%'} h={'calc(100vh - 200px)'}>
                {!isLoading && !isLogin && !loadingValidUrl ? (
                    <>
                        <Heading my={2} color={'blue.600'} >Renitilaiser le Mots de Passe</Heading>
                        <Box w={'100%'} maxW={600} mx={'auto'} my={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <ResetChangePasswordForm />
                        </Box>
                    </>
                ) : <Loader />}
            </Box>
        </Layout>
    )
}
export default ResetPassword