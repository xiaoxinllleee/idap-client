<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
          <a-tabs default-active-key="1" animated='animated'>
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book"/>基本信息</span>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="数据日期">
                <a-date-picker v-decorator="[ 'tjyf', {}]"
                               :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="机构代码">
                <a-input v-decorator="[ 'jgdm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="客户姓名">
                <a-input v-decorator="['khmc', {}]" :disabled="false"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="证件号码">
                <a-input v-decorator="['zjhm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="客户类型">
                <j-dict-select-tag  :disabled="true" v-decorator="['khlx', {rules: [{  message: '请选择客户类型!' }]}]" :triggerChange="true" placeholder="请选择客户类型"
                                    dictCode="dkjkpt_khlx"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="地址">
                <a-input v-decorator="['dz', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="电话号码">
                <a-input v-decorator="['dhhm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>

          </a-row>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book"/>贷款信息</span>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款账号">
                <a-input v-decorator="['dkzh', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="便民卡卡号">
                <a-input v-decorator="['bmkkh', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款金额">
                <a-input v-decorator="['dkje', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款金额">
                <a-input v-decorator="['dkje', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="借款日期">
                <a-date-picker v-decorator="['jkrq', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="到期日期">
                <a-date-picker v-decorator="['dqrq', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="起息日">
                <a-date-picker v-decorator="['qxr', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="结息日">
                <a-input v-decorator="['jxr', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">

              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款期限">
                <j-dict-select-tag  :disabled="true" v-decorator="['dkqx', {rules: [{ message: '请选择贷款期限!' }]}]" :triggerChange="true" placeholder="请选择贷款期限"
                                    dictCode="dkqx"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="产品名称">
                <a-input v-decorator="['cpmc', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>

            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="剩余天数">
                <a-input v-decorator="['syts', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="欠息天数">
                <a-input v-decorator="['qxts', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">

            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="表内应计利息">
                <a-input v-decorator="['bnyjlx', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="表外应计利息">
                <a-input v-decorator="['bwyjlx', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="表内应收利息">
                <a-input v-decorator="['bnyslx', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="表外应收利息">
                <a-input v-decorator="['bwyslx', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="表内外欠息和">
                <a-input v-decorator="['bnwqxh', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款利率">
                <a-input v-decorator="['dkll', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>

            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="担保方式">
                <j-dict-select-tag  :disabled="true" v-decorator="['dbfs', {rules: [{ message: '请选择担保方式!' }]}]" :triggerChange="true" placeholder="请选择担保方式"
                                    dictCode="dbfs"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="第一责任人">
                <a-input v-decorator="['dyzrr', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>


          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款投向">
                <j-dict-select-tag  :disabled="true" v-decorator="['dktx', {rules: [{ message: '请选择贷款投向!' }]}]" :triggerChange="true" placeholder="请选择贷款投向"
                                    dictCode="ckjkpt:FPDK_DKTXDZB_1,name,id"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款形态">
                <j-dict-select-tag  :disabled="true" v-decorator="['dkxt', {rules: [{ message: '请选择贷款形态!' }]}]" :triggerChange="true" placeholder="请选择贷款形态"
                                    dictCode="dkxt"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="信贷贷款品种">
                <j-dict-select-tag  :disabled="true" v-decorator="['xddkpz', {rules: [{ message: '请选择信贷贷款品种!' }]}]" :triggerChange="true" placeholder="请选择信贷贷款品种"
                                    dictCode="dkzl"/>
              </a-form-item>
            </a-col>
            <!--<a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="行业类型">
                <a-input v-decorator="['khsshylx', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>-->
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="到期情况监测">
                <j-dict-select-tag  :disabled="true" v-decorator="['dqqkjc', {rules: [{ message: '请选择到期情况监测!' }]}]" :triggerChange="true" placeholder="请选择到期情况监测"
                                    dictCode="dqqkjc"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="备注">
                <a-textarea v-decorator="['bz', {}]"/>
              </a-form-item>
            </a-col>
            <!--<a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="审核状态">
                <a-input v-decorator="['shzt', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>-->
          </a-row>

          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book"/>责任信息</span>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="主要责任人">
                <a-input v-decorator="['zyzrr', {}]"/>
              </a-form-item>
            </a-col>

            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="次要责任人">
                <a-input v-decorator="['cyzrr', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款责任人">
                <a-input v-decorator="['dkzrr', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收责任人">
                <a-input v-decorator="['qszrr', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收处置措施">
                <j-dict-select-tag  :disabled="true" v-decorator="['qsczcs', {rules: [{ message: '请选择清收处置措施!' }]}]" :triggerChange="true" placeholder="请选择清收处置措施"
                                    dictCode="qsczcs"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收处置时限">
                <a-input v-decorator="['qsczsx', {}]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="责任界定">
                <j-dict-select-tag  :disabled="true" v-decorator="['zrjd', {rules: [{ message: '请选择责任界定!' }]}]" :triggerChange="true" placeholder="请选择责任界定"
                                    dictCode="zrjd"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="不良形成原因">
                <j-dict-select-tag  :disabled="true" v-decorator="['blxcyy', {rules: [{ message: '请选择不良形成原因!' }]}]" :triggerChange="true" placeholder="请选择不良形成原因"
                                    dictCode="blxcyy"/>
              </a-form-item>
            </a-col>
          </a-row>
          </a-tab-pane>
            <a-tab-pane key="4">
              <span slot="tab"><a-icon type="book"/>附件管理</span>
              <a-card><form>
                <a-table :columns="columns_fjgl"
                         :dataSource="dataSource_fjgl"
                         :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <photo-view ref="pictureView" @ok="modalFormOk"/>
                  <a-divider type="vertical"/>
                  <a class="orcodebtn" @click="downhander(record)">下载</a>
                  <a-divider type="vertical" />
                </span>
                </a-table>
              </form></a-card>
            </a-tab-pane>
          </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction,putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import ATextarea from 'ant-design-vue/es/input/TextArea'

  export default {
    name: "DksjjktzModal",
    components: { ATextarea, AFormItem },
    data () {
      return {
        title:"操作",
        visible: false,
        dataSource:{},
        columns_fjgl:[
          {
            title: '文件类型',
            dataIndex: 'fjlx',
            key: 'fjlx',
            scopedSlots: { customRender: 'fjlx' }
          },
          {
            title: '文件栏路径',
            dataIndex: 'wjlj',
            key: 'wjlj',
            scopedSlots: { customRender: 'wjlj' }
          },
          {
            title: '上传人',
            dataIndex: 'lrr',
            key: 'lrr',
            scopedSlots: { customRender: 'lrr' }
          },
          {
            title: '上传时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
            scopedSlots: { customRender: 'lrsj' }
          },
        ],
        dataSource_fjgl: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
        },
        url: {
          add: "/bndksjjktz/dndksjjktz/add",
          edit: "/bndksjjktz/dndksjjktz/edit",
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
        console.log(this.model)
        this.visible = true;
        this.$nextTick(() => {
          if (record.dkzh) {
            getAction("/bndksjjktz/dndksjjktz/query", { "dkzh": record.dkzh }).then((res) => {
              if (res.success) {
                this.dataSource = res.result;
                this.form.setFieldsValue(
                  pick(
                    this.dataSource,
                    'jgdm', 'khmc', 'zjhm', 'khlx', 'dz', 'dkzh', 'bmkkh', 'dkje', 'dkye', 'jxr', 'dkqx', 'cpmc', 'syts', 'qxts', 'bnyjlx', 'bnyslx', 'bwyjlx', 'bwyslx', 'bnwqxh', 'dkll', 'dbfs',
                    'dyzrr', 'khjlbz', 'khsshylx', 'dktx', 'dkxt', 'xddkpz', 'dqqkjc', 'blxcyy', 'zrjd', 'qsczcs', 'qsczsx', 'dkzrr', 'qszrr', 'bz', 'lrbz', 'lrr', 'khjlyggh', 'zyzrr', 'cyzrr',
                    'xwqy', 'dhhm', 'shzt'
                  )
                )
              }
            })
           /* pick(
              this.dataSource,
              'jgdm', 'khmc', 'zjhm', 'khlx', 'dz', 'dkzh', 'bmkkh', 'dkje', 'dkye', 'jxr', 'dkqx', 'cpmc', 'syts', 'qxts', 'bnyjlx', 'bnyslx', 'bwyjlx', 'bwyslx', 'bnwqxh', 'dkll', 'dbfs',
              'dyzrr', 'khjlbz', 'khsshylx', 'dktx', 'dkxt', 'xddkpz', 'dqqkjc', 'blxcyy', 'zrjd', 'qsczcs', 'qsczsx', 'dkzrr', 'qszrr', 'bz', 'lrbz', 'lrr', 'khjlyggh', 'zyzrr', 'cyzrr',
              'xwqy', 'dhhm', 'shzt'
            )*/
            getAction("/DkjkptDhgzfjxx/dkjkptDhgzfjxx/queryFjxx", { "dkzh": record.dkzh }).then((res) => {
              this.dataSource_fjgl = res.result;
            });
          }
          console.log(this.model)
          //时间格式化
          this.form.setFieldsValue({ tjyf: this.model.tjyf ? moment(this.model.tjyf) : null })
          this.form.setFieldsValue({ jkrq: this.model.jkrq ? moment(this.model.jkrq) : null })
          this.form.setFieldsValue({ dqrq: this.model.dqrq ? moment(this.model.dqrq) : null })
          /*this.form.setFieldsValue({ qxr: this.model.qxr ? moment(this.model.qxr) : null })
          this.form.setFieldsValue({ lrsj: this.model.lrsj ? moment(this.model.lrsj) : null })*/
        })


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
            let method  = '';
            if(!this.model.dkzh){
              httpurl += this.url.add;
              method  =  'post';
            }else{
              httpurl += this.url.edit;
               method =  'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.qxr  = formData.qxr?formData.qxr.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
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