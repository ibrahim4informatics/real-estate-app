import React, { useContext, useState } from 'react';
import { Box, Button, Container, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import findHouseSvg from '../assets/images/find_house.svg'
import heroPic from '../assets/images/hero2.jpg';
import Layout, { ShowSignInContext } from './_Layout';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const HomePage = ({ }) => {
    const { isLoading, isLogin } = useAuth();
    const [searchKeywords, setSearchKeywords] = useState("");
    const { showSignIn, setShowSignIn } = useContext(ShowSignInContext)
    const navigate = useNavigate();
    return (
        <Layout home_navbar={true} footer={true} >

            {isLoading ? <Box w={'100%'} h={'100vh'}><Loader /></Box> : (<>
                <Box w={"100%"} h={{ base: 600, md: 550, lg: 500 }} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} backgroundPosition={'center'} backgroundImage={heroPic}>
                    <Box w={"100%"} h={"100%"} bg={'rgba(0,0,0,0.5)'}>
                        <Box bg={'transparent'} w={"100%"} h={40}></Box>
                        <Container>
                            <Heading ml={2} color={'whitesmoke'}>Bienvenue à Emlak</Heading>
                            <Text ml={4} mt={2} color={'whitesmoke'} fontWeight={'500'}>
                                Chez Emlak, nous vous offrons un large choix de biens immobiliers à louer ou à vendre, y compris des maisons, des appartements, des studios, et bien plus encore. Que vous cherchiez à acheter ou à louer, nous avons la solution parfaite pour vous. Parcourez nos annonces et trouvez votre prochain chez-vous en toute simplicité.
                            </Text>
                            <InputGroup size={'lg'} mt={4} >
                                <Input onChange={(e) => setSearchKeywords(e.target.value)} value={searchKeywords} bg={'white'} type='text' placeholder='tapez tout ce qui concerne ce que vous voulez...' />
                                <InputRightElement>
                                    <IconButton bg='white !important' onClick={() => navigate(searchKeywords.trim().length > 0 ? `/annonces?title=${searchKeywords}` : '/annonces')} color={'black'} icon={<MdSearch />} />
                                </InputRightElement>
                            </InputGroup>

                        </Container>
                    </Box>


                </Box>
                <Box mt={8} alignItems={'center'} justifyContent={{ base: 'center', md: 'start' }} flexWrap={'wrap'} py={4} w={'70%'} maxW={650} marginInline={'auto'} display={'flex'}>

                    <Box flex={1} py={2} >
                        <Heading flex={1} as='h2' size='md' mb={4}>Commencez et trouvez la meilleure maison pour vous</Heading>
                        <Text color={'GrayText'}>vous pouvez parcourir différents types de propriétés comme des appartements, des studios, des bureaux et plus encore </Text>
                        <Button variant={'solid'} colorScheme='blue' mt={2} mb={1} size={'lg'} onClick={() => isLogin ? navigate('/annonces') : setShowSignIn(true)}>{isLogin ? 'Voire Les Annonces' : "Commencer"}</Button>
                    </Box>
                    <Image w={300} src={findHouseSvg} />


                </Box>
                <Box borderTop={'solid 1px rgba(0,0,0,0.25)'} mt={4} py={2}>
                    <Heading size={'md'} as={'h3'} textAlign={'center'} my={3}>Pourquoi Emlak?</Heading>

                    <Box w={'100%'} mt={2} mb={4} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexWrap={'wrap'}>
                        <Box w={300} h={400} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} p={4} border={'solid 1px rgba(0,0,0,0.25)'} borderRadius={4}>
                            <Box color={'blue.600'} my={2} p={3} w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <MdLocationOn fontSize={50} />
                            </Box>
                            <Box>
                                <Heading as={'h4'} size={'md'} textAlign={'center'} my={2}>Localistion</Heading>
                                <Text my={4} color={'GrayText'} textAlign={'center'}>
                                    nous fournissons une carte intégrée pour voir la géolocalisation de la propriété que vous recherchez
                                </Text>
                            </Box>
                        </Box>
                        <Box w={300} h={400} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} p={4} border={'solid 1px rgba(0,0,0,0.25)'} borderRadius={4}>
                            <Box color={'blue.600'} my={2} p={3} w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <FaFilter fontSize={50} />
                            </Box>
                            <Box>
                                <Heading as={'h4'} size={'md'} textAlign={'center'} my={2}>Filtres</Heading>
                                <Text my={4} color={'GrayText'} textAlign={'center'}>
                                    vous pouvez filtrer en fonction de différents critères pour trouver la meilleure propriété qui correspond à vos besoins
                                </Text>
                            </Box>
                        </Box>
                        <Box w={300} h={400} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} p={4} border={'solid 1px rgba(0,0,0,0.25)'} borderRadius={4}>
                            <Box color={'blue.600'} my={2} p={3} w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <IoChatboxEllipsesOutline fontSize={50} />
                            </Box>
                            <Box>
                                <Heading as={'h4'} size={'md'} textAlign={'center'} my={2}>Messagerie</Heading>
                                <Text my={4} color={'GrayText'} textAlign={'center'}>
                                    nous proposons une messagerie locale si vous ne pouvez pas appeler par téléphone portable ou si vous souhaitez entrer rapidement en contact
                                </Text>
                            </Box>
                        </Box>

                    </Box>

                </Box>

                <ScrollRestoration /></>)}
        </Layout>

    )
}

export default HomePage