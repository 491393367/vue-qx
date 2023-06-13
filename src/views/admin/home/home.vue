<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="!isCollapse"
      :router="true" 
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/home/roleManage">
        <el-icon><document /></el-icon>
        <template #title>角色管理</template>
      </el-menu-item>
      <el-menu-item index="/home/permissionManage">
        <el-icon><document /></el-icon>
        <template #title>权限管理</template>
      </el-menu-item>
      <el-menu-item index="/home/rolePermissionManage">
        <el-icon><document /></el-icon>
        <template #title>角色权限管理</template>
      </el-menu-item>  
      <el-menu-item index="/home/info">
        <el-icon><document /></el-icon>
        <template #title>用户信息</template>
      </el-menu-item>
      <el-menu-item index="/home/role">
        <el-icon><document /></el-icon>
        <template #title>按用户查角色</template>
      </el-menu-item>
    </el-menu>
    <div style="position: absolute;left: 175px;top: 20px;"><router-view></router-view></div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  
  const isCollapse = ref(true)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
  }
  </style>
  