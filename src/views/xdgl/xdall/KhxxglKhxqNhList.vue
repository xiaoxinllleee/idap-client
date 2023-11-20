<template>
  <div>
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />


    <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                allow-clear
                showSearch
                treeNodeFilterProp="title"
              >

              </a-tree-select>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号">
              <a-input placeholder="请输入证件号" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="与户主关系">
              <j-dict-select-tag v-model="queryParam.yhzgx" placeholder="请选择与户主关系" dictCode="yhzgx" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="授信等级">
              <j-dict-select-tag v-model="queryParam.zzpddj" placeholder="请选择授信等级" dictCode="pjsx_pddj" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="审批状态">
              <j-dict-select-tag v-model="queryParam.status" placeholder="请选择审批状态" dictCode="ly_splc" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="年审分类">
              <j-dict-select-tag v-model="queryParam.nsfl" placeholder="请选择年审分类" dictCode="ly_xend_nsfl" />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="客户类型">-->
<!--              <a-input placeholder="请输入客户类型" v-model="queryParam.khlx"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('农户详情')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->

<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXlsByUrl()" v-has="'KhxxglKhxqNh:dcxxcjb'">导出信息采集表
      </a-button>

      <a-button type="primary" icon="download" :loading="exportLoadingKd" @click="handleExportXlsELaon()" v-has="'KhxxglKhxqNh:dchnkd'">导出惠农快贷
      </a-button>

      <a-tooltip  title="批量风控查询，1年内只能查询2次，每次间隔需要超过3个月" >
        <a-button type="primary" :loading="batchQueryQxfkLoading"  @click="batchQueryQxfk()" v-has="'KhxxglKhxqNh:plfkcx'">批量风控查询</a-button>
      </a-tooltip>-->

      <a-button @click="AddNhxq" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="nsbLoading" @click="dcnsb()" >导出年审表
      </a-button>
      <a-button type="primary" icon="download" :loading="nsbLoading" @click="mbnsb()" >年审表模版</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
        <a-button @click="yjzyModules" type="primary" icon="plus">客户转移</a-button>
      <a-button type="primary" @click="drhnkdbmd">导入惠农快贷白名单</a-button>
<!--        <a-button @click="khzyModules" type="primary" icon="plus">客户转移</a-button>-->


      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
<!--        <span slot="spzt" slot-scope="text, record">
          <a-tag v-if="record.status == '-1'" color="processing">待申请</a-tag>
          <a-tag v-if="record.status == '1'" color="warning">流程中</a-tag>
          <a-tag v-if="record.status == '2'" color="success">已审批</a-tag>
        </span>-->

        <span slot='spzt' slot-scope='text, record'>
          <a-tag v-if="record.status == 0" color="red" v-has="'KhxxglKhxqNh:dsq'">已拒绝</a-tag>
          <a-tag v-if="record.status == 1 && record.sxsj != null" color="blue" >待申请</a-tag>
          <a-tag v-if="record.status == 1 && record.sxsj == null" color="blue" >待采集</a-tag>
          <a-tag v-if="record.status == 2" color="purple" >风险经理审批</a-tag>
          <a-tag v-if="record.status == 3" color="volcano" >支行行长审批</a-tag>
          <a-tag v-if="record.status == 4" color="green" >已审批</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">编辑</a>-->
          <a-button  type="primary " size="small"  @click="handleEdit(record,'1')"  v-if="roles.indexOf('客户经理') > -1">编辑</a-button>&nbsp;&nbsp;
          <a-button  type="primary " size="small"  @click="handleEdit(record,'2')"  v-if="roles.indexOf('客户经理') ==  -1">查看</a-button>&nbsp;&nbsp;
          <a-button  type="primary" size="small" v-if="roles.indexOf('客户经理') > -1 && (record.status == 1 || record.status == 0 ) && record.sxsj != null && record.status != 4"  @click="jrlc(record)" >去授信</a-button>
          <a-button  type="primary" size="small" v-if="roles.indexOf('客户经理') > -1 &&  record.sxsj != null && record.status == 4"  @click="jrlc(record)" >重新授信</a-button>
          <a-button  type="primary" size="small" v-if="record.status==2&&roles.indexOf('风险经理') > -1" @click="jrlc(record)" >去审批</a-button>
          <a-button  type="primary" size="small" v-if="record.status==3&&roles.indexOf('支行行长') > -1" @click="jrlc(record)" >去审批</a-button>
