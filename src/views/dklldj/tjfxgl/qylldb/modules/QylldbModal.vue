<template>
  <a-modal :title="title"
           :width="1800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-table bordered
                 ref="table"
                 size="middle"
                 :columns="DhdkmxTable.columns"
                 :dataSource="dataSource"
                 :pagination="false"
                 :loading="DhdkmxTable.loading"
                 :scroll="{ x: 2000 }">
          <span slot="khmc" slot-scope="text, record">
            <j-ellipsis :value="text" :length="6"/>
          </span>
          <span slot="xddkpz" slot-scope="text, record">
            <j-ellipsis :value="text" :length="6"/>
          </span>
          <a-empty v-if="showFlag"/>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { getAction, putAction } from '../../../../../api/manage'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'

  export default {
    name: "QylldbModal",
    components: { JEllipsis },
    data () {
      return {
        title:"操作",
        visible: false,
        showFlag: false,
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        dataSource: [],
        DhdkmxTable: {
          loading: false,
          columns: [
            {
              title: '统计月份',
              align: "center",
              dataIndex: 'tjyf',
              customRender:function (text) {
                return !text?"":(text.length>8?text.substr(0,7):text)
              },
              sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            },
            {
              title: '机构代码',
              align: "center",
              dataIndex: 'jgdm'
            },
            {
              title: '机构名称',
              align: "center",
              dataIndex: 'jgdm_dictText'
            },
            {
              title: '业务编号',
              align: "center",
              dataIndex: 'ywbh'
            },
            {
              title: '客户名称',
              align: "center",
              dataIndex: 'khmc',
              scopedSlots: { customRender: 'khmc' },
            },
            {
              title: '证件号码',
              align: "center",
              dataIndex: 'zjhm'
            },
            {
              title: '贷款账号',
              align: "center",
              dataIndex: 'dkzh'
            },
            {
              title: '便民卡卡号',
              align: "center",
              dataIndex: 'bmkh'
            },
            {
              title: '贷款金额',
              align: "center",
              dataIndex: 'dkje'
            },
            {
              title: '贷款余额',
              align: "center",
              dataIndex: 'dkye'
            },
            {
              title: '信贷贷款品种',
              align: "center",
              dataIndex: 'xddkpz_dictText',
              scopedSlots: { customRender: 'xddkpz' },
            },
            {
              title: '合同日期',
              align: "center",
              dataIndex: 'htrq',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
            },
            {
              title: '借款日期',
              align: "center",
              dataIndex: 'jkrq',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
            },
            {
              title: '到期日期',
              align: "center",
              dataIndex: 'dqrq',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
            },
          ],
        },
        url: {
          list: "/tjfxgl/qylldb/dhdkmx",
        },
      }
    },
    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm','zjhm','ywbh'))
		      // 时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
        });
        let params = this.model;
        if (params) {
          getAction(this.url.list, { tjyf: params.tjyf, jgdm: params.jgdm, zjhm: params.zjhm, ywbh: params.ywbh }).then((res) =>{
            if (res.success) {
              this.dataSource = res.result;
            }
          })
        }
        if (this.dataSource==null) {
          this.showFlag = true;
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     that.confirmLoading = true;
        //     let httpurl = '';
        //     let method = '';
        //     if(!this.model.id){
        //       httpurl+=this.url.add;
        //       method = 'post';
        //     }else{
        //       httpurl+=this.url.edit;
        //        method = 'put';
        //     }
        //     let formData = Object.assign(this.model, values);
        //     //时间格式化
        //     formData.tjyf = formData.tjyf?formData.tjyf.format():null;
        //     formData.htrq = formData.htrq?formData.htrq.format():null;
        //     formData.djnf = formData.djnf?formData.djnf.format():null;
        //
        //     console.log(formData)
        //     httpAction(httpurl,formData,method).then((res)=>{
        //       if(res.success){
        //         that.$message.success(res.message);
        //         that.$emit('ok');
        //       }else{
        //         that.$message.warning(res.message);
        //       }
        //     }).finally(() => {
        //       that.confirmLoading = false;
        //       that.close();
        //     })
        //   }
        // })
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>