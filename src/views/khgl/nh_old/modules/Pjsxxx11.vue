<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <a-form :form="form">

      <a-divider orientation="left" style="color: #1890FF;">房产情况</a-divider>
      <j-editable-table
        :ref="refKeys[0]"
        :loading="Cams_Zcsx_NhfxxxTable.loading"
        :columns="Cams_Zcsx_NhfxxxTable.columns"
        :dataSource="dataSource_fcqkxx"
        :maxHeight="300"
        :rowNumber="true"
        :rowSelection="true"
        :actionButton="true">
      </j-editable-table>

      <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">资产情况</a-divider>
      <j-editable-table
        :ref="refKeys[0]"
        :loading="Cams_Zcsx_NhzcqkTable.loading"
        :columns="Cams_Zcsx_NhzcqkTable.columns"
        :dataSource="dataSource_zcqkxx"
        :maxHeight="300"
        :rowNumber="true"
        :rowSelection="true"
        :actionButton="true">
      </j-editable-table>


        <a-divider orientation="left" style="color: #1890FF;">与我行相关业务信息</a-divider>
        <a-row class="form-row" :gutter="10">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
            <a-input placeholder="请输入存款余额" v-model="this.ywhxgywxxmodel.ckye" readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额">
            <a-input placeholder="请输入存款日平余额" v-model="this.ywhxgywxxmodel.ckrpye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款年日平余额">
            <a-input placeholder="请输入存款年日平余额" v-model="this.ywhxgywxxmodel.cknrpye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktckyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通贷款业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktdkyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额">
            <a-input placeholder="请输入贷款余额" v-model="this.ywhxgywxxmodel.dkye"  readonly="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额">
            <a-input placeholder="请输入不良贷款余额" v-model="this.ywhxgywxxmodel.bldkye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额">
            <a-input placeholder="请输入表外不良贷款余额"  readonly="true" v-model="this.ywhxgywxxmodel.bwbldkye" />
          </a-form-item></a-col>
        </a-row>


    </a-form>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import pick from 'lodash.pick'


  export default {
    components: {
      ARow,JSelectUserByDep,JEllipsis
    },
    name: 'Ywxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {},
        refKeys: ['Fcqkxx'],
        activeKey: 'Fcqkxx',
        loading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        ywhxgywxxmodel:{},
        dataSource_fcqkxx:[],

        //房产情况
        Cams_Zcsx_NhfxxxTable: {
          loading: false,
          columns: [
            {
              title: '户号编码',
              key: 'hhbm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '客户姓名',
              key: 'khmc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产编码',
              key: 'fcbm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产位置',
              key: 'fcwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产面积',
              key: 'fcmj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产价格(元)',
              key: 'fcjz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产性质',
              key: 'fcxz',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'khgl_fcxz'
            },
          ],
        },
        //房产情况
        Cams_Zcsx_NhzcqkTable: {
          loading: false,
          columns: [
            {
              title: '资产类型',
              key: 'zclx',
              type: FormTypes.select,
              defaultValue: '',
              dictCode: 'zclx',
              placeholder: '请输入${title}',
            },
            {
              title: '资产数量',
              key: 'zcsl',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '资产价格(元)',
              key: 'zcjg',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '资产说明',
              key: 'zcsm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ],
        },


        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },

    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr','yssxz','yxzc','sflqsbk','sfktsbk','jgdm','xtpdjg','xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfgzry','sfffjz','hbjl','infoRate','sskhjl','whcd','sjhm','hkxz','cjr','upDt','upTm','sfcj','sfypyjl'))
        });

      },

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>