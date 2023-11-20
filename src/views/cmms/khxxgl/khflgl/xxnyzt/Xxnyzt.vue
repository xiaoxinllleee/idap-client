<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期：'>
              <a-date-picker placeholder='请选择数据日期' v-model='dkxfrq' style='width: 100%;' :allowClear='true'
                             :format='dateFormat' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属网格：'>
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model='queryParam.wgbh'
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp='title'
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='新型主体名称：'>
              <j-input placeholder='请输入新型主体名称' v-model='queryParam.xxztmc' type='likemore' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='新型主体证件号码：'>
              <j-input placeholder='请输入新型主体证件号码' v-model='queryParam.xxztzjhm' type='likemore' />
            </a-form-item>
          </a-col>

          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='经营者：'>
                <j-input placeholder='请输入经营者' v-model='queryParam.jyz' type='likemore' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='经营者证件号码：'>
                <j-input placeholder='请输入经营者证件号码' v-model='queryParam.jyzzjhm' type='likemore' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='主体分类：'>
                <j-dict-select-tag v-model='queryParam.ztfl' placeholder='请选择主体分类' dictCode='xxnyzt-ztfl' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='白名单已授信：'>
                <j-dict-select-tag v-model='queryParam.bmdysx' placeholder='请选择白名单已授信' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否存量客户：'>
                <j-dict-select-tag v-model='queryParam.sfysx' placeholder='请选择是否存量客户' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否有信贷需求：'>
                <j-dict-select-tag v-model='queryParam.sfyxdxq' placeholder='请选择是否有信贷需求' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否正常经营：'>
                <j-dict-select-tag v-model='queryParam.sfzcjy' placeholder='请选择是否正常经营' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='村组评定：'>
                <j-dict-select-tag v-model='queryParam.pdfl' placeholder='请选择村组评定' dictCode='xxnyzt-cxpj' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='注册地址：'>
                <j-input placeholder='请输入注册地址' v-model='queryParam.zcdz' type='likemore' />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
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
      <a-button type='primary' icon='area-chart' @click='initData'>提取</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('新型农业主体')">导出
      </a-button>
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
import { getAction, putAction } from '@api/manage'
import moment from 'moment'

export default {
  name: 'khxxglKhxqXxnyztList',
  mixins: [JeecgListMixin],
  components: { JInput },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      dkxfrq: '',
      description: '新型农业主体管理页面',
      replaceFields: { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      wgxxTreeLoading: false,
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
          title: '所属网格',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '主体分类',
          align: 'center',
          dataIndex: 'ztfl_dictText'
        },
        {
          title: '新型主体名称',
          align: 'center',
          dataIndex: 'xxztmc'
        },
        {
          title: '新型主体证件号码',
          align: 'center',
          dataIndex: 'xxztzjhm'
        },
        {
          title: '经营者',
          align: 'center',
          dataIndex: 'jyz'
        },
        {
          title: '经营者证件号码',
          align: 'center',
          dataIndex: 'jyzzjhm'
        },
        // {
        //   title: '授信额度',
        //   align: 'center',
        //   dataIndex: 'ysxedcj'
        // },
        {
          title: '是否存量客户',
          align: 'center',
          dataIndex: 'sfysx_dictText'
        },
        {
          title: '村组评定',
          align: 'center',
          dataIndex: 'pdfl_dictText'
        },
        {
          title: '是否有信贷需求',
          align: 'center',
          dataIndex: 'sfyxdxq_dictText'
        },
        {
          title: '评议员',
          align: 'center',
          dataIndex: 'pfr'
        },
        {
          title: '是否正常经营',
          align: 'center',
          dataIndex: 'sfzcjy_dictText'
        },
        {
          title: '注册地址',
          align: 'center',
          dataIndex: 'zcdz'
        },
        {
          title: '管户人',
          align: 'center',
          dataIndex: 'ghzrr_dictText'
        },
        {
          title: '经营项目',
          align: 'center',
          dataIndex: 'jyxm'
        },
        {
          title: '经营规模',
          align: 'center',
          dataIndex: 'jygm'
        },
        {
          title: '年产值',
          align: 'center',
          dataIndex: 'nsr'
        },
        {
          title: '系统测算授信额度',
          align: 'center',
          dataIndex: 'nsxedck'
        },
        {
          title: '白名单授信额度',
          align: 'center',
          dataIndex: 'ysxedcj'
        },
        {
          title: '有效签约对象',
          align: 'center',
          dataIndex: 'yxqydx'
        },
        {
          title: '有效签约对象证件号码',
          align: 'center',
          dataIndex: 'yxqydxZjhm'
        },
        {
          title: '有效签约额度',
          align: 'center',
          dataIndex: 'yxqyed'
        },
        {
          title: '贷款余额',
          align: 'center',
          dataIndex: 'dkye'
        },
        {
          title: '当年新增签约额度',
          align: 'center',
          dataIndex: 'dnxzqyed'
        },
        {
          title: '当年贷款余额净增',
          align: 'center',
          dataIndex: 'dndkyejz'
        }
      ],
      url: {
        list: '/khxxgl/khxxglKhxqXxnyzt/listTyPc',
        exportXlsUrl: '/khxxgl/khxxglKhxqXxnyzt/exportXlsTyPc',
        initData: '/khxxgl/khxxglKhxqXxnyzt/initData'
      }
    }
  },
  created() {
    this.wgxxTreeLoading  = true
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {
      wgxz: '8',
      minLevel: '2',
      maxLevel: '3',
      disableSelect: '1'
    }).then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    }).finally(() => {
      this.wgxxTreeLoading  = false
    })
    this.searchReset()
  },
  methods: {
    searchQuery() {
      this.beforeSearchQuery()
      this.loadData(1)
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      console.info(params)
      if (this.dkxfrq != null && this.dkxfrq != undefined && this.dkxfrq != '') {
        params.sjrq = moment(this.dkxfrq).format('YYYY-MM-DD')
      }
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
          this.loading = false
        } else {
          this.dataSource = []
          this.ipagination.total = 0
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message, 5)
          this.loading = false
        }
        this.loading = false
      })
    },
    initData() {
      if (this.dkxfrq == null || this.dkxfrq == undefined || this.dkxfrq == '') {
        this.$message.error('数据日期不能为空！！！')
      } else {
        this.loading = true
        putAction(this.url.initData, { sjrq: moment(this.dkxfrq).format('YYYY-MM-DD') }).then(res => {
          if (res.success) {
            this.$message.success('提取成功')
            this.dkxfrq=moment(res.result)
            this.loadData(1)
          }
        }).finally((() => {
          this.loading = false
        }))
      }
    },
    searchReset () {
      this.queryParam = {}
      this.dkxfrq=''
      this.beforeSearchQuery()
      this.loadData(1)
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>