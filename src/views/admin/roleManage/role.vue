<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { allRole } from "@/http/roleApi/roleApi"
import {
    userRoleAdd,
    getRoleIdsByUserId,
    userRoleUpdate,
    userinfo_all,
    } from "../../../http/demo"
onMounted(()=>{
    userinfo_all ().then(response => {
            if(response.success===true){
                userinfoAll.value=response.data.userinfos
            }else ElMessage.error(response.msg)
        }).catch(error => {
            console.log(error)
            ElMessage.error(error.response.data.data.validated_error[0])
        })
    allRole().then(resp => {
                roleArr.value = resp.data.roles
        })
})
const userinfoAll=ref([])
const roleArr=ref([])
const tableDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const saveVisible = ref(false)
const saveDto=ref({})
const pageinfo = ref({colums: [],current: 1,size: 8,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)})
const arrySort=()=>{
  tableDataAll.value=sortKey(tableDataAll.value,'id')
}
function sortKey(array,key){
                return array.sort(function(a,b){
                    var x = a[key];
                    var y = b[key];
                    return ((x<y)?-1:(x>y)?1:0)
                })
            }
const getTableData=()=>{
    if(search.value===null){
        ElMessage.error('先输入用户编号进行查询!')
    }else{
        getRoleIdsByUserId({userId:search.value}).then(response => {
            if(response.success===true){
              tableDataAll.value.push({userId:search.value,roleIds:response.data.roleIds})
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error(response.msg)
        }).catch(error => {
            console.log(error)
            ElMessage.error(error.response.data.msg)
        })
    } 
    userinfo_all ().then(response => {
            if(response.success===true){
                userinfoAll.value=response.data.userinfos
            }else ElMessage.error(response.msg)
        }).catch(error => {
            console.log(error)
            ElMessage.error(error.response.data.data.validated_error[0])
        })
    allRole().then(resp => {
                roleArr.value = resp.data.roles
        })
    } 
const getUser=(id)=>{
  for(var i=0;i<userinfoAll.value.length;i++){
    if(userinfoAll.value[i].id==id){
      return userinfoAll.value[i]
    }
  }
  return {userName:"查询不到用户",userType:"查询不到用户"}
}
const get1=(ids)=>{
    var res=''
    var idarr=ids.split(',').map(Number)
    for(var i=0;i<idarr.length;i++){
        for(var j=0;j<roleArr.value.length;j++){
            if(roleArr.value[j].id===idarr[i]){
                if(res!=="")
                res+=", "+roleArr.value[j].roleName
                else
                res+=roleArr.value[j].roleName
                break
            }
        }
    }
    if(res===''){
        return "查询失败"
    }
    return res
}
const handleEdit = (row) => {
  saveDto.value=JSON.parse(JSON.stringify(row))
  todo.value=1
  res.value=""
  saveVisible.value=true
}
const insertTableData= () => {
    saveDto.value={}
    todo.value=0
    res.value=""
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.cateName===""){res.value="分类名称不能为空!";return}
    if(todo.value===0) insertData()
    //else updateData()
}
const insertData=()=>{
    var arr=saveDto.value.roleIds
            var str=""
            for(var i=0;i<arr.length;i++){
            if(i===arr.length-1)
            str+=arr[i]
            else
            str+=arr[i]+","
            }
            var saveDto2=JSON.parse(JSON.stringify(saveDto.value))
            saveDto2.roleIds= str
    userRoleAdd(saveDto2).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '添加成功!',
                type: 'success',
              })
        }
    }).catch(error => {
        console.log(error.response.data.data.validated_error[0])
        res.value=error.response.data.data.validated_error[0]
    })
}
/*const changeDate = (value) =>{
    var dt = new Date(value)
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2,'0')
    let date = dt.getDate().toString().padStart(2,'0')
    let hour = dt.getHours().toString().padStart(2,'0')
    let minute = dt.getMinutes().toString().padStart(2,'0')
    let second = dt.getSeconds().toString().padStart(2,'0')
    return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`
}*/
/*const updateData=()=>{
    userRoleUpdate(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '修改成功!',
                type: 'success',
              })
        }
    }).catch(error => {
        console.log(error.response.data.data.validated_error[0])
        res.value=error.response.data.data.validated_error[0]
    })
}*/
/*const shuaxin=()=>{
  search.value=null
}*/
</script>
<template>
<div style="position: absolute; left: 0px;top: 20px;">
<el-button @click="insertTableData" type="success" style="float: right;margin-right: 50px;">添加数据</el-button>
<el-input-number :controls="false" v-model="search"  placeholder="按用户编号查询" style="width: 100px;margin-right: 20px;"/>
<el-button  type="primary" @click="getTableData">查询</el-button>
<p style="margin-top: 50px;margin-left: 10px;">查询历史记录</p>
<el-table :data="tableData"  >
    <el-table-column label="用户名" width="400">
        <template #default="scope">
            <span>{{ getUser(scope.row.userId).userName }}</span>
        </template>
    </el-table-column>
    <el-table-column label="角色" width="960">
        <template #default="scope">
            <span>{{ get1(scope.row.roleIds)}}</span>
        </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="" style="float: right;margin-top: 20px;" :page-size="pageinfo.size" :pager-count="11" layout="prev, pager, next" v-model:total="pageinfo.total" v-model:current-page="pageinfo.current"/>
</div>
<el-dialog v-model="saveVisible" :title="title" width="30%">
    <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="用户编号" v-if="todo===0">
        <el-input type="number" v-model="saveDto.userId" placeholder="请输入编号" clearable />
        </el-form-item>
        <el-form-item label="用户编号" v-else>
        <el-input type="number" disabled v-model="saveDto.userId" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="用户名">
        {{getUser(saveDto.userId).userName}}
        </el-form-item>
        <el-form-item label="角色">
            <el-select v-model="saveDto.roleIds" placeholder="请选择" :multiple="true">
                <el-option v-for="item in roleArr" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
        </el-form-item>
    </el-form>
    <p style="float: left;margin-left: 100px;margin-top: 0px;margin-bottom: 0px;color: red;">{{res}}</p>
    <template #footer>
      <span>
        <el-button @click="()=>{saveVisible=false}">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
</el-dialog>
</template>
<style scoped>
</style>