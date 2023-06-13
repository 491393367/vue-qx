import{ak as u,_ as D,d as k,o as v,c as F,b as l,w as a,a as s,F as q,an as V,E as p,m as C,e as E,h as U,f as B,ac as r,i as h,l as $,k as L,j as W}from"./index-2507e11a.js";/* empty css                   */const N=e=>u.request({url:"api/school/add",method:"post",data:e}),T=()=>u.request({url:"api/school/all",method:"get"}),_=e=>u.request({url:"api/school/checkname",method:"get",params:e}),I=e=>u.request({url:"api/school/colums",method:"get",params:e}),z=e=>u.request({url:"api/school/delete",method:"get",params:e}),A=e=>u.request({url:"api/school/edit",method:"post",data:e}),M=e=>u.request({url:"api/school/enable",method:"get",params:e}),Q=e=>u.request({url:"api/school/one",method:"get",params:e}),S=e=>u.request({url:"api/school/search",method:"post",data:e}),f={add:N,all:T,checkName:_,getCommunitiesByColums:I,remove:z,update:A,query:M,one:Q,getSchoolsByRegion:S};const j=k({data(){return{list:[],school:{},dialogFormVisible:!1,queryForm:{id:""},dialogFormVisible:!1,dialogData:{}}},mounted(){this.fetchData()},methods:{fetchData(){f.all().then(e=>{console.log(e),this.list=e.data.schools})},handleQuery(){const e={id:this.queryForm.id};f.one(e).then(o=>{console.log(o),this.dialogData=o.data.school,this.dialogVisible=!0}).catch(o=>{V.alert("查询失败，请重试","错误",{confirmButtonText:"确定",type:"error"}),console.error(o)})},handleDelete(e){const o={id:e};V.confirm("您是否需要删除该学校?","提示",{confirmButtonText:"ok",cancelButtonText:"no",type:"warning"}).then(()=>{f.remove(o).then(b=>{b.success?(p({type:"success",message:"删除成功"}),this.fetchData()):p({type:"error",message:"网络出问题，联系管理员"})})}).catch(()=>{p({type:"warning",message:"取消删除"})})},handleEdit(e){this.dialogFormVisible=!0;const o={id:e};f.one(o).then(b=>{this.school=b.data.school})},toAdd(){this.school={},this.dialogFormVisible=!0},confirm(){this.school.id==null?f.add(this.school).then(e=>{e.success?(p({type:"success",message:"添加成功"}),this.fetchData()):p({type:"error",message:"网络出问题，联系管理员"}),this.dialogFormVisible=!1}):(f.update(this.school).then(e=>{e.success?(p({type:"success",message:"编辑成功"}),this.fetchData()):p({type:"error",message:"网络出问题，联系管理员"})}),this.dialogFormVisible=!1)}}}),R={class:"footer-container"},G={class:"query-form"},H={class:"root"},J={class:"dialog-footer"},K={class:"table"};function O(e,o,b,P,X,Y){const d=$,c=C,m=E,g=U,n=L,i=W,w=B;return v(),F(q,null,[l(g,{modelValue:e.dialogVisible,"onUpdate:modelValue":o[1]||(o[1]=t=>e.dialogVisible=t),title:"查询结果",width:"30%"},{default:a(()=>[l(c,{model:e.dialogData},{default:a(()=>[l(d,{label:"省份"},{default:a(()=>[s("span",null,r(e.dialogData.province),1)]),_:1}),l(d,{label:"城市"},{default:a(()=>[s("span",null,r(e.dialogData.city),1)]),_:1}),l(d,{label:"县"},{default:a(()=>[s("span",null,r(e.dialogData.area),1)]),_:1}),l(d,{label:"学校名称"},{default:a(()=>[s("span",null,r(e.dialogData.schoolName),1)]),_:1}),l(d,{label:"学校说明"},{default:a(()=>[s("span",null,r(e.dialogData.description),1)]),_:1}),l(d,{label:"纬度"},{default:a(()=>[s("span",null,r(e.dialogData.latitude),1)]),_:1}),l(d,{label:"经度"},{default:a(()=>[s("span",null,r(e.dialogData.longitude),1)]),_:1}),l(d,{label:"学校"},{default:a(()=>[s("span",null,r(e.dialogData.school),1)]),_:1}),l(d,{label:"是否启用"},{default:a(()=>[s("span",null,r(e.dialogData.enable),1)]),_:1}),l(d,{label:"住址"},{default:a(()=>[s("span",null,r(e.dialogData.address),1)]),_:1})]),_:1},8,["model"]),s("div",R,[l(m,{onClick:o[0]||(o[0]=t=>e.dialogVisible=!1)},{default:a(()=>[h("关闭")]),_:1})])]),_:1},8,["modelValue"]),s("div",G,[l(c,{model:e.queryForm,inline:""},{default:a(()=>[l(d,{label:""},{default:a(()=>[l(n,{modelValue:e.queryForm.id,"onUpdate:modelValue":o[2]||(o[2]=t=>e.queryForm.id=t),placeholder:"请输入id",clearable:""},null,8,["modelValue"])]),_:1}),l(d,null,{default:a(()=>[l(m,{type:"primary",onClick:e.handleQuery},{default:a(()=>[h("查询")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),s("div",H,[l(m,{type:"success",plain:"",onClick:e.toAdd},{default:a(()=>[h("新增")]),_:1},8,["onClick"]),l(g,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":o[14]||(o[14]=t=>e.dialogFormVisible=t),title:"学校表单"},{footer:a(()=>[s("span",J,[l(m,{onClick:o[12]||(o[12]=t=>e.dialogFormVisible=!1)},{default:a(()=>[h("取消")]),_:1}),l(m,{type:"primary",onClick:o[13]||(o[13]=t=>e.confirm())},{default:a(()=>[h(" 确定 ")]),_:1})])]),default:a(()=>[l(c,{model:e.school},{default:a(()=>[l(d,{label:"省份","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.province,"onUpdate:modelValue":o[3]||(o[3]=t=>e.school.province=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"城市","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.city,"onUpdate:modelValue":o[4]||(o[4]=t=>e.school.city=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"市|县","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.area,"onUpdate:modelValue":o[5]||(o[5]=t=>e.school.area=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"学校名称","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.schoolName,"onUpdate:modelValue":o[6]||(o[6]=t=>e.school.schoolName=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"纬度","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.latitude,"onUpdate:modelValue":o[7]||(o[7]=t=>e.school.latitude=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"经度","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.longitude,"onUpdate:modelValue":o[8]||(o[8]=t=>e.school.longitude=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"是否启用","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.enable,"onUpdate:modelValue":o[9]||(o[9]=t=>e.school.enable=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"学校说明","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.description,"onUpdate:modelValue":o[10]||(o[10]=t=>e.school.description=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(d,{label:"地址","label-width":e.formLabelWidth},{default:a(()=>[l(n,{modelValue:e.school.address,"onUpdate:modelValue":o[11]||(o[11]=t=>e.school.address=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),s("div",K,[l(w,{data:e.list,style:{width:"100%"}},{default:a(()=>[l(i,{fixed:"",prop:"id",label:"id",width:"80",align:"center"}),l(i,{prop:"province",label:"省份",width:"80",align:"center"}),l(i,{prop:"city",label:"城市",width:"80",align:"center"}),l(i,{prop:"area",label:"市|县",width:"80",align:"center"}),l(i,{prop:"schoolName",label:"学校名称",width:"170",align:"center"}),l(i,{prop:"latitude",label:"纬度",width:"100",align:"center"}),l(i,{prop:"longitude",label:"经度",width:"150",align:"center"}),l(i,{prop:"enable",label:"是否启用",width:"80",align:"center"}),l(i,{prop:"description",label:"学校说明",width:"80",align:"center"}),l(i,{prop:"address",label:"地址",width:"250",align:"center"}),l(i,{prop:"createTime",label:"创建时间",width:"250",align:"center"}),l(i,{prop:"updateTime",label:"修改时间",width:"250",align:"center"}),l(i,{fixed:"right",label:"权限",width:"150",align:"center"},{default:a(t=>[l(m,{type:"info",plain:"",size:"small",onClick:y=>e.handleEdit(t.row.id)},{default:a(()=>[h("编辑")]),_:2},1032,["onClick"]),l(m,{type:"danger",plain:"",size:"small",onClick:y=>e.handleDelete(t.row.id)},{default:a(()=>[h("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])])])],64)}const ee=D(j,[["render",O],["__scopeId","data-v-1c5cca69"]]);export{ee as default};
