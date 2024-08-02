'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
const NavBar = () => {

    const pathName = usePathname()
    const session = useSession()
    console.log(session);
    const links = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Mobile',
            path: '/mobile'
        },
        {
            title: 'Dashboard',
            path: '/dashboard'
        },

    ]
    return (
        <div className="navbar bg-base-100">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            links.map(link => {
                                return <>
                                    <li key={link.path}> <Link className={pathName === link.path && 'text-fuchsia-500'} href={link.path}> {link.title} </Link> </li>
                                </>
                            })
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links.map(link => {
                            return <>
                                <li key={link.path}> <Link className={pathName === link.path && 'text-fuchsia-500'} href={link.path}> {link.title} </Link> </li>
                            </>
                        })
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {session.data?.user ? <div className='flex gap-1 items-center'>
                    <div>
                        <Image className='rounded-full border border-black' width={60} height={50} alt={session.data?.user.name} src={session.data?.user.image}></Image>

                    </div>
                    <div className='flex flex-col'>
                        <p> {session.data?.user.name}</p>
                        <p> {session.data?.user.type}</p>
                    </div>

                    <button onClick={() => signOut()} className='bg-fuchsia-500 px-4 py-3 text-white rounded-xl ' >Log Out</button>
                </div> : <div><button onClick={() => signIn()} className="btn">Log in</button>
                    <Link href={'/api/auth/signup'}> <button className="btn">Register</button></Link></div>}



            </div>
        </div>
    );
};

export default NavBar;