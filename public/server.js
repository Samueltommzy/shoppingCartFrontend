import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/app';
let app = express();
app.get('/', (req,res)=>{
    let appstring = renderToString(<App/>);
    res.send({
        body: appstring
    });
});
app.listen(8080);

