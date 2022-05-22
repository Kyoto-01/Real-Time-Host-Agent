import sysinfo from './sysinfo_collector.js'


async function get_sysinfo() {
  const os = await sysinfo.get_os_infos()
  const memory = await sysinfo.get_memory_infos()
  const cpu = await sysinfo.get_cpu_infos()
  const cpu2 = await sysinfo.get_cpu_infos2()
  const cpu3 = await sysinfo.get_cpu_infos3()
  const cpu4 = await sysinfo.get_cpu_infos4()
  const nic = await sysinfo.get_nic_infos()
  const nic2 = await sysinfo.get_nic_infos2()
  const vol = await sysinfo.get_vol_infos()

  //const devices = await lib.get_devices_infos()
  const info_obj =
  {
    "general": {
      "hostname": os.hostname,//"PC01-SINFO01",
      "ip": nic[0].ip4,//"192.168.1.6",
      "os": os.distro,//"Linux Debian",
      "online": true
    },
    "memory": {
      "total": memory.total,
      "used": memory.used,
      "available": memory.free
    },
    "cpu": {
      "model": cpu.brand,//"Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz",
      //"architecture": "x86_64",
      "cores": cpu.physicalCores,//4,
      "threads_core": cpu.cores,//2,
      //"sockets": 1,
      "used": cpu2.currentLoad,//50,
      "temperature": cpu3.main,//40,
      "clock": cpu2.currentLoad,//2693.776,
      "clock_max": cpu4.max,//3100,
      "clock_min": cpu4.min//1600
    },
    "nic": {
      "enp0s3": {
        "ip": nic[0].ip4,//"192.168.1.6",
        "mask": nic[0].ip4subnet,//"255.255.255.0",
        "mac": nic[0].mac,//"ab:cd:ef:12:34:56",
        "tx_pckts": nic2[0].tx_bytes,//84802,
        "rx_pckts": nic2[0].rx_bytes//107049
      }
    },
    "devices": {
      "sda1": {
        "used": vol[0].used,//230025547776,
        "available": vol[0].available,//199471177728,
        "total": vol[0].size,//429496725504,
        "mount_point": vol[0].mount//"/mnt/hd_files"
      },
      "sda2": {
        "used": vol[1].used,//11439345664,
        "available": vol[1].available,//52312444928,
        "total": vol[1].size,//67198562304,
        "mount_point": vol[1].mount//"/"
      }
    }
  }

  return info_obj
}


export default { get_sysinfo };