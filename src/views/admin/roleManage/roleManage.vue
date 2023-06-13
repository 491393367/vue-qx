<template>
    <div>
        <div class="up">
            <el-button  type="success" @click="doAdd()">添加数据</el-button>
        </div>
        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="角色列表" >
                    <slot>
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
                        <el-table-column label="状态" width="80">
                            <template #default="scope">
                               <span>{{ scope.row.status == 0 ? '未激活' : '激活' }}</span>
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

        <el-dialog v-model="visible" v-if="visible" width="33%" title="角色信息">
            <RoleEdit :id="choiceId" @doCancel="doCancel"></RoleEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import {
    del,
    allRole
} from "@/http/roleApi/roleApi";

import { success, fail } from "@/utils/msg/msg";
import RoleEdit from '../../../components/roleEdit/roleEdit.vue';

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
                // this.data = resp.
            })
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
        //获取所有专业数据
        all() {
            allRole().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.roles
            })
        },
        //规定列表每列名称和显示的属性 
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "description", label: "描述", width: 200 },
                { prop: "roleName", label: "角色名", width: 230 },
            ];
        }
    },
    components: { ListView, RoleEdit }
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
