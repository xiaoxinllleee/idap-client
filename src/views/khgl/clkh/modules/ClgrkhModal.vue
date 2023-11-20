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
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属机构" hasFeedback>
                <j-tree-select placeholder="请选择所属机构" v-decorator="['zzbz', {rules: [{ required: true, message: '请选择机构!' }]}]"
                               dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属营销单元" hasFeedback>
                <j-dict-select-tag placeholder="请选择所属营销单元" v-decorator="['ssyxdy', {rules: [{ required: true, message: '请选择所属营销单元!' }]}]"
                                   dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :triggerChange="true" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户编号" hasFeedback>
                <a-input placeholder="请输入客户编号" v-decorator="['khbh', {}]" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" hasFeedback>
                <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码" hasFeedback>
                <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式" hasFeedback>
                <a-input placeholder="请输入联系方式" v-decorator="['sjhm', {}]" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别" hasFeedback>
                <j-dict-select-tag placeholder="请选择客户性别" v-decorator="['xb', {}]" dict-code="sex"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="出生日期" hasFeedback>
                <j-date placeholder="请选择出生日期" v-decorator="[ 'csrq',{}]" :trigger-change="true" style="width: 100%;"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况" hasFeedback>
                <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]" dict-code="hyzk"/>
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="16"><a-form-item :labelCol="{ xs: { span: 24 }, sm: { span: 4 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 20 } }" label="住址" hasFeedback>
                  <a-input placeholder="请输入住址" v-decorator="['zz', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学历" hasFeedback>
                <j-dict-select-tag placeholder="请选择最高学历" v-decorator="['zgxl', {}]" dict-code="xl"/>
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工作单位名称" hasFeedback>
                <a-input placeholder="请输入工作单位名称" v-decorator="['gzdwmc', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工作单位地址" hasFeedback>
                <a-input placeholder="请输入工作单位地址" v-decorator="['dwdz', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="行业分类" hasFeedback>
                <a-input placeholder="请输入行业分类" v-decorator="['hyfl', {}]" />
              </a-form-item></a-col>
            </a-row>
            <a-row class="form-row" :gutter="0">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="兴趣爱好" hasFeedback>
                <a-input placeholder="请输入兴趣爱好" v-decorator="['xqah', {}]"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度" hasFeedback>
                <j-dict-select-tag placeholder="请输入客户重要程度" v-decorator="['khzycd', {}]" dict-code="khzycd"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="潜在业务" hasFeedback>
                <a-input placeholder="请输入潜在业务" v-decorator="['khqzyw', {}]" />
              </a-form-item></a-col>
            </a-row>
          </a-card>
        </a-tab-pane>

        <a-tab-pane tab="家庭成员信息" key="2" :forceRender="true">
          <jtcy-list ref="jtcyList"/>
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
  import jtcyList from './Jtcy'
  import fjxxList from './Fjxx'
  import ywhywwlqkModal from './Ywhywwlqk'
  import hfxxList from './Hfxx'
  import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { httpAction, getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import { putAction } from '../../../../api/manage'

  export default {
    name: 'ClgrkhModal',
    components: {
      JDate,
      JTreeSelect,
      JEditableTable,
      jtcyList,
      ZcfzqkTicketList,
      fjxxList,
      ywhywwlqkModal,
      hfxxList
    },
    data() {
      return {
        title: '操作',
        visible: false,
        form: this.$form.createForm(this),
        khxz: "1",
        disableSubmit: false,
        confirmLoading: false,
        clgrkhModel: {},
        //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
        //需要将获取的数据保存到新的对象里，否则获取不到
        clgrkhjbxxModel: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        options: [],

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          getJbxx: '/clgrkh/clgrkhjbxx/queryById',
          getJtcyxx: '/clgrkh/clgrkhjbxx/queryClgrkhjtcyByMainId',
          getYwhywwlxx: '/clgrkh/clgrkhjbxx/queryClgrkhywwlxxByMainId',
          getZlxx: '/clgrkh/clgrkhjbxx/queryClgrkhzlxxByMainId',
          getHfxx: '/clgrkh/clgrkhjbxx/queryClgrkhhfxxByZjhm',
          add: '/clgrkh/clgrkhjbxx/add',
          edit: '/clgrkh/clgrkhjbxx/edit',
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
        this.clgrkhModel = Object.assign({}, record);
        if (this.clgrkhModel.id) {
          let params = {id: this.clgrkhModel.id}
          //获取基本信息
          getAction(this.url.getJbxx,params).then((res)=>{
            if(res.success){
              this.clgrkhjbxxModel = Object.assign(this.clgrkhModel, res.result);
              // this.$forceUpdate()
              this.$nextTick(() => {
                let fields = pick(
                  this.clgrkhjbxxModel,
                  'zzbz','ssyxdy','khbh','khmc','zjhm','xb','csrq','gzdwmc','dwdz',
                  'hyzk','sjhm','zz','zgxl','hyfl','xqah','khzycd','khqzyw'
                )
                this.form.setFieldsValue(fields)
              });
            }
          });
          //获取家庭成员信息
          putAction(this.url.getJtcyxx, params).then((res)=>{
            if(res.success) {
              this.$refs.jtcyList.dataSources = res.result
            }
          });
          // getAction(this.url.getJtcyxx, params).then((res)=>{
          //   if(res.success) {
          //     this.$refs.jtcyList.dataSources = res.result
          //   }
          // });

          //获取与我行业务往来信息
          getAction(this.url.getYwhywwlxx, params).then((res)=>{
            if(res.success) {
              let ywhywwlqkModal = this.$refs.ywhywwlqkModal
              ywhywwlqkModal.model = Object.assign({}, res.result)
              this.$nextTick(() => {
                let fields = pick(
                  ywhywwlqkModal.model,
                  'sfktckyw','ckye','ckrpye','sfktdkyw','dkye','zjdkdqrq','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw'
                )
                this.form.setFieldsValue(fields)
              });
            }
          });
          //获取资料信息
          getAction(this.url.getZlxx, params).then((res)=>{
            if (res.success) {
              let zlxxModal = this.$refs.fjxxList
              zlxxModal.model.zlxxImage = res.result.zlxxImage
              zlxxModal.model.zlxxFile = res.result.zlxxFile
              let path = ''
              let arr = [];
              zlxxModal.model.zlxxImage.forEach((array, index)=>{
                arr.push(array.fwlj)
              })
              if(arr.length>0){
                path = arr.join(",")
              }
              zlxxModal.imagePaths = path;

              path = ''
              arr = [];
              zlxxModal.model.zlxxFile.forEach((array, index)=>{
                arr.push(array.fwlj)
              })
              if(arr.length>0){
                path = arr.join(",")
              }
              this.filePaths = path;
              this.$forceUpdate()
            }
          })
        }
        if (this.clgrkhModel.zjhm) {
          let params = {zjhm:this.clgrkhModel.zjhm}
          //获取回访信息
          // getAction(this.url.getHfxx, params).then((res)=>{
          //   if (res.success) {
          //     console.log(res.result)
          //     this.$refs.hfxxList.data = res.result
          //   }
          // });
          putAction(this.url.getHfxx, params).then((res)=>{
            if (res.success) {
              console.log(res.result);
              this.$refs.hfxxList.data = res.result;
            }
          });
        }
        this.visible = true;
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
            if (!this.clgrkhModel.id) {
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
              method = 'put';
            }
            let mainData = Object.assign(this.clgrkhModel, values);
            let ywhywwlxxData = pick(mainData,
              'sfktckyw','ckye','ckrpye','sfktdkyw','dkye','zjdkdqrq','bldkye','bwbldkye', 'sfktsjyhyw','sfktwsyhyw','sfbletcyw'
            )
            //时间格式化
            //家庭成员List
            let jtcyData = this.$refs.jtcyList.data
            console.log(mainData)
            //资料信息
            let zlxxList = [{}]
            if(this.$refs.fjxxList.model.zlxxImage) {
              zlxxList = zlxxList.concat(this.$refs.fjxxList.model.zlxxImage)
            }
            if(this.$refs.fjxxList.model.zlxxFile) {
              zlxxList = zlxxList.concat(this.$refs.fjxxList.model.zlxxFile)
            }
            let formData = {
              ...mainData,
              clgrkhjtcyList: jtcyData,
              clgrkhzlxxList: zlxxList,
              clgrkhywwlxx: ywhywwlxxData
            }
            httpAction(httpurl,formData,method).then((res)=>{
              if (res.success) {
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

<style scoped>
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>