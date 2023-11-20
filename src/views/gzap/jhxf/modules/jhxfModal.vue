<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    :title="title"
    :visible="visible"
    :width="900"
    :okButtonProps="{ props: {disabled: confirmbutton} }"
    @cancel="handleCancel"
    @ok="handleOk">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划类型">
              <a-select placeholder="请选择工作类型"   v-decorator="['gzlx', {rules: [{ required: true, message: '请选择工作类型!' }]}]" >
                <a-select-option value="2" @click="gzlx1(1)">月工作计划</a-select-option>
                <a-select-option value="1" @click="gzlx1(2)">周工作计划</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              v-if="yjh"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划月份">
              <a-month-picker @change="onChange"  v-model="jhyf" placeholder="请选择月份" style="width: 321px"/>
            </a-form-item>
            <a-form-item
              v-if="zjh"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划周数">
              <a-week-picker  @change="onChange" v-model="jhzs" placeholder="请选择周数" style="width: 321px"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>

        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划开始日期">
              <a-date-picker
                disabled
                placeholder="计划开始日期"
                style="width:100%"
                v-model="this.model.jhkssj"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划结束日期">
              <a-date-picker
                disabled
                placeholder="计划结束日期"
                style="width:100%"
                v-model="this.model.jhjssj"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划概述">
