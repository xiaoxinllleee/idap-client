<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="6">
            <a-card title="选择设置的指标" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
              <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
                <!-- 树-->
                <a-tree
                  v-model="checkedKeys"
                  checkable
                  @check="onCheck"
                  :treeData="treeData"
                  :replaceFields="{ title:'zbmc', key:'zbid'}"
                />
              </div>
            </a-card>
          </a-col>
          <a-col :span="18">
            <j-editable-table
              @valueChange="valueChange"
              ref="pdzbszSetTable"
              :loading="pdzbszSetTable.loading"
              :columns="pdzbszSetTable.columns"
              :dataSource="pdzbszSetTable.dataSource"
              :maxHeight="300"
              :rowNumber="true"
              :rowSelection="false"
              :actionButton="false"/>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
import pick from 'lodash.pick'
import moment from 'moment'
  export default {
    name: "PdzbszSetModal",
    components: {
      JEditableTable
    },
    data() {
      return {
        title:"设置",
        visible: false,
        model: {},
        pdzq:'',
        pdrq:'',
        newDataSource:[],
        zbabs:[],
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
        checkedKeys: [],
        treeData:[],
        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '指标标识',
              key: 'zbid',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标分值',
              key: 'zbfz',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '加减标识',
              key: 'zbabs',
              width: '10%',
              type: FormTypes.select,
              options: [
                {text: '加', value: '1'},
                {text: '减', value: '-1'},
                {text: '加减', value: '0'},
                {text: '减加', value: '2'},
                {text: '固定值', value: '3'},
                {text: '其他', value: '4'},
              ],
              defaultValue: '',
              placeholder: '请选择${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '加权比率(%)',
              key: 'jqbl',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '加权分值',
              key: 'jqfz',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '加权限制分值',
              key: 'jqxzfz',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权比率(%)',
              key: 'kqbl',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权分值',
              key: 'kqfz',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权限制分值',
              key: 'kqxzfz',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        }
      }
    },
    methods: {

      add(queryParam){
        this.visible = true
        this.init(queryParam)
        this.pdzq=queryParam.pdzq
        this.pdrq=queryParam.pdrq
      },

      init(queryParam) {
        //获取指标库
        console.log('queryParam', queryParam)
        getAction('/pdzbk/pdzbk/listall', {zbwd: queryParam.pdzq}).then(res => {
          console.log('res.result', res.result)
          this.treeData = res.result
        })
        this.visible = true
      },

      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
        //table中增加记录
        checkedKeys.forEach(key => {
          let exists = this.pdzbszSetTable.dataSource.filter(item => item.id == key)
          if(exists.length === 0) {
            this.pdzbszSetTable.dataSource.push({id: key, zbid: key})
          }
        })
        this.pdzbszSetTable.dataSource = this.pdzbszSetTable.dataSource.filter(item => checkedKeys.includes(item.id))

      },

      valueChange(e){
        console.log('valueChange',e)
        this.newDataSource=e.newDataSource
        this.zbabs =e.row
        //添加字段zbabs,给字段设置值
        this.newDataSource.forEach((item,index) =>{
          if (item.zbid == this.zbabs.zbid){
            Object.assign(item,{zbabs:this.zbabs.zbabs})
          }
        })
      },

      handleOk () {
        console.log(this.newDataSource)
        console.log(this.zbabs)
        if(this.newDataSource.length === 0){
          this.$message.warning('指标分值不能为空，请检查数据项！')
          return
        }
        let formData = {
          'pdzq':this.pdzq,
          'pdrq':this.pdrq,
          'pdzbsz':this.newDataSource,
        }
        console.log(formData)
        const that = this;
        httpAction('/pdzbsz/pdzbsz/save',formData,'post').then((res)=>{
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

      },
      close () {
        this.checkedKeys=[];
        this.pdzbszSetTable.dataSource=[];
        this.pdzq='';
        this.pdrq='';
        this.newDataSource=[];
        this.$emit('close');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style scoped>

</style>