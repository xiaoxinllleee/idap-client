<template>
  <a-modal
    :title="title"
    width="80%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核项目">
              <j-dict-select-tag  v-model="model.schemeId"  placeholder="请选择考核项目" dictCode="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3"
                                  :trigger-change="true" @change="khxmChange"/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="考核月份">
            <a-month-picker placeholder="请选择考核月份" v-model="model.khsj" :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <a-tree-select
                style="width: 100%"
                v-model="value"
                allow-clear
                :tree-data="treeData2"
                :replaceFields="children"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择岗位名称"
                tree-checkable
                tree-default-expand-all
                @change="onChange"
                @search="onSearch"
                @select="onSelect"
              />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row :gutter="20" type="flex" >
          <a-col :span="6" type="auto">
            <a-card title="选择设置的机构"  :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
              <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
                <!-- 树-->
                  <div class="tree-bar">
                    <a-directory-tree
                      style="height: 40vh;overflow-y:auto;"
                      selectable
                      :defaultExpandAll="true"
                      :checkable="true"
                      :checkStrictly="false"
                      v-model="checkedKey"
                      @check="select"
                      :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                      :treeData="departTree"
                    />
                  </div>


              </div>
            </a-card>
          </a-col>
          <a-col :span="18">
            <a-button @click="FindBack(2)" type="primary" icon="plus" style="margin-bottom: 5px;">添加指标</a-button>
            <j-editable-table
              @valueChange="valueChange"
              ref="tasksetGwSetTable"
              :loading="pdzbszSetTable.loading"
              :columns="pdzbszSetTable.columns"
              :dataSource="pdzbszSetTable.dataSource"
              :maxHeight="300"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="false"/>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <accoun-gxl ref="accountZbid" @close="colseArea"></accoun-gxl>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import JEditableTable from '@/components/jeecg/JEditableTable'
import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
import JCategorySelect from '@comp/jeecg/JCategorySelect'
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import { queryDepartTreeList } from '@api/api'
import { postAction } from '@api/manage'
import AccounGxl from './AccounGxl'
import moment from "moment"

  export default {
    name: "ErpAssessTasksetGwSetModal",
    components: {
      JTreeSelect,
      JCategorySelect,
      JEditableTable,
      AccounGxl
    },

    data() {
      return {
        title:"设置",
        visible: false,
        monthFormat: 'YYYY-MM',
        defaultMonthOpera: '',
        value: undefined,
        multiple:true,
        queryParam:{},
        model: {},
        departTree: [],
        zzbz:'',
        gwbz:'',
        zbdw:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        khfs: '',
        confirmLoading: false,
        form: this.$form.createForm(this),
        checkedKeys: [{}],
        zbid: [],
        checkedKey: [],
        children: {title:'gwmc',key:'gwbz',value:'gwbz' },
        treeData2:[],
        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '指标标识',
              key: 'zbid',
              width: '20%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标名称',
              key: 'zbid_dictText',
              width: '20%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标维度',
              key: 'zbwd',
              type: FormTypes.hidden,
            },
            {
              title: '维度名称',
              key: 'zbwd_dictText',
              width: '20%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '考核方式',
              key: 'khfs',
              type: FormTypes.hidden,
            },
            {
              title: '考核方式',
              key: 'khfs_dictText',
              width: '20%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标任务',
              key: 'zbrw',
              width: '20%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              // validateRules: [{ required: true, message: '${title}不能为空' }]
            },

          ]
        }
      }
    },
    methods: {
      //岗位查询
      gwbzList(){
        getAction('/khfagl/erpAssessAljc/listKhdx', {}).then(res => {
          console.log('res.result', res.result)
          this.treeData2 = res.result

        })
      },
      select(checkedKeys, e) {
        this.checkedKey=checkedKeys;
      },
      loadTree(){
        queryDepartTreeList().then((res) => {
          this.departTree = res.result
        })
      },
      colseArea(selectionRows){
        console.log(selectionRows)
        selectionRows.forEach(row => {
          let index = this.pdzbszSetTable.dataSource.findIndex(item => item.zbid === row.zbid)
          if(index < 0) {
            this.pdzbszSetTable.dataSource.push(row)
          }
        })
      },
      FindBack(num){
        if (!this.model.schemeId) {
          this.$message.warning('请先选择需要设置的考核项目！')
          return false
        }
        this.$refs.accountZbid.init(num, this.khfs)
      },

      onChange(value) {
        console.log(value);
        this.value = value;
      },
      onSearch() {

      },
      onSelect() {

      },
      khxmChange(val) {
        console.log('khxmChange', val)
        this.$set(this.model, 'schemeId', val)
        let zbList = []
        //根据选择的考核项目获取指标
        getAction('/khlc/khfagl/pmaAScheme/queryZblistBySchemeId', {schemeId: val}).then(res => {
          console.log('queryZblistBySchemeId', res)
          if (res.success && res.result) {
            res.result.forEach(item => {
              if(item.hasOwnProperty('zbfz')) {
                this.khfs = 1
                item['khfs'] = 1
                item['khfs_dictText'] = '平衡计分卡'
              } else if(item.hasOwnProperty('zbdj')) {
                this.khfs = 3
                item['khfs'] = 3
                item['khfs_dictText'] = '按量计酬'
              }
            })
            zbList = zbList.concat(res.result)
          }
          this.pdzbszSetTable.dataSource = zbList
        })
      },
      add(){
        this.form.resetFields();
        this.gwbzList()
        this.loadTree()
        this.visible = true;
      },
      valueChange(e){
        console.log('valueChange',e)
      },

      handleOk () {
        console.log(this.model.schemeId)
        if (this.checkedKey.length ==0){
          this.$message.warning('请选择需要设置的机构！')
          return
        }
        if (this.model.schemeId == 'undefined' ||this.model.schemeId == undefined){
          this.$message.warning('请选择需要设置的考核项目！')
          return
        }
        if (this.model.khsj == null){
          this.$message.warning('请选择考核月份！')
          return
        }
        this.$refs.tasksetGwSetTable.getValues((error, values) => {
          // 错误数 = 0 则代表验证通过
          if (error === 0) {
            // 将通过后的数组提交到后台或自行进行其他处理
            console.log('tableValues', values)
            if (!values || values.length == 0) {
              this.$message.warning('请添加需要设置的指标！')
              return false
            }
            values.forEach(item => {
              item["khwd"] = item["zbwd"]
            })
            let formData = {
              'zbidList':values,
              'schemeId':this.model.schemeId,
              'zzbzLsit':this.checkedKey.join(','),
              'gwbzLsit':this.value.join(','),
            };
            //时间格式化
            formData.khsj = this.model.khsj?this.model.khsj.format("YYYY-MM")+"-01":null;
            console.log(formData)
            const that = this;
            httpAction('/farwsz/erpAssessTaskset/GwSave',formData,'post').then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          } else {
            this.$message.error('验证未通过')
          }
        })

      },
      close () {
        this.$refs.accountZbid.close()
        this.model={}
        this.checkedKey=[];
        this.value=[];
        this.checkedKeys=[];
        this.pdzbszSetTable.dataSource=[];
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