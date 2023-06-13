<template>
    
    <div class="big">
        <div class="up">
           <!--菜单栏用于跳转页面-->
            <div class="center">
                <el-menu :default-active="activeIndex" 
                class="el-menu-vertical-demo" 
                mode="vertical" 
                :router="true" 
                active-text-color="#ffd04b"
                background-color="#545c64" 
                default-active="1"
                text-color="#fff">
                    <el-menu-item index="/home/roleManage">角色管理</el-menu-item>
                    <el-menu-item index="/home/permissionManage">权限管理</el-menu-item>
                    <el-menu-item index="/home/rolePermissionManage">角色权限管理</el-menu-item>
                    <el-menu-item index="/home/frontMenuManage">菜单管理</el-menu-item>
                </el-menu>
            </div>
        </div>

        <div class="down">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/home/role'
        }
    },
    methods: {
    },
}
</script>
<style  scoped>
.up {
    width: 10%;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-right: 1px solid gray;
}

.down {
    width: 88%;
    height: 100%;
    margin-left: 11%;
    position: absolute;
    overflow-y: auto;
}

.big {
    width: 100%;
    height: 100%;
    padding: 0px;
    display: flex;
}

body{
    padding: 0px;
    margin: 0px;
}
</style>
