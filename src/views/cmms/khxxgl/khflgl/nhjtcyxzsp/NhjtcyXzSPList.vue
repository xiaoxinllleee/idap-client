<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='客户姓名'>
              <j-input placeholder='请输入客户姓名' v-model='queryParam.khmc'></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='证件号码'>
              <a-input placeholder='请输入证件号码' v-model='queryParam.zjhm'></a-input>
            </a-form-item>
          </a-col>
          <!--<template v-if='toggleSearchStatus'>-->
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='性别'>
              <j-dict-select-tag placeholder='请输入性别' v-model='queryParam.xb' dict-code='sex'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='新户号编码'>
              <a-input placeholder='请输入新户号编码' v-model='queryParam.hhbm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='与新户主关系'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.yhzgx' dict-code='yhzgx'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='审核状态'>
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.shzt" dict-code="approval_status" />
            </a-form-item>
          </a-col>
          <!--</template>-->
          <!--<a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <!--<a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>-->
      <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload'>重置</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('家庭成员信息（新增待审核）')">导出
      </a-button>
      <!--<a-upload name='file' :showUploadList='false' :multiple='false' :headers='tokenHeader' :action='importExcelUrl'
                @change='handleImportExcel'>
        <a-button type='primary' icon='import'>导入</a-button>
      </a-upload>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel'>
            <a-icon type='delete' />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style='margin-left: 8px'> 批量操作
          <a-icon type='down' />
        </a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>-->

      <a-table ref='table'
               size='small'
               bordered
               :rowKey='rowKey'
               :loading='loading'
               :columns='columns'
               :dataSource='dataSource'
               :pagination='ipagination'
               :scroll='{ x:2700 }'
               @change='handleTableChange'>

        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="4" />
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18" />
        </span>
        <span slot="oldHhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="20" />
        </span>
        <span slot="newHhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="20" />
        </span>
        <span slot="oldHzxm" slot-scope="text">
          <j-ellipsis :value="text" :length="4" />
        </span>
        <span slot="shpz" slot-scope="text">
          <j-ellipsis :value="text" :length="20" />
        </span>

        <span slot="shzt" slot-scope="shzt">
          <a-tag :key="shzt" :color="shzt==='未审核'?'#409EFE':shzt==='审核通过'?'#67C23A':shzt==='驳回'?'#F56C6C':'grey'">
            {{ shzt }}
          </a-tag>
        </span>

        <span slot='action' slot-scope='text, record'>
          <a v-if='record.shzt == 0' @click='handleEdit(record)'>审核</a>
          <a v-if='record.shzt != 0' @click='handleView(record)'>查看</a>
          <!--<a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
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
    <nhjtcyXzSP-modal ref='modalForm' @ok='modalFormOk'></nhjtcyXzSP-modal>
  </a-card>
</template>

<script>
import NhjtcyXzSPModal from './modules/NhjtcyXzSPModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@comp/jeecg/JInput.vue'
import JEllipsis from '@comp/jeecg/JEllipsis.vue'

export default {
  name: 'NhjtcyXzSPList',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis,
    JInput,
    NhjtcyXzSPModal
  },
  data() {
    return {
      description: '家庭成员信息（新增待审核）管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'khmc' },
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm',
          scopedSlots: { customRender: 'zjhm' },
          width: 180,
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'xb_dictText'
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'nl'
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'lxfs'
        },
        {
          title: '原户号编码',
          align: 'center',
          dataIndex: 'oldHhbm',
          scopedSlots: { customRender: 'oldHhbm' },
          width: 200,
        },
        {
          title: '原所属网格',
          align: 'center',
          dataIndex: 'oldSswg_dictText',
        },
        {
          title: '原户主姓名',
          align: 'center',
          dataIndex: 'oldHzxm',
          scopedSlots: { customRender: 'oldHzxm' },
        },
        {
          title: '与原户主关系',
          align: 'center',
          dataIndex: 'oldYhzgx_dictText'
        },
        {
          title: '新户号编码',
          align: 'center',
          dataIndex: 'hhbm',
          scopedSlots: { customRender: 'newHhbm' },
          width: 200,
        },
        {
          title: '新所属网格',
          align: 'center',
          dataIndex: 'sswg_dictText'
        },
        {
          title: '新户主姓名',
          align: 'center',
          dataIndex: 'hzxm'
        },
        {
          title: '与新户主关系',
          align: 'center',
          dataIndex: 'yhzgx_dictText'
        },
        // {
        //   title: '佐证附件编号',
        //   align: 'center',
        //   dataIndex: 'zlbh'
        // },
        {
          title: '操作标识',
          align: 'center',
          dataIndex: 'lrbz_dictText'
        },
        {
          title: '操作人',
          align: 'center',
          dataIndex: 'lrr'
        },
        {
          title: '操作时间',
          align: 'center',
          dataIndex: 'lrsj',
          width: 150
        },
        {
          title: '录入人',
          align: 'center',
          dataIndex: 'lrczy'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'lrczsj',
          width: 150
        },
        {
          title: '审核批注',
          align: 'center',
          dataIndex: 'shpz',
          scopedSlots: { customRender: 'shpz' },
          width: 200
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'shzt_dictText',
          scopedSlots: { customRender: 'shzt' },
          fixed: 'right',
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          width: 100
        }
      ],
      url: {
        list: '/khxxgl/khflgl/nhjtcyXzSP/list',
        delete: '/khxxgl/khflgl/nhjtcyXzSP/delete',
        deleteBatch: '/khxxgl/khflgl/nhjtcyXzSP/deleteBatch',
        exportXlsUrl: 'khxxgl/khflgl/nhjtcyXzSP/exportXls',
        importExcelUrl: 'khxxgl/khflgl/nhjtcyXzSP/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {

    //审核
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '审核'
      this.$refs.modalForm.disableSubmit = false
    },
    //查看
    handleView: function (record) {
      this.$refs.modalForm.opView = true
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看'
      this.$refs.modalForm.disableSubmit = false
    },

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>