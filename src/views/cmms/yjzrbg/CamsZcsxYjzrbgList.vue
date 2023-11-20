<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :flex="2">
            <a-form-item label="查询原因" style="padding-left: 15px">
              <a-radio-group v-model="cxyy" :default-value="1" @change="cxyyChange">
                <a-radio :value="1">贷款审批</a-radio>
                <a-radio :value="2">信用卡审批</a-radio>
                <a-radio :value="3">贷后管理</a-radio>
                <a-radio :value="4">担保资格审查</a-radio>
                <a-radio :value="5">特约商户实名审查</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
<!--          <template v-if="toggleSearchStatus">-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否获取征信">
              <j-dict-select-tag v-model="queryParam.nbzx" placeholder="请选择是否获取征信" dictCode="sfbz"
                                 allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核查状态">
              <j-dict-select-tag v-model="queryParam.hczt" placeholder="请选择核查状态" dictCode="yjzrbg_hczt"
                                 allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="风险等级">
              <j-dict-select-tag v-model="queryParam.fxdj" placeholder="请选择风险等级" dictCode="yjzrbg_fxdj"
                                 allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="测算额度">
              <a-input-number placeholder="测算额度起" v-model="queryParam.csed" :min="0" style="width: 100px"></a-input-number>
              -
              <a-input-number placeholder="测算额度起" v-model="queryParam.csede" :min="0" style="width: 100px"></a-input-number>
            </a-form-item>
          </a-col>

<!--            <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--              <a-form-item label="核查状态">-->
<!--                <a-input placeholder="请输入核查状态" v-model="queryParam.hczt"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--              <a-form-item label="creator">-->
<!--                <a-input placeholder="请输入creator" v-model="queryParam.creator"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--              <a-form-item label="updator">-->
<!--                <a-input placeholder="请输入updator" v-model="queryParam.updator"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--          </template>-->
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'CamsZcsxYjzrbg:add'">新增</a-button>-->
      <a-button @click="tq" type="primary" v-has="'CamsZcsxYjzrbg:tq'">提取二代征信</a-button>
      <a-button @click="tqydd" type="primary" v-has="'CamsZcsxYjzrbg:tq'">提取移动端征信</a-button>
<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('一键准入报告')" v-has="'CamsZcsxYjzrbg:exp'">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->
          <a @click="handlePrint(record)" v-has="'CamsZcsxYjzrbg:print'">打印/核查</a>
          <a-divider type="vertical" />
          <a @click="handleEdcs(record)" >测算额度</a>
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a v-has="'CamsZcsxYjzrbg:del'">删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <camsZcsxYjzrbg-modal ref="modalForm" @ok="modalFormOk"></camsZcsxYjzrbg-modal>
    <!--预览/打印-->
    <yjzrbg-print-modal ref="printModalForm" @close="printModalFormClose"/>
    <edcs-modal ref="edcsModalForm" @ok="loadData"></edcs-modal>
  </a-card>
</template>

<script>
  import CamsZcsxYjzrbgModal from './modules/CamsZcsxYjzrbgModal'
  import EdcsModal from './modules/EdcsModal'
  import YjzrbgPrintModal from "@/views/cmms/yjzrbg/modules/YjzrbgPrintModal";
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from "@/components/jeecg/JInput";
  import {notification} from "ant-design-vue";
  import {mapGetters} from "vuex";
  import store from "@/views/pams/performance/deposit/ckzhtzxx/CkzhtzxxList";
  import {getAction} from "@/api/manage";
  import moment from "moment";

  export default {
    name: "CamsZcsxYjzrbgList",
    mixins:[JeecgListMixin],
    components: {
      CamsZcsxYjzrbgModal,
      YjzrbgPrintModal,
      JInput,EdcsModal
    },
    data () {
      return {
        description: '一键准入报告管理页面',
        // 查询原因 1：贷款审批 2：信用卡审批 3：贷后管理 4：担保资格审查 5：特约商户实名审查
        cxyy: 1,
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
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '核查状态',
            align: "center",
            dataIndex: 'hczt_dictText'
          },
          {
            title: '信用评分',
            align: "center",
            dataIndex: 'xypf'
          },
          {
            title: '风险等级',
            align: "center",
            dataIndex: 'fxdj_dictText'
          },
          {
            title: '测算额度',
            align: "center",
            dataIndex: 'csed'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/yjzrbg/camsZcsxYjzrbg/list",
          delete: "/yjzrbg/camsZcsxYjzrbg/delete",
          // deleteBatch: "/yjzrbg/camsZcsxYjzrbg/deleteBatch",
          exportXlsUrl: "yjzrbg/camsZcsxYjzrbg/exportXls",
          importExcelUrl: "yjzrbg/camsZcsxYjzrbg/importExcel",
          query: "/creditreportquery/yjzrbgquery",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      ...mapGetters(["nickname", "avatar", "userInfo", "orgCode"]),

      cxyyChange: function(e) {
        // console.info('查询原因：',e)
        this.cxyy = e.target.value
      },
      handleEdcs(record){
        this.$refs.edcsModalForm.edit(record)
      },
      /**
       * 打印
       * @param record
       */
      handlePrint: function (record) {
        console.info('打印', record)
        if (this.cxyy === undefined || this.cxyy === '') {
          notification.warning({message: '系统提示', description: '请选择查询原因！', duration: 4})
          return false
        }
        //页面初始信息获取：
        this.loading = true
        getAction(this.url.query,{}).then((res)=>{
          if (res.success) {
            // console.info('AREA_NAME',res.result.AREA_NAME)
            // console.info('Q_BRANCH_NO',res.result.Q_BRANCH_NO)
            // console.info('Q_BRANCH_NAME',res.result.Q_BRANCH_NAME)
            // console.info('Q_USER_NAME',res.result.Q_USER_NAME)
            // console.info('BGXH',res.result.BGXH)
            this.$refs.printModalForm.reportNo=res.result.Q_BRANCH_NO+'-'+moment(new Date()).format("YYYYMMDD")+'-'+res.result.BGXH
            this.$refs.printModalForm.areaName=res.result.AREA_NAME
            this.$refs.printModalForm.queryInfo.cxjg=res.result.Q_BRANCH_NAME
            this.$refs.printModalForm.queryInfo.cxczy=res.result.Q_USER_NAME
          }
        }).catch((error)=>{
          console.info(this.url.query+':'+'查询失败！',error)
        }).finally(()=>{
          this.loading = false
          this.$refs.printModalForm.cxyy=this.cxyy
          this.$refs.printModalForm.init(record);
        })
      },
      /**
       * 预览/打印 窗口关闭
       */
      printModalFormClose: function () {
        this.loadData()
      },

      tq(){
        getAction("/yjzrbg/camsZcsxYjzrbg/getzxbg").then(res=>{
          if (res.success){
            this.successInfo("提取成功")
          }else {
            this.errorInfo("提取失败")
          }
        })
      },

      tqydd(){
        getAction("/yjzrbg/camsZcsxYjzrbg/toYdyxpt").then(res=>{
          if (res.success){
            this.successInfo("提取成功")
          }else {
            this.errorInfo("提取失败")
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>