import{ak as v,_ as w,C as p,K as P,E as c,o as B,c as U,b as e,w as o,e as $,f as q,h as F,i as u,a as M,an as N,j as D,k as G,l as j,m as A}from"./index-2507e11a.js";const K=n=>v.request({url:"api/rolePermission/all",params:n}),z=n=>v.request({url:"api/rolePermission/add",method:"post",data:n}),H=n=>v.request({url:"api/rolePermission/edit",method:"post",data:n});const J={class:"dialog-footer"},L={__name:"rolePermission",setup(n){const d=p(!1),g=p([]),m=p(!0),s=p({id:"",roleId:"",permissionIds:""});P(()=>{I()});const I=async()=>{const t=await K();if(t.code!==1)return c("数据获取失败");g.value=t.data.rolePermissions,console.log(t),console.log(t.code)},y=()=>{s.value={id:"",roleId:"",permissionIds:""},m.value=!0,d.value=!0},V=async t=>{if(m){const l=await z(t.value);console.log(l)}else{const l=await H(t.value);console.log(l)}},E=t=>{m.value=!1,d.value=!0,s.value={...t},console.log(t)},b=async t=>{N.confirm("是否删除该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{b({id:val.id}).then(l=>{l.code===1?(c({type:"success",message:"删除成功"}),this.findPage()):c({type:"error",message:"删除失败"})})}).catch(()=>{c({type:"info",message:"取消删除"})})};return(t,l)=>{const i=$,r=D,k=q,_=G,f=j,C=A,x=F;return B(),U("div",null,[e(i,{type:"primary",onClick:y},{default:o(()=>[u("添加用户")]),_:1}),e(k,{data:g.value},{default:o(()=>[e(r,{prop:"id",label:"id",align:"center"}),e(r,{prop:"roleId",label:"roleId",align:"center"}),e(r,{prop:"permissionIds",label:"permissionIds",align:"center"}),e(r,{prop:"createTime",label:"createTime",align:"center"}),e(r,{prop:"updateTime",label:"updateTime",align:"center"}),e(r,{label:"操作"},{default:o(a=>[e(i,{type:"primary",onClick:T=>E(a.row)},{default:o(()=>[u("编辑")]),_:2},1032,["onClick"]),e(i,{type:"danger",onClick:T=>b(a.row.id)},{default:o(()=>[u("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),e(x,{modelValue:d.value,"onUpdate:modelValue":l[5]||(l[5]=a=>d.value=a),title:m.value?"添加学生信息":"修改学生信息"},{footer:o(()=>[M("span",J,[e(i,{onClick:l[3]||(l[3]=a=>d.value=!1)},{default:o(()=>[u("取消")]),_:1}),e(i,{type:"primary",onClick:l[4]||(l[4]=a=>V("form"))},{default:o(()=>[u(" 确定 ")]),_:1})])]),default:o(()=>[e(C,{model:s.value},{default:o(()=>[e(f,{label:"id",prop:"id"},{default:o(()=>[e(_,{modelValue:s.value.id,"onUpdate:modelValue":l[0]||(l[0]=a=>s.value.id=a),autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(f,{label:"roleId",prop:"roleId"},{default:o(()=>[e(_,{modelValue:s.value.roleId,"onUpdate:modelValue":l[1]||(l[1]=a=>s.value.roleId=a),autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(f,{label:"permissionIds",prop:"permissionIds"},{default:o(()=>[e(_,{modelValue:s.value.permissionIds,"onUpdate:modelValue":l[2]||(l[2]=a=>s.value.permissionIds=a),autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])}}},Q=w(L,[["__scopeId","data-v-af5dbfc6"]]);export{Q as default};
