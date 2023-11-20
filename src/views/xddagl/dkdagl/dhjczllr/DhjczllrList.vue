<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="附件年份">
              <a-select :defaultValue="dateValue" v-model="queryParam.fjnf" @change="selectValue" placeholder="请选择">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户姓名">
                <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="单户贷款金额">
                <a-input-number placeholder="" v-model="queryParam.dhdkje_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="" v-model="queryParam.dhdkje_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="单户贷款余额">
                <a-input-number placeholder="" v-model="queryParam.dhdkye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="" v-model="queryParam.dhdkye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="附件类型">
                <!--              <a-input placeholder="全部" v-model="queryParam.fjlx"></a-input>-->
                <j-dict-select-tag placeholder="请选择资料类型" v-model="queryParam.fjlx" dict-code="dhjczllr"/>
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
      <a-button  @click="handleAdd"  icon="plus" v-has="'dhjczllr:add'">上传附件</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('贷后检查资料录入')"
                v-has="'dhjczllr:exportXls'">导出
      </a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
              <a-button type="primary" icon="import">导入</a-button>
            </a-upload>-->
      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
            </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
              <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
              <a style="margin-left: 24px" @click="onClearSelected">清空</a>
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"

        @change="handleTableChange">


<!--        <span slot="zjhm" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dhjczllr:edit'">编辑</a>
          <a-divider type="vertical"/>
            <a @click="handleView(record)" v-has="'dhjczllr:handleView'">查看</a>

          <!--          <a-dropdown>
                      <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
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
    <dhjczllr-modal ref="modalForm" @ok="modalFormOk"></dhjczllr-modal>
  </a-card>
</template>

<script>
  import DhjczllrModal from './modules/DhjczllrModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'

  export default {
    name: "DhjczllrList",
    mixins: [JeecgListMixin],
    components: {
      DhjczllrModal, JTreeSelect, JEllipsis
    },
    data() {
      return {
        description: '贷后检查资料录入管理页面',
        dateValue: '',
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
            title: '客户姓名',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
          },
          {
            title: '单户贷款金额',
            align: "center",
            dataIndex: 'dhdkje'
          },
          {
            title: '单户贷款余额',
            align: "center",
            dataIndex: 'dhdkye'
          },
          {
            title: '最新借款日期',
            align: "center",
            dataIndex: 'zxjkrq'
          },
          {
            title: '附件年份',
            align: "center",
            dataIndex: 'fjnf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
          },
          {
            title: '附件类型',
            align: "center",
            dataIndex: 'fjlx_dictText'
          },
          {
            title: '附件时间节点',
            align: "center",
            dataIndex: 'fjsjjd_dictText'
          },
          {
            title: '文件名',
            align: "center",
            dataIndex: 'wjm',
            customRender: function (text) {
              return !text ? "" : (text.length >0 ? text.substr(text.lastIndexOf("/")+1): trxt)
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/dhjczllr/dhjczllr/list",
          delete: "/dhjczllr/dhjczllr/delete",
          deleteBatch: "/dhjczllr/dhjczllr/deleteBatch",
          exportXlsUrl: "dhjczllr/dhjczllr/exportXls",
          importExcelUrl: "dhjczllr/dhjczllr/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init();
    },
    methods: {
      selectValue(val) {
        console.log(val)
        this.queryParam.fjnf = val;
      },
      init() {
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.dateValue = year;
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + '-01-01'), label: ((year - i) + '')});
        }
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
        this.$refs.modalForm.addshow =false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.addshow = true;
        this.$refs.modalForm.show = true;
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
        this.$refs.modalForm.addshow = true;
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>