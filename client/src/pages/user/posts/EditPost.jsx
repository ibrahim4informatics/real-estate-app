import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

import Layout from '../../_Layout'
import { Box, Heading } from '@chakra-ui/react';
import Loader from '../../../components/Loader';
import EditPostForm from '../../../components/forms/EditPostForm';
import PreviewUploadedMedia from '../../../components/PreviewUploadedMedia';

const EditPost = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { user, isLoading, isLogin } = useAuth();
    
    const { post_id } = useParams();
    useEffect(() => {
        if (!isLoading && !isLogin) {
            return navigate('/')
        }
    }, [isLoading]);
    return (
        <Layout footer={true} navbar={true}>
            {(!isLoading && isLogin) ? (<Box gap={2} w={'100%'} p={4} bg={'white'} display={'flex'} flexDir={{ base: 'column', lg: 'row' }}>
                <Box flex={1} my={4}>
                    <Heading>Modifier Votre Annonce</Heading>
                    <EditPostForm post_id={post_id} images={images} />
                </Box>
                <PreviewUploadedMedia images={images} setImages={setImages} user={user} />
            </Box>) : <Box w={'100%'} h={'100vh'}><Loader /></Box>}
        </Layout>
    )
}
export default EditPost