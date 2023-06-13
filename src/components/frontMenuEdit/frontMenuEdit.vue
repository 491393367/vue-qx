<template>
    <div>
        <el-form :model="entity" label-width="120px">

            <el-form-item label="角色">
                <el-select v-model="entity.roleId" placeholder="请选择">
                    <el-option v-for="item in roleArr" :key="item.id" :label="item.roleName" :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="权限">
                <el-input v-model="entity.frontendMenuIds" />
            </el-form-item>

        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { add, edit } from "@/http/frontMenuApi/frontMenuApi"
import { allRole } from "@/http/roleApi/roleApi"
import { success, fail } from "@/utils/msg/msg";
export default {
    props: { frontMenu: {} },
    mounted() {
        if (this.frontMenu.id != 0) {
            this.entity = this.frontMenu
        }
        this.id = this.frontMenu.id
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                frontendMenuIds: '',
                roleId: 0,
            },
            id:0,
            roleArr:[]
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.doCreate() : this.edit()
        },
        doCreate() {
            console.log('新建的:' + JSON.stringify(this.entity))
            add(this.entity).then(resp => {
                success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity).then(resp => {
                success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            console.log('触发了get方法')
            allRole().then(resp => {
                console.log('allPermission：' + JSON.stringify(resp))
                this.roleArr = resp.data.roles
            })
        },
    },
}
</script>
<style  scoped>
.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
