
'use client'
import React from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

const page = () => {
    const handleRegister = async (e) => {
        e.preventDefault()
        let newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            image: e.target.photo.value,
            type: e.target.type.value
        }

        let result = await fetch('https://mobile-shop-ten.vercel.app/api/auth/signup/new-user',{
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        })

        console.log(newUser);
        console.log(result);
    }
    return (
        <div className='flex justify-center  mt-9'>
            <form className="flex max-w-md flex-col border border-black p-5 gap-4" onSubmit={handleRegister}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput id="email2" type="email" name='email' placeholder="name@flowbite.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput id="name" type="text" name='name' placeholder="Enter your name" required shadow />
                </div>


                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Photo" value="Your Photo" />
                    </div>
                    <TextInput id="photo" type="text" name='photo' placeholder="Enter your photo" required shadow />
                </div>

                <div>
                    <label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select type</label>
                    <select id="types" name='type' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="member">Member</option>
                        <option value="host">Host</option>
                    </select>
                </div>



                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" name='password' required shadow placeholder='Enter your password' />
                </div>


                <Button type="submit" className='bg-red-500 p-4 text-white rounded-xl'>Register new account</Button>
                {/* <Button gradientMonochrome="lime" >Lime</Button> */}
            </form>
        </div>
    );
};

export default page;