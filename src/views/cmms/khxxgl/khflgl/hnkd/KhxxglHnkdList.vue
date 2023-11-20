<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">

              <!--              <j-tree-select-not-jg placeholder="请选择归属网格"-->
              <!--                                    v-model="queryParam.wgbh"-->
              <!--                                    treeNodeFilterProp="title"-->
              <!--                                    pidField="PARENT_ID"-->
              <!--                                    dict="YXDYGL_MAIN,WGMC,ID"-->
              <!--                                    pidValue="0"-->
              <!--                                    :showSearch="true"-->
              <!--                                    :treeDefaultExpandAll="true">-->
              <!--<a-tree-select-->
                <!--:treeData=sswgTreeDateoptions-->
                <!--:replaceFields=replaceFields-->
                <!--v-model="queryParam.wgbh"-->
                <!--:dropdownStyle="{maxHeight:'400px',overflow:'auto'}"-->
                <!--allow-clear-->
                <!--showSearch-->
                <!--treeNodeFilterProp="title"-->
              <!--&gt;-->

              <!--</a-tree-select>-->
              <WgxxTreeSelect
                :options=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :loading="wgxxTreeLoading"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </WgxxTreeSelect>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if=" qybm == '095' ">
            <a-form-item label="婚姻状况">
              <j-dict-select-tag v-model="queryParam.hyzk" placeholder="请选择婚姻状况" dict-code="hnkd_hyzk095" :trigger-change="true" @change="change"></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if=" qybm == '095' ">
            <a-form-item label="是否导入惠农快贷">
<!--              <j-dict-select-tag v-model="queryParam.sfdrhnkd" placeholder="请选择是否导入惠农快贷" dict-code="sfbz" :trigger-change="true"></j-dict-select-tag>-->
              <j-dict-select-tag v-model="queryParam.sfdrhnkd" placeholder="请选择是否导入惠农快贷" dict-code="sfbz"></j-dict-select-tag>

            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if=" qybm != '095' ">
            <a-form-item label="客户类型">
              <j-dict-select-tag v-model="queryParam.khlx" placeholder="请选择客户类型" dict-code="hnkd_khlx"></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否外出务工">
              <j-dict-select-tag v-model="queryParam.sfycdg" placeholder="请选择是否外出务工" dict-code="sfbz"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="exp3">导出惠农快贷</a-button>
      <a-button icon="download" @click="exp('1')" v-has="'hnkd:mdlx1'">导出惠农快贷白名单</a-button>
      <a-button icon="download" @click="exp('2')" v-has="'hnkd:mdlx2'">导出惠农快贷红名单</a-button>
      <a-button icon="download" @click="exp('3')" v-has="'hnkd:mdlx3'">导出惠农快贷黑名单</a-button>
      <a-button icon="download" @click="exp2('1')" v-has="'hnkd:wcwg'">导出外出务工名单</a-button>
      <a-button icon="download" @click="countmd" :loading="loadingInit" v-has="'hnkd:gxmd'">更新名单</a-button>
<!--      <a-button @click="batchHnkd">批量导入惠农快贷</a-button>-->
      <a-popconfirm title="确定批量导入惠农快贷吗?" @confirm="() => batchHnkd()" v-has="'hnkd:batch'">
        <a-button >批量导入惠农快贷</a-button>
      </a-popconfirm>
      <a-button @click="stophnkd" v-has="'hnkd:stop'">停止快贷</a-button>
      <a-button @click="starthnkd" v-has="'hnkd:start'">启用快贷</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-button size="small" type="primary" @click="slsknkd(record)" :loading="loadingHnkd" v-has="'hnkd:ly'">导入惠农快贷</a-button>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-has="'hnkd:edit'">编辑</a>
          <a-divider type="vertical" />

          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                              <a v-has="'hnkd:del'">删除</a>
                            </a-popconfirm>
        </span>

      </a-table>
    </div>

    <khxxgl-hnkd-modal ref="modalForm" @ok="modalFormOk"></khxxgl-hnkd-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction,postAction } from '@api/manage'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import JDictSelectTag from '@comp/dict/JDictSelectTag'
import KhxxglHnkdModal from './modules/KhxxglHnkdModal'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import WgxxTreeSelect from '@/components/jeecg/WgxxTreeSelect'
import store from '@/store'

