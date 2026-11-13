import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});