import React, { useState } from 'react'
import Layout from './_Layout'
import { Box, Button, Menu, MenuButton, MenuItem, Heading, IconButton, Input, InputGroup, InputRightElement, Select, Text, MenuList } from '@chakra-ui/react'
import { MdArrowBack, MdArrowDownward, MdArrowDropDown, MdSearch } from 'react-icons/md'
import RoomsFilter from '../components/RoomsFilter'


const SearchPage = () => {
    const [showRoomsFilter, setShowRoomsFilter] = useState(false)
    return (
        <Layout>

            <Box width={'100%'} py={2} px={1} display={'flex'} rowGap={2} columnGap={1} alignItems={'center'} flexWrap={'wrap'} >
                <Button leftIcon={<MdArrowBack />}>Home</Button>
                <InputGroup maxW={350} w={"100%"} ml={2}>
                    <Input placeholder='tapez tout ce qui concerne ce que vous voulez...' name='search' />
                    <InputRightElement>
                        <IconButton icon={<MdSearch />} bg={'transparent !important'} />
                    </InputRightElement>
                </InputGroup>

                <Input name='wilaya' placeholder='Wilaya' w={100} />
                <Input name='city' placeholder='Commune' w={130} />
                <Input name='floor' placeholder='Etage' type='number' w={"80px"} />

                <Select placeholder='type' maxW={150}>
                    <option value="APARTMENT">Appartement</option>
                    <option value="VILLA">Villa</option>
                    <option value="HOUSE">Grande Maison</option>
                    <option value="OFFICE">Bureaux</option>
                    <option value="STUDIO">Studio</option>
                    <option value="GARAGE">Garages</option>
                    <option value="OTHER">Autres</option>
                </Select>

                <Select placeholder='status' maxW={150}>
                    <option value="FOR_RENT">Allouer</option>
                    <option value="FOR_SALE">Avendre</option>
                    <option value="SOLD">Vendu</option>
                    <option value="RENTED">Loué</option>
                </Select>


                <Menu>
                    <MenuButton as={Button} rightIcon={<MdArrowDropDown />} >Surface</MenuButton>
                    <MenuList p={4}>

                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input type='number' flex={1} />
                        </Box>

                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>max:</Text>
                            <Input flex={1} type='number' />
                        </Box>

                        <MenuItem bg={'transparent !important'}>
                            <Button w={'full'} colorScheme='blue'>OK</Button>
                        </MenuItem>

                    </MenuList>
                </Menu>



                <Menu>
                    <MenuButton as={Button} rightIcon={<MdArrowDropDown />} >Prix</MenuButton>
                    <MenuList p={4}>

                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input type='number' flex={1} />
                        </Box>

                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>max:</Text>
                            <Input flex={1} type='number' />
                        </Box>

                        <MenuItem bg={'transparent !important'}>
                            <Button w={'full'} colorScheme='blue'>OK</Button>
                        </MenuItem>

                    </MenuList>
                </Menu>


                <Menu>
                    <MenuButton as={Button} rightIcon={<MdArrowDropDown />} >Rooms</MenuButton>
                    <MenuList p={4}>

                        <Box>
                            <Heading size={'md'}>Salons</Heading>
                            <Box display={'flex'} alignItems={'center'} my={2}>
                                <Text mx={2}>min:</Text>
                                <Input type='number' flex={1} />
                            </Box>
                        </Box>

                        <Box>
                            <Heading size={'md'}>Chambres</Heading>
                            <Box display={'flex'} alignItems={'center'} my={2}>
                                <Text mx={2}>min:</Text>
                                <Input type='number' flex={1} />
                            </Box>
                        </Box>


                        <Box>
                            <Heading size={'md'}>Sanitaires</Heading>
                            <Box display={'flex'} alignItems={'center'} my={2}>
                                <Text mx={2}>min:</Text>
                                <Input type='number' flex={1} />
                            </Box>
                        </Box>

                        <Box>
                            <Heading size={'md'}>Garages</Heading>
                            <Box display={'flex'} alignItems={'center'} my={2}>
                                <Text mx={2}>min:</Text>
                                <Input type='number' flex={1} />
                            </Box>
                        </Box>
                        <MenuItem bg={'transparent !important'}>
                            <Button w={'full'} colorScheme='blue'>OK</Button>
                        </MenuItem>

                    </MenuList>
                </Menu>

                <Button flex={1} colorScheme='blue'>Filtrer</Button>




            </Box>
        </Layout>
    )
}

export default SearchPage