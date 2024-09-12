import React, { useEffect, useState } from 'react'
import Layout from './_Layout'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftElement, Spinner, Text, useToast } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { IoMailOutline } from 'react-icons/io5'
import { forgotPassword } from '../services/auth.service'
import Validator from '../utils/validations'
import useAuth from '../hooks/useAuth'

const validator = new Validator()
const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [metaData, setMetaData] = useState({ isLoading: null, isSent: null });
    const navigate = useNavigate();
    const toast = useToast();

    const { isLoading, isLogin } = useAuth('');

    const hundleSubmit = (e) => {
        e.preventDefault();
        setMetaData({ isLoading: true, isSent: null });
        const forgotPasswordRequest = forgotPassword(email);

        if (!validator.isEmail(email)) { setEmailError("address email est invalide"); setMetaData({ isLoading: false, isSent: false }) }

        forgotPasswordRequest.then(res => {
            res.status === 200 && setMetaData({ isLoading: false, isSent: true });
            return
        })
            .catch(err => {
                setMetaData({ isLoading: false, isSent: false });
                if (err.status === 404) return setEmailError("Nous ne trouvons pas d'utilisateur avec cet e-mail");
                if (err.status === 400) return setEmailError("address email est invalide");
            })

        toast.promise(forgotPasswordRequest, {
            success: { title: "Réinitialisation réussie", description: "un e-mail a été envoyé avec un lien de réinitialisation, expire dans 15 minutes" },
            error: { title: "Réinitialisation échoué", description: "Une erreur s'est produite lors de la réinitialisation de votre mot de passe" },
            loading: { title: "Réinitialisation du mot de passe", description: "nous essayons d'envoyer un e-mail de vérification, veuillez patienter" }
        })

    }
    return (
        <Layout home_navbar={true} footer={true}>


            <Box h={'calc(100vh - 240px)'}>
                {!isLoading && !isLogin ? (
                    <>
                        <Box width={'100%'} h={'70px'}></Box>

                        <Box mx={'auto'} mt={3} w={'90%'} maxW={'650px'} p={4} h={'auto'}>
                            <Heading color={'blue.600'}>Mot de passe oublié?</Heading>
                            <Text color={'GrayText'} ml={1} my={2}>tapez votre email, nous vous enverrons un lien de réinitialisation de mot de passe</Text>

                            <form onSubmit={hundleSubmit}>
                                <FormControl isRequired isInvalid={emailError ? true : false}>
                                    {metaData.isSent !== null && (metaData.isSent ? <Box w={'100%'} py={2} bg={'green.200'} rounded={'md'} pl={2} fontWeight={'bold'} color={'green.600'}>e-mail envoyé, vérifiez votre boîte de réception</Box> : <Box w={'100%'} py={2} bg={'red.200'} rounded={'md'} pl={2} fontWeight={'bold'} color={'red.600'}>l'email n'a pas été envoyé vérifiez vos informations</Box>)}
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup size={'lg'}>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' borderColor={'GrayText'} />
                                        <InputLeftElement><IoMailOutline /></InputLeftElement>
                                    </InputGroup>
                                    <FormErrorMessage>{emailError}</FormErrorMessage>
                                    <Button isLoading={metaData.isLoading ? true : false} spinner={<Spinner size={'sm'} />} my={4} type='submit' colorScheme='blue' w={'full'} size={'lg'}>Envoyer</Button>
                                </FormControl>
                            </form>
                        </Box >
                    </>
                ) : <Loader />}
            </Box>



        </Layout>

    )
}

export default ForgotPasswordPage