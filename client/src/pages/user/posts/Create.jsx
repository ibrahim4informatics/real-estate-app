import React, { useEffect, useState } from 'react'
import Layout from '../../_Layout'
import { Box, Heading } from '@chakra-ui/react';
// import 'react-quill/dist/quill.snow.css';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader';


import { useNavigate } from 'react-router-dom';

import CreatePostForm from '../../../components/forms/CreatePostForm';
import PreviewUploadedMedia from '../../../components/PreviewUploadedMedia';




const Create = () => {
    const navigate = useNavigate();
    const { user, isLoading, isLogin } = useAuth();
    const [images, setImages] = useState([]);
    useEffect(() => {
        if (!isLoading && !isLogin) {
            return navigate('/')
        }
    }, [isLoading])
    return (
        <Layout footer={true} navbar={true}>
            {(!isLoading && isLogin) ? (<Box gap={2} w={'100%'} p={4} bg={'white'} display={'flex'} flexDir={{ base: 'column', lg: 'row' }}>
                <Box flex={1} my={4}>
                    <Heading>Créer Une Annonce</Heading>
                    <CreatePostForm images={images} />
                </Box>
                <PreviewUploadedMedia images={images} setImages={setImages} user={user} />

            </Box>) : <Box w={'100%'} h={'100vh'}><Loader /></Box>}
        </Layout>
    )
}

export default Create