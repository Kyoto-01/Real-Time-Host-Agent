import sysinfo from 'systeminformation';


async function get_sysinfo() {
  const os = await sysinfo.osInfo();
  const memory = await sysinfo.mem();
  const cpu = await sysinfo.cpu();
  const cpuLoad = await sysinfo.currentLoad();
  const cpuTemperature = await sysinfo.cpuTemperature();
  const nicsGeneral = await sysinfo.networkInterfaces();
  const nicsStats = await sysinfo.networkStats();
  const filesystems = await sysinfo.fsSize();

  const info_obj =
  {
    "general": {
      "hostname": os.hostname,
      "ip": nicsGeneral[1]?.ip4 || nicsGeneral[0].ip4,
      "os": os.distro,
      "online": true
    },
    "memory": {
      "total": memory.total,
      "used": memory.used,
      "available": memory.free
    },
    "cpu": {
      "model": cpu.brand,
      //"architecture": cpu.manufacturer,
      "cores": cpu.physicalCores,
      "threads_core": (cpu.cores / cpu.physicalCores),
      "sockets": cpu.processors,
      "used": cpuLoad.currentLoad,
      "temperature": cpuTemperature.main,
      "clock": cpu.speed,
      "clock_max": cpu.speedMax,
      "clock_min": cpu.speedMin
    },
    "nic": get_nics(nicsGeneral, nicsStats),
    "devices": get_filesystems(filesystems),
  }

  return info_obj
}

function get_nics(nicsGeneral, nicsStats) {
  const nicList = [];

  for (let nic in nicsGeneral) {
    const nicInfo = {
      "name": nicsGeneral[nic].iface,
      "ip": nicsGeneral[nic].ip4,
      "mask": nicsGeneral[nic].ip4subnet,
      "mac": nicsGeneral[nic].mac,
      "tx_pckts": nicsStats[nic - 1]?.tx_bytes || 0,
      "rx_pckts": nicsStats[nic - 1]?.rx_bytes || 0
    };

    nicList.push(nicInfo);
  }

  return nicList;
}

function get_filesystems(filesystems) {
  const fsList = [];

  for (let fs in filesystems) {
    const fsInfo = {
      "name": filesystems[fs].fs,
      "used": filesystems[fs].used,
      "available": filesystems[fs].available,
      "total": filesystems[fs].size,
      "mount_point": filesystems[fs].mount
    };

    fsList.push(fsInfo);
  }

  return fsList;
}


export default { get_sysinfo };
