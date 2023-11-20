import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

const queryShemeTree = (params)=>getAction("/khlc/khfagl/pmaASchemeMenu/queryTreeList",params);
const queryParamMenuTree = (params)=>getAction("/csgl/csml/pmaFParamMenu/queryTreeList",params);


export {
  // imgView,
  // doMian,
  queryShemeTree,
  queryParamMenuTree
}


