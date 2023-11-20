<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="统计日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat" :allowClear="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计范围">
              <a-select placeholder="请选择统计范围" v-model="queryParam.tjnf" :defaultValue="dateValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="批次">
              <a-select placeholder="请选择批次" v-model="queryParam.pc" >
                <a-select-option value="1">
                  第一批次（7月底验收）
                </a-select-option>
                <a-select-option value="2">
                  第二批次（11月底验收）
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('整村授信支行进度表')">导出</a-button>
      <a-button @click="extract" :loading="loading" icon="area-chart" v-has="'zcsxtj:init'">提取</a-button>

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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 6000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <template slot="hnkd">
          <span v-if="hnkdSjrq">
            惠农快贷({{hnkdSjrq}})
          </span>
          <span v-else>
            惠农快贷
          </span>
        </template>
        <template slot="xzdkhtkhs">
          <span v-if="rkrq">
            新增贷款合同客户数({{rkrq}})
          </span>
          <span v-else>
            新增贷款合同客户数
          </span>
        </template>
        <template slot="xzyx">
          <span v-if="rkrq">
            新增用信({{rkrq}})
          </span>
          <span v-else>
            新增用信
          </span>
        </template>

        <span slot='hnkd_drhs' slot-scope='hnkdDrhs,record'>
          <a @click="detailInfo(record,'1','zh',null)">{{ hnkdDrhs }}</a>
        </span>
        <span slot='hnkd_dhhf' slot-scope='hnkdDhhfhs,record'>
            <a @click="detailInfo(record,'2','zh',null)">{{ hnkdDhhfhs }}</a>
        </span>
        <span slot='hnkd_qykhs' slot-scope='hnkdQyhs,record'>
            <a @click="detailInfo(record,'3','zh',null)">{{ hnkdQyhs }}</a>
        </span>
        <span slot='dkht_xz' slot-scope='dkhtXzkhs,record'>
          <a @click="detailInfo(record,'4','zh',null)">{{ dkhtXzkhs }}</a>
        </span>
        <span slot='dkht_byxz' slot-scope='dkhtJsyxzkhs,record'>
            <a @click="detailInfo(record,'4','zh','dkht_byxz')">{{ dkhtJsyxzkhs }}</a>
        </span>
        <span slot='dkht_bzxz' slot-scope='dkhtJszxzkhs,record'>
            <a @click="detailInfo(record,'4','zh','dkht_bzxz')">{{ dkhtJszxzkhs }}</a>
        </span>
        <span slot='yx_xz' slot-scope='dkyxXzkhs,record'>
            <a @click="detailInfo(record,'5','zh','yx_xz')">{{ dkyxXzkhs }}</a>
        </span>
        <span slot='yx_byxz' slot-scope='dkyxJsyxzkhs,record'>
            <a @click="detailInfo(record,'5','zh','yx_byxz')">{{ dkyxJsyxzkhs }}</a>
        </span>
        <span slot='yxyx_xz' slot-scope='dkyxXzyxyxkhs,record'>
            <a @click="detailInfo(record,'5','zh','yxyx_xz')">{{ dkyxXzyxyxkhs }}</a>
        </span>
        <span slot='yxyx_byxz' slot-scope='dkyxJsyxzyxyxkhs,record'>
            <a @click="detailInfo(record,'5','zh','yxyx_byxz')">{{ dkyxJsyxzyxyxkhs }}</a>
        </span>

        <span slot="action" slot-scope="text, record">
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
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zcsxzhjdb-modal ref="modalForm" @ok="modalFormOk"></zcsxzhjdb-modal>
    <zcsxmx-modal ref='zcsxmx'></zcsxmx-modal>
  </a-card>
</template>

