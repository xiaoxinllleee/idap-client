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
            <a-col :span="10">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                               dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                               :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
              </a-form-item>
            </a-col>

            <a-col :span="10"><a-form-item label="镇">
              <j-dict-select-tag placeholder="请选择镇" v-model="this.yjyxdybhdate"
                                 :dict-code="this.yjyxdybh"  :showSearch="true"  @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>

            <a-col :span="10"><a-form-item label="村">
              <j-dict-select-tag placeholder="请选择村" v-model="this.ejyxdybhdate"
                                 :dict-code="this.ejyxdybh":showSearch="true" :disabled=this.sfjsejyxdy @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>
            <a-col :span="10"> <a-form-item label="组">
              <j-dict-select-tag placeholder="请选择组" v-model="this.sjyxdybhdate"
                                 :dict-code="this.sjyxdybh":showSearch="true" :disabled=this.sfjssjyxdy  @change="getsjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
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
      rowKey="dybh"
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
  import {checkSjyxfy} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { httpAction,getAction } from '@/api/manage'
  import store from '@/store/'
  import { mapGetters } from 'vuex'



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
        isAll: false,
        title: "三级营销单元列表",
        visible: false,
        model: {},
        yjyxdybhdate:"",
        ejyxdybhdate:"",
        sjyxdybhdate:"",
        sfjsejyxdy:true,
        sfjssjyxdy:true,
        yjyxdybh:"YXDYGL_YJYXDYGL,DYMC,DYBH",
        ejyxdybh:"YXDYGL_EJYXDYGL,DYMC,DYBH",
        sjyxdybh:"YXDYGL_SJYXDYGL,DYMC,DYBH",
        confirmLoading: false,
        url: {
          add: "/act/model/create",
          list: "/yxdygl/sjyxdygl/querylist"
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
            width: 100
          },
          {
            title: '所属支行名称',
            align: "center",
            dataIndex: 'sszh_dictText',
            fixed: 'left',
            width: 150
          },
          {
            title: '镇单元编号',
            align: "center",
            dataIndex: 'yjyxdybh',
            fixed: 'left',
            width: 100
          },
          {
            title: '镇名称',
            align: "center",
            dataIndex: 'yjyxdybh_dictText',
            fixed: 'left',
            width: 150
          },
          {
            title: '村单元编号',
            align: "center",
            dataIndex: 'ejyxdybh',
            fixed: 'left',
            width: 150
          },
          {
            title: '村名称',
            align: "center",
            dataIndex: 'ejyxdybh_dictText',
            fixed: 'left',
            width: 150
          },
          {
            title: '组单元编号',
            align: "center",
            dataIndex: 'dybh',
            width: 150
          },
          {
            title: '组名称',
            align: "center",
            dataIndex: 'dymc',
            width: 150

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
      /*checkSjyxfy().then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          console.log("----------------------")
          console.log(this.dataSource)
          console.log("----------------------")
        }
      })*/
      this.isAll = store.getters.isRoot;
      this.sszh =store.getters.userInfo.orgCode;
      this.searchReset();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
        this.yjyxdybhdate= "";
        this.ejyxdybhdate =" ";
        this.sfjsejyxdy=true,
        this.sfjssjyxdy=true,
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
        this.ejyxdybhdate =" ";
        this.sjyxdybhdate = "";
        this.sfjsejyxdy=true;
        this.sfjssjyxdy=true;
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
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
          params.ejyxdybh = this.ejyxdybhdate
        }
        if(this.sjyxdybhdate){
          params.dybh = this.sjyxdybhdate
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


      getyjyxdybh(value) {
        if (value) {
          this.ejyxdybhdate="",
          this.sjyxdybhdate="",
          this.sfjssjyxdy=true,
          this.sfjsejyxdy=false,
          this.yjyxdybhdate = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          this.sfjssjyxdy=false,
          this.ejyxdybhdate = value
          let ejyxdybh = value
          this.sjyxdybh = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getsjyxdybh(value){
        this.sjyxdybhdate = value
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
