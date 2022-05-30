import express from 'express';
import morgan from 'morgan';
import sysinfo from './sysinfo_collector.js';


const app = express();
const port = 5000;


app.use(morgan('tiny'));

// URLs

app.get('/all', async (req, res) => {
    const allInfos = await sysinfo.get_sysinfo();
    res.json(allInfos);
});

app.get('/general', async (req, res) => {
    const generalInfos = (await sysinfo.get_sysinfo()).general;
    res.json(generalInfos);
});

//

app.listen(port, () => {
    console.log(`Agent is running in port ${port}...`);
})
