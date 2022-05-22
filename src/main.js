import express from 'express';
import morgan from 'morgan';
import sysinfo from './sysinfo_collector.js'
import infos from './sysinfo_generator.js'


const app = express();
const port = 3000;


app.use(morgan('tiny'));

// URLs

app.get('/info/cpu', async (req, res) => {
    const cpuInfos = await sysinfo.get_cpu_infos();
    res.send(cpuInfos);
});

app.get('/info/memory', async (req, res) => {
    const memInfos = await sysinfo.get_memory_infos();
    res.send(memInfos);
});
app.get('/info/out', async (req, res) => {
    const allInfos = await infos.get_sysinfo();
    res.json(allInfos);
});

app.get('/info/net', async (req, res) => {
    const netInfos = await sysinfo.get_net_infos();
    res.send(netInfos);
});

app.get('/info/os', async (req, res) => {
    const osInfos = await sysinfo.get_os_infos();
    res.send(osInfos);
});

app.get('/info/vol', async (req, res) => {
    const volInfos = await sysinfo.get_vol_infos();
    res.send(volInfos);
});

//

app.listen(port, () => {
    console.log(`Agent is running in port ${port}...`);
})