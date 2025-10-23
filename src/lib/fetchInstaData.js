import 'dotenv/config'

import { categorize } from '/Users/ronimaity/Desktop/instagram-saved-organizer/src/lib/ai.js';
import { ApifyClient } from "apify-client";

const TOKEN = process.env.APIFY_API_TOKEN;
const ACTOR_ID = process.env.APIFY_ACTOR_ID;

export async function fetchInstaData(url) {
    try {
        const client = new ApifyClient({
            token: TOKEN,
        });
        console.log("getting data from insta")

        const input = {
            "directUrls": [
                url
            ],
            "resultsType": "posts",
            "searchLimit": 1
        }

        const run = await client.actor(ACTOR_ID).call(input);
        const res = await fetch(run.output.results)
        const data = await res.json()
        console.log(await categorize([data[0].caption],data[0].hashtags))
    } catch (error) {
        console.log(error)
    }


}


// fetchInstaData('https://www.instagram.com/p/DP3gdUlE4Na/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==');