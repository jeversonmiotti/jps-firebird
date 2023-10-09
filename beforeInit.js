import com.hivext.api.Response;
import org.yaml.snakeyaml.Yaml;
import com.hivext.api.core.utils.Transport;

var cdnAppid = "c05ffa5b45628a2a0c95467ebca8a0b4";
var lsAppid = "9e6afcf310004ac84060f90ff41a5aba";
var group = jelastic.billing.account.GetAccount(appid, session);
var isCDN = jelastic.dev.apps.GetApp(cdnAppid);
var isLS = jelastic.dev.apps.GetApp(lsAppid);

//checking quotas
var perEnv = "environment.maxnodescount",
      maxEnvs = "environment.maxcount",
      perNodeGroup = "environment.maxsamenodescount",
      maxCloudletsPerRec = "environment.maxcloudletsperrec";
var nodesPerEnvWO_Bl = 9,
      nodesPerEnvWO_GlusterFS = 7,
      nodesPerEnvMin = 6,
      nodesPerGroupMin = 2,
      maxCloudlets = 16,
      markup = "", cur = null, text = "used", prod = true;

var settings = jps.settings;
var fields = {};
for (var i = 0, field; field = jps.settings.fields[i]; i++)
  fields[field.name] = field;

var quotas = jelastic.billing.account.GetQuotas(perEnv + ";"+maxEnvs+";" + perNodeGroup + ";" + maxCloudletsPerRec ).array;
var group = jelastic.billing.account.GetAccount(appid, session);


if (!prod && !dev || group.groupType == 'trial') {
  for (var i = 0, n = f.length; i < n; i++)
      if (f[i].type == "compositefield") {
          for (var j = 0, l = f[i].items.length; j < l; j++)  f[i].items[j].disabled = true;
      } else f[i].disabled = true;

  f[2].hidden = false;
  f[2].disabled = false;
  f[2].markup =  "Production and Development topologies are not available. " + markup + "Please upgrade your account.";
  if (group.groupType == 'trial')
      f[2].markup = "Production and Development topologies are not available for " + group.groupType + " account. Please upgrade your account.";
  f[2].height =  60;
  f[4].value = false;
  f[4]['default'] = false;

  f.push({
      "type": "compositefield",
      "height": 0,
      "hideLabel": true,
      "width": 0,
      "items": [{
          "height": 0,
          "type": "string",
          "required": true,
      }]
  });
}

return {
    result: 0,
    settings: settings
};

function err(e, text, cur, override){
  var m = (e.quota.description || e.quota.name) + " - " + e.value + ", " + text + " - " + cur + ". ";
  if (override) markup = m; else markup += m;
}