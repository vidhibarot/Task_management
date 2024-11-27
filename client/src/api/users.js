import { callPostApi } from "./api";

export async function userRegisterApi(data) {
    console.log("data is tehrere", data)
    try {
        const response = await callPostApi({ url: "users/register", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
export async function userLoginApi(data) {
    console.log("data is tehrere", data)
    try {
        const response = await callPostApi({ url: "users/userlogin", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}