export default {
  name: 'KhxxglHnkdList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelectNotJg, JDictSelectTag,KhxxglHnkdModal,JTreeSelect, WgxxTreeSelect
  },
  data () {
    return {
      description: '惠农快贷管理页面',
      loadingInit: false,
      loadingHnkd:false,
      wgxxTreeLoading: false,
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      // 表头
      columns: [

      ],
      columnsInit: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '归属机构',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '归属网格',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        }, {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '客户类型',
          align: 'center',

          dataIndex: 'khlx_dictText'
        },
        {
          title: '婚姻状况',
          align: 'center',
          dataIndex: 'hyzk_dictText'
        },
        {
          title: '额度',
          align: 'center',
          dataIndex: 'sxed'
        },
        {
          title: '基点',
          align: 'center',
          dataIndex: 'jd'
        },
        {
          title: '家庭年收入',
          align: 'center',
          dataIndex: 'jtnsr'
        },
        {
          title: '个人年收入',
          align: 'center',
          dataIndex: 'grnsr'
        },
        {
          title: '授信期限（月）',
          align: 'center',
          dataIndex: 'sxqx'
        },
        {
          title: '客户经理工号',
          align: 'center',
          dataIndex: 'khjl'
        },
        // {
        //      title: '调查责任人1工号',
        //      align:"center",
        //      dataIndex: 'dczrr1'
        //     },
        // {
        //      title: '调查责任人1比例',
        //      align:"center",
        //      dataIndex: 'dczrr1bl'
        //     },
        // {
        //      title: '调查责任人2工号',
        //      align:"center",
        //      dataIndex: 'dczrr2'
        //     },
        // {
        //      title: '调查责任人2比例',
        //      align:"center",
        //      dataIndex: 'dczrr2bl'
        //     },
        // {
        //      title: '管理责任人工号',
        //      align:"center",
        //      dataIndex: 'glzrr'
        //     },
        // {
        //      title: '管理责任人比例',
        //      align:"center",
        //      dataIndex: 'glzrrbl'
        //     },
        // {
        //      title: '审查责任人工号',
        //      align:"center",
        //      dataIndex: 'sczrr'
        //     },
        // {
        //      title: '审查责任人比例',
        //      align:"center",
        //      dataIndex: 'sczrrbl'
        //     },
        // {
        //      title: '最终审批责任人工号',
        //      align:"center",
        //      dataIndex: 'zzspzrr'
        //     },
        // {
        //      title: '最终审批责任人比例',
        //      align:"center",
        //      dataIndex: 'zzspzrrbl'
        //     },
        // {
        //   title: '第一责任人工号',
        //   align: 'center',
        //   dataIndex: 'dyzrr'
        // },
        // {
        //   title: '第一责任人比例',
        //   align: 'center',
        //   dataIndex: 'dyzrrbl'
        // },
        // {
        //      title: '是否发送短信提醒',
        //      align:"center",
        //      dataIndex: 'sffsdx'
        //     },
        // {
        //      title: '经营情况是否正常',
        //      align:"center",
        //      dataIndex: 'jyqk'
        //     },
        // {
        //      title: '产品市场需求情况',
        //      align:"center",
        //      dataIndex: 'scxu'
        //     },
        // {
        //      title: '借款人还款意愿',
        //      align:"center",
        //      dataIndex: 'hkyy'
        //     },
        // {
        //      title: '综合评价标志',
        //      align:"center",
        //      dataIndex: 'pjbz'
        //     },
        // {
        //      title: '循环标志',
        //      align:"center",
        //      dataIndex: 'xhbz'
        //     },
        // {
        //   title: '信用等级',
        //   align: 'center',
        //   dataIndex: 'xydj'
        // },
        {
          title: '是否导入惠农快贷',
          align: 'center',
          dataIndex: 'sfdrhnkd_dictText'
        },
        {
          title: '导入结果',
          align: 'center',
          dataIndex: 'impResult'
        },
        /*{
          title: '个体工商户名称',
          align: 'center',
          dataIndex: 'gtgshmc'
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          dataIndex: 'xydm'
        },*/
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns095: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '归属机构',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '归属网格',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        }, {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '客户类型',
          align: 'center',

          dataIndex: 'khlx_dictText'
        },
        {
          title: '婚姻状况',
          align: 'center',
          dataIndex: 'hyzk_dictText'
        },
        {
          title: '额度',
          align: 'center',
          dataIndex: 'sxed'
        },
        {
          title: '基点',
          align: 'center',
          dataIndex: 'jd'
        },
        {
          title: '家庭年收入',
          align: 'center',
          dataIndex: 'jtnsr'
        },
        {
          title: '个人年收入',
          align: 'center',
          dataIndex: 'grnsr'
        },
        {
          title: '授信期限（月）',
          align: 'center',
          dataIndex: 'sxqx'
        },
        {
          title: '客户经理工号',
          align: 'center',
          dataIndex: 'khjl'
        },
        // {
        //      title: '调查责任人1工号',
        //      align:"center",
        //      dataIndex: 'dczrr1'
        //     },
        // {
        //      title: '调查责任人1比例',
        //      align:"center",
        //      dataIndex: 'dczrr1bl'
        //     },
        // {
        //      title: '调查责任人2工号',
        //      align:"center",
        //      dataIndex: 'dczrr2'
        //     },
        // {
        //      title: '调查责任人2比例',
        //      align:"center",
        //      dataIndex: 'dczrr2bl'
        //     },
        // {
        //      title: '管理责任人工号',
        //      align:"center",
        //      dataIndex: 'glzrr'
        //     },
        // {
        //      title: '管理责任人比例',
        //      align:"center",
        //      dataIndex: 'glzrrbl'
        //     },
        // {
        //      title: '审查责任人工号',
        //      align:"center",
        //      dataIndex: 'sczrr'
        //     },
        // {
        //      title: '审查责任人比例',
        //      align:"center",
        //      dataIndex: 'sczrrbl'
        //     },
        // {
        //      title: '最终审批责任人工号',
        //      align:"center",
        //      dataIndex: 'zzspzrr'
        //     },
        // {
        //      title: '最终审批责任人比例',
        //      align:"center",
        //      dataIndex: 'zzspzrrbl'
        //     },
        // {
        //   title: '第一责任人工号',
        //   align: 'center',
        //   dataIndex: 'dyzrr'
        // },
        // {
        //   title: '第一责任人比例',
        //   align: 'center',
        //   dataIndex: 'dyzrrbl'
        // },
        // {
        //      title: '是否发送短信提醒',
        //      align:"center",
        //      dataIndex: 'sffsdx'
        //     },
        // {
        //      title: '经营情况是否正常',
        //      align:"center",
        //      dataIndex: 'jyqk'
        //     },
        // {
        //      title: '产品市场需求情况',
        //      align:"center",
        //      dataIndex: 'scxu'
        //     },
        // {
        //      title: '借款人还款意愿',
        //      align:"center",
        //      dataIndex: 'hkyy'
        //     },
        // {
        //      title: '综合评价标志',
        //      align:"center",
        //      dataIndex: 'pjbz'
        //     },
        // {
        //      title: '循环标志',
        //      align:"center",
        //      dataIndex: 'xhbz'
        //     },
        // {
        //   title: '信用等级',
        //   align: 'center',
        //   dataIndex: 'xydj'
        // },
        {
          title: '是否导入惠农快贷',
          align: 'center',
          dataIndex: 'sfdrhnkd_dictText'
        },
        {
          title: '导入额度',
          align: 'center',
          dataIndex: 'dred'
        },
        /*{
          title: '个体工商户名称',
          align: 'center',
          dataIndex: 'gtgshmc'
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          dataIndex: 'xydm'
        },*/
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/nh/khxxglHnkd/list',
        delete: '/nh/khxxglHnkd/delete',
        deleteBatch: '/nh/khxxglHnkd/deleteBatch',
        exportXlsUrl: 'nh/khxxglHnkd/exportXls',
        importExcelUrl: 'nh/khxxglHnkd/importExcel',
        countmd: 'nh/khxxglHnkd/count'
      },
      sswgTreeDateoptions: [],
      qybm:''
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created () {
    this.qybm = store.getters.qybm
    this.wgxxTreeLoading  = true
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl',{wgxz: '6,8', wgxzType: '2', maxLevel: '3'}).then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    }).finally(() => {
      this.wgxxTreeLoading  = false
    })
    if (this.qybm == '095'){
      this.queryParam.hyzk="1"
      this.queryParam.khlx="1"
      this.columns = this.columns095
    }else {
      this.columns = this.columnsInit
    }
    this.loadData(1)
  },
  methods: {
    change(e){
      console.log(e)
      this.queryParam.hyzk=e
      this.loadData(1)
    },
    searchReset () {
      this.queryParam = {}
      if (this.qybm == '095'){
        this.queryParam.hyzk="1"
        this.queryParam.khlx="1"
      }
      this.beforeSearchQuery()
      this.loadData(1)
    },
    batchHnkd(){
      let params = this.getQueryParams()//查询条件
      //谷歌游览访问同一个url 在参数不变的情况下 会进行排队
      params.time = new Date()
      console.log(params)
      getAction("/nh/khxxglHnkd/listLy",params).then(res=>{
        if (res.success){
          this.successInfo("成功")
          this.loadData(1)
        }else {
          this.errorInfo(res.message)
        }
      })
    },
    stophnkd(){
      postAction("/nh/khxxglHnkd/stophnkd").then(res=>{
        if (res.success){
          this.successInfo("成功")
        }else {
          this.errorInfo(res.message)
        }
      })
    },
    starthnkd(){
      postAction("/nh/khxxglHnkd/starthnkd").then(res=>{
        if (res.success){
          this.successInfo("成功")
        }else {
          this.errorInfo(res.message)
        }
      })
    },

    slsknkd(record){
      this.loadingHnkd = true;
      getAction("/nh/khxxglHnkd/listLy",{id:record.id}).then(res=>{
        this.loadingHnkd = false
        if (res.success){
          this.successInfo("成功")
          this.loadData(1)
        }else {
          this.errorInfo(res.message)
        }
      })
    },
    exp3 () {
      //this.queryParam = {}
      this.handleExportXls('惠农快贷')
    },
    exp (val) {
      this.queryParam.khlx = val
      this.handleExportXls('惠农快贷')
    },
    exp2 (val) {
      this.queryParam.sfycdg = val
      this.handleExportXls('惠农快贷')
    },
    countmd () {
      this.loadingInit = true
      getAction(this.url.countmd).then(res => {
        if (res.success) {
          this.$message.success('更新名单成功')
        }
        this.loadingInit = false
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>