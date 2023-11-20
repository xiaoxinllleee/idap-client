<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
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
              <a-form-item label='月份'>
                <a-month-picker placeholder='请选择月份' v-model='queryParam.yf'
                                :defaultValue='defaultMonthOpera' style='width: 100%;' />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                               dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                               :sszh="sszh" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="员工姓名">
                <a-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="员工工号">
                <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="客户经理标识">
                <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8" >
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                    <a-button type="primary" @click="handleSubmit" icon="check" style="margin-left: 8px">确定</a-button>
                  </span>
            </a-col>

          </a-row>
        </a-form>
      </div>
      <div>
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
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import {getAction,putAction} from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "SelectYgxxListModal",
    mixins: [JeecgListMixin],
    components: { JTreeSelect},
    props:{
      modalWidth:'',
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
      sszh:{
        type:Boolean,
        default:true,
        required:false
      },
    },
    data() {
      return {
        title: "员工列表",
        visible: false,
        isAll: false,
        defaultMonthOpera: '',
        model: {},
        confirmLoading: false,
        url: {
          list: "/ygrggl/hrBasStaffPost/list"
        },
        queryParam: {
          username:"",
        },
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'zzbz_dictText',
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText',
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'yggh_dictText',
          },
          {
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbz'
          },
          {
            title: '入岗类型',
            align: "center",
            dataIndex: 'rglx_dictText'
          },
          {
            title: '入岗日期',
            align: "center",
            dataIndex: 'rgrq'
          },
          {
            title: '离岗日期',
            align: "center",
            dataIndex: 'lgrq'
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
      this.defaultMonthOpera = moment(new Date(), "yyyy-MM");
      this.queryParam = {yf: undefined};
      this.queryParam.yf=this.defaultMonthOpera;
      // 该方法触发屏幕自适应
      this.resetScreenSize();
      //Step.2 加载用户数据
      this.loadData(1);
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          //this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          //this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },

      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        this.loading = true;
        var params = this.getQueryParams();//查询条件
        getAction(this.url.list, params).then((res) => {
          console.log('res', res)
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      },


      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.close()
      },
      handleSubmit() {
        this.$emit('ok', this.selectedRows);
        this.close()
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        let that = this
        that.selectedRowKeys = selectedRowKeys;
        that.selectedRows = selectionRows;
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
