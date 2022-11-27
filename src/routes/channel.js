// Imports
import fetch from '../utils/fetch.js';
import claim from './claim.js';

export default (app)=>{
    app.get('/@:channel', async (req,res)=>{
        let name = `@${req.params.channel}`;
        const channel = await fetch('resolve', {"urls": name});
        const videos = await fetch('claim_search', {"channel": name, "claim_type": "stream", "page": parseInt(req.query.p) || 1, "page_size": 20, "order_by": "release_time"});
        if (channel.result[name].error) {
            res.render('404');
        } else {
            name = channel.result[name].short_url.split('lbry://')[1].replace('#', ':');
            if (req.originalUrl.split('?')[0] == "/" + name) res.render('channel', {"channel": channel.result[name], "url": name, "videos": videos.result, "page": req.url});
            else {
                const query = req.originalUrl.split('?')[1] ? "?" + req.originalUrl.split('?')[1] : ""
                console.log(query);
                res.redirect("/" + name + query);
            }
            console.log();
        }
    });

    app.use('/@:channel/', claim)
}