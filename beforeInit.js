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
for (var i = 0; i < quotas.length; i++){
  var q = quotas[i], n = toNative(q.quota.name);

  if (n == maxCloudletsPerRec && maxCloudlets > q.value){
      err(q, "required", maxCloudlets, true);
      prod  = false; 
  }
  
  if (n == perEnv && nodesPerEnvMin > q.value){
      if (!markup) err(q, "required", nodesPerEnvMin, true);
      prod = false;
  }

 if (n == perNodeGroup && nodesPerGroupMin > q.value){
      if (!markup) err(q, "required", nodesPerGroupMin, true);
      prod = false;
  }


if (!prod || group.groupType == 'trial') {
  fields["ippublic"].disabled = true;
  fields["ippublic"].value = false;

  fields["displayfield"].markup = "Advanced features are not available.";
  fields["displayfield"].cls = "warning";
  fields["displayfield"].hideLabel = true;
  fields["displayfield"].height = 25;

  
  
  settings.fields.push(
    {"type": "compositefield","height": 0,"hideLabel": true,"width": 0,"items": [{"height": 0,"type": "string","required": true}]}
  );
}

return {
    result: 0,
    settings: settings
};

function err(e, text, cur, override){
  var m = (e.quota.description || e.quota.name) + " - " + e.value + ", " + text + " - " + cur + ". ";
  if (override) markup = m; else markup += m;
}