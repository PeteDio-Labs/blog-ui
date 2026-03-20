import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    const location = useLocation();
    const prefersReducedMotion = useReducedMotion();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const ease = [0.16, 1, 0.3, 1] as const;

    const transition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.22, ease };

    return (
        <div className="min-h-screen">
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex pt-16">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="md:ml-64 flex-1 overflow-auto min-h-[calc(100vh-4rem)]">
                    <section className="p-6 md:p-8">
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
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Layout;
