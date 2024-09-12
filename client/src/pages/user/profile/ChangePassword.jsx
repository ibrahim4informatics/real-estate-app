import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Layout from '../../_Layout'
import { MdLock } from 'react-icons/md'
import useAuth from '../../../hooks/useAuth'
import Loader from '../../../components/Loader'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [data, setData] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
    const [dataError, setDataErrors] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
    const navigate = useNavigate()

    const { isLoading, isLogin } = useAuth()
    const hundleInputChange = (e) => {
        setDataErrors({ ...dataError, [e.target.name]: '' });
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const hundleSubmite = (e) => {
        e.preventDefault();
        //todo Validation of data

        //todo call api to change password

        console.log(data)
    }

    useEffect(() => {
        if (!isLoading && !isLogin) return navigate('/')
    }, [isLoading])

    return (
        <Layout navbar={true} footer={true}>
            <Box w={'100%'} h={'calc(100vh - 90px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {!isLoading && isLogin ? (<Box width={'100%'} maxW={400} mx={'auto'} mt={4}>
                    <Heading color={'blue.600'} my={4}>Changer Votre Mots de Passe</Heading>
                    <form onSubmit={hundleSubmite} action="">

                        <FormControl my={4} isRequired isInvalid={false}>
                            <FormLabel>Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.password} name='password' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                            <FormHelperText>Votre Mots de Passe Actuel</FormHelperText>
                        </FormControl>

                        <FormControl my={4} isRequired isInvalid={false}>
                            <FormLabel>Nouveaux Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.newPassword} name='newPassword' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl my={4} isRequired isInvalid={false}>
                            <FormLabel>Confirmer Nouveaux Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.confirmNewPassword} name='confirmNewPassword' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                        </FormControl>

                        <Button size={'lg'} w={'full'} colorScheme='blue' type='submit' my={4}>Changer</Button>

                    </form>
                </Box>) : <Loader />}
            </Box>
        </Layout>
    )
}

export default ChangePassword