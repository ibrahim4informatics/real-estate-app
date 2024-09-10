import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import Carrousel from './Carrousel';
import { MdEdit, MdStarOutline } from 'react-icons/md';
import { IoIosTrash, IoMdEye } from 'react-icons/io';
import { Link } from 'react-router-dom';








const Post = ({ id, title, description, price, media, status, surface, isFavourite, isOwn }) => {

  

    return (
        <Card border={'1px solid rgba(0,0,0,0.25)'} mx={{ base: 'auto', lg: 0 }} my={2} width={'100%'} maxWidth={400}>
            <CardHeader>
                <Carrousel slides={media} />

                <Box mt={4} width={"100%"} px={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={16} color={status === "SOLD" || status === "RENTED" ? 'red.400' : 'green.400'} fontWeight={'bold'}>{status === 'FOR_RENT' ? 'Alouer' : status === 'FOR_SALE' ? 'Avendre' : status === 'SOLD' ? 'Vendu' : 'Loue'}</Text>
                    <Text fontSize={16} color={'black'} fontWeight={'bold'}>{surface}m<sup>2</sup></Text>
                    <Text fontSize={20} color={'green'} fontWeight={'bold'}>{price}DA{status === 'FOR_RENT' || status === 'RENTED' ? "/mois" : ''}</Text>
                </Box>
            </CardHeader>
            <CardBody>
                <Heading size={'sm'}>{title}</Heading>
                <Text fontSize={12} color={'GrayText'} ml={1} mt={2} dangerouslySetInnerHTML={{ __html: description.length > 50 ? description.slice(0, 50) + "..." : description }}></Text>
            </CardBody>
            <CardFooter>

                <Box width={'100%'} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                    {!isOwn ? (<> {isFavourite ? <Button size={'sm'} leftIcon={<IoIosTrash />} colorScheme={'red'}>Supprimer</Button> : <Button onClick={() => { console.log('fav ', id) }} mx={2} size={'sm'} colorScheme='orange' leftIcon={<MdStarOutline />}>Favouris</Button>}
                        <Button as={Link} to={`/annonces/${id}`} mx={2} size={'sm'} colorScheme='blue' leftIcon={<IoMdEye />}>Voire</Button></>) : (<>
                            <Button as={Link} to={`/annonces/${id}`} mx={2} size={'sm'} colorScheme='blue' leftIcon={<IoMdEye />}>Voire</Button>
                            <Button as={Link} to={`/user/annonce/modefier/${id}`} mx={2} size={'sm'} colorScheme='yellow' leftIcon={<MdEdit />}>Modefier</Button>
                            <Button as={Link} to={`/user/annonce/modefier/${id}`} mx={2} size={'sm'} colorScheme='red' leftIcon={<IoIosTrash />}>Supprimer</Button>
                        </>
                    )}

                </Box>

            </CardFooter>
        </Card>
    )
}

export default Post