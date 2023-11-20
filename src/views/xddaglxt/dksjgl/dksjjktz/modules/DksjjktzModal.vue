<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1" animated="animated">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="book"/>基本信息
            </span>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据月份">
          <a-date-picker placeholder="请输入数据月份" v-decorator="['tjyf', {}]" :disabled="true" style="width: 100%"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <j-tree-select
            v-decorator="['jgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="true"
          />
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" :disabled="true"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" :disabled="true"/>
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <j-dict-select-tag placeholder="请输入客户类型" v-decorator="['khlx', {}]" dictCode="dkjkpt_khlx" :disabled="true"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址">
          <a-input placeholder="请输入地址" v-decorator="['dz', {}]" :disabled="true"/>
        </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

        <a-tab-pane key="2">
        <span slot="tab"><a-icon type="book"/>贷款信息</span>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['dkzh', validatorRules.dkzh ]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="便民卡卡号">
          <a-input placeholder="请输入便民卡卡号" v-decorator="['bmkkh', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款日期">
          <a-date-picker v-decorator="[ 'jkrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日">
          <a-date-picker v-decorator="[ 'qxr', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结息日">
          <a-input placeholder="请输入结息日" v-decorator="['jxr', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款期限">
          <j-dict-select-tag placeholder="请输入贷款期限" v-decorator="['dkqx', {}]" dictCode="dkqx" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品名称">
          <a-input placeholder="请输入产品名称" v-decorator="['cpmc', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠息天数">
          <a-input placeholder="请输入欠息天数" v-decorator="['qxts', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内应计利息">
          <a-input placeholder="请输入表内应计利息" v-decorator="['bnyjlx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内应收利息">
          <a-input placeholder="请输入表内应收利息" v-decorator="['bnyslx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外应计利息">
          <a-input placeholder="请输入表外应计利息" v-decorator="['bwyjlx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外应收利息">
          <a-input placeholder="请输入表外应收利息" v-decorator="['bwyslx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内外欠息和">
          <a-input placeholder="请输入表内外欠息和" v-decorator="['bnwqxh', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款利率">
          <a-input placeholder="请输入贷款利率" v-decorator="['dkll', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式">
          <j-dict-select-tag placeholder="请输入担保方式" v-decorator="['dbfs', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理">
          <a-input placeholder="请输入主客户经理" v-decorator="['khjlbz', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属行业类型">
          <a-input placeholder="请输入所属行业类型" v-decorator="['khsshylx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向">
          <a-input placeholder="请输入贷款投向" v-decorator="['dktx', {}]" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款形态">
          <j-dict-select-tag placeholder="请输入贷款形态" v-decorator="['dkxt', {}]" dictCode="dkxt" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷贷款品种">
          <j-dict-select-tag placeholder="请输入信贷贷款品种" v-decorator="['xddkpz', {}]" dictCode="dkzl" :disabled="true"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期情况监测">
          <a-input placeholder="请输入到期情况监测" v-decorator="['dqqkjc', {}]" dictCode="dqqkjc" :disabled="true"/>
        </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>

          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book"/>责任信息</span>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良形成原因">
          <j-dict-select-tag placeholder="请输入不良形成原因" v-decorator="['blxcyy', {}]" :triggerChange="true" dictCode="blxcyy"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任界定">
          <j-dict-select-tag placeholder="请输入责任界定" v-decorator="['zrjd', {}]" :triggerChange="true" dictCode="zrjd"/>
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清收处置措施">
          <j-dict-select-tag placeholder="请输入清收处置措施" v-decorator="['qsczcs', {}]" :triggerChange="true" dictCode="qsczcs"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清收处置时限">
          <a-input placeholder="请输入清收处置时限" v-decorator="['qsczsx', {}]" />
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主要责任人">
          <a-input placeholder="请输入主要责任人" v-decorator="['zyzrr', {}]" />
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次要责任人">
          <a-input placeholder="请输入次要责任人" v-decorator="['cyzrr', {}]" />
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清收责任人">
          <a-input placeholder="请输入清收责任人" v-decorator="['qszrr', {}]" />
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="book"/>附件管理</span>
            <a-card>
              <form>
                <a-table :column="columns_fjgl"
                         :dataSource="dataSource_fjgl"
                         :pagination="false">
                  <span slot="action" slot-scope="text,record">
                    <photo-view ref="pictureView" @ok="modalFormOk"/>
                    <a-divider type="vertical"/>
                      <a class="orcodebtn" @click="downhander(record)">下载</a>
                    <a-divider type="vertical"/>
                  </span>
                </a-table>
              </form>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {getAction} from "../../../../../api/manage";

  export default {
    name: "DksjjktzModal",
    components: { JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: true,
        dataSource:{},
        model: {},
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
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        //dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
        },
        url: {
          add: "/dksjjktz/dksjjktz/add",
          edit: "/dksjjktz/dksjjktz/edit",
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
        console.log(this.model);
        this.visible = true;
        this.$nextTick(() => {
          if (record.dkzh) {
            getAction("/dksjjktz/dksjjktz/query", {dkzh: record.dkzh}).then((res) => {
              if (res.success) {
                this.dataSource = res.result;
                this.form.setFieldsValue(
                  pick(
                    this.dataSource,
                    'jgdm', 'khmc', 'zjhm', 'khlx', 'dz', 'dkzh', 'bmkkh', 'dkje', 'dkye', 'jxr', 'dkqx', 'cpmc', 'syts', 'qxts',
                    'bnyjlx', 'bnyslx', 'bwyjlx', 'bwyslx', 'bnwqxh', 'dkll', 'dbfs', 'dyzrr', 'khjlbz', 'khsshylx', 'dktx', 'dkxt',
                    'xddkpz', 'dqqkjc', 'blxcyy', 'zrjd', 'qsczcs', 'qsczsx', 'qszrr', 'bz', 'zyzrr', 'cyzrr'
                  )
                )
              }
            })
            /*this.form.setFieldsValue(
             pick(
              this.model,
              'jgdm','khmc','zjhm','khlx','dz','dkzh','bmkkh','dkje','dkye','jxr','dkqx','cpmc','syts','qxts','bnyjlx','bnyslx','bwyjlx','bwyslx','bnwqxh','dkll','dbfs','dyzrr','khjlbz','khsshylx','dktx','dkxt','xddkpz','dqqkjc','blxcyy','zrjd','qsczcs','qsczsx','qszrr','bz','zyzrr','cyzrr'
            ))*/
            getAction("/DkjkptDhgzfjxx/dkjkptDhgzfjxx/queryFjxx", {"dkzh": record.dkzh}).then((res) => {
              this.dataSource_fjgl = res.result;
            });
          }
            console.log(this.model)
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({jkrq:this.model.jkrq?moment(this.model.jkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({qxr:this.model.qxr?moment(this.model.qxr):null})
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
            let method = '';
            if(!this.model.dkzh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            // formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            // formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            // formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            // formData.qxr = formData.qxr?formData.qxr.format():null;

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