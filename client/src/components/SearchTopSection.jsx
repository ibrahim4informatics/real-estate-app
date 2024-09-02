import React from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, Heading, IconButton, Input, InputGroup, InputRightElement, Select, Text, MenuList, filter } from '@chakra-ui/react'
import { MdArrowBack, MdArrowDropDown, MdSearch } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const SearchTopSection = ({ refContainer, setFilters, filters }) => {

    const [seaarchParams, setSearchParams] = useSearchParams();

    const hundleFilterFieldsChange = (e) => {
        if (e.target.type === 'number') {

            if (e.target.name === 'min_price' || e.target.name === 'max_price' || e.target.name === 'min_surface' || e.target.name === 'max_surface') {
                setFilters(prev => ({ ...prev, [e.target.name]: Number.parseFloat(e.target.value) }))
            }

            else {
                setFilters(prev => ({ ...prev, [e.target.name]: Number.parseInt(e.target.value) }));
            }

        }

        else {
            setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }


    const hundleFilterSubmit = () => {
        const keys = Object.keys(filters);
        keys.forEach(key => {
            if (filters[key] === '') {
                delete filters[key];
            }
        });
        setSearchParams(filters);
    }
    return (
        <Box ref={refContainer} width={'100%'} py={2} px={1} display={'flex'} rowGap={2} columnGap={1} alignItems={'center'} flexWrap={'wrap'} >
            <Button leftIcon={<MdArrowBack />}>Accueil</Button>
            <InputGroup borderColor={'GrayText'} maxW={350} w={"100%"} ml={2}>
                <Input onChange={hundleFilterFieldsChange} placeholder='tapez tout ce qui concerne ce que vous voulez...' name='title' />
                <InputRightElement>
                    <IconButton icon={<MdSearch />} bg={'transparent !important'} />
                </InputRightElement>
            </InputGroup>

            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='wilaya' placeholder='Wilaya' w={100} />
            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='city' placeholder='Commune' w={130} />
            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='floor' placeholder='Etage' type='number' w={"80px"} />

            <Select borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='type' placeholder='type' maxW={150}>
                <option value="APARTMENT">Appartement</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">Grande Maison</option>
                <option value="OFFICE">Bureaux</option>
                <option value="STUDIO">Studio</option>
                <option value="GARAGE">Garages</option>
                <option value="OTHER">Autres</option>
            </Select>


            <Select borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='status' placeholder='status' maxW={150}>
                <option value="FOR_RENT">Allouer</option>
                <option value="FOR_SALE">Avendre</option>
                <option value="SOLD">Vendu</option>
                <option value="RENTED">Loué</option>
            </Select>


            <Menu>
                <MenuButton border={'solid 1px GrayText'} as={Button} rightIcon={<MdArrowDropDown />} >Surface</MenuButton>
                <MenuList zIndex={10} border={'solid 1px rgba(0,0,0,0.35)'} p={4}>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>min:</Text>
                        <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='min_surface' type='number' flex={1} />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>max:</Text>
                        <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='max_surface' flex={1} type='number' />
                    </Box>

                    <MenuItem rounded={'lg'} py={2} textAlign={'center'} color={'white'} bg={'blue.600'} _hover={{ bg: 'blue.400' }}>
                        OK
                    </MenuItem>

                </MenuList>
            </Menu>



            <Menu>
                <MenuButton border={'solid 1px GrayText'} as={Button} rightIcon={<MdArrowDropDown />} >Prix</MenuButton>
                <MenuList zIndex={10} border={'solid 1px rgba(0,0,0,0.35)'} p={4}>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>min:</Text>
                        <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='min_price' type='number' flex={1} />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>max:</Text>
                        <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='max_price' flex={1} type='number' />
                    </Box>

                    <MenuItem rounded={'lg'} py={2} textAlign={'center'} color={'white'} bg={'blue.600'} _hover={{ bg: 'blue.400' }}>
                        OK
                    </MenuItem>

                </MenuList>
            </Menu>


            <Menu>
                <MenuButton border={'solid 1px GrayText'} as={Button} rightIcon={<MdArrowDropDown />} >Rooms</MenuButton>
                <MenuList zIndex={10} border={'solid 1px rgba(0,0,0,0.35)'} p={4}>

                    <Box>
                        <Heading size={'md'}>Salons</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='living_rooms' type='number' flex={1} />
                        </Box>
                    </Box>

                    <Box>
                        <Heading size={'md'}>Chambres</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} value={filters?.bedrooms || seaarchParams.get('bedrooms') || ''} name='bedrooms' type='number' flex={1} />
                        </Box>
                    </Box>


                    <Box>
                        <Heading size={'md'}>Sanitaires</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='bathrooms' type='number' flex={1} />
                        </Box>
                    </Box>

                    <Box>
                        <Heading size={'md'}>Garages</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='garages' type='number' flex={1} />
                        </Box>
                    </Box>
                    <MenuItem rounded={'lg'} py={2} textAlign={'center'} color={'white'} bg={'blue.600'} _hover={{ bg: 'blue.400' }}>
                        OK
                    </MenuItem>

                </MenuList>
            </Menu>

            <Button onClick={hundleFilterSubmit} flex={1} maxW={120} colorScheme='blue'>Filtrer</Button>
        </Box>

    )
}

export default SearchTopSection