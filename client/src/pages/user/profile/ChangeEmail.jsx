import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Layout from '../../_Layout'
import { MdEmail, MdLock } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Loader from '../../../components/Loader'

const ChangeEmail = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [dataError, setDataErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { isLoading, isLogin } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLogin) return navigate('/')
  }, [isLoading])


  const hundleInputChange = (e) => {
    setDataErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    return;
  }

  const hundleSubmit = (e) => {
    e.preventDefault();

    //todo validate information

    //todo call api endpoint

    console.log(data);
  }

  return (
    <Layout navbar={true} footer={true}>
      <Box w={'100%'} h={'calc(100vh - 90px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {!isLoading && isLogin ? (
          <Box width={'100%'} maxW={400} mx={'auto'} mt={4}>
            <Heading color={'blue.600'} my={4}>Changer Votre Email</Heading>
            <form onSubmit={hundleSubmit} action="">

              <FormControl my={4} isRequired isInvalid={false}>
                <FormLabel>New Email</FormLabel>
                <InputGroup size={'lg'}>
                  <Input name='email' type='email' onChange={hundleInputChange} borderColor={'GrayText'} />
                  <InputLeftElement><MdEmail /></InputLeftElement>
                </InputGroup>
              </FormControl>

              <FormControl my={4} isRequired isInvalid={false}>
                <FormLabel>Mots de Pass</FormLabel>
                <InputGroup size={'lg'}>
                  <Input borderColor={'GrayText'} name='password' type='password' onChange={hundleInputChange} />
                  <InputLeftElement><MdLock /></InputLeftElement>
                </InputGroup>
                <FormHelperText>vous devez entrer le mots de passe de votre compte pour changer l'email</FormHelperText>
              </FormControl>

              <Button size={'lg'} w={'full'} colorScheme='blue' type='submit' my={4}>Changer</Button>

            </form>
          </Box>
        ) : <Loader />}
      </Box>
    </Layout>
  )
}

export default ChangeEmail