import AppRouter, { SubDomainRouter } from "../AppRouter";
import { subDomainList } from "./constant";

// export const getApps = () => {
//     const subdomain = getSubDomain(window.location.hostname);

//     const mainApp = subDomainList.find((app) => app.main);
//     if (subdomain === "") return mainApp.app;

//     const apps = subDomainList.find((app) => subdomain === app.subDomain);

//     return apps ? apps.app : mainApp.app;
// }
export const getApps = () => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const firstSegment = pathParts[0]; // 0QZMZf5A

    // If the first path segment is a short URL 
    const isShortUrl = /^[a-zA-Z0-9]{8}$/.test(firstSegment); 

    if (isShortUrl) return SubDomainRouter; // render ShortenUrlPage
    return AppRouter; // default landing pages
}


// export const getSubDomain = (location) => {
//     const locationParts = location.split(".");
//     const isLocalhost = locationParts.slice(-1)[0] === "localhost";
//     const sliceTill = isLocalhost ? -1 : -2;
//     return locationParts.slice(0, sliceTill).join("");
// }