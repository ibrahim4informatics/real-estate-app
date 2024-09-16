import React, { useEffect, useState } from 'react'
import Layout from '../../_Layout'
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Select, Text, useToast } from '@chakra-ui/react';
// import 'react-quill-new/dist/quill.snow.css';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader';
import { deleteSingleImage, uploadSingleFile } from '../../../services/firebase.service';
import { addMedia, createPost, deleteMedia, getPostById, updatepost } from '../../../services/posts.service';
import { useNavigate, useParams } from 'react-router-dom';
import { MdClose, MdImage } from 'react-icons/md';
import TextEditor from '../../../components/TextEditor';
const EditPost = () => {

    const navigate = useNavigate();
    const toast = useToast({ position: "top-left", duration: 3000, isClosable: true })
    const { user, isLoading, isLogin } = useAuth();
    const { post_id } = useParams();

    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [data, setData] = useState({});
    const [dataErrors, setDataErrors] = useState({});

    useEffect(() => {
        if (!isLoading && !isLogin) {
            return navigate('/')
        }
    }, [isLoading]);

    useEffect(() => {
        getPostById(post_id).then(data => {
            const post = data.post;
            console.log(post);


            const { description, property: { media, ...other }, ...rest } = post;
            console.log(description)
            console.log(media)
            console.log(rest.surface);
            setData({ ...rest, ...other });
            setDescription(description);
            setImages(media);

        }).catch(err => navigate(-1));
    }, [])


    const hundleInputChange = (e) => {
        setDataErrors(prev => ({ ...prev, [e.target.name]: '' }))
        if (e.target.type === 'number') {
            setData({ ...data, [e.target.name]: Number.parseFloat(e.target.value) });
        }
        else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }
    const hundleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        const promises = files.map(file => uploadSingleFile(file, `${user.id}/posts`));

        const uploadRequest = Promise.all(promises);

        uploadRequest.then(success => {
            setImages(prev => [...prev, ...success])
        })

        toast.promise(uploadRequest, {
            success: { title: 'Images téléchargées', description: 'Vos images ont bien été chargées' },
            loading: { title: 'Patientez!', description: 'Chargement des images' },
            error: { title: 'Erreur de téléchargement', description: 'Vos images n\'ont pas été chargées' }
        })


    }

    const hundleDeleteImage = (img) => {

        const deleteImageRequest = deleteSingleImage(img.bucket_url);
        deleteImageRequest.then(res => {
            if (img.id) {
                //todo remove from db
                const deleteMediaReq = deleteMedia(post_id, img.id);
                toast.promise(deleteImageRequest, {
                    success: { title: 'Média supprimée', description: 'Votre média a bien été supprimée' },
                    loading: { title: 'Patientez!', description: 'Suppression du média' },
                    error: { title: 'Erreur de suppression', description: 'Votre média n\'a pas été supprimée' }
                })

                deleteMediaReq.then(res => {

                    return setImages(images.filter(image => image.bucket_url !== img.bucket_url));


                }).catch(err => console.log(err))
            }

            else {
                setImages(images.filter(image => image.bucket_url !== img.bucket_url));
            }

        }).catch(err => console.log(err))

        toast.promise(deleteImageRequest, {
            success: { title: 'Image supprimée', description: 'Votre image a bien été supprimée' },
            loading: { title: 'Patientez!', description: 'Suppression de l\'image' },
            error: { title: 'Erreur de suppression', description: 'Votre image n\'a pas été supprimée' }
        })

        return

    }
    const hundleSubmite = () => {
        //todo : update post endpoint call

        const newImages = images.filter(img => !(img.id));

        const saveImagesPromises = newImages.map(img => addMedia(post_id, img))
        const saveImagesRequest = Promise.all(saveImagesPromises);

        toast.promise(saveImagesRequest, {
            success: { title: 'Images enregistrées', description: 'les images de cette annonce a été mis à jour' },
            loading: { title: 'Patientez!', description: 'Modification de l\'annonce' },
            error: { title: 'Erreur de modification', description: 'Vos images modifiées' }
        })

        console.log(data)
        const updatePostRequest = updatepost(post_id, {...data, description});
        toast.promise(updatePostRequest, {
            success: { title: 'Annonce modifiée', description: 'Votre annonce a bien été modifiée' },
            loading: { title: 'Patientez!', description: 'Modification de l\'annonce' },
            error: { title: 'Erreur de modification', description: 'Vos informations modifiées' }
        })

        updatePostRequest.then(res => {
            navigate(`/annonces/${post_id}`);
        }).catch(err => console.log(err))
    }
    return (
        <Layout footer={true} navbar={true}>
            {(!isLoading && isLogin) ? (<Box gap={2} w={'100%'} p={4} bg={'white'} display={'flex'} flexDir={{ base: 'column', lg: 'row' }}>
                <Box flex={1} my={4}>
                    <Heading>Modifier Votre Annonce</Heading>
                    <FormControl mt={2}>
                        <FormLabel>Titre:</FormLabel>
                        <Input onChange={hundleInputChange} value={data?.title || ''} size={'lg'} name='title' borderColor={'GrayText'} my={1} type='text' />
                    </FormControl>
                    <Box >
                        <label htmlFor="#editor"><Text my={2}>Description</Text></label>
                        <TextEditor style={{ minHeight: '300px', border: '1px solid rgba(0,0,0,0.35)' }} value={description} placeholder='description' onChange={setDescription} />
                    </Box>
                    <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Surface:</FormLabel>
                            <InputGroup borderColor={'GrayText'} my={1}>
                                <Input onChange={hundleInputChange} value={data?.surface || 0} size={'lg'} name='surface' type='number' />
                                <InputRightElement h={'100%'} borderRightRadius={'lg'} fontWeight={'bold'}>m <sup>2</sup></InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Floor:</FormLabel>
                            <Input size={'lg'} value={data?.floor || 0} onChange={hundleInputChange} name='floor' borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Type:</FormLabel>
                            <Select name='type' onChange={hundleInputChange} value={data?.type || ''} borderColor={'GrayText'} size={'lg'}>
                                <option value="APARTMENT">Appartement</option>
                                <option value="VILLA">Villa</option>
                                <option value="HOUSE">Grande Maison</option>
                                <option value="OFFICE">Bureaux</option>
                                <option value="STUDIO">Studio</option>
                                <option value="GARAGE">Garage</option>
                                <option value="OTHER">Autres</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Salon(s):</FormLabel>
                            <Input size={'lg'} name='living_rooms' onChange={hundleInputChange} value={data?.living_rooms || 0} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Chambre(s):</FormLabel>
                            <Input size={'lg'} name='bed_rooms' value={data?.bed_rooms || 0} onChange={hundleInputChange} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Sanitaire(s):</FormLabel>
                            <Input size={'lg'} name='bath_rooms' onChange={hundleInputChange} value={data?.bath_rooms || 0} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Garage(s):</FormLabel>
                            <Input size={'lg'} name='garages' onChange={hundleInputChange} value={data?.garages || 0} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                    </Box>
                    <FormControl>
                        <FormLabel>Addresse</FormLabel>
                        <Input borderColor={'GrayText'} size={'lg'} type='text' name='address' onChange={hundleInputChange} value={data?.address || ''} />
                    </FormControl>
                    <Box mt={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Wilaya:</FormLabel>
                            <Input size={'lg'} name='wilaya' onChange={hundleInputChange} value={data?.wilaya || ''} borderColor={'GrayText'} my={1} type='text' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Commune:</FormLabel>
                            <Input size={'lg'} name='city' onChange={hundleInputChange} value={data?.city || ''} borderColor={'GrayText'} my={1} type='text' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>L'atitude:</FormLabel>
                            <Input size={'lg'} name='attitude' onChange={hundleInputChange} value={data?.attitude || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Longitude:</FormLabel>
                            <Input size={'lg'} name='longitude' onChange={hundleInputChange} value={data?.longitude || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                    </Box>
                    <Text color={'GrayText'} mb={4}>L'atitude et Longitude vous pouvez les voire dans google map!</Text>
                    <Box display={'flex'} alignItems={'baseline'} gap={2}>

                        <FormControl flex={1}>
                            <FormLabel>Prix:</FormLabel>
                            <InputGroup borderColor={'GrayText'} size={'lg'}>
                                <Input name='price' type='number' onChange={hundleInputChange} value={data?.price || ''} />
                                <InputRightElement textAlign={'center'} w={'80px'} color={'green.500'} fontWeight={'bold'}><Text w={'100%'} textAlign={'right'} mr={2}>{data?.status === 'FOR_RENT' ? 'DA/mois' : 'DA'}</Text></InputRightElement>
                            </InputGroup>
                            <FormHelperText>si vous souhaitez louer votre propriété, vous devez fournir un prix mensuel (par mois) </FormHelperText>
                        </FormControl>
                        <FormControl w={120} display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Type:</FormLabel>
                            <Select name='status' onChange={hundleInputChange} value={data?.status || ''} borderColor={'GrayText'} size={'lg'}>
                                <option value="FOR_SALE">Avendre</option>
                                <option value="FOR_RENT">Alouer</option>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box>
                    <Box my={4}>
                        {images.length < 1 ? <Text textAlign={'center'} fontSize={20} textTransform={'capitalize'} color={'GrayText'}>Importer des photos pour les visualisez</Text> :
                            <Box display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                                {
                                    images.map(img => {
                                        return <Box pos={'relative'} w={200} aspectRatio={'16 / 9'} >
                                            <Image src={img.display_url} alt={img.name} w={'100%'} h={'100%'} />
                                            <Box width={'100%'} h={'100%'} bg={'rgba(0,0,0,0.35)'} pos={'absolute'} top={0} left={0}></Box>
                                            <IconButton onClick={() => hundleDeleteImage(img)} pos={'absolute'} right={2} top={2} icon={<MdClose />} bg={'transparent !important'} color={'white'} />
                                        </Box>
                                    })
                                }
                            </Box>
                        }
                    </Box>
                    <Box p={4} alignSelf={'baseline'} mt={4} w={'100%'}>
                        <Box pos={'relative'} my={4} mx={'auto'} p={4} width={'100%'} aspectRatio={'16 / 9'} border={'dashed 3px #007BFF'} borderRadius={8}>
                            <input type='file' multiple style={{ width: "100%", height: '100%', opacity: 0 }} onChange={hundleFileChange} />
                            <Text color={'GrayText'} pos={'absolute'} fontSize={40} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'} display={'flex'} flexDirection={'column'} alignItems={'center'}><MdImage /><p style={{ fontSize: '12px' }}>importer images</p></Text>
                        </Box>
                        <Button onClick={hundleSubmite} w={'full'} my={2} colorScheme='blue' size={'lg'}>Enregistrées</Button>
                    </Box>
                </Box>
            </Box>) : <Box w={'100%'} h={'100vh'}><Loader /></Box>}
        </Layout>
    )
}

export default EditPost