<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 主表单区域 -->
        <a-row >
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="请选择贷款客户">
              <a-select
                mode="multiple"
                style="width: 100%"
                placeholder="选择贷款客户"
                v-model="selectedUser"
                :disabled="checkDkkh"
                @dropdownVisibleChange="selectUserIds">
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <a-input :disabled="true"  placeholder="请输入机构代码" v-decorator="['jgdm', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input :disabled="true" placeholder="请输入客户名称"  v-decorator="['khmc', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input :disabled="true" placeholder="请输入证件号码" v-decorator="['zjhm', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款账号">
              <a-input :disabled="true" placeholder="请输入贷款账号"  v-decorator="['dkzh', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="便民卡卡号">
              <a-input :disabled="true" placeholder="请输入便民卡卡号"   v-decorator="['bmkkh', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款金额">
              <a-input :disabled="true" placeholder="请输入贷款金额"   v-decorator="['dkje', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款余额">
              <a-input :disabled="true" placeholder="请输入贷款余额"   v-decorator="['dkye', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款日期">
              <a-input
                :disabled="true"
                placeholder="请输入借款日期"
                style="width:100%"
                v-decorator="[ 'jkrq', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="到期日期">
              <a-input
                :disabled="true"
                placeholder="请输入到期日期"
                style="width:100%"
                v-decorator="[ 'dqrq', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 子表单区域 -->
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="客户信息" key="1">
            <div>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                <a-col :span="4">附件</a-col>
                <a-col :span="4">操作</a-col>
              </a-row>

              <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in orderMainModel.dkjkpt_dhjcbgfjxxList" :key="index">
                <a-col :span="4">
                  <a-form-item>
                    <JUploadOne
                      v-decorator="['dkjkpt_dhjcbgfjxxList['+index+'].fwlj', {'initialValue':item.fwlj},{rules: [{ required: true, message: '请上传附件!' }]}]"
                      text="上传附件"
                      class="upload-list-inline"
                      @change="imageUploadChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item>
                    <a-button @click="addRowCustom" icon="plus"></a-button>&nbsp;
                    <a-button @click="delRowCustom(index)" icon="minus"></a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>

      </a-form>
    </a-spin>
    <select-Dksjtzahtj-list-modal ref="SelectDksjtzahtjListModal" @choseUser="choseUser"></select-Dksjtzahtj-list-modal>
  </a-modal>
</template>

<script>
  import { httpAction,getAction,putAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import moment from "moment"
  import DateSelect from '@/components/jeecg/DateSelect'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import SelectDksjtzahtjListModal from "./SelectDksjtzahtjListModal";

  export default {
    name: "JeecgOrderMainModal",
    components: {
      JDate,DateSelect,JUploadOne,AFormItem,moment,SelectDksjtzahtjListModal
    },
    data () {
      return {
        title:"操作",
        visible: false,
        checkDkkh: false,
        orderMainModel: {dkjkpt_dhjcbgfjxxList: [{}], },
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
        indexValue:'',
        imagePaths:'',
        url: {
          add: "/DkjkptDhgzfjxx/dkjkptDhgzfjxx/add",
          edit: "/DkjkptDhgzfjxx/dkjkptDhgzfjxx/edit",
          fjxxList: "/DkjkptDhgzfjxx/dkjkptDhgzfjxx/selectByDkzh",
        },
        selectedUser:[],
        responseValues:[],
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      selectUserIds() {
        this.$refs.SelectDksjtzahtjListModal.add(this.selectedUser,this.userIds);
      },
      // 子modal回调
      choseUser:function(userList){
        this.form.setFieldsValue({
          jgdm:userList[0].jgdm,
          zjhm:userList[0].zjhm,
          khmc:userList[0].khmc,
          dkzh:userList[0].dkzh,
          bmkkh:userList[0].bmkkh,
          dkje:userList[0].dkje,
          dkye:userList[0].dkye,
          jkrq:userList[0].jkrq,
          dqrq:userList[0].dqrq,
        })
        console.log(userList)
        this.selectedUser = [];
        this.userIds = [];
        for(var i=0;i<userList.length;i++){
          this.selectedUser.push(userList[i].khmc);
          this.userIds += userList[i].zjhm+","
        }
      },
      edit (record) {

        if(record.zjhm){
          this.checkDkkh=true
        }else{
          this.checkDkkh=false
        }
        this.form.resetFields();
        this.orderMainModel = Object.assign({}, record);
        this.orderMainModel.dkjkpt_dhjcbgfjxxList = [{}];
        //--------------------------------------------------------
        //初始化明细表数据
        console.log(this.orderMainModel)
        let zh=this.orderMainModel.dkzh;


        if(zh){
          var myDate = new Date;
          var year = myDate.getFullYear();//获取当前年
          /*alert(this.orderMainModel.dzkh)
          alert(zh)*/
          let params = {"dkzh":zh}
          putAction(this.url.fjxxList,params).then((res)=>{
            if(res.success){
              var jsonObj=res.result;
              for (var i = 0; i < jsonObj.length; i++) {
                jsonObj[i].fjnf=jsonObj[i].fjnf?jsonObj[i].fjnf.substr(0,4):year;
              }
              this.orderMainModel.dkjkpt_dhjcbgfjxxList = jsonObj;
              this.responseValues = jsonObj;
              this.$forceUpdate()
            }
          })

        }
        //--------------------------------------------------------
        this.visible = true;
        console.log(this.orderMainModel)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.orderMainModel,'zjhm','jgdm','khmc','dzkh','bmkkh','dkje','dkye','dqrq','jkrq',"dkxt"))
        });

      },
      close () {
        this.selectedUser=[];
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
            if(!this.orderMainModel.zjhm){
              httpurl+=this.url.add;
              method = 'put';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }

            let zzh=this.orderMainModel.dkzh;
            let orderMainData = Object.assign(this.orderMainModel, values);
            orderMainData.dkzh=zzh;
            console.log(values)
            //时间格式化
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var jsonObj=orderMainData.dkjkpt_dhjcbgfjxxList;
            for (var i = 0; i < jsonObj.length; i++) {
              jsonObj[i].fjnf=jsonObj[i].fjnf?jsonObj[i].fjnf+'-01-01':year+'-01-01';
              jsonObj[i].fwlj=jsonObj[i].fwlj?jsonObj[i].fwlj.path?jsonObj[i].fwlj.path:jsonObj[i].fwlj:'';

            }
            let formData = {
              ...orderMainData,
              dkjkptDhgzfjxxList: orderMainData.dkjkpt_dhjcbgfjxxList,
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
        this.orderMainModel.dkjkpt_dhjcbgfjxxList.push({});
        this.$forceUpdate();
      },
      delRowCustom (index) {
        console.log(index)
        this.orderMainModel.dkjkpt_dhjcbgfjxxList.splice(index,1);
        this.$forceUpdate();
      },
      imageUploadChange(data) {
        let path = data.path
        console.log(path)
        /*let deletePath = data.deletePath
        let paths = path.split(',');
        console.log("path")
        console.log(path)
        console.log(paths)
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            /!*let image = this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })*!/
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
           /!* if(this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 1;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxImage.push(fjxx)
            }*!/
          }

        })*/
      },
      setValue(val){
        console.log(val)
      }

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