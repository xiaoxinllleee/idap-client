<template>
  <a-modal wrapClassName="ant-modal-cust-warp"
           :title="title"
           width="75%"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           okText="确认移交"
           @cancel="handleCancel"
           cancelText="取消">
    <a-card :bordered="true">

      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="接收人">
                <j-select-ygxx placeholder="请选择接收人" button-name="选择接收人" ref="ygxx" @change="getYggh" type="radio" :isAll="this.isAll"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="移交日期">
                <a-date-picker placeholder="请选择移交日期" v-model="yjrq" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="移交说明">
                <a-textarea placeholder="请输入移交说明" v-model="remark" :row="1"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="移交方式">
                <a-radio-group buttonStyle="solid" @change="yjfsChange" v-model="yjfs">
                  <a-radio value="1">批量移交</a-radio>
                  <a-radio value="2">选择移交</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

<!--          <a-row :gutter="24" v-show="yjfs == '1'">
            <a-col :span="8">
              <a-form-item label="原拓展人">
                <j-select-ygxx placeholder="请选择原拓展人" button-name="选择原拓展人" ref="ygxx" @change="getYggh" type="radio"/>
              </a-form-item>
            </a-col>
          </a-row>-->



<!--          <a-row :gutter="24" v-show="yjfs == '1'" style="padding-top: 20px">
            <a-col :span="8">
              <a-form-item label="营销类型">
                <a-checkbox-group v-model="queryParam.yxlx">
                  <a-checkbox value="1">主动营销</a-checkbox>
                  <a-checkbox value="2">自然增长</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="存量标志">
                <a-checkbox-group buttonStyle="solid" v-model="queryParam.clbz">
                  <a-checkbox value="1">存量客户</a-checkbox>
                  <a-checkbox value="2">增量客户</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
          </a-row>
          -->
          <a-row :gutter="24" v-show="yjfs == '2'" style="padding-top: 20px">
            <a-col :span="8"><a-form-item label="组织机构">
                <j-tree-select placeholder="请选择组织机构" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,YWJGDM"
                               pid-field="sjywjgdm" tree-node-filter-prop="title"
                               :sszh="true" :show-search="false" :tree-default-expand-all="true" :filter-tree-node="true" :is-all="isRoot"/>
            </a-form-item></a-col>
            <a-col :span="8">
              <a-form-item label="客户类型">
                 <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.yxlx" dict-code="cust_type"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户编号">
                <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
             </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="合同号">
                <a-input placeholder="请输入合同号" v-model="queryParam.hth"/>
              </a-form-item>
            </a-col>

            <a-col :span="8" >
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div>
        <div class="ant-alert ant-alert-info" v-show="yjfs == '2'">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
          <a style="margin-left: 20px" @click="onClearSelected">清空</a>
        </div>

        <a-table v-show="yjfs == '2'"
                 bordered
                 ref="table"
                 size="middle"
                 rowKey="id"
                 :scroll="scroll"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :rowSelection="yjfs == '2'? {type: this.type, selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectEvent}: undefined"
                 @change="handleTableChange"/>
      </div>

    </a-card>
  </a-modal>
</template>

