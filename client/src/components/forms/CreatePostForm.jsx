import React from 'react'

import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, position, Select, Spinner, Text, useToast } from '@chakra-ui/react';

import { createPost } from '../../services/posts.service';
import { useNavigate } from 'react-router-dom';

import TextEditor from '../TextEditor';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PostSchema from '../../schemas/Post.schema';

const CreatePostForm = ({ images }) => {
    const toast = useToast({ position: 'top-left', duration: 3000, isClosable: true });
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted }, setError, setValue, watch } = useForm({
        resolver: yupResolver(PostSchema),
    });
    const onSubmit = (data) => {
        console.log('first')
        console.log(data)
        console.log(images);
        if (!images || images.length < 1) {
            setError('root', 'if faut telecharger au moin une image');
            return toast({
                status: 'error',
                title: 'Erreur',
                description: 'Veuillez telecharger au moin une image',
            })
        }
        const createPostRequest = createPost({ ...data, media: images });
        toast.promise(createPostRequest, {
            success: { title: 'La Creation de L\'anonce est Termine', description: 'annonces creer avec succès' },
            loading: { title: 'En Cours La Creation de L\'anonce', description: 'votre demande est encours d\'exrcusion' },
            error: { title: 'Erreur Lors de La Creation de L\'anonce', description: 'la creation de l\'anonce echouer' },
        })
        return createPostRequest.then(res => {
            navigate(`/annonces/${res.data.post.id}`);
        })
            .catch(err => {
                console.log(err)
                toast({
                    status: 'error',
                    title: 'Erreur',
                    description: 'la creation de l\'anonce echouer',
                })
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {(isSubmitted && errors.root?.message) && <Box w={'100%'} px={1} py={2} bg={'red.200'} color={'red.600'} rounded={'md'}>{errors.root?.message}</Box>}
            <FormControl isRequired isInvalid={errors.title?.message ? true : false} mt={2}>
                <FormLabel>Titre:</FormLabel>
                <Input {...register('title')} size={'lg'} name='title' borderColor={'GrayText'} my={1} type='text' />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <Box >
                <label htmlFor="#editor"><Text my={2}>Description</Text></label>
                <TextEditor style={{ minHeight: '300px', border: '1px solid', borderColor: errors.description?.message ? 'red' : 'rgba(0,0,0,0.35)' }} value={watch('description')} placeholder='description' changeFn={(state) => { setValue('description', state, { shouldValidate: true }) }} />
                {errors.description?.message && <Text mt={1} fontSize={'12px'} color={'red.400'}>{errors.description?.message}</Text>}
            </Box>
            <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                <FormControl display={'flex'} flexDir={'column'} isRequired isInvalid={errors.surface?.message ? true : false} alignItems={'center'}>
                    <FormLabel>Surface:</FormLabel>
                    <InputGroup borderColor={'GrayText'} my={1}>
                        <Input {...register('surface')} size={'lg'} name='surface' type='number' />
                        <InputRightElement h={'100%'} borderRightRadius={'lg'} fontWeight={'bold'}>m <sup>2</sup></InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.surface?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.floor?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Etage:</FormLabel>
                    <Input {...register('floor')} name='floor' borderColor={'GrayText'} my={1} type='number' />
                    <FormErrorMessage>{errors.floor?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.type?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Type:</FormLabel>
                    <Select {...register('type')} borderColor={'GrayText'} size={'lg'}>
                        <option value="APARTMENT">Appartement</option>
                        <option value="VILLA">Villa</option>
                        <option value="HOUSE">Grande Maison</option>
                        <option value="OFFICE">Bureaux</option>
                        <option value="STUDIO">Studio</option>
                        <option value="GARAGE">Garage</option>
                        <option value="OTHER">Autres</option>
                    </Select>
                    <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                <FormControl isInvalid={errors.living_rooms?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Salon(s):</FormLabel>
                    <Input size={'lg'} name='living_rooms' {...register('living_rooms')} borderColor={'GrayText'} my={1} type='number' />
                    <FormErrorMessage>{errors.living_rooms?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.bed_rooms?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Chambre(s):</FormLabel>
                    <Input size={'lg'} name='bed_rooms' {...register('bed_rooms')} borderColor={'GrayText'} my={1} type='number' />
                    <FormErrorMessage>{errors.bed_rooms?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.bath_rooms?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Sanitaire(s):</FormLabel>
                    <Input size={'lg'} name='bath_rooms' {...register('bath_rooms')} borderColor={'GrayText'} my={1} type='number' />
                    <FormErrorMessage>{errors.bath_rooms?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.garages?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Garage(s):</FormLabel>
                    <Input size={'lg'} name='garages' {...register('garages')} borderColor={'GrayText'} my={1} type='number' />
                    <FormErrorMessage>{errors.garages?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <FormControl isInvalid={errors.address?.message}>
                <FormLabel>Addresse</FormLabel>
                <Input borderColor={'GrayText'} size={'lg'} type='text' name='address' {...register('address')} />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
            <Box mt={4} display={'flex'} alignItems={'center'} gap={2}>
                <FormControl isInvalid={errors.wilaya?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Wilaya:</FormLabel>
                    <Input size={'lg'} name='wilaya' {...register('wilaya')} borderColor={'GrayText'} my={1} type='text' />
                    <FormErrorMessage>{errors.wilaya?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.city?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Commune:</FormLabel>
                    <Input size={'lg'} name='city' {...register('city')} borderColor={'GrayText'} my={1} type='text' />
                    <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.attitude?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>L'atitude:</FormLabel>
                    <Input size={'lg'} name='attitude' {...register('attitude')} borderColor={'GrayText'} my={1} />
                    <FormErrorMessage>{errors.attitude?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.longitude?.message} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Longitude:</FormLabel>
                    <Input size={'lg'} name='longitude' {...register('longitude')} borderColor={'GrayText'} my={1} />
                    <FormErrorMessage>{errors.longitude?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Text color={'GrayText'} mb={4}>L'atitude et Longitude vous pouvez les voire dans google map!</Text>
            <Box display={'flex'} alignItems={'baseline'} gap={2}>

                <FormControl isInvalid={errors.price?.message} flex={1}>
                    <FormLabel>Prix:</FormLabel>
                    <InputGroup borderColor={'GrayText'} size={'lg'}>
                        <Input name='price' type='number' {...register('price')} />
                        <InputRightElement textAlign={'center'} w={'80px'} color={'green.500'} fontWeight={'bold'}><Text w={'100%'} textAlign={'right'} mr={2}>{watch('status') === 'FOR_RENT' ? 'DA/mois' : 'DA'}</Text></InputRightElement>
                    </InputGroup>
                    {!errors.price?.message && <FormHelperText>si vous souhaitez louer votre propriété, vous devez fournir un prix mensuel (par mois) </FormHelperText>}
                    <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.status?.message} w={120} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <FormLabel>Type:</FormLabel>
                    <Select name='status' {...register('status')} borderColor={'GrayText'} size={'lg'}>
                        <option value="FOR_SALE">Avendre</option>
                        <option value="FOR_RENT">Alouer</option>
                    </Select>
                    <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Button isLoading={isSubmitting} spinner={<Spinner />} isDisabled={isSubmitting} my={2} size={'lg'} w={'full'} colorScheme='blue' type='submit'>Publier</Button>
        </form>
    )
}

export default CreatePostForm