import React, { useContext, useEffect, useState } from 'react'
import Layout from './_Layout'
import { Avatar, Badge, Box, Button, Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Carrousel from '../components/Carrousel'
import { FaMap } from 'react-icons/fa'
import { MdChatBubble, MdEmail, MdPhone, MdStar } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import SinglePostMap from '../components/SinglePostMap'
import axios from 'axios'
import Loader from '../components/Loader'
import useFetch from '../hooks/useFetch'





const PostPage = () => {
    const { id } = useParams()

    const { isLoading, data, error } = useFetch(`/api/posts/${id}`,[])

    if(error) {
        return <Text color='red.500'>Une erreur s'est produite lors de la récupération des données.</Text>
    }

 


    return (
        <Layout navbar={true} footer={true}>
           
           

            {
                !isLoading ? (<Box mt={2} width={'full'} bg={'white'} display={{ base: 'block', lg: 'flex' }} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                    <Box py={{ base: 4, lg: 0 }} px={{ base: 2, lg: 0 }}>
                        <Heading>
                            {data.post.title}
                            <Badge ml={2} colorScheme={data.post.property.status === 'FOR_SALE' || data.post.property.status === 'FOR_RENT' ? 'green' : 'red'}>
                                {data.post.property.status === 'FOR_SALE' ? 'Avendre' : data.post.property.status === 'FOR_RENT' ? 'Alouer' : data.post.property.status === 'SOLD' ? 'Vendu' : 'Loue'}
                            </Badge>
                        </Heading>
                        <Badge fontSize={'xl'} py={1} rounded={'md'} px={4} my={2} colorScheme='green'>Prix: {data.post.property.price}</Badge>
                        <Box marginInline={{ base: 'auto', lg: 0 }} w={"100%"} maxW={650} my={4}>
                            <Carrousel slides={data.post.property.media} />
                        </Box>
                        <Box w={"100%"} dangerouslySetInnerHTML={{ __html: data.post.description }}></Box>

                        <Box py={4} my={2}>
                            <Heading mb={2} size={'md'} textAlign={{ base: 'center' }}>Detailles</Heading>

                            <TableContainer my={4} rounded={'md'}>
                                <Table colorScheme='blue' variant={''}>
                                    <TableCaption>
                                        <Text color={'black'} fontWeight={'bold'}>Informations sur l'offre</Text>
                                    </TableCaption>
                                    <Thead bg={'blue.400'} color={'white'}>
                                        <Tr>
                                            <Th>Salons</Th>
                                            <Th>Chambres</Th>
                                            <Th>Sale de Bain</Th>
                                            <Th>Garages</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        <Tr>
                                            <Td isNumeric>{data.post.property.living_rooms}</Td>
                                            <Td isNumeric>{data.post.property.bed_rooms}</Td>
                                            <Td isNumeric>{data.post.property.bath_rooms}</Td>
                                            <Td isNumeric>{data.post.property.garages}</Td>
                                        </Tr>

                                    </Tbody>
                                </Table>
                            </TableContainer>


                            <TableContainer my={4} rounded={'md'}>
                                <Table colorScheme='blue' variant={''}>
                                    <TableCaption>
                                        <Text color={'black'} fontWeight={'bold'}>Informations sur l'offre</Text>
                                    </TableCaption>
                                    <Thead bg={'blue.400'} color={'white'}>
                                        <Tr>
                                            <Th>Status</Th>
                                            <Th>Type</Th>
                                            <Th>Surface</Th>
                                            <Th>Etage</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        <Tr>
                                            <Td fontWeight={'bold'} color={data.post.property.status === 'FOR_SALE' || data.post.property.status === 'FOR_SALE' ? 'green' : 'red'}>{data.post.property.status === 'FOR_SALE' ? 'Avendre' : data.post.property.status === 'FOR_RENT' ? 'Alouer' : data.post.property.status === 'SOLD' ? 'Vendu' : 'Loue'}</Td>
                                            <Td >
                                                {data.post.property.type === 'APARTMENT' ? 'Appartement' : data.post.property.type === 'VILLA' ? 'Villa' : data.post.property.type === 'HOUSE' ? 'Grande Maison' : data.post.property.type === 'OFFICE' ? 'Bureau' : data.post.property.type === 'STUDIO' ? 'Studio' : data.post.property.type === 'GARAGE' ? 'Garage' : 'Autres'}
                                            </Td>
                                            <Td fontWeight={'bold'}>{data.post.property.surface} m<sup>2</sup></Td>
                                            <Td>{data.post.property.floor === 0 ? 'Rez de Chaussée' : data.post.property.floor === 1 ? `${data.post.property.floor}er etage` : `${data.post.property.floor}eme etage`}</Td>
                                        </Tr>

                                    </Tbody>
                                </Table>
                            </TableContainer>

                        </Box>

                    </Box>

                    <Box px={2} py={4}>


                        <Box>
                            <Heading size={'md'} textAlign={'center'}>Localisation</Heading>

                            <TableContainer my={4} rounded={'md'}>
                                <Table colorScheme='blue' variant={''}>
                                    <TableCaption>
                                        <Text color={'black'} fontWeight={'bold'}>Informations sur localisation</Text>
                                    </TableCaption>
                                    <Thead bg={'blue.400'} color={'white'}>
                                        <Tr>
                                            <Th>Wilaya</Th>
                                            <Th>Commune</Th>
                                            <Th>Addresse</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        <Tr>
                                            <Td fontWeight={'bold'} >{data.post.property.wilaya}</Td>
                                            <Td fontWeight={'bold'} >
                                                {data.post.property.city}
                                            </Td>
                                            <Td fontWeight={'bold'}>{data.post.property.address}</Td>

                                        </Tr>

                                    </Tbody>
                                </Table>
                            </TableContainer>

                            <Box w={'100%'} h={400}>
                                <SinglePostMap width={'100%'} height={'100%'} property_postion={[data.post.property.attitude, data.post.property.longitude]} />
                            </Box>
                            <Button colorScheme='blue' my={2} size={'lg'} w={'full'} leftIcon={<FaMap />}>Itinéraire</Button>
                        </Box>


                        <Box px={2} py={3} width={'100%'} mt={3}>

                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Avatar pos={'relative'} _before={data.post.user.isOnline ? { width: 3, h: 3, content: '""', position: "absolute", bg: "green.400", bottom: 0, right: 1, rounded: 'full', border: '2px solid white' } : null} size={{ base: 'lg', md: 'xl' }} src={data.post.user.avatar?.display_url || null} name={data.post.user.full_name} />
                                <Text fontSize={'22px'} fontWeight={'bold'}>{data.post.user.full_name}</Text>
                            </Box>
                            <Box flexWrap={'wrap'} w={'full'} bg={'white'} py={2} my={2} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
                                <Box display={'flex'} alignItems={'center'} px={2} py={3} rounded={'md'} bg={'#d1d1d1'} gap={2}>
                                    <MdEmail />
                                    <Text color={'GrayText'} fontSize={'14px'} fontWeight={'bold'}>{data.post.user.email}</Text>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} px={2} py={3} rounded={'md'} bg={'#d1d1d1'} gap={2}>
                                    <MdPhone />
                                    <Text color={'GrayText'} fontSize={'14px'} fontWeight={'bold'}>{data.post.user.phone}</Text>
                                </Box>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} px={3} py={2}>
                                <Button colorScheme='blue' leftIcon={<MdChatBubble />}>Contacter</Button>
                                <Button colorScheme='green' leftIcon={<MdPhone />}>Appeler</Button>
                                <Button colorScheme='orange' leftIcon={<MdStar />}>Ajouter Favouris</Button>

                            </Box>

                        </Box>

                    </Box>
                </Box>
                ) : <Box width={'100%'} h={'100vh'}><Loader /></Box>
            }
        </Layout>
    )
}

export default PostPage







