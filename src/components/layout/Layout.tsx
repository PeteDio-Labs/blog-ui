import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const prefersReducedMotion = useReducedMotion();

    const ease = [0.16, 1, 0.3, 1] as const;

    const transition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.22, ease };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={location.pathname}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: 'blur(6px)' }}
                        transition={transition}
                        className="w-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;