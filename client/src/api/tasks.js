import { callGetApi } from "./api";

export async function userTasksApi() {
    try {
        const response = await callGetApi({ url: "task/getTaskByUser"});
        return response;
    } catch (error) {
        throw error;
    }
}