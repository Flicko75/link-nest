import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const navigate = useNavigate();
    const { token } = useStoreContext();
    const [isCopied, setIsCopied] = useState(false);
    const [analyticsToggle, setAnalyticsToggle] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(false);
    const [loader, setLoader] = useState(false);
    const[analyticsData, setAnalyticsData] = useState([]);

    const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
        /^https?:\/\//,
        ""
    );

    const handleCopy = async () => {
        try {
            const fullUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/s/${shortUrl}`;
            await navigator.clipboard.writeText(fullUrl);
            setIsCopied(true);

            // reset after 2s
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const analyticsHandler = (shortUrl) => {
        if (!analyticsToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticsToggle(!analyticsToggle);
    }

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const { data } = await api.get(`/api/url/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&endDate=2024-12-31T00:00:00`,{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setAnalyticsData(data);
            setSelectedUrl("")
            console.log(data);
            
        } catch (error) {
            navigate("/error");
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        if (selectedUrl){
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    return (
        <div className={`bg-slate-100 shadow-lg border border-dotted  border-slate-500 px-6 sm:py-1 py-3 rounded-md  transition-all duration-100 `}>
            <div className={`flex sm:flex-row flex-col  sm:justify-between w-full sm:gap-0 gap-5 py-5 `}>
                <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden ">
                    <div className="text-slate-900 pb-1 sm:pb-0   flex items-center gap-2 ">
                        <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
                            target="_blank"
                            className=" text-[17px]  font-montserrat font-[600] text-linkColor ">
                            {subDomain + "/" + `${shortUrl}`}
                        </a>
                        <FaExternalLinkAlt className="text-linkColor" />
                    </div>

                    <div className='flex items-center gap-1'>
                        <h3 className='text-slate-600 font-[400] text-[17px]'>
                            {originalUrl}
                        </h3>
                    </div>

                    <div className="flex   items-center gap-8 pt-6 ">
                        <div className="flex gap-1  items-center font-semibold  text-green-800">
                            <span>
                                <MdOutlineAdsClick className="text-[22px] me-1" />
                            </span>
                            <span className="text-[16px]">{clickCount}</span>
                            <span className="text-[15px] ">
                                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
                            <span>
                                <FaRegCalendarAlt />
                            </span>
                            <span className="text-[17px]">
                                {dayjs(createdDate).format("MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 sm:justify-end items-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="flex cursor-pointer gap-1 items-center bg-btnColor py-2 px-6 rounded-md text-white font-semibold shadow-md shadow-slate-500"
                    >
                        {isCopied ? 'Copied' : 'Copy'}
                        {isCopied ? (
                            <LiaCheckSolid className="text-md" />
                        ) : (
                            <IoCopy className="text-md" />
                        )}
                    </button>

                    <button
                        onClick={() => analyticsHandler(shortUrl)}
                        className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white "
                    >
                        Analytics
                        <MdAnalytics className="text-md" />
                    </button>
                </div>
            </div>

            <React.Fragment>
                <div className={`${analyticsToggle ? "flex" : "hidden"
                    } max-h-96 sm-mt-0 min-h-96 relative border-t-2 w-[100%] overflow-hidden`}>
                    {loader ? (<div></div>) : (<div></div>)}
                </div>
            </React.Fragment>
        </div>
    )
}

export default ShortenItem