<!--          <a-button  type="primary" size="small" v-if="record.status == '1' " @click="showmysqjd(record)" v-has="'KhxxglKhxqNh:ckjd'">查看进度</a-button>-->
<!--          <a-button  type="primary" size="small" v-if="record.status == '3' " @click="showmysqjd(record)" v-has="'KhxxglKhxqNh:ckjd'">查看进度</a-button>-->
<!--          <a-button  type="primary" size="small" danger v-if="record.sskhjl == workNo && record.status == '2' " v-has="'KhxxglKhxqNh:cxsq'">重新申请</a-button>-->
<!--
          <a-button  type="error" size="small"  >重新授信</a-button>
-->

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
                 <a-menu-item @click="sxsp2(record)" >授信审批表</a-menu-item>
                 <a-menu-item  @click="xybg(record)" >信用报告</a-menu-item>
<!--                 <a-menu-item @click="wordEdit(record)" v-has="'KhxxglKhxqNh:xend'">小额农贷</a-menu-item>-->
<!--                 <a-menu-item @click="pmkEdit(record)" v-has="'KhxxglKhxqNh:bmk'">便民卡</a-menu-item>-->
<!--                 <a-menu-item @click="ViewXxxx(record)" v-has="'KhxxglKhxqNh:view'">详情</a-menu-item>-->
<!--                 <a-menu-item @click="view(record)" v-has="'KhxxglKhxqNh:ylwj'">预览文件</a-menu-item>-->
<!--                 <a-menu-item @click="down(record)" v-has="'KhxxglKhxqNh:down'">下载文件</a-menu-item>-->
<!--                 <a-menu-item @click="downht(record)" v-has="'KhxxglKhxqNh:xzht'">下载合同</a-menu-item>-->
              <!--<a-button type="primary" icon="file-word"  @click="view(record)">-->
             </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
<!--    <grkhpjsx-modal ref="modalForm" ></grkhpjsx-modal>-->
      <pjsx-edit ref="modalForm" @ok="loadData"></pjsx-edit>
      <excel-import ref="excelImportModal" @ok="importComplete"/>
      <gzlc ref="gzlcForm"></gzlc>
      <report ref="report"></report>
      <add-nhxq ref="addForm" @ok="loadData"></add-nhxq>
      <yjzy-modal ref="yjzyForm"></yjzy-modal>
  </a-card>
  </div>
</template>

