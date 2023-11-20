<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="idcard"/>基本信息</span>
            <a-card class="card" :bordered="true">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="档案编号">
                  <a-input placeholder="档案编号" v-decorator="['dabh', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="所属支行">
                  <j-tree-select placeholder="所属支行" v-decorator="['sszh', {}]" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ"
                                 pidField="sjzzbz" :tree-default-expand-all="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="所属营销单元">
                  <j-dict-select-tag placeholder="所属营销单元" v-decorator="['ssyxdy', {}]" dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="企业名称">
                  <a-input placeholder="企业名称" v-decorator="['qymc', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="企业法人">
                  <a-input placeholder="企业法人" v-decorator="['qyfr', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="企业注册资本(万元)">
                  <a-input-number placeholder="企业注册资本" v-decorator="['qyzcje', {}]" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="成立日期">
                  <a-date-picker placeholder="成立日期" v-decorator="[ 'clrq', {}]" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="法人证件号码">
                  <a-input placeholder="法人证件号码" v-decorator="['frzjhm', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="法人联系方式">
                  <a-input placeholder="法人联系方式" v-decorator="['frlxfs', {}]" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="传真号">
                  <a-input placeholder="传真号" v-decorator="['czh', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="邮政编码">
                  <a-input placeholder="邮政编码" v-decorator="['yzbm', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="职工人数(人)">
                  <a-input-number placeholder="企业职工人数" v-decorator="['qyzgrs', {}]" :min="1" style="width: 100%;"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="经营年限(年)">
                  <a-input-number placeholder="企业经营年限" v-decorator="['clnx', {}]" :min="1" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="{xs: { span: 24 },sm: { span: 7 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 14 }}" label="通讯地址">
                  <a-input placeholder="通讯地址" v-decorator="['txdz', {}]" />
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="dollar"/>经营信息</span>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="营业执照名称">
                  <a-input placeholder="营业执照名称" v-model="this.qyjyxx.yyzzmc" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="营业执照编号">
                  <a-input placeholder="营业执照编号" v-model="this.qyjyxx.yyzzbh" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="税务登记编号">
                  <a-input placeholder="税务登记编号" v-model="this.qyjyxx.swdjbh" />
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="行业分类">
                  <a-input placeholder="行业分类" v-model="this.qyjyxx.hyfl" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="经营项目">
                  <a-input placeholder="经营项目" v-model="this.qyjyxx.jyxm" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="经营状况">
                  <a-input placeholder="经营状况" v-model="this.qyjyxx.jyzk" />
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">经营情况</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="年营业收入(万元)">
                  <a-input-number placeholder="年营业收入" v-model="this.qyjyxx.nyysr" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="年经营成本(万元)">
                  <a-input-number placeholder="年经营业务成本" v-model="this.qyjyxx.njyywcb" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="年经营净利润(万元)">
                  <a-input-number placeholder="年经营净利润" v-model="this.qyjyxx.njyjlr" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="年工资额(万元)">
                  <a-input-number placeholder="年工资额" v-model="this.qyjyxx.ngze" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="年缴纳所得税(万元)">
                  <a-input-number placeholder="年缴纳所得税" v-model="this.qyjyxx.njnsds" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_B" :wrapperCol="layout.wrapperCol_B" label="年缴纳增值税(万元)">
                  <a-input-number placeholder="年缴纳增值税" v-model="this.qyjyxx.njnzzs" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">其它</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="其它收入(万元)">
                  <a-input-number placeholder="其它收入" v-model="this.qyjyxx.qtsr" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="其它支出(万元)">
                  <a-input-number placeholder="其它支出" v-model="this.qyjyxx.qtzc" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="资产负债(万元)">
                  <a-input-number placeholder="资产负债" v-model="this.qyjyxx.zcfz" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">合计</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="总收入(万元)">
                  <a-input-number placeholder="总收入" v-model="this.qyjyxx.zsr" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="总支出(万元)">
                  <a-input-number placeholder="总支出" v-model="this.qyjyxx.zzc" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="净利润(万元)">
                  <a-input-number placeholder="净利润" v-model="this.qyjyxx.jlr" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="dollar"/>金融业务</span>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="归属客户经理">
                  <j-dict-select-tag placeholder="归属客户经理" v-model="this.qyjyxx.gskhjl"
                                     dict-code="HR_BAS_STAFF,YGXM,YGGH" :trigger-change="true" :show-search="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="客户重要程度">
                  <j-dict-select-tag placeholder="客户重要程度" v-model="this.qyjyxx.khzycd" dict-code="khzycd" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="layout.labelCol_A" :wrapperCol="layout.wrapperCol_A" label="潜在业务">
                  <a-input placeholder="潜在业务" v-model="this.qyjyxx.qzyw" />
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">与我行相关业务</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="开通手机银行">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfktsjyhyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="开通网上银行">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfktwsyhyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="开通社保卡">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfktsbk" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="办理ETC业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfbltecyw" dict-code="sfbz"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="开通存款业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfktckyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="存款余额">
                  <a-input-number placeholder="存款余额" v-model="this.qyjrywxx.ckye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="存款日平">
                  <a-input-number placeholder="存款日平余额" v-model="this.qyjrywxx.ckrpye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="存款年日平">
                  <a-input-number placeholder="存款年日平余额" v-model="this.qyjrywxx.cknrpye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="开通贷款业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.qyjrywxx.sfktdkyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="贷款余额">
                  <a-input-number placeholder="贷款余额" v-model="this.qyjrywxx.dkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="不良贷款户">
                  <j-dict-select-tag placeholder="是否不良贷款户" v-model="this.qyjrywxx.sfbldkh" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="不良贷款余额">
                  <a-input-number placeholder="不良贷款余额" v-model="this.qyjrywxx.bldkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_C" :wrapperCol="layout.wrapperCol_C" label="表外不良贷款">
                  <a-input-number placeholder="表外不良贷款余额" v-model="this.qyjrywxx.bwbldkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="dollar"/>企业资产</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       rowKey="id"
                       :dataSource="dataSourceForQyzc"
                       :columns="QyzcTable.columns"
                       :loading="QyzcTable.loading"
                       :pagination="false"/>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="5">
            <span slot="tab"><a-icon type="block"/>附件信息</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       rowKey="id"
                       :dataSource="this.dataSourceForFjxx"
                       :columns="FjxxTable.columns"
                       :loading="FjxxTable.loading"
                       :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <photo-view ref="pictureView" @ok="modalFormOk"/>
                  <a-divider type="vertical"/>
                  <a class="orcodebtn" @click="downhander(record)">下载</a>
                  <a-divider type="vertical" />
                </span>
              </a-table>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import ACol from 'ant-design-vue/es/grid/Col'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { putAction } from '../../../../api/manage'
  import  photoView from './photoView.vue'

  export default {
    name: "KhglQyjbxxModal",
    components: { JTreeSelect,ACol,AFormItem,photoView },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        dataSourceForFjxx: [],
        dataSourceForQyzc: [],
        model: {},
        layout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
          },
          labelCol_A: {
            xs: { span: 24 },
            sm: { span: 7 },
          },
          labelCol_B: {
            xs: { span: 24 },
            sm: { span: 9 },
          },
          labelCol_C: {
            xs: { span: 24 },
            sm: { span: 9 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
          wrapperCol_A: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
          wrapperCol_B: {
            xs: { span: 24 },
            sm: { span: 12 },
          },
          wrapperCol_C: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        },
        // 企业经营信息
        qyjyxx: {},
        // 企业金融业务信息
        qyjrywxx: {},
        // 企业资产Table
        QyzcTable: {
          loading: false,
          columns: [
            {
              title: '企业名称',
              width: '100',
              align: "center",
              key: 'khmc',
              dataIndex: 'khmc',
              scopedSlots: {customRender: 'khmc'},
            },
            {
              title: '房产性质',
              width: '100',
              align: "center",
              key: 'fcxz',
              dataIndex: 'fcxz',
              scopedSlots: {customRender: 'fcxz'},
            },
            {
              title: '房产位置',
              width: '150',
              align: "center",
              key: 'fcwz',
              dataIndex: 'fcwz',
              scopedSlots: {customRender: 'fcwz'},
            },
            {
              title: '房产面积',
              width: '100',
              align: "center",
              key: 'fcmj',
              dataIndex: 'fcmj',
              scopedSlots: {customRender: 'fcmj'},
            },
            {
              title: '房产价值(元)',
              width: '100',
              align: "center",
              key: 'fcjz',
              dataIndex: 'fcjz',
              scopedSlots: {customRender: 'fcjz'},
            },
            {
              title: '车辆品牌',
              width: '100',
              align: "center",
              key: 'brand',
              dataIndex: 'brand',
              scopedSlots: {customRender: 'brand'},
            },
            {
              title: '车辆数量',
              width: '100',
              align: "center",
              key: 'car',
              dataIndex: 'car',
              scopedSlots: {customRender: 'car'},
            },
            {
              title: '车牌号码',
              width: '100',
              align: "center",
              key: 'cph',
              dataIndex: 'cph',
              scopedSlots: {customRender: 'cph'},
            },
            {
              title: '车辆价值(元)',
              width: '100',
              align: "center",
              key: 'clzjz',
              dataIndex: 'clzjz',
              scopedSlots: {customRender: 'clzjz'},
            },
          ],
        },
        // 附件管理Table
        FjxxTable: {
          loading: false,
          columns: [
            {
              title: '附件编号',
              width: '100',
              align: "center",
              dataIndex: 'zlbh',
              key: 'zlbh',
              scopedSlots: { customRender: 'zlbh' }
            },
            {
              title: '附件名称',
              width: '100',
              align: "center",
              dataIndex: 'zlmc',
              key: 'zlmc',
              scopedSlots: { customRender: 'zlmc' }
            },
            {
              title: '附件备注',
              width: '150',
              align: "center",
              dataIndex: 'bz',
              key: 'bz',
              scopedSlots: { customRender: 'bz' }
            },
            {
              title: '上传人',
              width: '100',
              align: "center",
              dataIndex: 'scr',
              key: 'scr',
              scopedSlots: { customRender: 'scr' }
            },
            {
              title: '上传时间',
              width: '100',
              align: "center",
              dataIndex: 'scsj',
              key: 'scsj',
              scopedSlots: { customRender: 'scsj' }
            },
            {
              title: '图片(点击放大)',
              width: '100',
              align: "center",
              dataIndex: 'action',
              key: 'action',
              scopedSlots: { customRender: 'action' }
            },
          ],
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          //dabh:{rules: [{ required: true, message: '请输入档案编号!' }]},
        },
        url: {
          //add: "/khgl.qy/khglQyjbxx/add",
          //edit: "/khgl.qy/khglQyjbxx/edit",
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
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,
            'sszh','ssyxdy','dabh','qymc','qyfr','frzjhm','frlxfs','clnx','yyzzmc','yyzzbh','swdjbh','qyzcje','qyzgrs','txdz','czh','yzbm',
            'hyfl','jyxm','jyzk','zcfz','khzycd','gskhjl','qzyw','nyysr','njyywcb','ngze','njnsds','njnzzs','njyjlr','qtsr','qtzc','zsr','zzc','jlr'))
		      // 时间格式化
          this.form.setFieldsValue({clrq:this.model.clrq ? moment(this.model.clrq) : null})
          // 加载其它字段数据
          if (record.dabh) {
            let params = {dabh: record.dabh}
            // 基本信息表隐藏的其它字段数据
            putAction("/khgl.qy/khglQyjbxx/jbxx", params).then((res) => {
              if (res.success) {
                this.qyjyxx = res.result;
              }
            });
            // 加载子表数据
            let para = {frzjhm: record.frzjhm}
            // 金融业务信息
            putAction("/khgl.qy/khglQyjbxx/jrywxx", para).then((res) => {
              if (res.success) {
                this.qyjrywxx = res.result;
              }
            });
            // 企业资产信息
            putAction("/khgl.qy/khglQyjbxx/qyzcxx", para).then((res) => {
              if (res.success) {
                this.dataSourceForQyzc = res.result;
              }
            });
            // 附件信息
            putAction("/khgl.qy/khglQyjbxx/qyfjxx", para).then((res) => {
              if (res.success) {
                this.dataSourceForFjxx = res.result;
              }
            });
          }
        });
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
            formData.clrq = formData.clrq ? formData.clrq.format() : null;
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
      downhander(record){
        this.downloadImg(this.orcode,record.zlmc,record.zlbh);
      },
      downloadImg(imgsrc, name, zlbh){
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        // image.src = require("C:\\Users\\Administrator\\Desktop\\QQ图片20191008155215.jpg");
        putAction("/khgl.qy/khglQyjbxx/filePath", { zlbh: zlbh}).then((res) => {
          //C:\Users\Administrator\Desktop\QQ图片20191008155215.jpg
          let j=eval(res);
          this.$refs.pic.studentImg=j.zllj
          image.src = j.zllj;
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