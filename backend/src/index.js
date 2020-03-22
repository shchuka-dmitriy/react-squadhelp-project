import express from 'express';
import router  from './routers/index.js';
import cors    from 'cors';

const PORT = process.env.NODE_PORT || 3000;
const app = express();

app.use( cors() );
app.use( express.json() );
app.use( '/api', router );

app.listen( PORT, () => console.log( `Example app listening on port ${PORT}!` ) );
