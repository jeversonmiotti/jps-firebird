var resp = {
  result: 0,
  nodes: []
}

if('${settings.storagebackup:false}'== 'true'){
  resp.nodes.push({
    nodeType: "storage-backup",
    nodeGroup: "storage",    
    fixedCloudlets: 1,
    cloudlets: 4,
    DiskLimit: 20
  });
}

if ('${settings.ippublic:false}'== 'true'){
  resp.nodes.push({
    nodeType: "ubuntu-vps",
    nodeGroup: "cp",
    tag: ${settings.ubuntu_version},  
    fixedCloudlets: 1,
    cloudlets: 4,
    isSLBAccessEnabled: false,
    extip: true,
    globals: {success: "publicip"},
    env: {
      JELASTIC_PORTS: "3050, 21"      
    },      
    volumes: [
      "/opt/firebird",
      "/opt/firebird/logs",
      "/opt/firebird/data",
      "/backup"
    ]
  });
} else {
  resp.nodes.push({
    nodeType: "ubuntu-vps",
    nodeGroup: "cp",
    tag: ${settings.ubuntu_version},  
    fixedCloudlets: 1,
    cloudlets: 4,
    globals: {success: "nopublicip"},
    env: {
      JELASTIC_PORTS: "3050, 21"      
    },      
    volumes: [
      "/opt/firebird",
      "/opt/firebird/logs",
      "/opt/firebird/data",
      "/backup"
    ]
  });
}

return resp;
