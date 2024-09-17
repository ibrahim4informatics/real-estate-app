import { Avatar, Box, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { changeAvatar, deleteAvatar } from '../services/users.service';
import { deleteSingleImage, uploadSingleFile } from '../services/firebase.service';

const ChangeAvatar = ({ avatar, setAvatar, user }) => {
    const toast = useToast();

    const submitAvatar = () => {
        const submitionRequest = changeAvatar(avatar.display_url, avatar.bucket_url);
        toast.promise(submitionRequest, {
            success: { title: "Avatar modifié", description: "Votre avatar a bien été enregistrer" },
            loading: { title: "Patientez!", description: " sauvegarde de l'avatar" },
            error: { title: "Erreur de modification", description: "Votre avatar n'a pas été modifié" }
        })
        return submitionRequest.then(res => { setAvatar(prev => ({ ...prev, id: res.data.avatar?.id })) }).catch(err => console.log(err))


    }


    const hundleDeleteAvatar = () => {
        if (!avatar.bucket_url) return
        const deleteRequest = deleteSingleImage(avatar.bucket_url)
        toast.promise(deleteRequest, {
            success: { title: "Image supprimée", description: "Votre image de profile a bien été supprimée" },
            loading: { title: "Patientez!", description: "Suppression de l'image de profile" },
            error: { title: "Erreur de suppression", description: "Votre image de profile n'a pas été supprimée" }
        })
        return deleteRequest.then(res => {
            if (avatar.id) {
                const deleteFromDb = deleteAvatar();
                deleteFromDb.then(res => {
                });
            }
            setAvatar(null)
            toast.promise(deleteFromDb, {
                success: { title: "Avatar supprimé", description: "Votre avatar a bien été supprimé" },
                loading: { title: "Patientez!", description: "Suppression de l'avatar" },
                error: { title: "Erreur de suppression", description: "Votre avatar n'a pas été supprimé" }
            })

        })
            .catch(err => console.log(err))


    }

    const hundleAvatarChange = (e) => {
        console.log('first')
        const file = e.target.files[0];
        if (!file) return;
        if (avatar?.bucket_url) {
            const deleteRequest = deleteSingleImage(avatar.bucket_url)
            deleteRequest.then(res => { console.log('res') })
                .catch(err => console.log(err))
            toast.promise(deleteRequest, {
                success: { title: "Image supprimée", description: "Votre image de profile a bien été supprimée" },
                loading: { title: "Patientez!", description: "Suppression de l'image de profile" },
                error: { title: "Erreur de suppression", description: "Votre image de profile n'a pas été supprimée" }
            })
        }
        const uploadRequest = uploadSingleFile(file, `${user.id}/avatar/`)
        uploadRequest.then(success => { console.log('success', success); setAvatar({ display_url: success.display_url, bucket_url: success.bucket_url }) })
            .catch(error => { console.log('error', error) });
        toast.promise(uploadRequest, {
            success: { title: "Image téléchargée", description: "Votre image de profile a bien été chargée" },
            loading: { title: "Patientez!", description: "Chargement de l'image de profile" },
            error: { title: "Erreur de téléchargement", description: "Votre image de profile n'a pas été chargée" }
        })
    }



    return (
        <Box w={{ base: '100%', md: 250 }} p={5} display={'flex'} flexDir={'column'} alignItems={'center'}>
            {console.log(avatar)}
            <Avatar my={4} size={'xl'} src={avatar?.display_url || null} alt='profile' />
            <Box w={'full'} my={2} as={Button} colorScheme='blue'>
                <Text pos={'absolute'} textAlign={'center'}>{avatar?.display_url ? 'Changer' : 'Ajouter'} Avatar</Text>
                <input onChange={hundleAvatarChange} multiple={false} accept='image/png, image/jpeg' type='file' style={{ background: 'green', width: "100%", height: "100%", opacity: 0 }} />
            </Box>
            <Button isDisabled={!avatar?.display_url && !(avatar?.id)} onClick={submitAvatar} w={'full'} my={2} colorScheme='green'>Sauvgarder</Button>

            <Button isDisabled={!(avatar?.id) && !avatar?.bucket_url} onClick={hundleDeleteAvatar} colorScheme='red' w={'full'}>Supprimer Avatar</Button>
        </Box>
    )
}

export default ChangeAvatar