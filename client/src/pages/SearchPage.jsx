import React, { useEffect, useRef, useState } from 'react'
import Layout from './_Layout'
import { Box, filter, Heading, Spinner, Text } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom';
import Map from '../components/Map';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchTopSection from '../components/SearchTopSection';
import Post from '../components/Post';
import axios from '../utils/axios'
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';


const mock = {
    "posts": [
        {
            "id": "688889a5-f90e-4578-b5fd-6f4fb8379033",
            "title": "Oran Big House For Sold",
            "description": "&lt;script&gt;console.log(\"fuck\")&lt;/script&gt;",
            "user_id": "74ebfcae-9b6c-4512-9218-37b4b8700535",
            "created_at": "2024-08-31T15:51:00.018Z",
            "user": {
                "id": "74ebfcae-9b6c-4512-9218-37b4b8700535",
                "email": "khalilbenyahia2@gmail.com",
                "password": "$2b$12$QFql9Uh2D5y8S.TInIDYpuSOEsKob/mMDe/eZ0C5Sp/6WHpl4b3qS",
                "full_name": "Ibrahim Elkhalil benyahia",
                "phone": "+213792017322",
                "isSeller": true,
                "isOnline": false,
                "created_at": "2024-08-31T15:50:03.806Z",
                "avatar": null
            },
            "property": {
                "id": "548a320e-22ef-4842-aad1-ceef542b49f4",
                "attitude": "35.683928",
                "longitude": "-0.639186",
                "wilaya": "Oran",
                "city": "Maraval",
                "address": "Maravel Center lots 425",
                "bed_rooms": 5,
                "bath_rooms": 2,
                "garages": 2,
                "living_rooms": 2,
                "floor": 0,
                "surface": "175.25",
                "type": "HOUSE",
                "price": "42500000",
                "status": "FOR_SALE",
                "post_id": "688889a5-f90e-4578-b5fd-6f4fb8379033",
                "media": [
                    {
                        "id": 8,
                        "display_url": "https://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                        "bucket_url": "gs://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                        "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                    },
                    {
                        "id": 9,
                        "display_url": "https://i.pinimg.com/736x/4a/67/3a/4a673a2ee94235c7462c2f443f246d3f.jpg",
                        "bucket_url": "gs://i.pinimg.com/736x/4a/67/3a/4a673a2ee94235c7462c2f443f246d3f.jpg",
                        "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                    },
                    {
                        "id": 10,
                        "display_url": "https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509453_uYkqbE3sADwXS78dG4W4UyOVaSkZM7X6.jpg",
                        "bucket_url": "gs://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509453_uYkqbE3sADwXS78dG4W4UyOVaSkZM7X6.jpg",
                        "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                    }
                ]
            }
        },
        {
            "id": "344b0a29-ba30-4bb4-8466-e5a224e1e1d7",
            "title": "Jijel Big House",
            "description": "House",
            "user_id": "587a44d5-22d0-4886-8ef2-32f209b28d8e",
            "created_at": "2024-08-30T20:55:27.282Z",
            "user": {
                "id": "587a44d5-22d0-4886-8ef2-32f209b28d8e",
                "email": "khalilbenyahia12@gmail.com",
                "password": "$2b$12$o4Kaz7hNHghsqgEe1Xefwe9n32qE8Hc.mvgQgVy9Si0unf04l13gy",
                "full_name": "Ibrahim Elkhalil benyahia",
                "phone": "+213792017322",
                "isSeller": true,
                "isOnline": false,
                "created_at": "2024-08-30T15:02:50.684Z",
                "avatar": null
            },
            "property": {
                "id": "db8d1f47-4dc4-449f-ab2c-000f01fff2f0",
                "attitude": "100",
                "longitude": "125",
                "wilaya": "Jijel",
                "city": "Milia",
                "address": "300lots",
                "bed_rooms": 3,
                "bath_rooms": 1,
                "garages": 1,
                "living_rooms": 2,
                "floor": 1,
                "surface": "120",
                "type": "HOUSE",
                "price": "45000",
                "status": "FOR_RENT",
                "post_id": "344b0a29-ba30-4bb4-8466-e5a224e1e1d7",
                "media": []
            }
        }
    ],
    "total": 2
}

//https://nominatim.openstreetmap.org/reverse?lat=36.737232&lon=3.086472&format=json

const SearchPage = () => {

    const [topHeight, setTopHeight] = useState();
    const [fetched, setFeteched] = useState({ data: null, isLoading: true, error: null });
    const [search, setSearch] = useState("");
    const topRef = useRef();
    const [userLocation, setUserLocation] = useState({ lat: null, long: null, err: null });
    const [filters, setFilters] = useState({});
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
        const params = { page: Number.parseInt(seaarchParams.get('page')) || 1 };
        seaarchParams.forEach((value, key) => {
            params[key] = value;
        })
        axios.get('/api/posts', {
            params
        }).then(response => { setFeteched({ data: response.data, error: null, isLoading: false }) }).catch(error => { console.log(error); setFeteched({ data: null, error: error || "error fetching data", isLoading: false }) })

    }, [])







    if (fetched.error) {
        return "error page " + error.toString();
    }
    return (
        <Layout navbar={true} footer={false}>

            <SearchTopSection refContainer={topRef} setFetched={setFeteched} />
            {
                !fetched.isLoading ? (<>

                    <Box zIndex={0} display={'flex'} h={{ base: 'auto', lg: 'calc(100vh - 56px)' }} w={'100%'} >

                        <Box overflowY={'auto'} h={'100%'} bg={'white'} flex={1}>
                            <Heading px={4} py={6} size={'md'} color={'blue.600'}>Annonces de location {seaarchParams.get('city') && 'Environ ' + seaarchParams.get('city')}</Heading>
                            <Box px={2} py={3} my={2} gap={2} display={'flex'} alignItems={'center'} flexWrap={'wrap'}>


                                {fetched.data.posts.length > 0 ? fetched.data.posts.map(post => <Post key={post.id} title={post.title} status={post.property.status} description={post.description} price={post.property.price} surface={post.property.surface} id={post.id} media={post.property.media} />) : <Text mt={4} ml={2} fontSize={16} color={'GrayText'} fontWeight={'bold'}>Pas de Resultats</Text>}



                            </Box>

                            <Pagination
                                onChange={(page) => {
                                    const newSearchParams = new URLSearchParams(seaarchParams);
                                    newSearchParams.set('page', page);
                                    _setSearchParams(newSearchParams);
                                }}
                                current={Number.parseInt(seaarchParams.get('page')) || 1}
                                total={fetched.data.total}
                                pageSize={30}
                                align='center'
                                style={{ marginInline: 'auto' }}
                                hideOnSinglePage
                            />

                        </Box>
                        <Box display={{ base: 'none', lg: 'flex' }} w={"50%"} minW={500} maxW={1024} alignItems={'center'} justifyContent={'center'}>

                            {fetched.data.posts.length > 0 && <Map params={seaarchParams} width={"100%"} height={'100%'} center={fetched.data.posts > 0 && fetched.data.posts[0] ? [fetched.data.posts[0].property.attitude, fetched.data.posts[0].property.longitude] : [0, 0]} user_lat={userLocation?.lat} user_lon={userLocation?.long} properties_locations={fetched.data.posts.length > 0 ? fetched.data.posts.map(post => ({ id: post.id, title: post.title, lat: post.property.attitude, long: post.property.longitude })) : null} />}
                        </Box>
                    </Box>
                </>) : <Box width={'100%'} h={'100vh'}><Loader /></Box>
            }
        </Layout>
    )
}

export default SearchPage

