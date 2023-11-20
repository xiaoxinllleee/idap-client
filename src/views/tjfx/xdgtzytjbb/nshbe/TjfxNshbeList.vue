<template>
  <a-card :bordered="false">


    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf"
                              placeholder="请选择统计月份" :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="挂片领导姓名">
              <j-dict-select-tag
                v-model="queryParam.gpld"
                placeholder="请选择挂片领导姓名"
                dictCode="HR_BAS_STAFF,ygxm,yggh"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行查询"
                               pid-field="sjzzbz"
                               showSearch="true"
                               treeNodeFilterProp="title"
                               v-model="queryParam.jgdm"
                               :sszh="true"
                               dict="hr_bas_organization, zzjc, zzbz"
                               :tree-default-expand-all="true"/>
              </a-form-item>
            </a-col>

           <!-- <a-col :md="6" :sm="8">
              <a-form-item label="所属支行">
                <j-dict-select-tag
                  v-model="queryParam.jgdm"
                  placeholder="请选择支行查询"
                  dictCode="v_hr_organization,zzjc,zzbz"
                  :showSearch="true"
                  treeNodeFilterProp="title"
                />
              </a-form-item>
            </a-col>-->

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
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('农商行表二')">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 3500 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

         <span slot="clckye" slot-scope="clckye ,record" >
          <a @click="handleckyeEdit(record,'存量存款余额','ye')">{{clckye}}</a>
        </span>
        <span slot="dqckye" slot-scope="dqckye ,record" >
          <a @click="handleckyeEdit(record,'当前存款余额','ye')">{{dqckye}}</a>
        </span>
        <span slot="ckjzje" slot-scope="ckjzje ,record" >
          <a @click="handleckyeEdit(record,'存款余额净增','ye')">{{ckjzje}}</a>
        </span>


        <span slot="cldkye" slot-scope="cldkye ,record" >
          <a @click="handledkyemxEdit(record,'存量贷款余额','ye')">{{cldkye}}</a>
        </span>
        <span slot="dqdkye" slot-scope="dqdkye ,record" >
          <a @click="handledkyemxEdit(record,'当前贷款余额','ye')">{{dqdkye}}</a>
        </span>
        <span slot="dkjzje" slot-scope="dkjzje ,record" >
          <a @click="handledkyemxEdit(record,'贷款净增余额','ye')">{{dkjzje}}</a>
        </span>

        <span slot="clbldkye" slot-scope="clbldkye ,record" >
          <a @click="handlebnbldkyemxEdit(record,'存量不良贷款余额','ye')">{{clbldkye}}</a>
        </span>
        <span slot="dqbldkye" slot-scope="dqbldkye ,record" >
          <a @click="handlebnbldkyemxEdit(record,'当前不良贷款余额','ye')">{{dqbldkye}}</a>
        </span>
        <span slot="blxjye" slot-scope="blxjye ,record" >
          <a @click="handlebnbldkyemxEdit(record,'不良下降余额','ye')">{{blxjye}}</a>
        </span>

        <span slot="clbwbldkye" slot-scope="clbwbldkye ,record" >
          <a @click="handlebwbldkyemxEdit(record,'存量表外不良贷款余额','ye')">{{clbwbldkye}}</a>
        </span>
        <span slot="dybwbldkye" slot-scope="dybwbldkye ,record" >
          <a @click="handlebwbldkyemxEdit(record,'当前表外不良贷款余额','ye')">{{dybwbldkye}}</a>
        </span>
        <span slot="bwblxjje" slot-scope="bwblxjje ,record" >
          <a @click="handlebwbldkyemxEdit(record,'表外不良下降余额','ye')">{{bwblxjje}}</a>
        </span>

        <span slot="clckkhs" slot-scope="clckkhs ,record" >
          <a @click="handlehsmxEdit(record,'存量存款客户数','cl','zzkhrq')">{{clckkhs}}</a>
        </span>
        <span slot="dqckkhs" slot-scope="dqckkhs ,record" >
          <a @click="handlehsmxEdit(record,'当前存款客户数','dq','zzkhrq')">{{dqckkhs}}</a>
        </span>
        <span slot="ckkhzjs" slot-scope="ckkhzjs ,record" >
          <a @click="handlehsmxEdit(record,'存款客户净增数','zl','zzkhrq')">{{ckkhzjs}}</a>
        </span>

        <span slot="cldkhs" slot-scope="cldkhs ,record" >
          <a @click="handlehsmxEdit(record,'存量贷款客户数','cl','zzjkrq')">{{cldkhs}}</a>
        </span>
        <span slot="dydkhs" slot-scope="dydkhs ,record" >
          <a @click="handlehsmxEdit(record,'当前贷款客户数','dq','zzjkrq')">{{dydkhs}}</a>
        </span>
        <span slot="dkkhjzs" slot-scope="dkkhjzs ,record" >
          <a @click="handlehsmxEdit(record,'贷款客户净增数','zl','zzjkrq')">{{dkkhjzs}}</a>
        </span>

        <span slot="clsjyhhs" slot-scope="clsjyhhs ,record" >
          <a @click="handlehsmxEdit(record,'存量手机银行户数','cl','sjyhkhrq')">{{clsjyhhs}}</a>
        </span>

        <span slot="dysjyhhs" slot-scope="dysjyhhs ,record" >
          <a @click="handlehsmxEdit(record,'当前手机银行户数','dq','sjyhkhrq')">{{dysjyhhs}}</a>
        </span>

        <span slot="sjyhjzhs" slot-scope="sjyhjzhs ,record" >
          <a @click="handlehsmxEdit(record,'手机银行净增户数','zl','sjyhkhrq')">{{sjyhjzhs}}</a>
        </span>

        <span slot="cletchs" slot-scope="cletchs ,record" >
          <a @click="handlehsmxEdit(record,'存量etc户数','cl','zzetckhrq')">{{cletchs}}</a>
        </span>
        <span slot="dyetchs" slot-scope="dyetchs ,record" >
          <a @click="handlehsmxEdit(record,'当前etc户数','dq','zzetckhrq')">{{dyetchs}}</a>
        </span>
        <span slot="etchsjz" slot-scope="etchsjz ,record" >
          <a @click="handlehsmxEdit(record,'ETC增加户数','zl','zzetckhrq')">{{etchsjz}}</a>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxNshbe-modal ref="modalForm" @ok="modalFormOk"></tjfxNshbe-modal>
    <nshbe-dkyemx-modal ref="NshbeDkyemxModal" @ok="modalFormOk" ></nshbe-dkyemx-modal>
    <nshbe-clckye-modal ref="NshbeClckyeModal" @ok="modalFormOk"></nshbe-clckye-modal>
    <nshbe-bnbldkyemx-modal ref="NshbeBnbldkyemxModal" @ok="modalFormOk" ></nshbe-bnbldkyemx-modal>
    <nshbe-bwbldkyemx-modal ref="NshbeBwbldkyemxModal" @ok="modalFormOk" ></nshbe-bwbldkyemx-modal>
    <nshbe-hsmx-modal ref="NshbeHsmxModal" @ok="modalFormOk" ></nshbe-hsmx-modal>
  </a-card>
