<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属父项目">
              <!--              <a-input placeholder="请输入父项目编号" v-decorator="['fxmbh', {}]"/>-->
              <j-dict-select-tag placeholder="请选择所属父项目" v-model="model.fxmbh" dict-code="v_khpjsx_pjsxfxm,sjxmc,sjxid,"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="项目概述">
              <a-input placeholder="请输入项目概述" v-decorator="['xmmc', {rules: [{required: true, message: '请输入项目编号!'}]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="项目编号">
<!--              <a-input :disabled="this.xmbhDisable" placeholder="请输入项目编号" v-decorator="['xmbh', validatorRules.xmbh ]"/>-->
              <a-input :disabled="true" placeholder="请输入项目编号" v-model="model.fxmbh"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型">
<!--              <a-input placeholder="请输入客户类型" v-decorator="['khlx', {}]"/>-->
              <j-dict-select-tag :disabled="this.khlxDisable" placeholder="请选择客户类型" v-model="model.khlx" dict-code="khlx"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="分值">
              <a-input placeholder="请输入分值" v-decorator="['fz', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]"/>
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
              label="排序序号">
              <!--              <a-input placeholder="请输入排序序号" v-decorator="['pxxh', {}]"/>-->
              <a-input-number :min="1" style="marginLeft: 1px" v-decorator="['pxxh',{'initialValue':'1'}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否启用">
              <!--              <j-dict-select-tag placeholder="请选择是否启用" v-model="model.sfqy" dict-code="qybz"/>-->
              <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked v-model="model.sfqy"
                        @change="swich"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计算方式">
              <!--              <j-dict-select-tag placeholder="请选择计算方式" v-model="model.jsfs" dict-code="pjsx_jsfs"/>-->
              <!--              <a-checkbox-group :options="plainOptions" v-model="model.jsfs" @change="onChange" />-->
              <a-radio-group v-model="model.jsfs" :disabled="disabled"@change="jsfs"  name="radioGroup">
                <a-radio :value="1"  @click="xlmethod">单选下拉</a-radio>
                <a-radio :value="2"  @click="qjmethod">区间</a-radio>
                <a-radio :value="3"  @click="gsmethod">公式</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="selectKey"   @change="handleChangeTabs">

          <a-tab-pane v-if="this.xlflag==1" tab="单选下拉"  :key="refKeys[0]" :forceRender="true">
            <j-editable-table
              :ref="refKeys[0]"
              :loading="pjsxPjzxmgzszXlTable.loading"
              :columns="pjsxPjzxmgzszXlTable.columns"
              :dataSource="pjsxPjzxmgzszXlTable.dataSource"
              :maxHeight="300"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="true"
            />
          </a-tab-pane>
          <a-tab-pane   v-if="this.xlflag==2" tab="区间" :key="refKeys[1]" :forceRender="true">
            <j-editable-table
              :ref="refKeys[1]"
              :loading="pjsxPjzxmgzszQjTable.loading"
              :columns="pjsxPjzxmgzszQjTable.columns"
              :dataSource="pjsxPjzxmgzszQjTable.dataSource"
              :maxHeight="300"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="true"/>
          </a-tab-pane>
          <a-tab-pane  v-if="this.xlflag==3" tab="公式" :key="refKeys[2]" :forceRender="true">
            <j-editable-table
              :ref="refKeys[2]"
              :loading="pjsxPjzxmgzszGsTable.loading"
              :columns="pjsxPjzxmgzszGsTable.columns"
              :dataSource="pjsxPjzxmgzszGsTable.dataSource"
              :maxHeight="300"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="true"/>
          </a-tab-pane>



      </a-tabs>

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import {FormTypes} from '@/utils/JEditableTableUtil'
  import {JEditableTableMixin} from '@/mixins/JEditableTableMixin'
  import {getRefPromise, VALIDATE_NO_PASSED, validateFormAndTables} from "../../../../utils/JEditableTableUtil";
  import {httpAction,putAction} from "../../../../api/manage";

  export default {
    name: 'pjsxPjzxmszModal',
    mixins: [JEditableTableMixin],
    data() {
      return {
        status:"",
        disabled:false,
        xlValues:[],
        selectKey: 0,
        jsfsvalue:"",
        xlflag: "",
        xmbhDisable:"false",
        khlxDisable:"false",
        plainOptions: ['单选下拉', '区间', '公式'],
        // 新增时子表默认添加几行空数据
        addDefaultRowNum:0,
        validatorRules: {
          xmbh: {rules: [{required: true, message: '请输入项目编号!'}]},
          fxmbh: {rules: [{required: true, message: '请选择父项目编号!'}]},
        },
        refKeys: ['pjsxPjzxmgzszXl', 'pjsxPjzxmgzszQj', 'pjsxPjzxmgzszGs',],
        activeKey: 'pjsxPjzxmgzszXl',
        // 下拉
        pjsxPjzxmgzszXlTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '规则编号',
              key: 'xmbh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '键',
              key: 'key',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '值',
              key: 'value',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '分值',
              key: 'fz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 区间
        pjsxPjzxmgzszQjTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '规则编号',
              key: 'xmbh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '数据值起(含)',
              key: 'sjzbegin',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '数据值止(不含)',
              key: 'sjzend',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '分值',
              key: 'fz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        pjsxPjzxmgzszGsTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '规则编号',
              key: 'xmbh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '标准值',
              key: 'bzz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '标准值方向',
              key: 'mffx',
              type: FormTypes.select,
              placeholder: '请选择${title}',
              options: [],
              dictCode: 'khpjsx_mffx',
            },
            {
              title: '升降',
              key: 'sj',
              type: FormTypes.select,
              placeholder: '请选择${title}',
              options: [],
              dictCode: 'khpjsx_sj',
            },
            {
              title: '系数',
              key: 'xs',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '加减',
              key: 'jj',
              type: FormTypes.select,
              placeholder: '请选择${title}',
              options: [],
              dictCode: 'khpjsx_jiajian',
            },
            {
              title: '单位分值',
              key: 'dwfz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '最低分',
              key: 'zdf',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/pjzxmsz/pjsxPjzxmsz/add",
          edit: "/pjzxmsz/pjsxPjzxmsz/edit",
          pjsxPjzxmgzszXl: {
            list: '/pjzxmsz/pjsxPjzxmsz/querypjsxPjzxmgzszXlByMainId'
          },
          pjsxPjzxmgzszQj: {
            list: '/pjzxmsz/pjsxPjzxmsz/querypjsxPjzxmgzszQjByMainId'
          },
          pjsxPjzxmgzszGs: {
            list: '/pjzxmsz/pjsxPjzxmsz/querypjsxPjzxmgzszGsByMainId'
          },
        }
      }
    },

    methods: {
      jsfs(value){
        this.jsfsvalue=value.target.value
      },
      add() {
        this.xmbhDisable=false;
        this.khlxDisable=false;
        this.status=1;
        this.xlflag="";
        this.disabled=false;
        if (typeof this.addBefore === 'function') this.addBefore()
        // 默认新增空数据
        let rowNum = this.addDefaultRowNum
        if (typeof rowNum !== 'number') {
          rowNum = 1
          console.warn('由于你没有在 data 中定义 addDefaultRowNum 或 addDefaultRowNum 不是数字，所以默认添加一条空数据，如果不想默认添加空数据，请将定义 addDefaultRowNum 为 0')
        }
        this.eachAllTable((item) => {
          item.add(rowNum)
        })
        if (typeof this.addAfter === 'function') this.addAfter(this.model)
        this.edit({})
      },
      edit(record) {
        console.info(record);
        if(record.xmbh){
          this.xmbhDisable=true;
          this.khlxDisable=true;
        }
        if(record.jsfs){

          this.disabled=true;
          this.status=2;
        }
        if (record.jsfs == 1) {
          this.model.jsfs=1
          this.xlflag = 1;
          this.selectKey = 'pjsxPjzxmgzszXl';
        } else if (record.jsfs == 2) {
          this.model.jsfs = 2
          this.xlflag = 2;
          this.selectKey = 'pjsxPjzxmgzszQj'
        } else if(record.jsfs == 3){
          this.model.jsfs = 3
          this.xlflag = 3;
          this.selectKey = 'pjsxPjzxmgzszGs'
        }
        if (typeof this.editBefore === 'function') this.editBefore(record)
        this.visible = true
        this.activeKey = this.refKeys[0]
        this.form.resetFields()
        this.model = Object.assign({}, record)
        if (typeof this.editAfter === 'function') this.editAfter(this.model)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'qydm', 'fxmbh', 'xmbh', 'xmmc', 'jsfs', 'fz', 'khlx', 'bz', 'pxxh', 'sfqy',))
          // 时间格式化
        })
        // 加载子表数据
        this.pjsxPjzxmgzszXlTable.dataSource=[{}];
        this.pjsxPjzxmgzszQjTable.dataSource=[{}];
        this.pjsxPjzxmgzszGsTable.dataSource=[{}];
        if (this.model.fxmbh) {
          let params = {xmbh: this.model.fxmbh,khlx:this.model.khlx}
          this.requestSubTableData(this.url.pjsxPjzxmgzszXl.list, params, this.pjsxPjzxmgzszXlTable)
          this.requestSubTableData(this.url.pjsxPjzxmgzszQj.list, params, this.pjsxPjzxmgzszQjTable)
          this.requestSubTableData(this.url.pjsxPjzxmgzszGs.list, params, this.pjsxPjzxmgzszGsTable)
        }
      },

      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        return {
          ...main, // 展开
          pjsxPjzxmgzszXlList: allValues.tablesValue[0].values,
          pjsxPjzxmgzszQjList: allValues.tablesValue[1].values,
          pjsxPjzxmgzszGsList: allValues.tablesValue[2].values,
        }
      },
      getAllTable() {
        if (!(this.refKeys instanceof Array)) {
          throw this.throwNotArray('refKeys')
        }
        let values = this.refKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      handleOk() {
        if(this.status==1) {
            this.form.validateFields((err, values) => {
              putAction("/pjzxmsz/pjsxPjzxmsz/check",{"fxmbh":this.model.fxmbh,"khlx":this.model.khlx}).then((res) => {
                if (!err) {

                    if (res.success) {
                      if (this.model.jsfs == 1) {
                        this.$refs.pjsxPjzxmgzszXl.getValues((error, values) => {
                          this.request(values)
                        })
                      } else if (this.model.jsfs == 2) {
                        this.$refs.pjsxPjzxmgzszQj.getValues((error, values) => {
                          this.request(values)
                        })
                      } else {
                        this.$refs.pjsxPjzxmgzszGs.getValues((error, values) => {
                          this.request(values)
                        })
                      }
                    } else {
                      alert("该指标在评级数据项中没有该客户类型！")
                  }}
            })
              })}else{
          if (this.model.jsfs == 1) {
            this.$refs.pjsxPjzxmgzszXl.getValues((error, values) => {
              this.request(values)
            })
          } else if (this.model.jsfs == 2) {
            this.$refs.pjsxPjzxmgzszQj.getValues((error, values) => {
              this.request(values)
            })
          } else {
            this.$refs.pjsxPjzxmgzszGs.getValues((error, values) => {
              this.request(values)
            })
          }
        }


      },
      /** 发起请求，自动判断是执行新增还是修改操作 */
      request(formData) {
        let url = this.url.add, method = 'post'
        if (this.status==2) {
          url = this.url.edit;
          method = 'put'
        }
        this.confirmLoading = true;
      httpAction(url, {"khlx":this.model.khlx,"ftable":this.form.getFieldsValue(),"ztable":formData,"sfqy":this.model.sfqy?0:1,"jsfs":this.model.jsfs,"fxmbh":this.model.fxmbh}, method).then((res) => {
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
      swich(value) {
        // alert(value)
      },
      xlmethod() {

        this.xlflag = 1;
        this.selectKey = 'pjsxPjzxmgzszXl'

        setTimeout(this.end(),600);

      },

      qjmethod() {

        this.xlflag = 2;
        this.selectKey = 'pjsxPjzxmgzszQj'
        if(this.pjsxPjzxmgzszQjTable.dataSource.length==0){
          this.pjsxPjzxmgzszQjTable.dataSource.push({});
        }
      },
      gsmethod() {
        this.xlflag = 3;
        this.selectKey = 'pjsxPjzxmgzszGs'
        if(this.pjsxPjzxmgzszGsTable.dataSource.length==0){
          this.pjsxPjzxmgzszGsTable.dataSource.push({});
        }
      },

    }
  }
</script>

<style scoped>
</style>