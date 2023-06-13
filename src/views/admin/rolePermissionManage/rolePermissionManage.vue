<template>
    <div>
        <div class="up">
            <el-button  type="success" @click="doAdd()">添加数据</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="角色权限列表">
                    <slot>
                        <el-table-column label="权限" width="300">
                            <template #default="scope">
                               <span>{{ getDescription(scope.row.permissionIds)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="角色" width="230">
                            <template #default="scope">
                               <span>{{ getRole(scope.row.roleId) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" width="300">
                            <template #default="scope">
                               <span>{{ changeDate(scope.row.createTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="更新时间" width="300">
                            <template #default="scope">
                               <span>{{ changeDate(scope.row.updateTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button size="small" type="primary" @click="doEdit(scope.row.id)">
                                    <el-icon size="18px" :color="color">
                                        <Edit />
                                    </el-icon>
                                </el-button>
                                <el-button size="small" type="danger" @click="doDelete(scope.row.id)">
                                    <el-icon size="18px" :color="color">
                                        <Delete />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="33%" title="角色权限信息">
            <RolePermissionEdit :id="choiceId" @doCancel="doCancel"></RolePermissionEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import {
    allRole
} from "@/http/roleApi/roleApi";
import {
    allPermission,
} from "@/http/permissionApi/permissionApi";
import {
    del,
    allRolePermission
} from "@/http/rolePermissionApi/rolePermissionApi";
import { success, fail } from "@/utils/msg/msg";
import RolePermissionEdit from '../../../components/rolePermissionEdit/rolePermissionEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
    },
    data() {
        return {
            data: [], 
            column: [],
            RoleData:[],
            PermissionData:[],
            visible: false,
            choiceId: 0,

            queryEntity: {
                pid: ''
            }
        };
    },
    methods: {
        //打开编辑弹窗
        doEdit(id) {
            this.choiceId = id
            this.visible = true
            console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
        },
        //打开新建弹窗
        doAdd() {
            console.log('触发了添加方法')
            this.choiceId = 0
            this.visible = true
        },
        //弹窗关闭
        doCancel() {
            this.visible = false
            this.all()
        },
        //删除
        doDelete(id) {
            console.log('删除的id:' + id)
            del({ id: id }).then(resp => {
                success('删除成功')
                this.all()
            })
        },
        //获取所有专业数据
        all() {
            allRolePermission().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.rolePermissions
            })
            allRole().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.RoleData = resp.data.roles
            })
            allPermission().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.PermissionData = resp.data.permissions
            })
        },
        getRole(id){
            for(var i=0;i<this.RoleData.length;i++){
                if(this.RoleData[i].id===id){
                    return this.RoleData[i].roleName
                }
            }
            return "查询失败"
        },

        getDescription(ids){
            var res=''
            var idarr=ids.split(',').map(Number)
            for(var i=0;i<idarr.length;i++){
                for(var j=0;j<this.PermissionData.length;j++){
                    if(this.PermissionData[j].id===idarr[i]){
                        if(res!=="")
                        res+=", "+this.PermissionData[j].description
                        else
                        res+=this.PermissionData[j].description
                        break
                    }
                }
            }
            if(res===''){
                return "查询失败"
            }
            return res
        },
        changeDate (value){
            var dt = new Date(value)
            let year = dt.getFullYear()
            let month = (dt.getMonth() + 1).toString().padStart(2,'0')
            let date = dt.getDate().toString().padStart(2,'0')
            let hour = dt.getHours().toString().padStart(2,'0')
            let minute = dt.getMinutes().toString().padStart(2,'0')
            let second = dt.getSeconds().toString().padStart(2,'0')
            return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`
        },
        //规定列表每列名称和显示的属性 
        buildColumn() {
            return [
            ];
        }
    },
    components: { ListView, RolePermissionEdit }
}
</script>
<style  scoped>
.up {
    position: absolute;
    right: 100px;
    top: 40px;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
