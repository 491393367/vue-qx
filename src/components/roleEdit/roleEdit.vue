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

            <el-form-item label="角色名">
                <el-input v-model="entity.roleName" />
            </el-form-item>

            <el-form-item label="状态">
                <el-select v-model="entity.status" placeholder="请选择">
                    <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value" />
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
import { one, add, edit } from "@/http/roleApi/roleApi"
import { success, fail } from "@/utils/msg/msg";
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
                description: '',
                roleName: '',
                status: '',
                updateTime: 0,
            },
            statusArr: [
                { value: 0, label: '未激活' },
                { value: 1, label: '激活' }
            ],
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.doCreate() : this.edit()
        },
        doCreate() {
            this.entity.id=null
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
                    this.entity = resp.data.role
                })
            }
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
