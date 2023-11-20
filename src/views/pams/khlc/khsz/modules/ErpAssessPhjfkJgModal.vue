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
              <j-dict-select-tag  v-model="model.schemeId"  placeholder="请选择考核项目" :trigger-change="true" @change="khxmChange"
                                  dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type!=3" showSearch/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计分制">
              <j-dict-select-tag  v-model="model.jfz"  placeholder="请选择计分制" dictCode="jfz"/>
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
              ref="phjfkJgSetTable"
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
    <accoun-phjfk ref="accountZbid" @close="colseArea"></accoun-phjfk>
  </a-modal>
</template>

<script>
import { getAction, httpAction, postAction } from '@/api/manage'
import JEditableTable from '@/components/jeecg/JEditableTable'
import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
import JCategorySelect from '@comp/jeecg/JCategorySelect'
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import AccounPhjfk from './AccounPhjfk'
import { queryDepartTreeList } from '@api/api'

  export default {
    name: "ErpAssessAljcSetModal",
    components: {
      JTreeSelect,
      JCategorySelect,
      JEditableTable,
      AccounPhjfk
    },

    data() {
      return {
        title:"设置",
        visible: false,
        value: undefined,
        multiple:true,
        queryParam:{},
        treeDataSimpleMode:[{
          id:this.zzbz,pId:this.zzbz,value:this.zzbz
        }],
        model: {},
        zbabs: [],
        zbid: [],
        departTree: [],
        zzbz:'',
        gwbz:'',
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
        checkedKeys: [{}],
        checkedKey: [],
        children: {title:'gwmc',key:'gwbz',value:'gwbz' },
        treeData2:[],
        treeData3:[],
        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '指标标识',
              key: 'zbid',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标名称',
              key: 'zbid_dictText',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '指标维度',
              key: 'zbwd',
              type: FormTypes.hidden,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '维度名称',
              key: 'zbwd_dictText',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '指标分值',
              key: 'zbfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '加减标识',
              key: 'zbabs',
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
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '加权比率(%)',
              key: 'jqbl',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请选择${title}',
              validateRules: []
            },
            {
              title: '加权比率分值',
              key: 'jqblfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '加权限制分值',
              key: 'xzfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权比率(%)',
              key: 'kqbl',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权比率分值',
              key: 'kqblfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '减权限制分值',
              key: 'kqxzfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },

            {
              title: '指标权重(%)',
              key: 'zbqz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [],
            },

          ]
        }
      }
    },
    created () {
    },
    methods: {
      select(checkedKeys, e) {
        this.checkedKey=checkedKeys;
      },
      loadTree(){
        queryDepartTreeList().then((res) => {
          this.departTree = res.result
        })
      },


      colseArea(selectionRows){
        console.log('colseArea selectionRows', selectionRows)
        selectionRows.forEach(row => {
          let index = this.pdzbszSetTable.dataSource.findIndex(item => item.zbid === row.zbid)
          if(index < 0) {
            this.pdzbszSetTable.dataSource.push(row)
          }
        })
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
                item['khfs'] = 1
                item['khfs_dictText'] = '平衡计分卡'
              } else if(item.hasOwnProperty('zbdj')) {
                item['khfs'] = 3
                item['khfs_dictText'] = '按量计酬'
              }
            })
            zbList = zbList.concat(res.result)
          }
          this.pdzbszSetTable.dataSource = zbList
        })
      },
      FindBack(num){
        if (!this.model.schemeId) {
          this.$message.warning('请先选择需要设置的考核项目！')
          return false
        }
        this.$refs.accountZbid.init(num)
      },

      add(){
        this.form.resetFields();
        this.loadTree()
        this.model.jfz = '1'
        this.visible = true;
      },

      valueChange(e){
        console.log('valueChange',e)
      },

      handleOk () {
        if (this.checkedKey.length ==0){
          this.$message.warning('请选择需要设置的机构！')
          return
        }
        if (this.model.schemeId == 'undefined' ||this.model.schemeId == undefined){
          this.$message.warning('请选择需要设置的考核项目！')
          return
        }
        if (this.model.jfz == 'undefined' ||this.model.jfz == undefined){
          this.$message.warning('请选择计分制！')
          return
        }

        this.$refs.phjfkJgSetTable.getValues((error, values) => {
          // 错误数 = 0 则代表验证通过
          if (error === 0) {
            // 将通过后的数组提交到后台或自行进行其他处理
            console.log('tableValues', values)
            if (!values || values.length == 0) {
              this.$message.warning('请添加需要设置的指标！')
              return false
            }
            let formData = {
              'zbidList':values,
              'schemeId':this.model.schemeId,
              'jfz':this.model.jfz,
              'zzbzLsit':this.checkedKey.join(','),
            }
            console.log(formData)
            const that = this;
            httpAction('/khfagl/erpAssessPhjfk/JgSave',formData,'post').then((res)=>{
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