<script>
  import store from '@/store/'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import {mapGetters} from "vuex";
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JSelectYgxx from "../../../plugin/JSelectYgxx";
  import JInput from "@/components/jeecg/JInput";
  import {getAction, postAction} from "@/api/manage";
  import { filterObj } from '@/utils/util'
  import moment from "moment"

  export default {
    description: '贷款客户管户移交 管理页面',
    name: "DkkhyjModal",
    components: {JInput, JSelectYgxx, JTreeSelect, moment},
    mixins: [JeecgListMixin],
    props: {
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
    },
    data () {
      return {
        title:"贷款客户管户移交",
        isRoot: false,
        visible: false,
        loading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        scroll: {},
        model: {},
        queryParam: {},
        selectedRowKeys: [],
        columns: [
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户编号',
            align:"center",
            dataIndex: 'khbh'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },

          {
            title: '产品信息',
            align:"center",
            dataIndex: 'cpxx',
          },
          {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
          },
          {
            title: '管户类型',
            align:"center",
            dataIndex: 'ghlx_dictText'
          },
          {
            title: '管户人',
            align:"center",
            dataIndex: 'ghr'
          },
          {
            sorter: true,
            title: '管户比例(%)',
            align:"center",
            dataIndex: 'ghbl'
          },
        ],
        dataSource: [],
        yjfs: "1",
        yggh: "",
        ygxm: "",
        jsrgh:"",
        jsrxm:"",
        yjrq: '',
        remark: "",
        ipagination:{
          current: 1,
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        url: {
          list: "/dkkhyj/dkkhyjxx/ghTransferList",
          transfer: "/dkkhyj/dkkhyjxx/transfer",
        },
        isAll: false,
      }
    },
    created () {

      this.isRoot = store.getters.isRoot;
      this.sszh  = store.getters.userInfo.orgCode;
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      showModal: function (val, queryParam) {
        if(val==1){
          this.url.list="/dkkhyj/dkkhyjxx/ghTransferList";
          this.url.transfer="/dkkhyj/dkkhyjxx/ghTransfer";
          this.isAll = false
        }else{
          this.url.list="/dkkhyj/dkkhyjxx/bsTransferList";
          this.url.transfer="/dkkhyj/dkkhyjxx/bsTransfer";
          this.isAll = true
        }
        this.visible = true;
        this.confirmLoading = false;
        this.form.resetFields();
        this.queryParam = Object.assign({}, queryParam)
        this.searchQuery();
      },

      close: function () {
        this.$emit('close');
        this.dataSource=[];
        this.onClearSelected();
        this.visible = false;
      },

      handleCancel: function () {
        this.yjrq = '';
        this.remark = '';
        this.$refs.ygxx.yggh = '';
        this.$refs.ygxx.ygxm = '';
        this.dataSource=[];
        this.onClearSelected();
        this.close();
      },

      getQueryParams: function () {
        var param = Object.assign({},this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },

      searchQuery: function () {
        this.loadData(1);
      },

      searchReset: function () {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },

      onSelectEvent: function (selectedRowKeys, selectionRows) {
        // console.info('selectedRowKeys -',selectedRowKeys);
        // console.info('selectedRowKeys.length -',selectedRowKeys.length);
        // if (selectedRowKeys.length > 50) {
        //   this.$message.error("最多选择50位客户进行移交！");
        //   return false;
        // }
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;
      },

      handleTableChange: function (pagination, filters, sorter) {
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc';
        }
        this.ipagination = pagination;
        this.loadData();
      },

      yjfsChange(e) {
        console.log('yjfsChange', e)
        if (e.target.value == '1') {
          //批量移交
        } else {
          //选择移交
        }
      },

      getYggh: function (value) {
        //console.info('getYggh - value -',value);
        this.yggh = value.yggh;
        this.ygxm = value.ygxm;
      },



      onClearSelected: function () {
        this.selectedRowKeys = [];
        this.selectionRows = [];
      },

      handleOk: function () {
        let _this = this;
        // console.info('handleOk : selectedRowkeys.length -',_this.selectedRowKeys.length);
        // console.info('handleOk : selectedRows -',_this.selectedRows);
        let params = {}
        if(this.yjfs == '2'){
          //如果是批量移交
          if (_this.selectedRowKeys.length <= 0) {
            _this.$message.error("请至少选择一位客户移交！");
            return false
          }
          params.ids = _this.selectedRowKeys
          // if (_this.selectedRowKeys.length > 50) {
          //   _this.$message.error("最多选择50位客户进行移交！");
          // }
        }

        if (_this.yggh == null || _this.ygxm === '') {
          _this.$message.error("请选择接收人！");
          return false
        }
        if (_this.yjrq == null || _this.yjrq === '') {
          _this.$message.error("请选择移交日期！");
          return false
        }

        params.yggh = _this.yggh
        params.transferDate = moment(_this.yjrq).format("YYYY-MM-DD")
        params.remark = _this.remark
        params.yjfs = _this.yjfs
        this.confirmLoading = true;
        console.log('_this.selectedRowKeys', _this.selectedRowKeys)
        postAction(_this.url.transfer, params).then((res) => {
          if (res.success) {
            this.$Modal.confirm({
              title: "操作成功",
              content:
                `当前为"草稿"状态，建议立即到<我的申请>中提交该审批流程，是否立即跳转到我的申请?`,
              onOk: () => {
                this.$router.push({
                  path:'/activiti/apply-manage/applyManage'
                });
              }
            });
            _this.close();
          } else {
            _this.$message.error(res.message,5);
          }
        }).finally(() => {
          _this.confirmLoading = false;
        })
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
