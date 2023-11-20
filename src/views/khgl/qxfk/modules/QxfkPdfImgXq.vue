<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

      <table width="100%" border>

        <tr>
          <th colspan="4">报告详情</th>
        </tr>

        <tr>
          <td colspan="2">查询时间</td>
          <td colspan="2">风控等级</td>
        </tr>

        <tr>
          <td colspan="2">{{ model.info.queryTime }}</td>
          <td colspan="2" style="color: red">{{ model.info.riskLevel }}</td>
        </tr>


        <tr v-if="model.info.highRiskList != null &&  model.info.highRiskList.length > 0">
          <td colspan="2">高危项</td>
          <td colspan="2">高危项内容</td>
        </tr>

        <tr v-if="model.info.highRiskList != null && model.info.highRiskList.length > 0">
          <td colspan="2">{{ model.info.highRiskList[0].name }}</td>
          <td colspan="2">{{ model.info.highRiskList[0].content }}</td>
        </tr>

        <tr v-if="model.info.reportDataDetail != null && model.info.reportDataDetail.information != null ">
          <td>证件号码</td>
          <td>客户名称</td>
          <td>手机号码</td>
          <td>身份证二要素验证结果</td>
        </tr>

        <tr v-if="model.info.reportDataDetail != null && model.info.reportDataDetail.information != null ">
          <td>{{ model.info.reportDataDetail.information.idCard }}</td>
          <td>{{ model.info.reportDataDetail.information.idCardName }}</td>
          <td>{{ model.info.reportDataDetail.information.tel }}</td>
          <td>{{ model.info.reportDataDetail.information.idCardTwoEelements }}</td>
        </tr>

        <tr v-if="model.info.reportDataDetail.publicSecurity.policeNegativeInfo != null && model.info.reportDataDetail.publicSecurity.policeNegativeInfo != '' ">
          <th colspan="4">公检法信息</th>
        </tr>

        <tr v-if="model.info.reportDataDetail.publicSecurity.policeNegativeInfo != null && model.info.reportDataDetail.publicSecurity.policeNegativeInfo != '' ">
          <td>案件来源</td>
          <td>案件类型</td>
          <td>结论</td>
          <td>建议</td>
        </tr>

        <tr v-if="model.info.reportDataDetail.publicSecurity.policeNegativeInfo != null && model.info.reportDataDetail.publicSecurity.policeNegativeInfo != '' ">
          <td>{{ model.info.reportDataDetail.publicSecurity.policeNegativeInfo.caseSource }}</td>
          <td>{{ model.info.reportDataDetail.publicSecurity.policeNegativeInfo.caseType }}</td>
          <td>{{ model.info.reportDataDetail.publicSecurity.policeNegativeInfo.summary }}</td>
          <td>{{ model.info.reportDataDetail.publicSecurity.policeNegativeInfo.advise }}</td>
        </tr>

        <tr v-if="model.info.reportDataDetail.antifraud.specialInfo != null && model.info.reportDataDetail.antifraud.specialInfo != '' ">
          <th colspan="4">外部黑灰名单及借贷申请情况</th>
        </tr>

          <tr v-if="model.info.reportDataDetail.antifraud.specialInfo.specials.length > 0">
            <th colspan="2">风险类型</th>
            <th colspan="2">命中详情</th>
          </tr>

          <tr v-if="model.info.reportDataDetail.antifraud.specialInfo.specials.length > 0" v-for="(item,index) in model.info.reportDataDetail.antifraud.specialInfo.specials">
            <td colspan="2">{{item.type}}</td>
            <td colspan="2">{{item.detail}}</td>
          </tr>

          <tr>
            <th colspan="2">结论</th>
            <th colspan="2">建议</th>
          </tr>
          <tr>
            <td colspan="2">{{ model.info.reportDataDetail.antifraud.specialInfo.summary }}</td>
            <td colspan="2">{{ model.info.reportDataDetail.antifraud.specialInfo.advise }}</td>
          </tr>


      </table>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "QxfkPdfImgXqModal",
    data () {
      return {
        title:"风控详情",
        visible: false,
        model:{},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        validatorRules:{
        },
        url: {
          add: "/qxfk/qxfkPdfImg/add",
          edit: "/qxfk/qxfkPdfImg/edit",
        },

      }
    },
    created () {
    },
    methods: {
      view (record) {
        console.log("风控详情数据")
        console.log(typeof record)
        this.model = JSON.parse(record)

        this.visible = true;

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.close()
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>
tr{
  text-align: center;
  height: 40px;
}
</style>