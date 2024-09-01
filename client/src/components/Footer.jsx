import { Box, Heading, Link } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box width={'100%'} py={4} px={2} borderTop={'solid 1px rgba(0,0,0,0.35)'}>
            <Heading color={'blue.600'} textAlign={'center'} my={2}>EMLAK</Heading>
            <Box px={4} py={3} display={'flex'} flexDir={{ base: 'column', md: 'row' }} alignItems={'center'} justifyContent={{ base: 'center', md: "space-between" }} flexWrap={'wrap'}>
                <Box fontSize={18} color={'black'} fontWeight={'bold'}>
                    <Link my={4} href='#'>Company Address</Link><br />
                    <Link my={4} href='#'>FAQ?</Link><br />
                    <Link my={4} href='#'>Annonces et Promotions</Link><br />
                    <Link my={4} href='#'>Monetization et Taxes</Link><br />
                </Box>


                <Box fontSize={18} color={'black'} fontWeight={'bold'}>
                    <Link my={4} href='tel:'>FAX: +213:21-23-45-67</Link><br />
                    <Link my={4} href='#'>Mail:contact@emtilak.buisness</Link><br />
                    <Link my={4} href='#'>Tel: +213:411-254-784</Link><br />

                </Box>

                <Box fontSize={18} color={'black'} fontWeight={'bold'}>
                    <Link my={4} href='#'>Signaler un problème</Link><br />
                    <Link my={4} href='#'>Contacter le Support</Link><br />
                </Box>

            </Box>
        </Box>
    )
}

export default Footer