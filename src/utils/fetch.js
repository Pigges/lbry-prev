// Imports
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async (method, args)=>{
    let resp;
    try {
        resp = await axios({
            method: "post",
            url: process.env.LBRY_API,
            data: {
                method: method,
                params: args
            }
        });
    } catch(err) {
        console.log(err);
        resp = {"message": "error"};
    }
    return await resp.data;
}