<script>
  import ZcsxzhjdbModal from './modules/ZcsxzhjdbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { getAction, putAction } from '@api/manage'
  import store from '@/store/'
  import zcsxmxModal from '@views/tjfx/zcsxtj/ZcsxmxModal'

  export default {
    name: "ZcsxzhjdbList",
    mixins:[JeecgListMixin],
    components: {
      ZcsxzhjdbModal,JTreeSelect,zcsxmxModal
    },
    data () {
      return {
        description: '整村授信支行进度表管理页面',
        // 表头
        defaultMonthOpera: '',
        dateValue: '',
        show:'',
        monthFormat: 'YYYY-MM-DD',
        rkrq: '',
        hnkdSjrq: '',
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '整村授信任务村个数',
            align:"center",
            dataIndex: 'zcsxrwcgs'
           },
		   {
            title: '村民小组个数',
            align:"center",
            dataIndex: 'cmxzgs'
           },
          {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
          },
          {
            title: '评议/采集户数',
            align:"center",
            dataIndex: 'wchs'
          },
          {
            title: '非白名单采集户数',
            align:"center",
            dataIndex: 'cjhs'
          },
		   {
            title: '存量户数',
            align:"center",
            dataIndex: 'clhs'
           },
		   {
            title: '灰名单户数',
            align:"center",
            dataIndex: 'hmdhs'
           },
		   {
            title: '黑名单户数',
            align:"center",
            dataIndex: 'heimdhs'
           },
          {
            title: '初筛白名单户数',
            align:"center",
            dataIndex: 'bmdhs'
          },
          {
            title: '背靠背初评',
            children: [
              {
                title: '完成户数',
                align:"center",
                dataIndex: 'bkbcpBmdWchs'
              },
              {
                title: '白名单完成比例',
                align:"center",
                dataIndex: 'bkbcpBmdWcbl'
              },
              // {
              //   title: '本月新增',
              //   align:"center",
              //   dataIndex: 'bkbcpBmdJsywchs'
              // },
              // {
              //   title: '本周新增',
              //   align:"center",
              //   dataIndex: 'bkbcpBmdJszwchs'
              // },
              // {
              //   title: '完成比例',
              //   align:"center",
              //   dataIndex: 'bkbcpWcbl'
              // },
              {
                title: '初评额度汇总(万元)',
                align:"center",
                dataIndex: 'bkbcpEdhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '完成小组个数',
                align:"center",
                dataIndex: 'bkbcpWcxzgs'
              },

              // {
              //   title: '本月新增',
              //   align:"center",
              //   dataIndex: 'bkbcpBmdJsywchs'
              // },
              // {
              //   title: '本周新增',
              //   align:"center",
              //   dataIndex: 'bkbcpBmdJszwchs'
              // },

            ]
          },
          {
            title: '背靠背复评',
            children: [
              {
                title: '完成户数',
                align:"center",
                dataIndex: 'bkbfpWchs'
              },
              {
                title: '复评额度汇总(万元)',
                align:"center",
                dataIndex: 'bkbfpEdhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '完成小组个数',
                align:"center",
                dataIndex: 'bkbfpWcxzgs'
              },

            ]
          },
          {
            title: '行内审定',
            children: [
              {
                title: '支行审定白名单户数',
                align:"center",
                dataIndex: 'zhsdBmdhs'
              },
              {
                title: '支行审定额度汇总(万元)',
                align:"center",
                dataIndex: 'zhsdEdhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '完成村个数',
                align:"center",
                dataIndex: 'zhsdWccgs'
              },
              {
                title: '行政村行内审定完成比例',
                align:"center",
                dataIndex: 'zhsdWcbl'
              },
            ]
          },
          {
            // title: '惠农快贷',
            scopedSlots: { title: 'hnkd' },
            children: [
              {
                title: '导入成功客户数',
                align:"center",
                dataIndex: 'hnkdDrhs',
                scopedSlots: { customRender: 'hnkd_drhs' }
              },
              {
                title: '导入额度汇总(万元)',
                align:"center",
                dataIndex: 'hnkdEdhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '支行审定白名单导入惠农快贷比',
                align:"center",
                dataIndex: 'hnkdZhsdHnkdZb'
              },
              {
                title: '电话回访客户数',
                align:"center",
                dataIndex: 'hnkdDhhfhs',
                scopedSlots: { customRender: 'hnkd_dhhf' }
              },
              {
                title: '惠农快贷签约客户数',
                align:"center",
                dataIndex: 'hnkdQyhs',
                scopedSlots: { customRender: 'hnkd_qykhs' }
              },
              {
                title: '惠农快贷签约额度汇总(万元)',
                align:"center",
                dataIndex: 'hnkdQyedhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '惠农快贷白名单签约率',
                align:"center",
                dataIndex: 'hnkdBmdQyl'
              },
            ]
          },
          {
            title: '精准营销',
            children: [
              {
                title: '实地走访营销客户数',
                align:"center",
                dataIndex: 'jzyxSdzfYxhs'
              },
              {
                title: '电话走访营销客户数',
                align:"center",
                dataIndex: 'jzyxDhzfYxhs'
              },
              {
                title: '精准营销总客户数',
                align:"center",
                dataIndex: 'jzyxZhs'
              },
              {
                title: '本月新增',
                align:"center",
                dataIndex: 'jzyxJsyhs'
              },
              {
                title: '本周新增',
                align:"center",
                dataIndex: 'jzyxJszhs'
              },
              {
                title: '精准营销完成比率',
                align:"center",
                dataIndex: 'jzyxWcbl'
              },
            ]
          },
          {
            // title: '新增贷款合同客户数',
            scopedSlots: { title: 'xzdkhtkhs' },
            children: [
              {
                title: '新增客户数',
                align:"center",
                dataIndex: 'dkhtXzkhs',
                scopedSlots: { customRender: 'dkht_xz' }
              },

              {
                title: '本月新增',
                align:"center",
                dataIndex: 'dkhtJsyxzkhs',
                scopedSlots: { customRender: 'dkht_byxz' }
              },
              {
                title: '本周新增',
                align:"center",
                dataIndex: 'dkhtJszxzkhs',
                scopedSlots: { customRender: 'dkht_bzxz' }
              },
              {
                title: '新增签约额度汇总(万元)',
                align:"center",
                dataIndex: 'dkhtQyedhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '支行审定白名单新增签约率',
                align:"center",
                dataIndex: 'dkhtZhsdQyl'
              },
              // {
              //   title: '入库日期',
              //   align:"center",
              //   dataIndex: 'rkrq'
              // },
            ]
          },
          {
            // title: '新增用信',
            scopedSlots: { title: 'xzyx' },
            children: [
              {
                title: '新增用信户数',
                align:"center",
                dataIndex: 'dkyxXzkhs',
                scopedSlots: { customRender: 'yx_xz' }
              },
              {
                title: '本月新增',
                align:"center",
                dataIndex: 'dkyxJsyxzkhs',
                scopedSlots: { customRender: 'yx_byxz' }
              },
              // {
              //   title: '本周新增',
              //   align:"center",
              //   dataIndex: 'dkyxJszxzkhs'
              // },
              {
                title: '新增用信额度汇总(万元)',
                align:"center",
                dataIndex: 'dkyxEdhz',
                customRender: text =>{
                  return text>0? text/10000:0
                }
              },
              {
                title: '新增有效用信客户数',
                align:"center",
                dataIndex: 'dkyxXzyxyxkhs',
                scopedSlots: { customRender: 'yxyx_xz' }
              },
              {
                title: '本月新增',
                align:"center",
                dataIndex: 'dkyxJsyxzyxyxkhs',
                scopedSlots: { customRender: 'yxyx_byxz' }
              },
              // {
              //   title: '本周新增',
              //   align:"center",
              //   dataIndex: 'dkyxJszxzyxyxkhs'
              // },
            ]
          },
          {
            title: '整村授信验收',
            children: [
              {
                title: '验收合格村个数',
                align:"center",
                dataIndex: 'sxysYshgcgs'
              },
              {
                title: '验收合格率',
                align:"center",
                dataIndex: 'sxysYshgl'
              },
            ]
          },
          {
            title: '验收是否合格',
            align:"center",
            dataIndex: 'zcsxYssfhg_dictText'
          },
        ],
		url: {
          list: "/zcsxzhjdb/zcsxzhjdb/list",
          delete: "/zcsxzhjdb/zcsxzhjdb/delete",
          deleteBatch: "/zcsxzhjdb/zcsxzhjdb/deleteBatch",
          exportXlsUrl: "zcsxzhjdb/zcsxzhjdb/exportXls",
          importExcelUrl: "zcsxzhjdb/zcsxzhjdb/importExcel",
          init: "zcsxzhjdb/zcsxzhjdb/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.init();
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        let curDate =''
        var params ={}
        getAction("/zcsxzhjdb/zcsxzhjdb/maxDate",params).then((res) => {
          console.log(res)
          if (res.success) {
            curDate= res.result;
          }
          this.defaultMonthOpera = moment(curDate);
          this.queryParam = {tjrq: undefined};
          this.queryParam.tjrq=this.defaultMonthOpera;
        })
      },
      searchReset() {
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      loadData (arg) {
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
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
            this.loading = false
            if (this.dataSource && this.dataSource.length > 0) {
              this.rkrq = this.dataSource[0].rkrq
              this.hnkdSjrq = this.dataSource[0].hnkdSjrq
            }
          } else {
            this.dataSource = []
            this.ipagination.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
      },
      getQueryParams() {
        let tjrqMoment = '';
        let tjnfMoment = "";
        let tjnf = this.queryParam.tjnf
        if (tjnf!=null && tjnf!='undefined'){
          tjnfMoment = tjnf
        }
        if (this.queryParam.tjrq) {
          tjrqMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqMoment;
        }
        param.tjnf=tjnfMoment;
        return filterObj(param);
      },
      // 获取当前年份
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
        this.queryParam = {tjnf: undefined};
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          if (year-i>=2023) {
            this.years.push({ value: ((year - i) + ''), label: ((year - i) + '') });
          }
        }
      },
      extract() {
        var params = Object.assign({}, this.queryParam)
        if (params.tjrq === undefined || params.tjrq == null) {
          this.$message.error('统计日期不能为空!')
          return
        }
        let tjrq = moment(params.tjrq).format('YYYY-MM-DD')
        this.loading = true
        putAction(this.url.init, { 'tjrq': tjrq }).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
        }).finally(() => {
          this.loading = false
        })
      },
      detailInfo(record,lx,type,otherlx){
        this.$refs.zcsxmx.init(record,lx,type,otherlx)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>