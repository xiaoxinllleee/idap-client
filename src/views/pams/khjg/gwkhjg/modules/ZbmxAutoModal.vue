<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ style: { display: 'none' } }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 主表单区域 -->
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工资日期">
              <a-date-picker placeholder="请选择工资日期" style="width: 100%;" v-decorator="['gzrq',{}]"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input  v-decorator="['zzbz_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <j-dict-select-tag
                v-decorator="['gwbz',{}]"
                placeholder="请选择岗位名称"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标标识">
              <a-input placeholder="请输入指标标识" v-decorator="['zbid', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标名称">
              <a-input placeholder="请输入指标名称" v-decorator="['zbid_dictText', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标结果">
              <a-input placeholder="请输入指标结果" v-decorator="['zbjg', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标工资">
              <a-input placeholder="请输入指标工资" v-decorator="['zbgz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 子表单区域 -->
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="指标明细" key="1">
            <a-button type='primary'  style="margin-bottom: 10px" @click="dcmx">导出明细</a-button>
            <div>
              <a-table
                ref="table"
                size="middle"
                bordered
                :rowKey="rowKey"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                :scroll="{ x: scrollX }"
                @change="handleTableChange">
              </a-table>
           </div>

          </a-tab-pane>


        </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "JeecgOrderMainModal",
    mixins:[JeecgListMixin],
    components: {
      JDate
    },
    data () {
      return {
        id:'',
        queryParam: {},
        loading:false,
        model: {},
        scrollX: '',
        columns:[],
        title:"操作",
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        dataSource:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          list: "/zbmx/zbmxSet/listZmbx",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record,zszdxx,zbmxjg,total) {
        this.id=record.id;
        this.queryParam= Object.assign({}, record);
        this.ipagination.total=total;
        this.columns=zszdxx;
        this.scrollX = this.columns.length * 100
        console.log(this.columns)
        console.log(this.dataSource)
        this.dataSource=zbmxjg;
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'gzrq','zzbz_dictText','gwbz','yggh_dictText','zbid','zbid_dictText','zbjg','zbgz','zbdj','zbdw'))
        });
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
            if(!this.orderMainModel.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let orderMainData = Object.assign(this.orderMainModel, values);
            //时间格式化
            orderMainData.orderDate = orderMainData.orderDate?orderMainData.orderDate.format('YYYY-MM-DD HH:mm:ss'):null;
            let formData = {
              ...orderMainData,
              jeecgOrderCustomerList: orderMainData.jeecgOrderCustomerList,
              jeecgOrderTicketList: orderMainData.jeecgOrderTicketList
            }

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
      addRowCustom () {
        this.orderMainModel.jeecgOrderCustomerList.push({});
        this.$forceUpdate();
      },
      delRowCustom (index) {
        console.log(index)
        this.orderMainModel.jeecgOrderCustomerList.splice(index,1);
        this.$forceUpdate();
      },
      addRowTicket () {
        this.orderMainModel.jeecgOrderTicketList.push({});
        console.log(this.orderMainModel.jeecgOrderTicketList)
        this.$forceUpdate();
      },
      delRowTicket (index) {
        console.log(index)
        this.orderMainModel.jeecgOrderTicketList.splice(index,1);
        this.$forceUpdate();
      },

      dcmx(){
        window.location.href = `${window._CONFIG['domianURL']}/` + 'zbmx/zbmxSet/mxdc?id='+this.id
      },
    }
  }
</script>

<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }
  .ant-form-item-control {
    line-height: 0px;
  }
  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }
</style>