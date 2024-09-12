import React, { useContext } from 'react'
import { Box, Button, Container, Heading, IconButton, Menu,Link, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { MdArrowBackIos, MdKey } from 'react-icons/md'
import { IoIosMenu } from 'react-icons/io'
import {  useNavigate } from 'react-router-dom'
import { ShowSignInContext } from '../pages/_Layout'
import { BiHome, BiPlus, BiUserCircle } from 'react-icons/bi'
import { IoChatbubble, IoLogOut, IoMegaphone, IoNotifications, IoStar } from 'react-icons/io5'


const Navbar = ({ isLogin, isSeller }) => {
    const { _showSignIn, setShowSignIn } = useContext(ShowSignInContext);
    const navigate = useNavigate();
    return (
        <Box width={'100%'} borderBottom={'solid 1px rgba(0,0,0,0.35)'} py={3} px={2} pos={'sticky'} left={0} top={0} bg={'white'} zIndex={20}>
            <Container display={'flex'} alignItems={'center'} >

                <Button onClick={() => navigate(-1)} size={'md'} variant={'ghost'} leftIcon={<MdArrowBackIos />} colorScheme='black'>Retour</Button>
                <Heading ms={'auto'} me={'auto'} color={'blue.600'} size={'md'} as={'h1'}>EMLAK</Heading>
                <Menu>

                    <MenuButton as={IconButton} fontSize={'30px'} fontWeight={'bold'} size={'md'} variant={'ghost'} icon={<IoIosMenu />} />
                    <MenuList border={'1px solid rgba(0,0,0,.45)'}>
                        <MenuItem as={Link} href='/' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <BiHome /><Text ml={1}>Acceille</Text></MenuItem >

                        <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoMegaphone /><Text ml={1}>Voire toutes les annonces</Text></MenuItem >


                        {!isLogin &&
                            <MenuItem as={Button} onClick={() => setShowSignIn(true)} variant={'ghost'} colorScheme='black' leftIcon={<MdKey />} fontWeight={'bold'}>
                                Connecter a Votre Compte
                            </MenuItem>
                        }

                        {isSeller && (
                            <>
                                <MenuDivider />

                                <MenuItem as={Link} href='/ajouter' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <BiPlus /><Text ml={1}>Ajouter une propriété</Text></MenuItem >
                                <MenuItem as={Link} href='/user/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoMegaphone /><Text ml={1}>Vos Annonces</Text></MenuItem >

                                <MenuDivider />
                            </>
                        )}


                        {isLogin && (
                            <>

                                <MenuItem as={Link} href='/profile' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <BiUserCircle /><Text ml={1}>Profile</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoStar /><Text ml={1}>Favouris</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoNotifications /><Text ml={1}>Notification</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoChatbubble /><Text ml={1}>Messages</Text></MenuItem >
                                <MenuItem as={Link} href='/log-out' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoLogOut /><Text ml={1}>Deconnexion</Text></MenuItem >

                            </>
                        )}





                    </MenuList>

                </Menu>

            </Container>
        </Box>
    )
}

export default Navbar