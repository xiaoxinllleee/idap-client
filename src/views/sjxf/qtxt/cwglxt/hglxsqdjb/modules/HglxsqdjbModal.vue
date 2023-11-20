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
          label="审批编号">
          <a-input placeholder="请输入审批编号" v-decorator="['appNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押物笔数">
          <a-input placeholder="请输入质押物笔数" v-decorator="['pledgeCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手编号">
          <a-input placeholder="请输入交易对手编号" v-decorator="['ctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手版本号">
          <a-input placeholder="请输入交易对手版本号" v-decorator="['version', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手方名称">
          <a-input placeholder="请输入交易对手方名称" v-decorator="['ctpyName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易类型">
          <a-input placeholder="请输入交易类型" v-decorator="['tradeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购期限(天)">
          <a-input placeholder="请输入回购期限(天)" v-decorator="['dCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算方式">
          <a-input placeholder="请输入清算方式" v-decorator="['qsSpeed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购利率(%)">
          <a-input placeholder="请输入回购利率(%)" v-decorator="['repRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次结算方式">
          <a-input placeholder="请输入首次结算方式" v-decorator="['firstSetrType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期结算方式">
          <a-input placeholder="请输入到期结算方式" v-decorator="['mtrSetrType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次结算日">
          <a-input placeholder="请输入首次结算日" v-decorator="['firstDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期结算日">
          <a-input placeholder="请输入到期结算日" v-decorator="['mrtDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押物面值合计(万元)">
          <a-input placeholder="请输入质押物面值合计(万元)" v-decorator="['pledgeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算金额(万元)">
          <a-input placeholder="请输入结算金额(万元)" v-decorator="['settlAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请回购利率(%)">
          <a-input placeholder="请输入申请回购利率(%)" v-decorator="['repRate0', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第1个审批岗位审批回购利率">
          <a-input placeholder="请输入第1个审批岗位审批回购利率" v-decorator="['repRate1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第2个审批岗位审批回购利率">
          <a-input placeholder="请输入第2个审批岗位审批回购利率" v-decorator="['repRate2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第3个审批岗位审批回购利率">
          <a-input placeholder="请输入第3个审批岗位审批回购利率" v-decorator="['repRate3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第4个审批岗位审批回购利率">
          <a-input placeholder="请输入第4个审批岗位审批回购利率" v-decorator="['repRate4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第5个审批岗位审批回购利率">
          <a-input placeholder="请输入第5个审批岗位审批回购利率" v-decorator="['repRate5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第6个审批岗位审批回购利率">
          <a-input placeholder="请输入第6个审批岗位审批回购利率" v-decorator="['repRate6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第7个审批岗位审批回购利率">
          <a-input placeholder="请输入第7个审批岗位审批回购利率" v-decorator="['repRate7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第8个审批岗位审批回购利率">
          <a-input placeholder="请输入第8个审批岗位审批回购利率" v-decorator="['repRate8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第9个审批岗位审批回购利率">
          <a-input placeholder="请输入第9个审批岗位审批回购利率" v-decorator="['repRate9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第10个审批岗位审批回购利率">
          <a-input placeholder="请输入第10个审批岗位审批回购利率" v-decorator="['repRate10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第11个审批岗位审批回购利率">
          <a-input placeholder="请输入第11个审批岗位审批回购利率" v-decorator="['repRate11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第12个审批岗位审批回购利率">
          <a-input placeholder="请输入第12个审批岗位审批回购利率" v-decorator="['repRate12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第13个审批岗位审批回购利率">
          <a-input placeholder="请输入第13个审批岗位审批回购利率" v-decorator="['repRate13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第14个审批岗位审批回购利率">
          <a-input placeholder="请输入第14个审批岗位审批回购利率" v-decorator="['repRate14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第15个审批岗位审批回购利率">
          <a-input placeholder="请输入第15个审批岗位审批回购利率" v-decorator="['repRate15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第16个审批岗位审批回购利率">
          <a-input placeholder="请输入第16个审批岗位审批回购利率" v-decorator="['repRate16', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第17个审批岗位审批回购利率">
          <a-input placeholder="请输入第17个审批岗位审批回购利率" v-decorator="['repRate17', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第18个审批岗位审批回购利率">
          <a-input placeholder="请输入第18个审批岗位审批回购利率" v-decorator="['repRate18', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第19个审批岗位审批回购利率">
          <a-input placeholder="请输入第19个审批岗位审批回购利率" v-decorator="['repRate19', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第20个审批岗位审批回购利率">
          <a-input placeholder="请输入第20个审批岗位审批回购利率" v-decorator="['repRate20', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属部门">
          <a-input placeholder="请输入所属部门" v-decorator="['depNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购成交单编号">
          <a-input placeholder="请输入回购成交单编号" v-decorator="['pactNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期结算申请编号">
          <a-input placeholder="请输入到期结算申请编号" v-decorator="['dappNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属账务机构">
          <a-input placeholder="请输入所属账务机构" v-decorator="['brNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请操作员">
          <a-input placeholder="请输入申请操作员" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方编号">
          <a-input placeholder="请输入本方编号" v-decorator="['bctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方版本号">
          <a-input placeholder="请输入本方版本号" v-decorator="['bversion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方名称">
          <a-input placeholder="请输入本方名称" v-decorator="['bctpyName', {}]" />
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
          label="询价情况">
          <a-input placeholder="请输入询价情况" v-decorator="['brf', {}]" />
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
          label="ctpyDepNo">
          <a-input placeholder="请输入ctpyDepNo" v-decorator="['ctpyDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bctpyDepNo">
          <a-input placeholder="请输入bctpyDepNo" v-decorator="['bctpyDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sDate">
          <a-input placeholder="请输入sDate" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eDate">
          <a-input placeholder="请输入eDate" v-decorator="['eDate', {}]" />
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
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "HglxsqdjbModal",
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
        },
        url: {
          add: "/hglxsqdjb/hglxsqdjb/add",
          edit: "/hglxsqdjb/hglxsqdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'appNo','pledgeCnt','ctpyNo','version','ctpyName','tradeType','dCnt','qsSpeed','repRate','firstSetrType','mtrSetrType','firstDate','mrtDate','pledgeAmt','settlAmt','repRate0','repRate1','repRate2','repRate3','repRate4','repRate5','repRate6','repRate7','repRate8','repRate9','repRate10','repRate11','repRate12','repRate13','repRate14','repRate15','repRate16','repRate17','repRate18','repRate19','repRate20','depNo','pactNo','dappNo','brNo','tel','bctpyNo','bversion','bctpyName','upBrNo','brf','curNo','ctpyDepNo','bctpyDepNo','sDate','eDate','loadDate','legalNo'))
		  //时间格式化
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