import React from 'react'
import Card from './Card'
import { useStoreContext } from '../contextApi/ContextApi';

const LandingPage = () => {
    const { token } = useStoreContext();
    console.log("Token from landing page: " +token);

    let desc =
        "LinkNest makes sharing easy — shorten long URLs instantly and share them seamlessly across any platform."
    return (
        <div className="min-h-[calc(100vh-64px)]  lg:px-14 sm:px-8 px-4">
            <div className="lg:flex-row flex-col    lg:py-5   pt-16   lg:gap-10 gap-8 flex justify-between items-center">
                <div className=" flex-1">
                    <h1 className='font-bold font-roboto text-slate-800 md:text-5xl text-3xl md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70px] w-full'>
                        LinkNest simplifies URL sharing
                    </h1>
                    <p className='text-slate-700 text-sm my-5'>
                        LinkNest streamlines the process of URL shortening, making sharing
                        links effortless and efficient. With its user-friendly interface,
                        LinkNest allows you to generate concise, easy-to-share URLs in
                        seconds. Simplify your sharing experience with LinkNest today.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            className="bg-custom-gradient w-40 text-white rounded-md  py-2 cursor-pointer"
                        >
                            Manage Links
                        </button>
                        <button
                            className="border-btnColor border w-40 text-btnColor rounded-md  py-2 cursor-pointer"
                        >
                            Create Short Link
                        </button>
                    </div>
                </div>

                <div className='flex-1 flex justify-center w-full'>
                    <img
                        className='sm:w-[400px] w-[350px] object-cover rounded-md'
                        src='/images/img-2.png'
                        alt=''
                    />
                </div>
            </div>

            <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
                <Card
                    title="Simple URL Shortening"
                    desc="Experience the ease of creating short URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
                />
                <Card
                    title="Powerful Analytics"
                    desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
                />
                <Card
                    title="Enhanced Security"
                    desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
                />
                <Card
                    title="Fast and Reliable"
                    desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
                />
            </div>
        </div>
    )
}

export default LandingPage
