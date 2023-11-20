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
          label="统计日期">
          <a-date-picker v-decorator="[ 'tjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <a-input placeholder="请输入所属支行" v-decorator="['sszh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理">
          <a-input placeholder="请输入主客户经理" v-decorator="['zkhjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="整村授信任务村个数">
          <a-input placeholder="请输入整村授信任务村个数" v-decorator="['zcsxrwcgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="村民小组个数">
          <a-input placeholder="请输入村民小组个数" v-decorator="['cmxzgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="白名单户数">
          <a-input placeholder="请输入白名单户数" v-decorator="['bmdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量户数">
          <a-input placeholder="请输入存量户数" v-decorator="['clhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="灰名单户数">
          <a-input placeholder="请输入灰名单户数" v-decorator="['hmdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="黑名单户数">
          <a-input placeholder="请输入黑名单户数" v-decorator="['heimdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否合格">
          <a-input placeholder="请输入是否合格" v-decorator="['zcsxYssfhg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评完成户数">
          <a-input placeholder="请输入初评完成户数" v-decorator="['bkbcpWchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评本月完成户数">
          <a-input placeholder="请输入初评本月完成户数" v-decorator="['bkbcpBywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评本周完成户数">
          <a-input placeholder="请输入初评本周完成户数" v-decorator="['bkbcpBzwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评上月完成户数">
          <a-input placeholder="请输入初评上月完成户数" v-decorator="['bkbcpSywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评上周完成户数">
          <a-input placeholder="请输入初评上周完成户数" v-decorator="['bkbcpSzwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评较上月完成户数">
          <a-input placeholder="请输入初评较上月完成户数" v-decorator="['bkbcpJsywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评较上周完成户数">
          <a-input placeholder="请输入初评较上周完成户数" v-decorator="['bkbcpJszwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评完成比率">
          <a-input placeholder="请输入初评完成比率" v-decorator="['bkbcpWcbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评授信对象人数">
          <a-input placeholder="请输入初评授信对象人数" v-decorator="['bkbcpSxdxrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评额度汇总">
          <a-input placeholder="请输入初评额度汇总" v-decorator="['bkbcpEdhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单完成户数">
          <a-input placeholder="请输入初评白名单完成户数" v-decorator="['bkbcpBmdWchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单本月完成户数">
          <a-input placeholder="请输入初评白名单本月完成户数" v-decorator="['bkbcpBmdBywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单本周完成户数">
          <a-input placeholder="请输入初评白名单本周完成户数" v-decorator="['bkbcpBmdBzwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单上月完成户数">
          <a-input placeholder="请输入初评白名单上月完成户数" v-decorator="['bkbcpBmdSywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单上周完成户数">
          <a-input placeholder="请输入初评白名单上周完成户数" v-decorator="['bkbcpBmdSzwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单较上月完成户数">
          <a-input placeholder="请输入初评白名单较上月完成户数" v-decorator="['bkbcpBmdJsywchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单较上周完成户数">
          <a-input placeholder="请输入初评白名单较上周完成户数" v-decorator="['bkbcpBmdJszwchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评白名单完成比率">
          <a-input placeholder="请输入初评白名单完成比率" v-decorator="['bkbcpBmdWcbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复评完成户数">
          <a-input placeholder="请输入复评完成户数" v-decorator="['bkbfpWchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复评授信对象人数">
          <a-input placeholder="请输入复评授信对象人数" v-decorator="['bkbfpSxdxrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复评额度汇总">
          <a-input placeholder="请输入复评额度汇总" v-decorator="['bkbfpEdhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行审定白名单户数">
          <a-input placeholder="请输入支行审定白名单户数" v-decorator="['zhsdBmdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行审定授信对象人数">
          <a-input placeholder="请输入支行审定授信对象人数" v-decorator="['zhsdSxdxrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行审定额度汇总">
          <a-input placeholder="请输入支行审定额度汇总" v-decorator="['zhsdEdhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行审定完成比例">
          <a-input placeholder="请输入支行审定完成比例" v-decorator="['zhsdWcbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷导入户数">
          <a-input placeholder="请输入惠农快贷导入户数" v-decorator="['hnkdDrhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷额度汇总">
          <a-input placeholder="请输入惠农快贷额度汇总" v-decorator="['hnkdEdhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行审定惠农快贷比">
          <a-input placeholder="请输入支行审定惠农快贷比" v-decorator="['hnkdZhsdHnkdZb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷电话回访户数">
          <a-input placeholder="请输入惠农快贷电话回访户数" v-decorator="['hnkdDhhfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷签约户数">
          <a-input placeholder="请输入惠农快贷签约户数" v-decorator="['hnkdQyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷签约额度汇总">
          <a-input placeholder="请输入惠农快贷签约额度汇总" v-decorator="['hnkdQyedhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="惠农快贷签约率">
          <a-input placeholder="请输入惠农快贷签约率" v-decorator="['hnkdBmdQyl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实地走访营销户数">
          <a-input placeholder="请输入实地走访营销户数" v-decorator="['jzyxSdzfYxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话走访营销户数">
          <a-input placeholder="请输入电话走访营销户数" v-decorator="['jzyxDhzfYxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销总户数">
          <a-input placeholder="请输入精准营销总户数" v-decorator="['jzyxZhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销本月户数">
          <a-input placeholder="请输入精准营销本月户数" v-decorator="['jzyxByhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销本周户数">
          <a-input placeholder="请输入精准营销本周户数" v-decorator="['jzyxBzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销上月户数">
          <a-input placeholder="请输入精准营销上月户数" v-decorator="['jzyxSyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销上周户数">
          <a-input placeholder="请输入精准营销上周户数" v-decorator="['jzyxSzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="精准营销完成比率">
          <a-input placeholder="请输入精准营销完成比率" v-decorator="['jzyxWcbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同新增客户数">
          <a-input placeholder="请输入贷款合同新增客户数" v-decorator="['dkhtXzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同本月新增户数">
          <a-input placeholder="请输入贷款合同本月新增户数" v-decorator="['dkhtByxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同本周新增户数">
          <a-input placeholder="请输入贷款合同本周新增户数" v-decorator="['dkhtBzxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同上月新增户数">
          <a-input placeholder="请输入贷款合同上月新增户数" v-decorator="['dkhtSyxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同上周新增户数">
          <a-input placeholder="请输入贷款合同上周新增户数" v-decorator="['dkhtSzxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同较上月新增户数">
          <a-input placeholder="请输入贷款合同较上月新增户数" v-decorator="['dkhtJsyxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同较上周新增户数">
          <a-input placeholder="请输入贷款合同较上周新增户数" v-decorator="['dkhtJszxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同年轻客户数">
          <a-input placeholder="请输入贷款合同年轻客户数" v-decorator="['dkhtNqkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同签约额度汇总">
          <a-input placeholder="请输入贷款合同签约额度汇总" v-decorator="['dkhtQyedhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同年轻签约度汇总">
          <a-input placeholder="请输入贷款合同年轻签约度汇总" v-decorator="['dkhtNqkhQyedhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同审定签约率">
          <a-input placeholder="请输入贷款合同审定签约率" v-decorator="['dkhtZhsdQyl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信新增客户数">
          <a-input placeholder="请输入用信新增客户数" v-decorator="['dkyxXzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信本月新增客户数">
          <a-input placeholder="请输入用信本月新增客户数" v-decorator="['dkyxByxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信本周新增客户数">
          <a-input placeholder="请输入用信本周新增客户数" v-decorator="['dkyxBzxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信上月新增客户数">
          <a-input placeholder="请输入用信上月新增客户数" v-decorator="['dkyxSyxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信上周新增客户数">
          <a-input placeholder="请输入用信上周新增客户数" v-decorator="['dkyxSzxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信较上月新增客户数">
          <a-input placeholder="请输入用信较上月新增客户数" v-decorator="['dkyxJsyxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信较上周新增客户数">
          <a-input placeholder="请输入用信较上周新增客户数" v-decorator="['dkyxJszxzkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信额度汇总">
          <a-input placeholder="请输入用信额度汇总" v-decorator="['dkyxEdhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信新增有效用信客户数">
          <a-input placeholder="请输入用信新增有效用信客户数" v-decorator="['dkyxXzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信本月新增有效用信客户数">
          <a-input placeholder="请输入用信本月新增有效用信客户数" v-decorator="['dkyxByxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信本周新增有效用信客户数">
          <a-input placeholder="请输入用信本周新增有效用信客户数" v-decorator="['dkyxBzxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信上月新增有效用信客户数">
          <a-input placeholder="请输入用信上月新增有效用信客户数" v-decorator="['dkyxSyxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信上周新增有效用信客户数">
          <a-input placeholder="请输入用信上周新增有效用信客户数" v-decorator="['dkyxSzxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信较上月新增有效用信客户数">
          <a-input placeholder="请输入用信较上月新增有效用信客户数" v-decorator="['dkyxJsyxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信较上周新增有效用信客户数">
          <a-input placeholder="请输入用信较上周新增有效用信客户数" v-decorator="['dkyxJszxzyxyxkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信验收验收合格村个数">
          <a-input placeholder="请输入授信验收验收合格村个数" v-decorator="['sxysYshgcgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信验收验收合格率">
          <a-input placeholder="请输入授信验收验收合格率" v-decorator="['sxysYshgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总户数">
          <a-input placeholder="请输入总户数" v-decorator="['zhs', {}]" />
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
    name: "ZcsxzhjdbModal",
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
          add: "/zcsxzhjdb/zcsxzhjdb/add",
          edit: "/zcsxzhjdb/zcsxzhjdb/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','zkhjl','zcsxrwcgs','cmxzgs','bmdhs','clhs','hmdhs','heimdhs','zcsxYssfhg','bkbcpWchs','bkbcpBywchs','bkbcpBzwchs','bkbcpSywchs','bkbcpSzwchs','bkbcpJsywchs','bkbcpJszwchs','bkbcpWcbl','bkbcpSxdxrs','bkbcpEdhz','bkbcpBmdWchs','bkbcpBmdBywchs','bkbcpBmdBzwchs','bkbcpBmdSywchs','bkbcpBmdSzwchs','bkbcpBmdJsywchs','bkbcpBmdJszwchs','bkbcpBmdWcbl','bkbfpWchs','bkbfpSxdxrs','bkbfpEdhz','zhsdBmdhs','zhsdSxdxrs','zhsdEdhz','zhsdWcbl','hnkdDrhs','hnkdEdhz','hnkdZhsdHnkdZb','hnkdDhhfhs','hnkdQyhs','hnkdQyedhz','hnkdBmdQyl','jzyxSdzfYxhs','jzyxDhzfYxhs','jzyxZhs','jzyxByhs','jzyxBzhs','jzyxSyhs','jzyxSzhs','jzyxWcbl','dkhtXzkhs','dkhtByxzkhs','dkhtBzxzkhs','dkhtSyxzkhs','dkhtSzxzkhs','dkhtJsyxzkhs','dkhtJszxzkhs','dkhtNqkhs','dkhtQyedhz','dkhtNqkhQyedhz','dkhtZhsdQyl','dkyxXzkhs','dkyxByxzkhs','dkyxBzxzkhs','dkyxSyxzkhs','dkyxSzxzkhs','dkyxJsyxzkhs','dkyxJszxzkhs','dkyxEdhz','dkyxXzyxyxkhs','dkyxByxzyxyxkhs','dkyxBzxzyxyxkhs','dkyxSyxzyxyxkhs','dkyxSzxzyxyxkhs','dkyxJsyxzyxyxkhs','dkyxJszxzyxyxkhs','sxysYshgcgs','sxysYshgl','zhs'))
		  //时间格式化
          this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
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
            formData.tjrq = formData.tjrq?formData.tjrq.format():null;

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