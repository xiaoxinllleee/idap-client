<template>
  <a-modal
    :title="title"
    width="80%"
    :visible="visible"
    :dialog-style="{ top: '40px', height: modalHeight }"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="认领人">
                <a-input  v-model="this.ygxm" :disabled="true" ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8"><a-form-item label="认领日期">
              <a-date-picker placeholder="请选择认领日期" v-model="rlrq" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :span="8">
              <a-form-item label="认领比例">
                <a-input  v-model="this.rlbl"  ></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="16"><a-form-item label="认领说明">
              <a-input placeholder="请输入认领说明" v-model="remark"/>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">

            <a-col :span="8">
              <a-form-item label="所属机构">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.jgdm"
                               dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="SJYWJGDM" treeNodeFilterProp="title"
                               :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
              </a-form-item>
            </a-col>
            <template v-if="toggleSearchStatus">
            <a-col :span="8">
              <a-form-item label="证件号码">
                <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
              </a-form-item>
            </a-col>
              <a-col :span="8">
                <a-form-item label="存款账号">
                  <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
                </a-form-item>
              </a-col>
            <a-col :span="8">
              <a-form-item label="账号类型">
                <j-dict-select-tag placeholder="请选择账号类型" v-model="queryParam.zhlx" dict-code="ckzhlx"/>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="最早开户日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.zzkhrq" :format="DateFormat"
                                @change="onEndDateChange" style="width: 100%;"/>
              </a-form-item>
            </a-col>
            </template>
            <a-col :span="8" >
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
          rowKey="id"
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
  import JInput from '@/components/jeecg/JInput'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { putAction } from '@/api/manage'
  import moment from "moment"

  export default {
    name: "JSelectCkzhdrlListModal",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect, JInput
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
        rlrq: '',
        rlbl: '100',
        remark: "",
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        url: {
          add: "/act/model/create",
          list: "/yjgs/ckzhdrlxx/list"
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
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '账号类型',
            align:"center",
            dataIndex: 'zhlx_dictText'
          },
          {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
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
        form: this.$form.createForm(this),
        modalHeight: '',
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
      this.ygxm = store.getters.userInfo.realname;
      this.yggh = store.getters.userInfo.username;


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
        this.$emit('close');
        this.onClearSelected();
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
        if (that.rlrq == null || that.rlrq === '') {
          that.$message.error("请选择认领日期！");
          return false
        }
        if (that.rlbl == null || that.rlbl === '') {
          that.$message.error("请输入认领比例！");
          return false
        }
        if (that.selectedRowKeys.length <= 0) {
          that.$message.error("请至少选择一条记录！");
          return false
        }
        let params = {}
        params.rlrq = moment(that.rlrq).format("YYYY-MM-DD")
        params.rlbl = that.rlbl
        params.remark = that.remark
        params.ids = that.selectedRowKeys
        that.$confirm({
          title: '确认认领账号?',
          content: h => <div style="color:red;">认领账号数:{that.selectedRowKeys.length}</div>,
          onOk() {
            putAction("/yjgs/ckzhdrlxx/addDrl",params).then((res)=>{
              if(res.success){
                that.$Modal.confirm({
                  title: "操作成功",
                  content:
                    `当前为"草稿"状态，建议立即到<我的申请>中提交该审批流程，是否立即跳转到我的申请?`,
                  onOk: () => {
                    that.$router.push({
                      path:'/activiti/apply-manage/applyManage'
                    });
                  }
                });
                that.close()
                that.$emit('ok');
              }else{
                that.$message.error('认领失败！');
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
        /*this.$emit('ok', this.selectedRows);*/

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
          this.scrollTrigger = { x: 800, y: 300  };
        } else {
          this.scrollTrigger = {y: 300};
        }
      },
      showModal(queryParam) {
        this.visible = true;
        this.form.resetFields();
        this.modalHeight = (document.documentElement.clientHeight - 50 - 40) + 'px';
        this.queryParam = Object.assign({}, queryParam)
      },
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
