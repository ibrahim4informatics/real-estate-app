import React, { createContext, useContext, useState } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import SignIn from '../components/SignIn';
import Navbar from '../components/Navbar';


export const ShowSignInContext = createContext();

const Layout = ({ children, home_navbar, footer, navbar }) => {

    const SignInAnimated = motion(SignIn);

    const { showSignIn, setShowSignIn } = useContext(ShowSignInContext);
    return (
        <Box w={"100%"} minH={'100vh'}>
            {home_navbar && <HomeNavbar setShowSignIn={setShowSignIn} />}
            {navbar && <Navbar />}
            <AnimatePresence>
                {showSignIn && (

                    <SignInAnimated setShowSignIn={setShowSignIn} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}

                    />

                )}
            </AnimatePresence>
            <Box>
                {children}
            </Box>
            {footer && <Footer />}
        </Box>

    )
}

export default Layout