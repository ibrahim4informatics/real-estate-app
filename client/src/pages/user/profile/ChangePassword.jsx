import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react'
import Layout from '../../_Layout'
import { MdLock } from 'react-icons/md'
import useAuth from '../../../hooks/useAuth'
import Loader from '../../../components/Loader'
import { useNavigate } from 'react-router-dom'
import Validator from '../../../utils/validations'
import { changePassword } from '../../../services/users.service'
const validator = new Validator()
const ChangePassword = () => {
    const [data, setData] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
    const [dataError, setDataErrors] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
    const navigate = useNavigate();
    const toast = useToast(({ isClosable: true, duration: 3000, position: "top-left" }))

    const { isLoading, isLogin } = useAuth()
    const hundleInputChange = (e) => {
        setDataErrors({ ...dataError, [e.target.name]: '' });
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const hundleSubmite = (e) => {
        e.preventDefault();
        //todo Validation of data
        if (!validator.isStrongPassword(data.newPassword)) setDataErrors({ ...dataError, newPassword: 'mots de passe est fiable' });
        if (data.newPassword !== data.confirmNewPassword) setDataErrors({ ...dataError, confirmNewPassword: "mots de passe ne sont pas identique" });

        //todo call api to change password
        if (validator.isStrongPassword(data.newPassword) && data.newPassword === data.confirmNewPassword) {
            const ChangePasswordRequest = changePassword(data.password, data.confirmNewPassword, data.newPassword);
            ChangePasswordRequest.then(res => navigate('/profile')).catch(err => {
                if (err.status === 403) {
                    setDataErrors({ ...dataError, password: "mots de passe incorrect" });
                }
            });

            toast.promise(ChangePasswordRequest, {
                success: { title: "Mots de passe changé", description: "Votre mot de passe a bien été changé" },
                loading: { title: "Patientez!", description: "Changement de votre mot de passe" },
                error: { title: "Erreur de changement", description: "Votre mot de passe n'a pas été changé" }
            })
        }

        return;


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

                        <FormControl my={4} isRequired isInvalid={dataError.password}>
                            <FormLabel>Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.password} name='password' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                            <FormHelperText>Votre Mots de Passe Actuel</FormHelperText>
                            <FormErrorMessage>Mots de passe incorrect</FormErrorMessage>
                        </FormControl>

                        <FormControl my={4} isRequired isInvalid={dataError.newPassword}>
                            <FormLabel>Nouveaux Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.newPassword} name='newPassword' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                            <FormErrorMessage>{dataError.newPassword}</FormErrorMessage>
                        </FormControl>

                        <FormControl my={4} isRequired isInvalid={dataError.confirmNewPassword}>
                            <FormLabel>Confirmer Nouveaux Mots de Passe</FormLabel>
                            <InputGroup size={'lg'}>
                                <Input onChange={hundleInputChange} value={data.confirmNewPassword} name='confirmNewPassword' type='password' borderColor={'GrayText'} />
                                <InputLeftElement><MdLock /></InputLeftElement>
                            </InputGroup>
                            <FormErrorMessage>{dataError.confirmNewPassword}</FormErrorMessage>
                        </FormControl>

                        <Button size={'lg'} w={'full'} colorScheme='blue' type='submit' my={4}>Changer</Button>

                    </form>
                </Box>) : <Loader />}
            </Box>
        </Layout>
    )
}

export default ChangePassword