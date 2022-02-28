import * as express from 'express';
import axios from 'axios';

//const cache: { [name: string]: string } = {}

const app = express();
app.get('*', async (req, res) => {
    console.log(req.path)
     //@ts-ignore
    res.header("Access-Control-Allow-Origin", "*")
    const url = req.path.substring(1)
    const result = await axios.get(url, {responseType: 'stream'})
    result.data.pipe(res)
})

export const server = app;

app.listen(3001)
