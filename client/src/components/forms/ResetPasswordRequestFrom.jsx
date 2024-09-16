import React from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import ResetPasswordValidation from '../../schemas/ResetPasswordRequest.schema';
import { FormControl, InputGroup, Input, InputLeftElement, FormErrorMessage, Button, Spinner, FormLabel, useToast, Box } from '@chakra-ui/react'
import { IoMailOutline } from 'react-icons/io5';
import { forgotPassword } from '../../services/auth.service';

const ResetPasswordRequestForm = () => {

    const toast = useToast({
        duration: 3000,
        position: 'top-left',
        isClosable: true,
    });
    const { register, handleSubmit, formState: { isSubmitting, errors, isSubmitted }, setError } = useForm({
        resolver: yupResolver(ResetPasswordValidation)
    })
    const onSubmit = (data) => {
        const forgotPasswordRequest = forgotPassword(data.email);
        toast.promise(forgotPasswordRequest, {
            success: { title: "Réinitialisation réussie", description: "un e-mail a été envoyé avec un lien de réinitialisation, expire dans 15 minutes" },
            error: { title: "Réinitialisation échoué", description: "Une erreur s'est produite lors de la réinitialisation de votre mot de passe" },
            loading: { title: "Réinitialisation du mot de passe", description: "nous essayons d'envoyer un e-mail de vérification, veuillez patienter" }
        });
        return forgotPasswordRequest.then(res => {
            setError('email', {});
            setError('root', {});
        })
            .catch(err => {
                if (err.status === 404) setError('root', { message: "Nous ne trouvons pas d'utilisateur avec cet e- mail" });
                else if (err.status === 400) setError('email', { message: 'addresse email esrt invalide' });
                else setError('root', { message: 'on a pa pu envoyer un lien de renitialisation' })
            })

    
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.email?.message ? true : false}>
                {isSubmitted && ((!errors.root?.message && !errors.email?.message) ? <Box w={'100%'} py={2} bg={'green.200'} rounded={'md'} pl={2} fontWeight={'bold'} color={'green.600'}>e-mail envoyé, vérifiez votre boîte de réception</Box> : <Box w={'100%'} py={2} bg={'red.200'} rounded={'md'} pl={2} fontWeight={'bold'} color={'red.600'}>{errors.root?.message}</Box>)}
                <FormLabel>Email</FormLabel>
                <InputGroup size={'lg'}>
                    <Input {...register('email')} borderColor={'GrayText'} />
                    <InputLeftElement><IoMailOutline /></InputLeftElement>
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                <Button isLoading={isSubmitting} spinner={<Spinner size={'sm'} />} my={4} type='submit' colorScheme='blue' w={'full'} size={'lg'}>Envoyer</Button>
            </FormControl>
        </form>
    )
}

export default ResetPasswordRequestForm