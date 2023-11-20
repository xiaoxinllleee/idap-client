<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定价年份">
              <a-select placeholder="请选择定价年份" v-model="djnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人代表">
              <a-input placeholder="请输入法人代表" v-model="queryParam.frdb"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd"  v-has="'tslldjjsNy:add'" type="primary" icon="plus">新增</a-button>
      <a-button  icon="download" v-has="'tslldjjsNy:export'" :loading="exportLoading" @click="handleExportXls('dwdw')">导出</a-button>
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
        :scroll="{ x: 2500 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="spzt" slot-scope="spzt">
          <a-tag :key="spzt" :color="spzt==='确认'?'#DB5860':spzt==='未确认'?'#15D36A':'grey'">
            {{ spzt }}
          </a-tag>
        </span>
        <span slot="xgzt" slot-scope="xgzt">
          <a-tag :key="xgzt" :color="xgzt==='已修改'?'#DB5860':xgzt==='未修改'?'#15D36A':'grey'">
            {{ xgzt }}
          </a-tag>
        </span>
         <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'tslldjjsNy:edit'">重新计算</a>
          <a-divider type="vertical"/>
          <a @click="print(record)" v-has="'tsdklldj:see'">查看</a>
          <a-divider type="vertical" v-if="record.spzt != 1"/>
          <a @click="sure(record)" v-if="record.spzt != 1" v-has="'tsdklldj:determine'">确定</a>
          <a-divider type="vertical" v-if="record.spzt == 1"/>
          <a @click="print(record)" v-if="record.spzt == 1" v-has="'tsdklldj:print'">打印</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.djid)" v-has="'tslldjjsNy:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rateTszxlldjb-modal ref="modalForm" @ok="modalFormOk"></rateTszxlldjb-modal>
    <sure-modal ref="sure"  @ok="ok"></sure-modal>
    <sure-repeat-model ref="sureRepeat"  @ok="ok"></sure-repeat-model>
    <print-info ref="print"></print-info>
  </a-card>
</template>

