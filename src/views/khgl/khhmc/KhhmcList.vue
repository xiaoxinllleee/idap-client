<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属乡镇">
            <j-dict-select-tag placeholder="请选择所属乡镇" v-model="queryParam.ssxz" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"
                               :showSearch="true" @change="getyjyxdybh" :trigger-change="TriggerChange" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" ><a-form-item label="行政村">
            <j-dict-select-tag placeholder="请选择行政村" v-model="queryParam.xzc" :dict-code="this.ejyxdybh"
                               :showSearch="true" :disabled=this.sfjsejyxdy @change="getejyxdybh" :trigger-change="TriggerChange" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="this.sfktsjyxdy==1" ><a-form-item label="行政组">
            <j-dict-select-tag placeholder="请选择行政组" v-model="this.sjyxdybhdate" :dict-code="this.sjyxdybh"
                               :showSearch="true" :disabled=this.sfjssjyxdy @change="getsjyxdybh" :trigger-change="TriggerChange" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="户号编码">
            <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="与户主关系">
              <j-dict-select-tag placeholder="请输入与户主关系" v-model="queryParam.yhzgx" dict-code="yhzgx"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否户主">
              <j-dict-select-tag placeholder="请选择是否户主" v-model="queryParam.sfhz" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="原所属乡镇">
              <a-input placeholder="请输入原所属乡镇" v-model="queryParam.yssxz"></a-input>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="原行政村">
              <a-input placeholder="请输入原行政村" v-model="queryParam.yxzc"></a-input>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否开通存款业务">
              <j-dict-select-tag placeholder="请选择是否开通存款业务" v-model="queryParam.sfktckyw" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否开通贷款业务">
              <j-dict-select-tag placeholder="请选择是否开通贷款业务" v-model="queryParam.sfktdkyw" dictCode="sfbz"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" :loading="exportLoading" icon="download" @click="handleExportXls('客户花名册')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleExtract" type="primary" icon="cloud-download">提取</a-button>
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
   <!-- <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>
