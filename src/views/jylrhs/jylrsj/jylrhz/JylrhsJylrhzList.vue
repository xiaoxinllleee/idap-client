<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-month-picker placeholder='请选择数据日期' v-model='queryParam.fiscalDate' :format='monthFormat' style='width: 100%;'></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务机构'>
<!--              <a-input placeholder='请输入组织机构' v-model='queryParam.jgdm'></a-input>-->
<!--              <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                             dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false' />-->
              <j-tree-select placeholder="请选择业务机构"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization,zzjc,ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='财务收入_贷款利息收入'>-->
<!--                <a-input placeholder='请输入财务收入_贷款利息收入' v-model='queryParam.dklxsr'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='财务收入_手续费佣金收入'>-->
<!--                <a-input placeholder='请输入财务收入_手续费佣金收入' v-model='queryParam.sxfyjsr'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='财务收入_往来收入'>-->
<!--                <a-input placeholder='请输入财务收入_往来收入' v-model='queryParam.wlsr'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--          </template>-->
<!--          <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>-->
<!--              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>-->
<!--              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>-->
<!--              <a @click='handleToggleSearch' style='margin-left: 8px'>-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />-->
<!--              </a>-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
<!--      <a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>-->
      <a-button  type="primary" icon="plus" :loading="initDataLoading" @click="handleInitData" v-has="'JylrhsJylrhz:initdata'">
        {{ initDataBtnName }}
      </a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('支行经营利润汇总')" v-has="'JylrhsJylrhz:export'">导出
      </a-button>
      <a-button type='primary' @click='searchQuery' icon='search' style='margin-left: 8px'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
      <a-button type='primary' @click='batchReviews' :loading='batchReviewLoading' style='margin-left: 8px' v-has="'JylrhsJylrhz:batreview'">
        {{ batchReviewBtnName }}
      </a-button>
<!--      <a-upload name='file' :showUploadList='false' :multiple='false' :headers='tokenHeader' :action='importExcelUrl'-->
<!--                @change='handleImportExcel'>-->
<!--        <a-button type='primary' icon='import'>导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if='selectedRowKeys.length > 0'>-->
<!--        <a-menu slot='overlay'>-->
<!--          <a-menu-item key='1' @click='batchDel'>-->
<!--            <a-icon type='delete' />-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style='margin-left: 8px'> 批量操作-->
<!--          <a-icon type='down' />-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>-->
<!--        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a-->
<!--        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项-->
<!--        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>-->
<!--      </div>-->

      <a-table
        ref='table'
        size='small'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll='{x:4000}'
        @change='handleTableChange'>

