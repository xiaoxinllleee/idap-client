<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="16">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属机构">
              <j-tree-select
                v-decorator="['zzbz',{rules: [{ required: true, message: '请选择机构!' }]}]"
                placeholder="请选择机构"
                dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                pidField="sjzzbz"
                :disabled="true"
                :treeDefaultExpandAll=true
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="申请人">
              <a-input placeholder="请输入申请人" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="信用等级">
              <j-dict-select-tag placeholder="请选择信用等级" v-decorator="['xydj', {rules: [{ required: true, message: '请选择信用等级!' }]}]"
                                 :triggerChange="true" dictCode="rate_xydj"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="授信期限起">
              <a-date-picker v-decorator="[ 'sxqxBegin', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="授信期限止">
              <a-date-picker v-decorator="[ 'sxqxEnd', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最高授信额度">
              <a-input-number placeholder="请输入最高授信额度(万元)" style="width: 250px"
                              :formatter="value => value? `${value}万元` : ''"
                              :parser="value => value.replace('万', '').replace('元','')"
                              v-decorator="['zgsxed', {rules: [{ required: true, message: '请输入最高授信额度(万元)!' }]}]" />

            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="已使用授信额">
              <a-input-number placeholder="请输入已使用授信额(万元)" style="width: 250px"
                              :formatter="value => value? `${value}万元` : ''"
                              :parser="value => value.replace('万', '').replace('元','')"
                              v-decorator="['yysxed', {rules: [{ required: true, message: '请输入已使用授信额(万元)!' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="内部授信额度">
              <a-input-number placeholder="请输入内部授信额度(万元)" style="width: 250px"
                              :formatter="value => value? `${value}万元` : ''"
                              :parser="value => value.replace('万', '').replace('元','')"
                              v-decorator="['nbsxed', {}]" />

            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="公开授信额度">
              <a-input-number placeholder="请输入公开授信额度(万元)" style="width: 250px"
                              :formatter="value => value? `${value}万元` : ''"
                              :parser="value => value.replace('万', '').replace('元','')"
                              v-decorator="['gksxed', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="授信资料">
              <JUploadOne
                v-decorator="['fjxxList[0]', rules.sxzl]"
                text="上传附件"
                class="upload-list-inline"
                @change="(data)=>imageUploadChange(data, '1')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="其他资料">
              <JUploadOne
                v-decorator="['fjxxList[2]',{}]"
                text="上传附件"
                class="upload-list-inline"
                @change="(data)=>imageUploadChange(data, '3')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left" style="color: #1890FF;" v-if="model.id">已上传附件</a-divider>
        <a-table bordered
                 size="middle"
                 rowKey="id"
                 :dataSource="khzl.data"
                 :columns="khzl.columns"
                 :pagination="false"
                 :loading="khzl.loading"
                 v-if="model.id">
              <span slot="action" slot-scope="text, record">
                <a @click="view(record)">预览</a>
                <a-divider type="vertical" />
                <a @click="down(record)">下载</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => doDelete(record)">
                        <a>删除</a>
                </a-popconfirm>
              </span>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import store from '@/store/'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  let Base64 = require('js-base64').Base64;
  export default {
    name: "DkspSxspModal",
    components: {
      JTreeSelect, JUploadOne
    },
    props: {
      modalCreated: {
        type: Boolean,
        required: false,
        default: false
      },
      modalParam: {
        type: Object,
        required: false,
      }
    },
    watch: {
      modalCreated: {
        immediate: true,
        handler(val) {
          console.log('watch modalCreated', val)
          if (val) {
            this.showModal()
          }
        }
      }
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        disableSubmit: false,
        zzbz: '',
        spedBegin: '',
        spedEnd: '',
        deleteFiles: [],
        confirmLoading: false,
        form: this.$form.createForm(this),
        rules: {
          sxzl: { rules: [{ required: true, message: '请上传授信资料!' }] },
        },
        url: {
          add: "/dksp/sxsp/add",
          edit: "/dksp/sxsp/edit",
        },
        khzl: {
          data: [],
          columns: [
            {
              title: '附件名称',
              dataIndex: 'zlmc',
              align:"center",
            },
            {
              title: '附件类型',
              dataIndex: 'zllx_dictText',
              align:"center",
            },
            {
              title: '上传人',
              dataIndex: 'scr',
              align:"center",
            },
            {
              title: '上传时间',
              dataIndex: 'scsj',
              align:"center",
            },
            {
              title: ' 操作',
              dataIndex: 'action',
              align:"center",
              scopedSlots: { customRender: 'action' },
            },
          ],
          loading: false
        },
      }
    },
    created () {
      console.log('store.getters.userInfo', store.getters.userInfo)
      this.zzbz = store.getters.userInfo.orgCode
    },
    methods: {
      add () {
        this.edit({zzbz: this.zzbz});
      },
      spEdit(id) {
        getAction('/dksp/sxsp/queryById', {id: id}).then(res => {
          this.edit(res.result)
        })
      },
      showModal() {
        this.spEdit(this.modalParam.tableId)
        this.title = "详情";
        this.disableSubmit = true;
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        if(record.result == '0' || record.result == '3' || !record.processId) {
          this.disableSubmit = false
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','khmc','zjhm','xydj','zgsxed','yysxed','nbsxed','gksxed'))
		  //时间格式化
          this.form.setFieldsValue({sxqxBegin:this.model.sxqxBegin?moment(this.model.sxqxBegin):null})
          this.form.setFieldsValue({sxqxEnd:this.model.sxqxEnd?moment(this.model.sxqxEnd):null})
        });
        //获取机构设置的审批金额区间
        // getAction('/dksp/edsz/queryByZzbz', {zzbz: this.zzbz}).then(res => {
        //   this.spedBegin = res.result.spedBegin
        //   this.spedEnd = res.result.spedEnd
        // })
        //获取其他信息
        if (record.id) {
          //获取附件信息
          getAction('/dksp/khzl/queryByKhid', {khid: record.id}).then(res => {
            if (res.success) {
              if (res.result) {
                this.khzl.data = res.result
                if (res.result && res.result.length > 0) {
                  this.rules.sxzl = {}
                }
              }
            }
          })
        }
      },
      close () {
        this.$emit('ok');
        this.form.setFieldsValue({fjxxList: null})
        this.rules.sxzl = { rules: [{ required: true, message: '请上传授信资料!' }] }
        this.deleteFiles = []
        this.visible = false;
        this.$emit('modalClose')
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
            formData.sxqxBegin = formData.sxqxBegin?formData.sxqxBegin.format('YYYY-MM-DD'):null;
            formData.sxqxEnd = formData.sxqxEnd?formData.sxqxEnd.format('YYYY-MM-DD'):null;

            //附件信息
            let fjxxList = formData.fjxxList
            let dkspSxzlList = []
            fjxxList.forEach((fjxx, index) => {
              if (fjxx) {
                console.log('fjxx', fjxx)
                let khzl = {zlmc: fjxx.name,fwlj: fjxx.path, zllx: index + 1}
                dkspSxzlList.push(khzl)
              }
            })
            formData.dkspSxzlList = dkspSxzlList
            formData.deleteFiles = this.deleteFiles
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                //如果需要审批，弹出提示，需要进入我的申请中进行提交
                let process = res.result.process
                if (process) {
                  this.$Modal.confirm({
                    title: "操作成功",
                    content:
                      `当前为"草稿"状态，建议立即到<我的申请>中提交该审批流程，是否立即跳转到我的申请?`,
                    onOk: () => {
                      this.$router.push({
                        path:'/activiti/apply-manage/applyManage'
                      });
                    }
                  });
                } else {
                  that.$message.success(res.message);
                }
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
      imageUploadChange(data, type) {
        let path = data.path
        console.log('imageUploadChange', data, type)
      },
      down(record){
        console.log(record)
        //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
        window.open(
          `${window._CONFIG['staticDomainURL']}/`+ record.fwlj
        );
      },
      view(record){
        console.log(record)
        let url= `${window._CONFIG['staticDomainURL']}/`+ record.fwlj;
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(Base64.encode(url))

        );
      },
      doDelete(record) {
        console.log('doDelete', record)
        this.deleteFiles.push(record.id)
        this.khzl.data = this.khzl.data.filter(item => {
          return item.id != record.id
        })
        //判断还有没有附件
        let fjxxList = this.form.getFieldValue("fjxxList")
        console.log(fjxxList, this.khzl.data)
        if ((!fjxxList[0] || fjxxList.length === 0) && this.khzl.data.length === 0) {
          this.rules.sxzl = { rules: [{ required: true, message: '请上传授信资料!' }] }
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>