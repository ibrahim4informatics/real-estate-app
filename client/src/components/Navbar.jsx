import React, { useContext } from 'react'
import { Box, Button, Container, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { MdArrowBackIos, MdHome, MdKey } from 'react-icons/md'
import { IoIosMenu } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa';
import { ShowSignInContext } from '../pages/_Layout'

const Navbar = () => {
    const { _showSignIn, setShowSignIn } = useContext(ShowSignInContext);
    const navigate = useNavigate();
    return (
        <Box width={'100%'} borderBottom={'solid 1px rgba(0,0,0,0.35)'} py={3} px={2} pos={'sticky'} left={0} top={0} bg={'white'} zIndex={4}>
            <Container display={'flex'} alignItems={'center'} >

                <Button onClick={() => navigate(-1)} size={'md'} variant={'ghost'} leftIcon={<MdArrowBackIos />} colorScheme='black'>Retour</Button>
                <Heading ms={'auto'} me={'auto'} color={'blue.600'} size={'md'} as={'h1'}>EMLAK</Heading>
                <Menu>

                    <MenuButton as={IconButton} fontSize={'30px'} fontWeight={'bold'} size={'md'} variant={'ghost'} icon={<IoIosMenu />} />
                    <MenuList border={'1px solid rgba(0,0,0,.45)'}>
                        <MenuItem as={Link} to={'/'} display={'flex'} alignItems={'center'} gap={1} color={'black'} fontWeight={'bold'}>
                            <MdHome size={"20px"} />
                            <Text ml={2}>Home</Text>
                        </MenuItem>

                        <MenuItem as={Link} to={'/'} display={'flex'} alignItems={'center'} gap={1} color={'black'} fontWeight={'bold'}>
                            <FaListUl size={"20px"} />
                            <Text ml={2}>Annonces</Text>
                        </MenuItem>


                        <MenuItem as={Button} onClick={() => setShowSignIn(true)} variant={'ghost'} colorScheme='black' leftIcon={<MdKey />} fontWeight={'bold'}>

                            Connecter a Votre Compte
                        </MenuItem>


                    </MenuList>

                </Menu>

            </Container>
        </Box>
    )
}

export default Navbar