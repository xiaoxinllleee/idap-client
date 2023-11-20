<template>
  <a-modal :title="title"
           width="100%"
           wrapClassName="full-modal"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据日期">
              <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate ]" disabled :size='size' style='width: 100%' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="业务机构">
              <a-input placeholder='业务机构' v-decorator="['jgdm_dictText', validatorRules.jgdm ]" disabled :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统计时间">
              <a-input v-decorator="[ 'tjsj', {}]" disabled :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
          </a-col>
        </a-row>

        <a-divider orientation="left" style="height: 2px;">资金来源</a-divider>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="上年末存款日平余额（本外币）">
              <a-input type='number' placeholder="上年末存款日平余额（本外币）" v-decorator="['snmCkrpyeBwb', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="期末存款日平余额（含本外币）">
              <a-input type='number' placeholder="期末存款日平余额（含本外币）" v-decorator="['qmCkrpHbwb', {}]" :size='size' />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="height: 2px;">资金运用</a-divider>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="上年末贷款日平余额（不含卡）">
              <a-input type='number' placeholder="上年末贷款日平余额（不含卡）" v-decorator="['snmDkrpye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="上年末信用卡月均余额">
              <a-input type='number' placeholder="上年末信用卡月均余额" v-decorator="['snmXykYjye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="上年末贷款余额（含贷记卡）">
              <a-input type='number' placeholder="上年末贷款余额（含贷记卡）" v-decorator="['snmDkye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="期末贷款余额（含贷记卡）">
              <a-input type='number' placeholder="期末贷款余额（含贷记卡）" v-decorator="['qmDkye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="期末信用卡月均余额">
              <a-input type='number' placeholder="期末信用卡月均余额" v-decorator="['qmXykYjye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="期末贷款日平余额（不含贷记卡、转贴）">
              <a-input type='number' placeholder="期末贷款日平余额（不含贷记卡、转贴）" v-decorator="['qmDkrpye', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="期末日平现金余额">
              <a-input type='number' placeholder="期末日平现金余额" v-decorator="['qmRpXjye', {}]" :size='size' />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="height: 2px;"></a-divider>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款准备金">
              <a-input type='number' placeholder="存款准备金" v-decorator="['ckzbj', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="日均富余或占用（+，-）">
              <a-input type='number' placeholder="日均富余或占用（+，-）" v-decorator="['rjFyhzy', {}]" :size='size' />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item :labelCol="labelCol_1" :wrapperCol="wrapperCol_1" label="存贷款日均比例(%)">
              <a-input type='number' placeholder="存贷款日均比例(%)" v-decorator="['cdkrjbl', {}]" :size='size' />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="height: 2px;">各项收入</a-divider>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末6011科目贷款利息收入（不含税）">
          <a-input placeholder="请输入期末6011科目贷款利息收入（不含税）" v-decorator="['qmKm6011Dklxsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末税后日平贷款收息率(%)">
          <a-input placeholder="请输入期末税后日平贷款收息率(%)" v-decorator="['qmShrpDksxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中：期末6011科目免增值税贷款利息收入（分摊）">
          <a-input placeholder="请输入其中：期末6011科目免增值税贷款利息收入（分摊）" v-decorator="['qmMzzsDklxsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6012科目往来收入">
          <a-input placeholder="请输入6012科目往来收入" v-decorator="['km6012Wlsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6111科目富余资金计收">
          <a-input placeholder="请输入6111科目富余资金计收" v-decorator="['km6111Fyzjjs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6111科目占用资金计付">
          <a-input placeholder="请输入6111科目占用资金计付" v-decorator="['km6111Zyzjjf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6021科目支行报表手续费收入(不含税）">
          <a-input placeholder="请输入6021科目支行报表手续费收入(不含税）" v-decorator="['km6021Zhbbsxfsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6021科目总部分摊手续费收入(不含税）">
          <a-input placeholder="请输入6021科目总部分摊手续费收入(不含税）" v-decorator="['km6021Zbftsxfsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6051其他业务收入科目">
          <a-input placeholder="请输入6051其他业务收入科目" v-decorator="['km6501Qtywsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6061汇兑损益">
          <a-input placeholder="请输入6061汇兑损益" v-decorator="['km6061Hdsy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6101公允价值变动损益">
          <a-input placeholder="请输入6101公允价值变动损益" v-decorator="['km6101Gyjzbdsy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6301营业外收入科目">
          <a-input placeholder="请输入6301营业外收入科目" v-decorator="['km6301Yywsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="各项收入合计">
          <a-input placeholder="请输入各项收入合计" v-decorator="['gxsrhj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="增值税金">
          <a-input placeholder="请输入增值税金" v-decorator="['zzsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6403城建税及附加">
          <a-input placeholder="请输入6403城建税及附加" v-decorator="['km6403Cjsjfj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6403其他税金">
          <a-input placeholder="请输入6403其他税金" v-decorator="['km6403Qtsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6411科目期末利息支出">
          <a-input placeholder="请输入6411科目期末利息支出" v-decorator="['qmKm6411Lxzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末日平存款付息率(%)">
          <a-input placeholder="请输入期末日平存款付息率(%)" v-decorator="['qmRpckFxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6412科目金融机构往来支出">
          <a-input placeholder="请输入6412科目金融机构往来支出" v-decorator="['km6412JrjgWlsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6421科目支行报表手续费支出">
          <a-input placeholder="请输入6421科目支行报表手续费支出" v-decorator="['km6421ZhbbSxfzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6421科目总部分摊手续费支出">
          <a-input placeholder="请输入6421科目总部分摊手续费支出" v-decorator="['km6421ZbftSxfzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6601科目支行费用台账计算">
          <a-input placeholder="请输入6601科目支行费用台账计算" v-decorator="['km6601Zhfytzjs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6602科目支行其他业务分摊支出">
          <a-input placeholder="请输入6602科目支行其他业务分摊支出" v-decorator="['km6602Zhqtywftzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6711科目营业外支出">
          <a-input placeholder="请输入6711科目营业外支出" v-decorator="['km6711Yywzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产减值损失(6701及6702科目不计算分摊到支行)">
          <a-input placeholder="请输入资产减值损失(6701及6702科目不计算分摊到支行)" v-decorator="['zcjzss', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="各项支出合计">
          <a-input placeholder="请输入各项支出合计" v-decorator="['gxzchj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上年末贷款应收利息（含贷记卡）">
          <a-input placeholder="请输入上年末贷款应收利息（含贷记卡）" v-decorator="['snmDkyslx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末贷款应收利息（含贷记卡）">
          <a-input placeholder="请输入期末贷款应收利息（含贷记卡）" v-decorator="['qmDkyslx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报批费用、装饰、维修和购置(20万元以上部分）">
          <a-input placeholder="请输入报批费用、装饰、维修和购置(20万元以上部分）" v-decorator="['dxbbfy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营利润">
          <a-input placeholder="请输入经营利润" v-decorator="['jylr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当年经营利润任务">
          <a-input placeholder="请输入当年经营利润任务" v-decorator="['dnJylrrw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务完成率(%)">
          <a-input placeholder="请输入任务完成率(%)" v-decorator="['rwwcl', {}]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作类型">-->
