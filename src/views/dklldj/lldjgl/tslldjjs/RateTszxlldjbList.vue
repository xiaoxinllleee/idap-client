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
            <!--<a-form-item label="定价年份">
              <a-date-picker  v-model="queryParam.djnf" />
            </a-form-item>-->
            <a-form-item label="定价年份">
              <a-select placeholder="请选择定价年份" v-model="djnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="定价编号">
                <a-input placeholder="请输入定价编号" v-model="queryParam.djid"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'tsdklldj:add'">添加</a-button>
      <a-button icon="download" @click="handleExportXls('特殊贷款利率定价信息')" v-has="'tsdklldj:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2500 }"
        @change="handleTableChange">

        <span slot="zzmc" slot-scope="text">
          <j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="djid" slot-scope="text">
          <j-ellipsis :value="text+''" :length="10"></j-ellipsis>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>

        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='五年以上'?'#FB6241':dkqx==='一至五年（含）'?'#8A2BE2':dkqx==='一年（含）以内'?'#41A002':'grey'">
            {{ dkqx }}
          </a-tag>
        </span>
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
          <a @click="handleEdit(record)" v-has="'tsdklldj:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a @click="print(record)" v-has="'tsdklldj:see'">查看</a>
          <a-divider type="vertical" v-if="record.spzt != 1"/>
          <a @click="sure(record)" v-if="record.spzt != 1" v-has="'tsdklldj:determine'">确定</a>
          <a-divider type="vertical" v-if="record.spzt == 1"/>
          <a @click="print(record)" v-if="record.spzt == 1" v-has="'tsdklldj:print'">打印</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.djid)" v-has="'tsdklldj:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rateTszxlldjb-modal ref="modalForm" @ok="modalFormOk"></rateTszxlldjb-modal>
    <print-info ref="print"></print-info>
    <sure-modal ref="sure"  @ok="ok"></sure-modal>
  </a-card>
</template>

<script>
  import RateTszxlldjbModal from './modules/RateTszxlldjbModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {postAction, getAction} from '@api/manage'
  import PrintInfo from './modules/PrintInfo'
  import SureModal from './modules/SureModal'
  import {filterObj} from "../../../../utils/util";
  import JInput from "../../../../components/jeecg/JInput";
  import store from '@/store/'
  import moment from "moment";
  import {downFile} from "@/api/manage";
  import JEllipsis from "@/components/jeecg/JEllipsis";

  export default {
    name: "RateTszxlldjbList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      RateTszxlldjbModal,
      JTreeSelect,
      PrintInfo,
      SureModal
    },
    data() {
      return {
        description: '特殊利率定价管理页面',
        dateValue: '',
        years: '',
        djnf: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            width: 60,
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '所属组织',
            align: "center",
            dataIndex: 'zzbz',
            width: 80,
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            scopedSlots: {customRender: 'zzmc'},
            width: 100,
          },
          {
            title: '定价年份',
            align: "center",
            dataIndex: 'djnf',
            customRender: function (text) {
              return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
            },
            width: 80,
          },
          {
            title: '定价编号',
            align:"center",
            dataIndex: 'djid',
            scopedSlots: {customRender: 'djid'},
            width: 120,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160,
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            width: 240,
          },
          {
            title: '贷款期限',
            align: "center",
            key: 'dkqx',
            dataIndex: 'dkqx_dictText',
            scopedSlots: {customRender: 'dkqx'},
            width: 120,
          },
          {
            title: '基准利率',
            align: "center",
            dataIndex: 'jzll',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '利率浮动幅度',
            align: "center",
            dataIndex: 'fdfd',
            width: 120,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2) + '%'
              }
            },
          },
          {
            title: '执行利率',
            align: "center",
            dataIndex: 'zxll',
            width: 120,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '定价人',
            align: "center",
            dataIndex: 'lrczy',
            width: 80,
          },
          {
            title: '定价时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 160,
          },
          {
            title: '确认状态',
            align: "center",
            dataIndex: 'spzt_dictText',
            scopedSlots: {customRender: 'spzt'},
            width: 80,
          },
          {
            title: '确认人',
            align: "center",
            dataIndex: 'spr',
            width: 80,
          },
          {
            title: '确认时间',
            align:"center",
            dataIndex: 'spsj',
            width: 160,
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'note',
            width: 200,
          },
          {
            title: '修改状态',
            align:"center",
            dataIndex: 'xgzt_dictText',
            scopedSlots: {customRender: 'xgzt'},
            width: 80,
          },
          {
            title: '修改人',
            align:"center",
            dataIndex: 'xgczy',
            width: 80,
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj',
            width: 160,
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
          list: "/rate/rateTszxlldjb/list",
          delete: "/rate/rateTszxlldjb/delete",
          deleteBatch: "/rate/rateTszxlldjb/deleteBatch",
          exportXlsUrl: "rate/rateTszxlldjb/exportXls",
          importExcelUrl: "rate/rateTszxlldjb/importExcel",
          getNameByZjhmandZzbz: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/getNameByZjhmandZzbz",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init()
    },
    methods: {
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

      selectValue(value) {
        this.$emit('change', value)
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        let djnf = ''
        if (this.djnf) {
          djnf = this.djnf + '-01-01';
        }
        param.djnf = djnf;
        return filterObj(param);
      },

      initQueryParams() {
        if (!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      searchReset() {
        this.queryParam = {djnf: undefined}
        var date = new Date
        var year = date.getFullYear()
        this.djnf = year
        this.queryParam.djnf = moment(this.djnf).format("YYYY")+"-01-01"
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        this.loadData(1)
      },

      sure(record) {
        this.$refs.sure.edit(record);
        this.$refs.sure.title = "特殊利率定价确认";
        this.$refs.sure.disableSubmit = false
      },

      handleAdd: function () {
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
        let data = {"zjhm": zjhm, "zzbz": zzbz}
        getAction(this.url.getNameByZjhmandZzbz, data).then((res) => {
          if (res.success) {
            var date = new Date();
            res.result.lrsj = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            let data = {
              "lrsj": res.result.lrsj,
              "khmc": res.result.khmc,
              "zjhm": res.result.zjhm,
              "frdb": res.result.frdb,
              "zzbz": res.result.zzbz
            }
            console.log(data)
            this.$refs.modalForm.edit(data);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
          } else {
            this.$message.error(res.message,5)
          }
        })


      },

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

      ok() {
        this.loadData(1);
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = this.getQueryParams()
        let djnf = ''
        if (param.djnf !== undefined && param.djnf !== null && param.djnf !== '') {
          djnf = moment(param.djnf).format("YYYY") + '-01-01'
        }
        param.djnf = djnf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('下载参数:', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>