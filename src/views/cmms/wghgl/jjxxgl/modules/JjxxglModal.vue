<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机具编号">
              <a-input placeholder="请输入机具编号" v-decorator="['jjbh', {rules: [{ required: true, message: '请输入机具编号!' }]}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机具名称">
              <a-input placeholder="请输入机具名称" v-decorator="['jjmc', {rules: [{ required: true, message: '请输入机具名称!' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
                :treeDefaultExpandAll=true
              />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属网格">
              <a-tree-select
                style="width:100%"
                show-search
                :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                :treeData="gridTree"
                v-decorator="['wgbh', {}]"
                placeholder="请选择所属网格"
                treeNodeFilterProp="title"
                :loadData="loadGridData"
                :replaceFields="{ title:'wgmc', key:'id', value:'id'}"/>
              <!--<a-input placeholder="请输入网格编号" v-decorator="['wgbh', {}]" />-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="维护员工">
              <j-select-ygxx v-decorator="['yggh', {}]" placeholder="请选择员工" ref="ygxx" @change="getYggh"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机具类型">
              <a-input placeholder="请输入机具类型" v-decorator="['jjlx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="布放日期">
              <a-date-picker v-decorator="[ 'bfrq', {}]" />
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
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'

  export default {
    name: "JjxxglModal",
    components: {
      JTreeSelect, JSelectYgxx
    },
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
        gridTree: [],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/wghgl/jjxxgl/add",
          edit: "/wghgl/jjxxgl/edit",
          queryAreaTreeList: '/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate',
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
        //获取网格树
        getAction(this.url.queryAreaTreeList, {previousLevel: '1', pId: '0'}).then(res => {
          if (res.success) {
            // this.expandedAreaKeys.push(res.result[0].id)
            this.gridTree = res.result
          }
        })
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jjbh','jjmc','zzbz','wgbh','yggh','jjlx','bz'))
		  //时间格式化
          this.form.setFieldsValue({bfrq:this.model.bfrq?moment(this.model.bfrq):null})
        });
      },
      loadGridData(treeNode) {
        return new Promise(resolve => {
          console.log('loadGridData', treeNode, treeNode.dataRef)
          const {id} = treeNode.dataRef
          //获取网格树
          getAction(this.url.queryAreaTreeList, {previousLevel: '1', pId: id}).then(res => {
            if (res.success) {
              treeNode.dataRef.children = res.result
              this.gridTree = [...this.gridTree]
              // this.expandedAreaKeys.push(res.result[0].id)
            }
            console.log('gridTree', this.gridTree)
            resolve()
          })
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.bfrq = formData.bfrq?formData.bfrq.format("YYYY-MM-DD"):null;
            formData.yggh = formData.yggh.yggh

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
      getYggh: function (value) {
        console.info('getYggh - value -',value);
        // this.yggh = value.yggh;
        // this.ygxm = value.ygxm;
      },

    }
  }
</script>

<style lang="less" scoped>

</style>