import { post, get } from "../Index/Index"

const BASE_URL = "roleFrontendMenu/"

const add = (data) => {
    return post(BASE_URL + 'add', data)
}

const edit = (data) => {
    return post(BASE_URL + 'edit', data)
}

const getFrontendMenuIdsByRoleId = (params) => {
    return get(BASE_URL + 'getFrontendMenuIdsByRoleId', params)
}

export {
    edit,
    add,
    getFrontendMenuIdsByRoleId
}