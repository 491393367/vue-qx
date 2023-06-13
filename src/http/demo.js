import instance from "./axios";
const userRoleAdd=(data)=>{
    return instance.request({
        url:'api/userRole/add',
        method:'post',
        data
    })
}

const userinfo_add=(data)=>{
    return instance.request({
        url:'api/userinfo/add',
        method:'post',
        data
    })
}

const getRoleIdsByUserId=(params)=>{
    return instance.request({
        url:'api/userRole/getRoleIdsByUserId',
        params
    })
}

const userinfo_one=(params)=>{
    return instance.request({
        url:'api/userinfo/one',
        params
    })
}

const userRoleUpdate=(data)=>{
    return instance.request({
        url:'api/userRole/saveOrUpdate',
        method:'post',
        data
    })
}

const userinfo_edit=(data)=>{
    return instance.request({
        url:'api/userinfo/edit',
        method:'post',
        data
    })
}

const userinfo_all=()=>{
    return instance.request({
        url:'api/userinfo/all',
    })
}

const userinfo_delete=(params)=>{
    return instance.request({
        url:'api/userinfo/delete',
        params
    })
}


export {
    userRoleAdd,
    userinfo_add,

    getRoleIdsByUserId,
    userinfo_one,

    userinfo_delete,

    userRoleUpdate,
    userinfo_edit,

    userinfo_all,
} 