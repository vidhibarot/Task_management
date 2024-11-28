import { callPostApi } from "./api";

export async function userRegisterApi(data) {
    try {
        const response = await callPostApi({ url: "users/register", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
export async function userLoginApi(data) {
    try {
        const response = await callPostApi({ url: "users/userlogin", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function userListApi(data) {
    try {
        const response = await callPostApi({ url: "users/getAllUser"});
        return response;
    } catch (error) {
        throw error;
    }
}