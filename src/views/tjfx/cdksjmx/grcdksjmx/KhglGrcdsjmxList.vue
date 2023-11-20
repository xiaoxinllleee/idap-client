<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否开通存款业务">
              <a-input placeholder="请输入是否开通存款业务" v-model="queryParam.sfktckyw"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input placeholder="请输入存款余额" v-model="queryParam.ckye"></a-input>
            </a-form-item>
          </a-col>-->
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button  icon="area-chart" @click="initData" v-has="'KhglGrcdsjmx:init'">提取</a-button>
      <a-button  icon="download" @click="handleExportXls('个人存贷款数据明细')" v-has="'KhglGrcdsjmx:exp'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :scroll="{ x: 3000 }"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="hhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="13"/>
        </span>
        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khglGrcdsjmx-modal ref="modalForm" @ok="modalFormOk"></khglGrcdsjmx-modal>
  </a-card>
</template>

<script>
  import KhglGrcdsjmxModal from './modules/KhglGrcdsjmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from "moment"
  import JEllipsis from '../../../../components/jeecg/JEllipsis'

  export default {
    name: "KhglGrcdsjmxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      KhglGrcdsjmxModal
    },
    data () {
      return {
        description: '个人存贷款数据明细管理页面',
        monthFormat: 'YYYY-MM',
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            sorter: true,
            width: 100,
          },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
            scopedSlots: {customRender: 'hhbm'},
            width: 120,
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            width: 100,
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160,
          },
          {
            title: '是否开通存款业务',
            align:"center",
            dataIndex: 'sfktckyw_dictText',
            width: 130,
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye',
            width: 100,
          },
          {
            title: '存款日平余额',
            align:"center",
            dataIndex: 'ckrpye',
            width: 120,
          },
          {
            title: '存款年日平余额',
            align:"center",
            dataIndex: 'cknrpye',
            width: 120,
          },
          {
            title: '活期存款余额',
            align:"center",
            dataIndex: 'hqckye',
            width: 120,
          },
          {
            title: '定期存款余额',
            align:"center",
            dataIndex: 'dqckye',
            width: 120,
          },
          {
            title: '活期存款日平余额',
            align:"center",
            dataIndex: 'hqckrpye',
            width: 130,
          },
          {
            title: '定期存款日平余额',
            align:"center",
            dataIndex: 'dqckrpye',
            width: 130,
          },
          {
            title: '活期存款年日平余额',
            align:"center",
            dataIndex: 'hqcknrpye',
            width: 140,
          },
          {
            title: '定期存款年日平余额',
            align:"center",
            dataIndex: 'dqcknrpye',
            width: 140,
          },
          {
            title: '存款最早开户日期',
            align:"center",
            dataIndex: 'ckzzkhrq',
            width: 140,
          },
          {
            title: '是否开通贷款业务',
            align:"center",
            dataIndex: 'sfktdkyw_dictText',
            width: 130,
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje',
            width: 100,
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 100,
          },
          {
            title: '贷款月日平',
            align:"center",
            dataIndex: 'dkyrp',
            width: 100,
          },
          {
            title: '贷款年日平',
            align:"center",
            dataIndex: 'dknrp',
            width: 100,
          },
          {
            title: '最近贷款到期日期',
            align:"center",
            dataIndex: 'zjdkdqrq',
            width: 150,
          },
          {
            title: '不良贷款余额',
            align:"center",
            dataIndex: 'bldkye',
            width: 110,
          },
          /*{
               title: '是否开通手机银行业务',
               align:"center",
               dataIndex: 'sfktsjyhyw'
              },
          {
               title: '是否开通网上银行业务',
               align:"center",
               dataIndex: 'sfktwsyhyw'
              },
          {
               title: '是否办理etc业务',
               align:"center",
               dataIndex: 'sfbletcyw'
              },*/
          {
            title: '贷款最早发放日期',
            align:"center",
            dataIndex: 'dkzzffrq',
            width: 140,
          },
          /* {
             title: '操作',
             dataIndex: 'action',
             align:"center",
             scopedSlots: { customRender: 'action' },
           }*/
        ],
        url: {
          list: "/tjfx.grcdksjmx/khglGrcdsjmx/list",
          delete: "/tjfx.grcdksjmx/khglGrcdsjmx/delete",
          deleteBatch: "/tjfx.grcdksjmx/khglGrcdsjmx/deleteBatch",
          exportXlsUrl: "tjfx.grcdksjmx/khglGrcdsjmx/exportXls",
          importExcelUrl: "tjfx.grcdksjmx/khglGrcdsjmx/importExcel",
          init: "tjfx.grcdksjmx/khglGrcdsjmx/init",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },

      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        getAction(this.url.init, {tjyf:tjyfstr}).then((res) => {
          if(res.success){
            this.loadData()
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
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