import{ak as c,_ as V,d as C,o as R,c as k,a as h,b as o,w as a,F as E,E as n,e as y,f as _,g as F,h as P,i as u,j as v,k as z,l as A,m as $}from"./index-2507e11a.js";import{c as L}from"./cloneDeep-28e68623.js";const N=e=>c.request({url:"/api/classinfo/edit",method:"post",data:e}),U=e=>c.request({url:"/api/classinfo/add",method:"post",data:e}),W=e=>c.request({url:"/api/classinfo/all",method:"get",data:e}),j=e=>c.request({url:"/api/classinfo/delete",method:"get",params:e}),q=e=>c.request({url:"/api/classinfo/page",method:"post",data:e}),B=C({data(){return{communities:[],page:{colums:[],current:1,size:10},dialogFormVisible:!1,classEntity:{depart:"",id:0,major:"",name:"",school:"",state:0},choiceRow:{},formLabelWidth:80,isAdd:!1}},mounted(){this.getCommunitiesPage(1)},methods:{toEdit(e){console.log("既然你----"),this.choiceRow=L(e),this.dialogFormVisible=!0},getCommunitiesPage(e){W({current:1,size:1e3}).then(s=>{console.log("收到的回复："+JSON.stringify(s)),this.communities=s.data.classinfos,console.log("--------"+JSON.stringify(this.communities[0])),this.page=q}).catch(s=>{console.log(s)})},currentchange(e){this.getCommunitiesPage(e),this.page.current=e},del(e){console.log("id:---- "+e),console.log(e),j({id:e}).then(s=>{if(s.success)this.getCommunitiesPage(this.page.current),this.page.total%this.page.size==1?this.getAdCatesPage(this.page.current-1):this.getAdCatesPage(this.page.current);else return console.log(s.msg),!1}).catch(s=>{})},toAdd(){this.dialogFormVisible=!0,this.choiceRow=this.classEntity,this.isAdd=!0},save(){this.isAdd&&(console.log("添加方法"),this.isAdd=!1),console.log("添加的:"+JSON.stringify(this.choiceRow)),this.choiceRow.id===0?(console.log("进入添加方法------"),U(this.choiceRow).then(e=>{if(e.success)this.dialogFormVisible=!1,this.getCommunitiesPage(this.page.current),n(e.msg);else return n(e.msg),!1}).catch(e=>{n("网络错误联系管理员")})):N(this.choiceRow).then(e=>{if(e.success)this.dialogFormVisible=!1,this.getCommunitiesPage(this.page.current),n(e.msg);else return n(e.msg),!1}).catch(e=>{n("网络错误联系管理员")})}}}),I={class:"communities"},J={class:"choiceRow-tools"},O={class:"dialog-footer"};function S(e,l,s,T,D,M){const d=y,i=v,p=_,g=F,r=z,m=A,f=$,b=P;return R(),k(E,null,[h("div",I,[h("div",J,[o(d,{type:"warning",onClick:e.toAdd},{default:a(()=>[u("添加")]),_:1},8,["onClick"])]),o(p,{data:e.communities,style:{width:"100%"}},{default:a(()=>[o(i,{fixed:"",prop:"id",label:"#",width:"50"}),o(i,{prop:"name",label:"班级名称"}),o(i,{prop:"state",label:"状态"}),o(i,{prop:"depart",label:"学院"}),o(i,{prop:"school",label:"学校名称"}),o(i,{prop:"major",label:"专业"}),o(i,{fixed:"right",label:"操作",width:"120"},{default:a(t=>[o(d,{link:"",type:"primary",size:"small",onClick:w=>e.toEdit(t.row)},{default:a(()=>[u("更新")]),_:2},1032,["onClick"]),o(d,{link:"",type:"primary",size:"small",onClick:w=>e.del(t.row.id)},{default:a(()=>[u("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),o(g,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),o(b,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":l[6]||(l[6]=t=>e.dialogFormVisible=t),title:"广告类型编辑"},{footer:a(()=>[h("span",O,[o(d,{onClick:l[5]||(l[5]=t=>e.dialogFormVisible=!1)},{default:a(()=>[u("Cancel")]),_:1}),o(d,{type:"primary",onClick:e.save},{default:a(()=>[u(" 保存 ")]),_:1},8,["onClick"])])]),default:a(()=>[o(f,{model:e.choiceRow},{default:a(()=>[o(m,{label:"班级名称","label-width":e.formLabelWidth},{default:a(()=>[o(r,{modelValue:e.choiceRow.name,"onUpdate:modelValue":l[0]||(l[0]=t=>e.choiceRow.name=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(m,{label:"专业","label-width":e.formLabelWidth},{default:a(()=>[o(r,{modelValue:e.choiceRow.major,"onUpdate:modelValue":l[1]||(l[1]=t=>e.choiceRow.major=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(m,{label:"学院","label-width":e.formLabelWidth},{default:a(()=>[o(r,{modelValue:e.choiceRow.depart,"onUpdate:modelValue":l[2]||(l[2]=t=>e.choiceRow.depart=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(m,{label:"学校名称","label-width":e.formLabelWidth},{default:a(()=>[o(r,{modelValue:e.choiceRow.school,"onUpdate:modelValue":l[3]||(l[3]=t=>e.choiceRow.school=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(m,{label:"状态","label-width":e.formLabelWidth},{default:a(()=>[o(r,{modelValue:e.choiceRow.state,"onUpdate:modelValue":l[4]||(l[4]=t=>e.choiceRow.state=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const K=V(B,[["render",S]]);export{K as default};