<script>
  import KhxxglKhxqNhModal from './modules/KhxxglKhxqNhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import GrkhpjsxModal from '../grkhpjsx/modules/GrkhpjsxModal'
  import historicDetail from '../../activiti/historic-detail/historicDetail';
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import { getAction, putAction } from '@api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import Report from '@/views/xyjlcx/xybg/xybgcx/module/report'
  import pjsxEdit from './modules/pjsxEdit'
  import gzlc from './modules/gzlc.vue'
  import ExcelImport from '@/components/common/ExcelImport'
  import addNhxq from '@views/xdgl/xdall/modules/addNhxq'
  import YjzyModal from './modules/YjzyModal.vue'

  export default {
    name: "KhxxglKhxqNhList",
    mixins:[JeecgListMixin],
    components: {
      KhxxglKhxqNhModal,GrkhpjsxModal,historicDetail,JTreeSelect,Report,pjsxEdit,gzlc,ExcelImport,addNhxq,YjzyModal
    },
    created () {
      this.workNo = store.getters.userInfo.workNo
      this.roles = store.getters.userInfo.roles_dictText;
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl',{wgxz: '6,8', wgxzType: '2'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
    },
    data () {
      return {
        exportLoadingKd:false,
        batchQueryQxfkLoading:false,
        nsbLoading:false,
        description: '农户详情管理页面',
        showHistory:false,
        procInstId: '',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '归属网格',
            align:"center",
            dataIndex: 'wgbh_dictText',
          },
          {
            title: '归属机构',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '审批状态',
            align:"center",
            dataIndex: 'status',
            scopedSlots: { customRender: 'spzt' },
          },
          {
            title: '评级时间',
            align:"center",
            dataIndex: 'sxsj'
          },
          {
            title: '授信等级',
            align:"center",
            dataIndex: 'zzpddj'
          },
          {
            title: '授信额度',
            align:"center",
            dataIndex: 'zzsxed'
          },
          {
            title: '信用产品',
            align:"center",
            dataIndex: 'cpzl_dictText'
          },
          {
            title: '信用产品利率',
            align:"center",
            dataIndex: 'cpzlll',
            width: 120
          },
          /*{
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm'
          },*/
          {
            title: '姓名',
            align:"center",
            dataIndex: 'khmc',
            //scopedSlots: { customRender: 'detail' }
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '年审分类',
            align:"center",
            dataIndex: 'nsfl_dictText'
          },
          {
            title: '年审分类原因',
            align:"center",
            dataIndex: 'nsflyy',
            width: 120
          },
          {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx_dictText'
          },

          {
            title: '联系方式',
            align:"center",
            dataIndex: 'sjhm'
          },
          {
            title: '户籍地址',
            align:"center",
            dataIndex: 'hjdz'
          },
          {
            title: '常住地址',
            align:"center",
            dataIndex: 'zz'
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },

          /*{
               title: '住址1',
               align:"center",
               dataIndex: 'zz1'
              },
          {
               title: '住址2',
               align:"center",
               dataIndex: 'zz2'
              },
          {
               title: '是否不良贷款客户',
               align:"center",
               dataIndex: 'sfbldkh'
              },
          {
               title: '是否贫困户',
               align:"center",
               dataIndex: 'sfpkh'
              },
          {
               title: '是否低保户',
               align:"center",
               dataIndex: 'sfdbh'
              },
          {
               title: '系统评定结果：1-灰名单，2-白名单，3-黑名单',
               align:"center",
               dataIndex: 'xtpdjg'
              },
          {
               title: '系统评定说明',
               align:"center",
               dataIndex: 'xtpdsm'
              },
          {
               title: '关键人评定结果',
               align:"center",
               dataIndex: 'gjrpdjg'
              },
          {
               title: '关键人评定说明',
               align:"center",
               dataIndex: 'gjrpdsm'
              },
          {
               title: '最终评定结果',
               align:"center",
               dataIndex: 'zzpdjg'
              },
          {
               title: '最终评定说明',
               align:"center",
               dataIndex: 'zzpdsm'
              },
          {
               title: '是否外出务工',
               align:"center",
               dataIndex: 'sfycdg'
              },
          {
               title: '客户重要程度',
               align:"center",
               dataIndex: 'kfyyqk'
              },
          {
               title: '客户潜在业务',
               align:"center",
               dataIndex: 'kcqzyw'
              },
          {
               title: '客户授信情况',
               align:"center",
               dataIndex: 'khsxqk'
              },
          {
               title: '经度',
               align:"center",
               dataIndex: 'longitude'
              },
          {
               title: '纬度',
               align:"center",
               dataIndex: 'latitude'
              },
          {
               title: '电子签名1',
               align:"center",
               dataIndex: 'sign1'
              },
          {
               title: '电子签名2',
               align:"center",
               dataIndex: 'sign2'
              },
          {
               title: '备用号码',
               align:"center",
               dataIndex: 'byhm'
              },
          {
               title: '陪访人',
               align:"center",
               dataIndex: 'pfr'
              },
          {
               title: '客户类型1',
               align:"center",
               dataIndex: 'khlx1'
              },
          {
               title: '客户类型2',
               align:"center",
               dataIndex: 'khlx2'
              },
          {
               title: '有无子女',
               align:"center",
               dataIndex: 'ywzn'
              },
          {
               title: '健康状况',
               align:"center",
               dataIndex: 'jkzk'
              },
          {
               title: '劳动能力',
               align:"center",
               dataIndex: 'ldnl'
              },
          {
               title: '居住年限',
               align:"center",
               dataIndex: 'jznx'
              },
          {
               title: '最高学历',
               align:"center",
               dataIndex: 'zgxl'
              },
          {
               title: '最高学位',
               align:"center",
               dataIndex: 'zgxw'
              },
          {
               title: '道德品质综合评价',
               align:"center",
               dataIndex: 'ddpzzhpj'
              },
          {
               title: '居住状态',
               align:"center",
               dataIndex: 'jzzt'
              },
          {
               title: '证件签发日期',
               align:"center",
               dataIndex: 'zjqfrq'
              },
          {
               title: '证件到期日期',
               align:"center",
               dataIndex: 'zjdqrq'
              },
          {
               title: '返乡时间',
               align:"center",
               dataIndex: 'fxsj'
              },
          {
               title: '是否授信（1：是 2：否）',
               align:"center",
               dataIndex: 'sfsx'
              },
          {
               title: '评议信息有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'pyxxFlag'
              },
          {
               title: '客户基础信息有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'khxxFlag'
              },
          {
               title: '客户管理有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'khglFlag'
              },
          {
               title: '客户签名标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'signFlag'
              },
          {
               title: '所属客户经理',
               align:"center",
               dataIndex: 'sskhjl'
              },
          {
               title: '工作单位',
               align:"center",
               dataIndex: 'gzdw'
              },
          {
               title: '工作单位地址',
               align:"center",
               dataIndex: 'gzdwdz'
              },
          {
               title: '腾讯QQ号码',
               align:"center",
               dataIndex: 'qq'
              },
          {
               title: '务工城市',
               align:"center",
               dataIndex: 'wgcs'
              },
          {
               title: '是否吸毒人员',
               align:"center",
               dataIndex: 'sfxdry'
              },
          {
               title: '电子签名3',
               align:"center",
               dataIndex: 'sign3'
              },
          {
               title: '是否授信对象',
               align:"center",
               dataIndex: 'sfsxdx'
              },
          {
               title: '采集点（定位地址）',
               align:"center",
               dataIndex: 'gddz'
              },
          {
               title: '住地邮编',
               align:"center",
               dataIndex: 'zdyb'
              },
          {
               title: '不予授信情况',
               align:"center",
               dataIndex: 'bysxqx'
              },
          {
               title: '采集状态(1:采集户 ，2:收集户， 3:不予授信,)',
               align:"center",
               dataIndex: 'cjzt'
              },
          {
               title: '收集户原因',
               align:"center",
               dataIndex: 'sjhyy'
              },
          {
               title: '上传状态',
               align:"center",
               dataIndex: 'cjwczt'
              },
          {
               title: '具体从事经营项目',
               align:"center",
               dataIndex: 'jtcsxm'
              },
          {
               title: '务工地区',
               align:"center",
               dataIndex: 'wgdq'
              },
          {
               title: '务工类型',
               align:"center",
               dataIndex: 'wglx'
              },
          {
               title: '客户类型3',
               align:"center",
               dataIndex: 'khlx3'
              },
          {
               title: '录入标识',
               align:"center",
               dataIndex: 'lrbz'
              },
          {
               title: '录入时间',
               align:"center",
               dataIndex: 'lrsj'
              },
          {
               title: '录入人',
               align:"center",
               dataIndex: 'lrr'
              },
          {
               title: 'upDt',
               align:"center",
               dataIndex: 'upDt'
              },
          {
               title: 'upTm',
               align:"center",
               dataIndex: 'upTm'
              },
          {
               title: 'zdyzbm',
               align:"center",
               dataIndex: 'zdyzbm'
              },
          {
               title: 'khblsh',
               align:"center",
               dataIndex: 'khblsh'
              },
          {
               title: 'ddpzzhpj1',
               align:"center",
               dataIndex: 'ddpzzhpj1'
              },
          {
               title: 'ddpzzhpj2',
               align:"center",
               dataIndex: 'ddpzzhpj2'
              },
          {
               title: 'qzywyysj',
               align:"center",
               dataIndex: 'qzywyysj'
              },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width:200, fixed: 'right',
          }
        ],
        url: {
         // list: "/khflgl/nhxq/list",
          list: "/nh/vNhPjsx/list",
          delete: "/khflgl/nhxq/delete",
          deleteBatch: "/khflgl/nhxq/deleteBatch",
          exportXlsUrl: "khflgl/nhxq/exportXls",
          exportPyxxXlsUrl: "khflgl/nhxq/exportPyxxXls",
          //importExcelUrl: "khflgl/nhxq/importExcel",
          importExcelUrl: "/nh/vNhPjsx//importExcel2",
          //exportTemplateUrl: "/nh/vNhPjsx/exportTemplateXls",
          exportTemplateUrl2: "/nh/vNhPjsx/exportTemplateXls2",
          extract:"/khflgl/nhxq/extract",
        },
        workNo:'',
        ishz:false,
        sswgTreeDateoptions: [],
        qybm:'',
        roles:'',

    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      drhnkdbmd(){
        this.exportLoadingKd = true;
        getAction("/khflgl/nhxq/sphdrhnkdbmd").then(res=>{
          this.successInfo("导入成功")
          this.exportLoadingKd = false;
        })
      },
      handleEdit: function (record,val) {
        this.record=record;
        this.$refs.modalForm.edit(record,'1');
        this.$refs.modalForm.title = "编辑";
        if (val == '2'){
          this.$refs.modalForm.valType = false;
        }

      },

      yjzyModules(){
        this.$refs.yjzyForm.open()
      },

      jrlc: function (record) {
        this.$refs.modalForm.edit(record,'0');
      },

      hzqxQx(){
        let _this=this;
        putAction('/sys/user/getUserhzRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              this.ishz=true;
            }else{
              this.ishz=false;
            }
            console.log('hz:')
            console.log(this.ishz)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      toapply(record) {
        this.$router.push({
          path: '/activiti/todo-manage/todoManage',
        })
      },

      showmysqjd(v) {
        if (!v.procInstId) {
          this.$Message.warning("直接通过的流程,无审批历史");
          return;
        }
        console.log(v.procInstId)
        this.procInstId = v.procInstId;
        this.showHistory = true;
      },

      sxsp(val){
        getAction("/nh/vNhPjsx/xendFtl",{id:val.id}).then(res=>{
          if (res.success){
            //8f069bcc1aac480fa09760de7fd8e41d.docx
            //window._CONFIG['staticDomainURL'] + '/' + res.message
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        })
      },
      sxsp2(val){
        getAction("/nh/vNhPjsx/xendFtl2",{id:val.id}).then(res=>{
          if (res.success){
            //8f069bcc1aac480fa09760de7fd8e41d.docx
            //window._CONFIG['staticDomainURL'] + '/' + res.message
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        })
      },
      mbnsb(val){
        getAction(this.url.exportTemplateUrl2,).then(res=>{
          if (res.success){
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        })
      },
      AddNhxq(){
        this.$refs.addForm.add()
        this.$refs.addForm.title = '新增'
      },
      dcnsb(){
        this.nsbLoading = true;
        let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr;

        getAction("/nh/vNhPjsx/exportNsb",param).then(res=>{
          if (res.success){
            if (res.message){
              window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
            }
          }else {
            this.errorInfo(res.message)
          }2

          this.nsbLoading =false;
        })


      },

      xybg(val){
        let formData = {}
        formData.bcxrzjhm = val.zjhm
        formData.cxyy = '1'
        getAction('/creditreportquery/query', formData).then((res) => {
          if (res.success){
            let bcxrxx = res.result.bcxrxx;
            let parameters = {
              'bgbh': bcxrxx.bgbh,
              'cxyy': '1',
              'cxyyDictText': '贷款审批',
              'zjhm':val.zjhm,
              'xm':''
            }
            getAction("/creditreportquery/report", parameters).then((res2) => {
              if (res2.success) {
                this.$message.success("客户内部信用记录报告生成成功！")
                let object = res2.result
                this.$refs['report'].cxyy = '1'
                this.$refs['report'].object = object
                this.$refs['report'].init({bgbh:bcxrxx.bgbh,xm:null})
              }else {
                this.errorInfo(res2.message+"客户内部信用记录报告生成失败，请联系系统管理员！")
              }
            }).catch((error) => {
              console.info('客户内部信用记录报告生成失败！', error)
              this.errorInfo("客户内部信用记录报告生成失败，请联系系统管理员！")
            })
          }
        }).catch((error) => {
          console.info('客户内部信用记录报告生成失败！', error)
          this.errorInfo("客户内部信用记录报告生成失败，请联系系统管理员！")
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>