<!--              <a-input placeholder="请输入计划概述" v-decorator="['gs', {}]"/>-->
              <a-textarea placeholder="请输入计划概述" :rows="4" style="width: 100%" v-decorator="['gs', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-textarea placeholder="请输入备注" :rows="4" style="width: 100%" v-decorator="['bz', {}]"/>
            </a-form-item>
          </a-col>
        <!--  <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="状态">
              <a-input placeholder="请输入状态" v-decorator="['zt', {}]"/>
            </a-form-item>
          </a-col>-->
        </a-row>
        <a-row>
         <!-- <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划内容">
              <a-input placeholder="请输入计划内容" v-decorator="['nr', {}]"/>
            </a-form-item>
          </a-col>-->

        </a-row>
        <a-row>
        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="计划下发_客户经理" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
          :ref="refKeys[0]"
          :loading="jhxf_khjlTable.loading"
          :columns="jhxf_khjlTable.columns"
          :dataSource="jhxf_khjlTable.dataSource"
          :maxHeight="300"
          :rowNumber="true"
          :rowSelection="true"
          :actionButton="true"
          v-if="khjlqk1">
          <template v-slot:khjl="props">
            <j-select-user-by-dep  :value="props.text" :selectId="props.rowId"  @change="GetValue"/>
          </template>
        </j-editable-table>
          <j-editable-table
            :ref="refKeys[0]"
            :loading="jhxf_khjlTable.loading"
            :columns="jhxf_khjlTable1.columns"
            :dataSource="jhxf_khjlTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"
            v-if="khjlqk">
            <template v-slot:khjl="props">
              <j-select-user-by-dep  :value="props.text" :selectId="props.rowId"  @change="GetValue"/>
            </template>
          </j-editable-table>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import ARow from 'ant-design-vue/es/grid/Row'
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import { httpAction, getAction } from '@/api/manage'
  import { VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'

  export default {
    name: 'jhxfModal',
    components: { ARow,JSelectUserByDep},
    mixins: [JEditableTableMixin],
    data() {
      return {
        confirmbutton:false,
        khjlqk:true,
        khjlqk1:false,
        model: {
          khjl:null,
          jhkssj:null,
          jhjssj:null,
        },
        khjl:null,
        jhyf:null,
        jhzs:null,
        khjlmc:[],
        yjh:null,
        zjh:null,
        jhsjflag:null,
        selectId:null,
        jhkssj:null,
        jhjssj:null,
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['jhxf_khjl', ],
        activeKey: 'jhxf_khjl',
        // 计划下发_客户经理
        jhxf_khjlTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '计划对象',
              key: 'jhdx',
              type: FormTypes.slot,
              defaultValue: '',
              placeholder: '请输入${title}',
              slotName: 'khjl',
              width:'300px',
            },
            {
              title: '计划内容',
              key: 'nr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              width:'400px',
            },
            {
              title: '实际完成情况',
              key: 'sjwcqk',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              slotName: 'sjwcqk',
              width:'250px',
            }, {
              title: '实际完成时间',
              key: 'sjwcrq',
              type: FormTypes.date,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '完成状态',
              key: 'wczt',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择完成状态',
              options: [ // 下拉选项
                { title: '已完成', value: '1' },
                { title: '未完成', value: '2' },
              ],
            },
          ]
        },
        jhxf_khjlTable1: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '计划对象',
              key: 'jhdx',
              type: FormTypes.slot,
              defaultValue: '',
              placeholder: '请输入${title}',
              slotName: 'khjl',
              width:'300px',
            },
            {
              title: '计划内容',
              key: 'nr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/gzap_jhxf/jhxf/add",
          edit: "/gzap_jhxf/jhxf/edit",
          jhxf_khjl: {
            list: '/gzap_jhxf/jhxf/queryjhxf_khjlByMainId'
          },
        }
      }
    },
    methods: {
        moment,
      GetValue(value){
        this.$refs.jhxf_khjl.setValues([
          {
            rowKey: value.id,
            values: { // 在这里 values 中的 name 是你 columns 中配置的 key
              'jhdx': value.user,
            }
          },
        /*  {
            rowKey: value.id,
            values: { // 在这里 values 中的 name 是你 columns 中配置的 key
              'kh': value.user,
            }
          },*/
        ])
      },
      onChange(date) {
        let startDate = moment(date).day(1).format('YYYY-MM-DD'); // 周一日期
        let endDate = moment(date).day(7).format('YYYY-MM-DD'); // 周日日期
        let jhkssjstr =moment(date).day(1).format('YYYY-MM-DD');
        let jhjssjstr =moment(date).day(7).format('YYYY-MM-DD');
        if(this.jhsjflag==1){
          this.model.jhkssj=  moment(moment(date).year()+"-"+(moment(date).month()+1)+"-01", 'YYYY-MM-DD');
          this.model.jhjssj=   moment(moment(date).year()+"-"+(moment(date).month()+1)+"-"+moment(date).daysInMonth(), 'YYYY-MM-DD');
        }else{
          this.model.jhkssj=  moment(jhkssjstr, 'YYYY-MM-DD');
          this.model.jhjssj=  moment(jhjssjstr, 'YYYY-MM-DD');
        }
      },
      gzlx1(x){
        if(x==1){
          this.jhsjflag=1;
          this.yjh=true;
          this.zjh=false;
        }else{
          this.jhsjflag=2;
          this.yjh=false;
          this.zjh=true;
        }
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'gzlx', 'jhkssj', 'jhjssj', 'gs', 'nr', 'zt', 'bz', ))
            // 时间格式化
            this.form.setFieldsValue({ jhkssj: this.model.jhkssj ? moment(this.model.jhkssj) : null })
            this.form.setFieldsValue({ jhjssj: this.model.jhjssj ? moment(this.model.jhjssj) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.jhxf_khjl.list, params, this.jhxf_khjlTable)
        }
      },
      /** 查询某个tab的数据 */
      requestSubTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
       /*   console.info(res.result)
          for (let resultKey in res.result) {
            if(res.result[resultKey].wczt==1){
              res.result[resultKey].wczt="已完成"
              alert(res.result[resultKey].wczt)
            }else if(res.result[resultKey].wczt==2) {
              res.result[resultKey].wczt="未完成"
              alert(res.result[resultKey].wczt)
            }
          }*/
          tab.dataSource = res.result || []
        }).finally(() => {
          tab.loading = false
        })
      },
      handleOk() {
        /** 触发表单验证 */
        this.getAllTable().then(tables => {
          /** 一次性验证主表和所有的次表 */
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          if (typeof this.classifyIntoFormData !== 'function') {
            throw this.throwNotFunction('classifyIntoFormData')
          }
          let formData = this.classifyIntoFormData(allValues)
          // 发起请求
          formData.zt="1";
          console.info(formData)
          return this.request(formData)
        }).catch(e => {
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
          } else {
            console.error(e)
          }
        })
      },
      request(formData) {
        let url = this.url.add, method = 'post'
        if (this.model.id) {
          url = this.url.edit
          method = 'put'
        }
        this.confirmLoading = true
        httpAction(url, formData, method).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message,5)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        main.jhkssj = main.jhkssj ? main.jhkssj.format() : null;
        main.jhjssj = main.jhjssj ? main.jhjssj.format() : null;
        return {
          ...main, // 展开
          jhxf_khjlList: allValues.tablesValue[0].values,
        }
      },
      add() {
        this.jhkssj="";
        this.jhwcsj="";
        this.jhyf="";
        this.jhzs="";
        this.zjh="";
        this.yjh="";
        this.khjlqk=true;
        this.khjlqk1=false;
        this.confirmbutton=false;
        // 默认新增空数据
        let rowNum = this.addDefaultRowNum
        if (typeof rowNum !== 'number') {
          rowNum = 1
          console.warn('由于你没有在 data 中定义 addDefaultRowNum 或 addDefaultRowNum 不是数字，所以默认添加一条空数据，如果不想默认添加空数据，请将定义 addDefaultRowNum 为 0')
        }
        this.eachAllTable((item) => {
          item.add(rowNum)
        })
        this.edit({})
      },
      /** 当点击了编辑（修改）按钮时调用此方法 */
      edit(record) {
        if(record.id){
          this.khjlqk=false;
          this.khjlqk1=true;
          this.confirmbutton=true;
          this.yjh=false,
            this.zjh=false
      console.info(record)
        }
        this.visible = true
        this.activeKey = this.refKeys[0]
        this.form.resetFields()
        this.model = Object.assign({}, record)
        if(record.id) {
          this.model.jhkssj=moment(record.jhkssj, 'YYYY-MM-DD');
          this.model.jhjssj=moment(record.jhjssj, 'YYYY-MM-DD');
        }
        if (typeof this.editAfter === 'function') this.editAfter(this.model)
      },
    }
  }
</script>
