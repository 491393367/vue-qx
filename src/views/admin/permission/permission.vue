<template>
    <div>
        <div class="up">
            <el-input v-model="queryEntity.pid" />
            <el-button  type="success" @click="query()">
                <el-icon size="15px">
                    <Search />
                </el-icon>
                根据父级Id查询</el-button>
            <el-button  type="success" @click="clear()">
                刷新
            </el-button>

            <el-button   type="success" @click="doAdd()">
                添加数据</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="权限列表">
                    <slot>
                        <el-table-column label="父级" width="100">
                            <template #default="scope">
                               <span>{{ getP_description(scope.row.pid)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" width="260">
                            <template #default="scope">
                               <span>{{ changeDate(scope.row.createTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="更新时间" width="260">
                            <template #default="scope">
                               <span>{{ changeDate(scope.row.updateTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否有子权限" width="100">
                            <template #default="scope">
                               <span>{{ scope.row.hasChildren == 0 ? '没有' : '有' }}</span>
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

        <el-dialog v-model="visible" v-if="visible" width="33%" title="权限信息">
            <PermissionEdit :id="choiceId" @doCancel="doCancel"></PermissionEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import {
    del,
    allPermission,
    getPermissionByPid
} from "@/http/permissionApi/permissionApi";

import { success, fail } from "@/utils/msg/msg";
import PermissionEdit from '../../../components/permissionEdit/permissionEdit.vue';

export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceId: 0,

            queryEntity: {
                pid: ''
            }
        };
    },
    methods: {
        query() {
            getPermissionByPid(this.queryEntity).then(resp => {
                console.log('查询：' + JSON.stringify(resp))
                this.data = resp.msg == '成功' ? resp.data.permissions : []
            })
        },
        getP_description(id){
            console.log(this.data)
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].id==id){
                    return this.data[i].description
                }
            }
            return "查询失败"
        },
        clear() {
            this.queryEntity.pid = ''
            this.all()
        },
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
            allPermission().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.permissions
            })
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
                // { prop: "id", label: "编号", width: 70 },
                { prop: "description", label: "描述", width: 100 },
                { prop: "type", label: "类型", width: 100 },
                { prop: "url", label: "权限路径", width: 250 },
            ];
        }
    },
    components: { ListView, PermissionEdit }
}
</script>
<style  scoped>
.el-input{
    width: 200px;
}
.up {
    position: absolute;
    right: 50px;
    top: 40px;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
