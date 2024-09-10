import React, { useEffect, useRef, useState } from 'react'
import Layout from './_Layout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { ScrollRestoration, useNavigate, useSearchParams } from 'react-router-dom';
import Map from '../components/Map';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchTopSection from '../components/SearchTopSection';
import Post from '../components/Post';
import Loader from '../components/Loader';
import { getPosts } from '../services/posts.service';
// import useFetch from '../hooks/useFetch';



const SearchPage = () => {
    const navigate = useNavigate()

    const [topHeight, setTopHeight] = useState();
    const [fetched, setFeteched] = useState({ data: null, isLoading: true, error: null });
    const containerRef = useRef(null);
    const topRef = useRef();
    const [userLocation, setUserLocation] = useState({ lat: null, long: null, err: null });
    const [seaarchParams, _setSearchParams] = useSearchParams();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocation({ lat: pos.coords.latitude, long: pos.coords.longitude, err: null })
            }, (err) => {
                setUserLocation({ lat: null, long: null, err: "error getting user location" })
            })
        }
        else {
            setUserLocation({ lat: null, long: null, err: "error getting user location" })
        }
    }, [navigator.geolocation, userLocation.lat, userLocation.long])


    useEffect(() => {
        const event = window.addEventListener('resize', () => {
            setTopHeight(topRef.current.clientHeight);
        })

        return () => window.removeEventListener('resize', event);

    }, [topRef, topHeight])

    useEffect(() => {
        setFeteched({ data: null, isLoading: true, error: null })
        const params = { page: Number.parseInt(seaarchParams.get('page')) || 1 };
        seaarchParams.forEach((value, key) => {
            params[key] = value;
        })
        getPosts(params).then(success => setFeteched({ data: success, error: null, isLoading: false }))
            .catch(fail => {
                setFeteched({ data: null, error: "Error Getting Posts", isLoading: false })

            })
    }, [seaarchParams.get('page')])
    if (fetched.error) {
        return "error page " + error.toString();
    }
    return (
        <Layout navbar={true} footer={false}>

            <SearchTopSection refContainer={topRef} setFetched={setFeteched} />
            {
                !fetched.isLoading ? (<>

                    <Box zIndex={0} display={'flex'} h={{ base: 'auto', lg: 'calc(100vh - 65px - 104px)' }} w={'100%'} >

                        <Box ref={containerRef} overflowY={'auto'} h={'100%'} bg={'white'} flex={1}>
                            <Heading px={4} py={6} size={'md'} color={'blue.600'}>Annonces de location {seaarchParams.get('city') && 'Environ ' + seaarchParams.get('city')}</Heading>
                            <Text px={6} ml={2} color={'GrayText'} fontWeight={'bold'} fontSize={14}>{fetched.data.total} annonces</Text>
                            <Box px={2} py={3} my={2} gap={2} display={'flex'} alignItems={'center'} flexWrap={'wrap'}>


                                {fetched.data.posts.length > 0 ? fetched.data.posts.map(post => <Post key={post.id} title={post.title} status={post.property.status} description={post.description} price={post.property.price} surface={post.property.surface} id={post.id} media={post.property.media} />) : <Text mt={4} ml={2} fontSize={16} color={'GrayText'} fontWeight={'bold'}>Pas de Resultats</Text>}

                            </Box>

                            <Pagination
                                onChange={(page) => {
                                    // setFeteched({data:null, isLoading:true, error:null});
                                    // const newSearchParams = new URLSearchParams(seaarchParams);
                                    // newSearchParams.set('page', page);
                                    // _setSearchParams(newSearchParams);

                                    // if (containerRef) {
                                    //     containerRef.current.scrollTo({ top: 0, behaviour: 'smooth' });
                                    // }

                                    return navigate(`/annonces?page=${page}`)

                                }}
                                current={Number.parseInt(seaarchParams.get('page')) || 1}
                                total={fetched.data.total}
                                pageSize={20}
                                align='center'
                                style={{ marginInline: 'auto', marginBottom: 10 }}
                                hideOnSinglePage
                            />

                        </Box>
                        <Box pos={'relative'} display={{ base: 'none', lg: 'flex' }} w={"50%"} minW={500} maxW={1024} alignItems={'center'} justifyContent={'center'}>
                            {fetched.data.posts.length > 0 && <Map params={seaarchParams} width={"100%"} height={'100%'} user_lat={userLocation?.lat} user_lon={userLocation?.long} properties_locations={fetched.data.posts.length > 0 ? fetched.data.posts.map(post => ({ id: post.id, title: post.title, lat: post.property.attitude, long: post.property.longitude })) : null} />}
                        </Box>
                        <ScrollRestoration />
                    </Box>
                </>) : <Box width={'100%'} h={'100vh'}><Loader /></Box>
            }
        </Layout>
    )
}


export default SearchPage

