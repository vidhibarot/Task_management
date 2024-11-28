import { callGetApi, callPostApi } from "./api";

export async function getAllProjectsApi() {
    try {
        const response = await callGetApi({ url: "projects/getAllprojects"});
        return response;
    } catch (error) {
        throw error;
    }
}

export async function AddProjectsApi(data) {
    try {
        const response = await callPostApi({ url: "projects/addProject",body: data});
        return response;
    } catch (error) {
        throw error;
    }
}