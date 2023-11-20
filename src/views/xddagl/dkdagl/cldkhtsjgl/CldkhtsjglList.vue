<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="档案编号">
              <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx"
                                   dictCode="xddagl_khlx"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="合同号">
                <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="合同开始日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.fkrq"
                                @change="onfkrqDateChange" style="width: 100%;"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="业务编号">
                <a-input placeholder="请输入业务编号" v-model="queryParam.ywbh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="合同金额">
                <a-input-number placeholder="" v-model="queryParam.qyje_begin"
                                style="width: 40%; text-align: center" :min="0"/>
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled/>
                <a-input-number placeholder="" v-model="queryParam.qyje_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款余额">
                <a-input-number placeholder="" v-model="queryParam.dkye_begin"
                                style="width: 40%; text-align: center" :min="0"/>
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled/>
                <a-input-number placeholder="" v-model="queryParam.dkye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款责任人">
                <a-input placeholder="请输入贷款责任人" v-model="queryParam.dkzrr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款品种">
                <j-dict-select-tag placeholder="请选择贷款品种" v-model="queryParam.dkpz" dictCode="dkzl"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款品种(补充)">
                <j-dict-select-tag placeholder="请选择贷款品种(补充)" v-model="queryParam.dkpzbc"
                                   dictCode="dkzlbc"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="担保方式">
                <j-dict-select-tag placeholder="请选择担保方式" v-model="queryParam.dbfs"
                                   dictCode="dbfs"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="用信状态">
                <j-dict-select-tag placeholder="请选择用信状态" v-model="queryParam.sfsx" dictCode="yxzt"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否上传档案">
                <j-dict-select-tag placeholder="请选择是否上传档案" v-model="queryParam.sfscda"
                                   dictCode="sfbs"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款类型">
                <j-dict-select-tag placeholder="请选择贷款类型" v-model="queryParam.lx"
                                   dictCode="xddagl_dklx"></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存量贷款合同数据管理')"
                v-has="'cldkhtsjgl:exportXls'">导出
      </a-button>
      <a-button  icon="import" @click="excelImport" v-has="'cldkhtsjgl:import'">导入</a-button>
      <a-button  @click="init" icon="area-chart" v-has="'cldkhtsjgl:init'">更新数据</a-button>
      <a-button  @click="transfer" icon="area-chart">移交</a-button>
      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
            </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:5330}"
        @change="handleTableChange">

<!--        <span slot="khmc" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="5"/>-->
<!--        </span>-->
<!--        <span slot="lxdz" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="ywbh" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="12"/>-->
<!--        </span>-->
<!--        <span slot="hth" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="11"/>-->
<!--        </span>-->
<!--        <span slot="dabh" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="11"/>-->
<!--        </span>-->
<!--        <span slot="dkpz" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'cldkhtsjgl:handleEdit'">上传</a>
          <a-divider type="vertical"/>
          <a @click="handleView(record)" v-has="'cldkhtsjgl:handleView'">详情</a>
          <a-divider type="vertical"/>
          <a @click="scewm(record)" >生成二维码</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cldkhtsjgl-modal ref="modalForm" @ok="modalFormOk"></cldkhtsjgl-modal>
    <transfer-modal ref="transferModal" @close="transferClose"></transfer-modal>
<!--    <jiami-modal ref="jiamiModal" @close="JiamiClose"></jiami-modal>-->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <cldkht-scewm-modal ref="cldkhtScewmModal"/>
  </a-card>
</template>

