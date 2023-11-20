<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item>
          </a-col>

<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--              {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户经理金融普汇数据汇总')" style="margin-left: 8px">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2120 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

        <span slot="sszh" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfx_Jrphsj_Khjl-modal ref="modalForm" @ok="modalFormOk"></tjfx_Jrphsj_Khjl-modal>
  </a-card>
</template>

<script>
  import Tjfx_Jrphsj_KhjlModal from './modules/Tjfx_Jrphsj_KhjlModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '../../../../../utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'
  import moment from 'moment'

  export default {
    name: "Tjfx_Jrphsj_KhjlList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      Tjfx_Jrphsj_KhjlModal,JTreeSelect
    },
    data () {
      return {
        description: '客户经理金融普惠数据汇总管理页面',
        // 表头
        isAll: false,
        sszh :'',
        flag: true,
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            width:120,
            customRender:function (text) {
              return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
            },
            sorter: true,
          },

          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
            width: 100,
            scopedSlots: { customRender: 'sszh' },
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'yggh_dictText',
          },
          {
            title: '信息采集',
            children: [
              {
                title: '走访户数',
                align: 'center',
                dataIndex: 'zfhs',
                width:80
              },
              {
                title: '其中有效户数',
                align: 'center',
                dataIndex: 'qzyxzfhs',
                width:120
              }
            ]
          },
          {
            title: '背靠背评议',
            children: [
              {
                title: '评议户数',
                align: 'center',
                dataIndex: 'pyhs',
                width:80
              },
              {
                title: '其中电子评议',
                align: 'center',
                dataIndex: 'qzdzpy',
                width:120

              },
              {
                title: '其中纸质评议',
                align: 'center',
                dataIndex: 'qzzzpy',
                width:120
              },
              {
                title: '其中开会评议',
                align: 'center',
                dataIndex: 'qzhypy',
                width:120
              },
              {
                title: '其中电话评议',
                align: 'center',
                dataIndex: 'qzdhpy',
                width:120
              },
              {
                title: '其中微信评议',
                align: 'center',
                dataIndex: 'qzwxpy',
                width:120
              },
            ]
          },

          {
            title: '评级授信',
            children: [
              /*{
                title: '信贷系统授信户数',
                align: 'center',
                dataIndex: 'xdxtsxhs'
              },
              {
                title: '信贷系统授信金额',
                align: 'center',
                dataIndex: 'xdxtsxje'
              },*/
              {
                title: '平板授信户数',
                align: 'center',
                dataIndex: 'pbdsxhs'
              },
              {
                title: '平板端授信金额',
                align: 'center',
                dataIndex: 'pbdsxje'
              },
              {
                title: '有效评议+有效授信记录',
                align: 'center',
                dataIndex: 'sxgzpyhs',
                width:200
              }
            ]
          },
         /* {
            title: '授信工作',
            align: 'center',
            children: [
              {
                title: '有效评议+有效授信记录',
                align: 'center',
                dataIndex: 'sxgzpyhs',
                width:200
              }
            ]
          },*/

          {
            title: '公示',
            children: [
              {
                title: '公示户数',
                align: 'center',
                dataIndex: 'gshs'
              },
              {
                title: '公示金额',
                align: 'center',
                dataIndex: 'gsje'
              }
            ]
          },
          {
            title: '用信',
            children: [
              {
                title: '用信户数',
                align: 'center',
                dataIndex: 'yxhs'
              },
              {
                title: '用信金额',
                align: 'center',
                dataIndex: 'yxje'
              },
            ]
          },
          // {
          //   title: '用信',
          //   children: [
          //     {
          //       title: '用信户数',
          //       align: 'center',
          //       dataIndex: 'yxhs'
          //     },
          //     {
          //       title: '用信金额',
          //       align: 'center',
          //       dataIndex: 'yxje'
          //     },
          //     {
          //       title: '7月贷款净增户',
          //       align: 'center',
          //       dataIndex: 'qydkjzh'
          //     },
          //     {
          //       title: '其他户数净增',
          //       align: 'center',
          //       dataIndex: 'qthsjz'
          //     }
          //   ]
          // },
          //
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: 'center',
          //   scopedSlots: { customRender: 'action' }
          // }
        ],
		url: {
          list: "/Tjfx_Jrphsj_Khjl/tjfx_Jrphsj_Khjl/list",
          delete: "/Tjfx_Jrphsj_Khjl/tjfx_Jrphsj_Khjl/delete",
          deleteBatch: "/Tjfx_Jrphsj_Khjl/tjfx_Jrphsj_Khjl/deleteBatch",
          exportXlsUrl: "Tjfx_Jrphsj_Khjl/tjfx_Jrphsj_Khjl/exportXls",
          importExcelUrl: "Tjfx_Jrphsj_Khjl/tjfx_Jrphsj_Khjl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date()
        let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curDate)
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

        if ((params.tjyf == 'undefined' || params.tjyf == null) && this.flag == true) {
          params.tjyf = this.defaultMonthOpera.format('YYYY-MM') + '-01'
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

      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
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
      handleExportXls(fileName){
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        //let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // if (param.tjyf != null){
        //   param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>