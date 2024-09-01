import { Box, Heading, IconButton, Tabs, TabList, TabPanel, TabPanels, Tab, FormControl, FormLabel, InputGroup, Input, InputLeftElement, InputRightElement, Button, Link, Text, Checkbox } from '@chakra-ui/react'
import React, { useState, forwardRef } from 'react'
import { IoMdClose, IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { MdEmail, MdLock } from 'react-icons/md';

const SignIn = forwardRef(({ setShowSignIn }, ref) => {

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginDataErrors, setLoginDataErrors] = useState({ email: "", password: "" });
    const hundleLoginInputChange = (e) => {
        setLoginDataErrors(prev => ({ ...prev, [e.target.name]: "" }));
        setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const hundleLogin = (e) => {

        e.preventDefault();
        console.log(loginData)


    }

    const [registerData, setRegisterData] = useState({ email: "", password: "", full_name: "", confirm: "", phone: "", isSeller: false });
    const [registerDataErrors, setRegisterDataErrors] = useState({ email: "", password: "", full_name: "", confirm: "", phone: "", isSeller: false });
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const hundleRegisterInputChange = (e) => {

        setRegisterDataErrors(prev => ({ ...prev, [e.target.name]: "" }));
        if (e.target.name === "isSeller") {
            setRegisterData({ ...registerData, [e.target.name]: e.target.checked });
        }
        else {
            setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const hundleRegister = (e) => {
        e.preventDefault();
        console.log(registerData)
    }

    return (
        <Box zIndex={12} scale={0} ref={ref}  borderRadius={{base:0,md:"12px"}} boxShadow={'0 0 8px rgba(0,0,0,0.65)'} pos={'fixed'} top={{ base: 0, md: "70px" }}  left={{ base: 0, md: "unset" }} right={{base:'unset', md:2}} h={{ base: "100vh", md: 'auto' }} w={{ base: "100%", md: 400 }} bg={'rgba(252,252,252,.75)'} backdropFilter={'blur(12px)'} >
            <Box w={'100%'} py={2} px={1} display={'flex'} justifyContent={'end'}>
                <IconButton  onClick={() => setShowSignIn(false)} size={'lg'} variant={'ghost'} icon={<IoMdClose fontSize={30} />} />
            </Box>

            <Heading size={'lg'} textAlign={'center'} fontWeight={'bolder'} my={4}>Welcome To Emlak!</Heading>

            <Box w={'100%'} display={'flex'} justifyContent={'center'} my={1}>

                <Tabs w={{ base: "80%", md: "100%" }} defaultIndex={0}>
                    <TabList>
                        <Tab>Connecter</Tab>
                        <Tab>Nouveaux Compte</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <form onSubmit={hundleLogin} action="">

                                <FormControl isRequired isInvalid={loginDataErrors.email ? true : false}>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup borderColor={'GrayText'}>
                                        <Input value={loginData.email} name='email' type='email' onChange={hundleLoginInputChange} />
                                        <InputLeftElement><MdEmail /></InputLeftElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={2} isRequired isInvalid={loginDataErrors.password ? true : false}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup borderColor={'GrayText'}>
                                        <Input value={loginData.password} name='password' type={showLoginPassword ? 'text' : 'password'} onChange={hundleLoginInputChange} />
                                        <InputLeftElement><MdLock /></InputLeftElement>
                                        <InputRightElement><IconButton bg={'transparent'} onClick={() => setShowLoginPassword(prev => !prev)} icon={showLoginPassword ? <IoMdEyeOff /> : <IoMdEye />} value={'solid'} _hover={{ bg: 'transparent' }} /> </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Button variant={'solid'} w={'full'} colorScheme={'blue'} mt={4} type='submit'>Connexion</Button>
                                <Link href='#oublier' ><Text w={'full'} color={'blue.600'} mt={4} textAlign={'center'} fontSize={18} fontWeight={'bold'}>mot de passe oublié</Text></Link>



                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={hundleRegister} action="">

                                <FormControl isRequired isInvalid={registerDataErrors.email ? true : false}>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup borderColor={'GrayText'}>
                                        <Input value={registerData.email} name='email' type='email' onChange={hundleRegisterInputChange} />
                                        <InputLeftElement><MdEmail /></InputLeftElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={2} isRequired isInvalid={registerDataErrors.password ? true : false}>
                                    <FormLabel>Mots de Passe</FormLabel>
                                    <InputGroup borderColor={'GrayText'}>
                                        <Input value={registerData.password} name='password' type={showRegisterPassword ? 'text' : 'password'} onChange={hundleRegisterInputChange} />
                                        <InputLeftElement><MdLock /></InputLeftElement>
                                        <InputRightElement><IconButton bg={'transparent'} onClick={() => setShowRegisterPassword(prev => !prev)} icon={showRegisterPassword ? <IoMdEyeOff /> : <IoMdEye />} value={'solid'} _hover={{ bg: 'transparent' }} /> </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={2} isRequired isInvalid={registerDataErrors.confirm ? true : false}>
                                    <FormLabel>Confirmer Mots de passe</FormLabel>
                                    <InputGroup borderColor={'GrayText'}>
                                        <Input value={registerData.confirm} name='confirm' type={showRegisterPassword ? 'text' : 'password'} onChange={hundleRegisterInputChange} />
                                        <InputLeftElement><MdLock /></InputLeftElement>
                                        <InputRightElement><IconButton bg={'transparent'} onClick={() => setShowRegisterPassword(prev => !prev)} icon={showRegisterPassword ? <IoMdEyeOff /> : <IoMdEye />} value={'solid'} _hover={{ bg: 'transparent' }} /> </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={2} isRequired isInvalid={registerDataErrors.full_name ? true : false}>
                                    <FormLabel>Le Nom Complet</FormLabel>
                                    <Input borderColor={'GrayText'} value={registerData.full_name} name='full_name' type={'text'} onChange={hundleRegisterInputChange} />
                                </FormControl>
                                <FormControl mt={2} isRequired isInvalid={registerDataErrors.phone ? true : false}>
                                    <FormLabel>Tel</FormLabel>
                                    <Input borderColor={'GrayText'} value={registerData.phone} name='phone' type={'tel'} onChange={hundleRegisterInputChange} />
                                </FormControl>
                                <Checkbox name='isSeller' onChange={hundleRegisterInputChange} isChecked={registerData.isSeller} w={'100%'} p={2} borderRadius={4} border={'solid 1px rgba(0,0,0,0.4)'} fontWeight={'bold'} my={2} colorScheme='blue'>veux-tu être vendeur</Checkbox>
                                <Button variant={'solid'} w={'full'} colorScheme={'blue'} mt={4} type='submit'>Créer</Button>

                            </form>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

        </Box>
    )
})

export default SignIn


