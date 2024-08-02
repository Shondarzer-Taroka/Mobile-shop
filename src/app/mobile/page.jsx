import Link from 'next/link';
import React from 'react';

export const mobileData = async () => {
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL)
    let data = await res.json()
    return data
}

const page = async () => {
    let getData = await mobileData()
    // console.log(getData);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto mt-5'>
            {getData.map(post => <div key={post.id} className="card bg-base-100  shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p>{post.body}</p>
                    <div className="card-actions justify-end">
                        <Link href={`/mobile/${post.id}`}> <button className="btn btn-primary">View details</button></Link>
                       
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default page;