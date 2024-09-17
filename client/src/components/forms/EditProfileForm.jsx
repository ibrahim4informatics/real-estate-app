import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import UserSchema from '../../schemas/User.schema';
// import { getUser } from '../../services/users.service';
import { MdSave } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner, useToast } from '@chakra-ui/react';
import { updateUserPersonelInfo } from '../../services/users.service';


const EditProfileForm = ({ user }) => {
    const { full_name, phone, isSeller } = user;
    const navigate = useNavigate();
    const toast = useToast({
        position: 'top-left',
        isClosable: true,
        duration: 3000
    });
    const { register, formState: { errors, isSubmitting, dirtyFields }, setError, handleSubmit } = useForm({
        resolver: yupResolver(UserSchema),
        defaultValues: { full_name, phone, role: isSeller ? 'Vendeur' : 'Client' }
    });

    const onSubmit = async (data) => {
        const updateProfileRequest = updateUserPersonelInfo({ full_name: data.full_name, phone: data.phone, isSeller: data.role === 'Vendeur' ? true : false });
        toast.promise(updateProfileRequest, {
            success: { title: "Informations personnelles modifiées", description: "Vos informations personnelles ont bien été enregistrées" },
            loading: { title: "Patientez!", description: "sauvegarde des informations personnelles" },
            error: { title: "Erreur de modification", description: "Vos informations personnelles n'ont pas été modifiées" }
        });

        return updateProfileRequest.then(res => {
            navigate('/profile');
        })
            .catch(err => {
                setError('root', { message: "la modifications du profile echouer ressayer" })
            })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.full_name?.message} my={2}>
                <FormLabel>Nom Complet</FormLabel>
                <Input {...register('full_name')} borderColor={'GrayText'} />
                <FormErrorMessage>{errors.full_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phone?.message} my={2}>
                <FormLabel>Tel</FormLabel>
                <Input {...register('phone')} borderColor={'GrayText'} />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.role?.message} my={2}>
                <FormLabel>Role</FormLabel>
                <Select {...register('role')} borderColor={'GrayText'} >
                    <option value="Vendeur">Vendeur</option>
                    <option value="Client">Client</option>
                </Select>
                <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
            </FormControl>

            <Button isLoading={isSubmitting} spinner={<Spinner size={'sm'} />} isDisabled={(isSubmitting || Object.keys(dirtyFields).length === 0) ? true : false} colorScheme='blue' size={'lg'} w={'full'} my={2} type='submit' leftIcon={<MdSave />}>Sauvgarder</Button>

        </form>
    )
}

export default EditProfileForm