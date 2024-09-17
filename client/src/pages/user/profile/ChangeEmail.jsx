import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

import { Box, Heading } from '@chakra-ui/react'
import Layout from '../../_Layout'
import Loader from '../../../components/Loader';
import ChangeEmailForm from '../../../components/forms/ChangeEmailForm'



const ChangeEmail = () => {
  const navigate = useNavigate();
  const { isLoading, isLogin } = useAuth();
  useEffect(() => {
    if (!isLoading && !isLogin) return navigate('/')
  }, [isLoading])

  return (
    <Layout navbar={true} footer={true}>
      <Box w={'100%'} h={'calc(100vh - 90px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {!isLoading && isLogin ? (
          <Box width={'100%'} maxW={400} mx={'auto'} mt={4}>
            <Heading color={'blue.600'} my={4}>Changer Votre Email</Heading>
            <ChangeEmailForm />
          </Box>
        ) : <Loader />}
      </Box>
    </Layout>
  )
}

export default ChangeEmail