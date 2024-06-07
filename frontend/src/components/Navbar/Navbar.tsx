import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className={cn('text-white no-underline hover:underline')}>
                    Home
                </Link>
                <Link href="/login" className={cn('text-white no-underline hover:underline')}>
                    Login
                </Link>
                <Link href="/signup" className={cn('text-white no-underline hover:underline')}>
                    Register
                </Link>
                <Link href="/profile" className={cn('text-white no-underline hover:underline')}>
                    Profile
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
