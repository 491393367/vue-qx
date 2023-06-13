<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    userinfo_add,
    userinfo_one,
    userinfo_delete,
    userinfo_edit,
    userinfo_all,} from "../../../http/demo"
onMounted(()=>{ getTableData() })
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
        userinfo_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.userinfos
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('发生错误!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('发生错误!')
        })
    }else{
        userinfo_one({id:search.value}).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.userinfo]
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('发生错误!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('发生错误!')
        })
    }  
}
const handleEdit = (row) => {
  saveDto.value=JSON.parse(JSON.stringify(row))
  todo.value=1
  res.value=""
  saveVisible.value=true
}
const handleDelete = (row) => {
    userinfo_delete({id:row.id}).then(response => {
            if(response.success===true){
              getTableData()
              ElMessage({
                message: '删除成功!',
                type: 'success',
              })
            }else ElMessage.error('发生错误!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('发生错误!')
        })
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
    else updateData()
}
const insertData=()=>{
    userinfo_add(saveDto.value).then(response => {
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
const changeDate = (value) =>{
    var dt = new Date(value)
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2,'0')
    let date = dt.getDate().toString().padStart(2,'0')
    let hour = dt.getHours().toString().padStart(2,'0')
    let minute = dt.getMinutes().toString().padStart(2,'0')
    let second = dt.getSeconds().toString().padStart(2,'0')
    return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`
}
const updateData=()=>{
    userinfo_edit(saveDto.value).then(response => {
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
}
const open=(token)=>{
    var p=[]
    p.push(h('span',null,token))
    ElMessageBox({
        title: 'token',
        message: h('p', null, p,
        ),
    })
}
const shuaxin=()=>{
  search.value=null
  getTableData()
}

</script>
<template>
<div style="position: absolute; left: 0px;top: 20px;">
<p style="margin-top: 0px;margin-left: 10px;">用户信息列表</p>
<el-button @click="insertTableData" type="success" style="float: right;margin-right: 50px;">添加数据</el-button>
<el-input-number :controls="false" v-model="search"  placeholder="按编号查找" style="width: 100px;margin-right: 20px;"/>
<el-button  type="primary" @click="getTableData">搜索</el-button>
<el-table :data="tableData"  >
    <el-table-column label="编号" prop="id" width="80" />
    <el-table-column label="用户名称" prop="userName" width="180"/>
    <el-table-column label="用户类型" prop="userType" width="100"/>
    <el-table-column label="邮箱" prop="email" width="200"/>
    <el-table-column label="电话" prop="mobile" width="100"/>
    <el-table-column label="绑定" width="100" prop="binding" >
    <template #default="scope">
        {{scope.row.binding===1?"已绑定":"未绑定"}}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" prop="state" >
    <template #default="scope">
        {{scope.row.state===1?"已激活":"未激活"}}
      </template>
    </el-table-column>
    <!--<el-table-column label="密码" prop="password" width="100"/>
    <el-table-column label="标记删除" prop="deleted" width="100"/>-->
    <el-table-column label="token" width="80" prop="token" >
    <template #default="scope">
        <el-button size="small" type="primary" @click="open(scope.row.token)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="150" prop="createTime" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ changeDate(scope.row.createTime) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" width="150" prop="updateTime" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ changeDate(scope.row.updateTime) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="right" width="120">
      <template #default="scope">
        <el-button size="small" type="primary" @click="handleEdit(scope.row)">
            <el-icon size="18px" :color="color">
                <Edit />
            </el-icon>
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            <el-icon size="18px" :color="color">
                <Delete />
            </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="" style="float: right;margin-top: 20px;" :page-size="pageinfo.size" :pager-count="11" layout="prev, pager, next" v-model:total="pageinfo.total" v-model:current-page="pageinfo.current"/>
</div>
<el-dialog v-model="saveVisible" :title="title" width="30%">
    <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="编号" v-if="todo===0">
        <el-input type="number" v-model="saveDto.id" placeholder="请输入编号" clearable />
        </el-form-item>
        <el-form-item label="编号" v-else>
        <el-input type="number" disabled v-model="saveDto.id" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="用户名称">
        <el-input v-model="saveDto.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="saveDto.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="电话">
        <el-input v-model="saveDto.mobile" placeholder="请输入电话"/>
        </el-form-item>
        <el-form-item label="用户类型">
        <el-input v-model="saveDto.userType" placeholder="请输入用户类型"/>
        </el-form-item>
        <el-form-item label="token">
        <el-input v-model="saveDto.token" placeholder="请输入token"/>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="saveDto.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="标记删除">
        <el-input v-model="saveDto.deleted" placeholder="请输入标记删除"/>
        </el-form-item>
        <el-form-item label="状态">
        <el-select v-model="saveDto.state" class="m-2" placeholder="Select">
        <el-option
            v-for="item in [{label:'已激活',value:1},{label:'未激活',value:0}]"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        </el-form-item>
        <el-form-item label="绑定">
        <el-select v-model="saveDto.binding" class="m-2" placeholder="Select">
        <el-option
            v-for="item in [{label:'已绑定',value:1},{label:'未绑定',value:0}]"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            />
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