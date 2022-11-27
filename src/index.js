// Imports
import * as dotenv from 'dotenv';
import express from 'express';
import favicon from 'express-favicon';

// Import routes
import channel from './routes/channel.js';
import claim from './routes/claim.js';
import magic from './routes/magic.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


app.use(express.urlencoded({extended:true}));
app.use(favicon(__dirname + '/public/favicon.svg'));
app.set('view engine', 'ejs');

channel(app);

app.use('/([\$])', magic)
app.use('/', claim);


app.listen(PORT, (err)=>{
    console.log(err||"LBRY-PREV: started");
})