<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder='请选择所属支行' v-model='queryParam.sszh'
                             dict='HR_BAS_ORGANIZATION,ZZJC,ZZBZ' pidField='sjzzbz' treeNodeFilterProp='title'
                             :sszh='true' :showSearch='false' :treeDefaultExpandAll='true' :filterTreeNode='true' @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属网格'>
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='网格性质'>
              <j-dict-select-tag placeholder='请选择网格性质' v-model='queryParam.wgxz'
                                 dict-code='wgxz'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                 {{ toggleSearchStatus ? '收起' : '展开' }}
                 <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
               </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('背靠背评议统计')" v-has="'BkbpytjModal:exp'">导出</a-button>
      <!--  <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
        <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
          <a-button type="primary" icon="import">导入</a-button>
        </a-upload>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
        </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
         <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
         <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
       </div>-->

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <!--      <span slot="action" slot-scope="text, record">
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
        <span slot='ypy' slot-scope='ypyhs,record'>
          <a @click="ypy(record,'1')">{{ ypyhs }}</a>
        </span>
        <span slot='wpy' slot-scope='wpyhs,record'>
          <a @click="ypy(record,'2')">{{ wpyhs }}</a>
        </span>
        <span slot='bysx' slot-scope='bysxhs,record'>
          <a @click="ypy(record,'3')">{{ bysxhs }}</a>
        </span>
        <span slot='wsxhs' slot-scope='sxwyxhs,record'>
          <a @click="ypy(record,'4')">{{ sxwyxhs }}</a>
        </span>
        <span slot='ysxhs' slot-scope='sxyyxhs,record'>
          <a @click="ypy(record,'5')">{{ sxyyxhs }}</a>
        </span>
        <span slot='qxfk' slot-scope='fksxhs,record'>
          <a @click="ypy(record,'qxfk')">{{ fksxhs }}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bkbpymx-modal ref='bkbpymxModal' />

  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import BkbpymxModal from './BkbpymxModal'
import store from '@/store/'
import { getAction } from '@api/manage'

export default {
  name: 'BkbpytjModal',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect, BkbpymxModal, JTreeSelectNotJg
  },
  data() {
    return {
      description: '背靠背评议统计管理页面',
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
          title: '数据日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '所属网络',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '总户数',
          align: 'center',
          dataIndex: 'zhs'
        },
        {
          title: '未评议户数',
          align: 'center',
          dataIndex: 'wpyhs',
          scopedSlots: { customRender: 'wpy' }
        },
        {
          title: '不予授信户数',
          align: 'center',
          dataIndex: 'bysxhs',
          scopedSlots: { customRender: 'bysx' }
        },
        {
          title: '授信未用信户数',
          align: 'center',
          dataIndex: 'sxwyxhs',
          scopedSlots: { customRender: 'wsxhs' }
        },
        {
          title: '授信已用信户数',
          align: 'center',
          dataIndex: 'sxyyxhs',
          scopedSlots: { customRender: 'ysxhs' }
        },
        {
          title: '评议授信户数',
          align: 'center',
          dataIndex: 'ypyhs',
          scopedSlots: { customRender: 'ypy' }
        },
        {
          title: '评议授信金额',
          align: 'center',
          dataIndex: 'ypyje'
        }
        /*   {
             title: '操作',
             dataIndex: 'action',
             align:"center",
             scopedSlots: { customRender: 'action' },
           }*/
      ],
      columns2: [
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
          title: '数据日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '所属网络',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '总户数',
          align: 'center',
          dataIndex: 'zhs'
        },
        {
          title: '未评议户数',
          align: 'center',
          dataIndex: 'wpyhs',
          scopedSlots: { customRender: 'wpy' }
        },
        {
          title: '不予授信户数',
          align: 'center',
          dataIndex: 'bysxhs',
          scopedSlots: { customRender: 'bysx' }
        },
        {
          title: '风控筛选户数',
          align: 'center',
          dataIndex: 'fksxhs',
          scopedSlots: { customRender: 'qxfk' }
        },
        {
          title: '授信未用信户数',
          align: 'center',
          dataIndex: 'sxwyxhs',
          scopedSlots: { customRender: 'wsxhs' }
        },
        {
          title: '授信已用信户数',
          align: 'center',
          dataIndex: 'sxyyxhs',
          scopedSlots: { customRender: 'ysxhs' }
        },
        {
          title: '评议授信户数',
          align: 'center',
          dataIndex: 'ypyhs',
          scopedSlots: { customRender: 'ypy' }
        },
        {
          title: '评议授信金额',
          align: 'center',
          dataIndex: 'ypyje'
        }
        /*   {
             title: '操作',
             dataIndex: 'action',
             align:"center",
             scopedSlots: { customRender: 'action' },
           }*/
      ],
      columns3: [
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
          title: '数据日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '所属网络',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '总户数',
          align: 'center',
          dataIndex: 'zhs'
        },
        {
          title: '未评议户数',
          align: 'center',
          dataIndex: 'wpyhs',
          scopedSlots: { customRender: 'wpy' }
        },
        {
          title: '不予授信户数',
          align: 'center',
          dataIndex: 'bysxhs',
          scopedSlots: { customRender: 'bysx' }
        },
        {
          title: '授信已用信户数',
          align: 'center',
          dataIndex: 'sxyyxhs',
          scopedSlots: { customRender: 'ysxhs' }
        },
        {
          title: '评议授信户数',
          align: 'center',
          dataIndex: 'ypyhs',
          scopedSlots: { customRender: 'ypy' }
        },
        {
          title: '评议授信金额',
          align: 'center',
          dataIndex: 'ypyje'
        }
        /*   {
             title: '操作',
             dataIndex: 'action',
             align:"center",
             scopedSlots: { customRender: 'action' },
           }*/
      ],
      url: {
        list: '/wgtjfx/bkbpytj/list',
        delete: '/wgtjfx/bkbpytj/delete',
        deleteBatch: '/wgtjfx/bkbpytj/deleteBatch',
        exportXlsUrl: '/wgtjfx/bkbpytj/exportXls',
        importExcelUrl: '/wgtjfx/bkbpytj/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    let qybm = store.getters.qybm
    console.log(qybm)
    if (qybm == '420' || qybm == '390') {
      this.columns = this.columns2
    } else if (qybm == '095') {
      this.columns = this.columns3
    }
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2'}).then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    })

  },
  methods: {
    ypy(record, lx) {
      console.log('bkbpymxModal1')
      console.log(record)
      console.log(lx)
      this.$refs.bkbpymxModal.init(record, lx, 1)
    },
    onChange(value){
      this.sswgTreeDateoptions=[]
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2',zzbz:value}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
    },
    searchReset () {
      this.queryParam = {}
      this.sswgTreeDateoptions=[]
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
      this.loadData(1)
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>