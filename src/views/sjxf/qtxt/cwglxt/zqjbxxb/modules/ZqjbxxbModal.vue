<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券代码">
          <a-input placeholder="请输入债券代码" v-decorator="['bondNo', validatorRules.bondNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易明细笔次">
          <a-input placeholder="请输入交易明细笔次" v-decorator="['txCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券名称">
          <a-input placeholder="请输入债券名称" v-decorator="['bondName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券简称">
          <a-input placeholder="请输入债券简称" v-decorator="['bondShortname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券发行方组织机构代码证号">
          <a-input placeholder="请输入债券发行方组织机构代码证号" v-decorator="['ctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划发行总额(元)">
          <a-input placeholder="请输入计划发行总额(元)" v-decorator="['planTotalAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际发行总额(元)">
          <a-input placeholder="请输入实际发行总额(元)" v-decorator="['actualTotalAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行价格(元/百元面值)">
          <a-input placeholder="请输入发行价格(元/百元面值)" v-decorator="['bondPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券发行方种类">
          <a-input placeholder="请输入债券发行方种类" v-decorator="['bondProperty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券子性质">
          <a-input placeholder="请输入债券子性质" v-decorator="['bondSubProperty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行日期">
          <a-input placeholder="请输入发行日期" v-decorator="['issueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行起息日期">
          <a-input placeholder="请输入发行起息日期" v-decorator="['fxQxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['mtrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率变动日期">
          <a-input placeholder="请输入利率变动日期" v-decorator="['bdDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券期限(月)">
          <a-input placeholder="请输入债券期限(月)" v-decorator="['bondTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率类型">
          <a-input placeholder="请输入利率类型" v-decorator="['rateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面利率(%)">
          <a-input placeholder="请输入票面利率(%)" v-decorator="['cpnRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="变动前票面利率">
          <a-input placeholder="请输入变动前票面利率" v-decorator="['lCpnRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付息方式">
          <a-input placeholder="请输入付息方式" v-decorator="['intstType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付息周期">
          <a-input placeholder="请输入付息周期" v-decorator="['intstPerd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提利息周期">
          <a-input placeholder="请输入计提利息周期" v-decorator="['intstCycle', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日利率计算方式">
          <a-input placeholder="请输入日利率计算方式" v-decorator="['dateRateNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提利息方式">
          <a-input placeholder="请输入计提利息方式" v-decorator="['jtType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提利息子方式">
          <a-input placeholder="请输入计提利息子方式" v-decorator="['subJtType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类结果">
          <a-input placeholder="请输入五级分类结果" v-decorator="['lvlFive', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券评级">
          <a-input placeholder="请输入债券评级" v-decorator="['bondRating', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评级机构">
          <a-input placeholder="请输入评级机构" v-decorator="['ratingAgency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['sts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次起息日期">
          <a-input placeholder="请输入上次起息日期" v-decorator="['lIcDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本次起息日期">
          <a-input placeholder="请输入本次起息日期" v-decorator="['icDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下次付息日期">
          <a-input placeholder="请输入下次付息日期" v-decorator="['fxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率变动周期">
          <a-input placeholder="请输入利率变动周期" v-decorator="['ratePerd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联社号">
          <a-input placeholder="请输入法人联社号" v-decorator="['upBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券发行方子类">
          <a-input placeholder="请输入债券发行方子类" v-decorator="['categoryType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券发行方名称">
          <a-input placeholder="请输入债券发行方名称" v-decorator="['issuerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="托管机构">
          <a-input placeholder="请输入托管机构" v-decorator="['trustee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "ZqjbxxbModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        bondNo:{rules: [{ required: true, message: '请输入债券代码!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/zqjbxxb/zqjbxxb/add",
          edit: "/zqjbxxb/zqjbxxb/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bondNo','txCnt','bondName','bondShortname','ctpyNo','planTotalAmt','actualTotalAmt','bondPrice','curNo','bondProperty','bondSubProperty','issueDate','fxQxDate','mtrDate','bdDate','bondTerm','rateType','cpnRate','lCpnRate','intstType','intstPerd','intstCycle','dateRateNum','jtType','subJtType','lvlFive','bondRating','ratingAgency','sts','lIcDate','icDate','fxDate','ratePerd','upBrNo','categoryType','issuerName','trustee','sDate','eDate','loadDate','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
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