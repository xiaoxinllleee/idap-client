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
            <a-col :span="8"><a-form-item label="接收人">
              <j-select-ygxx placeholder="请选择接收人" ref="ygxx" @change="getYggh" type="radio" :isAll="false"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="移交日期">
              <a-date-picker placeholder="请选择移交日期" v-model="yjrq" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="移交说明">
              <a-textarea placeholder="请输入移交说明" v-model="remark" :row="1"/>
            </a-form-item></a-col>
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
          <a-row :gutter="24" v-show="yjfs == '1'">
            <a-col :span="8"><a-form-item label="客户类型">
              <a-checkbox-group v-model="queryParam1.khlx" :default-value="['2','1']">
                <a-checkbox value="2" defaultChecked>个人客户</a-checkbox>
                <a-checkbox value="1" defaultChecked>对公客户</a-checkbox>
              </a-checkbox-group>
            </a-form-item></a-col>
            <!--<a-col :span="8"><a-form-item label="存量标志">-->
              <!--<a-checkbox-group buttonStyle="solid" v-model="queryParam1.clbz" :default-value="['1','2']">-->
                <!--<a-checkbox value="1" defaultChecked>存量客户</a-checkbox>-->
                <!--<a-checkbox value="2" defaultChecked>增量客户</a-checkbox>-->
              <!--</a-checkbox-group>-->
            <!--</a-form-item></a-col>-->
            <a-col :span="8" >
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
          <a-row :gutter="24" v-show="yjfs == '2'">
            <a-col :span="8"><a-form-item label="组织机构">
                <j-tree-select placeholder="请选择组织机构" v-model="queryParam2.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,YWJGDM"
                               pid-field="sjywjgdm" tree-node-filter-prop="title"
                               :sszh="true" :show-search="false" :tree-default-expand-all="true" :filter-tree-node="true" :is-all="isAll"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam2.khlx" dict-code="jx_khlx"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam2.khbh"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam2.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :span="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam2.zjhm"/>
            </a-form-item></a-col>
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

        <a-table bordered
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
    description: '存款客户管户移交 管理页面',
    name: "CkkhghyjModal",
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
        title:"存款客户管户移交",
        isAll: false,
        visible: false,
        loading: false,
        confirmLoading: false,
        // form: this.$form.createForm(this),
        scroll: {},
        model: {},
        queryParam1: {},
        queryParam2: {},
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
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '持有产品',
            align:"center",
            dataIndex: 'cpxx'
          },
          // {
          //   title: '管户人',
          //   align:"center",
          //   dataIndex: 'ghr'
          // },
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
          list: "/performance/ckkhghyj/transferList",
          transfer: "/performance/ckkhghyj/transfer",
        },
      }
    },
    created () {
      getAction(this.url.list,{}).then((res) => {
        if (res.success) {
          // console.info('res.result -',res.result);
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
      })
      this.isAll = store.getters.isRoot;
      this.sszh  = store.getters.userInfo.orgCode;
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      showModal: function () {
        this.visible = true;
        this.confirmLoading = false;
        // this.form.resetFields();
        this.searchReset();
      },

      close: function () {
        this.$emit('close');
        this.onClearSelected();
        this.visible = false;
      },

      handleCancel: function () {
        this.yjrq = '';
        this.remark = '';
        this.$refs.ygxx.yggh = '';
        this.$refs.ygxx.ygxm = '';
        this.onClearSelected();
        this.close();
      },

      getQueryParams: function () {
        let param = undefined
        if (this.yjfs == '1') {
          param = Object.assign({},this.queryParam1,this.isorter);
          if (param.khlx && param.khlx.length > 0) {
            param.khlx = param.khlx.join(',')
          }
          if (param.clbz && param.clbz.length > 0) {
            param.clbz = param.clbz.join(',')
          }
        } else {
          param = Object.assign({},this.queryParam2,this.isorter);
        }
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },

      searchQuery: function () {
        this.loadData(1);
      },

      searchReset: function () {
        if (this.yjfs == '1') {
          this.queryParam1 = {};
        } else {
          this.queryParam2 = {}
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
        this.loadData();
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
        if (this.yggh == null || _this.yggh === '') {
          _this.$message.error("请选择接收人！");
          return false
        }
        if (_this.yjrq == null || _this.yjrq === '') {
          _this.$message.error("请选择移交日期！");
          return false
        }
        let params = {}
        if (this.yjfs == '1') {
          //如果是批量移交
          if (this.queryParam1.khlx && this.queryParam1.khlx.length > 0) {
            params.khlx = this.queryParam1.khlx.join(',')
          }
        } else if (this.yjfs == '2') {
          //如果是选择移交
          if (_this.selectedRowKeys.length <= 0) {
            _this.$message.error("请至少选择一位客户移交！");
            return false
          }
          params.ids = _this.selectedRowKeys;

          // if (_this.selectedRowKeys.length > 50) {
          //   _this.$message.error("最多选择50位客户进行移交！");
          // }
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