<script>
  import RateTszxlldjbModal from './modules/RateTszxlldjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, postAction } from '../../../../api/manage'
  import PrintInfo from './modules/PrintInfo'
  import SureModal from './modules/SureModal'
  import SureRepeatModel from './modules/SureRepeatModel'
  export default {
    name: "RateTszxlldjbList",
    mixins:[JeecgListMixin],
    components: {
      RateTszxlldjbModal,
      JTreeSelect,
      SureModal,
      PrintInfo,
      SureRepeatModel
    },
    data () {
      return {
        years: '',
        description: 'dwdw管理页面',
        // 表头
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
            title: '所属组织',
            align:"center",
            dataIndex: 'zzbz'
           },
		   {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzmc'
           },
		   {
            title: '定价年份',
            align:"center",
            dataIndex: 'djnf'
           },
		   {
            title: '定价编号',
            align:"center",
            dataIndex: 'djbh'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '法人代表',
            align:"center",
            dataIndex: 'frdb'
           },
		   {
            title: '报价日期',
            align:"center",
            dataIndex: 'bjrq'
           },
          {
            title: '基点(加/减)BP',
            align:"center",
            dataIndex: 'jdbp'
          },
		   {
            title: '月执行利率(%)',
            align:"center",
            dataIndex: 'zxll'
           },
          {
            title: '定价人',
            align:"center",
            dataIndex: 'djr'
          },
		   {
            title: '定价时间',
            align:"center",
            dataIndex: 'djsj'
           },
		   {
            title: '确认状态',
            align:"center",
            dataIndex: 'spzt_dictText',
          scopedSlots: {customRender: 'spzt'},
           },
		   {
            title: '确认人',
            align:"center",
            dataIndex: 'spr'
           },
		   {
            title: '确认时间',
            align:"center",
            dataIndex: 'spsj'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '修改状态',
            align:"center",
            dataIndex: 'xgzt_Text',
            scopedSlots: {customRender: 'xgzt'},
           },
		   {
            title: '修改人',
            align:"center",
            dataIndex: 'xgr'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'note'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            fixed: "right",
            width: 230,
          }
        ],
		url: {
          list: "/rateTszxlldjb/list",
          delete: "/rateTszxlldjb/delete",
          deleteBatch: "/rateTszxlldjb/deleteBatch",
          exportXlsUrl: "/rateTszxlldjb/exportXls",
          importExcelUrl: "/rateTszxlldjb/importExcel",
          getNameByZjhmandZzbz:'/rateTszxlldjb/addSave',
           getComfirDetail:"/rateTszxlldjb/confirm"
       },
    }
  },
    created() {
      this.init()
    },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      print(record) {
        if (record.dklx == 1) {
          record.dklxVal = '10万元(含)以内贷款';
          if (record.dklxxq == 1) {
            record.dklxxq = '以国有出让地上的房产抵押';
          } else if (record.dklxxq == 2) {
            record.dklxxq = '以国有划拨、集体土地上的房产抵押';
          } else if (record.dklxxq == 3) {
            record.dklxxq = '保证担保或联在保、林权、设备抵押等';
          } else if (record.dklxxq == 4) {
            record.dklxxq = '其他信用贷款';
          }
        } else if (record.dklx == 2) {
          record.dklxVal = '农户小额信用贷款（含福祥便民卡）';
          if (record.dklxxq == 1) {
            record.dklxxq = '未评级“信用村（社区）”的农户小额信用贷款';
          } else if (record.dklxxq == 2) {
            record.dklxxq = '一星级“信用村（社区）”的农户小额信用贷款';
          } else if (record.dklxxq == 3) {
            record.dklxxq = '二星级“信用村（社区）”的农户小额信用贷款';
          } else if (record.dklxxq == 4) {
            record.dklxxq = '三星级“信用村（社区）”的农户小额信用贷款';
          } else if (record.dklxxq == 5) {
            record.dklxxq = '四星级（及以上）“信用村（社区）”的农户小额信用贷款';
          }
        } else if (record.dklx == 3) {
          record.dklxVal = '质押贷款';
          if (record.dklxxq == 1) {
            record.dklxxq = '以存入本行存单质押，出质人与借款人属同一人（或家庭成员）';
          } else if (record.dklxxq == 2) {
            record.dklxxq = '以本行存单质押但出质人与借款人不属同一人、以他行存单质押但出质人与借款人属同一人';
          } else if (record.dklxxq == 3) {
            record.dklxxq = '以国债、存入他行存单质押（出质人与借款人不属同一人）';
          } else if (record.dklxxq == 4) {
            record.dklxxq = '在我行开立基本账户企业受理的银行承兑汇票质押';
          } else if (record.dklxxq == 5) {
            record.dklxxq = '银行其他票据质押贷款';
          } else if (record.dklxxq == 6) {
            record.dklxxq = '其他权利质押贷款';
          }
        } else if (record.dklx == 4) {
          record.dklxVal = '学校类、政府类、医疗系统类贷款、促进就业小额担保贷款、妇女创业贷款、困难党员专项贷款、银（社）团贷款、按揭贷款、公职人员贷款及员工贷款等专项贷款';
        } else if (record.dklx == 5) {
          record.dklxVal = '其他系统客户和重要客户';
        }

        if (record.dkqx == 1) {
          record.dkqx = '五年以上';
        } else if (record.dkqx == 1) {
          record.dkqx = '一至五年（含）';
        } else {
          record.dkqx = '一年（含）以内';
        }

        this.$refs.print.edit(record);
        this.$refs.print.title = "打印";
        this.$refs.print.disableSubmit = false

      },

      selectValue(value) {
        this.$emit('change', value)
      },
      ok()
      {

      },
      init() {
        var date = new Date
        var year = date.getFullYear()
        this.djnf = year
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      sure(record) {
        this.$refs.sure.edit(record);
        this.$refs.sure.title = "特殊利率定价确认(宁远)";
        this.$refs.sure.disableSubmit = false
        postAction(this.url.getComfirDetail, record).then((res) => {
          if (res.success) {
            if(res.data.confirmMsg)
            {

              this.$refs.sureRepeat.edit(record);
            }else{
              this.$refs.sure.edit(record);
              this.$refs.sure.title = "特殊利率定价确认(宁远)";
              this.$refs.sure.disableSubmit = false
            }

          } else {
            this.$message.error(res.message,5)
          }
        })
      },
      handleEdit(record)
      {
        this.handleAdd();
      },
      handleAdd()
      {

        //在计算时 准备数据
        var zzbz = this.queryParam.zzbz
        var djnf = this.djnf
        var zjhm = this.queryParam.zjhm
        console.info('新增时必输项校验', zzbz, djnf, zjhm)
        if (zzbz === undefined || zzbz === '') {
          this.$message.warning("请选择组织标识")
          return false
        }
        if (djnf === undefined || djnf === '') {
          this.$message.warning("请选择定价年份")
          return false
        }
        if (zjhm === undefined || zjhm === '') {
          this.$message.warning("请输入证件号码")
          return false
        }
        let data = {"zjhm": zjhm, "zzbz": zzbz,"djnf":djnf}
   /*     this.$refs.modalForm.edit(data);*/
        getAction(this.url.getNameByZjhmandZzbz, data).then((res) => {
          if (res.success) {
            var date = new Date();
            res.result.lrsj = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            console.log(res.result)
            let data = {
              "lrsj": res.result.lrsj,
              "khmc": res.result.djsqxx.khmc,
              "zjhm": res.result.djsqxx.zjhm,
              "frdb": res.result.djsqxx.frdb,
              "LPRLv1":res.result.LPRLv1,
              "LPRLv2":res.result.LPRLv2,
              "zzbz": res.result.djsqxx.zzbz

            }
            this.$refs.modalForm.edit(data);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
          } else {
            this.$message.error(res.message,5)
          }
        })


      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>