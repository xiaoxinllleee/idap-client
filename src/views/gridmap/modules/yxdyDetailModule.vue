<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: true} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属支行">
              <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
            </a-form-item>
          </a-col>


          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属乡镇">
              <a-input placeholder="请输入所属乡镇" v-decorator="['ssxz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="行政村">
              <a-input placeholder="请输入行政村" v-decorator="['xzc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="人口总数">
              <a-input placeholder="请输入人口总数" v-decorator="['rkzs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="总户数">
              <a-input placeholder="请输入总户数" v-decorator="['zhs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贫困户数">
              <a-input placeholder="请输入贫困户数" v-decorator="['pkhs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="低保户数">
              <a-input placeholder="请输入低保户数" v-decorator="['dbhs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="吸毒人数">
              <a-input placeholder="请输入吸毒人数" v-decorator="['xdrs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="非法集资人数">
              <a-input placeholder="请输入非法集资人数" v-decorator="['ffjzrs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="重大疾病人数">
              <a-input placeholder="请输入重大疾病人数" v-decorator="['zdjbrs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开通信用卡人数">
              <a-input placeholder="请输入开通信用卡人数" v-decorator="['ktxykrs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开通福民卡人数">
              <a-input placeholder="请输入开通福民卡人数" v-decorator="['ktfmkrs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开通扫码付人数">
              <a-input placeholder="请输入开通扫码付人数" v-decorator="['ktsmfrs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统计日期">
              <a-date-picker v-decorator="[ 'tjrq', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-tabs defaultActiveKey="1" >
          <a-tab-pane  key="1">

            <span slot="tab"><a-icon type="book"/>存、贷款业务情况</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       :dataSource="this.khywxx"
                       :columns="cdkywqkTable.columns"
                       rowKey="id"
                       :loading="loading"
                       :pagination="ipagination"
              />
            </a-card>


          </a-tab-pane>
          <a-tab-pane  key="2" forceRender>
            <span slot="tab"><a-icon type="book"/>电子银行业务情况</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       :dataSource="this.khywxx"
                       :columns="dzyhywqkTable.columns"
                       rowKey="id"
                       :loading="loading"
                       :pagination="ipagination"
              />
            </a-card>
          </a-tab-pane>
        </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,putAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "yxdyMapDetailModal",
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit:true,
        model: {},
        csfjxxmodel:{},
        khywxx:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        // 房产情况
        cdkywqkTable : {
          columns: [
            {
              title: '统计月份',
              dataIndex: 'tjyf',
              key: 'tjyf',
              width: '10%',
              align: "center",
            },

            {
              title:'存款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'ckye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'blckhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'ckyezb',
                },
              ]
            },
            {
              title:'贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'dkye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'bldkhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'dkyezb',
                },
              ]
            },
            {
              title:'表内不良贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'blbldk',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'bnblhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'bnbldkzb',
                },
              ]
            },
            {
              title:'表外不良贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'bwbldk',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'bwblhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'bwbldkzb',
                },
              ]
            },

          ],
        },

        //电子银行业务情况
        dzyhywqkTable : {
          columns: [
            {
              title: '统计月份',
              dataIndex: 'tjyf',
              key: 'tjyf',
              width: '10%',
              align: "center",
            },
            {
              title: '手机银行户数',
              dataIndex: 'blsjyhhs',
              key: 'blsjyhhs',
              width: '10%',
              align: "center",
            },
            {
              title: '网上银行户数',
              dataIndex: 'blwsyhhs',
              key: 'blwsyhhs',
              width: '10%',
              align: "center",
            },
            {
              title: '社保卡（张）',
              dataIndex: 'blsbkhs',
              key: 'blsbkhs',
              width: '20%',
              align: "center",
            },
            {
              title: 'ETC（个）',
              dataIndex: 'bletchs',
              key: 'bletchs',
              width: '10%',
              align: "center",
            },
            {
              title: '信用卡（张）',
              dataIndex: 'blxykhs',
              key: 'blxykhs',
              width: '10%',
              align: "center",
            },
            {
              title: '福民卡（张）',
              dataIndex: 'blfmkhs',
              key: 'blfmkhs',
              width: '10%',
              align: "center",
            },
            {
              title: '扫码付（个）',
              dataIndex: 'blsmfhs',
              key: 'blsmfhs',
              width: '10%',
              align: "center",
            },
            {
              title: 'POS机（个）',
              dataIndex: 'blposhs',
              key: 'blposhs',
              width: '10%',
              align: "center",
            },
          ],
        },


        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/yxdygl.czxxgl/khglFjxxtjXzc/add",
          edit: "/yxdygl.czxxgl/khglFjxxtjXzc/edit",
          list: "/yxdygl.czxxgl/khglFjxxtjXzc/edit",
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
        /*this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','ssxz','xzc','rkzs','zhs','pkhs','dbhs','xdrs','ffjzrs','zdjbrs','ktxykrs','ktfmkrs','ktsmfrs'))
        });*/
        // 加载村社附加信息统计数据
        if (this.model.village) {
          let params = {"sszh":record.ssjgdm,"ssxz":record.town, "xzc": record.village}
          console.log("params"+params)
          putAction("/yxdygl_czxxgl/yxdygl_czxxgl/khfjxx", params).then(res => {
            this.csfjxxmodel = Object.assign({}, res.result);
            console.log("---村社附加信息统计-----")
            console.log(this.csfjxxmodel)
            this.$nextTick(() => {
              let fields = pick(this.csfjxxmodel, 'sszh','ssxz','xzc','rkzs','zhs','pkhs','dbhs','xdrs','ffjzrs','zdjbrs','ktxykrs','ktfmkrs','ktsmfrs','tjrq')
              this.form.setFieldsValue(fields)
              this.form.setFieldsValue({tjrq:fields.tjrq?moment(fields.tjrq):null})

            })
          });
        }
        // 加载业务信息数据
        if (this.model.village) {
          let params = {"sszh":record.ssjgdm,"xzc": record.village,"xz":record.town}
          putAction("/yxdygl_czxxgl/yxdygl_czxxgl/khywxx", params).then(res => {
            if(res.success) {
              this.khywxx =  res.result;
              console.log("---业务信息-----")
              console.log(this.khywxx)
            }
          });
        }


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

<style lang="less" scoped>

</style>