</template>

<script>
  import TjfxNshbeModal from './modules/TjfxNshbeModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import  NshbeClckyeModal from './modules/NshbeClckyeModal'
  import  NshbeDkyemxModal from './modules/NshbeDkyemxModal'
  import  NshbeBnbldkyemxModal from './modules/NshbeBnbldkyemxModal'
  import  NshbeBwbldkyemxModal from './modules/NshbeBwbldkyemxModal'
  import NshbeHsmxModal from './modules/NshbeHsmxModal'
  import moment from 'moment'

  export default {
    name: "TjfxNshbeList",
    mixins:[JeecgListMixin],
    components: {
      TjfxNshbeModal,JTreeSelect,
      NshbeClckyeModal,NshbeDkyemxModal,NshbeBnbldkyemxModal,NshbeBwbldkyemxModal,NshbeHsmxModal
    },
    data () {
      return {
        description: '农商行统计报表二管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },

          {
            title: '挂片领导',
            align:"center",
            dataIndex: 'gpldgh_dictText'
          },
          {
            title: '所属支行代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '所属支行名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },


          {
            title:'存款 ',
            children:[
              {
                title: '存量存款余额',
                align:"center",
                dataIndex: 'clckye',
                scopedSlots:{customRender:'clckye'}
              },
              {
                title: '当期存款余额',
                align:"center",
                dataIndex: 'dqckye',
                scopedSlots:{customRender:'dqckye'}
              },
              {
                title: '存款净增金额',
                align:"center",
                dataIndex: 'ckjzje',
                scopedSlots:{customRender:'ckjzje'}
              },
            ]
          },


          {
            title:'贷款 ',
            children:[
              {
                title: '存量贷款余额',
                align:"center",
                dataIndex: 'cldkye',
                scopedSlots:{customRender:'cldkye'}
              },
              {
                title: '当期贷款余额',
                align:"center",
                dataIndex: 'dqdkye',
                scopedSlots:{customRender:'dqdkye'}
              },
              {
                title: '贷款净增金额',
                align:"center",
                dataIndex: 'dkjzje',
                scopedSlots:{customRender:'dkjzje'}

              },
            ]
          },

          {
            title:'不良贷款',
            children:[
              {
                title: '存量不良贷款余额',
                align:"center",
                dataIndex: 'clbldkye',
                scopedSlots:{customRender:'clbldkye'}
              },
              {
                title: '当期不良贷款余额',
                align:"center",
                dataIndex: 'dqbldkye',
                scopedSlots:{customRender:'dqbldkye'}

              },
              {
                title: '不良下降金额',
                align:"center",
                dataIndex: 'blxjye',
                scopedSlots:{customRender:'blxjye'}

              },
              {
                title: '存量表外不良贷款余额',
                align:"center",
                dataIndex: 'clbwbldkye',
                scopedSlots:{customRender:'clbwbldkye'}
              },
              {
                title: '当期表外不良余额',
                align:"center",
                dataIndex: 'dybwbldkye',
                scopedSlots:{customRender:'dybwbldkye'}

              },
              {
                title: '表外不良下降金额',
                align:"center",
                dataIndex: 'bwblxjje',
                scopedSlots:{customRender:'bwblxjje'}

              },
            ]
          },

          {
            title:'存款客户',
            children:[
              {
                title: '存量存款客户数',
                align:"center",
                dataIndex: 'clckkhs',
                scopedSlots:{customRender:'clckkhs'}

              },

              {
                title: '当前存款客户数',
                align:"center",
                dataIndex: 'dqckkhs',
                scopedSlots:{customRender:'dqckkhs'}

              },
              {
                title: '存款客户增加数',
                align:"center",
                dataIndex: 'ckkhzjs',
                scopedSlots:{customRender:'ckkhzjs'}

              },
            ]
          },

          {
            title:'贷款客户 ',
            children:[
              {
                title: '存量贷款客户',
                align:"center",
                dataIndex: 'cldkhs',
                scopedSlots:{customRender:'cldkhs'}

              },
              {
                title: '当前贷款客户',
                align:"center",
                dataIndex: 'dydkhs',
                scopedSlots:{customRender:'dydkhs'}
              },
              {
                title: '贷款客户增加数',
                align:"center",
                dataIndex: 'dkkhjzs',
                scopedSlots:{customRender:'dkkhjzs'}

              },
            ]
          },

          {
            title:'手机银行 ',
            children:[
              {
                title: '存量手机银行户数',
                align:"center",
                dataIndex: 'clsjyhhs',
                scopedSlots:{customRender:'clsjyhhs'}
              },
              {
                title: '当前手机银行户数',
                align:"center",
                dataIndex: 'dysjyhhs',
                scopedSlots:{customRender:'dysjyhhs'}
              },
              {
                title: '手机银行增加户数',
                align:"center",
                dataIndex: 'sjyhjzhs',
                scopedSlots:{customRender:'sjyhjzhs'}
              },
            ]
          },

          {
            title:'ETC ',
            children:[
              {
                title: '存量ETC户数',
                align:"center",
                dataIndex: 'cletchs',
                scopedSlots:{customRender:'cletchs'}
              },
              {
                title: '当前ETC户数',
                align:"center",
                dataIndex: 'dyetchs',
                scopedSlots:{customRender:'dyetchs'}
              },
              {
                title: 'ETC增加户数',
                align:"center",
                dataIndex: 'etchsjz',
                scopedSlots:{customRender:'etchsjz'}

              },
            ]
          },
        ],
        url: {
          list: "/tjfx.xdgtzytjbb.nshbe/tjfxNshbe/list",
          delete: "/tjfx.xdgtzytjbb.nshbe/tjfxNshbe/delete",
          deleteBatch: "/tjfx.xdgtzytjbb.nshbe/tjfxNshbe/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzytjbb.nshbe/tjfxNshbe/exportTemplateXls",
          importExcelUrl: "tjfx.xdgtzytjbb.nshbe/tjfxNshbe/importExcel",
          init:"/tjfx.xdgtzytjbb.nshbe/tjfxNshbe/extract",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      /**
       * 存款余额明细
       * @param record
       */
      handleckyeEdit: function(record,title,sjlx) {
        this.$refs.NshbeClckyeModal.edit(record,sjlx);
        this.$refs.NshbeClckyeModal.title = title;
        this.$refs.NshbeClckyeModal.disableSubmit = true;},

      /**
       * 贷款余额明细
       * @param record
       */
      handledkyemxEdit: function(record,title,sjlx) {
        this.$refs.NshbeDkyemxModal.edit(record,sjlx);
        this.$refs.NshbeDkyemxModal.title = title;
        this.$refs.NshbeDkyemxModal.disableSubmit = true;},

      /**
       * 不良贷款余额明细
       * @param record
       */
      handlebnbldkyemxEdit: function(record,title,sjlx) {
        this.$refs.NshbeBnbldkyemxModal.edit(record,sjlx);
        this.$refs.NshbeBnbldkyemxModal.title = title;
        this.$refs.NshbeBnbldkyemxModal.disableSubmit = true;},

      /**
       * 表外不良贷款余额明细
       * @param record
       */
      handlebwbldkyemxEdit: function(record,title,sjlx) {
        this.$refs.NshbeBwbldkyemxModal.edit(record,sjlx);
        this.$refs.NshbeBwbldkyemxModal.title = title;
        this.$refs.NshbeBwbldkyemxModal.disableSubmit = true;},

      /**
       * 户数明细
       * @param record
       */
      handlehsmxEdit: function(record,title,sjlx,zdmc1) {
        this.$refs.NshbeHsmxModal.edit(record,sjlx,zdmc1);
        this.$refs.NshbeHsmxModal.title = title;
        this.$refs.NshbeHsmxModal.disableSubmit = true;},


      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, 'TJYF='+tjyfstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,param).then((data)=>{
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
      },

      getQueryParams(){
        let tjyfMoment = "";
        if(this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf   = tjyfMoment;
        }
        return filterObj(param);
      },

    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>