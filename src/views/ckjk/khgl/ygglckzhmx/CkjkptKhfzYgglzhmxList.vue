<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" v-model="queryParam.zzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属岗位">
              <j-dict-select-tag placeholder="请选择所属岗位" v-model="queryParam.gwbz" :pleaseSelect="false"
                                 dictCode="hr_bas_post, gwmc, gwbz" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月余额">
              <a-input placeholder="" v-model="queryParam.ckye_begin" style="width: 40%; text-align: center" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input placeholder="" v-model="queryParam.ckye_end"
                       style="width: 40%; text-align: center; border-left: 0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联类型">
              <j-dict-select-tag placeholder="请选择关联类型" v-model="queryParam.glbz" dict-code="glbz"></j-dict-select-tag>
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
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
     <!-- <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工关联存款账户明细')" v-has="'ygglckzhmx:exportXls'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'ygglckzhmx:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="glid"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{x:3000}"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'ygglckzhmx:handle'">查看</a>
          <!--<a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptKhfzYgglzhmx-modal ref="modalForm" @ok="modalFormOk"></ckjkptKhfzYgglzhmx-modal>
    <ygckzhfx ref="ygckzhfxModal" @ok="modalFormOk"></ygckzhfx>

  </a-card>
</template>

<script>
  import CkjkptKhfzYgglzhmxModal from './modules/CkjkptKhfzYgglzhmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import {putAction, getAction, downFile} from '../../../../api/manage'
  import ygckzhfx from './modules/ygckzhfx'
  import store from '@/store/'

  export default {
    name: 'CkjkptKhfzYgglzhmxList',
    mixins: [JeecgListMixin],
    components: {
      CkjkptKhfzYgglzhmxModal,
      JTreeSelect,
      ygckzhfx
    },
    data () {
      return {
        description: '员工关联存款账户明细管理页面',
        monthFormat: 'YYYY-MM',
        defaultMonthOpera: '',
        isorter: {
          order: 'desc'
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            customRender (text) {
              return text.length > 7 ? text.substring(0, 7) : text
            },
            sorter: true
          },
          {
            title: '组织标识',
            align: 'center',
            dataIndex: 'zzbz',
            sorter: true
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align: 'center',
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align: 'center',
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: 'center',
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'yggh_dictText'
          },
          {
            title: '开户机构',
            align: 'center',
            dataIndex: 'khjg'
          },
          {
            title: '开户日期',
            align: 'center',
            dataIndex: 'khrq'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '存款账号',
            align: 'center',
            dataIndex: 'ckzh'
          },
          {
            title: '卡号',
            align: 'center',
            dataIndex: 'kh'
          },
          {
            title: '户名',
            align: 'center',
            dataIndex: 'zhmc'
          },
          {
            title: '电话号码',
            align: 'center',
            dataIndex: 'dhhm'
          },
          {
            title: '存期',
            align: 'center',
            dataIndex: 'cq'
          },
          {
            title: '本期起息日',
            align: 'center',
            dataIndex: 'bqqxr'
          },
          {
            title: '本期截至日',
            align: 'center',
            dataIndex: 'bqjzr'
          },
          {
            title: '账户性质',
            align: 'center',
            dataIndex: 'zhxz_dictText'
          },
          {
            title: '关联比率(%)',
            align: 'center',
            dataIndex: 'glbl'
          },
          {
            title: '关联标识',
            align: 'center',
            dataIndex: 'glbz_dictText'
          },
          {
            title: '年初',
            align: 'center',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'clye'
              },
              {
                title: '月日平',
                align: 'center',
                dataIndex: 'clyrp'
              },
              {
                title: '年日平',
                align: 'center',
                dataIndex: 'clnrp'
              }
            ]
          },
          {
            title: '本月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'ckye'
              },
              {
                title: '月日平',
                align: 'center',
                dataIndex: 'ckrpye'
              },
              {
                title: '年日平',
                align: 'center',
                dataIndex: 'nckrpye'
              }
            ]
          },
          {
            title: '关联考核数据',
            align: 'center',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'zshckye'
              },
              {
                title: '月日平',
                align: 'center',
                dataIndex: 'zshckrpye'
              },
              {
                title: '年日平',
                align: 'center',
                dataIndex: 'zshnckrpye'
              }
            ]
          },
          /**
           * TODO：因`查看`功能尚未完善，故暂时屏蔽
           */
           {
             title: '操作',
             dataIndex: 'action',
             align: "center",
             scopedSlots: {customRender: 'action'},
             fixed: 'right',
             width: '100'
           }
        ],
        url: {
          list: '/ygglckzhmx/ckjkptKhfzYgglzhmx/list',
          ygzhfxlist:'/ygglckzhmx/ckjkptKhfzYgglzhmx/queryList',
          delete: '/ygglckzhmx/ckjkptKhfzYgglzhmx/delete',
          deleteBatch: '/ygglckzhmx/ckjkptKhfzYgglzhmx/deleteBatch',
          exportXlsUrl: 'ygglckzhmx/ckjkptKhfzYgglzhmx/exportXls',
          importExcelUrl: 'ygglckzhmx/ckjkptKhfzYgglzhmx/importExcel',
          init: 'ygglckzhmx/ckjkptKhfzYgglzhmx/init'
        }
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created () {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth () {
        let curDate = new Date()
        let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset() {
        this.queryParam = {tjyf: undefined, zzbz: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      loadData (arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        //日期格式调整
        let tjrqment = ''
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format('YYYY-MM') + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.tjyf) {
          param.tjyf = tjrqment
        }
        return filterObj(param)
      },
      init () {
        let tjyf = ''
        let params = this.getQueryParams()
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择统计月份！")
          return false
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM")+"-01"
        }
        this.loading = true
        putAction(this.url.init, { 'tjyf': tjyf }).then((res) => {
          if (res.success) {
            this.$message.success('提取成功！')
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error('提取失败！', error)
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        console.log('this/param', param)
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },
      /**
       * 客户账户`存款余额/月日平`趋势分析 - 查看
       * @param record
       */
      handleView: function (record) {
        this.$refs.ygckzhfxModal.visible=true;
        this.$refs.ygckzhfxModal.confirmLoading=true;
        putAction(this.url.ygzhfxlist, {zjhm:record.zjhm}).then((res) => {
          if (res.success) {
            this.$refs.ygckzhfxModal.dataRows=res.result;
            this.$refs.ygckzhfxModal.init();
            console.log(res.result)
          }
        }).finally(()=>{
          this.$refs.ygckzhfxModal.confirmLoading=false;
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>