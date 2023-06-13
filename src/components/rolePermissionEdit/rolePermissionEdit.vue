<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="创建时间">
                <el-date-picker v-model="entity.createTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="更新时间">
                <el-date-picker v-model="entity.updateTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="权限">
                <el-select v-model="entity.permissionIds" placeholder="请选择" :multiple="true">
                    <el-option v-for="item in PermissionData" :key="item.id" :label="item.description" :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="角色">
                <el-select v-model="entity.roleId" placeholder="请选择">
                    <el-option v-for="item in roleArr" :key="item.id" :label="item.roleName" :value="item.id" />
                </el-select>
            </el-form-item>

        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { allRole } from "@/http/roleApi/roleApi"
import {
    allPermission,
} from "@/http/permissionApi/permissionApi";
import { one, add, edit } from "@/http/rolePermissionApi/rolePermissionApi"
import { success, fail } from "@/utils/msg/msg";
import { useUserStore } from "@/store/user";
export default {
    props: { id: Number },
    mounted() {
        const userStore = useUserStore();
        const { token } = userStore;
        console.log('token：' + token)
        console.log('弹窗收到的id' + this.id)
        this.change()
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                createTime: '',
                roleId: 0,
                permissionIds: '',
                updateTime: 0,
            },
            entity2: {},
            roleArr: [],
            PermissionData: [],
        }
    },
    methods: {
        sure() {
            var arr=this.entity.permissionIds
            var str=""
            for(var i=0;i<arr.length;i++){
            if(i===arr.length-1)
            str+=arr[i]
            else
            str+=arr[i]+","
            }
            this.entity2=JSON.parse(JSON.stringify(this.entity))
            this.entity2.permissionIds= str
            this.id == 0 ? this.doCreate() : this.edit()
        },
        change(){
        },
        doCreate() {
            this.entity2.id=null
            console.log('新建的:' + JSON.stringify(this.entity))
            add(this.entity2).then(resp => {
                success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity2).then(resp => {
                success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            console.log('触发了get方法')
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.school
                    this.entity.permissionIds= this.entity.permissionIds.split(',').map(Number)
                })
            }
            allRole().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.roleArr = resp.data.roles
            })
            allPermission().then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.PermissionData = resp.data.permissions
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
