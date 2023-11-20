<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号所在机构">
              <j-tree-select placeholder="全部" v-model="queryParam.branchNo" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangezjjyrq" v-model="queryParam.trnDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <j-tree-select placeholder="全部" v-model="queryParam.brNo"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对方机构号">
              <a-input placeholder="请输入对方机构号" v-model="queryParam.oppBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.brName"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交易柜员">
                <a-input placeholder="请输入交易柜员" v-model="queryParam.tellNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="卡号">
                <a-input placeholder="请输入卡号" v-model="queryParam.cardNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户名">
                <a-input placeholder="请输入户名" v-model="queryParam.accName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交易码">
                <a-input placeholder="请输入交易码" v-model="queryParam.trxCode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="终端号">
                <a-input placeholder="请输入终端号" v-model="queryParam.terminalNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交易金额">
                <a-input-number placeholder="Minimum" v-model="queryParam.amount_begin"
                                style="width: 40%; text-align: center" :min="0"/>
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled/>
                <a-input-number placeholder="Maximum" v-model="queryParam.amount_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.balance_begin"
                                style="width: 40%; text-align: center" :min="0"/>
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled/>
                <a-input-number placeholder="Maximum" v-model="queryParam.balance_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="借贷标志">
                <a-input placeholder="请输入借贷标志" v-model="queryParam.dbFlag"></a-input>
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
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款交易宽表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x: 10000}"
        @change="handleTableChange">

         <span slot="brName" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="oppBrNo" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>


        <!--    <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import {filterObj} from '@/utils/util'
  import {notification} from "ant-design-vue";
  import {getAction} from "@/api/manage";

  export default {
    name: "CkjykbList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect, JEllipsis
    },
    data() {
      return {
        description: '存款交易宽表管理页面',
        // 表头
        dateFormat: 'YYYYMMDD',
        columns: [
          {
            title: '',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '账号所在机构',
            align: "center",
            dataIndex: 'branchNo'
          },
          {
            title: '数据日期',
            align: "center",
            dataIndex: 'dataDate'
          },
          {
            title: '生成日期',
            align: "center",
            dataIndex: 'loadDate'
          },
          {
            title: '交易日期',
            align: "center",
            dataIndex: 'trnDate'
          },
          {
            title: '交易时间',
            align: "center",
            dataIndex: 'trnTime'
          },
          {
            title: '流水号',
            align: "center",
            dataIndex: 'jrnlNo'
          },
          {
            title: '机构号',
            align: "center",
            dataIndex: 'brNo'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'brName',
            scopedSlots: {customRender: 'brName'},
          },
          {
            title: '交易柜员',
            align: "center",
            dataIndex: 'tellNo'
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'accNo'
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'accName'
          },
          {
            title: '对方账号',
            align: "center",
            dataIndex: 'oppAccNo'
          },
          {
            title: '对方户名',
            align: "center",
            dataIndex: 'oppAccName'
          },
          {
            title: '对方机构号',
            align: "center",
            dataIndex: 'oppBrNo',
            scopedSlots: {customRender: 'oppBrNo'},
          },
          {
            title: '对方机构名称',
            align: "center",
            dataIndex: 'oppBrName'
          },
          {
            title: '币种',
            align: "center",
            dataIndex: 'curr'
          },
          {
            title: '交易码',
            align: "center",
            dataIndex: 'trxCode'
          },
          {
            title: '交易码名称',
            align: "center",
            dataIndex: 'trxName'
          },
          {
            title: '借款标志',
            align: "center",
            dataIndex: 'dbFlag'
          },
          {
            title: '金额',
            align: "center",
            dataIndex: 'amount'
          },
          {
            title: '凭证类型',
            align: "center",
            dataIndex: 'voucherType'
          },
          {
            title: '凭证号',
            align: "center",
            dataIndex: 'voucherNo'
          },
          {
            title: '授权号',
            align: "center",
            dataIndex: 'authTell'
          },
          {
            title: '过账日期',
            align: "center",
            dataIndex: 'postDate'
          },
          {
            title: '终端号',
            align: "center",
            dataIndex: 'terminalNo'
          },
          {
            title: '交易状态',
            align: "center",
            dataIndex: 'txStatus'
          },
          {
            title: '账号余额',
            align: "center",
            dataIndex: 'balance'
          },
          {
            title: '现金总额',
            align: "center",
            dataIndex: 'cashTots'
          },
          {
            title: '授权柜员名称',
            align: "center",
            dataIndex: 'authTellName'
          },
          {
            title: '渠道',
            align: "center",
            dataIndex: 'channel'
          },
          {
            title: '冲正标志',
            align: "center",
            dataIndex: 'correction'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'comments'
          },
          {
            title: '柜员名称',
            align: "center",
            dataIndex: 'tellName'
          },
          {
            title: '原流水号',
            align: "center",
            dataIndex: 'origJrnl'
          },
          {
            title: '记录号',
            align: "center",
            dataIndex: 'recNo'
          },
          {
            title: '交易渠道',
            align: "center",
            dataIndex: 'tranChannel'
          },
          {
            title: '凭证起始号码',
            align: "center",
            dataIndex: 'startSerialNo'
          },
          {
            title: '凭证终止号码',
            align: "center",
            dataIndex: 'endSerialNo'
          },
          {
            title: '提示码',
            align: "center",
            dataIndex: 'batchNo'
          },
          {
            title: '摘要',
            align: "center",
            dataIndex: 'mnemonic'
          },
          {
            title: '法人标识',
            align: "center",
            dataIndex: 'legalNo'
          },
          /*{
               title: 'endSerialNo',
               align:"center",
               dataIndex: 'endSerialNo'
              },
             {
               title: '操作',
               dataIndex: 'action',
               align:"center",
               scopedSlots: { customRender: 'action' },
             }*/
        ],
        url: {
          list: "/ckjykb/ckjykb/list",
          delete: "/ckjykb/ckjykb/delete",
          deleteBatch: "/ckjykb/ckjykb/deleteBatch",
          exportXlsUrl: "ckjykb/ckjykb/exportXls",
          importExcelUrl: "ckjykb/ckjykb/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            notification.warning({ message: '系统提示', description: res.message,duration: 4})
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            notification.warning({ message: '系统提示', description: res.message,duration: 4})
            this.loading = false;
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.trnDate;
        return filterObj(param);
      },
      onChangezjjyrq(value, dateString) {
        let trnDateString = dateString
        this.queryParam.trnDate_begin = trnDateString[0]
        this.queryParam.trnDate_end = trnDateString[1]

      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>