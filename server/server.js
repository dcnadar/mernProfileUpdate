import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import connect from './database/conn.js';
const app = express();
dotenv.config()

// middleware
app.use(express.json())
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-power-by'); //less hackers know our stack
import router from './routes/route.js';

const PORT = process.env.PORT || 8080;
// HTTP GET REQuest
app.get('/api', (req, res) => {
    // res.status(201).json({ msg: 'HomeRequest' });
    res.status(201).json("HomeRequest");
});
/**api routes */
app.use('/api', router)

/** Start Server   when we have valid connection */
connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on: http://127.0.0.1:${PORT}`);
        })
    } catch (error) {
        console.log("Can not connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})