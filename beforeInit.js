var resp = {
  result: 0,
  nodes: []
};

if (${settings.storage_backup:true}) {
  resp.nodes.push({
    nodeType: "storage-backup",
    nodeGroup: "storage",
    skipNodeEmails: true,
    fixedCloudlets: 1,
    cloudlets: 4,
    diskLimit: 20
  });
}
 
  resp.nodes.push({
    nodeType: "ubuntu-vps",
  tag: ${settings.ubuntu_version},
  skipNodeEmails: true,
  fixedCloudlets: 1,
  cloudlets: 4,
  nodeGroup: "cp",
    env: [
      "JELASTIC_PORTS: 3050, 21"
    ],
    volumes: [
      "/opt/firebird/",
      "/opt/firebird/logs/",
      "/opt/firebird/data/",
      "/backup/"
    ]
  });
  
  
return resp;