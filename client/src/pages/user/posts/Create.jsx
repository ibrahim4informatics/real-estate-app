import React, { useRef, useState } from 'react'
import Layout from '../../_Layout'
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Select, Text } from '@chakra-ui/react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: 1 }, { header: 2 }],
        [{ size: ["small", "normal", 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['clean'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

    ],
}
const Create = () => {


    const [descripton, setDescription] = useState('');
    const [data, setData] = useState({});
    const [dataErrors, setDataErrors] = useState({});


    const hundleInputChange = (e) => {
        setDataErrors(prev => ({ ...prev, [e.target.name]: '' }))
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const hundleFilesUpload = (e) => {

        console.log(e.target.files)

    }

    const hundleSubmite = () => {
        //todo validate data
        //todo call API to create ad
    }


    return (
        <Layout footer={true} navbar={true}>
            <Box gap={2} w={'100%'} p={4} bg={'white'} display={'flex'} flexDir={{ base: 'column', lg: 'row' }}>
                <Box flex={1} my={4}>
                    <Heading>Créer Une Annonce</Heading>
                    <FormControl mt={2}>
                        <FormLabel>Titre:</FormLabel>
                        <Input onChange={hundleInputChange} value={data?.title || ''} size={'lg'} name='title' borderColor={'GrayText'} my={1} type='text' />
                    </FormControl>
                    <Box >
                        <label htmlFor="#editor"><Text my={2}>Description</Text></label>
                        <ReactQuill style={{ minHeight: '300px', border: '1px solid rgba(0,0,0,0.35)' }} id='editor' modules={modules} theme='snow' placeholder='description' onChange={setDescription} value={descripton} />
                    </Box>
                    <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Surface:</FormLabel>
                            <InputGroup borderColor={'GrayText'} my={1}>
                                <Input onChange={hundleInputChange} value={data.surface} size={'lg'} name='surface' type='number' />
                                <InputRightElement h={'100%'} borderRightRadius={'lg'} fontWeight={'bold'}>m <sup>2</sup></InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Floor:</FormLabel>
                            <Input size={'lg'} value={data?.floor || ''} onChange={hundleInputChange} name='floor' borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Type:</FormLabel>
                            <Select name='type' onChange={hundleInputChange} value={data?.type || ''} borderColor={'GrayText'} size={'lg'}>
                                <option value="VILLA">Villa</option>
                                <option value="HOUSE">Grande Maison</option>
                                <option value="OFFICE">Bureaux</option>
                                <option value="STUDIO">Studio</option>
                                <option value="GARAGE">Garage</option>
                                <option value="OTHER">Autres</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box my={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Salon(s):</FormLabel>
                            <Input size={'lg'} name='living_rooms' onChange={hundleInputChange} value={data?.living_rooms || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Chambre(s):</FormLabel>
                            <Input size={'lg'} name='bed_rooms' value={data?.bed_rooms || ''} onChange={hundleInputChange} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Sanitaire(s):</FormLabel>
                            <Input size={'lg'} name='bath_rooms' onChange={hundleInputChange} value={data?.bath_rooms || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Garage(s):</FormLabel>
                            <Input size={'lg'} name='garages' onChange={hundleInputChange} value={ data?.garages || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                    </Box>
                    <FormControl>
                        <FormLabel>Addresse</FormLabel>
                        <Input borderColor={'GrayText'} size={'lg'} type='text' name='address' onChange={hundleInputChange} value={data?.address || ''} />
                    </FormControl>
                    <Box mt={4} display={'flex'} alignItems={'center'} gap={2}>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Wilaya:</FormLabel>
                            <Input size={'lg'} name='wilaya' onChange={hundleInputChange} value={data?.wilaya || ''} borderColor={'GrayText'} my={1} type='text' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Commune:</FormLabel>
                            <Input size={'lg'} name='city' onChange={hundleInputChange} value={data?.city || ''} borderColor={'GrayText'} my={1} type='text' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>L'atitude:</FormLabel>
                            <Input size={'lg'} name='attitude' onChange={hundleInputChange} value={data?.attitude || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                        <FormControl display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Longitude:</FormLabel>
                            <Input size={'lg'} name='longitude' onChange={hundleInputChange} value={data?.longitude || ''} borderColor={'GrayText'} my={1} type='number' />
                        </FormControl>
                    </Box>
                    <Text color={'GrayText'} mb={4}>L'atitude et Longitude vous pouvez les voire dans google map!</Text>
                    <Box display={'flex'} alignItems={'baseline'} gap={2}>

                        <FormControl flex={1}>
                            <FormLabel>Prix:</FormLabel>
                            <InputGroup borderColor={'GrayText'} size={'lg'}>
                                <Input name='price' type='number' onChange={hundleInputChange} value={data?.price || ''} />
                                <InputRightElement color={'green.500'} fontWeight={'bold'}>{data?.status === 'FOR_RENT' ? 'DA/mois' : 'DA'}</InputRightElement>
                            </InputGroup>
                            <FormHelperText>si vous souhaitez louer votre propriété, vous devez fournir un prix mensuel (par mois) </FormHelperText>
                        </FormControl>
                        <FormControl w={120} display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <FormLabel>Type:</FormLabel>
                            <Select name='status' onChange={hundleInputChange} value={data?.status || ''} borderColor={'GrayText'} size={'lg'}>
                                <option value="FOR_SALE">Avendre</option>
                                <option value="FOR_RENT">Alouer</option>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box p={4} alignSelf={'baseline'} mt={4} w={{ base: '100%', lg: '50%' }}>
                    <Box pos={'relative'} my={4} mx={'auto'} p={4} width={'100%'} h={{ base: 40, lg: '50vh' }} border={'dashed 3px #007BFF'} borderRadius={8}>
                        <input type='file' multiple style={{ width: "100%", height: '100%', opacity: 0 }} onChange={hundleFilesUpload} />
                        <Text color={'GrayText'} pos={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'}>importer des photos</Text>
                    </Box>

                    <Box my={8}>
                        <Text textAlign={'center'} fontSize={20} textTransform={'capitalize'} color={'GrayText'}>Importer des photos pour les visualisez</Text>
                    </Box>
                    <Button w={'full'} my={2} colorScheme='blue' size={'lg'}>Publier</Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default Create