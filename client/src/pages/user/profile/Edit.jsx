import React, { useEffect, useState } from 'react'
import Layout from '../../_Layout'
import { Box, Tabs, TabList, TabPanel, TabPanels, Tab, FormControl, FormLabel, Input, Checkbox, Button, Image, Avatar, Text, Select, Heading, useToast, FormErrorMessage } from '@chakra-ui/react'
import { MdSave } from 'react-icons/md'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { deleteSingleImage, uploadSingleFile } from '../../../services/firebase.service'
import { changeAvatar, deleteAvatar, updateUserPersonelInfo } from '../../../services/users.service'
import Validator from '../../../utils/validations'

const Edit = () => {
    const [data, setData] = useState({});
    const [dataErrors, setDataErrors] = useState({});
    const toast = useToast({ position: 'top-left', isClosable: true, duration: 3000 });
    const [fileData, setFileData] = useState({ display_url: "", bucket_url: "" });
    const validator = new Validator();
    const { user, isLoading, isLogin } = useAuth()
    const hundleChange = (e) => {
        setDataErrors({ ...dataErrors, [e.target.name]: '' })
        if (e.target.name === 'isSeller') {
            return setData({ ...data, [e.target.name]: e.target.value === 'Vendeur' ? true : false })
        }
        return setData({ ...data, [e.target.name]: e.target.value });
    }

    const hundleDeleteAvatar = () => {
        if (!fileData.bucket_url) return
        const deleteRequest = deleteSingleImage(fileData.bucket_url)
        deleteRequest.then(res => {
            const deleteFromDb = deleteAvatar();
            deleteFromDb.then(res => {
                setFileData({ display_url: null, bucket_url: null })
            });
            toast.promise(deleteFromDb, {
                success: { title: "Avatar supprimé", description: "Votre avatar a bien été supprimé" },
                loading: { title: "Patientez!", description: "Suppression de l'avatar" },
                error: { title: "Erreur de suppression", description: "Votre avatar n'a pas été supprimé" }
            })
            return
        })
            .catch(err => console.log(err))

        toast.promise(deleteRequest, {
            success: { title: "Image supprimée", description: "Votre image de profile a bien été supprimée" },
            loading: { title: "Patientez!", description: "Suppression de l'image de profile" },
            error: { title: "Erreur de suppression", description: "Votre image de profile n'a pas été supprimée" }
        })
    }

    const hundleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (fileData.bucket_url) {
            const deleteRequest = deleteSingleImage(fileData.bucket_url)
            deleteRequest.then(res => { console.log('res') })
                .catch(err => console.log(err))

            toast.promise(deleteRequest, {
                success: { title: "Image supprimée", description: "Votre image de profile a bien été supprimée" },
                loading: { title: "Patientez!", description: "Suppression de l'image de profile" },
                error: { title: "Erreur de suppression", description: "Votre image de profile n'a pas été supprimée" }
            })
        }

        const uploadRequest = uploadSingleFile(file, `${user.id}/avatar/`)
        uploadRequest.then(success => { console.log('success', success); setFileData({ display_url: success.display_url, bucket_url: success.bucket_url }) })
            .catch(error => { console.log('error', error) });

        toast.promise(uploadRequest, {
            success: { title: "Image téléchargée", description: "Votre image de profile a bien été chargée" },
            loading: { title: "Patientez!", description: "Chargement de l'image de profile" },
            error: { title: "Erreur de téléchargement", description: "Votre image de profile n'a pas été chargée" }
        })

    }

    const submitAvatar = () => {
        const submitionRequest = changeAvatar(fileData.display_url, fileData.bucket_url);
        submitionRequest.then(res => { }).catch(err => console.log(err))
        toast.promise(submitionRequest, {
            success: { title: "Avatar modifié", description: "Votre avatar a bien été enregistrer" },
            loading: { title: "Patientez!", description: " sauvegarde de l'avatar" },
            error: { title: "Erreur de modification", description: "Votre avatar n'a pas été modifié" }
        })
        return;
    }
    const hundleSubmit = (e) => {
        e.preventDefault();
        if (!validator.isPhoneNumber(data.phone)) setDataErrors({ ...dataErrors, phone: 'numero de telephone invalide' })

        if ((validator.isPhoneNumber(data.phone) || data.phone.length > 12)) {
            const updateRequest = updateUserPersonelInfo(data)
            updateRequest.then(res => { }).catch(err => console.log(err));
            toast.promise(updateRequest, {
                success: { title: "Informations personnelles modifiées", description: "Vos informations personnelles ont bien été enregistrées" },
                loading: { title: "Patientez!", description: "sauvegarde des informations personnelles" },
                error: { title: "Erreur de modification", description: "Vos informations personnelles n'ont pas été modifiées" }
            })
        }

        return


    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !isLogin) return navigate('/')
        else if (user) {

            setData({ phone: user.phone, full_name: user.full_name, isSeller: user.isSeller })
            setFileData({ display_url: user.avatar?.display_url, bucket_url: user.avatar?.bucket_url })

        }
    }, [isLoading])
    return (
        !isLoading ? (<Layout navbar={true} footer={true} >
            <Box >
                <Tabs my={6} display={{ base: 'block', md: 'none' }} >
                    <TabList>
                        <Tab>informations personnelles</Tab>
                        <Tab>photo de profile</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <form onSubmit={hundleSubmit}>

                                <FormControl my={2}>
                                    <FormLabel>Nom Complet</FormLabel>
                                    <Input value={data.full_name || ''} onChange={hundleChange} name='full_name' type='text' borderColor={'GrayText'} />
                                </FormControl>

                                <FormControl isInvalid={dataErrors?.phone ? true : false} my={2}>
                                    <FormLabel>Tel</FormLabel>
                                    <Input value={data.phone || ''} onChange={hundleChange} name='phone' type='text' borderColor={'GrayText'} />
                                    <FormErrorMessage >{dataErrors?.phone}</FormErrorMessage>
                                </FormControl>

                                <FormControl my={2}>
                                    <FormLabel>Role</FormLabel>
                                    <Select value={data.isSeller ? 'Vendeur' : 'Client'} onChange={hundleChange} name='isSeller' borderColor={'GrayText'} >
                                        <option value="Vendeur">Vendeur</option>
                                        <option value="Client">Client</option>
                                    </Select>
                                </FormControl>

                                <Button colorScheme='blue' size={'lg'} w={'full'} my={2} type='submit' leftIcon={<MdSave />}>Sauvgarder</Button>

                            </form>
                        </TabPanel>
                        <TabPanel>
                            <Box w={'100%'} p={5} display={'flex'} flexDir={'column'} alignItems={'center'}>
                                <Avatar my={4} size={'xl'} src={fileData.display_url || null} alt='profile' />
                                <Box w={'full'} my={2} as={Button} colorScheme='blue'>
                                    <Text pos={'absolute'} textAlign={'center'}>{fileData.display_url ? 'Changer' : 'Ajouter'} Avatar</Text>
                                    <input onChange={hundleAvatarChange} multiple={false} accept='image/png, image/jpeg' type='file' style={{ background: 'green', width: "100%", height: "100%", opacity: 0 }} />
                                </Box>
                                {fileData.display_url && <Button onClick={submitAvatar} w={'full'} my={2} colorScheme='green'>Sauvgarder</Button>}
                                {fileData.display_url && <Button onClick={hundleDeleteAvatar} colorScheme='red' w={'full'}>Supprimer Avatar</Button>}
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Box w={'100%'} display={{ base: 'none', md: 'flex' }} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
                    <Box w={'80%'} maxW={720} bg={'white'} p={5} display={'flex'}>
                        <Box flex={1}>
                            <Heading size={'md'}>Modefier Votre Profile</Heading>
                            <form onSubmit={hundleSubmit}>

                                <FormControl my={2}>
                                    <FormLabel>Nom Complet</FormLabel>
                                    <Input value={data.full_name || ''} onChange={hundleChange} name='full_name' type='text' borderColor={'GrayText'} />
                                </FormControl>

                                <FormControl isInvalid={dataErrors?.phone ? true : false} my={2}>
                                    <FormLabel>Tel</FormLabel>
                                    <Input value={data.phone || ''} onChange={hundleChange} name='phone' type='text' borderColor={'GrayText'} />
                                    <FormErrorMessage>{dataErrors?.phone}</FormErrorMessage>
                                </FormControl>

                                <FormControl my={2}>
                                    <FormLabel>Role</FormLabel>
                                    <Select value={data.isSeller ? 'Vendeur' : 'Client'} onChange={hundleChange} name='isSeller' borderColor={'GrayText'} >
                                        <option value="Vendeur">Vendeur</option>
                                        <option value="Client">Client</option>
                                    </Select>
                                </FormControl>

                                <Button colorScheme='blue' size={'lg'} w={'full'} my={2} type='submit' leftIcon={<MdSave />}>Sauvgarder</Button>

                            </form>

                        </Box>
                        <Box w={250} justifyContent={'center'} p={5} display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <Avatar my={4} size={'xl'} src={fileData.display_url} alt='profile' />
                            <Box w={'full'} my={2} as={Button} colorScheme='blue'>
                                <Text pos={'absolute'} textAlign={'center'}>{fileData.display_url ? 'Changer' : 'Ajouter'} Avatar</Text>
                                <input onChange={hundleAvatarChange} accept='image/png, image/jpeg' type='file' style={{ background: 'green', width: "100%", height: "100%", opacity: 0 }} />
                            </Box>
                            {fileData.display_url && <Button onClick={submitAvatar} w={'full'} my={2} colorScheme='green'>Sauvgarder</Button>}
                            {fileData.display_url && <Button onClick={hundleDeleteAvatar} colorScheme='red' w={'full'}>Supprimer Avatar</Button>}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Layout>) : <Box w={'100%'} h={'100vh'}><Loader /></Box>
    )
}

export default Edit