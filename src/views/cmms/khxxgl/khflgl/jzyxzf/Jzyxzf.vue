<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属网格：'>
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
            <a-form-item label='客户名称：'>
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='证件号码：'>
              <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='是否已导入惠农快贷：'>
              <j-dict-select-tag v-model="queryParam.sfdrhnkd" placeholder="请选择" dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='走访营销方式：'>
                <j-dict-select-tag v-model="queryParam.zfyxfs" placeholder="请选择" dictCode="zfyxfs"/>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否完成精准营销：'>
                <j-dict-select-tag v-model="queryParam.sfwcjzyx" placeholder="请选择" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='地址：'>
                <j-input placeholder="请输入地址" v-model="queryParam.zz" type="likemore"/>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='行业分类：'>
                <j-dict-select-tag v-model="queryParam.hyfl" placeholder="请选择" dictCode="ty_hyfl"/>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='就业地点：'>
                <j-dict-select-tag v-model="queryParam.jydd" placeholder="请选择" dictCode="ty_jydd"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button  @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
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
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('精准营销走访')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll="{ x : 'max-content' }"
        @change='handleTableChange'>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
import { getAction } from '@api/manage'

export default {
  name: 'VKhxxglKhxqNhJzyxList',
  mixins: [JeecgListMixin],
  components: {JInput},
  data() {
    return {
      description: '新型农业主体管理页面',
      replaceFields: { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '行政村',
          align: 'center',
          dataIndex: 'wgbh_dictText',
          customRender: function (text) {
            return !text ? "" : text.substr(text.indexOf("-")+1,text.lastIndexOf("-")-text.indexOf("-")-1)
          },
        },
        {
          title: '组',
          align: 'center',
          dataIndex: 'wgbh_dictText',
          customRender: function (text) {
            return !text ? "" : text.substr(text.lastIndexOf("-")+1)
          },
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'hhbm'
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '评议金额',
          align: 'center',
          dataIndex: 'jcmxcs'
        },
        {
          title: '评议员建议授信额度',
          align: 'center',
          dataIndex: 'pyyjyed'
        },
        {
          title: '支行审定额度',
          align: 'center',
          dataIndex: 'zhsded'
        },
        {
          title: '手机号码',
          align: 'center',
          dataIndex: 'sjhm'
        },
        {
          title: '配偶姓名',
          align: 'center',
          dataIndex: 'poxm'
        },
        {
          title: '配偶证件号码',
          align: 'center',
          dataIndex: 'pozjhm'
        },
        {
          title: '有无车辆',
          align: 'center',
          dataIndex: 'ywcl_dictText'
        },
        {
          title: '有无车辆备注',
          align: 'center',
          dataIndex: 'ywclbz'
        },
        {
          title: '个人年收入',
          align: 'center',
          dataIndex: 'grnsr_dictText'
        },
        {
          title: '长期居住地',
          align: 'center',
          dataIndex: 'cqjzdxq'
        },
        {
          title: '长期居住地备注',
          align: 'center',
          dataIndex: 'cqjzdbz'
        },
        {
          title: '农村房产情况',
          align: 'center',
          dataIndex: 'ncfcqk_dictText'
        },
        {
          title: '农村房产情况备注',
          align: 'center',
          dataIndex: 'ncfcqkbz'
        },
        {
          title: '城区有无房产',
          align: 'center',
          dataIndex: 'cqywfc_dictText'
        },
        {
          title: '城区房产位置',
          align: 'center',
          dataIndex: 'cqfcwz_dictText'
        },
        {
          title: '客户分类',
          align: 'center',
          dataIndex: 'khfl_dictText'
        },
        {
          title: '行业分类',
          align: 'center',
          dataIndex: 'hyfl_dictText'
        },
        {
          title: '就业分类',
          align: 'center',
          dataIndex: 'jyfl_dictText'
        },
        {
          title: '就业地点',
          align: 'center',
          dataIndex: 'jydd_dictText'
        },
        {
          title: '婚姻状况',
          align: 'center',
          dataIndex: 'hyzk_dictText'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        {
          title: '营销方式',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '是否完成精准营销',
          align: 'center',
          dataIndex: 'sfwcjzyx_dictText'
        },
        {
          title: '完成精准营销时间',
          align: 'center',
          dataIndex: 'wcjzyxsj'
        },
      ],
      url: {
        list: '/khflgl/nhxq/list2',
        exportXlsUrl: '/khflgl/nhxq/exportXls2',
      }
    }
  },
  created() {
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl').then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    })
    this.searchReset();
  },
  methods: {}
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>