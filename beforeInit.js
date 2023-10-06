var resp = {
  result: 0,
  nodes: []
}

if ('${settings.storagebackup:false}'== 'true') {
  resp.nodes.push({
    nodeType: "storage-backup",
    nodeGroup: "storage",    
    fixedCloudlets: 1,
    cloudlets: 4,
    diskLimit: 20
  }, {
    if ('${settings.ippublic:false}'== 'true') {

      resp.nodes.push({
        nodeType: "ubuntu-vps",
        tag: ${settings.ubuntu_version},  
        fixedCloudlets: 1,
        cloudlets: 4,
        nodeGroup: "cp",
        extip: true,
        isSLBAccessEnabled: false,
          env: {
            JELASTIC_PORTS: "3050, 21"      
          },      
          volumes: [
            "/opt/firebird",
            "/opt/firebird/logs",
            "/opt/firebird/data",
            "/backup/"
          ]
        })
  
    }
    else {
      resp.nodes.push({
      nodeType: "ubuntu-vps",
      tag: ${settings.ubuntu_version},  
      fixedCloudlets: 1,
      cloudlets: 4,
      nodeGroup: "cp",
        env: {
          JELASTIC_PORTS: "3050, 21"      
        },      
        volumes: [
          "/opt/firebird",
          "/opt/firebird/logs",
          "/opt/firebird/data",
          "/backup/"
        ]
      }
  }
  })
} else {
  if ('${settings.ippublic:false}'== 'true') {

    resp.nodes.push({
      nodeType: "ubuntu-vps",
      tag: ${settings.ubuntu_version},  
      fixedCloudlets: 1,
      cloudlets: 4,
      nodeGroup: "cp",
      extip: true,
      isSLBAccessEnabled: false,
        env: {
          JELASTIC_PORTS: "3050, 21"      
        },      
        volumes: [
          "/opt/firebird",
          "/opt/firebird/logs",
          "/opt/firebird/data",
          "/backup/"
        ]
      })

  }
  else {
    resp.nodes.push({
    nodeType: "ubuntu-vps",
    tag: ${settings.ubuntu_version},  
    fixedCloudlets: 1,
    cloudlets: 4,
    nodeGroup: "cp",
      env: {
        JELASTIC_PORTS: "3050, 21"      
      },      
      volumes: [
        "/opt/firebird",
        "/opt/firebird/logs",
        "/opt/firebird/data",
        "/backup/"
      ]
    }
}
  
} 
return resp;