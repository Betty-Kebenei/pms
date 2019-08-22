import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/api/v1/locations', routes);

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;
