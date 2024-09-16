import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ResetPasswordChangeSchema from '../../schemas/ResetPasswordChange.schema'

import { MdLock } from 'react-icons/md'
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, useToast } from '@chakra-ui/react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { changeResetPassword } from '../../services/auth.service'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetChangePasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const toast = useToast({
        duration: 3000,
        position: 'top-left',
        isClosable: true,
    });
    const [searchParams] = useSearchParams();
    const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted }, setError } = useForm({ resolver: yupResolver(ResetPasswordChangeSchema) });
    const toggleShowPass = () => setShowPassword(prev => !prev);
    const onSubmit = (data) => {
        const changePasswordRequest = changeResetPassword(data, searchParams.get('token'));
        toast.promise(changePasswordRequest, {
            success: { title: 'Mots de Passe Changer', description: 'mots de passe renitialiser' },
            loading: { title: 'Changement de Mots de Passe', description: 'Votre demande est en cours de execusion' },
            error: { title: 'Erreur de Changement', description: 'Vos informations ne sont pas modifiées' }
        })
        return changePasswordRequest.then(res => {
            setError('confirm', {})
            setError('password', {})
            setError('root', {})
            navigate('/');
        })
            .catch(err => {
                if (err.status === 403) setError('root', { message: 'le lient est invalide ou expirer, essayer de deamnder un autre lien' });
                else if (err.status === 500) setError('root', { message: 'vérifie ta connexion à internet ' });
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <FormControl isRequired isInvalid={errors.password?.message ? true : false} my={2} mx={4}>
                {isSubmitted && errors.root?.message && <FormErrorMessage my={2}>{errors.root?.message}</FormErrorMessage>}
                <FormLabel>Nouveaux Mots de Passe</FormLabel>
                <InputGroup borderColor={'GrayText'} size={'lg'} >
                    <Input type={showPassword ? 'text' : 'password'} {...register('password')} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                    <InputRightElement><IconButton bg={'transparent !important'} onClick={toggleShowPass} icon={showPassword ? <IoMdEyeOff /> : <IoMdEye />} /></InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.confirm?.message} my={2} mx={4}>
                <FormLabel>Confirmer Nouveaux Mots de Passe</FormLabel>
                <InputGroup borderColor={'GrayText'} size={'lg'} >
                    <Input type={showPassword ? 'text' : 'password'} {...register('confirm')} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                    <InputRightElement><IconButton bg={'transparent !important'} onClick={toggleShowPass} icon={showPassword ? <IoMdEyeOff /> : <IoMdEye />} /></InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirm?.message}</FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} spinner={<Spinner size={'sm'} />} type='submit' size={'lg'} w={'full'} colorScheme='blue' my={2} ml={4}>Réinitialiser</Button>
        </form>
    )
}
export default ResetChangePasswordForm