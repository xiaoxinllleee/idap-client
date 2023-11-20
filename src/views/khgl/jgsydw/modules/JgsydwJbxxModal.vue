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
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="档案编号">
                  <a-input placeholder="档案编号" v-decorator="['dabh', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-tree-select placeholder="所属支行" v-decorator="['sszh', {}]"
                                 dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz" :tree-default-expand-all="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="所属营销单元">
                  <j-dict-select-tag placeholder="所属营销单元" v-decorator="['ssyxdy', {}]"
                                     dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位名称">
                  <a-input placeholder="单位名称" v-decorator="['dwmc', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="主要负责人">
                  <a-input placeholder="主要负责人" v-decorator="['zyfzr', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_B" :wrapperCol="wrapperCol_B" label="负责人证件号码">
                  <a-input placeholder="负责人证件号码" v-decorator="['fzrzjhm', {}]" />
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位电话">
                  <a-input placeholder="单位电话" v-decorator="['dwdh', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="传真号">
                  <a-input placeholder="传真号" v-model="this.jgsydwJyxx.czh" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职工人数">
                  <a-input-number placeholder="职工人数" v-decorator="['zgrs', {}]" :min="0" style="width: 100%;" />
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="行业分类">
                  <a-input placeholder="行业分类" v-decorator="['hyfl', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="邮政编码">
                  <a-input placeholder="邮政编码" v-model="this.jgsydwJyxx.yzbm" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位地址">
                  <a-input placeholder="单位地址" v-decorator="['dwdz', {}]" />
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="dollar"/>财务收支</span>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="主要收入项目">
                  <a-input placeholder="主要收入项目" v-model="this.jgsydwJyxx.zysrxm" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="资产负债(万元)">
                  <a-input-number placeholder="资产负债(万元)" v-model="this.jgsydwJyxx.zcfz" :min="0" style="width: 100%;" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="年收入(万元)">
                  <a-input-number placeholder="年收入(万元)" v-model="this.jgsydwJyxx.nsr" :min="0" style="width: 100%" />
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="年支出(万元)">
                  <a-input-number placeholder="年支出(万元)" v-model="this.jgsydwJyxx.nzc" :min="0" style="width: 100%" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="年利润(万元)">
                  <a-input-number placeholder="年利润(万元)" v-model="this.jgsydwJyxx.nlr" :min="0" style="width: 100%" />
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">合计</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="总收入(万元)">
                  <a-input-number placeholder="总收入(万元)" v-model="this.jgsydwJyxx.zsr" :min="0" style="width: 100%" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="总支出(万元)">
                  <a-input-number placeholder="总支出(万元)" v-model="this.jgsydwJyxx.zzc" :min="0" style="width: 100%" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="净利润(万元)">
                  <a-input-number placeholder="净利润(万元)" v-model="this.jgsydwJyxx.jlr" :min="0" style="width: 100%" />
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">其它</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="其它收入(万元)">
                  <a-input-number placeholder="其它收入(万元)" v-model="this.jgsydwJyxx.qtsr" :min="0" style="width: 100%" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="其他支出(万元)">
                  <a-input-number placeholder="其它收入(万元)" v-model="this.jgsydwJyxx.qtzc" :min="0" style="width: 100%" />
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="dollar"/>金融业务</span>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="归属客户经理">
                  <j-dict-select-tag placeholder="归属客户经理" v-decorator="['gskhjl', {}]"
                                     dict-code="HR_BAS_STAFF,YGXM,YGGH" :trigger-change="true" :show-search="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="客户重要程度">
                  <j-dict-select-tag placeholder="客户重要程度" v-decorator="['khzycd', {}]" dict-code="khzycd" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="潜在业务">
                  <a-input placeholder="潜在业务" v-model="this.jgsydwJyxx.qzyw" />
                </a-form-item></a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">与我行相关业务</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="开通手机银行">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfktsjyhyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="开通网上银行">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfktwsyhyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="开通社保卡">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfktsbk" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="办理ETC业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfbltecyw" dict-code="sfbz"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="开通存款业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfktckyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="存款余额">
                  <a-input-number placeholder="存款余额" v-model="this.jgsydwYwhxgyw.ckye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="存款日平">
                  <a-input-number placeholder="存款日平余额" v-model="this.jgsydwYwhxgyw.ckrpye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="存款年日平">
                  <a-input-number placeholder="存款年日平余额" v-model="this.jgsydwYwhxgyw.cknrpye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="开通贷款业务">
                  <j-dict-select-tag placeholder="是否开通" v-model="this.jgsydwYwhxgyw.sfktdkyw" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="贷款余额">
                  <a-input-number placeholder="贷款余额" v-model="this.jgsydwYwhxgyw.dkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="不良贷款户">
                  <j-dict-select-tag placeholder="是否不良贷款户" v-model="this.jgsydwYwhxgyw.sfbldkh" dict-code="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="不良贷款余额">
                  <a-input-number placeholder="不良贷款余额" v-model="this.jgsydwYwhxgyw.bldkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="labelCol_C" :wrapperCol="wrapperCol_C" label="表外不良贷款">
                  <a-input-number placeholder="表外不良贷款余额" v-model="this.jgsydwYwhxgyw.bwbldkye" :min="0" style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="dollar"/>单位资产</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       rowKey="id"
                       :dataSource="dataSourceForDwzc"
                       :columns="JgsydwZcTable.columns"
                       :loading="loading"
                       :pagination="ipagination">
                <span slot="khmc" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="fcwz" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="clpp" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="cphm" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="bz" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
              </a-table>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="5">
            <span slot="tab"><a-icon type="block"/>附件信息</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       rowKey="id"
                       :dataSource="this.dataSourceForFjxx"
                       :columns="JgsydwFjTable.columns"
                       :loading="loading"
                       :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <photo-view ref="pictureView" @ok="modalFormOk"/>
                  <a-divider type="vertical"/>
                  <a class="orcodebtn" @click="downhander(record)">下载</a>
                  <a-divider type="vertical" />
                </span>
                <span slot="zlmc" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="fwlj" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
                </span>
                <span slot="bz" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="6"/>
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
  import pick from 'lodash.pick'
  import moment from "moment"
  import { putAction } from '../../../../api/manage'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import  photoView from './photoView.vue'

  export default {
    name: "JgsydwJbxxModal",
    components: { JEllipsis, JTreeSelect, photoView },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        confirmLoading: false,
        dataSourceForFjxx: [],
        dataSourceForDwzc: [],
        // 机关事业单位经营信息
        jgsydwJyxx: {},
        // 机关事业单位与我行相关业务信息
        jgsydwYwhxgyw: {},
        // 机关事业单位资产Table
        JgsydwZcTable: {
          columns: [
            {
              title: '单位名称',
              width: '100',
              align: "center",
              key: 'khmc',
              dataIndex: 'khmc',
              scopedSlots: {customRender: 'khmc'},
            },
            {
              title: '房产编号',
              width: '100',
              align: "center",
              key: 'fcbh',
              dataIndex: 'fcbh',
            },
            {
              title: '房产性质',
              width: '100',
              align: "center",
              key: 'fcxz',
              dataIndex: 'fcxz',
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
              title: '房产总面积',
              width: '100',
              align: "center",
              key: 'fczmj',
              dataIndex: 'fczmj',
            },
            {
              title: '房产总价值(万元)',
              width: '100',
              align: "center",
              key: 'fczjz',
              dataIndex: 'fczjz',
            },
            {
              title: '车辆数量',
              width: '100',
              align: "center",
              key: 'clsl',
              dataIndex: 'clsl',
            },
            {
              title: '车辆品牌',
              width: '100',
              align: "center",
              key: 'clpp',
              dataIndex: 'clpp',
              scopedSlots: {customRender: 'clpp'},
            },
            {
              title: '车牌号码',
              width: '100',
              align: "center",
              key: 'cphm',
              dataIndex: 'cphm',
              scopedSlots: {customRender: 'cphm'},
            },
            {
              title: '车辆总价值(万元)',
              width: '100',
              align: "center",
              key: 'clzjz',
              dataIndex: 'clzjz',
            },
            {
              title: '备注',
              width: '100',
              align: "center",
              key: 'bz',
              dataIndex: 'bz',
              scopedSlots: {customRender: 'bz'},
            },
          ],
        },
        // 机关事业单位附件Table
        JgsydwFjTable: {
          columns: [
            {
              title: '附件编号',
              width: '100',
              align: "center",
              key: 'zlbh',
              dataIndex: 'zlbh',
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
              title: '访问路径',
              width: '150',
              align: "center",
              dataIndex: 'fwlj',
              key: 'fwlj',
              scopedSlots: { customRender: 'fwlj' }
            },
            {
              title: '备注',
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
            },
            {
              title: '上传时间',
              width: '100',
              align: "center",
              dataIndex: 'scsj',
              key: 'scsj',
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
        model: {},
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
        form: this.$form.createForm(this),
        validatorRules:{
          //dabh:{rules: [{ required: true, message: '请输入档案编号!' }]},
        },
        url: {
          //add: "/khgl.jgsydw/jgsydwJbxx/add",
          //edit: "/khgl.jgsydw/jgsydwJbxx/edit",
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
            'sszh','ssyxdy','gskhjl','dabh','dwmc','zyfzr','fzrzjhm','dwdh','czh','yzbm','dwdz','hyfl',
            'zgrs','khzycd','qzyw','zysrxm','zcfz','nsr','nzc','nlr','qtsr','qtzc','zsr','zzc','jlr'
          ))
		      // 时间格式化
        });
        // 加载其它字段数据
        if (record.dabh) {
          let params = {dabh: record.dabh}
          // 基本主表其它字段数据
          putAction("/khgl.jgsydw/jgsydwJbxx/jbxx", params).then((res) => {
            if (res.success) {
              this.jgsydwJyxx = res.result;
            }
          });
          // 加载子表数据
          // 单位资产
          putAction("/khgl.jgsydw/jgsydwJbxx/dwzcxx", params).then((res) => {
            if (res.success) {
              this.dataSourceForDwzc = res;
            }
          });
          let para = {fzrzjhm: record.fzrzjhm}
          // 金融业务
          putAction("/khgl.jgsydw/jgsydwJbxx/jrywxx", para).then((res) => {
            if (res.success) {
              this.jgsydwYwhxgyw = res.result;
            }
          });
          // 附件信息
          putAction("/khgl.jgsydw/jgsydwJbxx/dwfjxx", para).then((res) => {
            if (res.success) {
              this.dataSourceForFjxx = res;
            }
          });
        }
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
        this.downloadImg(this.orcode, record.zlmc, record.zlbh);
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
        putAction("/khgl.jgsydw/jgsydwJbxx/filePath", { zlbh: zlbh }).then((res) => {
          //C:\Users\Administrator\Desktop\QQ图片20191008155215.jpg
          let j = eval(res);
          this.$refs.pic.studentImg = j.zllj
          image.src = j.zllj;
        });
      },
    }
  }
</script>

<style lang="less" scoped>

</style>