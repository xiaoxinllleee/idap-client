<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行代码">
              <j-tree-select placeholder="请选择支行" v-model="queryParam.sjywjgdm"
                             pidField="sjywjgdm_b"
                             treeNodeFilterProp="title"
                             dict="v_hr_bas_organization, zzjc, ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                              :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms,ZZJC,ywjgdm" pidField="sjywjgdm"
                             treeNodeFilterProp="title"
                              :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <j-input placeholder="请输入户名" v-model="queryParam.hm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号">
              <a-input placeholder="请输入客户账号" v-model="queryParam.khzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="帐号性质">
                <a-select placeholder="全部" style="width: 120px" v-model="queryParam.zhxz">
                  <a-select-option value="1">
                    对私活期
                  </a-select-option>
                  <a-select-option value="2">
                    对公活期
                  </a-select-option>
                  <a-select-option value="3">
                    定期
                  </a-select-option>
                  <a-select-option value="4">
                    一本通
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="开户日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" :format="DateFormat"
                                @change="onChange" style="width: 100%;" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账户余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.zhye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.zhye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">

              <a-form-item label="月存款日平余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.yzhrpye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.yzhrpye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>

            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="年存款日平余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.nzhrpye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.nzhrpye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
                <!--              <a-input style="width: 45%" v-model="queryParam.nzhrpyeS"></a-input>-->
                <!--              至-->
                <!--              <a-input style="width: 45%" v-model="queryParam.nzhrpyeE"></a-input>-->
              </a-form-item>
            </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button  icon="bulb" @click="handleDistribution" v-has="'dfpckzhgl:distribution'">分配</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('待分配存款帐号管理')" v-has="'dfpckzhgl:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="khzh"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2500}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dfpckzhgl:edit'">编辑</a>

          <a-divider type="vertical" />

                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'dfpckzhgl:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>
        <span slot="address" slot-scope="text">
          <j-ellipsis :value="text" :length="10"></j-ellipsis>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptDfpckzh-modal ref="modalForm" @ok="modalFormOk"></ckjkptDfpckzh-modal>
    <account-info-detail ref="accountInfoDetail" @close="handlerColseWindow"/>
  </a-card>
</template>

<script>
import CkjkptDfpckzhModal from './modules/CkjkptDfpckzhModal'
import AccountInfoDetail from './modules/AccountInfoDetail'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JEllipsis from "../../../../components/jeecg/JEllipsis";
import JInput from "@/components/jeecg/JInput"
import moment from 'moment'
import store from '@/store/'

export default {
  name: 'CkjkptDfpckzhList',
  mixins: [JeecgListMixin],
  components: {
    CkjkptDfpckzhModal, JTreeSelect, AccountInfoDetail,JEllipsis, JInput
  },
  data () {
    return {
      description: '待分配存款帐号管理管理页面',
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
          title: '支行代码',
          align: 'center',
          dataIndex: 'sjywjgdm',
          width: 100
        },
        {
          title: '支行名称',
          align: 'center',
          dataIndex: 'sjywjgdm_dictText',
          width: 100
        },
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'jgdm',
          width: 100
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgdm_dictText',
          width: 100
        },
        {
          title: '客户账号',
          align: 'center',
          dataIndex: 'khzh',
          width: 200
        },
        {
          title: '卡号',
          align: 'center',
          dataIndex: 'kh'
        },
        {
          title: '户名',
          align: 'center',
          dataIndex: 'hm',
          width: 100
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm',
          width: 180
        },
        {
          title: '开户日期',
          align: 'center',
          dataIndex: 'khrq',
          width: 100
        },
        {
          title: '帐号性质',
          align: 'center',
          dataIndex: 'zhxz_dictText',
          width: 100
        },
        {
          title: '存期',
          align: 'center',
          dataIndex: 'cq',
          width: 100
        },
        {
          title: '本期起息日',
          align: 'center',
          dataIndex: 'bqqxr',
          width: 100
        },
        {
          title: '本期截至日',
          align: 'center',
          dataIndex: 'bqjzr',
          width: 100
        },
        {
          title: '账户余额',
          align: 'center',
          dataIndex: 'zhye',
          width: 100
        },
        {
          title: '月存款日平余额',
          align: 'center',
          dataIndex: 'yzhrpye',
          width: 150
        },
        {
          title: '年存款日平余额',
          align: 'center',
          dataIndex: 'nzhrpye',
          width: 150
        },
        {
          title: '地址',
          align: 'center',
          dataIndex: 'dz',
          scopedSlots: { customRender: 'address' }
        },
        {
          title: '录入标识',
          align: 'center',
          dataIndex: 'lrbz_dictText',
          width: 100
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'lrsj',
          width: 100
        },
        {
          title: '录入操作员',
          align: 'center',
          dataIndex: 'lrczy',
          width: 100
        }
      ],
      url: {
        list: '/dfpckzhgl/ckjkptDfpckzh/list',
        delete: '/dfpckzhgl/ckjkptDfpckzh/delete',
        deleteBatch: '/dfpckzhgl/ckjkptDfpckzh/deleteBatch',
        exportXlsUrl: 'dfpckzhgl/ckjkptDfpckzh/exportXls',
        importExcelUrl: 'dfpckzhgl/ckjkptDfpckzh/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created () {
    this.queryParam.endTime = moment(new Date()).format('YYYY-MM-DD');
  },
  methods: {
    moment,
    searchReset() {
      this.queryParam = {jgdm: undefined, sjywjgdm: undefined};
      if(!store.getters.isRoot) {
        this.queryParam.jgdm = store.getters.ywjgdm
        this.queryParam.sjywjgdm = store.getters.ywjgdm
      }
      this.loadData(1);
    },
    onChange (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    handleDistribution () {
      if (!this.queryParam.jgdm){
        this.$message.warning("请选择机构代码");
        return
      }
      this.$refs.accountInfoDetail.init(this.queryParam);
    },
    handlerColseWindow(args) {
      this.searchReset();
      console.log('`分配存款账号`窗口已关闭！')
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>