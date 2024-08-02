import React from 'react';
import { mobileData } from '../page';

 
 export const specificmobile = async (id) => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    let data = await res.json()
    return data
}

const page =async ({ params }) => {
    console.log(params);
    let getdata= await specificmobile((params.id))
    console.log(getdata);
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                          <span className='font-bold'>Title:</span>  {getdata.title}
                        </p>
                        <p className="mb-5">
                          <span className='font-bold'>Description:</span> {getdata.body}
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;