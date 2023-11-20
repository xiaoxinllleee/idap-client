<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交叉客户名称">
              <a-input placeholder="请输入交叉客户名称" v-model="queryParam.jckhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交叉证件号码">
              <a-input placeholder="请输入交叉证件号码" v-model="queryParam.jczjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交叉机构名称">
              <j-tree-select placeholder="请选择交叉机构名称"
                             v-model="queryParam.jcjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <a-select placeholder="请选择贷款类型" v-model="queryParam.dklx">
                <a-select-option value="1">
                  表内贷款
                </a-select-option>
                <a-select-option value="2">
                  表外贷款
                </a-select-option>
                <a-select-option value="3">
                  贷记卡
                </a-select-option>
                <a-select-option value="4">
                  便民卡
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="授信/用信金额">
              <a-input-number placeholder="Minimum" v-model="queryParam.dkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.dkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交叉余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.jcye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.jcye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交叉类型">
                <a-select placeholder="请选择交叉类型" v-model="queryParam.jclx">
                  <a-select-option value="1">
                    有表外贷款，同时存在表内，贷记卡，便民卡中的一种
                  </a-select-option>
                  <a-select-option value="2">
                    同时存在贷记卡，便民卡
                  </a-select-option>
                  <a-select-option value="3">
                    同时存在表内贷款，贷记卡
                  </a-select-option>
                  <a-select-option value="4">
                    借款人或关联人在不同网点有借款
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('交叉贷款明细')" v-has="'jcdkmx:exportXls'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'jcdkmx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'jcdkmx:handle'">详情</a>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
<!--        <span slot="crosstype" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="24"></j-ellipsis>-->
<!--        </span>-->
        <span slot="jckhmc" slot-scope="text">
          <j-ellipsis :value="text" :length="12"></j-ellipsis>
        </span>
        <span slot="crossidentno" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jcdkmx-modal ref="modalForm" @ok="modalFormOk"></jcdkmx-modal>
  </a-card>
</template>

<script>
  import JcdkmxModal from './modules/JcdkmxModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction} from '@/api/manage'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";

  export default {
    name: "JcdkmxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JcdkmxModal, JTreeSelect
    },
    data() {
      return {
        description: '交叉贷款明细管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
        /*  {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: 80
          },*/
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160
          },
          {
            title: '贷款类型',
            align: "center",
            dataIndex: 'dklx_dictText',
            width: 100
          },
          {
            title: '授信/用信金额',
            align: "center",
            dataIndex: 'dkye',
            width: 120
          },
          {
            title: '交叉类型',
            align: "center",
            dataIndex: 'jclx_dictText',
          },
          {
            title: '交叉机构名称',
            align: "center",
            dataIndex: 'jcjgdm_dictText',
            width: 110
          },
          {
            title: '交叉客户名称',
            align: "center",
            dataIndex: 'jckhmc',
            scopedSlots: {customRender: 'jckhmc'},
            width: 200
          },
          {
            title: '交叉证件号码',
            align: "center",
            dataIndex: 'jczjhm',
            scopedSlots: {customRender: 'crossidentno'},
            width: 180,
          },
          {
            title: '交叉贷款类型',
            align: "center",
            dataIndex: 'jcdklx_dictText',
            width: 120
          },
          {
            title: '交叉余额',
            align: "center",
            dataIndex: 'jcye',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            fixed: "right",
            width: 130
          }
        ],
        url: {
          list: "/jcdkmx/jcdkmx/list",
          delete: "/jcdkmx/jcdkmx/delete",
          deleteBatch: "/jcdkmx/jcdkmx/deleteBatch",
          exportXlsUrl: "jcdkmx/jcdkmx/exportXls",
          importExcelUrl: "jcdkmx/jcdkmx/importExcel",
          init: "/jcdkmx/jcdkmx/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      // 查看详情Func
      handleView: function (record) {
        console.log('JcdkmxList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看交叉贷款信息明细";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
      },

      init() {
        this.loading=true;
        getAction(this.url.init).then((response) => {
          if (response.success) {
            this.$message.success('提取成功！')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>