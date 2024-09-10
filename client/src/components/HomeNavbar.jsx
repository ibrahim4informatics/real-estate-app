import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { BiSupport, BiUserCircle } from 'react-icons/bi';
import { IoChatbubble, IoHome, IoLogIn, IoLogOut, IoMegaphone, IoMenu, IoNotifications, IoStar } from 'react-icons/io5';
import { FaInfoCircle, FaKey, FaTag } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
const Navbar = ({ setShowSignIn, isLogin, isSeller }) => {
    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(() => {
        const scrollHundler = () => {
            if (window.scrollY > 10) {
                setIsTransparent(false)
            }

            else {
                setIsTransparent(true);
            }
        }

        window.addEventListener('scroll', scrollHundler)
        return () => window.removeEventListener('scroll', scrollHundler)
    }, []);
    return (
        <Box borderBottom={{ base: !isTransparent ? 'solid 1px rgba(0,0,0,0.35)' : '' }} zIndex={4} pos={'fixed'} top={0} left={0} w={"100%"} py={4} px={4} display={'flex'} alignItems={'center'} bg={{ base: isTransparent ? "transparent" : "white", md: "white" }}>
            <Box >
                <Heading color={{ base: isTransparent ? "white" : "black", md: 'blue.600' }} fontSize={20}>EMLAK</Heading>
            </Box>
            <Box ms={'auto'} me={isLogin ? 0 : 'auto'} display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
            <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoHome /><Text ml={1}>Home</Text></Link >
                <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoMegaphone /><Text ml={1}>Annonces</Text></Link >
                <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/annonces?status=FOR_SALE' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><FaTag /><Text ml={1}>Avendre</Text></Link >
                <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/annonces?status=FOR_RENT' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><FaKey /><Text ml={1}>Allouer</Text></Link >
                <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/about' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <FaInfoCircle /> <Text ml={1}>Apropos</Text></Link >
                <Link display={'flex'} alignItems={'center'} gap={1} mx={3} href='/contact' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><BiSupport /><Text ml={1}>Contacter nous</Text></Link>
                {isLogin ? (
                   
                    
                        <Menu>
                            <MenuButton as={IconButton} bg={'transparent !important'} mx={2} color={'black'} fontSize={'30px'} fontWeight={'bold'} size={'md'} variant={'ghost'} icon={<IoIosMore />} />
                            <MenuList border={'1px solid rgba(0,0,0,.45)'}>
                                <MenuItem as={Link} href='/profile' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <BiUserCircle /><Text ml={1}>Profile</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoStar /><Text ml={1}>Favouris</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoNotifications /><Text ml={1}>Notification</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoChatbubble /><Text ml={1}>Messages</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoLogOut /><Text ml={1}>Deconnexion</Text></MenuItem >
                            </MenuList>
                        </Menu>

                   
                ) : null}

            </Box>



            <Box display={{ base: "none", md: isLogin ? 'none' : 'flex' }} alignItems={'center'}>
                <Button color={'blue.600'} mx={2} variant={'link'} onClick={() => { setShowSignIn(true) }}>Sign-In</Button>
            </Box>

            <Box alignItems={'center'} ms={'auto'} display={{ base: 'flex', md: 'none' }} gap={2}>

                <IconButton display={isLogin ? 'none' : 'block'} color={isTransparent ? "white" : "black"} size={'lg'} bg={'transparent !important'} variant={'ghost'} icon={<IoLogIn fontSize={'30px'} />} onClick={() => { setShowSignIn(true) }} />

                <Menu>
                    <MenuButton as={IconButton} bg={'transparent !important'} color={isTransparent ? 'white' : 'black'} fontSize={'30px'} fontWeight={'bold'} size={'md'} variant={'ghost'} icon={<IoMenu fontSize={30} />} />
                    <MenuList border={'1px solid rgba(0,0,0,.45)'}>
                        <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoMegaphone /><Text ml={1}>Annonces</Text></MenuItem >
                        <MenuItem as={Link} href='/annonces?status=FOR_SALE' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><FaTag /><Text ml={1}>Avendre</Text></MenuItem >
                        <MenuItem as={Link} href='/annonces?status=FOR_RENT' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><FaKey /><Text ml={1}>Allouer</Text></MenuItem >
                        <MenuItem as={Link} href='/about' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <FaInfoCircle /> <Text ml={1}>Apropos</Text></MenuItem >
                        <MenuItem as={Link} href='/contact' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}><BiSupport /><Text ml={1}>Contacter nous</Text></MenuItem>
                        {isLogin ? (
                            <>
                                <MenuItem as={Link} href='/profile' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <BiUserCircle /><Text ml={1}>Profile</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoStar /><Text ml={1}>Favouris</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoNotifications /><Text ml={1}>Notification</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoChatbubble /><Text ml={1}>Messages</Text></MenuItem >
                                <MenuItem as={Link} href='/annonces' transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'}> <IoLogOut /><Text ml={1}>Deconnexion</Text></MenuItem >

                            </>
                        ) : null}
                    </MenuList>
                </Menu>

            </Box>

        </Box>
    )
}

export default Navbar