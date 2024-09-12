import React, { useState } from 'react'
import Layout from './_Layout'
import { Box, Button, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { MdLock } from 'react-icons/md'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'

const ResetPassword = () => {
    const [data, setData] = useState({ password: '', confirm: '' });
    const [dataErrors, setDataErrors] = useState({ password: '', confrim: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, isLogin } = useAuth();
    const hundleInputChange = (e) => {
        setDataErrors({ ...dataErrors, [e.target.name]: '' })
        setData({ ...data, [e.target.name]: e.target.value });
        return;
    }

    const hundleSubmite = (e) => {
        e.preventDefault();

        //todo validations

        //todo call API to reset password
        //todo redirect to login page with success message

        // setData({ password: '', confrim: '' });
        // setDataErrors({ password: '', confrim: '' });
        console.log(data);

        return;
    }

    const toggleShowPass = () => setShowPassword(prev => !prev);
    return (
        <Layout footer={true} navbar={true}>

            <Box p={4} w={'100%'} h={'calc(100vh - 200px)'}>
                {!isLoading && !isLogin ? (
                    <>
                        <Heading my={2} color={'blue.600'} >Renitilaiser le Mots de Passe</Heading>
                        <Box w={'100%'} maxW={600} mx={'auto'} my={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <form onSubmit={hundleSubmite} action="">

                                <FormControl my={2} mx={4}>
                                    <FormLabel>Nouveaux Mots de Passe</FormLabel>
                                    <InputGroup borderColor={'GrayText'} size={'lg'} >
                                        <Input name='password' type={showPassword ? 'text' : 'password'} onChange={hundleInputChange} value={data.password} />
                                        <InputLeftElement><MdLock /></InputLeftElement>
                                        <InputRightElement><IconButton bg={'transparent !important'} onClick={toggleShowPass} icon={showPassword ? <IoMdEyeOff /> : <IoMdEye />} /></InputRightElement>
                                    </InputGroup>

                                </FormControl>


                                <FormControl my={2} mx={4}>
                                    <FormLabel>Nouveaux Mots de Passe</FormLabel>
                                    <InputGroup borderColor={'GrayText'} size={'lg'} >
                                        <Input name='confirm' type={showPassword ? 'text' : 'password'} onChange={hundleInputChange} value={data.confirm} />
                                        <InputLeftElement><MdLock /></InputLeftElement>
                                        <InputRightElement><IconButton bg={'transparent !important'} onClick={toggleShowPass} icon={showPassword ? <IoMdEyeOff /> : <IoMdEye />} /></InputRightElement>
                                    </InputGroup>

                                </FormControl>

                                <Button type='submit' size={'lg'} w={'full'} colorScheme='blue' my={2} ml={4}>Réinitialiser</Button>

                            </form>

                        </Box>
                    </>
                ) : <Loader />}
            </Box>

        </Layout>
    )
}

export default ResetPassword