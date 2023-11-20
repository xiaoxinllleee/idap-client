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
        <j-editable-table
          @valueChange="valueChangeBwbl"
          ref="bwblSetTable"
          :loading="bwblSetTable.loading"
          :columns="bwblSetTable.columns"
          :dataSource="bwblSetTable.dataSource"
          :maxHeight="300"
          :rowNumber="true"
          :rowSelection="false"
          :actionButton="false"/>

        <j-editable-table
          @valueChange="valueChangeBwblqs"
          ref="bwblSetTableqs"
          :loading="bwblSetTableqs.loading"
          :columns="bwblSetTableqs.columns"
          :dataSource="bwblSetTableqs.dataSource"
          :maxHeight="300"
          :rowNumber="true"
          :rowSelection="false"
          :actionButton="false"/>
        <a-button type="primary" @click="jkptbwbl" icon="plus">新增月份</a-button>
        <j-editable-table
          @valueChange="valueChangeBwbl1"
          ref="bwblSetTable1"
          :loading="bwblSetTable1.loading"
          :columns="bwblSetTable1.columns"
          :dataSource="bwblSetTable1.dataSource"
          :maxHeight="300"
          :rowNumber="true"
          :rowSelection="false"
          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=1"
                          @valueChange="valueChangeBwbl2"
                          ref="bwblSetTable2"
                          :loading="bwblSetTable2.loading"
                          :columns="bwblSetTable2.columns"
                          :dataSource="bwblSetTable2.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=2"
                          @valueChange="valueChangeBwbl3"
                          ref="bwblSetTable3"
                          :loading="bwblSetTable3.loading"
                          :columns="bwblSetTable3.columns"
                          :dataSource="bwblSetTable3.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=3"
                          @valueChange="valueChangeBwbl4"
                          ref="bwblSetTable4"
                          :loading="bwblSetTable4.loading"
                          :columns="bwblSetTable4.columns"
                          :dataSource="bwblSetTable4.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=4"
                          @valueChange="valueChangeBwbl5"
                          ref="bwblSetTable5"
                          :loading="bwblSetTable5.loading"
                          :columns="bwblSetTable5.columns"
                          :dataSource="bwblSetTable5.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=5"
                          @valueChange="valueChangeBwbl6"
                          ref="bwblSetTable6"
                          :loading="bwblSetTable6.loading"
                          :columns="bwblSetTable6.columns"
                          :dataSource="bwblSetTable6.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=6"
                          @valueChange="valueChangeBwbl7"
                          ref="bwblSetTable7"
                          :loading="bwblSetTable7.loading"
                          :columns="bwblSetTable7.columns"
                          :dataSource="bwblSetTable7.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=7"
                          @valueChange="valueChangeBwbl8"
                          ref="bwblSetTable8"
                          :loading="bwblSetTable8.loading"
                          :columns="bwblSetTable8.columns"
                          :dataSource="bwblSetTable8.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=8"
                          @valueChange="valueChangeBwbl9"
                          ref="bwblSetTable9"
                          :loading="bwblSetTable9.loading"
                          :columns="bwblSetTable9.columns"
                          :dataSource="bwblSetTable9.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=9"
                          @valueChange="valueChangeBwbl10"
                          ref="bwblSetTable10"
                          :loading="bwblSetTable10.loading"
                          :columns="bwblSetTable10.columns"
                          :dataSource="bwblSetTable10.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=10"
                          @valueChange="valueChangeBwbl11"
                          ref="bwblSetTable11"
                          :loading="bwblSetTable11.loading"
                          :columns="bwblSetTable11.columns"
                          :dataSource="bwblSetTable11.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>
        <j-editable-table v-show="this.bwbl>=11"
                          @valueChange="valueChangeBwbl12"
                          ref="bwblSetTable12"
                          :loading="bwblSetTable12.loading"
                          :columns="bwblSetTable12.columns"
                          :dataSource="bwblSetTable12.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="false"
                          :actionButton="false"/>

        <!--  <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="统计日期">
            <a-date-picker v-decorator="[ 'tjrq', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="证件号码">
            <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="贷款账号">
            <a-input placeholder="请输入贷款账号" v-decorator="['dkzh', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="核销年月">
            <a-input placeholder="请输入核销年月" v-decorator="['hxny', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="有无权益">
            <a-input placeholder="请输入有无权益" v-decorator="['ywqy', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="年初余额">
            <a-input placeholder="请输入年初余额" v-decorator="['ncye', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="当前表外余额">
            <a-input placeholder="请输入当前表外余额" v-decorator="['dqbwye', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="本年清收">
            <a-input placeholder="请输入本年清收" v-decorator="['bnqs', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="借款人或担保现状">
            <a-input placeholder="请输入借款人或担保现状" v-decorator="['jkrhdbxz', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="录入人">
            <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="录入时间">
            <a-date-picker v-decorator="[ 'lrsj', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="修改人">
            <a-input placeholder="请输入修改人" v-decorator="['xgr', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="修改时间">
            <a-date-picker v-decorator="[ 'xgsj', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="序号">
            <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="机构名称">
            <a-input placeholder="请输入机构名称" v-decorator="['jgdm', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="清收任务">
            <a-input placeholder="请输入清收任务" v-decorator="['qsrw', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="拟合计清收">
            <a-input placeholder="请输入拟合计清收" v-decorator="['nhjqs', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="实合计清收">
            <a-input placeholder="请输入实合计清收" v-decorator="['shjqs', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="客户姓名">
            <a-input placeholder="请输入客户姓名" v-decorator="['khxm', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="借款日期">
            <a-input placeholder="请输入借款日期" v-decorator="['jkrq', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="到期日期">
            <a-input placeholder="请输入到期日期" v-decorator="['dqrq', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="转入表外日期">
            <a-input placeholder="请输入转入表外日期" v-decorator="['zrbwrq', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="担保方式">
            <a-input placeholder="请输入担保方式" v-decorator="['dbfs', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="信贷贷款品种">
            <a-input placeholder="请输入信贷贷款品种" v-decorator="['xddkpz', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="拟清收/盘活/无望">
            <a-input placeholder="请输入拟清收/盘活/无望" v-decorator="['nqsphww', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="拟清收/盘活金额">
            <a-input placeholder="请输入拟清收/盘活金额" v-decorator="['nqsphje', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="拟到位时间">
            <a-input placeholder="请输入拟到位时间" v-decorator="['ndwsj', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="管理责任人">
            <a-input placeholder="请输入管理责任人" v-decorator="['glzrr', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="风险管理部要求处置进度">
            <a-input placeholder="请输入风险管理部要求处置进度" v-decorator="['fxglbyqczjd', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="1月进度/措施">
            <a-input placeholder="请输入1月进度/措施" v-decorator="['month1', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="2月进度/措施">
            <a-input placeholder="请输入2月进度/措施" v-decorator="['month2', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="3月进度/措施">
            <a-input placeholder="请输入3月进度/措施" v-decorator="['month3', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="4月进度/措施">
            <a-input placeholder="请输入4月进度/措施" v-decorator="['month4', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="5月进度/措施">
            <a-input placeholder="请输入5月进度/措施" v-decorator="['month5', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="6月进度/措施">
            <a-input placeholder="请输入6月进度/措施" v-decorator="['month6', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="7月进度/措施">
            <a-input placeholder="请输入7月进度/措施" v-decorator="['month7', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="8月进度/措施">
            <a-input placeholder="请输入8月进度/措施" v-decorator="['month8', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="9月进度/措施">
            <a-input placeholder="请输入9月进度/措施" v-decorator="['month9', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="10月进度/措施">
            <a-input placeholder="请输入10月进度/措施" v-decorator="['month10', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="11月进度/措施">
            <a-input placeholder="请输入11月进度/措施" v-decorator="['month11', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="12月进度/措施">
            <a-input placeholder="请输入12月进度/措施" v-decorator="['month12', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="诉讼情况">
            <a-input placeholder="请输入诉讼情况" v-decorator="['ssqk', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="贷款类型">
            <a-input placeholder="请输入贷款类型" v-decorator="['dklx', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="备注">
            <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="责任认定人">
            <a-input placeholder="请输入责任认定人" v-decorator="['zrrdr', {}]" />
          </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JEditableTable from '@comp/jeecg/JEditableTable'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ATextarea from 'ant-design-vue/lib/input/TextArea'

  export default {
    name: "DkjkptbwblxtModal",
    mixins: [JeecgListMixin],
    components:{JEditableTable,ATextarea},
    data () {
      return {
        title:"操作",
        bwbl:0,
        visible: false,
        loading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        bwblDk:[],
        bwblDataSourceqs:[],
        bwblDataSource1:[],
        bwblDataSource2:[],
        bwblDataSource3:[],
        bwblDataSource4:[],
        bwblDataSource5:[],
        bwblDataSource6:[],
        bwblDataSource7:[],
        bwblDataSource8:[],
        bwblDataSource9:[],
        bwblDataSource10:[],
        bwblDataSource11:[],
        bwblDataSource12:[],
        confirmLoading: false,
        form: this.$form.createForm(this),

        bwblSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '核销年月',
              key: 'hxny',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '有无权益',
              key: 'ywqy',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '年初余额',
              key: 'ncye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '当前表外余额',
              key: 'dqbwye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '本年清收',
              key: 'bnqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '责任认定人',
              key: 'zrrdr',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '借款人或担保现状',
              key: 'jkrhdbxz',
              width: '30%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        },
        bwblSetTableqs: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '清收任务',
              key: 'qsrw',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '拟合计清收',
              key: 'nhjqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '实合计清收',
              key: 'shjqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟清收/盘活/无望',
              key: 'nqsphww',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟清收/盘活金额',
              key: 'nqsphje',
              width: '10%',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟到位时间',
              key: 'ndwsj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '风险管理部要求处置进度',
              key: 'fxglbyqczjd',
              width: '30%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable1: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '1月进度/措施',
              key: 'month1',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable2: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '2月进度/措施',
              key: 'month2',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable3: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '3月进度/措施',
              key: 'month3',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable4: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '4月进度/措施',
              key: 'month4',
              width: '40%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable5: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '5月进度/措施',
              key: 'month5',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable6: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '6月进度/措施',
              key: 'month6',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable7: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '7月进度/措施',
              key: 'month7',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable8: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '8月进度/措施',
              key: 'month8',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable9: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '9月进度/措施',
              key: 'month9',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable10: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '10月进度/措施',
              key: 'month10',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable11: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '11月进度/措施',
              key: 'month11',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable12: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '12月进度/措施',
              key: 'month12',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },

        validatorRules:{
        },
        url: {
          add: "/dksjjktz/dkjkptbwblxt/add",
          edit: "/dksjjktz/dkjkptbwblxt/edit",
        },
      }
    },
    created () {
    },
    methods: {
      jkptbwbl(){
        this.bwbl +=1
      },
      valueChangeBwbl(e){
        console.log('bwblDk',e)
        this.bwblDk=e.newDataSource
      },
      valueChangeBwblqs(e){
        console.log('bwblDataSourceqs',e)
        this.bwblDataSourceqs=e.newDataSource
      },
      valueChangeBwbl1(e){
        console.log('valueChangeBwbl1',e)
        this.bwblDataSource1=e.newDataSource
      },
      valueChangeBwbl2(e){
        console.log('bwblDataSource2',e)
        this.bwblDataSource2=e.newDataSource
      },
      valueChangeBwbl3(e){
        console.log('bwblDataSource3',e)
        this.bwblDataSource3=e.newDataSource
      },
      valueChangeBwbl4(e){
        console.log('bwblDataSource4',e)
        this.bwblDataSource4=e.newDataSource
      },
      valueChangeBwbl5(e){
        console.log('bwblDataSource5',e)
        this.bwblDataSource5=e.newDataSource
      },
      valueChangeBwbl6(e){
        console.log('bwblDataSource6',e)
        this.bwblDataSource6=e.newDataSource
      },
      valueChangeBwbl7(e){
        console.log('bwblDataSource7',e)
        this.bwblDataSource7=e.newDataSource
      },
      valueChangeBwbl8(e){
        console.log('bwblDataSource8',e)
        this.bwblDataSource8=e.newDataSource
      },
      valueChangeBwbl9(e){
        console.log('bwblDataSource9',e)
        this.bwblDataSource9=e.newDataSource
      },
      valueChangeBwbl10(e){
        console.log('bwblDataSource10',e)
        this.bwblDataSource10=e.newDataSource
      },
      valueChangeBwbl11(e){
        console.log('bwblDataSource11',e)
        this.bwblDataSource11=e.newDataSource
      },
      valueChangeBwbl12(e){
        console.log('bwblDataSource12',e)
        this.bwblDataSource12=e.newDataSource
      },
     /* add () {
        this.edit({});
      },*/
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
    /*    this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zjhm','dkzh','hxny','ywqy','ncye','dqbwye','bnqs','jkrhdbxz','lrr','xgr','xh','jgdm','qsrw','nhjqs','shjqs','khxm','jkrq','dqrq','zrbwrq','dbfs','xddkpz','nqsphww','nqsphje','ndwsj','glzrr','fxglbyqczjd','month1','month2','month3','month4','month5','month6','month7','month8','month9','month10','month11','month12','ssqk','dklx','bz','zrrdr'))

		  //时间格式化
         /!* this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})*!/
        });*/
        this.loadData()
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      loadData (arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        this.confirmLoading = true
        this.loading = true
        var params = { "dkzh": this.model.dkzh }//查询条件
        getAction("/dksjjktz/dkjkptbwblxt/queryBwbl", params).then((res) => {
          if (res.success) {
            if (res.result == null){
              this.bwblSetTable.dataSource = []
              this.bwblSetTableqs.dataSource = []
              this.bwblSetTable1.dataSource = []
              this.bwblSetTable2.dataSource = []
              this.bwblSetTable3.dataSource = []
              this.bwblSetTable4.dataSource = []
              this.bwblSetTable5.dataSource = []
              this.bwblSetTable6.dataSource = []
              this.bwblSetTable7.dataSource = []
              this.bwblSetTable8.dataSource = []
              this.bwblSetTable9.dataSource = []
              this.bwblSetTable10.dataSource = []
              this.bwblSetTable11.dataSource = []
              this.bwblSetTable12.dataSource = []
            }else {
              this.bwblSetTable.dataSource = res.result
              this.bwblSetTableqs.dataSource = res.result
              this.bwblSetTable1.dataSource = res.result
              this.bwblSetTable2.dataSource = res.result
              this.bwblSetTable3.dataSource = res.result
              this.bwblSetTable4.dataSource = res.result
              this.bwblSetTable5.dataSource = res.result
              this.bwblSetTable6.dataSource = res.result
              this.bwblSetTable7.dataSource = res.result
              this.bwblSetTable8.dataSource = res.result
              this.bwblSetTable9.dataSource = res.result
              this.bwblSetTable10.dataSource = res.result
              this.bwblSetTable11.dataSource = res.result
              this.bwblSetTable12.dataSource = res.result
            }
          } else {
            this.bwblSetTable.dataSource = [{}]
            this.bwblSetTable2.dataSource = [{}]
            this.bwblSetTable3.dataSource = [{}]
            this.bwblSetTable4.dataSource = [{}]
            this.bwblSetTable5.dataSource = [{}]
            this.bwblSetTable6.dataSource = [{}]
            this.bwblSetTable7.dataSource = [{}]
            this.bwblSetTable8.dataSource = [{}]
            this.bwblSetTable9.dataSource = [{}]
            this.bwblSetTable10.dataSource = [{}]
            this.bwblSetTable11.dataSource = [{}]
            this.bwblSetTable12.dataSource = [{}]
          }

        }).finally(() => {
          //this.loading = false
          this.confirmLoading = false;
        })
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;

            let formData = Object.assign(this.model, values);
            //时间格式化

            console.log(formData)

            let record ={
              'bwbl':this.bwblDk,
              'bwblqs':this.bwblDataSourceqs,
              'bwbl1':this.bwblDataSource1,
              'bwbl2':this.bwblDataSource2,
              'bwbl3':this.bwblDataSource3,
              'bwbl4':this.bwblDataSource4,
              'bwbl5':this.bwblDataSource5,
              'bwbl6':this.bwblDataSource6,
              'bwbl7':this.bwblDataSource7,
              'bwbl8':this.bwblDataSource8,
              'bwbl9':this.bwblDataSource9,
              'bwbl10':this.bwblDataSource10,
              'bwbl11':this.bwblDataSource11,
              'bwbl12':this.bwblDataSource12,
            }

            httpAction('/dksjjktz/dkjkptbwblxt/edit',record,'post').then((res)=>{
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


    }
  }
</script>

<style lang="less" scoped>

</style>