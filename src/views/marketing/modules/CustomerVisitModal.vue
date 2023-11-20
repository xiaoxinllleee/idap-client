<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--隐藏域-->
        <a-form-item><a-input type="hidden" v-decorator="[ 'yggh', {}]"/></a-form-item>
        <a-form-item><a-input type="hidden" v-decorator="[ 'khjlbh', {}]"/></a-form-item>

        <!-- 主表单区域 -->
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8"><a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-tree-select placeholder="机构名称"
                             v-decorator="['zzbz',{rules: [{ required: true, message: '请选择机构!' }]}]"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="客户经理" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-select-ygxx placeholder="客户经理"
                           type="radio"
                           v-decorator="['ygxm',{rules: [{ required: true, message: '请选择客户经理!' }]}]"
                           @selectComplete="selectComplete"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="营销单元" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag placeholder="营销单元"
                               v-decorator="['yxdy', {rules: [{ required: true, message: '请选择营销单元!' }]}]"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH"
                               :triggerChange="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="客户姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="客户姓名" v-decorator="['khmc', {rules: [{ required: true, message: '请输入客户姓名!' }]}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="证件号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="证件号码" v-decorator="['zjhm', {rules: [{ required: true, message: '请输入证件号码!' }]}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="回访日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-date placeholder="回访日期"
                    :trigger-change="true"
                    v-decorator="[ 'hfrq',{rules: [{ required: true, message: '请选择回访日期!' }]}]" style="width: 249px;"/>
          </a-form-item></a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8"><a-form-item label="回访方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag placeholder="回访方式"
                               v-decorator="['hffs', {}]"
                               :triggerChange="true"
                               dictCode="khhf_hffs"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item label="回访目的" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag placeholder="回访目的"
                                 v-decorator="['hfmd', {}]"
                                 :triggerChange="true"
                                 dictCode="khhf_hfmd"/>
          </a-form-item></a-col>
        </a-row>

        <!-- 子表单区域 -->
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="回访详情" key="1">
            <div>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item label="本次营销业务" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag placeholder="本次营销业务"
                                     v-decorator="['bcyxyw', {}]"
                                     :triggerChange="true"
                                     dictCode="khhf_yxyw"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item label="营销业务成果" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag placeholder="营销业务成果"
                                       v-decorator="['yxywcg', {}]"
                                       :triggerChange="true"
                                       dictCode="khhf_yxywcg"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item label="业务办理日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-date placeholder="业务办理日期" :trigger-change="true" v-decorator="[ 'ywblrq',{}]" style="width: 249px;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item label="潜在业务需求" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag placeholder="潜在业务需求"
                                       v-decorator="['qzywxq', {}]"
                                       :triggerChange="true"
                                       dictCode="khhf_yxyw"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item label="礼品名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input placeholder="礼品名称" v-decorator="['lpmc', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item label="礼品价值（元）" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input placeholer="礼品价值" v-decorator="[ 'lpjz', {}]"/>
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="下次回访日期">
                  <j-date placeholder="下次回访日期" :trigger-change="true" v-decorator="[ 'xchfrq',{}]" style="width: 249px;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="下次回访注意事项">
                  <a-textarea placeholder="下次回访注意事项" autosize v-decorator="['xchfzysx', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="{span: 16}" label="回访详情说明">
                  <a-textarea placeholder="回访详情说明" :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" v-decorator="['hfxqsm', {}]"/>
                </a-form-item></a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="2" forceRender>
            <a-card style="margin-top: 10px;" :bordered="false" title="图片资料">
              <j-upload text="上传图片"
                        fileType="image"
                        listType="picture"
                        class="upload-list-inline"
                        :value="imagePaths"
                        @change="imageUploadChange"/>
            </a-card>
            <a-card style="margin-top: 10px;" :bordered="false" title="视频资料">
              <j-upload text="上传视频"
                        listType="text"
                        fileType="file"
                        :value="videoPaths"
                        @change="videoUploadChange"/>
            </a-card>
            <a-card style="margin-top: 10px;" :bordered="false" title="音频资料">
              <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" class="upload-list-inline">
                <a-button><a-icon type="upload"/> 上传音频 </a-button>
              </a-upload>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import JUpload from '@/components/jeecg/JUpload'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import AFormItem from 'ant-design-vue/es/form/FormItem'

  export default {
    name: "customerVisitModal",
    components: {
      AFormItem,
      JUpload,
      JDate,
      JTreeSelect,
      JSelectYgxx,
      JSelectUserByDep
    },
    data () {
      return {
        title:"操作",
        visible: false,
        customerVisitModel: {
          customerVisitFjxxImage: [{}], //图片
          customerVisitFjxxVideo: [{}], //视频
          customerVisitFjxxAudio: [{}], //音频
        },
        imagePaths: "",
        videoPaths: "",
        audioPaths: "",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        selectSize: 'default',
        confirmLoading: false,
        optype: 'add',
        disableSubmit: false,
        form: this.$form.createForm(this),
        validatorRules:{},
        url: {
          add: "/yxgl/khhf/add",
          edit: "/yxgl/khhf/edit",
          customerVisitFjxx: "/yxgl/khhf/queryKhhffjxxByMainId",
        },
      }
    },
    created () {},
    methods: {
      add () {
        this.edit({});
        this.optype = 'add';
      },
      edit (record) {
        this.optype = 'edit';
        this.form.resetFields();
        this.customerVisitModel = Object.assign({}, record);
        this.customerVisitModel.customerVisitDetail = [{}];
        //--------------------------------------------------------
        //获取附件信息
        console.log(this.customerVisitModel.id)
        if(this.customerVisitModel.id){
          let params = {id:this.customerVisitModel.id}
          //初始化附件信息列表
          getAction(this.url.customerVisitFjxx,params).then((res)=>{
            if(res.success){
              this.customerVisitModel.customerVisitFjxxImage = res.result.fjxxImage;
              this.customerVisitModel.customerVisitFjxxVideo = res.result.fjxxVideo;
              this.customerVisitModel.customerVisitFjxxAudio = res.result.fjxxAudio;
              let path = ''
              let arr = [];
              this.customerVisitModel.customerVisitFjxxImage.forEach((array, index)=>{
                  arr.push(array.fwlj)
              })
              if(arr.length>0){
                path = arr.join(",")
              }
              this.imagePaths = path;
              path = ''
              arr = [];
              this.customerVisitModel.customerVisitFjxxVideo.forEach((array, index)=>{
                arr.push(array.fwlj)
              })
              if(arr.length>0){
                path = arr.join(",")
              }
              this.videoPaths = path;

              this.$forceUpdate()
            }
          })
        }
        //--------------------------------------------------------
        this.visible = true;
        this.$nextTick(() => {
          let fields = pick(this.customerVisitModel,
            'zzbz','yggh','khjlbh','yxdy','khmc','zjhm','hfrq','hffs','hfmd','bcyxyw',
            'yxywcg','ywblrq','qzywxq','lpmc','lpjz','hfxqsm','xchfrq','xchfzysx'
          )
          this.form.setFieldsValue(fields)
          this.form.setFieldsValue({ygxm: record.yggh_dictText})
          // this.form.setFieldsValue({hfrq:this.customerVisitModel.hfrq?moment(this.customerVisitModel.hfrq):null}) //时间格式化
          // this.form.setFieldsValue({ywblrq:this.customerVisitModel.ywblrq?moment(this.customerVisitModel.ywblrq):null}) //时间格式化
          // this.form.setFieldsValue({xchfrq:this.customerVisitModel.xchfrq?moment(this.customerVisitModel.xchfrq):null}) //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        //demo
        const that = this;
        // let message = "回访记录添加成功！";
        // if(this.optype == 'edit') {
        //   message = "回访记录修改成功！";
        // }
        // that.$message.success(message);
        // that.$emit('ok');
        // that.confirmLoading = false;
        // that.close();
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.customerVisitModel.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            let visitMainData = Object.assign(this.customerVisitModel, values);
            //时间格式化
            // visitMainData.hfrq = visitMainData.hfrq?visitMainData.hfrq.format('YYYY-MM-DD'):null;
            // visitMainData.ywblrq = visitMainData.ywblrq?visitMainData.ywblrq.format('YYYY-MM-DD'):null;
            // visitMainData.xchfrq = visitMainData.xchfrq?visitMainData.xchfrq.format('YYYY-MM-DD'):null;
            let fjxxList = [{}]
            if(this.customerVisitModel.customerVisitFjxxImage) {
              fjxxList = fjxxList.concat(this.customerVisitModel.customerVisitFjxxImage)
            }
            if(this.customerVisitModel.customerVisitFjxxVideo) {
              fjxxList = fjxxList.concat(this.customerVisitModel.customerVisitFjxxVideo)
            }
            if(this.customerVisitModel.customerVisitFjxxAudio) {
              fjxxList = fjxxList.concat(this.customerVisitModel.customerVisitFjxxAudio)
            }
            let formData = {
              ...visitMainData,
              khhffjxxList: fjxxList
            }

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
      handleChange(value) {
        console.log(`selected ${value}`);
      },
      selectComplete(selectedYgxxRows) {
        if (selectedYgxxRows[0]) {
          this.form.setFieldsValue({yggh: selectedYgxxRows[0].yggh, khjlbh: selectedYgxxRows[0].khjlbh})
        }
      },
      imageUploadChange(data) {
        // this.customerVisitModel.customerVisitFjxxImage = [];
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        console.log("path")
        console.log(path)
        console.log(paths)
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 1;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxImage.push(fjxx)
            }
          }

        })
      },
      videoUploadChange(data) {
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxVideo.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxVideo.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 2;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxVideo.push(fjxx)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }
  .ant-form-item-control {
    line-height: 0px;
  }
  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }

  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>