<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz" :tree-default-expand-all="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择所属营销单元" v-model="queryParam.ssyxdy"
                               dictCode="V_CZXXGL,VILLAGE,QYBM" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="档案编号">
            <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="企业名称">
              <j-input placeholder="请输入企业名称" v-model="queryParam.qymc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户重要程度">
              <j-dict-select-tag placeholder="请选择客户重要程度" v-model="queryParam.khzycd" dict-code="khzycd"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="企业法人">
              <j-input placeholder="请输入企业法人名称" v-model="queryParam.qymc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="法人证件号码">
              <a-input placeholder="请输入法人证件号码" v-model="queryParam.qymc"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <a @click="handleToggleSearch" style="margin-left: 8px">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
            </a>
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('企业客户信息管理')">导出</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 4000 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>-->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
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
        <span slot="detail" slot-scope="dabh, record">
          <a @click="handleDetail(record)">{{dabh}}</a>
        </span>
        <span slot="txdz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="12"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khglQyjbxx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import KhglQyjbxxModal from './modules/KhglQyjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "KhglQyjbxxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect,
      KhglQyjbxxModal
    },
    data () {
      return {
        description: '企业客户信息 管理页面',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText'
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'gskhjl_dictText'
          },
          {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '客户重要程度',
            align:"center",
            dataIndex: 'khzycd_dictText'
          },
          {
            title: '企业名称',
            align:"center",
            dataIndex: 'qymc'
          },
          {
            title: '通讯地址',
            align:"center",
            dataIndex: 'txdz',
            scopedSlots: { customRender: 'txdz' },
          },
          {
            title: '企业法人',
            align:"center",
            dataIndex: 'qyfr'
          },
          {
            title: '法人证件号码',
            align:"center",
            dataIndex: 'frzjhm'
          },
          {
            title: '法人联系方式',
            align:"center",
            dataIndex: 'frlxfs'
          },
          {
            title: '企业注册资本(万元)',
            align:"center",
            dataIndex: 'qyzcje'
          },
          {
            title: '成立日期',
            align:"center",
            dataIndex: 'clrq'
          },
          // {
          //   title: '成立年限',
          //   align:"center",
          //   dataIndex: 'clnx'
          // },
          // {
          //   title: '营业执照名称',
          //   align:"center",
          //   dataIndex: 'yyzzmc'
          // },
          // {
          //   title: '营业执照编号',
          //   align:"center",
          //   dataIndex: 'yyzzbh'
          // },
          // {
          //   title: '税务登记编号',
          //   align:"center",
          //   dataIndex: 'swdjbh'
          // },
          // {
          //   title: '企业职工人数',
          //   align:"center",
          //   dataIndex: 'qyzgrs'
          // },
          // {
          //   title: '传真号',
          //   align:"center",
          //   dataIndex: 'czh'
          // },
          // {
          //   title: '邮政编码',
          //   align:"center",
          //   dataIndex: 'yzbm'
          // },
          {
            title: '行业分类',
            align:"center",
            dataIndex: 'hyfl'
          },
          {
            title: '经营项目',
            align:"center",
            dataIndex: 'jyxm'
          },
          {
            title: '经营状况',
            align:"center",
            dataIndex: 'jyzk'
          },
          {
            title: '资产负债(万元)',
            align:"center",
            dataIndex: 'zcfz'
          },
          // {
          //   title: '年营业收入(万元)',
          //   align:"center",
          //   dataIndex: 'nyysr'
          // },
          // {
          //   title: '年经营业务成本(万元)',
          //   align:"center",
          //   dataIndex: 'njyywcb'
          // },
          // {
          //   title: '年工资额(万元)',
          //   align:"center",
          //   dataIndex: 'ngze'
          // },
          // {
          //   title: '年缴纳所得税(万元)',
          //   align:"center",
          //   dataIndex: 'njnsds'
          // },
          // {
          //   title: '年缴纳增值税(万元)',
          //   align:"center",
          //   dataIndex: 'njnzzs'
          // },
          // {
          //   title: '年经营净利润(万元)',
          //   align:"center",
          //   dataIndex: 'njyjlr'
          // },
          // {
          //   title: '其它收入(万元)',
          //   align:"center",
          //   dataIndex: 'qtsr'
          // },
          // {
          //   title: '其它支出(万元)',
          //   align:"center",
          //   dataIndex: 'qtzc'
          // },
          {
            title: '总收入(万元)',
            align:"center",
            dataIndex: 'zsr'
          },
          {
            title: '总支出(万元)',
            align:"center",
            dataIndex: 'zzc'
          },
          {
            title: '净利润(万元)',
            align:"center",
            dataIndex: 'jlr'
          },
          {
            title: '潜在业务',
            align:"center",
            dataIndex: 'qzyw_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'createBy'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'createTime'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100,
          }
        ],
        url: {
          list: "/khgl/qy/list",
          delete: "/khgl/qy/delete",
          deleteBatch: "/khgl/qy/deleteBatch",
          exportXlsUrl: "khgl/qy/exportXls",
          importExcelUrl: "khgl/qy/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleDetail(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "企业客户资料详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>