<template>
  <a-card class="card" :bordered="false">

    <a-list-item class="DefaultListItem" term="房地产信息">房地产信息</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地（处）：">
          <a-input  v-decorator="['nyesr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总面积（平米）：">
          <a-input  v-decorator="['nzyywcb', {}]"/>
        </a-form-item>
      </a-col>
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单价（万元）：">
          <a-input  v-decorator="['ngz', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="价值（万元）：">
          <a-input  v-decorator="['nyesr', {}]"/>
        </a-form-item>
      </a-col>

    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公（处）：">
          <a-input  v-decorator="['njnsds', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总面积（平米）：">
          <a-input  v-decorator="['njszzs', {}]"/>
        </a-form-item>
      </a-col>
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单价（万元）：">
          <a-input  v-decorator="['nzyjlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="价值（万元）：">
          <a-input  v-decorator="['njnsds', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拥有方式：">
          <a-select placeholder="请选择" v-decorator="['ctype',{}]">
            <a-select-option value="1">租赁</a-select-option>
            <a-select-option value="2">自有</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="流动资产">流动资产</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收账款（2年以内万元）：">
          <a-input  v-decorator="['khnl', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预付账款（万元）：">
          <a-input  v-decorator="['qtzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存货名称：">
          <a-input  v-decorator="['qtzc', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存货价值（万元）：">
          <a-input  v-decorator="['khnl', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="固定资产">固定资产</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机器设备名称：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机器设备数量：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备价值（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="厂房位置：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="厂房面积（平米）：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="厂房价值（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="其他资产">其他资产</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他资产名称：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他资产价值（万元）：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="亩数：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="总资产合计">总资产合计</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">

      </a-col>

      <a-col :lg="8">

      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总资产合计（万元）：：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="其他资产">其他资产</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车辆（辆）：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="品牌：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车型/车牌号：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买时间（最新）："
          hasFeedback >
          <a-date-picker v-decorator="[ 'qdsj', {}]" />
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车辆总价值（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-list-item class="DefaultListItem" term="企业负债情况">企业负债情况</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行借款（万元）：">
          <a-input  v-decorator="['zsr', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应付账款（万元）：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预收账款（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他借款（万元）："
          hasFeedback >
          <a-date-picker v-decorator="[ 'qdsj', {}]" />
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="或有负债（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="总负债合计">总负债合计</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">

      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总负债合计（万元）：">
          <a-input  v-decorator="['zzc', {}]"/>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产负债率：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-list-item class="DefaultListItem" term="净资产">净资产</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">

      </a-col>

      <a-col :lg="8">

      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="净资产（万元）：">
          <a-input  v-decorator="['jlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>




  </a-card>

</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: 'Zcfzqk',
    data () {
      return {
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
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
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','qybh','dabh','qymc','zjhm','lxfs','dz','jyxm','jynx','zgrs','qygm','hyfl','khzycd','ywhywwlqk','qzyw','gjrxx','csxx','jyqk','zcfzqk','jrywqk','yxqk','fjxx'))
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
<style scoped>
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>