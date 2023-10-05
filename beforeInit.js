if (${settings.storage_backup:true}) {
  resp.nodes.push({
   nodeType: storage-backup
   nodeGroup: storage
   skipNodeEmails: true
   fixedCloudlets: 1
   cloudlets: 4
   diskLimit: 20
    }
  })
}