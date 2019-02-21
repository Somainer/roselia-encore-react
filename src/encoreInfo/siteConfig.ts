import { SiteOverallConfig } from "src/rhodonite/protocols/encore";
import roselia from './roselia'
import starlight from './starlight'
import suilen from './suilen'

const site: SiteOverallConfig = {
    encoreSites: [
        {
            path: '/starlight/',
            site: starlight
        },
        {
            path: '/raise-a-suilen/',
            site: suilen
        },
        {
            path: '/',
            site: roselia
        }
    ],
    defaultSite: roselia
}

export default site
