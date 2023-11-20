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
                             getAllZzjg="1"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
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
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="评定年份">
              <a-select placeholder="请选择评定年份" v-model="queryParam.pjnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评价结果">
              <a-select placeholder="全部" v-model="queryParam.pjjg">
                <a-select-option value="1">
                  优秀
                </a-select-option>
                <a-select-option value="2">
                  良好
                </a-select-option>
                <a-select-option value="3">
                  一般
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
      <a-button icon="download" @click="handleExportXls('支行综合评价')" v-has="'Zhzhpj:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Zhzhpj:imp'">导入</a-button>
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
        rowKey=""
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Zhzhpj:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Zhzhpj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <zhzhpj-modal ref="modalForm" @ok="modalFormOk"></zhzhpj-modal>
  </a-card>
</template>

<script>
  import ZhzhpjModal from './modules/ZhzhpjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import {deleteAction} from "@/api/manage";
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "ZhzhpjList",
    mixins: [JeecgListMixin],
    components: {
      ZhzhpjModal, JTreeSelect,ExcelImport
    },
    data() {
      return {
        dateValue: '',
        description: '支行综合评价管理页面',
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
            title: '机构名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh'
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'khjlbz'
          },
          {
            title: '客户经理名称',
            align: "center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '评价年份',
            align: "center",
            dataIndex: 'pjnf'
          },
          {
            title: '评价结果',
            align: "center",
            dataIndex: 'pjjg_dictText'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
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
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/zhzhpj/zhzhpj/list",
          delete: "/zhzhpj/zhzhpj/delete",
          deleteBatch: "/zhzhpj/zhzhpj/deleteBatch",
          exportXlsUrl: "zhzhpj/zhzhpj/exportXls",
          importExcelUrl: "zhzhpj/zhzhpj/importExcel",
          exportTemplateUrl: "/zhzhpj/zhzhpj/exportTemplateXls",
        },
        exportTemplateName:'支行综合评价导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },

    created() {
      this.dqnf();
    },

    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zzbz: record.zzbz,gwbz: record.gwbz,yggh: record.yggh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      // 获取当前年份
      dqnf() {
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      // 下拉选择Func
      selectValue(value) {
        console.log('ZhzhpjList => selectValue(value)')
        console.log('selectValue::::' + value)
        let val = value;
        this.$emit('change', val);
      },

      /*getQueryParams() {
        var param = this.queryParam
        let pjnf=this.queryParam.pjnf
        let pjnfMoment = ""
        if (queryParam.pjnf != '') {
          pjnfMoment = queryParam.pjnf + '-01-01'
        }
        console.log('查询 => pjnf::::::::::' + pjnf)
        console.log('查询 => pjnfMoment::::' + pjnfMoment)
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.pjnf = pjnfMoment;
        return filterObj(param);
      },*/

      // 查询条件重置Func
      /*searchReset() {
        this.queryParam = {}
        // 重置时清除评定年份
        queryParam.pjnf =''

        this.loadData(1)
      }*/
  }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>