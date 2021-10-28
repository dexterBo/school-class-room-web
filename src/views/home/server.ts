import request from '@/utils/request'

export async function getTableList(params?: JSONObject):Promise<Pagination<JSONObject[]>> {
  return request<Pagination<JSONObject[]>>('/question/query', {
    params
  });
}