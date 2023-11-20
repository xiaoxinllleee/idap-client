<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <!--<a-col :md="6" :sm="8">-->
            <!--<a-form-item label="统计月份">-->
              <!--<a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"-->
                              <!--:format="monthFormat" style="width: 100%;"/>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM"
                             treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item></a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="dkjkpt_khlx"/>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
      <!--      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>-->
      <a-button icon="download" @click="handleExportXls('逾期贷款监控')" style="margin-left: 8px;" v-has="'yqdkjk:exportXls'">导出
      </a-button>
      <!--      <a @click="handleToggleSearch" style="margin-left: 8px">-->
      <!--        {{ toggleSearchStatus ? '收起' : '展开' }}-->
      <!--        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
      <!--      </a>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600;">{{-->
<!--        selectedRowKeys.length }} </a>项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x:3000 }"
               @change="handleTableChange">
        <!-- 字符串超长截取省略号显示 -->
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="xddkpz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
    <vdkjkptYqdkjk-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import VdkjkptYqdkjkModal from './modules/VdkjkptYqdkjkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import JInput from '../../../../components/jeecg/JInput'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { getAction, putAction } from '@/api/manage'

  export default {
    name: 'VdkjkptYqdkjkList',
    mixins: [JeecgListMixin],
    components: {
      AFormItem,
      VdkjkptYqdkjkModal,
      JTreeSelect,
      JEllipsis,
      JInput
    },
    data() {
      return {
        description: '逾期贷款监控管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc'
        },
        // 表头
        columns: [
          /*  {
              title: '序号',
              dataIndex: '',
              key: 'rowIndex',
              width: 60,
              align: "center",
              customRender:function (t,r,index) {
                return parseInt(index)+1;
              }
            },*/
          {
            title: '数据日期',
            align: 'center',
            dataIndex: 'tjyf',
            customRender: function(text) {
              return !text ? '' : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            width: 100
          },
          /* {
             title: '机构代码',
             align:"center",
             dataIndex: 'jgdm',
             width: 120
           },*/
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            width: 130
          },
          {
            title: '地址',
            align: 'center',
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 130
          },
          {
            title: '电话号码',
            align: 'center',
            dataIndex: 'dhhm',
            width: 100
          },
          {
            title: '贷款金额',
            align: 'center',
            dataIndex: 'dkje',
            width: 120
          },
          {
            title: '贷款余额',
            align: 'center',
            dataIndex: 'dkye',
            width: 120
          },
          {
            title: '剩余天数',
            align: 'center',
            dataIndex: 'syts',
            width: 120,
            sorter: (a, b) => a.syts - b.syts
          },
          {
            title: '借款日期',
            align: 'center',
            dataIndex: 'jkrq',
            width: 120
          },
          {
            title: '到期日期',
            align: 'center',
            dataIndex: 'dqrq',
            width: 120,
            sorter: (a, b) => b.dqrq.replace(/-/g, '/') - a.dqrq.replace(/-/g, '/')
          },
          {
            title: '贷款账户',
            align: 'center',
            dataIndex: 'dkzh',
            width: 150
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '信贷贷款品种',
            align: 'center',
            dataIndex: 'xddkpz_dictText',
            scopedSlots: { customRender: 'xddkpz' },
            width: 150
          },
          {
            title: '客户经理工号',
            align: 'center',
            dataIndex: 'khjlyggh',
            width: 100
          },
          {
            title: '客户经理姓名',
            align: 'center',
            dataIndex: 'khjlyggh_dictText',
            width: 100
          },


          {
            title: '便民卡卡号',
            align: 'center',
            dataIndex: 'bmkkh',
            width: 150
          },
          {
            title: '起息日',
            align: 'center',
            dataIndex: 'qxr',
            width: 120
          },
          {
            title: '结息日',
            align: 'center',
            dataIndex: 'jxr',
            width: 120
          }

        ],
        url: {
          list: '/dkjkpt/ydqkjk/vdkjkptYqdkjk/list',
          delete: '/dkjkpt/ydqkjk/vdkjkptYqdkjk/delete',
          deleteBatch: '/dkjkpt/ydqkjk/vdkjkptYqdkjk/deleteBatch',
          exportXlsUrl: 'dkjkpt/ydqkjk/vdkjkptYqdkjk/exportXls',
          importExcelUrl: 'dkjkpt/ydqkjk/vdkjkptYqdkjk/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date()
        let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curDate)
      },
      searchReset() {
        this.flag = false
        // this.queryParam = {tjyf: undefined}
        // this.queryParam.tjyf = this.defaultMonthOpera
        this.loadData(1)
      },
      loadData(arg) {
        this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        // if ((params.tjyf == 'undefined' || params.tjyf == null) && this.flag == true) {
        //   params.tjyf = this.defaultMonthOpera.format('YYYY-MM') + '-01'
        // }
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
      getQueryParams() {
        let tjyfMoment = ''
        console.log(this.queryParam.tjyf)
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format('YYYY-MM') + '-01'
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        //时间参数不传递后台
        //delete param.tjyf;
        if (param.tjyf) {
          param.tjyf = tjyfMoment
        }
        return filterObj(param)
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>