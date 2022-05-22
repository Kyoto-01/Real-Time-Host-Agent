import si from 'systeminformation';


async function get_os_infos(){
    const data = await si.osInfo()
    return data
}

async function get_cpu_infos(){
    const data = await si.cpu()
    return data
}

async function get_cpu_infos2(){
    const data = await si.currentLoad()
    return data
}

async function get_cpu_infos3(){
    const data = await si.cpuTemperature()
    return data
}

async function get_cpu_infos4(){
    const data = await si.cpuCurrentSpeed()
    return data
}

async function get_memory_infos(){
    const data = await si.mem()
    return data
}

async function get_nic_infos(){
    const data = await si.networkInterfaces()
    return data
}

async function get_nic_infos2(){
    const data = await si.networkStats()
    return data
}

async function get_vol_infos(){
    const data = await si.fsSize()
    return data
}


export default { 
    get_os_infos,
    get_cpu_infos,
    get_cpu_infos2,
    get_cpu_infos3,
    get_cpu_infos4,
    get_nic_infos,
    get_nic_infos2,
    get_memory_infos,
    get_vol_infos
};