import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/cmms/";
////图片预览请求地址
// const imgView = "http://localhost:8080/cmms/sys/common/view/";

//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
// const getRoleList = (params)=>getAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/add",params);
const editUser = (params)=>putAction("/sys/user/edit",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
const getDksjtzahtjList = (params)=>getAction("/dkjkpt/dhgl/dhjcbg/vdkjkptDhdksjtz/list",params);
// const deleteUser = (params)=>deleteAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/sys/user/deleteBatch",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);

const pcBatch = (params)=>putAction("/sys/user/pcBatch",params);
const appBatch = (params)=>putAction("/sys/user/appBatch",params);

const jxjgsfqyBatch = (params)=>putAction("/sjjg/pmaADataExe/sfqyBatch",params);

const sfqyBatch = (params)=>putAction("/system/dpJdrwgl/sfqyBatch",params);

const sfqyBatchPma = (params)=>putAction("/khlc/khfagl/pmaAScheme/sfqyBatch",params);


const extract = (params)=>putAction("/system/dpJdrwgl/extract",params);
const extractJx = (params)=>putAction("/sjjg/pmaADataExeLog/extract",params);



const updatezt = (params)=>putAction("/system/dpJdrwgl/updatezt",params);
const updateztJx = (params)=>putAction("/sjjg/pmaADataExeLog/updatezt",params);

const updateBatchzt = (params)=>putAction("/system/dpJdrwgl/updateBatchzt",params);

const extractBatch = (params)=>putAction("/system/dpJdrwgl/extractBatch",params);
const jxextractBatch = (params)=>putAction("/sjjg/pmaADataExe/extractBatch",params);
const jxextractBatchs = (params)=>putAction("/sjjg/pmaADataExe/extractBatchs",params);

const extractZhfy = (params)=>putAction("/zhfyfp/zhfyfpHz/extract",params);




//验证用户是否存在
const checkOnlyUser = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changePassword = (params)=>putAction("/sys/user/changePassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/permission/add",params);
const editPermission= (params)=>putAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getAction("/sys/permission/list",params);
/*update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params)=>getAction("/sys/permission/getSystemMenuList",params);
const getSystemSubmenu = (params)=>getAction("/sys/permission/getSystemSubmenu",params);
const getSystemSubmenuBatch = (params) => getAction('/sys/permission/getSystemSubmenuBatch', params)
/*update_end author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
// const deletePermission = (params)=>deleteAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params)=>getAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/sys/permission/queryRolePermission",params);
const queryRoleSubSystem = (params)=>getAction("/sys/permission/queryRoleSubSystem",params);
const saveRolePermission = (params)=>postAction("/sys/permission/saveRolePermission",params);
//const queryPermissionsByUser = (params)=>getAction("/sys/permission/queryByUser",params);
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const queryAllPermissionsByUser = (params)=>getAction("/sys/permission/getUserAllPermissionByToken",params);
const getUserSubSystemByToken = (params)=>getAction("/sys/permission/getUserSubSystemByToken",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

//子系统管理
const getAllSubSystemList = (params) => getAction("/subsystem/all", params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/sys/hrBasOrganization/queryTreeList",params);
const queryDpJdTreeList = (params)=>getAction("/system/dpJdgl/queryTreeList",params);

const queryIdTree = (params)=>getAction("/sys/hrBasOrganization/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sys/hrBasOrganization/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sys/hrBasOrganization/searchBy",params);

const searchBpJdByKeywords   = (params)=>getAction("/system/dpJdgl/searchBy",params);


const deleteByDepartId   = (params)=>deleteAction("/sys/hrBasOrganization/delete",params);
//二级部门管理
const queryDepartPermission = (params)=>getAction("/sys/permission/queryDepartPermission",params);
const saveDepartPermission = (params)=>postAction("/sys/permission/saveDepartPermission",params);
const queryTreeListForDeptRole = (params)=>getAction("/sys/sysDepartPermission/queryTreeListForDeptRole",params);
const queryDeptRolePermission = (params)=>getAction("/sys/sysDepartPermission/queryDeptRolePermission",params);
const saveDeptRolePermission = (params)=>postAction("/sys/sysDepartPermission/saveDeptRolePermission",params);
const queryMyDepartTreeList = (params)=>getAction("/sys/sysDepart/queryMyDeptTreeList",params);

//日志管理
//const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
//const getDictList = (params)=>getAction("/sys/dict/list",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);
// const delDict = (params)=>deleteAction("/sys/dict/delete",params);
//const getDictItemList = (params)=>getAction("/sys/dictItem/list",params);
const addDictItem = (params)=>postAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putAction("/sys/dictItem/edit",params);
//const delDictItem = (params)=>deleteAction("/sys/dictItem/delete",params);
//const delDictItemList = (params)=>deleteAction("/sys/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/sys/dict/getDictItems/${code}`,params);

//系统通告
const doReleaseData = (params)=>getAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/sys/loginfo",params);
const getKhCount = (params)=>getAction("/sys/khCount",params);

const getVisitInfo = (params)=>getAction("/sys/visitInfo",params);
//数据日志访问
// const getDataLogList = (params)=>getAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
const queryUserRoleMap = (params)=>getAction("/sys/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);

// 是否存在校验
const duplicateCheckPams = (params)=>getAction("/khlc/pszbgl/pmaFevlIndexInfo/check",params);

const duplicateCheckN = (params)=>getAction("/sys/duplicate/checkN",params);


// 加载分类字典
const loadCategoryData = (params)=>getAction("/sys/category/loadAllData",params);
//员工信息
const getYgxxList = (params)=>getAction("/hr/ygxx/list",params);
//khjlxx
const getKhjlxx = (params)=>getAction("/hr/vhrbasstaffpost/list",params);
//员工信息
const getYggwxxList = (params)=>getAction("/gzap.grrwsz/gzapGrrwsz/gwxxlist",params);

const checkRuleByCode = (params) => getAction('/sys/checkRule/checkByCode', params)

//二级营销单元
const checkEjyxfy = (params) => getAction('/yxdygl/ejyxdygl/querlist', params)
//三级营销单元
const checkSjyxfy = (params) => getAction('/yxdygl/sjyxdygl/querylist', params)
//存款客户待分配信息
const getCkkhdfpList = (params)=>getAction("/yjgs.ckkhdfpxx/yjgsCkkhdfpxxb/list",params);
//存款账号待分配信息
const getCkzhdfpList = (params)=>getAction("/yjgs/ckzhdfpxx/list",params);


//生日提醒
const getImportCoustmerNumber = (params) => getAction('/zfcjyxkhstj/srtx/importCoustmerNumber', params)

const getUserName=(param)=>getAction('/zfcjyxkhstj/srtx/getUserName', param)

const changeLockStatus=(param)=>postAction('/zfcjyxkhstj/srtx/changeOperateStatus', param)

const syncGwxxZzbz= (params)=>postAction("/sys/user/syncGwxxZzbz",params);


export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  getDksjtzahtjList,
  queryall,
  pcBatch,
  appBatch,
  frozenBatch,
  checkOnlyUser,
  changePassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  queryRoleSubSystem,
  saveRolePermission,
  queryPermissionsByUser,
  queryAllPermissionsByUser,
  getUserSubSystemByToken,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  getAllSubSystemList,
  queryDepartTreeList,
  queryDpJdTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  searchBpJdByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  sfqyBatch,
  sfqyBatchPma,
  jxjgsfqyBatch,
  extract,
  extractJx,
  extractBatch,
  jxextractBatch,
  jxextractBatchs,
  extractZhfy,
  updatezt,
  updateztJx,
  updateBatchzt,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  queryUserRoleMap,
  duplicateCheck,
  duplicateCheckN,
  duplicateCheckPams,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  getSystemSubmenuBatch,
  loadCategoryData,
  getKhCount,
  getYgxxList,
  getYggwxxList,
  checkRuleByCode,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  checkEjyxfy,
  checkSjyxfy,
  getKhjlxx,
  getCkkhdfpList,
  getCkzhdfpList,
  getImportCoustmerNumber,
  getUserName,
  changeLockStatus,
  syncGwxxZzbz,
}



