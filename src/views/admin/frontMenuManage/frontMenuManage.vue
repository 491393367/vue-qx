<template>
    <div>
        <div class="up">
            <el-input v-model="queryEntity.roleId" />
            <el-button plain type="success" @click="query()">
                <el-icon size="15px">
                    <Search />
                </el-icon>
                根据角色Id查询</el-button>

            <el-button plain type="success" @click="doAdd()">
                <el-icon size="15px" :color="color">
                    <Plus />
                </el-icon></el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="菜单列表">
                    <slot>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button plain type="primary" @click="doEdit(scope.row)">
                                    <el-icon size="18px" :color="color">
                                        <Edit />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="33%" title="菜单信息">
            <FrontMenuEdit :frontMenu="choiceIdRow" @doCancel="doCancel"></FrontMenuEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import {
    getFrontendMenuIdsByRoleId
} from "@/http/frontMenuApi/frontMenuApi";

import { success, fail } from "@/utils/msg/msg";
import FrontMenuEdit from '../../../components/frontMenuEdit/frontMenuEdit.vue';

export default {
    mounted() {
        this.column = this.buildColumn()
        // this.all()
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceIdRow: {},

            queryEntity: {
                roleId: ''
            }
        };
    },
    methods: {
        query() {
            getFrontendMenuIdsByRoleId(this.queryEntity).then(resp => {
                
                console.log('查询：' + JSON.stringify(resp))
                let arr = resp.msg == '成功' ? resp.data.ids : []
                this.data = []
                this.data.push({
                    roleId:this.queryEntity.roleId,
                    frontendMenuIds:arr
                })
                // this.data = resp.msg == '成功' ? resp.data.permissions : []
            })
        },
        //打开编辑弹窗
        doEdit(row) {
            this.choiceIdRow.id = 1
            this.choiceIdRow = row
            this.visible = true
            // console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
        },
        //打开新建弹窗
        doAdd() {
            console.log('触发了添加方法')
            this.choiceIdRow.id = 0
            this.visible = true
        },
        //弹窗关闭
        doCancel() {
            this.visible = false
            this.query()
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 70 },
                { prop: "frontendMenuIds", label: "权限", width: 120 },
                { prop: "roleId", label: "角色id", width: 200 },
            ];
        } 
    },
    components: { ListView, FrontMenuEdit }
}
</script>
<style  scoped>
.el-input {
    width: 200px;
}

.up {
    display: flex;
    justify-content: center;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
