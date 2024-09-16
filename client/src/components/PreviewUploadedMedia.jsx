import { Box, IconButton, Image, Text, useToast } from '@chakra-ui/react'
import { deleteSingleImage, uploadSingleFile } from '../services/firebase.service';
import { MdClose } from 'react-icons/md';
import React from 'react'

const PreviewUploadedMedia = ({ images, setImages, user }) => {
    const toast = useToast({
        duration: 3000,
        isClosable: true,
        position: 'top-left',
    })

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
            setImages(images.filter(image => image.bucket_url !== img.bucket_url));
        }).catch(err => console.log(err))

        toast.promise(deleteImageRequest, {
            success: { title: 'Image supprimée', description: 'Votre image a bien été supprimée' },
            loading: { title: 'Patientez!', description: 'Suppression de l\'image' },
            error: { title: 'Erreur de suppression', description: 'Votre image n\'a pas été supprimée' }
        })

        return

    }
    return (
        <Box w={{base:'100%', lg:'50%'}}>
            <Box my={4}>
                {images.length < 1 ? <Text textAlign={'center'} fontSize={20} textTransform={'capitalize'} color={'GrayText'}>Importer des photos pour les visualisez</Text> :
                    <Box display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {
                            images.map(img => {
                                return <Box key={img.bucket_url} pos={'relative'} w={200} aspectRatio={'16 / 9'} >
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
                    <input type='file' multiple style={{ width: "100%", height: '100%', opacity: 0, zIndex: 2 }} onChange={hundleFileChange} />
                    <Text zIndex={1} color={'GrayText'} pos={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'}>importer des photos</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default PreviewUploadedMedia