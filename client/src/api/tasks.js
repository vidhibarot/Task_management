import { callGetApi, callPostApi } from "./api";

export async function userTasksApi() {
    try {
        const response = await callGetApi({ url: "task/getTaskByUser" });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getTaskByProject(data) {
    try {
        const response = await callPostApi({ url: "task/getTaskByProject", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
export async function addTaskApi(data) {
    try {
        const response = await callPostApi({ url: "task/addTask", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
