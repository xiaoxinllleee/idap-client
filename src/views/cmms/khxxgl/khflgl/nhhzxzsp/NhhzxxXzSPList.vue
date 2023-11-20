<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='归属网格'>
              <!--<a-input placeholder="请输入归属网格" v-model="queryParam.sswg"></a-input>-->
              <a-tree-select v-model='queryParam.sswg' treeNodeFilterProp='title' showSearch
                             :treeData='sswgTreeDateoptions' :replaceFields='replaceFields'
                             :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='归属支行'>
              <!--<a-input placeholder='请输入归属支行' v-model='queryParam.sszh'></a-input>-->
              <j-tree-select placeholder='请选择所属机构'
                             v-model='queryParam.jgdm'
                             treeNodeFilterProp='title'
                             pid-field='sjywjgdm'
                             dict='v_hr_bas_organization_cmms, zzjc, ywjgdm'
                             :showSearch='true'
                             :getAllZzjg="qybm=='400'||qybm=='375'?'1':'2'"
                             :isAll="qybm=='400'||qybm=='375'"
                             :treeDefaultExpandAll='true'></j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='户号编码'>
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm" ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='户主姓名'>
              <j-input placeholder='请输入户主姓名' v-model='queryParam.hzxm'></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='户主证件号码'>
              <a-input placeholder='请输入户主证件号码' v-model='queryParam.hzzjhm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='客户类型'>
              <!--<a-input placeholder='请输入客户类型' v-model='queryParam.khlx'></a-input>-->
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.khlx" dict-code="xtpdjg" />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='审核状态'>
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.shzt" dict-code="approval_status" />
            </a-form-item>
          </a-col>
          <!--<template v-if='toggleSearchStatus'>-->
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
                @click="handleExportXls('农户户主信息（新增待审核）')">导出
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
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
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
               :scroll='{ x:2500 }'
               @change='handleTableChange'>

        <span slot="hhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="10" />
        </span>
        <span slot="hzxm" slot-scope="text">
          <j-ellipsis :value="text" :length="4" />
        </span>
        <span slot="hzzjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="10" />
        </span>
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="shpz" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
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
    <nhhzxxXzSP-modal ref='modalForm' @ok='modalFormOk'></nhhzxxXzSP-modal>
  </a-card>
</template>

<script>
import NhhzxxXzSPModal from './modules/NhhzxxXzSPModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@api/manage'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import JInput from '@comp/jeecg/JInput.vue'
import JEllipsis from '@comp/jeecg/JEllipsis.vue'

export default {
  name: 'NhhzxxXzSPList',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis,
    JInput,
    JTreeSelect,
    NhhzxxXzSPModal
  },
  data() {
    return {
      description: '农户户主信息（新增待审核）管理页面',
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
          title: '归属网格',
          align: 'center',
          dataIndex: 'sswg_dictText'
        },
        {
          title: '归属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'hhbm',
          scopedSlots: { customRender: 'hhbm' },
        },
        {
          title: '主客户经理',
          align: 'center',
          dataIndex: 'zkhjl_dictText'
        },
        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText'
        },
        {
          title: '户主姓名',
          align: 'center',
          dataIndex: 'hzxm',
          scopedSlots: { customRender: 'hzxm' },
        },
        {
          title: '户主证件号码',
          align: 'center',
          dataIndex: 'hzzjhm',
          scopedSlots: { customRender: 'hzzjhm' },
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
          title: '地址',
          align: 'center',
          dataIndex: 'dz',
          scopedSlots: { customRender: 'dz' },
          width: 150,
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz',
          scopedSlots: { customRender: 'bz' },
          width: 150,
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
          width: 150,
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
          title: '审核/驳回批注',
          align: 'center',
          dataIndex: 'shpz',
          scopedSlots: { customRender: 'shpz' },
          width: 150,
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
      sswgTreeDateoptions: undefined,
      url: {
        list: '/khxxgl/khflgl/nhhzxxXzSP/list',
        delete: '/khxxgl/khflgl/nhhzxxXzSP/delete',
        deleteBatch: '/khxxgl/khflgl/nhhzxxXzSP/deleteBatch',
        exportXlsUrl: 'khxxgl/khflgl/nhhzxxXzSP/exportXls',
        importExcelUrl: 'khxxgl/khflgl/nhhzxxXzSP/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', { wgxz: '6,8', wgxzType: '2' }).then((res) => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      } else {
        console.warn('getWgxxTreeDateBySskhjl request failed!')
      }
    })
  },
  methods: {

    //审核
    handleEdit: function (record) {
      this.$refs.modalForm.opView = false
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