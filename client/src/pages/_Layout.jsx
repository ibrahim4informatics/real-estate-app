import React, { createContext, useContext, useState } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import SignIn from '../components/SignIn';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';


export const ShowSignInContext = createContext();

const Layout = ({ children, home_navbar, footer, navbar }) => {
    const { isLoading, isLogin, user } = useAuth()

    const SignInAnimated = motion(SignIn);

    const { showSignIn, setShowSignIn } = useContext(ShowSignInContext);
    return (

        <Box w={"100%"} minH={'100vh'} >
            {isLoading ? <Box h={'100vh'} w={'100%'}> <Loader /></Box> : (
                <>
                    {home_navbar && <HomeNavbar isSeller={isLogin ? user.isSeller : false} isLogin={isLogin} setShowSignIn={setShowSignIn} />}
                    {navbar && <Navbar isSeller={isLogin ? user.isSeller : false} isLogin={isLogin} />}
                    <AnimatePresence>
                        {showSignIn && (

                            <SignInAnimated setShowSignIn={setShowSignIn} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}

                            />

                        )}
                    </AnimatePresence>
                  
                        {children}
                    
                    {footer && <Footer />}
                </>
            )}
        </Box>
    )
}

export default Layout