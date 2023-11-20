<template>
  <a-modal
    :title="title"
    width="80%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提醒年份">
          <a-date-picker v-decorator="[ 'tjnf', {}]" />
        </a-form-item>-->
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <a-input :disabled="true"  placeholder="请输入机构代码" v-decorator="['jgdm', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input :disabled="true" placeholder="请输入证件号码" v-decorator="['zjhm', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单户贷款金额">
              <a-input :disabled="true" placeholder="请输入单户贷款金额"  v-decorator="['dkje', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单户贷款余额">
              <a-input :disabled="true" placeholder="请输入单户贷款余额"   v-decorator="['dkye', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最新借款日期">
              <a-date-picker
                :disabled="true"
                placeholder="请输入最新借款日期"
                style="width:100%"
                v-decorator="[ 'jkrq', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="检查到期日期">
              <a-date-picker
                :disabled="true"
                placeholder="请输入检查到期日期"
                style="width:100%"
                v-decorator="[ 'dqrq', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input :disabled="true" placeholder="请输入客户名称"  v-decorator="['khmc', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="附件类型">
              <j-dict-select-tag placeholder="请输入附件类型" v-decorator="['txlx', {}]" dict-code="dhjcfjlx" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="未上传报告类型">
              <a-input placeholder="请输入未上传报告类型" v-decorator="['wsc', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="本次贷后检查是否已完成">
              <j-dict-select-tag placeholder="请输入本次贷后检查是否已完成" v-decorator="['bcnjsfywc', {}]" dict-code="sfbz" :trigger-change="true" :disabled="sfnj"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-card>
          <form>
            <a-table :columns="columns_fjxx"
                     :dataSource="dataSource_fjxx"
                     :pagination="false" >
                <span slot="action" slot-scope="text, record">
               <!--    <a @click="view(record)">预览</a>
                   <a-divider type="vertical" />-->
                   <a @click="down(record)">下载</a>
                    <!-- <a-divider type="vertical" />
                    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                      <a>删除</a>
                    </a-popconfirm>-->
                </span>
            </a-table>
          </form>
        </a-card>

        <a-card>
          <a-row class="form-row" :gutter="24">
          <!--  <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="附件年份">
                <a-select  @change="selectValue" placeholder="请选择" style="width : 100%">
                  <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->
            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="文件类型">
                <a-select placeholder="请选择文件类型" v-model="zllx"  style="width: 100%;">
                  <a-select-option value="1">第一季度</a-select-option>
                  <a-select-option value="2">第二季度</a-select-option>
                  <a-select-option value="3">第三季度</a-select-option>
                  <a-select-option value="4">第四季度</a-select-option>
                  <a-select-option value="5">上半年</a-select-option>
                  <a-select-option value="6">下半年</a-select-option>
                  <a-select-option value="7">年度</a-select-option>
                  <a-select-option value="8">首发</a-select-option>
                </a-select>
                <!--<j-dict-select-tag placeholder="请选择类型" @input="zllxChange" v-model="zllx"  dictCode="eweb:DKJKPT_DHJCBGJDCS,name,id"
                                   style="width : 100%" />-->
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="备注">
                <a-textarea placeholder="" v-model="bz" style="width : 100%"/>
              </a-form-item>
            </a-col>
          </a-row>


          <a-upload-dragger
            name="file"
            :multiple="true"
            :action="uploadAction"
            :data="{biz:'dhjczllr/'+bizPath}"
            @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox"/>
            </p>
            <p class="ant-upload-text">
              请上传贷后检查报告或检查表，可另附现场照片，支持word、excel、jpg等文档、照片格式
            </p>

          </a-upload-dragger>
        </a-card>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { deleteAction, downFile, getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JInput from '@comp/jeecg/JInput'

  export default {
    name: "FxgljcDhjctxModal",
    components: {
      JTreeSelect,JInput
    },
    data () {
      return {
        title:"操作",
        visible: false,
        flag: true,
        sfnj:false,
        bz: '',
        fjnf: '',
        zllx: '',
        bizPath: '',
        model: {},
        fjxxList: [],
        imgdate: {},
        dataSource_fjxx: [],
        uploadAction: window._CONFIG['domianURL'] + "/sys/common/upload",
        columns_fjxx: [
          {
            title: '文件名称',
            dataIndex: 'wjlj',
            align: 'center',
            key: 'wjlj',
            customRender: function (text) {
              return !text ? "" : (text.length > 0 ? text.substr(text.lastIndexOf("/")+1) : text)
            },
          },
          {
            title: '文件类型',
            dataIndex: 'fjsjjd_dictText',
            align: 'center',
            key: 'fjsjjd'
          },

          {
            title: '备注',
            dataIndex: 'bz',
            align: 'center',
            key: 'bz'
          },
          {
            title: '上传人',
            dataIndex: 'lrr',
            align: 'center',
            key: 'lrr'
          },
          {
            title: '上传时间',
            dataIndex: 'lrsj',
            align: 'center',
            key: 'lrsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
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
          add: "/dhjctx110/fxgljcDhjctx/add",
          edit: "/dhjctx110/fxgljcDhjctx/edit",
          delete:"/dhjcfjxx/dkjkptDhjcFjxx/delete"
        },
      }
    },
    created () {
      this.init()
    },
    methods: {
      down(record){
        console.log('文件路径:',record.fwlj)
        console.log('文件路径:',record)
         window.open(
           `${window._CONFIG['downloadDomainURL']}/`+ record.fwlj
         )
      },
      selectValue(val) {
        console.log(val)
        this.fjnf = val;
      },
      init() {
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.dateValue = year;
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + '-01-01'), label: ((year - i) + '')});
        }
      },
      zllxChange(val) {
        console.log(val)
        if (val == '' || val == 'undefined') {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          let fileObject = info.file
          let fileList = info.fileList;

          /*let fjsja = moment(this.fjnf).format("YYYY")+"-01-01";*/
          fileList.forEach(item => {
            if (item.uid.indexOf(fileObject.uid) != -1) {
              item.name = this.zllx + '_' + item.name
            }
          })
          console.log(this.fjnf)
          this.fjxxList = fileList;
          this.$message.success(`${info.file.name} 文件上传成功.`);
          //this.flag = true
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`);
        }
      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm','khjlgh','khmc','zjhm','dkje','dkye','txlx','wsc','bcnjsfywc'))
		  //时间格式化
          this.form.setFieldsValue({jkrq:this.model.jkrq?moment(this.model.jkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
        });
        if (this.model.bcnjsfywc ==='1'){
          this.sfnj=true
        }else {
          this.sfnj=false
        }
        getAction('/dhjcfjxx/dkjkptDhjcFjxx/queryFjxx', { 'jgdm':record.jgdm,'zjhm': record.zjhm }).then((res) => {
          this.dataSource_fjxx = res.result
        })

      },
      close () {
        this.$emit('close');
        this.flag = true;
        this.zllx = '';
        this.bz = '';
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
              httpurl+=this.url.edit;
               method = 'put';

            this.imgdate = {"imgdate": this.fjxxList}
            let formData = Object.assign(this.model, values,this.imgdate,{
              "zllx": this.zllx,
              "fjnf": this.fjnf,
              "bz": this.bz,
            });
            //时间格式化
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;

            console.log(formData)
            console.log(formData.zllx)
            console.log(formData.imgdate)
            if (formData.dkje >= 3000000){
              if (formData.zllx == '' || formData.imgdate.length >0){
                this.$message.warning('请选择文件类型和附件上传！')
                that.confirmLoading = false;
                return
              }
            }
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
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { jgdm: record.jgdm,zjhm:record.zjhm }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            this.loadFjxxData(record.zjhm)
          } else {
            that.$message.warning(res.message)
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>

</style>