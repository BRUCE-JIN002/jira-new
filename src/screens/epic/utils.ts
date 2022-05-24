import { useProjectIdInUrl } from "screens/kanban/util";

//任务组为 id 的参数
export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
//任务组的queryKey
export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
