<template>
  <div>
    <a-modal
             :title="title"
             width="75%"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">


      <!-- table区域-begin -->
      <div>

        <a-table bordered
                 size="small"
                 rowKey="zbid"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="false"
                 :loading="loading"
                 :disableMixinCreated="false"
                 :scroll="{ y: 400 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"
                 @change="handleTableChange"
        />

        <!--<a-table bordered-->
                 <!--size="small"-->
                 <!--rowKey="yggh"-->
                 <!--:columns="columnsAljcJG"-->
                 <!--:dataSource="dataSource"-->
                 <!--:pagination="ipagination"-->
                 <!--:loading="loading"-->
                 <!--:disableMixinCreated="false"-->
                 <!--:scroll="{ y: 240 }"-->
                 <!--v-if="this.model.checkScene=='3'&&this.model.evlObjType=='1'"-->
                 <!--:rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"-->
                 <!--@change="handleTableChange"-->
                 <!--/>-->
        <!--<a-table bordered-->
                 <!--size="small"-->
                 <!--rowKey="yggh"-->
                 <!--:columns="columnsAljcGw"-->
                 <!--:dataSource="dataSource"-->
                 <!--:pagination="ipagination"-->
                 <!--:loading="loading"-->
                 <!--:disableMixinCreated="false"-->
                 <!--:scroll="{ y: 240 }"-->
                 <!--v-if="this.model.checkScene=='3'&&this.model.evlObjType=='3'"-->
                 <!--:rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"-->
                 <!--@change="handleTableChange"-->
        <!--/>-->


        <!--<a-table bordered-->
                 <!--size="small"-->
                 <!--rowKey="yggh"-->
                 <!--:columns="columnsPhjfkJG"-->
                 <!--:dataSource="dataSource1"-->
                 <!--:pagination="ipagination"-->
                 <!--:loading="loading"-->
                 <!--:disableMixinCreated="false"-->
                 <!--:scroll="{ y: 240 }"-->
                 <!--v-if="this.model.checkScene=='1'&&this.model.evlObjType=='1'"-->
                 <!--:rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"-->
                 <!--@change="handleTableChange"-->
        <!--/>-->
        <!--<a-table bordered-->
                 <!--size="small"-->
                 <!--rowKey="yggh"-->
                 <!--:columns="columnsPhjfkGW"-->
                 <!--:dataSource="dataSource1"-->
                 <!--:pagination="ipagination"-->
                 <!--:loading="loading"-->
                 <!--:disableMixinCreated="false"-->
                 <!--:scroll="{ y: 240 }"-->
                 <!--v-if="this.model.checkScene=='1'&&this.model.evlObjType=='3'"-->
                 <!--:rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"-->
                 <!--@change="handleTableChange"-->
        <!--/>-->
      </div>



    </a-modal>
  </div>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    mixins: [JeecgListMixin],
    name: "ParamFEvInReModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        dataSource:[],
        dataSource1:[],
        selectedRowKeys: [],
        selectedRows: [],
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          list:"/khfagl/erpAssessAljc/list",
          listJG:"/khfagl/erpAssessAljc/listJG",
          listPhjfk:"/khfagl/erpAssessPhjfk/list",
          listPhjfkJG:"/khfagl/erpAssessPhjfk/listJG",
          listZbxx: "/khlc/khfagl/pmaAScheme/queryZblistBySchemeId"
        },
        loading: false,
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
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },
        ],
        columnsAljcGw: [
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText',
            width:120,
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
            width:100,
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
            width:160,
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },

          {
            title: '指标单价',
            align:"center",
            dataIndex: 'zbdj'
          },
          {
            title: '指标单位',
            align:"center",
            dataIndex: 'zbdw'
          },
          {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
          },
          {
            title: '调节系数',
            align:"center",
            dataIndex: 'tjxs'
          },
          {
            title: '任务外单价',
            align:"center",
            dataIndex: 'rwwdj',
            width:120,
          },

        ],

        columnsAljcJG: [
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
            width:100,
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
            width:160,
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },

          {
            title: '指标单价',
            align:"center",
            dataIndex: 'zbdj'
          },
          {
            title: '指标单位',
            align:"center",
            dataIndex: 'zbdw'
          },
          {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
          },
          {
            title: '调节系数',
            align:"center",
            dataIndex: 'tjxs'
          },
          {
            title: '任务外单价',
            align:"center",
            dataIndex: 'rwwdj',
            width:120,
          },

        ],
        columnsPhjfkJG: [
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
            width:100,
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
            width:160,
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },
          {
            title: '指标分值',
            align:"center",
            dataIndex: 'zbfz'
          },
          {
            title: '指标增减符号',
            align:"center",
            dataIndex: 'zbabs',
          },
          {
            title: '加权比率',
            align:"center",
            dataIndex: 'jqbl'
          },
          {
            title: '加权比率分值',
            align:"center",
            dataIndex: 'jqblfz'
          },
          {
            title: '加权限制分值',
            align:"center",
            dataIndex: 'xzfz'
          },
          {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
          },
          {
            title: '计分制',
            align:"center",
            dataIndex: 'jfz'
          },
          {
            title: '减权比率',
            align:"center",
            dataIndex: 'kqbl'
          },
          {
            title: '减权比率分值',
            align:"center",
            dataIndex: 'kqblfz'
          },
          {
            title: '减权限制分值',
            align:"center",
            dataIndex: 'kqxzfz'
          },
        ],
        columnsPhjfkGW: [
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
            width:160,
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },
          {
            title: '指标分值',
            align:"center",
            dataIndex: 'zbfz'
          },
          {
            title: '指标增减符号',
            align:"center",
            dataIndex: 'zbabs',
            width:120,
          },
          {
            title: '加权比率',
            align:"center",
            dataIndex: 'jqbl'
          },
          {
            title: '加权比率分值',
            align:"center",
            dataIndex: 'jqblfz',
            width:120,
          },
          {
            title: '加权限制分值',
            align:"center",
            dataIndex: 'xzfz',
            width:120,
          },
          {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
          },
          {
            title: '计分制',
            align:"center",
            dataIndex: 'jfz'
          },
          {
            title: '减权比率',
            align:"center",
            dataIndex: 'kqbl'
          },
          {
            title: '减权比率分值',
            align:"center",
            dataIndex: 'kqblfz',
            width:120,
          },
          {
            title: '减权限制分值',
            align:"center",
            dataIndex: 'kqxzfz',
            width:120,
          },

        ],
        // 分页参数
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          total: 0
        },
        ipagination1: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          total: 0
        },
      }
    },
    created () {
    },
    methods: {
      /*handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        //this.loadData();
      },*/
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        console.log("======"+record.schemeId)
        this.model = Object.assign({}, record);
        console.log(this.model)

        this.visible = true;
        var data = Object.assign({}, this.queryParam);
        data.pageNo = this.ipagination.current;
        data.pageSize = this.ipagination.pageSize;
        data.schemeId = record.schemeId;

        getAction(this.url.listZbxx, {schemeId: record.schemeId}).then(res => {
          if (res.success) {
            this.dataSource = res.result
          }
        })

        // if(this.model.checkScene=='3'){
        //   if(this.model.evlObjType=='1'){
        //     getAction(this.url.listJG,data).then(res=>{
        //       if (res.success) {
        //         this.dataSource = res.result.records;
        //         this.ipagination.total = res.result.total;
        //         this.loading = false;
        //       }else{
        //         this.$message.error(res.message,5);
        //         this.loading = false;
        //       }
        //     })
        //   }else{
        //     getAction(this.url.list,data).then(res=>{
        //       if (res.success) {
        //         this.dataSource = res.result.records;
        //         this.ipagination.total = res.result.total;
        //         this.loading = false;
        //       }else{
        //         this.$message.error(res.message,5);
        //         this.loading = false;
        //       }
        //     })
        //   }
        //
        // }else{
        //   if(this.model.evlObjType=='1'){
        //     getAction(this.url.listPhjfkJG,data).then(res=>{
        //       if (res.success) {
        //         this.dataSource1 = res.result.records;
        //         this.ipagination1.total = res.result.total;
        //         this.loading = false;
        //       }else{
        //         this.$message.error(res.message,5);
        //         this.loading = false;
        //       }
        //     })
        //   }else{
        //     getAction(this.url.listPhjfk,data).then(res=>{
        //       if (res.success) {
        //         this.dataSource1 = res.result.records;
        //         this.ipagination1.total = res.result.total;
        //         this.loading = false;
        //       }else{
        //         this.$message.error(res.message,5);
        //         this.loading = false;
        //       }
        //     })
        //   }
        // }

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.close()
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>