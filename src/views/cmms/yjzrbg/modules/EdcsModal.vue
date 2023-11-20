<template>
  <a-modal :title="title"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="true"
           :maskClosable="false"
           :destroyOnClose="true"
           :closable="true"
           @cancel="handleCancel"
           @ok="handleOk"
           width="40%">
    <a-spin :spinning="confirmLoading">

      <div style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px">
        <a-radio-group v-model="selectType" :options="options"/>
      </div>

      <table v-if="selectType == '2'">
        <tr>
          <td colspan="4" style="background-color: #B52D4F;color: white;font-size: 20px;">非城区</td>
        </tr>
        <tr>
          <th colspan="4" style="background-color: white;color: black;font-size: 20px;">收入佐证方式</th>
        </tr>

        <tr class="trys">
          <td>年收入</td>
          <td> <a-input-number v-model="model2.nsr" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>

        <tr>
          <td>已有融资总额</td>
          <td> <a-input-number v-model="model2.yyrzze" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>

        <tr class="trys">
          <td>收入测算额度</td>
          <td> {{srcsed2}}</td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>

        <tr>
          <th colspan="4" style="background-color: white;color: black;font-size: 20px;">资产佐证方式</th>
        </tr>

        <tr class="trys">
          <td>可计资产价值</td>
          <td> <a-input-number v-model="model2.kjzcjz" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr>
          <td>已有融资总额</td>
          <td> <a-input-number v-model="model2.yyrzzezc" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="zdjs trys">
          <td>资产测算额度</td>
          <td> {{xydked2}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>
        <tr class=" zdjs">
          <td>最终额度</td>
          <td> {{hzed2}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>

      </table>

      <table v-if="selectType == '1'">
        <tr>
          <td colspan="4" style="background-color: #B52D4F;color: white;font-size: 20px;">城区</td>
        </tr>
        <tr>
          <th colspan="4" style="background-color: white;color: black;font-size: 20px;">收入佐证方式</th>
        </tr>

<!--        <tr>-->
<!--          <td>月</td>-->
<!--          <td>-->
<!--            <a-input-number v-model="model.month" :min="1" :max="12"></a-input-number>-->
<!--          </td>-->
<!--          <td>(月)</td>-->
<!--          <td>默认12个月</td>-->
<!--        </tr>-->

        <tr class="trys">
          <td>个人月缴存额</td>
          <td> <a-input-number v-model="model.gryjce" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>


        <tr>
          <td>单位月缴存额</td>
          <td> <a-input-number v-model="model.dwyjce" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>

        <tr class="trys">
          <td>个人缴存比例</td>
          <td> <a-input-number v-model="model.grjcbl" :min="0" :max="100"></a-input-number> </td>
          <td>(%)</td>
          <td>默认12%</td>
        </tr>
        <tr>
          <td>单位缴存比例</td>
          <td> <a-input-number v-model="model.dwjcbl" :min="0" :max="100"></a-input-number> </td>
          <td>(%)</td>
          <td>默认12%</td>
        </tr>
        <tr class="trys zdjs">
          <td>年收入</td>
          <td> {{nsr}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>
        <tr>
          <td>公积金</td>
          <td> <a-input-number v-model="model.gjj" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="trys">
          <td>社保</td>
          <td> <a-input-number v-model="model.sb" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr>
          <td>医保</td>
          <td> <a-input-number v-model="model.yb" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="trys">
          <td>已有融资总额</td>
          <td> <a-input-number v-model="model.yyrzze" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="zdjs">
          <td>收入测算额度</td>
          <td> {{srcsed}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>


        <tr>
          <th colspan="4" style="background-color: white;color: black;font-size: 20px;">资产佐证方式</th>
        </tr>

        <tr>
          <td>可计资产价值</td>
          <td> <a-input-number v-model="model.kjzcjz" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="trys">
          <td>已有融资总额</td>
          <td> <a-input-number v-model="model.yyrzzezc" :min="0"></a-input-number> </td>
          <td>(元)</td>
          <td>手工输入</td>
        </tr>
        <tr class="zdjs">
          <td>资产测算额度</td>
          <td> {{xydked}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>
        <tr class="trys zdjs">
          <td>最终额度</td>
          <td> {{hzed}} </td>
          <td>(元)</td>
          <td>自动计算</td>
        </tr>
      </table>

    </a-spin>
  </a-modal>
</template>

<script>
import {getAction, httpAction} from '@/api/manage'
import pick from 'lodash.pick'
import JDictSelectTag from '@comp/dict/JDictSelectTag'
export default {
  name: 'EdcsModal',
  components:{
    JDictSelectTag
  },
  computed:{
    nsr(){
      if (this.model.grjcbl+this.model.dwjcbl === 0){
        this.model.nsr = 0;
        return 0;
      }
      let nsr = 12* (this.model.gryjce + this.model.dwyjce) / (this.model.grjcbl+this.model.dwjcbl) * 100;
      nsr = Math.round(nsr);
      this.model.nsr = nsr;
      return nsr;
    },
    srcsed(){
      if (this.model.grjcbl+this.model.dwjcbl === 0){
        return 0;
      }

      let sr = (12* (this.model.gryjce + this.model.dwyjce) / (this.model.grjcbl+this.model.dwjcbl) * 100)*3 + this.model.gjj +this.model.sb+this.model.yb-this.model.yyrzze;
      sr = Math.round(sr);
      this.model.xydked = sr;
      return sr;
    },
    xydked(){
      let ed = this.model.kjzcjz /3 - this.model.yyrzzezc;
      ed = Math.round(ed);
      ed = ed < 0 ? 0 : ed;
      this.model.xyed = ed;
      return ed;
    },
    hzed(){
      let hz =  Math.round((this.model.xydked + this.model.xyed)/1000) * 1000;
      let hzed = hz >= 500000 ? 500000 : hz;
      //hzed = Math.round(hzed);
      this.model.hzed=hzed;
      return hzed;
    },

    srcsed2(){
      let sr = this.model2.nsr * 1.5  -  this.model2.yyrzze;
      sr = Math.round(sr);
      sr = sr < 0 ? 0 : sr;
      this.model2.xydked = sr;
      return sr;
    },

    xydked2(){
      let ed = this.model2.kjzcjz /3 - this.model2.yyrzzezc;
      ed = Math.round(ed);
      ed = ed < 0 ? 0 : ed;
      this.model2.xyed = ed;
      return ed;
    },

    hzed2(){
      let hz =  Math.round((this.model2.xydked + this.model2.xyed)/1000) * 1000;
      console.log(hz)
      this.model2.hzed=hz;
      return hz;
    },
  },
  data(){
    return {
      title:'额度测算（只保存一个结果）',
      visible:false,
      confirmLoading: false,
      model:{},
      model2:{},
      options:[
        { label: '城区', value: '1' },
        { label: '非城区', value: '2' }
      ],
      labelCol: {
        span:8
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      validatorRules: {
        type: { rules: [{ required: true, message: '请选择地域!' }] },
      },
      url: {
        add: "/yjzrbg/edcs/add",
        edit: "/yjzrbg/edcs/edit",
      },
      selectType:''
    }
  },
  methods:{
    initModel(record){
      if (record.gryjce == undefined ||record.gryjce == null || record.type == '2'){
        record.gryjce = 0;
      }
      if (record.dwyjce == undefined ||record.dwyjce == null || record.type == '2'){
        record.dwyjce = 0;
      }
      if (record.grjcbl == undefined ||record.grjcbl == null || record.type == '2'){
        record.grjcbl = 12;
      }
      if (record.dwjcbl == undefined ||record.dwjcbl == null || record.type == '2'){
        record.dwjcbl =12;
      }

      if (record.gjj == undefined ||record.gjj == null || record.type == '2'){
        record.gjj = 0;
      }
      if (record.sb == undefined ||record.sb == null || record.type == '2'){
        record.sb = 0;
      }
      if (record.yb == undefined ||record.yb == null || record.type == '2'){
        record.yb = 0;
      }
      if (record.yyrzze == undefined ||record.yyrzze == null || record.type == '2'){
        record.yyrzze = 0;
      }
      if (record.xydked == undefined ||record.xydked == null || record.type == '2'){
        record.xydked = 0;
      }

      if (record.kjzcjz == undefined ||record.kjzcjz == null || record.type == '2'){
        record.kjzcjz = 0;
      }
      if (record.yyrzzezc == undefined ||record.yyrzzezc == null || record.type == '2'){
        record.yyrzzezc = 0;
      }
      if (record.xyed == undefined ||record.xyed == null || record.type == '2'){
        record.xyed = 0;
      }
      if (record.hzed == undefined ||record.hzed == null || record.type == '2'){
        record.hzed = 0;
      }
      this.model = Object.assign({}, record);
    },
    initModel2(record){
      if (record.nsr == undefined ||record.nsr == null || record.type == '1'){
        record.nsr = 0;
      }
      if (record.yyrzze == undefined ||record.yyrzze == null || record.type == '1'){
        record.yyrzze = 0;
      }
      if (record.xydked == undefined ||record.xydked == null || record.type == '1'){
        record.xydked = 0;
      }

      if (record.kjzcjz == undefined ||record.kjzcjz == null || record.type == '1'){
        record.kjzcjz = 0;
      }
      if (record.yyrzzezc == undefined ||record.yyrzzezc == null || record.type == '1'){
        record.yyrzzezc = 0;
      }
      if (record.xyed == undefined ||record.xyed == null || record.type == '1'){
        record.xyed = 0;
      }
      if (record.hzed == undefined ||record.hzed == null || record.type == '1'){
        record.hzed = 0;
      }
      this.model2 = Object.assign({}, record);
    },
    edit (record) {

      getAction("/yjzrbg/edcs/queryByZjhm",{zjhm:record.zjhm}).then(res=>{
        if (res.success){
          let result = res.result;
          var data = JSON.parse(JSON.stringify(res.result))
          var data2 = JSON.parse(JSON.stringify(res.result))

          if (data == null || data.type == undefined ||data.type == null){
            this.selectType = '1'
            data = {zjhm:record.zjhm}
            data2 = {zjhm:record.zjhm}
          }else {
            if (data.type == '1'){
              this.selectType = '1'
            }else {
              this.selectType = '2'
            }
          }
          this.initModel(data)
          this.initModel2(data2)
        }
      })
      this.visible = true;
    },
    changeTag(e){
      this.model.type=e
      console.log(this.model)
    },
    loadData(){
      getAction("",{zjhm:this.model.zjhm}).then(res=>{
        if (res.success){

        }
      })
    },

    handleOk () {
      const that = this;
      // 触发表单验证
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
          let formData = {  };
          if (that.selectType == '1'){
            that.model.type = '1'
            formData = Object.assign(that.model);
          }else if (that.selectType == '2'){
            that.model2.type = '2'
            formData = Object.assign(that.model2);
          }
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


    },

    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close');
      this.visible = false;
    },
  }
}
</script>

<style scoped>
  .inputNum{
    width: 180px;
  }

  table,
  table tr th,
  table tr td {
    border: 1px solid #F2F2F2;
    height: 35px;
  }
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    background-color: #FFFFFF;
    table-layout: fixed;
    font-weight: 700;
  }
  .trys{
    background-color: #F7E1D7;
  }
  .zdjs{
    font-size: 18px;
  }
</style>