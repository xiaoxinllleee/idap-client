<template>
  <a-modal
    :title="title"
    :width="modalWidth"
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
            <a-col :span="10"><a-form-item label="所属支行">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
            </a-form-item></a-col>


            <a-col :span="10"><a-form-item label="一级营销单元">
              <j-dict-select-tag placeholder="请选择一级营销单元" v-model="this.yjyxdybhdate"
                                 :dict-code="this.yjyxdybh"  :showSearch="true"  @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>


            <a-col :span="10"><a-form-item label="二级营销单元">
              <j-dict-select-tag placeholder="请选择二级营销单元" v-model="this.ejyxdybhdate"
                                 :dict-code="this.ejyxdybh":showSearch="true" :disabled=this.sfjsejyydy @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
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
  import {checkEjyxfy} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { httpAction,getAction } from '@/api/manage'



  export default {
    name: "SelectYgxxListModal",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
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
        title: "二级营销单元列表",
        visible: false,
        model: {},
        yjyxdybhdate:"",
        ejyxdybhdate:"",
        sfjsejyydy:true,
        yjyxdybh:"YXDYGL_YJYXDYGL,DYMC,DYBH",
        ejyxdybh:"YXDYGL_EJYXDYGL,DYMC,DYBH",
        confirmLoading: false,
        url: {
          add: "/act/model/create",
          list: "/yxdygl/ejyxdygl/querlist"
        },
        queryParam: {
          username:"",
        },
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh',
            fixed: 'left',
            width: 200
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
            fixed: 'left',
            width: 200
          },
          {
            title: '一级营销单元编号',
            align: "center",
            dataIndex: 'yjyxdybh',
            fixed: 'left',
            width: 200
          },
          {
            title: '一级营销单元名称',
            align: "center",
            dataIndex: 'yjyxdybh_dictText',
            fixed: 'left',
            width: 200
          },
          {
            title: '二级营销单元编号',
            align: "center",
            dataIndex: 'dybh',
          },
          {
            title: '二级营销单元名称',
            align: "center",
            dataIndex: 'dymc',
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
      // this.queryUserRoleMap();
      //Step.2 加载用户数据
      checkEjyxfy().then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
      })
    },
    methods: {
      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
        this.yjyxdybhdate= "";
        this.ejyxdybhdate="";
        this.sfjsejyydy=true,
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
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;
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
      searchReset() {
        this.queryParam = {}
        this.yjyxdybhdate= "";
        this.ejyxdybhdate="";
        this.sfjsejyydy=true,
          this.loadData(1);
      },
      showModal() {
        this.visible = true;
        this.form.resetFields();
      },

      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        console.log("this.getQueryParams()");
        var params = this.getQueryParams();//查询条件
        if(this.yjyxdybhdate){
          params.yjyxdybh = this.yjyxdybhdate
        }
        if(this.ejyxdybhdate){
          params.dybh = this.ejyxdybhdate
        }
        console.info(params)
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

      //获取一级营销单元编号查询一级名下所属二级营销单元
      getyjyxdybh(value) {
        if (value) {
          this.ejyxdybhdate= "";
          this.sfjsejyydy=false,
          this.yjyxdybhdate = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          this.ejyxdybhdate = value
        }
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