<!--        <span slot='action' slot-scope='text, record'>-->
<!--          <a @click='handleEdit(record)' v-has="'JylrhsJylrhz:edit'" >修改</a>-->
<!--          <a-divider type='vertical' />-->
<!--          <a-dropdown>-->
<!--            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>-->
<!--            <a-menu slot='overlay'>-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>-->
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
    <jylrhs-jylrhz-modal ref='modalForm' @ok='modalFormOk' />
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment'
import { downFile, getAction, postAction, putAction } from '@api/manage'
import notification from 'ant-design-vue/lib/notification'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import { filterObj } from '@/utils/util'
import JylrhsJylrhzModal from '@views/jylrhs/jylrsj/jylrhz/modules/JylrhsJylrhzModal.vue'
export default {
  name: 'JylrhsJylrhzList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect,
    JylrhsJylrhzModal
  },
  data() {
    return {
      description: '经营利润核算（经营利润汇总）',
      rowKey: 'fiscalDate,jgdm',
      monthFormat: 'YYYY-MM',
      initDataLoading: false,
      initDataBtnName: '统计',
      batchReviewLoading: false,
      batchReviewBtnName: '批量审核',
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
          dataIndex: 'fiscalDate',
          width: 100
        },
        {
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '资金来源',
          align: 'center',
          children: [
            {
              title: '上年末存款日平余额（本外币）',
              align: 'center',
              dataIndex: 'snmCkrpyeBwb',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末存款日平余额（含本外币）',
              align: 'center',
              dataIndex: 'qmCkrpHbwb',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ]
        },
        {
          title: '资金运用',
          align: 'center',
          children: [
            {
              title: '上年末贷款日平余额（不含卡）',
              align: 'center',
              dataIndex: 'snmDkrpye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '上年末信用卡月均余额',
              align: 'center',
              dataIndex: 'snmXykYjye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '上年末贷款余额（含贷记卡）',
              align: 'center',
              dataIndex: 'snmDkye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末贷款余额（含贷记卡）',
              align: 'center',
              dataIndex: 'qmDkye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末信用卡月均余额',
              align: 'center',
              dataIndex: 'qmXykYjye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末贷款日平余额（不含贷记卡、转贴）',
              align: 'center',
              dataIndex: 'qmDkrpye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末日平现金余额',
              align: 'center',
              dataIndex: 'qmRpXjye',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ]
        },
        {
          title: '存款准备金',
          align: 'center',
          dataIndex: 'ckzbj',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '日均富余或占用（+，-）',
          align: 'center',
          dataIndex: 'rjFyhzy',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '存贷款日均比例(%)',
          align: 'center',
          dataIndex: 'cdkrjbl',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '各项收入',
          align: 'center',
          children: [
            {
              title: '利息收入',
              align: 'center',
              children: [
                {
                  title: '期末6011科目贷款利息收入（不含税）',
                  align: 'center',
                  dataIndex: 'qmKm6011Dklxsr',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '期末税后日平贷款收息率(%)',
                  align: 'center',
                  dataIndex: 'qmShrpDksxl',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '其中：期末6011科目免增值税贷款利息收入（分摊）',
                  align: 'center',
                  dataIndex: 'qmMzzsDklxsr',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '往来收入',
              align: 'center',
              children: [
                {
                  title: '6012科目往来收入',
                  align: 'center',
                  dataIndex: 'km6012Wlsr',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '内部资金计价',
              align: 'center',
              children: [
                {
                  title: '6111科目富余资金计收',
                  align: 'center',
                  dataIndex: 'km6111Fyzjjs',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '6111科目占用资金计付',
                  align: 'center',
                  dataIndex: 'km6111Zyzjjf',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '手续费收入',
              align: 'center',
              children: [
                {
                  title: '6021科目支行报表手续费收入(不含税）',
                  align: 'center',
                  dataIndex: 'km6021Zhbbsxfsr',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '6021科目总部分摊手续费收入(不含税）',
                  align: 'center',
                  dataIndex: 'km6021Zbftsxfsr',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '6051其他业务收入科目',
              align: 'center',
              dataIndex: 'km6501Qtywsr',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '6061汇兑损益',
              align: 'center',
              dataIndex: 'km6061Hdsy',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '6101公允价值变动损益',
              align: 'center',
              dataIndex: 'km6101Gyjzbdsy',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '6301营业外收入科目',
              align: 'center',
              dataIndex: 'km6301Yywsr',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '各项收入合计',
              align: 'center',
              dataIndex: 'gxsrhj',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ],
        },
        {
          title: '各项支出',
          align: 'center',
          children: [
            {
              title: '增值税金',
              align: 'center',
              dataIndex: 'zzsj',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '营业税金及附加',
              align: 'center',
              children: [
                {
                  title: '6403城建税及附加',
                  align: 'center',
                  dataIndex: 'km6403Cjsjfj',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '6403其他税金',
                  align: 'center',
                  dataIndex: 'km6403Qtsj',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '利息支出',
              align: 'center',
              children: [
                {
                  title: '6411科目期末利息支出',
                  align: 'center',
                  dataIndex: 'qmKm6411Lxzc',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '期末日平存款付息率(%)',
                  align: 'center',
                  dataIndex: 'qmRpckFxl',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ],
            },
            {
              title: '6412科目金融机构往来支出',
              align: 'center',
              dataIndex: 'km6412JrjgWlsr',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '手续费支出',
              align: 'center',
              children: [
                {
                  title: '6421科目支行报表手续费支出',
                  align: 'center',
                  dataIndex: 'km6421ZhbbSxfzc',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
                {
                  title: '6421科目总部分摊手续费支出',
                  align: 'center',
                  dataIndex: 'km6421ZbftSxfzc',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ]
            },
            {
              title: '业务及管理费',
              align: 'center',
              children: [
                {
                  title: '6601科目支行费用台账计算',
                  align: 'center',
                  dataIndex: 'km6601Zhfytzjs',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ]
            },
            {
              title: '其他业务支出',
              align: 'center',
              children: [
                {
                  title: '6602科目支行其他业务分摊支出',
                  align: 'center',
                  dataIndex: 'km6602Zhqtywftzc',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ]
            },
            {
              title: '营业外支出',
              align: 'center',
              children: [
                {
                  title: '6711科目营业外支出',
                  align: 'center',
                  dataIndex: 'km6711Yywzc',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ]
            },
            {
              title: '资产减值损失',
              align: 'center',
              children: [
                {
                  title: '资产减值损失(6701及6702科目不计算分摊到支行)',
                  align: 'center',
                  dataIndex: 'zcjzss',
                  customRender: function(text) {
                    return Number(text).toFixed(2)
                  },
                },
              ]
            },
            {
              title: '各项支出合计',
              align: 'center',
              dataIndex: 'gxzchj',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ],
        },
        {
          title: '应收利息（万元）',
          align: 'center',
          children: [
            {
              title: '上年末贷款应收利息（含贷记卡）',
              align: 'center',
              dataIndex: 'snmDkyslx',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
            {
              title: '期末贷款应收利息（含贷记卡）',
              align: 'center',
              dataIndex: 'qmDkyslx',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ]
        },
        {
          title: '报批费用、装饰、维修和购置(20万元以上部分）',
          align: 'center',
          dataIndex: 'dxbbfy',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '经营利润',
          align: 'center',
          children: [
            {
              title: '各项收入减各项支出减应收利息增加（加应收利息减少）计算经营利润任务（万元）',
              align: 'center',
              dataIndex: 'jylr',
              customRender: function(text) {
                return Number(text).toFixed(2)
              },
            },
          ]
        },
        {
          title: '当年经营利润任务',
          align: 'center',
          dataIndex: 'dnJylrrw',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '任务完成率(%)',
          align: 'center',
          dataIndex: 'rwwcl',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '统计时间',
          align: 'center',
          dataIndex: 'tjsj',
          width: 160
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   fixed: 'right',
        //   width: 60,
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      url: {
        list: '/jylrhs/jylrsj/jylrhz/list',
        delete: '/jylrhs/jylrsj/jylrhz/delete',
        deleteBatch: '/jylrhs/jylrsj/jylrhz/deleteBatch',
        exportXlsUrl: 'jylrhs/jylrsj/jylrhz/exportXls',
        importExcelUrl: 'jylrhs/jylrsj/jylrhz/importExcel',
        initData: '/jylrhs/jylrsj/jylrhz/initData',
        batchReviews: '/jylrhs/jylrsj/jylrhz/batchReviews',
      }
    }
  },
  created() {
    this.getCurrentMonth()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    getCurrentMonth() {
      this.queryParam = { fiscalDate: undefined }
      this.queryParam.fiscalDate = moment(this.getCurrentDataFront()).format(this.monthFormat)
      // console.info('默认会计日期:',this.queryParam.fiscalDate)
    },
    getCurrentDataFront () {
      var date = new Date()
      date.setDate(1)
      var month = parseInt(date.getMonth()) + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + '-' + month + '-' + day
    },
    //获取当月最后1天日期
    getMonthLastDay(fiscalDate) {
      // console.log('获取当月最后1天日期 / 当前月份', fiscalDate)
      var date = moment(fiscalDate).format('YYYYMMDD')
      // var date = new Date()
      // console.log('当前会计日期', date)
      let new_year = parseInt(date.substring(0, 4))//取当前的年份
      let month = parseInt(date.substring(4, 6))
      let new_month = month//取当前的月份
      // console.log('month', month)
      // console.log('new_month', new_month)
      // let weekday = date.getDay();  //获取是周几
      let d = new Date(new_year, new_month, 1)//取当年当月中的第一天
      // 如果一个日期格式和一个毫秒相减，会变成一个时间毫秒戳
      // 获取当月最后一天日期
      return new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate()
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();
      if (params.fiscalDate !== undefined && params.fiscalDate !== null && params.fiscalDate !== '') {
        let lastday = this.getMonthLastDay(params.fiscalDate)
        // console.log('(loadData)月末日期',lastday)
        params.fiscalDate = moment(params.fiscalDate).format('YYYY-MM') + '-' + lastday
      }
      console.info(params)
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          this.loading = false;
        } else {
          this.dataSource = [];
          this.ipagination.total = 0;
          this.loading = false;
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false;
        }
        this.loading = false;
      })
    },
    getQueryParams() {
      let fiscalDateMoment = ''
      if (this.queryParam.fiscalDate) {
        let lastday = this.getMonthLastDay(this.queryParam.fiscalDate)
        // console.log('(getQueryParams)月末日期',lastday)
        fiscalDateMoment = moment(this.queryParam.fiscalDate).format('YYYY-MM') + '-' + lastday
      }
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.fiscalDate) {
        param.fiscalDate = fiscalDateMoment;
      }
      return filterObj(param);
    },
    searchReset() {
      this.getCurrentMonth()
      this.loadData(1)
    },
    handleExportXls (fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
      let param = this.getQueryParams();
      if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
        param['selections'] = this.selectedRowKeys.join(",")
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      let fiscalDateMoment = ''
      if (param.fiscalDate !== undefined && param.fiscalDate !== null && param.fiscalDate !== '') {
        let lastday = this.getMonthLastDay(param.fiscalDate)
        // console.log('(handleExportXls)月末日期',lastday)
        fiscalDateMoment = moment(param.fiscalDate).format("YYYY-MM") + '-' + lastday
      }
      param.fiscalDate = fiscalDateMoment
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        var blob = new Blob([data])
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
          return
        }
        var eleLink = document.createElement('a')
        eleLink.download = fileName + '.xls'
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.exportLoading = false
      })
    },
    handleInitData: function() {
      var params = this.getQueryParams();
      if (!params.fiscalDate) {
        notification.warning({message: '系统提示', description: '请选择数据日期！', duration: 4})
        return
      }
      var sjrq = moment(params.fiscalDate).format("YYYYMM")
      var dqrq = moment(new Date()).format("YYYYMM")
      if (sjrq > dqrq) {
        notification.warning({message: '系统提示', description: '数据日期不得大于系统日期！', duration: 4})
        return
      }
      var fiscalDate = moment(params.fiscalDate).format("YYYY-MM")+'-'+this.getMonthLastDay(params.fiscalDate)
      // console.log('当前统计数据日期',fiscalDate)
      this.loading = true
      this.initDataLoading = true
      this.initDataBtnName = '正在统计，请稍等...'
      postAction(this.url.initData,{'fiscalDate': fiscalDate}).then((res) => {
        if (res.success) {
          notification.success({message: '系统提示', description: '统计成功！', duration: 4})
        } else {
          notification.warning({message: '系统提示', description: res.message, duration: 4})
        }
      }).catch((error) => {
        notification.error({message: '系统提示', description: '统计失败，请联系系统管理员！', duration: 4})
        console.error("统计失败！",error)
      }).finally(() => {
        this.loading = false
        this.initDataLoading = false
        this.initDataBtnName = '统计'
        this.loadData()
      })
    },

    batchReviews() {
      var params = this.getQueryParams()
      console.log('params',params)
      var fiscalDate = params.fiscalDate
      if (!fiscalDate) {
        notification.warning({message: '系统提示', description: '请选择数据日期！', duration: 4})
        return
      }
      this.loading = true
      this.batchReviewLoading = true
      this.batchReviewBtnName = '请稍等...'
      params = { 'fiscalDate': fiscalDate }
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          console.log('result',res.result.records)
          if (res.result.records.length > 0) {
            this.$message.info('批量审核中')
            putAction(this.url.batchReviews, {'fiscalDate': fiscalDate}).then((res)=>{
              if (res.success) {
                this.$message.success('批量审核成功！')
              } else {
                this.$message.warn('审核失败，请联系系统管理员！')
              }
            }).catch((error)=>{
              console.log("ERROR",error)
            }).finally(()=>{
              this.loading = false
              this.batchReviewLoading = false
              this.batchReviewBtnName = '批量审核'
            })
          } else {
            notification.warning({message: '系统提示', description: '当月数据未统计，请核实！', duration: 4})
            this.loading = false
            this.batchReviewLoading = false
            this.batchReviewBtnName = '批量审核'
            return
          }
        }
      }).catch((error)=>{
        console.error("ERROR",error)
      }).finally(()=>{
        this.loadData()
      })
    },


    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '修改'
      this.$refs.modalForm.disableSubmit = false
    },

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>