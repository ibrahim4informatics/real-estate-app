import React, { useContext } from 'react'
import Layout from './_Layout'
import { Avatar, Badge, Box, Button, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Carrousel from '../components/Carrousel'
import Map from '../components/Map'
import { FaMap } from 'react-icons/fa'
import { MdChatBubble, MdEmail, MdPhone, MdStar } from 'react-icons/md'
import { useParams } from 'react-router-dom'



const post = {
    "id": "688889a5-f90e-4578-b5fd-6f4fb8379033",
    "title": "Oran Big House For Sold",
    "description": "<b>This is Awesome</b><br/><p> est une luxe maison<p>",
    "user_id": "74ebfcae-9b6c-4512-9218-37b4b8700535",
    "created_at": "2024-08-31T15:51:00.018Z",
    "saved_by": [],
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
        "status": "SOLD",
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
    },
    "user": {
        "id": "74ebfcae-9b6c-4512-9218-37b4b8700535",
        "email": "khalilbenyahia2@gmail.com",
        "password": "$2b$12$QFql9Uh2D5y8S.TInIDYpuSOEsKob/mMDe/eZ0C5Sp/6WHpl4b3qS",
        "full_name": "Ibrahim Elkhalil benyahia",
        "phone": "+213792017322",
        "isSeller": true,
        "isOnline": true,
        "created_at": "2024-08-31T15:50:03.806Z",
        "avatar": { display_url: 'https://burst.shopifycdn.com/photos/stylish-man-in-bow-tie.jpg?width=1000&format=pjpg&exif=0&iptc=0' }
    }

}

const PostPage = () => {

    const { id } = useParams()

    return (
        <Layout navbar={true} footer={true}>



            <Box width={'full'} bg={'white'} display={{ base: 'block', lg: 'flex' }} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                <Box py={{ base: 4, lg: 0 }} px={{ base: 2, lg: 0 }}>
                    <Heading>
                        {post.title}
                        <Badge ml={2} colorScheme={post.property.status === 'FOR_SALE' || post.property.status === 'FOR_SALE' ? 'green' : 'red'}>
                            {post.property.status === 'FOR_SALE' ? 'Avendre' : post.property.status === 'FOR_RENT' ? 'Alouer' : post.property.status === 'SOLD' ? 'Vendu' : 'Loue'}
                        </Badge>
                    </Heading>
                    <Badge fontSize={'xl'} py={1} rounded={'md'} px={4} my={2} colorScheme='green'>Prix: {post.property.price}</Badge>
                    <Box marginInline={{ base: 'auto', lg: 0 }} w={"100%"} maxW={650} my={4}>
                        <Carrousel slides={post.property.media} />
                    </Box>
                    <Box w={"100%"} dangerouslySetInnerHTML={{ __html: post.description }}></Box>

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
                                        <Td isNumeric>2</Td>
                                        <Td isNumeric>5</Td>
                                        <Td isNumeric>4</Td>
                                        <Td isNumeric>1</Td>
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
                                        <Td fontWeight={'bold'} color={post.property.status === 'FOR_SALE' || post.property.status === 'FOR_SALE' ? 'green' : 'red'}>{post.property.status === 'FOR_SALE' ? 'Avendre' : post.property.status === 'FOR_RENT' ? 'Alouer' : post.property.status === 'SOLD' ? 'Vendu' : 'Loue'}</Td>
                                        <Td >
                                            {post.property.type === 'APARTMENT' ? 'Appartement' : post.property.type === 'VILLA' ? 'Villa' : post.property.type === 'HOUSE' ? 'Grande Maison' : post.property.type === 'OFFICE' ? 'Bureau' : post.property.type === 'STUDIO' ? 'Studio' : post.property.type === 'GARAGE' ? 'Garage' : 'Autres'}
                                        </Td>
                                        <Td fontWeight={'bold'}>{post.property.surface} m<sup>2</sup></Td>
                                        <Td>{post.property.floor === 0 ? 'Rez de Chaussée' : post.property.floor === 1 ? `${post.property.floor}er etage` : `${post.property.floor}eme etage`}</Td>
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
                                        <Td fontWeight={'bold'} >{post.property.wilaya}</Td>
                                        <Td fontWeight={'bold'} >
                                            {post.property.city}
                                        </Td>
                                        <Td fontWeight={'bold'}>{post.property.address}</Td>

                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>

                        <Box w={'100%'} h={400}>
                            <Map width={'100%'} height={'100%'} zoom={15} center={[post.property.attitude, post.property.longitude]} properties_locations={[{ lat: post.property.attitude, long: post.property.longitude, id: 1 }]} />
                        </Box>
                        <Button colorScheme='blue' my={2} size={'lg'} w={'full'} leftIcon={<FaMap />}>Itinéraire</Button>
                    </Box>


                    <Box px={2} py={3} width={'100%'} mt={3}>

                        <Box display={'flex'} alignItems={'center'} gap={2}>
                            <Avatar pos={'relative'} _before={post.user.isOnline ? { width: 3, h: 3, content: '""', position: "absolute", bg: "green.400", bottom: 0, right: 1, rounded: 'full', border: '2px solid white' } : null} size={{ base: 'lg', md: 'xl' }} src={post.user.avatar?.display_url || null} name={post.user.full_name} />
                            <Text fontSize={'22px'} fontWeight={'bold'}>{post.user.full_name}</Text>
                        </Box>
                        <Box flexWrap={'wrap'} w={'full'} bg={'white'} py={2} my={2} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
                            <Box display={'flex'} alignItems={'center'} px={2} py={3} rounded={'md'} bg={'#d1d1d1'} gap={2}>
                                <MdEmail />
                                <Text color={'GrayText'} fontSize={'14px'} fontWeight={'bold'}>{post.user.email}</Text>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} px={2} py={3} rounded={'md'} bg={'#d1d1d1'} gap={2}>
                                <MdPhone />
                                <Text color={'GrayText'} fontSize={'14px'} fontWeight={'bold'}>{post.user.phone}</Text>
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

        </Layout>
    )
}

export default PostPage







