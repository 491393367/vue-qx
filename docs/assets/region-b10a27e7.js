import{ak as h,C as s,o as r,c as d,a as e,F as g,$ as b,ac as u}from"./index-2507e11a.js";function f(i){return h({url:`/api/region/pid?pid=${i}`,method:"get"})}const k=e("br",null,null,-1),L={border:"1"},m=e("tr",null,[e("th",null,"id"),e("th",null,"name"),e("th",null,"level"),e("th",null,"parent_id"),e("th",null,"操作")],-1),C=["onClick"],y={__name:"region",setup(i){const t=s(0),n=s([]),c=s([]);o();const p=()=>{t.value==0?alert("当前已经是最高级别了。"):(t.value=n.value[n.value.length-1],n.value.pop(),o())},_=a=>{n.value.push(t.value),t.value=a,o()};function o(){f(t.value).then(a=>{c.value=a.data.regions})}return(a,v)=>(r(),d("div",null,[e("div",null,[e("button",{type:"button",onClick:v[0]||(v[0]=l=>p())},"返回上一级")]),k,e("div",null,[e("table",L,[m,(r(!0),d(g,null,b(c.value,l=>(r(),d("tr",{key:l.id},[e("td",null,u(l.id),1),e("td",null,u(l.name),1),e("td",null,u(l.level),1),e("td",null,u(l.parentId),1),e("td",null,[e("button",{onClick:$=>_(l.id)},"进入下一级",8,C)])]))),128))])])]))}};export{y as default};