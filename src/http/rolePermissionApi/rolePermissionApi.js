import { post, get } from "../Index/Index"

const BASE_URL = "rolePermission/"

const add = (data) => {
    return post(BASE_URL + 'add', data)
}

const del = (params) => {
    return get(BASE_URL + 'delete', params)
}

const edit = (data) => {
    return post(BASE_URL + 'edit', data)
}

const one = (params) => {
    return get(BASE_URL + 'one', params)
}

const allRolePermission = () => {
    return get(BASE_URL + 'all')
}

export {
    edit,
    del,
    add,
    one,
    allRolePermission
}