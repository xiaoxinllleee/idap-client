<template>
  <a-modal :title="title"
           :width="1300"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form"  >
      <!-- 子表单区域 -->
        <a-tabs default-active-key="1">
        <a-tab-pane tab="基础信息" key="1" :forceRender="true">
          <a-card class="card" :bordered="false">
            <!-- 主表单区域 -->
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行" hasFeedback>
                <j-tree-select placeholder="请选择所属支行" v-decorator="['zzbz',{rules: [{ required: true, message: '请选择所属支行!' }]}]"
                               dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属营销单元" hasFeedback>
                <j-dict-select-tag placeholder="请选择所属营销单元" v-decorator="['ssyxdy', {rules: [{ required: true, message: '请选择所属营销单元!' }]}]"
                                   dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :triggerChange="true"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户编号" hasFeedback>
                <a-input placeholder="请输入客户编号" v-decorator="['khbh', {}]" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称" hasFeedback>
                <a-input placeholder="请输入企业名称" v-decorator="['khmc', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码" hasFeedback>
                <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式" hasFeedback>
                <a-input placeholder="请输入联系方式" v-decorator="['lxdh', {}]" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位地址" hasFeedback>
                <a-input placeholder="单位地址" v-decorator="['txdz', {}]" />
              </a-form-item></a-col>
              <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营项目" hasFeedback>
                <a-input placeholder="请输入经营项目" v-decorator="['jyxm', {}]" />
              </a-form-item></a-col>-->
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主营业务" hasFeedback>
                <a-input placeholder="请输入主营业务" v-decorator="['zyyw', {}]" />
              </a-form-item></a-col>
              <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营年限" hasFeedback>
                <a-input-number placeholder="请输入经营年限(年)" v-decorator="['jynx', {}]" :min="0" style="width: 100%;" />
              </a-form-item></a-col>-->
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="成立日期" hasFeedback>
                <a-input-number placeholder="请选择成立日期" v-decorator="['clrq', {}]" :min="0" style="width: 100%;" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职工人数" hasFeedback>
                <a-input-number placeholder="请输入职工人数" v-decorator="['zgrs', {}]"  :min="0" style="width: 100%;"/>
              </a-form-item></a-col>-->
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="注册资金" hasFeedback>
                <a-input-number placeholder="请输入注册资金" v-decorator="['zczbje', {}]"  :min="0" style="width: 100%;"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业规模" hasFeedback>
                <a-input placeholder="请输入企业规模" v-decorator="['qygm', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="行业分类" hasFeedback>
                <a-input placeholder="请输入行业分类" v-decorator="['hyfl', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度" hasFeedback>
                <j-dict-select-tag placeholder="请选择客户重要程度" v-decorator="['khzycd', {}]" dict-code="khzycd"/>
              </a-form-item></a-col>
            </a-row>

            <!--<a-list-item class="DefaultListItem" term="法人信息">法人信息</a-list-item>-->
            <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">法人信息</a-divider>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表" hasFeedback>
                <a-input placeholder="请输入法人代表" v-decorator="['frdb', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人证件号码" hasFeedback>
                <a-input placeholder="请输入法人证件号码" v-decorator="['frzjhm', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人联系方式" hasFeedback>
                <a-input placeholder="请输入法人联系方式" v-decorator="['frlxfs', {}]" />
              </a-form-item></a-col>
            </a-row>

            <!--<a-list-item class="DefaultListItem" term="评价指标信息">财税信息</a-list-item>-->
            <!--<a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">财税信息</a-divider>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与我行业务往来情况" hasFeedback>
                <a-input placeholder="请输入与我行业务往来情况" v-decorator="['ywhywwlqk', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="潜在业务" hasFeedback>
                <a-input placeholder="请输入潜在业务" v-decorator="['qzyw', {}]" />
              </a-form-item></a-col>
            </a-row>-->
          </a-card>
        </a-tab-pane>
          
        <a-tab-pane tab="经营情况" key="2" :forceRender="true">
          <jyqk-modal ref="jyqkModal"/>
        </a-tab-pane>

          <a-tab-pane tab="与我行业务往来情况" key="3" :forceRender="true">
            <ywhywwlqk-modal ref="ywhywwlqkModal" :khxz="khxz"/>
          </a-tab-pane>

        <!--<a-tab-pane tab="资产负债情况" key="4" :forceRender="true">
          <ZcfzqkTicketList ref="ZcfzqkTicketList"></ZcfzqkTicketList>
        </a-tab-pane>-->

          <a-tab-pane tab="回访情况" key="5" :forceRender="true">
            <hfxx-list ref="hfxxList"/>
          </a-tab-pane>

          <a-tab-pane tab="附件" key="6" :forceRender="true">
            <fjxx-list ref="fjxxList"/>
          </a-tab-pane>
      </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ZcfzqkTicketList from './Zcfzqk'
  import jyqkModal from './Jyqk'
  import fjxxList from './Fjxx'
  import ywhywwlqkModal from './Ywhywwlqk'
  import hfxxList from './Hfxx'
  import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { httpAction, getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import { putAction } from '../../../../api/manage'

  export default {
    name: 'ClqykhModal',
    components: {
      JDate,JEditableTable,JTreeSelect,jyqkModal,ZcfzqkTicketList,fjxxList,
      ywhywwlqkModal,hfxxList
    },
    data() {
      return {
        title: '操作',
        visible: false,
        form: this.$form.createForm(this),
        khxz: '2',
        disableSubmit: false,
        confirmLoading: false,
        clqykhModel: {},
        clqykhJbxxModel: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        options: [],
        validatorRules:{},
        url: {
          getJbxx: '/clqykh/clqykhjbxx/queryById',
          getYwhywwlxx: '/clqykh/clqykhjbxx/queryClqykhywwlxxByMainId',
          getZlxx: '/clqykh/clqykhjbxx/queryClqykhzlxxByMainId',
          getHfxx: '/clqykh/clqykhjbxx/queryClqykhhfxxByZjhm',
          add: '/clqykh/clqykhjbxx/add',
          edit: '/clqykh/clqykhjbxx/edit',
        }
      }
    },
    created() {},
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.clqykhModel = Object.assign({}, record);
        if (this.clqykhModel.id) {
          let params = {id:this.clqykhModel.id}
          //获取基本信息
          getAction(this.url.getJbxx,params).then((res)=>{
            if(res.success){
              this.clqykhjbxxModel = Object.assign(this.clqykhModel, res.result);
              // this.$forceUpdate()
              this.$nextTick(() => {
                this.form.setFieldsValue(pick(
                  this.clqykhjbxxModel,
                  'zzbz','ssyxdy','khbh','khmc','zjhm','frdb','frlxfs','frzjhm','lxdh','txdz','hyfl','khzycd','khqzyw',
                  'zyyw','clrq','zczbje','qygm',
                ))
                // 时间格式化
                this.form.setFieldsValue({clrq:this.model.clrq?moment(this.model.clrq):null})
                //this.form.setFieldsValue(fields)
              });
              let jyqkModal = this.$refs.jyqkModal
              jyqkModal.model = Object.assign({}, res.result)
              this.$nextTick(() => {
                let fields = pick(
                  jyqkModal.model,
                  'nyysr','nzyywcb','ngz','njnsds','njnzzs','nzyjlr','qtsr','qtzc', 'zsr','zzc','jlr'
                )
                this.form.setFieldsValue(fields)
              });
            }
          });

          // 获取与我行业务往来信息
          getAction(this.url.getYwhywwlxx, params).then((res)=>{
            if(res.success) {
              let ywhywwlqkModal = this.$refs.ywhywwlqkModal
              ywhywwlqkModal.model = Object.assign({}, res.result)
              this.$nextTick(() => {
                let fields = pick(
                  ywhywwlqkModal.model,
                  'sfktckyw','ckye','ckrpye','sfktdkyw','dkye','zjdkdqrq','bldkye','bwbldkye',
                  'sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk','sfdfgz','sfktpos','sfktjhzf'
                )
                this.form.setFieldsValue(fields)
              });
            }
          });

          // 获取回访信息
          if (this.clqykhModel.zjhm) {
            let para = {zjhm: this.clqykhModel.zjhm};
            putAction(this.url.getHfxx, para).then((res)=>{
              if (res.success) {
                console.log(res.result);
                this.$refs.hfxxList.data = res.result;
              }
            });
          }
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
              this.model,
              'sszh','ssyxdy','cqjmbh','dabh','dwmc','lxfs','dwdz','xyfl', 'dwqk','lxrxx','ywhywwlqk','gskhjl','jrywqk','yxqk','fjxx'
          ))
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