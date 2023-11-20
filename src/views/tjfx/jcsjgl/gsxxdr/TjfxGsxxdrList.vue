<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="统计月份">-->
<!--              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份"-->
<!--                              style="width: 100%;"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="公示日期">
              <a-date-picker v-model="queryParam.gsrq" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item/></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item/></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item/></a-col>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('公示信息')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>


    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxGsxxdr-modal ref="modalForm" @ok="modalFormOk"></tjfxGsxxdr-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import TjfxGsxxdrModal from './modules/TjfxGsxxdrModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import { downFile, putAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { filterObj } from '@/utils/util';
  import store from '@/store/'
  import { mapGetters } from 'vuex'

  export default {
    name: 'TjfxGsxxdrList',
    mixins: [JeecgListMixin],
    components: {
      TjfxGsxxdrModal, ExcelImport, JTreeSelect, JInput
    },
    data() {
      return {
        description: '公示信息导入',
        // 表头
        isAll: false,
        sszh :'',
        columns: [
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'sszh_dictText'
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'yggh_dictText'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '公示金额',
            align: 'center',
            dataIndex: 'gsje',
            sorter: true,
          },
          {
            title: '公示日期',
            align: 'center',
            dataIndex: 'gsrq',
            sorter: true,
          },
          {
            title: '公示次数',
            align: 'center',
            dataIndex: 'gscs',
            sorter: true,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/TjfxGsxxdr/tjfxGsxxdr/list',
          delete: '/TjfxGsxxdr/tjfxGsxxdr/delete2',
          deleteBatch: '/TjfxGsxxdr/tjfxGsxxdr/deleteBatch',
          exportXlsUrl: 'TjfxGsxxdr/tjfxGsxxdr/exportXls',
          importExcelUrl: 'TjfxGsxxdr/tjfxGsxxdr/importExcel',
          exportTemplateUrl: 'TjfxGsxxdr/tjfxGsxxdr/exportTemplateXls'

        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },

      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        let gsrqMoment = "";
        if (this.queryParam.gsrq) {
          gsrqMoment = this.queryParam.gsrq.format("YYYY-MM-DD");
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.gsrq = gsrqMoment;
        return filterObj(param);
      },
      //  统计月份
      // getQueryParams() {
      //   //获取查询条件
      //   let sqp = {}
      //   if(this.superQueryParams){
      //     sqp['superQueryParams']=encodeURI(this.superQueryParams)
      //   }
      //   let tjyfMoment = "";
      //   if (this.queryParam.tjyf) {
      //     tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
      //   }
      //   var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
      //   param.field = this.getQueryField();
      //   param.pageNo = this.ipagination.current;
      //   param.pageSize = this.ipagination.pageSize;
      //   param.tjyf = tjyfMoment;
      //   return filterObj(param);
      // },

      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '公示信息导入'
        this.$refs.excelImportModal.showModal(params)
      },
      importComplete(filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath')
        console.log(filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })

        this.loadData()
      },

      handleDelete: function(id) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        putAction('/TjfxGsxxdr/tjfxGsxxdr/delete2', id).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      handleEdit: function(record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = true
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>