<!--          <a-input placeholder="请输入操作类型" v-decorator="['oprationType', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作员">-->
<!--          <a-input placeholder="请输入操作员" v-decorator="['operator', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作时间">-->
<!--          <a-date-picker v-decorator="[ 'oprationTime', {}]" />-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'

  export default {
    name: "JylrhsJylrhzModal",
    components: { JTreeSelect },
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

        labelCol_1: {
          xs: { span: 24 },
          sm: { span: 11 },
        },
        wrapperCol_1: {
          xs: { span: 24 },
          sm: { span: 10 },
        },

        size: 'small',
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          fiscalDate: { rules: [{ required: true, message: '数据日期为空!' }] },
          jgdm: { rules: [{ required: true, message: '业务机构为空!' }] }
        },
        url: {
          add: "/jylrhs/jylrsj/jylrhz/add",
          edit: "/jylrhs/jylrsj/jylrhz/edit",
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
          this.form.setFieldsValue(pick(this.model,
            'fiscalDate', 'jgdm_dictText',
            'snmCkrpyeBwb','qmCkrpHbwb','snmDkrpye','snmXykYjye','snmDkye','qmDkye','qmXykYjye','qmDkrpye','qmRpXjye','ckzbj','rjFyhzy','cdkrjbl',
            'qmKm6011Dklxsr','qmShrpDksxl','qmMzzsDklxsr','km6012Wlsr','km6111Fyzjjs','km6111Zyzjjf','km6021Zhbbsxfsr','km6021Zbftsxfsr','km6501Qtywsr','km6061Hdsy','km6101Gyjzbdsy','km6301Yywsr','gxsrhj',
            'zzsj','km6403Cjsjfj','km6403Qtsj','qmKm6411Lxzc','qmRpckFxl','km6412JrjgWlsr','km6421ZhbbSxfzc','km6421ZbftSxfzc','km6601Zhfytzjs','km6602Zhqtywftzc','km6711Yywzc','zcjzss','gxzchj',
            'snmDkyslx','qmDkyslx','dxbbfy','jylr','dnJylrrw','rwwcl'
          ))
		      //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({ tjsj: this.model.tjsj ? moment(this.model.tjsj).format('YYYY-MM-DD HH:mm:ss') : null })
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
            formData.fiscalDate = formData.fiscalDate?formData.fiscalDate.format():null;
            formData.tjsj = formData.tjsj?formData.tjsj.format():null;

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