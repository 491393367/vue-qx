import{ak as g,_ as C,d as k,o as y,c as E,a as m,b as l,w as t,F as v,E as u,e as F,f as L,g as U,h as W,i as f,j as P,k as z,l as D,m as $}from"./index-2507e11a.js";import{c as A}from"./cloneDeep-28e68623.js";const q=e=>g.request({url:"api/config/add",method:"post",data:e}),B=e=>g.request({url:"api/config/delete",params:e}),N=e=>g.request({url:"api/config/edit",method:"post",data:e}),T=e=>g.request({url:"api/config/page",method:"post",data:e}),I=k({data(){return{config:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,config:{allowDel:!0,content:"",extend:"",group:"",id:0,name:"",rule:"",tip:"",title:"",type:"",value:"",weigh:0},formLabelWidth:80}},mounted(){this.getconfigPage(1)},methods:{toEdit(e){console.log(e),this.dialogFormVisible=!0,this.config=A(e)},getconfigPage(e){T({current:e,size:2}).then(s=>{console.log(s);const p=s.data.page;this.config=p.records,this.page=p}).catch(s=>{console.log(s)})},currentchange(e){this.getconfigPage(e),this.page.current=e},del(e){console.log(e),B({id:e}).then(s=>{if(s.success)this.getconfigPage(this.page.current),this.page.total%this.page.size==1?this.getAdCatesPage(this.page.current-1):this.getAdCatesPage(this.page.current);else return console.log(s.msg),!1}).catch(s=>{})},toAdd(){this.dialogFormVisible=!0,this.config={allowDel:!0,content:"",extend:"",group:"",id:0,name:"",rule:"",tip:"",title:"",type:"",value:"",weigh:0}},save(){const e=this.config;e.id==0?q(e).then(o=>{if(o.success)this.dialogFormVisible=!1,this.getconfigPage(this.page.current),u(o.msg);else return u(o.msg),!1}).catch(o=>{u("网络错误联系管理员")}):N(e).then(o=>{if(o.success)this.dialogFormVisible=!1,this.getconfigPage(this.page.current),u(o.msg);else return u(o.msg),!1}).catch(o=>{u("网络错误联系管理员")})}}}),j={class:"config"},M={class:"config-tools"},G={class:"dialog-footer"};function H(e,o,s,p,J,K){const r=F,i=P,b=L,h=U,n=z,d=D,c=$,V=W;return y(),E(v,null,[m("div",j,[m("div",M,[l(r,{type:"warning",onClick:e.toAdd},{default:t(()=>[f("添加")]),_:1},8,["onClick"])]),l(b,{data:e.config,style:{width:"100%"}},{default:t(()=>[l(i,{fixed:"",prop:"id",label:"#",width:"50"}),l(i,{prop:"name",label:"变量名"}),l(i,{prop:"group",label:"分组"}),l(i,{prop:"title",label:"变量标题"}),l(i,{prop:"tip",label:"变量描述"}),l(i,{prop:"type",label:"类型"}),l(i,{prop:"value",label:"变量值"}),l(i,{prop:"content",label:"字典数据"}),l(i,{prop:"rule",label:"验证规则"}),l(i,{prop:"extend",label:"扩展属性"}),l(i,{prop:"allow_del",label:"允许删除:0=否,1=是"}),l(i,{prop:"weigh",label:"权重"}),l(i,{fixed:"right",label:"操作",width:"120"},{default:t(a=>[l(r,{link:"",type:"primary",size:"small",onClick:w=>e.toEdit(a.row)},{default:t(()=>[f("更新")]),_:2},1032,["onClick"]),l(r,{link:"",type:"primary",size:"small",onClick:w=>e.del(a.row.id)},{default:t(()=>[f("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(h,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),l(V,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":o[12]||(o[12]=a=>e.dialogFormVisible=a),title:"类型编辑"},{footer:t(()=>[m("span",G,[l(r,{onClick:o[11]||(o[11]=a=>e.dialogFormVisible=!1)},{default:t(()=>[f("Cancel")]),_:1}),l(r,{type:"primary",onClick:e.save},{default:t(()=>[f(" 保存 ")]),_:1},8,["onClick"])])]),default:t(()=>[l(c,{model:e.config},{default:t(()=>[l(d,{label:"变量名","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.name,"onUpdate:modelValue":o[0]||(o[0]=a=>e.config.name=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"分组","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.group,"onUpdate:modelValue":o[1]||(o[1]=a=>e.config.group=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"变量标题","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.title,"onUpdate:modelValue":o[2]||(o[2]=a=>e.config.title=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"变量描述","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.deleted,"onUpdate:modelValue":o[3]||(o[3]=a=>e.config.deleted=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"类型","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.type,"onUpdate:modelValue":o[4]||(o[4]=a=>e.config.type=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"变量值","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.value,"onUpdate:modelValue":o[5]||(o[5]=a=>e.config.value=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"字典数据","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.content,"onUpdate:modelValue":o[6]||(o[6]=a=>e.config.content=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"验证规则","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.rule,"onUpdate:modelValue":o[7]||(o[7]=a=>e.config.rule=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"扩展属性","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.extend,"onUpdate:modelValue":o[8]||(o[8]=a=>e.config.extend=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"允许删除","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.allowDel,"onUpdate:modelValue":o[9]||(o[9]=a=>e.config.allowDel=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"权重","label-width":e.formLabelWidth},{default:t(()=>[l(n,{modelValue:e.config.weigh,"onUpdate:modelValue":o[10]||(o[10]=a=>e.config.weigh=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const R=C(I,[["render",H]]);export{R as default};