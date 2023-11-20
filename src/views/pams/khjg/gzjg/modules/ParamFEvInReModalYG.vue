<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1200"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">


      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size="small"
                 rowKey="yggh"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ y: 240 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"
                 @change="handleTableChange">
<!--          <span slot="action" type="primary" slot-scope="text, record">
          <Button type="primary" size="small" @click="handleEdit(record)">查看机构明细</Button>
        </span>-->
        </a-table>

      </div>

      <param-f-ev-in-re-modal-j-g ref="modalForm" @ok="modalFormOk"></param-f-ev-in-re-modal-j-g>

    </a-modal>
  </div>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import ParamFEvInReModalJG from './ParamFEvInReModalJG'

  export default {
    mixins: [JeecgListMixin],
    name: "ParamFEvInReModalYG",
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
        selectedRowKeys: [],
        selectedRows: [],
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          list:"/qqqqq/paramFEvInRe/list",
          add: "/qqqqq/paramFEvInRe/add",
          edit: "/qqqqq/paramFEvInRe/edit",
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
            title: '方案名称',
            align:"center",
            dataIndex: 'schemeId_dictText'
          },

          {
            title: '派生指标编号',
            align:"center",
            dataIndex: 'indexId'
          },
          {
            title: '派生指标名称',
            align:"center",
            dataIndex: 'indexId_dictText'
          },
          {
            title: '日期',
            align:"center",
            dataIndex: 'statDate'
          },

          {
            title: '员工编号',
            align:"center",
            dataIndex: 'evlObjId'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'evlObjId_dictText'
          },
          {
            title: '工资',
            align:"center",
            dataIndex: 'indexValue'
          },

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
        // 分页参数
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
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
      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        //this.loadData();
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        console.log("======"+record.evlObjId)
        console.log("======"+record.jgdm)
        console.log("======"+record.statDate)
        this.model = Object.assign({}, record);

        this.visible = true;

        var data = Object.assign({}, this.queryParam);
        data.pageNo = this.ipagination.current;
        data.pageSize = this.ipagination.pageSize;
        data.evlObjId = record.evlObjId;
        data.jgdm = record.jgdm;
        data.statDate = record.statDate;

        getAction(this.url.list,data).then(res=>{
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
        /*this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'indexId','evlObjId','balTypeId','statDate','indexValue','evlObjType','curTypeId','applyTypeId','schemeId'))
		  //时间格式化
        });*/

      },
      handleEdit: function (record) {
        console.log(record)
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>