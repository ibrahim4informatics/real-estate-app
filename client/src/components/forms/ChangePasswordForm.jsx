import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Y from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react';
import { MdLock } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { changePassword } from '../../services/users.service';
import { useNavigate } from 'react-router-dom';
const passwordErrorMessage = "le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, une minuscule et un caractère spécial et un chiffre au moins"

const changePasswordValidations = Y.object({
    password: Y.string().required('ce champ est obligatoire'),
    newPassword: Y.string().required('ce champ est obligatoire').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: passwordErrorMessage }),
    confirmNewPassword: Y.string().required('ce champ est obligatoire').oneOf([Y.ref('newPassword')], 'les mots de passe doivent être identiques')
})
const ChangePasswordForm = () => {
    const [passwordsShowStatus, setPasswordsShowStatus] = useState({ password: false, newPassword: false });
    const navigate = useNavigate();
    const toast = useToast({ duration: 3000, position: 'top-left', isClosable: true });
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(changePasswordValidations),

    });
    const onSubmit = async (data) => {
        console.log(data)
        const ChangePasswordRequest = changePassword(data.password, data.confirmNewPassword, data.newPassword);
        toast.promise(ChangePasswordRequest, {
            success: { title: "Mots de passe changé", description: "Votre mot de passe a bien été changé" },
            loading: { title: "Patientez!", description: "Changement de votre mot de passe" },
            error: { title: "Erreur de changement", description: "Votre mot de passe n'a pas été changé" }
        })
        return ChangePasswordRequest.then(res => navigate('/profile')).catch(err => {
            switch (err.status) {
                case 403: setError('password', { message: 'mots de passe incorecte', type: 'unauthorized-error' }); break;
                case 500: setError('root', { message: 'impossible de se connecter au serveur', type: 'server-error' }); break;
                default: setError('root', { message: 'une erreur inconnue s\'est produite', type: 'unknown-error' }); break;
            }
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.message && <Box py={2} px={1} rounded={'md'} w={'100%'} bg={'red.200'} color={'red.600'}>{errors.root?.message}</Box>}
            <FormControl my={4} isRequired isInvalid={errors.password?.message}>
                <FormLabel>Mots de Passe</FormLabel>
                <InputGroup size={'lg'}>
                    <Input {...register('password')} type={passwordsShowStatus.password ? 'text' : 'password'} borderColor={'GrayText'} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                    <InputRightElement>
                        <IconButton icon={passwordsShowStatus.password ? <IoMdEyeOff /> : <IoMdEye />} onClick={() => setPasswordsShowStatus(prev => ({ ...prev, password: !(prev.password) }))} />
                    </InputRightElement>
                </InputGroup>
                {!(errors.password?.message) && <FormHelperText>Votre Mots de Passe Actuel</FormHelperText>}
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl my={4} isRequired isInvalid={errors.newPassword?.message}>
                <FormLabel>Nouveaux Mots de Passe</FormLabel>
                <InputGroup size={'lg'}>
                    <Input {...register('newPassword')} type={passwordsShowStatus.newPassword ? 'text' : 'password'} borderColor={'GrayText'} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                    <InputRightElement>
                        <IconButton icon={passwordsShowStatus.newPassword ? <IoMdEyeOff /> : <IoMdEye />} onClick={() => setPasswordsShowStatus(prev => ({ ...prev, newPassword: !(prev.newPassword) }))} />
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
            </FormControl>

            <FormControl my={4} isRequired isInvalid={errors.confirmNewPassword?.message}>
                <FormLabel>Confirmer Nouveaux Mots de Passe</FormLabel>
                <InputGroup size={'lg'}>
                    <Input {...register('confirmNewPassword')} type={passwordsShowStatus.newPassword ? 'text' : 'password'} borderColor={'GrayText'} />
                    <InputLeftElement><MdLock /></InputLeftElement>
                    <InputRightElement>
                        <IconButton icon={passwordsShowStatus.newPassword ? <IoMdEyeOff /> : <IoMdEye />} onClick={() => setPasswordsShowStatus(prev => ({ ...prev, newPassword: !(prev.newPassword) }))} />
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmNewPassword?.message}</FormErrorMessage>
            </FormControl>

            <Button size={'lg'} w={'full'} colorScheme='blue' type='submit' my={4}>Changer</Button>
        </form>
    )
}

export default ChangePasswordForm