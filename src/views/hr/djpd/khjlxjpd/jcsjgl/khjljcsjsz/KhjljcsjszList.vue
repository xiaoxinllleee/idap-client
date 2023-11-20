<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织机构"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定周期">
              <a-select placeholder="全部" v-model="queryParam.pdzq" :change="handlePdzq()">
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="评定年份" v-if="pdzqY">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <!--<a-form-item  label="评定日期" v-if="this.queryParam.pdzq=='YYYY'">
              <a-year-picker placeholder="请选择评定年份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>-->
            <a-form-item label="评定季度" v-if="pdzqQ">
              <a-select placeholder="评定季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定季度" v-model="pdjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item  label="评定月份" v-if="pdzqM">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>

            <a-form-item  label="评定日期" v-if="pdzqD">
              <a-date-picker placeholder="请选择评定日期" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定日期">
              <a-date-picker placeholder="请输入评定日期" v-model="queryParam.pdrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>-->
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <!--<a-input placeholder="请输入岗位标识" v-model="queryParam.gwbz"></a-input>-->
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理名称">
              <a-input placeholder="请输入客户经理名称" v-model="queryParam.ygxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否参与评定">
              <a-select placeholder="全部" v-model="queryParam.sfcypd">
                <a-select-option value="1">
                  是
                </a-select-option>
                <a-select-option value="2">
                  不参与评定
                </a-select-option>
                <a-select-option value="3">
                  不参与评定与统计
                </a-select-option>
              </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Khjljcsjsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户经理基础数据设置')" v-has="'Khjljcsjsz:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Khjljcsjsz:imp'">导入</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="sfzhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Khjljcsjsz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Khjljcsjsz:del'">删除</a>
                </a-popconfirm>
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>

              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <khjljcsjsz-modal ref="modalForm" @ok="modalFormOk"></khjljcsjsz-modal>
  </a-card>
</template>

<script>
  import KhjljcsjszModal from './modules/KhjljcsjszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from "moment"
  import { filterObj } from '@/utils/util'
  import { deleteAction } from '@api/manage'
  import ExcelImport from '@comp/common/ExcelImport'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "KhjljcsjszList",
    mixins:[JeecgListMixin],
    components: {
      KhjljcsjszModal,JTreeSelect,ExcelImport,JEllipsis
    },
    data () {
      return {
        dateValue: '',
        pdzqD: null,
        pdzqM: null,
        pdzqQ: null,
        pdzqY: null,
        pdnf:'',
        jdssnf:'',
        pdjd:'',
        description: '客户经理基础数据设置管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '评定周期',
            align:"center",
            dataIndex: 'pdzq_dictText'
           },
		   {
            title: '评定日期',
            align:"center",
            dataIndex: 'pdrq'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
           },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbz'
          },
		   {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'ygxm'
           },
          {
            title: '身份证号码',
            align:"center",
            dataIndex: 'sfzhm',
            scopedSlots: { customRender: 'sfzhm' }
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'age'
          },
          {
            title: '工龄',
            align:"center",
            dataIndex: 'gl'
          },
          {
            title: '电话',
            align:"center",
            dataIndex: 'phone'
          },

		   {
            title: '入行时间',
            align:"center",
            dataIndex: 'rhsj',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
         },
         sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
         width: 100
           },
		   {
            title: '从事客户经理时间',
            align:"center",
            dataIndex: 'cskhjlsj',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
         },
         sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
         width: 100
           },
          {
            title: '是否参与评定',
            align:"center",
            dataIndex: 'sfcypd_dictText'
          },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khjljcsjsz/khjljcsjsz/list",
          delete: "/khjljcsjsz/khjljcsjsz/delete",
          deleteBatch: "/khjljcsjsz/khjljcsjsz/deleteBatch",
          exportXlsUrl: "khjljcsjsz/khjljcsjsz/exportXls",
          importExcelUrl: "khjljcsjsz/khjljcsjsz/importExcel",
          exportTemplateUrl: "/khjljcsjsz/khjljcsjsz/exportTemplateXls",
       },
          exportTemplateName:'客户经理基础数据设置导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.queryParam.pdzq = 'YYYY'
      this.dqnf();
    },
    methods: {
      handlePdzq(){
        var param = this.queryParam
        if(param.pdzq=="DD"){
          this.pdzqD=true
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=false
        }else if(param.pdzq=="MM") {
          this.pdzqD=false
          this.pdzqM=true
          this.pdzqQ=false
          this.pdzqY=false
        } else if (param.pdzq=="Q") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=true
          this.pdzqY=false
        } else if (param.pdzq=="YYYY") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=true
        }
      },

      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      // 下拉选择Func
      selectValue(value){
        console.log('ZhdjglList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        console.log('KhjljcsjszList => getQueryParams()')
        console.log(this.pdnf)
        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if(pdzq=="DD"){
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined'){
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM-DD")
            }
          }else if(pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM")+"-01"
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-01-01'
            }
          }
        }
        console.log('查询 => pdzq::::::::::' + pdzq)
        console.log('查询 => pdrqMoment::::' + pdrqMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.pdrq=pdrqMoment;
        return filterObj(param);
      },

      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {
          pdzq: record.pdzq,
          gwbz: record.gwbz,
          yggh: record.yggh,
          pdrq: record.pdrq,
          zzbz: record.zzbz
        }).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      // 查询条件重置Func
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.pdjd=''
        this.pdnf =''

        this.loadData(1)
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>