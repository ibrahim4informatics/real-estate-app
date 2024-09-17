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
import EditProfileForm from '../../../components/forms/EditProfileForm'
import ChangeAvatar from '../../../components/ChangeAvatar'

const Edit = () => {
    const [data, setData] = useState({});
    const [dataErrors, setDataErrors] = useState({});
    const toast = useToast({ position: 'top-left', isClosable: true, duration: 3000 });
    const { user, isLoading, isLogin } = useAuth()
    const [fileData, setFileData] = useState(user?.avatar);
    const validator = new Validator();


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
                            <EditProfileForm user={user} />
                        </TabPanel>
                        <TabPanel>
                            <ChangeAvatar avatar={fileData} setAvatar={setFileData} user={user} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Box w={'100%'} gap={4} display={{ base: 'none', md: 'flex' }} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
                    <Box w={'80%'} maxW={720} bg={'white'} p={5} display={'flex'}>
                        <Box flex={1}>
                            <Heading size={'md'}>Modefier Votre Profile</Heading>
                            <EditProfileForm user={user} />

                        </Box>
                    </Box>
                        <ChangeAvatar avatar={fileData} setAvatar={setFileData} user={user} />
                </Box>
            </Box>
        </Layout>) : <Box w={'100%'} h={'100vh'}><Loader /></Box>
    )
}

export default Edit