-->
      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 5000 }"
               @change="handleTableChange">
        <span slot="ssyxdy" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="hhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="yssxz" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="yxzc" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="yhzgx" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="hbjl" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>
        <span slot="hyzk" slot-scope="text">
          <j-ellipsis :value="text" :length="2"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleDetail(record)">详情</a>-->
          <a @click="handleEdit(record)">编辑</a>
          <a-divider v-if="sszh==1" type="vertical"/>
          <a-popconfirm v-if="sszh==1" title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleEdit(record)">编辑</a>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
        <span slot="detail" slot-scope="khmc, record">
          <a @click="handleDetail(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khhmc-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import KhhmcModal from './modules/KhhmcModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { getAction, downFile,putAction} from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "KhhmcList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis, KhhmcModal, ExcelImport, JTreeSelect, JInput
    },
    data () {
      return {
        description: '客户花名册管理页面',
        isAll: false,
        sszh :'',
        sfktsjyxdy: 1,
        sfjsejyxdy: true,
        sfjssjyxdy: true,
        sjyxdybhdate:'',
        ejyxdybh: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        sjyxdybh: "YXDYGL_SJYXDYGL,DYMC,DYBH",
        TriggerChange: true,
        //表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
		      {
            title: '所属网点',
            align: "center",
            dataIndex: 'sszh_dictText',
            width: 120,
            sorter:true,
          },
		      /*{
            title: '所属区域',
            align: "center",
            dataIndex: 'ssyxdy_dictText',
            scopedSlots: { customRender: 'ssyxdy' },
            width: 150,
          },*/
          {
            title: '所属乡镇',
            align:"center",
            dataIndex: 'ssxz_dictText'
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc_dictText'
          },
          {
            title: '行政组',
            align:"center",
            dataIndex: 'xzz_dictText'
          },

		      {
            title: '户号编码',
            align: "center",
            dataIndex: 'hhbm',
            scopedSlots: { customRender: 'hhbm' },
            width: 160,
            sorter:true,
          },
		      {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText',
            scopedSlots: { customRender: 'yhzgx' },
            width: 120,
          },
		      {
            title: '是否户主',
            align: "center",
            dataIndex: 'sfhz_dictText',
          },
		      {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
            width: 100,

          },
		      {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' },
            width: 160,
          },
		      {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 80,
          },
          {
            title: '性别',
            align: "center",
            dataIndex: 'xb_dictText',
            width: 80,
            /*filters: [
              { text: '男', value: '1', },
              { text: '女', value: '2', }
            ],
            onFilter: (value, record) => record.xb.indexOf(value) === 0,*/
          },
          {
            title: '年龄',
            align: "center",
            dataIndex: 'nl',
            width: 80,
            sorter: true,
          },
          {
            title: '婚姻状况',
            align: "center",
            dataIndex: 'hyzk_dictText',
            scopedSlots: { customRender: 'hyzk' },
          },
          {
            title: '民族',
            align: "center",
            dataIndex: 'mz_dictText'
          },
		      {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs',
            width: 120,
          },
          {
            title: '地址',
            align: "center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 150,
          },
          {
            title: '原所属乡镇',
            align: "center",
            dataIndex: 'yssxz',
            scopedSlots: { customRender: 'yssxz' },
            width: 100,
          },
          {
            title: '原行政村',
            align: "center",
            dataIndex: 'yxzc',
            scopedSlots: { customRender: 'yxzc' },
            width: 100,
          },

		      {
            title: '是否开通存款业务',
            align: "center",
            dataIndex: 'sfktckyw_dictText',
          },
		      {
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye',
            sorter: true,
            width: 100,
          },
		      {
            title: '存款日平余额',
            align: "center",
            dataIndex: 'ckrpye',
            sorter: true,
          },
		      {
            title: '存款年日平余额',
            align: "center",
            dataIndex: 'cknrpye',
            sorter: true,
            width: 120,
          },
		      {
            title: '是否开通贷款业务',
            align: "center",
            dataIndex: 'sfktdkyw_dictText',
          },
		      {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye',
            sorter: true,
          },
		      {
            title: '不良贷款余额',
            align: "center",
            dataIndex: 'bldkye',
            sorter: true,
          },
		      {
            title: '表外不良贷款余额',
            align: "center",
            dataIndex: 'bwbldkye',
            sorter: true,
            width: 120,
          },
          {
            title: '是否开通手机银行',
            align: "center",
            dataIndex: 'sfktsjyhyw_dictText',
          },
          {
            title: '是否办理ETC',
            align: "center",
            dataIndex: 'sfbletcyw_dictText',
          },
          {
            title: '是否开通社保卡',
            align: "center",
            dataIndex: 'sfktsbk_dictText',
          },
          {
            title: '是否领取社保卡',
            align: "center",
            dataIndex: 'sflqsbk_dictText',
          },

          {
            title: '是否开通信用卡',
            align:"center",
            dataIndex: 'sfktxyk_dictText'
          },
          {
            title: '是否开通福民卡',
            align:"center",
            dataIndex: 'sfktfmk_dictText'
          },

          {
            title: '是否开通扫码付',
            align:"center",
            dataIndex: 'sfktsmf_dictText'
          },

          {
            title: '是否开通POS机',
            align:"center",
            dataIndex: 'sfktpos_dictText'
          },
          {
            title: '是否开通聚合支付',
            align:"center",
            dataIndex: 'sfktjhzf_dictText'
          },

          {
            title: '是否办理E支付',
            align:"center",
            dataIndex: 'sfblezf_dictText'
          },
          {
            title: '是否办理E缴费',
            align:"center",
            dataIndex: 'sfblejf_dictText'
          },
          {
            title: '是否办理助农终端',
            align:"center",
            dataIndex: 'sfblznzd_dictText'
          },
          {
            title: '是否办理理财业务',
            align:"center",
            dataIndex: 'sfbllcyw_dictText'
          },
          {
            title: '是否办理代理保险业务',
            align:"center",
            dataIndex: 'sfbldlbx_dictText',
            width: 100,
          },
          {
            title: '是否关注我行公众号',
            align:"center",
            dataIndex: 'sfgzgzh_dictText',
            width: 100,
          },

          {
            title: '是否吸毒人员',
            align:"center",
            dataIndex: 'sfxdry_dictText'
          },
          {
            title: '是否贫困户',
            align:"center",
            dataIndex: 'sfpkh_dictText'
          },
          {
            title: '是否低保',
            align:"center",
            dataIndex: 'sfdb_dictText'
          },

          {
            title: '是否公职人员',
            align:"center",
            dataIndex: 'sfgzry_dictText',

          },
          {
            title: '是否非法集资',
            align:"center",
            dataIndex: 'sfffjz_dictText',

          },
          {
            title: '患病记录',
            align:"center",
            dataIndex: 'hbjl',
            scopedSlots: { customRender: 'hbjl' },
            width: 100,
          },

          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
            width: 80,
          },

          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            sorter: true,
            width: 120,
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr',
            width: 80,

          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgsj',
            width: 120,

          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'xgr',
            width: 80,

          },
          //  {
          //   title: '机构代码',
          //   align: "center",
          //   dataIndex: 'jgdm'
          // },
          // {
          //   title: '系统评定结果(1:灰名单;2:白名单;3:黑名单)',
          //   align: "center",
          //   dataIndex: 'xtpdjg'
          // },
          // {
          //   title: '系统评定说明',
          //   align: "center",
          //   dataIndex: 'xtpdsm'
          // },
          // {
          //   title: '活期存款余额',
          //   align: "center",
          //   dataIndex: 'hqckye'
          // },
          // {
          //   title: '定期存款余额',
          //   align: "center",
          //   dataIndex: 'dqckye'
          // },
          // {
          //   title: '活期存款日平余额',
          //   align: "center",
          //   dataIndex: 'hqckrpye'
          // },
          // {
          //   title: '定期存款日平余额',
          //   align: "center",
          //   dataIndex: 'dqckrpye'
          // },
          // {
          //   title: '活期存款年日平余额',
          //   align: "center",
          //   dataIndex: 'hqcknrpye'
          // },
          // {
          //   title: '定期存款年日平余额',
          //   align: "center",
          //   dataIndex: 'dqcknrpye'
          // },
          //
          // {
          //   title: '贷款金额',
          //   align: "center",
          //   dataIndex: 'dkje'
          // },
          // {
          //   title: '最近贷款到期日期',
          //   align: "center",
          //   dataIndex: 'zjdkdqrq'
          // },
          //
          // {
          //   title: '是否开通网上银行业务',
          //   align: "center",
          //   dataIndex: 'sfktwsyhyw'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
        isorter: {
          order: 'desc',
        },
        url: {
          list: "/khgl/khhmc/list",
          init: "/khgl/khhmc/init",
          delete: "/khgl/khhmc/delete",
          deleteBatch: "/khgl/khhmc/deleteBatch",
          exportXlsUrl: "khgl/khhmc/exportXls",
          importExcelUrl: "khgl/khhmc/importExcel",
          exportTemplateUrl: "/khgl/khhmc/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }

    },



    created(){
      this.querycsz()
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode

    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.sfjsejyxdy=true;
        this.sfjssjyxdy=true;
        this.sjyxdybhdate='';
        this.loadData(1);
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "客户花名册导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })

        this.loadData();
      },
      handleExtract() {
        let params = {}
        this.loading = true;
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },


      //查询是否显示三级营销单元字段1：是 2：否
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          console.log("---------")
          if(res.result.csz==2){
            this.columns.splice(4,1)
          }
          this.sfktsjyxdy =res.result.csz
        });
      },
      getyjyxdybh(value) {
        console.info('（Message）查询条件-所属乡镇',value)
        if (value) {
          this.$set(this.queryParam,'ssxz',value)
          this.sfjsejyxdy = false
          this.sfjssjyxdy = true
          this.queryParam.ssxz = value
          let yjyxdybh = value
          this.ejyxdybh = 'YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH=' + yjyxdybh
          console.info('（Message）数据字典-行政村',this.ejyxdybh)
        }
      },
      getejyxdybh(value) {
        console.info('（Message）查询条件-行政村', value)
        if (value) {
          this.$set(this.queryParam,'xzc',value)
          this.sfjssjyxdy = false
          this.queryParam.xzc = value
          let ejyxdybh = value
          this.sjyxdybh = 'YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH=' + ejyxdybh
          console.info('（Message）数据字典-行政组', this.sjyxdybh)
        }
      },
      getsjyxdybh(value) {
        console.info('（Message）查询条件-行政组', value)
        this.$set(this.queryParam,'sjyxdybhdate',value)
        this.sjyxdybhdate = ''
        this.queryParam.xzz = value
        this.sjyxdybhdate = value
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>