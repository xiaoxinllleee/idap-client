// 统一请求路径前缀在api/manage.js中修改
import { getAction, postAction, putAction } from '@/api/manage';

// 通过类型获取字典数据
export const getDictDataByType = (type, params) => {
  return getAction(`/dictData/getByType/${type}`, params)
}

// 通过用户名搜索
export const searchUserByName = (username, params) => {
  return getAction('/user/searchByName/'+username, params)
}

// 获取用户数据 多条件
export const getUserListData = (params) => {
  return getAction('/sys/user/list', params)
}

// 获取一级部门
export const initDepartment = (params) => {
  return getAction('/department/getByParentId/0', params)
}

// 加载部门子级数据
export const loadDepartment = (id, params) => {
  return getAction(`/department/getByParentId/${id}`, params)
}

// 搜索部门
export const searchDepartment = (params) => {
  return getAction('/department/search', params)
}



// 获取全部角色数据
  export const getAllRoleList = (params) => {
    return getAction('/sys/role/getrolelist', params)
  }

  //获取全部岗位数据
export const getAllPostList = (params) => {
  return getAction('/gwxxgl/hrBasPost/listAll', params)
}


// 导出模型
export const exportModel = "/actModel/export/"
// 通过文件部署模型流程
export const deployByFile = "/actModel/deployByFile"
// 导出流程资源
export const exportResource = "/actProcess/export"
// 获取高亮实时流程图
export const getHighlightImg = "/actProcess/getHighlightImg/"



// 获取模型
export const getModelDataList = (params) => {
    return getAction('/actModel/getByCondition', params)
}
// 添加模型
export const addModel = (params) => {
    return postAction('/actModel/add', params)
}
// 部署模型
export const deployModel = (id, params) => {
    return getAction(`/actModel/deploy/${id}`, params)
}
// 删除模型
export const deleteModel = (params) => {
    return postAction('/actModel/delByIds', params)
}



// 获取流程数据
export const getProcessDataList = (params) => {
    return getAction('/actProcess/getByCondition', params)
}
// 编辑流程信息
export const updateInfo = (params) => {
    return postAction('/actProcess/updateInfo', params)
}
// 修改流程状态 激活/挂起
export const updateStatus = (params) => {
    return postAction('/actProcess/updateStatus', params)
}
// 转化流程为模型
export const convertToModel = (id, params) => {
    return getAction(`/actProcess/convertToModel/${id}`, params)
}
// 节点设置
export const getProcessNode = (id, params) => {
    return getAction(`/actProcess/getProcessNode/${id}`, params)
}
// 节点用户设置
export const editNodeUser = (params) => {
    return postAction('/actProcess/editNodeUser', params)
}
// 流程发起人设置
export const editStartUser = (params) => {
    return postAction('/actProcess/editStartUser', params)
}
// 删除流程定义
export const deleteProcess = (params) => {
    return postAction('/actProcess/delByIds', params)
}



// 获取流程数据
export const getRunningProcess = (params) => {
    return getAction('/actProcess/getRunningProcess', params)
}
// 获取结束数据
export const getFinishedProcess = (params) => {
    return getAction('/actProcess/getFinishedProcess', params)
}
// 通过key获取最新流程
export const getProcessByKey = (key, params) => {
    return getAction(`/actProcess/getByKey/${key}`, params)
}
// 通过流程定义id获取第一个任务节点审批人
export const getFirstNode = (id, params) => {
    return getAction(`/actProcess/getFirstNode/${id}`, params)
}
// 获取下一个任务节点审批人
export const getNextNode = (procDefId, currActId, params) => {
    return getAction(`/actProcess/getNextNode/${procDefId}/${currActId}`, params)
}
// 通过节点id获取审批人
export const getNode = (id, params) => {
    return getAction(`/actProcess/getNode/${id}`, params)
}
// 修改流程状态 激活/挂起
export const updateInsStatus = (params) => {
    return postAction('/actProcess/updateInsStatus', params)
}
// 删除流程运行实例
export const deleteProcessIns = (params) => {
    return postAction('/actProcess/delInsByIds', params)
}
// 删除结束流程实例
export const delHistoricIns = (params) => {
    return postAction('/actProcess/delHistoricInsByIds', params)
}



// 获取代办列表
export const todoList = (params) => {
    return getAction('/actTask/todoList', params)
}
// 获取已办列表
export const doneList = (params) => {
    return getAction('/actTask/doneList', params)
}
// 获取流程流转历史
export const historicFlow = (id, params) => {
    return getAction(`/actTask/historicFlow/${id}`, params)
}
// 委托他人代办
export const delegate = (params) => {
    return postAction('/actTask/delegate', params)
}
// 审批任务通过
export const pass = (params) => {
    return postAction('/actTask/pass', params)
}
// 审批任务通过
export const idapPass = (params) => {
  return postAction('/idap/actTask/pass', params)
}
// 批量审批任务通过
export const passAll = (params) => {
    return postAction('/actTask/passAll', params)
}
// 获取可返回的节点
export const getBackList = (id, params) => {
    return getAction(`/actTask/getBackList/${id}`, params)
}
// 任务节点审批驳回至发起人
export const back = (params) => {
    return postAction('/actTask/back', params)
}
// 批量驳回至发起人
export const backAll = (params) => {
    return postAction('/actTask/backAll', params)
}
// 任务节点审批驳回至指定历史节点
export const backToTask = (params) => {
    return postAction('/actTask/backToTask', params)
}
// 删除历史任务
export const deleteHistoricTask = (params) => {
    return postAction('/actTask/deleteHistoric', params)
}



// 获取一级类别
export const initActCategory = (params) => {
    return getAction('/actCategory/getByParentId/0', params)
}
// 加载类别子级数据
export const loadActCategory = (id, params) => {
    return getAction(`/actCategory/getByParentId/${id}`, params)
}
// 添加类别
export const addActCategory = (params) => {
    return postAction('/actCategory/add', params)
}
// 编辑类别
export const editActCategory = (params) => {
    return postAction('/actCategory/edit', params)
}
// 删除类别
export const deleteActCategory = (params) => {
    return postAction('/actCategory/delByIds', params)
}
// 搜索类别
export const searchActCategory = (params) => {
    return getAction('/actCategory/search', params)
}



// 获取申请数据
export const getBusinessDataList = (params) => {
    return getAction('/actBusiness/getByCondition', params)
}
// 提交申请
export const applyBusiness = (params) => {
    return postAction('/actBusiness/apply', params)
}
// 直接提交申请
export const startBusiness = (params) => {
    return postAction('/actBusiness/start', params)
}
// 撤回申请
export const cancelApply = (params) => {
    return postAction('/actBusiness/cancel', params)
}
// 删除申请
export const deleteBusiness = (params) => {
    return postAction('/actBusiness/delByIds', params)
}



// 获取单个请假数据
export const getLeaveData = (id, params) => {
    return getAction(`/leave/get/${id}`, params)
}
// 新增请假数据
export const addLeave = (params) => {
    return postAction('/leave/add', params)
}
// 修改请假数据
export const updateLeave = (params) => {
    return putAction('/leave/update', params)
}




