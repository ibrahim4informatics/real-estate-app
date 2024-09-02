import React, { useEffect, useRef, useState } from 'react'
import Layout from './_Layout'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom';
import Map from '../components/Map';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchTopSection from '../components/SearchTopSection';
import Post from '../components/Post';



const SearchPage = () => {

    const [topHeight, setTopHeight] = useState();
    const topRef = useRef();
    const [userLocation, setUserLocation] = useState({ lat: null, long: null, err: null });

    useEffect(() => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(pos => {

                setUserLocation({ lat: pos.coords.latitude, long: pos.coords.longitude, err: null })

            }),
                (err) => {
                    setUserLocation({ lat: null, long: null, err })
                }

        }

        else {
            setUserLocation({ lat: null, long: null, err: "error getting user location" })
        }
    }, [])
    useEffect(() => {

        const event = window.addEventListener('resize', () => {
            setTopHeight(topRef.current.clientHeight);
        })

        return () => window.removeEventListener('resize', event);


    }, [topRef, topHeight])

    const [seaarchParams, _setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({});



    useEffect(() => {
        let query = '';

        seaarchParams.forEach((value, key) => {
            if (query.length < 1) {
                query += `?${key}=${value}`;
            }

            else {
                query += `&${key}=${value}`;
            }
        })
        if (query) {
            console.log("fetching data with query: " + query)
        }
    }, [seaarchParams])
    return (
        <Layout navbar={false} footer={false}>

            <SearchTopSection refContainer={topRef} filters={filters} setFilters={setFilters} />

            <Box zIndex={0} display={'flex'} h={{ base: 'auto', lg: 'calc(100vh - 56px)' }} w={'100%'} >

                <Box px={2} py={3} overflowY={'auto'} h={'100%'} bg={'white'} flex={1}>
                    <Heading size={'md'} color={'blue.600'}>Annonces de location {seaarchParams.get('city') && 'Environ ' + seaarchParams.get('city')}</Heading>
                    <Box my={2} gap={2} display={'flex'} alignItems={'center'} flexWrap={'wrap'}>


                        <Post title={'Oran Big House For Sold'} status={'FOR_SALE'} description={'&lt;script&gt;console.log(\"fuck\")&lt;/script&gt;'} price={42500000} surface={200} id={'688889a5-f90e-4578-b5fd-6f4fb8379033'} media={[
                            {
                                "id": 8,
                                "display_url": "https://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                                "bucket_url": "gs://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                                "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                            }

                            ,
                            {
                                "id": 9,
                                "display_url": "https://www.ourluxuryhouses.com/img/homepage/houses/covet-douro.jpg",
                                "bucket_url": "gs://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                                "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                            }

                            ,
                            {
                                "id": 10,
                                "display_url": "data:image/jpeg;base64,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",
                                "bucket_url": "gs://media.istockphoto.com/id/682432560/photo/stunning-luxury-home-exterior-at-sunset.jpg?s=612x612&w=0&k=20&c=NApF0vAI8wppLkNX73wWRxXUO2nyLHCB6peu38k2rtI=",
                                "property_id": "548a320e-22ef-4842-aad1-ceef542b49f4"
                            }
                        ]} />






                    </Box>

                    <Pagination
                        onChange={(page) => {
                            const newSearchParams = new URLSearchParams(seaarchParams);
                            newSearchParams.set('page', page);
                            _setSearchParams(newSearchParams);
                        }}
                        current={Number.parseInt(seaarchParams.get('page')) || 1}
                        total={100}
                        pageSize={20}
                        align='center'
                        style={{ marginInline: 'auto' }}
                    />

                </Box>
                <Box display={{ base: 'none', lg: 'flex' }} w={"50%"} minW={500} maxW={1024} alignItems={'center'} justifyContent={'center'}>
                    {userLocation.lat && userLocation.long ?
                        <Map width={"100%"} height={'100%'} zoom={13} center={[userLocation.lat, userLocation.long]} properties_locations={[
                            { "lat": 35.460557717177416, "long": -0.658947 }, // North
                            { "lat": 35.370697682822586, "long": -0.658947 }, // South
                            { "lat": 35.4156277, "long": -0.6033436228627996 }, // East
                            { "lat": 35.4156277, "long": -0.7145503771372005 }
                        ]} /> : <Spinner size={'lg'} colorScheme='blue' />}
                </Box>
            </Box>
        </Layout>
    )
}

export default SearchPage