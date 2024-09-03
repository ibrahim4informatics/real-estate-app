import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, IconButton, Link } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
const Navbar = ({ setShowSignIn }) => {
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
    }, [])
    return (
        <Box borderBottom={{base: !isTransparent? 'solid 1px rgba(0,0,0,0.35)' : ''}} zIndex={4} pos={'fixed'} top={0} left={0} w={"100%"} py={4} px={4} display={'flex'} alignItems={'center'} bg={{ base: isTransparent ? "transparent" : "white", md: "white" }}>
            <Box display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
                <Link transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'} mx={2}>Acheter</Link>
                <Link transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'} mx={2}>Allouer</Link>
                <Link transition={'300ms'} _hover={{ color: "black" }} color={'GrayText'} fontSize={16} fontWeight={'bold'} mx={2}>Devenir Vendeur</Link>
            </Box>
            <IconButton color={isTransparent ? "white" : "black"} display={{ base: 'block', md: "none" }} variant={'ghost'} size={'lg'} bg={'transparent !important'} icon={<MdMenu fontSize={20} />} />
            <Box ms={'auto'} me={'auto'}>
                <Heading color={{ base: isTransparent ? "white" : "black", md: 'blue.600' }} fontSize={20}>EMLAK</Heading>
            </Box>
            <Box display={{ base: "none", md: 'flex' }} alignItems={'center'}>
                <Button color={'blue.600'} mx={2} variant={'link'} onClick={() => { setShowSignIn(true) }}>Sign-In</Button>
            </Box>
            <IconButton color={isTransparent ? "white" : "black"} size={'lg'} bg={'transparent !important'} display={{ base: 'block', md: 'none' }} mx={2} variant={'ghost'} icon={<BiUserCircle fontSize={30} />} onClick={() => { setShowSignIn(true) }} />
        </Box>
    )
}

export default Navbar