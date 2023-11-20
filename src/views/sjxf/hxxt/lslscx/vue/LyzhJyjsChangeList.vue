<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='机构代码'>
              <a-input placeholder='请输入机构代码' v-model='queryParam.jgdm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='机构名称'>
              <a-input placeholder='请输入机构名称' v-model='queryParam.jgmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='账号'>
              <a-input placeholder='请输入账号' v-model='queryParam.zh'></a-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='交易日期'>
                <a-range-picker @change="onChangeJyrq" v-model="queryParam.jyrq" :format="dateFormat"/>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='交易金额'>
                <a-input-number placeholder="Minimum" v-model="queryParam.jyje_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.jyje_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='余额'>
                <a-input-number placeholder="Minimum" v-model="queryParam.zhye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.zhye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='交易码'>
                <a-input   placeholder='请输入交易码' v-model='queryParam.jym'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='交易码名称'>
                <a-input   placeholder='请输入交易码名称' v-model='queryParam.jymmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='科目号'>
                <a-input   placeholder='请输入科目号' v-model='queryParam.kmh'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='科目号名称'>
                <a-input   placeholder='请输入科目号名称' v-model='queryParam.kmhmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='借贷标志'>
                <a-input   placeholder='请输入借贷标志' v-model='queryParam.jdbz'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='记账柜员'>
                <a-input   placeholder='请输入记账柜员' v-model='queryParam.jzgy'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='记账柜员名称'>
                <a-input   placeholder='请输入记账柜员名称' v-model='queryParam.jzgymc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='代理机构'>
                <a-input placeholder='请输入代理机构' v-model='queryParam.dljg'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='代理机构名称'>
                <a-input placeholder='请输入代理机构名称' v-model='queryParam.dljgmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='柜员流水'>
                <a-input placeholder='请输入柜员流水' v-model='queryParam.gylsh'></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('历史流水查询')">导出
      </a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button type="primary" icon="import">导入</a-button>-->
      <!--      </a-upload>-->
      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
      <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      <!--      </div>-->

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll="{x : 'max-content'}"
        @change='handleTableChange'>

        <!--        <span slot="action" slot-scope="text, record">-->
        <!--          <a @click="handleEdit(record)">编辑</a>-->

        <!--          <a-divider type="vertical" />-->
        <!--          <a-dropdown>-->
        <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
        <!--            <a-menu slot="overlay">-->
        <!--              <a-menu-item>-->
        <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
        <!--                  <a>删除</a>-->
        <!--                </a-popconfirm>-->
        <!--              </a-menu-item>-->
        <!--            </a-menu>-->
        <!--          </a-dropdown>-->
        <!--        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <lyzhJyjsChange-modal ref='modalForm' @ok='modalFormOk'></lyzhJyjsChange-modal>
  </a-card>
</template>

<script>
import LyzhJyjsChangeModal from './modules/LyzhJyjsChangeModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util'

export default {
  name: 'LyzhJyjsChangeList',
  mixins: [JeecgListMixin],
  components: {
    LyzhJyjsChangeModal
  },
  data() {
    return {
      description: '历史流水查询管理页面',
      dateFormat:'YYYY-MM-DD',
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
          title: '户名',
          align: 'center',
          dataIndex: 'hm'
        },
        {
          title: '账号',
          align: 'center',
          dataIndex: 'zh'
        },
        {
          title: '代理机构',
          align: 'center',
          dataIndex: 'dljg'
        },
        {
          title: '代理机构名称',
          align: 'center',
          dataIndex: 'dljgmc'
        },
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'jgdm'
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgmc'
        },
        {
          title: '科目号',
          align: 'center',
          dataIndex: 'kmh'
        },
        {
          title: '科目号名称',
          align: 'center',
          dataIndex: 'kmmc'
        },
        {
          title: '交易日期',
          align: 'center',
          dataIndex: 'jyrq'
        },
        {
          title: '交易时间',
          align: 'center',
          dataIndex: 'jysj'
        },
        {
          title: '交易码',
          align: 'center',
          dataIndex: 'jym'
        },
        {
          title: '交易码名称',
          align: 'center',
          dataIndex: 'jymmc'
        },
        {
          title: '交易金额',
          align: 'center',
          dataIndex: 'jyje'
        },
        {
          title: '账户余额',
          align: 'center',
          dataIndex: 'zhye'
        },
        {
          title: '借贷标志',
          align: 'center',
          dataIndex: 'jdbz'
        },
        {
          title: '记账柜员号',
          align: 'center',
          dataIndex: 'jzgy'
        },
        {
          title: '记账柜员名称',
          align: 'center',
          dataIndex: 'jzgymc'
        },
        {
          title: '复核柜员号',
          align: 'center',
          dataIndex: 'fhgy'
        },
        {
          title: '复核柜员名称',
          align: 'center',
          dataIndex: 'fhgymc'
        },
        {
          title: '对应账号',
          align: 'center',
          dataIndex: 'dyzh'
        },
        {
          title: '对应账号户名',
          align: 'center',
          dataIndex: 'dyzhhm'
        },
        {
          title: '积数',
          align: 'center',
          dataIndex: 'zhjs'
        },
        {
          title: '摘要',
          align: 'center',
          dataIndex: 'zy'
        },
        {
          title: '柜员流水',
          align: 'center',
          dataIndex: 'gylsh'
        },
      ],
      url: {
        list: '/sjxf/hxxt/lslscx/lyzhJyjsChange/list',
        delete: '/sjxf/hxxt/lslscx/lyzhJyjsChange/delete',
        deleteBatch: '/sjxf/hxxt/lslscx/lyzhJyjsChange/deleteBatch',
        exportXlsUrl: 'sjxf/hxxt/lslscx/lyzhJyjsChange/exportXls',
        importExcelUrl: 'sjxf/hxxt/lslscx/lyzhJyjsChange/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      delete param.jyrq;
      return filterObj(param);
    },
    onChangeJyrq(value,dateString){
      let trnDateString=dateString
      this.queryParam.jyrq_begin=trnDateString[0]
      this.queryParam.jyrq_end=trnDateString[1]
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>