// Imports
import * as dotenv from 'dotenv';
import express from 'express';
import fetch from '../utils/fetch.js';

const router = express.Router();

router.get('/:claim', async (req,res)=>{
    let claim = req.params.claim;
    const video = await fetch('get', {"uri": req.originalUrl.substring(1)});
    // res.json(video.result.channel_name)
    if (video.result.error) {
        res.render('404');
    } else {
        const get_url = await fetch('claim_search', {"claim_id": video.result.claim_id});
        const url = get_url.result.items[0].canonical_url.split('lbry://')[1].replaceAll('#', ':');
        const recommended = await fetch('claim_search', {"tags_any": video.result.metadata.tags, "claim_type": "stream", "page": parseInt(req.query.p) || 1, "page_size": 20});
        if (req.originalUrl.split('?')[0] == "/" + url) res.render('claim', {"video": video.result, "url": url, "recommended": recommended.result});
        else {
            const query = req.originalUrl.split('?')[1] ? "?" + req.originalUrl.split('?')[1] : ""
            console.log(query);
            res.redirect("/" + url + query);
        }
    }
});

export default router;