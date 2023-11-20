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
          label="设备标识号">
          <a-input placeholder="请输入设备标识号" v-decorator="['devid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备类型:A-ATM;B-CDM;C-CRS;D-多媒体查询机;E-农民金融自助;P-间联POS;R-补登折机">
          <a-input placeholder="请输入设备类型:A-ATM;B-CDM;C-CRS;D-多媒体查询机;E-农民金融自助;P-间联POS;R-补登折机" v-decorator="['devtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备厂商编号">
          <a-input placeholder="请输入设备厂商编号" v-decorator="['devmanuid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备编号">
          <a-input placeholder="请输入设备编号" v-decorator="['devno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户号">
          <a-input placeholder="请输入商户号" v-decorator="['merchantno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="虚拟账户">
          <a-input placeholder="请输入虚拟账户" v-decorator="['virtualaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备IP地址">
          <a-input placeholder="请输入设备IP地址" v-decorator="['devip', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备所属地区">
          <a-input placeholder="请输入设备所属地区" v-decorator="['devcity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备所属分行">
          <a-input placeholder="请输入设备所属分行" v-decorator="['devzoneno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备所属网点">
          <a-input placeholder="请输入设备所属网点" v-decorator="['devbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备安放地址类型0-城市；1-农村">
          <a-input placeholder="请输入设备安放地址类型0-城市；1-农村" v-decorator="['devaddrtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备安放地址">
          <a-input placeholder="请输入设备安放地址" v-decorator="['devaddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备绑定电话">
          <a-input placeholder="请输入设备绑定电话" v-decorator="['devphone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备连接方式0-间联;1-直联">
          <a-input placeholder="请输入设备连接方式0-间联;1-直联" v-decorator="['devmode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备状态A-异常;0-启用;1-草稿;2-审批;3-停用;4-移机;5-报废;9-注销">
          <a-input placeholder="请输入设备状态A-异常;0-启用;1-草稿;2-审批;3-停用;4-移机;5-报废;9-注销" v-decorator="['devstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备签到状态0-签退;1-签到">
          <a-input placeholder="请输入设备签到状态0-签退;1-签到" v-decorator="['loginstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备安放类型10-离行式；1-在行式">
          <a-input placeholder="请输入设备安放类型10-离行式；1-在行式" v-decorator="['fixtype1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备安放类型20-穿墙式；1-大堂式">
          <a-input placeholder="请输入设备安放类型20-穿墙式；1-大堂式" v-decorator="['fixtype2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备单笔取款最大金额">
          <a-input placeholder="请输入设备单笔取款最大金额" v-decorator="['permaxamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备单天取款最大笔数">
          <a-input placeholder="请输入设备单天取款最大笔数" v-decorator="['daytotalcnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备单天取款最大金额">
          <a-input placeholder="请输入设备单天取款最大金额" v-decorator="['daytotalamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地区号">
          <a-input placeholder="请输入地区号" v-decorator="['cityno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备柜员所属机构号">
          <a-input placeholder="请输入设备柜员所属机构号" v-decorator="['brno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员号">
          <a-input placeholder="请输入柜员号" v-decorator="['tellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员号">
          <a-input placeholder="请输入授权柜员号" v-decorator="['authtellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出纳员">
          <a-input placeholder="请输入出纳员" v-decorator="['cashier', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="A岗负责人">
          <a-input placeholder="请输入A岗负责人" v-decorator="['person1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="A岗负责人手机号">
          <a-input placeholder="请输入A岗负责人手机号" v-decorator="['person1phone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="B岗负责人">
          <a-input placeholder="请输入B岗负责人" v-decorator="['person2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="B岗负责人手机号">
          <a-input placeholder="请输入B岗负责人手机号" v-decorator="['person2phone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人">
          <a-input placeholder="请输入负责人" v-decorator="['person3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人手机号">
          <a-input placeholder="请输入负责人手机号" v-decorator="['person3phone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建日期">
          <a-input placeholder="请输入创建日期" v-decorator="['crtdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正式运营时间">
          <a-input placeholder="请输入正式运营时间" v-decorator="['startdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建时间">
          <a-input placeholder="请输入创建时间" v-decorator="['crttime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建地区号">
          <a-input placeholder="请输入创建地区号" v-decorator="['crtcity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建网点号">
          <a-input placeholder="请输入创建网点号" v-decorator="['crtbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建柜员号">
          <a-input placeholder="请输入创建柜员号" v-decorator="['crttellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近操作日期">
          <a-input placeholder="请输入最近操作日期" v-decorator="['moddate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近操作时间">
          <a-input placeholder="请输入最近操作时间" v-decorator="['modtime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近操作地区号">
          <a-input placeholder="请输入最近操作地区号" v-decorator="['modcity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近操作网点号">
          <a-input placeholder="请输入最近操作网点号" v-decorator="['modbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近操作柜员号">
          <a-input placeholder="请输入最近操作柜员号" v-decorator="['modtellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代理行机构标识">
          <a-input placeholder="请输入代理行机构标识" v-decorator="['proxybrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="受理机构标识码">
          <a-input placeholder="请输入受理机构标识码" v-decorator="['sendbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送机构标识码">
          <a-input placeholder="请输入发送机构标识码" v-decorator="['sendclearbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省联社报备时间">
          <a-input placeholder="请输入省联社报备时间" v-decorator="['supervisedate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省联社批复时间">
          <a-input placeholder="请输入省联社批复时间" v-decorator="['approvedate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="安防验收时间">
          <a-input placeholder="请输入安防验收时间" v-decorator="['securedate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="监管部门报备时间">
          <a-input placeholder="请输入监管部门报备时间" v-decorator="['admindate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加密方式">
          <a-input placeholder="请输入加密方式" v-decorator="['encrypttype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主密钥更新标志0-未更新1-已更新">
          <a-input placeholder="请输入主密钥更新标志0-未更新1-已更新" v-decorator="['firstflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算方式0-按T+0清算1-按T+1清算">
          <a-input placeholder="请输入清算方式0-按T+0清算1-按T+1清算" v-decorator="['clearflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算行号">
          <a-input placeholder="请输入清算行号" v-decorator="['clearbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户开户机构">
          <a-input placeholder="请输入账户开户机构" v-decorator="['accbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户户名">
          <a-input placeholder="请输入账户户名" v-decorator="['acctname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绑定账户号">
          <a-input placeholder="请输入绑定账户号" v-decorator="['accno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备型号">
          <a-input placeholder="请输入设备型号" v-decorator="['devcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理员">
          <a-input placeholder="请输入管理员" v-decorator="['adminteller', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易批次号">
          <a-input placeholder="请输入交易批次号" v-decorator="['batchnum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['devmacaddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留1（核心绑定标识;0,无绑定;1,绑定)">
          <a-input placeholder="请输入预留1（核心绑定标识;0,无绑定;1,绑定)" v-decorator="['reserved1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留2">
          <a-input placeholder="请输入预留2" v-decorator="['reserved2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留3">
          <a-input placeholder="请输入预留3" v-decorator="['reserved3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后处理时间">
          <a-input placeholder="请输入最后处理时间" v-decorator="['lasttime', {}]" />
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
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "SbxxglbModal",
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
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/sbxxglb/sbxxglb/add",
          edit: "/sbxxglb/sbxxglb/edit",
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
          this.form.setFieldsValue(pick(this.model,'devid','devtype','devmanuid','devno','merchantno','virtualaccno','devip','devcity','devzoneno','devbrno','devaddrtype','devaddr','devphone','devmode','devstatus','loginstatus','fixtype1','fixtype2','permaxamt','daytotalcnt','daytotalamt','cityno','brno','tellerno','authtellerno','cashier','person1','person1phone','person2','person2phone','person3','person3phone','crtdate','startdate','crttime','crtcity','crtbrno','crttellerno','moddate','modtime','modcity','modbrno','modtellerno','proxybrno','sendbank','sendclearbank','supervisedate','approvedate','securedate','admindate','encrypttype','firstflag','clearflag','clearbrno','accbrno','acctname','accno','devcode','adminteller','batchnum','devmacaddr','remark','reserved1','reserved2','reserved3','lasttime','sDate','eDate','loadDate','legalNo','dtnum'))
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