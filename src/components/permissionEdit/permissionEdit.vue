<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="创建时间">
                <el-date-picker v-model="entity.createTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="更新时间">
                <el-date-picker v-model="entity.updateTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="描述">
                <el-input v-model="entity.description" type="textarea" :rows="3" />
            </el-form-item>

            <el-form-item label="code">
                <el-input v-model="entity.code" />
            </el-form-item>

            <el-form-item label="是由有子权限">
                <el-select v-model="entity.hasChildren" placeholder="请选择">
                    <el-option v-for="item in hasChildrenArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="父级">
                <el-select v-model="entity.pid" placeholder="请选择">
                    <el-option v-for="item in permissionArr" :key="item.description" :label="item.description" :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="类型">
                <el-input v-model="entity.type" />
            </el-form-item>
            <el-form-item label="权限路径">
                <el-input v-model="entity.url" />
            </el-form-item>

        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit, allPermission } from "@/http/permissionApi/permissionApi"
import { success, fail } from "@/utils/msg/msg";
import { getDate } from "@/utils/getDate/getDate";
import { useUserStore } from "@/store/user";
export default {
    props: { id: Number },
    mounted() {
        const userStore = useUserStore();
        const { token } = userStore;
        console.log('token：' + token)
        console.log('弹窗收到的id' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                createTime: '',
                deleted: 0,
                code: '',
                description: '',
                hasChildren: '',
                pid: '',
                updateTime: 0,
                type: '',
                url: ''
            },
            hasChildrenArr: [
                { value: 0, label: '没有' },
                { value: 1, label: '有' }
            ],
            permissionArr: [],
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
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.permission
                })
            }

            allPermission().then(resp => {
                console.log('allPermission：' + JSON.stringify(resp))

                this.permissionArr = resp.data.permissions
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
