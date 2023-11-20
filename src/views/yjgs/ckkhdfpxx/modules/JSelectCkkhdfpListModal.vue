<template>
  <a-modal
    :title="title"
    :width="1250"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    style="margin-top: -70px"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">

            <a-col :span="8">
              <a-form-item label="所属机构">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.jgdm"
                               dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="SJYWJGDM" treeNodeFilterProp="title"
                               :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户编号">
                <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="最早开户日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.zzkhrq" :format="DateFormat"
                                @change="onEndDateChange" style="width: 100%;"/>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="接收人">
                <j-select-ygxx ref="ygxx"  @change="Getyggh"/>
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
        <div class="ant-alert ant-alert-info">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
          <a style="margin-left: 20px" @click="onClearSelected">清空</a>
        </div>
        <a-table
          ref="table"
          :scroll="scrollTrigger"
          bordered
          size="middle"
          rowKey="khbh"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{type: type, selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { putAction } from '@/api/manage'
  import  JSelectYgxx  from './JSelectYgxx'



  export default {
    name: "SelectCkkhdfpListModal",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect,JSelectYgxx
    },
    props:{
      modalWidth:'',
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
    },
    data() {
      return {
        title: "员工列表",
        visible: false,
        model: {},
        isAll: false,
        sszh:'',
        ygxm:'',
        yggh:'',
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        url: {
          add: "/act/model/create",
          list: "/yjgs/ckkhdfpxx/list"
        },
        queryParam: {
          username:"",
        },
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
            title: '产品信息',
            align:"center",
            dataIndex: 'cpxx'
          },
          {
            title: '最早开户日期',
            align:"center",
            dataIndex: 'zzkhrq'
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },
          {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckrpye'
          },
          {
            title: '存款年日平',
            align:"center",
            dataIndex: 'cknrpye'
          },
        ],
        scrollTrigger: {},
        dataSource: [],
        selectedKeys: [],
        userNameArr: [],
        departName: '',
        userRolesMap: {},
        selectedRowKeys: [],
        selectedRows: [],
        form: this.$form.createForm(this)
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();

      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
     /* this.ygxm = store.getters.userInfo.realname;
      this.yggh = store.getters.userInfo.username;*/


    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fpzt = 1
        delete param.zzkhrq
        return filterObj(param)
      },


      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },

      onEndDateChange: function(value, dateString) {
        console.log("dateString");
        console.log(dateString)
        let dqrqDateString = dateString
        this.queryParam.zzkhrq_begin = dqrqDateString[0]
        this.queryParam.zzkhrq_end = dqrqDateString[1]
      },

      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
        this.$refs.ygxx.ygxm = '';
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
        this.close()
      },
      handleSubmit() {
        let that = this
        if (that.yggh == null || that.yggh == '' ){
          that.$message.error("请先选择接收人!")
        }else {
          that.selectedRows.forEach(item => {
            item["yggh"] = that.yggh
          })
          console.log("------cs---------")
          console.log(that.selectedRows)
          that.$confirm({
            title: '确认分配客户?',
            content: h => <div style="color:red;">分配客户数:{that.selectedRowKeys.length}</div>,
            onOk() {
              putAction("/yjgs/ckkhdfpxx/addDfp",that.selectedRows).then((res)=>{
                if(res.success){
                  that.$message.success('分配成功！');
                  that.onClearSelected();
                  that.visible = false;
                }else{
                  that.$message.error('分配失败！');
                }
              })
            },
            onCancel() {
              console.log('Cancel');
            },
            class: 'test',
          });
          this.close()
        }
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;
        console.log("选中客户数"+ this.selectedRows.length)
        console.log(this.selectedRows)
      },
      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc';
        }
        this.ipagination = pagination;
        this.loadData();
      },
      // 触发屏幕自适应
      resetScreenSize() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth < 500) {
          this.scrollTrigger = { x: 800 };
        } else {
          this.scrollTrigger = {};
        }
      },
      showModal() {
        this.visible = true;
        this.form.resetFields();
      },

      Getyggh(value){
        this.yggh = value.yggh
        this.ygxm = value.ygxm

      }
    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
</style>