<script>
  import CldkhtsjglModal from './modules/CldkhtsjglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import ExcelImport from '@/components/common/ExcelImport'
  import {filterObj} from "../../../../utils/util";
  import { getAction, putAction } from '../../../../api/manage'
  import TransferModal from "./modules/TransferModal";
  import JiamiModal from "./modules/JiamiModal"
  import CldkhtScewmModal from '@views/xddagl/dkdagl/cldkhtsjgl/modules/CldkhtScewmModal'

  export default {
    name: "CldkhtsjglList",
    mixins: [JeecgListMixin],
    components: {
      CldkhtScewmModal,
      CldkhtsjglModal, JTreeSelect, JEllipsis, ExcelImport, TransferModal, JiamiModal
    },
    data() {
      return {
        description: '存量贷款合同数据管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '提取日期',
            align: "center",
            dataIndex: 'tqrq'
          },
          {
            title: '档案编号',
            align: "center",
            dataIndex: 'dabh',
            scopedSlots: {customRender: 'dabh'},
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '联系电话',
            align: "center",
            dataIndex: 'lxdh'
          },
          {
            title: '联系地址',
            align: "center",
            dataIndex: 'lxdz',
            scopedSlots: {customRender: 'lxdz'},
          },
          {
            title: '签约日期',
            align: "center",
            dataIndex: 'qyrq'
          },
          {
            title: '合同号',
            align: "center",
            dataIndex: 'hth',
            scopedSlots: {customRender: 'hth'},
          },
          {
            title: '业务编号',
            align: "center",
            dataIndex: 'ywbh',
            scopedSlots: {customRender: 'ywbh'},
          },
          {
            title: '合同开始日期',
            align: "center",
            dataIndex: 'fkrq'
          },
          {
            title: '合同到期日期',
            align: "center",
            dataIndex: 'dqrq'
          },
          {
            title: '签约期限',
            align: "center",
            dataIndex: 'qyqx'
          },
          {
            title: '合同金额',
            align: "center",
            dataIndex: 'qyje'
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye'
          },
          {
            title: '最早贷款日期',
            align: "center",
            dataIndex: 'zzdkrq'
          },
          {
            title: '最早到期日期',
            align: "center",
            dataIndex: 'zzdqrq'
          },
          {
            title: '贷款品种',
            align: "center",
            dataIndex: 'dkpz_dictText',
            scopedSlots: {customRender: 'dkpz'},
          },
          {
            title: '贷款品种(补充)',
            align: "center",
            dataIndex: 'dkpzbc_dictText'
          },
          {
            title: '担保方式',
            align: "center",
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '贷款责任人工号',
            align: "center",
            dataIndex: 'dkzrr'
          },
          {
            title: '贷款责任人姓名',
            align: "center",
            dataIndex: 'dkzrr_dictText'
          },
          {
            title: '是否用信',
            align: "center",
            dataIndex: 'sfsx_dictText'
          },
          {
            title: '是否上传档案',
            align: "center",
            dataIndex: 'sfscda'
          },
          {
            title: '数据日期',
            align: "center",
            dataIndex: 'sjrq'
          },
          {
            title: '贷款类型',
            align: "center",
            dataIndex: 'lx_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: "right",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/cldkhtsjgl/cldkhtsjgl/list",
          delete: "/cldkhtsjgl/cldkhtsjgl/delete",
          deleteBatch: "/cldkhtsjgl/cldkhtsjgl/deleteBatch",
          exportXlsUrl: "cldkhtsjgl/cldkhtsjgl/exportXls",
          importExcelUrl: "cldkhtsjgl/cldkhtsjgl/importExcel",
          init: "/cldkhtsjgl/cldkhtsjgl/init",
          exportTemplateUrl: "/cldkhtsjgl/cldkhtsjgl/exportTemplateXls",
          scewmpd:"/cldkhtsjgl/cldkhtsjgl/scewmpd"
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      scewm(record){
      putAction(this.url.scewmpd,record).then((res)=> {
        if (res.success){
          this.$refs.cldkhtScewmModal.init(record);
        }else {
          this.$message.warning(res.message,5)
        }
      })
      },


      transfer() {
        if (this.queryParam.dkzrr == undefined || this.queryParam.dkzrr == '') {
          this.$message.warning("请输入贷款责任人工号！")
          return
        }
        this.$refs.transferModal.transferinit(this.queryParam.dkzrr)
      },

      transferClose() {
        console.log('账号转移已关闭！')
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "上传";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.fkrq;
        return filterObj(param);
      },
      onfkrqDateChange(value, dateString) {
        let fkrqString = dateString
        this.queryParam.fkrq_begin = fkrqString[0]
        this.queryParam.fkrq_end = fkrqString[1]
      },
      init() {
        this.loading = true
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>