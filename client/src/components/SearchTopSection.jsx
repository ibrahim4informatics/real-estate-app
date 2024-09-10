import React from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, Heading, IconButton, Input, InputGroup, InputRightElement, Select, Text, MenuList } from '@chakra-ui/react'
import { MdArrowDropDown, MdSearch } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import axios from '../services/config/axios.conf';

const SearchTopSection = ({ refContainer, setFetched }) => {

    const [seaarchParams, setSearchParams] = useSearchParams();

    const hundleFilterFieldsChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (value.trim().length > 0) {
            const previousSearchParams = new URLSearchParams(seaarchParams);
            previousSearchParams.set(key, value);
            setSearchParams(previousSearchParams);
        }

        else {
            const previousSearchParams = new URLSearchParams(seaarchParams);
            previousSearchParams.delete(key);
            setSearchParams(previousSearchParams);
        }
    }


    const hundleFilterSubmit = () => {
        let params = {};
        setFetched({ data: null, isLoading: true, error: null })
        const urlParams = new URLSearchParams(seaarchParams);
        urlParams.set('page', '1');
        setSearchParams(urlParams)

        seaarchParams.forEach((value, key) => params[key] = value);

        axios.get('/api/posts', { params }).then(res => { setFetched({ data: res.data, error: null, isLoading: false }) }).catch(err => {
            setFetched({ data: null, error: err, isLoading: false });
        })
    }
    return (
        <Box justifyContent={'center'} ref={refContainer} width={'100%'} py={2} px={1} display={'flex'} rowGap={2} columnGap={1} alignItems={'center'} flexWrap={'wrap'} >
            <InputGroup borderColor={'GrayText'} maxW={350} w={"100%"} ml={2}>
                <Input onChange={hundleFilterFieldsChange} value={seaarchParams.get('title') || ''} placeholder='tapez tout ce qui concerne ce que vous voulez...' name='title' />
                <InputRightElement>
                    <IconButton icon={<MdSearch />} bg={'transparent !important'} />
                </InputRightElement>
            </InputGroup>

            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='wilaya' value={seaarchParams.get('wilaya') || ''} placeholder='Wilaya' w={100} />
            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='city' value={seaarchParams.get('city') || ''} placeholder='Commune' w={130} />
            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='floor' value={seaarchParams.get('floor') || ''} placeholder='Etage' type='number' w={"80px"} />

            <Select borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='type' placeholder='type' value={seaarchParams.get('type') || ''} maxW={150}>
                <option value="APARTMENT">Appartement</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">Grande Maison</option>
                <option value="OFFICE">Bureaux</option>
                <option value="STUDIO">Studio</option>
                <option value="GARAGE">Garages</option>
                <option value="OTHER">Autres</option>
            </Select>


            <Select borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='status' value={seaarchParams.get('status') || ''} placeholder='status' maxW={150}>
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
                        <Input value={seaarchParams.get('min_surface') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='min_surface' type='number' flex={1} />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>max:</Text>
                        <Input value={seaarchParams.get('max_surface') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='max_surface' flex={1} type='number' />
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
                        <Input value={seaarchParams.get('min_price') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='min_price' type='number' flex={1} />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} my={2}>
                        <Text mx={2}>max:</Text>
                        <Input value={seaarchParams.get('max_price') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='max_price' flex={1} type='number' />
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
                            <Input value={seaarchParams.get('living_rooms') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='living_rooms' type='number' flex={1} />
                        </Box>
                    </Box>

                    <Box>
                        <Heading size={'md'}>Chambres</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input borderColor={'GrayText'} onChange={hundleFilterFieldsChange} value={seaarchParams.get('bedrooms') || ''} name='bedrooms' type='number' flex={1} />
                        </Box>
                    </Box>


                    <Box>
                        <Heading size={'md'}>Sanitaires</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input value={seaarchParams.get('bathrooms') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='bathrooms' type='number' flex={1} />
                        </Box>
                    </Box>

                    <Box>
                        <Heading size={'md'}>Garages</Heading>
                        <Box display={'flex'} alignItems={'center'} my={2}>
                            <Text mx={2}>min:</Text>
                            <Input value={seaarchParams.get('garages') || ''} borderColor={'GrayText'} onChange={hundleFilterFieldsChange} name='garages' type='number' flex={1} />
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