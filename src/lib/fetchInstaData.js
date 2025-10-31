// import 'dotenv/config'

import { categorize } from "./ai";
import { ApifyClient } from "apify-client";

const TOKEN = process.env.APIFY_API_TOKEN;
const ACTOR_ID = process.env.APIFY_ACTOR_ID;

function handleData(data) {

    // console.log("handle data called")


    const postUrl = data[0].url;
    const postType = data[0].type;
    const caption = data[0].caption;
    const hashtags = data[0].hashtags;
    let imageUrls = [];
    let videoUrls = [];

    if (postType === "Sidecar") {

        if (data[0].images) {
            data[0].images.forEach(ele => {
                imageUrls.push(ele);
            });

        }
        if (data[0].videos) {
            data[0].videos.forEach(ele => {
                videoUrls.push(ele);
            });
        }

    } else if (postType === "Video") {

        videoUrls.push(data[0].videoUrl);

    } else if (postType === "Image") {

        imageUrls.push(data[0].imageUrl);

    } else {
        console.log("Unknown post type");
    }

    return { postUrl, postType, caption, hashtags, imageUrls, videoUrls };
}

export async function fetchInstaData(url) {
    try {
        const client = new ApifyClient({
            token: TOKEN,
        });
        // console.log("getting data from insta")

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
        console.log( await data)

        const { postUrl, postType, caption, hashtags, imageUrls, videoUrls } =  handleData(data);
        const category = await categorize([caption], hashtags);

        // console.log({ postUrl, postType, caption, hashtags, imageUrls, videoUrls, category });
        return { postUrl, postType, caption, hashtags, imageUrls, videoUrls, category };
        // depending on type, we can have different processing like if its Sidecar we will have images array else if video we will have video url else we will only have image url

    } catch (error) {
        console.log(error)
    }


}

//Sidecar
//Video
//Image
// fetchInstaData('https://www.instagram.com/p/DPi1k5hE4wy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==');