import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Y from 'yup'
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Spinner, useToast } from '@chakra-ui/react'
import { MdEmail, MdLock } from 'react-icons/md'
import { changeEmail } from '../../services/users.service'
import { useNavigate } from 'react-router-dom'

const changeEmailValidations = Y.object({
    email: Y.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'l\'address email est invalide' }).required("ce champ est obligatoire"),
    password: Y.string().required('ce champ est obligatoire')
})


const ChangeEmailForm = () => {
    const navigate = useNavigate();
    const toast = useToast({
        duration: 3000,
        position: 'top-left',
        isClosable: true,
    });
    const { handleSubmit, register, formState: { isSubmitting, errors }, setError } = useForm({
        resolver: yupResolver(changeEmailValidations)
    })

    const onSubmit = async (data) => {
        console.log(data)
        const changeEmailRequest = changeEmail(data.email, data.password);
        toast.promise(changeEmailRequest, {
            success: { title: 'Changement L\'email Reussit', description: 'votre email a été modifié avec succès' },
            loading: { title: 'Changement L\'email Encours', description: 'votre demande est encours d\'execusion' },
            error: { title: 'Erreur de Changement', description: 'Vos informations ne sont pas modifiées' }
        })

        return changeEmailRequest.then(res => { setError('email', {}); setError('password', {}); setError('root', {}); navigate('/profile') })
            .catch(err => {
                console.log(err)
                switch (err.status) {
                    case 400: setError('email', { message: err.data?.message && err.data?.message === 'email already taken' ? 'l\'email est deja utilse' : 'l\'email est invalide', type: 'bad-request-error' }); break;
                    case 403: setError('password', { message: 'le mots de passe est incorrect', type: 'unauthorized-request-error' }); break;
                    case 500: setError('root', { message: 'une erreur lors de la connexion au serveur, voyer verfifier votre connexion', type: 'server-error' }); break;
                    default: setError('root', { message: 'une erreur inconnue est survenue', type: 'unknown-error' }); break;
                }
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} action="">
            {errors.root?.message && <Box w={'100%'} py={2} px={1} rounded={'md'} bg={'red.200'} color={'red.600'}>{errors.root?.message}</Box>}
            <FormControl my={4} isRequired isInvalid={errors.email?.message}>
                <FormLabel>New Email</FormLabel>
                <InputGroup size={'lg'}>
                    <Input {...register('email')} borderColor={'GrayText'} type='text' />
                    <InputLeftElement><MdEmail /></InputLeftElement>
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl my={4} isRequired isInvalid={errors.password?.message}>
                <FormLabel>Mots de Pass</FormLabel>
                <InputGroup size={'lg'}>
                    <Input borderColor={'GrayText'} type='password' {...register('password')} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                </InputGroup>
                {!(errors.password?.message) && <FormHelperText>vous devez entrer le mots de passe de votre compte pour changer l'email</FormHelperText>}
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button isLoading={isSubmitting} isDisabled={isSubmitting} spinner={<Spinner size={'sm'} />} size={'lg'} w={'full'} colorScheme='blue' type='submit' my={4}>Changer</Button>

        </form>
    )
}

export default ChangeEmailForm