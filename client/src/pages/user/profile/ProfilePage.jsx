import React, { useEffect } from 'react'
import Layout from '../../_Layout'
import { Avatar, Box, Button, Heading, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { IoIosArrowForward, IoIosMegaphone, IoIosMore, IoIosStar } from 'react-icons/io'
import Post from '../../../components/Post'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { MdEmail, MdPhone } from 'react-icons/md'




const ProfilePage = () => {

    const { user, isLoading, isLogin } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isLogin) return navigate('/')
        console.log(user)
    }, [isLoading])
    return (
        isLoading ? (<Box w={'100%'} h={'100vh'}><Loader /></Box>) : (<Layout navbar={true} home_navbar={false} footer={true} >
            <Box minH={'auto'} width={'100%'} bgGradient={'linear(to-r, #62cff4, #2c67f2)'}>
                <Box w={'100%'} h={{ base: "120px", md: '200px' }} bg={'transparent'}></Box>
                <Box borderTopRadius={12} w={'100%'} bg={'white'}>
                    <Avatar
                        src={user.avatar?.display_url || null} pos={'relative'} top={{ base: -6, md: -12 }}
                        left={{ base: "50%", md: 20 }} transform={{ base: 'translate(-50%,0)', md: null }} border={'solid 4px white'} size={{ base: "xl", md: '2xl' }}
                    />
                    <Box p={4}>
                        <Heading textAlign={'center'} size={'md'}>{user.full_name}</Heading>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'}>
                            <Box my={2} display={'flex'} alignItems={'center'}>
                                <Text px={3} color={'GrayText'} borderRight={'solid 1px rgba(0,0,0,0.35)'} fontWeight={'bold'}><MdEmail /></Text>
                                <Text color={'black'} fontWeight={'bold'} px={2}>{user.email}</Text>
                            </Box>

                            <Box my={2} display={'flex'} alignItems={'center'}>
                                <Text px={3} color={'GrayText'} borderRight={'solid 1px rgba(0,0,0,0.35)'} fontWeight={'bold'}><MdPhone /></Text>
                                <Text color={'black'} fontWeight={'bold'} px={2}>{user.phone}</Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} display={'flex'} alignItems={'center'} gap={2} justifyContent={'center'} my={3}>
                            <Button colorScheme='blue' size={'sm'}>{user.isSeller ? "Devenir Client" : "Devenire Vendeur"}</Button>
                            <Menu>
                                <MenuButton size={'sm'} as={Button} bg={'#C3C3C3'} leftIcon={<IoIosMore />} >More</MenuButton>
                                <MenuList zIndex={200} border={'solid 1px rgba(0,0,0,0.4)'}>

                                    <MenuItem as={Link} href={'/profile/messages'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box flex={1}>Mes Annonces</Box>
                                        <IoIosArrowForward />
                                    </MenuItem>
                                    <MenuItem as={Link} href={'/profile/messages'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box flex={1}>Conversations</Box>
                                        <IoIosArrowForward />
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem as={Link} href={'/profile/edit'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box flex={1}>Modefier Profile</Box>
                                        <IoIosArrowForward />
                                    </MenuItem>
                                    <MenuItem as={Link} href={'/change-email'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box flex={1}>Changer Email </Box>
                                        <IoIosArrowForward />
                                    </MenuItem>
                                    <MenuItem as={Link} href={'/change-password'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box flex={1}>Changer Mots de Passe</Box>
                                        <IoIosArrowForward />
                                    </MenuItem>
                                    <MenuItem as={Button} href={'/profile/messages'} display={'flex'} alignItems={'center'} gap={1} color={'black'}>
                                        <Box color={'red'} flex={1}>Suprimer Le Compte</Box>
                                        <IoIosArrowForward />
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Box>

                        <Box w={'90%'} maxW={900} mx={'auto'} my={4} p={5}>
                            <Box display={'flex'} alignItems={'center'}>
                                <IoIosStar fontSize={'30px'} color='#e1ad01' />
                                <Heading as={'h3'} size={'md'} ml={2}>Favouris</Heading>
                            </Box>

                            <Box bg={'white'} display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
                                {user.saved_posts.length > 0 ? (user.saved_posts.map(post => <Post key={post.id} id={post.id} title={post.title} description={post.description} media={post.property.media} price={post.property.price} status={post.property.status} surface={post.property.surface} isFavourite={true} />)) : <Text color={'GrayText'} mt={2} ml={4}>Pas D'annonces Favouris</Text>}
                            </Box>
                        </Box>
                        {user.isSeller && (<Box mb={4} w={'90%'} maxW={900} mx={'auto'} my={4} p={5}>
                            <Box display={'flex'} alignItems={'center'}>
                                <IoIosMegaphone fontSize={'30px'} color='#e1ad01' />
                                <Heading as={'h3'} size={'md'} ml={2}>Mes Annonces</Heading>
                            </Box>
                            <Box bg={'white'} display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
                        
                                {user.posts.length > 0 ? (user.posts.map(post => <Post key={post.id} id={post.id} title={post.title} description={post.description} media={post.property.media} price={post.property.price} status={post.property.status} surface={post.property.surface} isOwn={true} />)) : <Text color={'GrayText'} mt={2} ml={4}>Pas D'annonces Publier</Text>}
                            </Box>
                        </Box>)}
                    </Box>
                </Box>

            </Box>

        </Layout >)
    )
}

export default ProfilePage