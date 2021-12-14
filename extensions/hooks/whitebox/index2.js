"use strict";const{machineIdSync:e}=require("node-machine-id"),t=require("aguid"),o=require("os"),{v1:a}=require("uuid"),r=require("axios"),{throttle:c}=require("throttle-debounce"),n=require("bluebird");n.promisifyAll(require("fs-ext"));const l=require("queue");require("form-data"),require("hasha");module.exports=async({filter:i,action:s,init:u},d)=>{const f=Date.now(),p=e()+"_"+o.hostname()+"_"+o.userInfo().username;let h=l({concurrency:3,autostart:!0});function y(e,t,o){return r.post(d.env["WHITEBOX_"+e.toUpperCase()+"_URL"]+t+"?v="+Date.now(),o,{headers:{Authorization:"Bearer "+d.env["WHITEBOX_"+e.toUpperCase()+"_TOKEN"]}}).then((e=>e.data.success?n.resolve(e.data):(console.error("Api service error:",t,o,e.data.message),n.reject(e.data.message)))).catch((e=>(console.error("Api system error:",t,o,e),n.resolve())))}function E(e,o){const r="/"+e+"/"+o.id,c={passportId:a(),date:o.date_updated||o.data_created,vaultId:t(r),refId:o.url||r,type:o.layout,data:{stamp:f,importDate:new Date,meta:o}};return d.env.WHITEBOX_GLOBAL||(c.context=p,c.expire=d.env.WHITEBOX_EXPIRE||"10days"),c}if(n.resolve(),d.env.WHITEBOX_CLEAR||d.env.WHITEBOX_REFRESH){console.log("Clear whtiebox data");let e={};d.env.WHITEBOX_GLOBAL||(e.context=p),y("feed","/api/catalog/clear",e).then((()=>{if(d.clear)return r.post(d.env.WHITEBOX_STORAGE_URL+"/"+d.env.WHITEBOX_STORAGE_TOKEN+"/clear",{})})).catch((e=>console.error("Error clearing:",e)))}const m=c(1e3,(()=>{console.log("Clear cache");let e={};return d.env.WHITEBOX_GLOBAL||(e.context=p),y("feed","/api/catalog/clear/cache",e)})),{ItemsService:v}=d.services,I=await d.getSchema();let{collections:O}=I;const g=Object.keys(O).filter((e=>0!=e.indexOf("directus_"))).map((e=>O[e])).filter((e=>e.fields.target&&"whitebox"==e.fields.target.defaultValue));async function _({key:e,collection:t},o){const a=new v(t,{schema:o.schema,accountability:o.accountability,knex:o.database});let r=await a.readOne(e,{fields:["*"]});if("whitebox"==r.target&&r.layout&&!d.env.WHITEBOX_CLEAR){const e=E(t,r);h.push((()=>(m(),console.log("✔️",e.refId),y("feed","/api/catalog/keep/one",e))))}}async function B({key:e,collection:o},a){const r="/"+o+"/"+e,c=t(r);d.env.WHITEBOX_CLEAR||h.push((()=>(m(),console.log("🗑️",r),y("feed","/api/catalog/remove",{vaultId:c}))))}s("items.create",_),s("items.update",(async(e,t)=>{for(let o of e.keys)await _({key:o,collection:e.collection},t)})),s("items.delete",(async(e,t)=>{for(let t of e.payload)await B({key:t,collection:e.collection})})),u("app.after",(async()=>{for(let e of g){const t=new v(e.collection,{schema:I,knex:d.database}),o=await t.readByQuery({fields:["*"]});console.log("Items:",e.collection,o.length);for(let t of o)if("whitebox"==t.target&&t.layout&&!d.env.WHITEBOX_CLEAR){const o=E(e.collection,t);h.push((()=>(m(),console.log("✔️",o.refId),y("feed","/api/catalog/keep/one",o))))}}console.log("Application started")}))};