<template>
  <a-modal :title="title"
           :width="1500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card>
          <a-divider style="font-size: 12pt;color: #398BF2">申请信息</a-divider>
          <a-row class="form-row" :gutter="24">
            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织机构">
                <a-input v-decorator="['zzbz', {}]" :disabled="true"/>
                <a-button @click="FindBack" type="primary" icon="plus">查找带回</a-button>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织名称">
                <a-input v-decorator="['zzbz_dictText', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="接收人工号">
                <a-input v-decorator="['yggh', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="接收人姓名">
                <a-input v-decorator="['yggh_dictText', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card>
          <a-divider style="font-size: 12pt;color: #398BF2">移交贷款客户信息</a-divider>
          <a-table bordered
                   ref="table"
                   size="small"
                   :columns="columns"
                   :pagination="ipagination"
                   :data-source="dataSource"
                   :loading="loading"
                   :row-selection="rowSelection"
                   @change="handleTableChange">
          </a-table>
        </a-card>
      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AccountInfo from '@/views/ywgl/ywl/ywltz/modules/AccountInfo'
import pick from 'lodash.pick'
import {getAction, httpAction, putAction} from "@/api/manage";

    export default {
        name: "TransferModal",
        components:{
          JeecgListMixin,AccountInfo
        },
      data() {
        return {
          title: '移交申请',
          visible: false,
          confirmLoading: false,
          model: {},
          dkzrr:'',
          dataSource: [],
          array:[],
          columns: [
            {
              title: '机构名称',
              align: 'center',
              dataIndex: 'jgdm_dictText',
              width: 120
            },
            {
              title: '客户名称',
              align: 'center',
              dataIndex: 'khmc',
              width: 100
            },
            {
              title: '证件号码',
              align: 'center',
              dataIndex: 'zjhm',
              width: 200
            },
            {
              title: '客户类型',
              align: 'center',
              dataIndex: 'khlx_dictText',
              width: 100
            },
            {
              title: '合同号',
              align: 'center',
              dataIndex: 'hth',
              width: 200
            },
            {
              title: '业务编号',
              align: 'center',
              dataIndex: 'ywbh',
              width: 200
            },
            {
              title: '贷款责任人工号',
              align: 'center',
              dataIndex: 'dkzrr',
              width: 100
            },
            {
              title: '贷款责任人姓名',
              align: 'center',
              dataIndex: 'dkzrr_dictText',
              width: 100
            },
          ],
          record: {
            zzbz: '',
            zzbz_dictText: '',
            yggh: '',
            yggh_dictText: '',
          },

          results: [],
          form: this.$form.createForm(this),
          url: {
            querybydkzrr: "/cldkhtsjgl/cldkhtsjgl/queryByDkzrr",
            preservation: "/dkdahtsjglbc/dkdahtsjglbc/preservation"
          },
          labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        }
      },
      computed:{
        rowSelection() {
          return {
            onChange: (selectedRowKeys, selectedRows) => {
              this.array = selectedRows;
              console.log(this.array)
            },
            getCheckboxProps: record => ({
              props: {
                //disabled: record.name === 'Disabled User', // Column configuration not to be checked
                //name: record.name,
              },
            }),
          };
        },
      },
      created () {

      },
      methods:{

        FindBack() {
          this.$refs.accountInfo.init()
        },
        colseWindow(args){
          this.record.zzbz = args.zzbz;
          this.record.zzbz_dictText = args.zzbz_dictText;
          this.record.yggh = args.yggh;
          this.record.yggh_dictText = args.yggh_dictText;
          this.model = Object.assign({}, this.record)
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'zzbz', 'zzbz_dictText', 'yggh', 'yggh_dictText'))  // loadsh的pick方法
          })
        },

        transferinit(dkzrr){
          getAction(this.url.querybydkzrr, {dkzrr:dkzrr}).then((res) => {
            this.dataSource = res.result;
          });
          this.visible = true;
        },

        close(){
          this.$emit('close');
          this.visible = false;
          this.form.resetFields();
        },

        handleCancel () {
          this.close()
        },

        handleOk(){
          if (this.array.length == 0){
            this.$message.warning("请选择认领人账号");
            return
          }
          let params = {
            array:this.array,
            zzbz:this.record.zzbz,
            dkzrr:this.record.yggh,
          };
          httpAction(this.url.preservation,params,'post').then((res)=>{
            if (res.success) {
              this.$message.success("认领成功！")
              this.close()
            }else{
              this.$message.warning("认领失败！")
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>