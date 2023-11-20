<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="基本信息" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
            <a-row :gutter="16">
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
                    :disabled="true"
                    :treeDefaultExpandAll=true
                  />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户类型">
                  <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', {rules: [{ required: true, message: '请选择客户类型!' }]}]"
                                     :triggerChange="true" dictCode="lldj_khlx"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户名称">
                  <a-input placeholder="请输入客户名称" v-decorator="['khmc', {rules: [{ required: true, message: '请输入客户名称!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" @blur="zjhmBlur"
                           v-decorator="['zjhm', {rules: [{ required: true, message: '请输入证件号码!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="手机号码">
                  <a-input placeholder="请输入手机号码"
                           v-decorator="['sjhm', {rules: [{ required: true, message: '请输入手机号码!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="地址">
                  <a-input placeholder="请输入地址"
                           v-decorator="['dz', {rules: [{ required: true, message: '请输入地址!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="信用等级">
                  <j-dict-select-tag placeholder="请选择信用等级" v-decorator="['xydj', {rules: [{ required: true, message: '请选择信用等级!' }]}]"
                                     :triggerChange="true" dictCode="rate_xydj"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="借款用途">
                  <a-input placeholder="请输入借款用途" v-decorator="['jkyt', {rules: [{ required: true, message: '请输入借款用途!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款方式">
                  <j-dict-select-tag placeholder="请选择贷款方式" v-decorator="['jkfs', {rules: [{ required: true, message: '请选择贷款方式!' }]}]"
                                     :triggerChange="true" dictCode="dbfs"/>
                </a-form-item>
              </a-col>

              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款期限">
                  <a-input placeholder="请输入贷款期限"
                           v-decorator="['dkqx', {rules: [{ required: true, message: '请输入贷款期限!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款种类">
                  <j-dict-select-tag placeholder="请选择贷款种类" v-decorator="['dkzl', {rules: [{ required: true, message: '请选择贷款种类!' }]}]"
                                     :showSearch="true" :triggerChange="true" dictCode="dkzl"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="授信额度">
                  <a-input-number placeholder="请输入授信额度(万元)" style="width: 250px"
                                  :formatter="value => value? `${value}万元` : ''"
                                  :parser="value => value.replace('万', '').replace('元','')"
                                  v-decorator="['sxed', {rules: [{ required: true, message: '请输入授信额度!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="借款金额(小写)">
                  <a-popover title="审批额度区间" trigger="click">
                    <template slot="content">
                      <p>审批额度起(万元)：{{spedBegin}}</p>
                      <p>审批额度止(万元)：{{spedEnd}}</p>
                    </template>
                    <a-input-number placeholder="请输入借款金额(万元)" style="width: 250px"
                                    :formatter="value => value? `${value}万元` : ''"
                                    :parser="value => value.replace('万', '').replace('元','')"
                                    @change="dkjeChange"
                                    v-decorator="['dkje', {rules: [{ required: true, message: '请输入审批金额!' }]}]" />
                  </a-popover>

                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="借款金额(大写)">
                  <a-input placeholder="根据小写自动生成"
                           v-decorator="['dkjedx', {}]" disabled/>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="利率">
                  <a-input placeholder="请输入利率"
                           v-decorator="['ll', {rules: [{ required: true, message: '请输入利率!' }]}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="员工姓名">
                  <j-select-ygxx placeholder="请选择员工" type="radio" v-model="ygxm"
                                 @selectComplete="selectComplete" ></j-select-ygxx>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="员工工号">
                  <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" disabled />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="24">
                <a-form-item
                  :labelCol="{ span: 4 }"
                  :wrapperCol="{ span: 12 }"
                  label="备注">
                  <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :row="2"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="20">
              <a-col :lg="12">
                <a-divider orientation="left" style="color: #1890FF;">担保人信息</a-divider>
                <j-editable-table
                  ref="dbrxxTable"
                  :loading="dbrxxTable.loading"
                  :columns="dbrxxTable.columns"
                  :dataSource="dbrxxTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="true"
                  :actionButton="true"/>
              </a-col>
              <a-col :lg="12">
                <a-divider orientation="left" style="color: #1890FF;">抵押物信息</a-divider>
                <j-editable-table
                  ref="dywxxTable"
                  :loading="dywxxTable.loading"
                  :columns="dywxxTable.columns"
                  :dataSource="dywxxTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="true"
                  :actionButton="true"/>
              </a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">家庭成员信息</a-divider>
            <a-table bordered
                     size="middle"
                     rowKey="id"
                     :dataSource="jtcyxx.data"
                     :columns="jtcyxx.columns"
                     :pagination="false"
                     :loading="jtcyxx.loading"
            />
            <a-divider orientation="left" style="color: #1890FF;">其他风险信息</a-divider>
            <a-row :gutter="16">
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表内不良贷款">
                  <a-checkbox-group v-model="bnbldk" :options="bldkOptions" disabled></a-checkbox-group>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表外不良贷款">
                  <a-checkbox-group v-model="bwbldk" :options="bldkOptions" disabled></a-checkbox-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否吸毒">
                  <j-dict-select-tag  v-decorator="['sfxdry', {}]" :triggerChange="true" placeholder="请选择是否吸毒" disabled
                                      dictCode="sfbz"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否非法集资">
                  <j-dict-select-tag  v-decorator="['sfffjz', {}]" :triggerChange="true" placeholder="请选择是否非法集资" disabled
                                      dictCode="sfbz"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="贷款资料" key="2" :forceRender="true">
            <a-row>
              <a-col :span="24">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款资料">
                  <JUploadOne
                    v-decorator="['fjxxList[0]', rules.khzl]"
                    text="上传附件"
                    class="upload-list-inline"
                    @change="(data)=>imageUploadChange(data, '1')"
                  />
                </a-form-item>
              </a-col>
              <!--<a-col :span="24">-->
                <!--<a-form-item-->
                  <!--:labelCol="labelCol"-->
                  <!--:wrapperCol="wrapperCol"-->
                  <!--label="承贷支行资料">-->
                  <!--<JUploadOne-->
                    <!--v-decorator="['fjxxList[1]',rules.cdzhzl]"-->
                    <!--text="上传附件"-->
                    <!--class="upload-list-inline"-->
                    <!--@change="(data)=>imageUploadChange(data, '2')"-->
                  <!--/>-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <a-col :span="24">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="其他资料">
                  <JUploadOne
                    v-decorator="['fjxxList[2]',{}]"
                    text="上传附件"
                    class="upload-list-inline"
                    @change="(data)=>imageUploadChange(data, '3')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider orientation="left" style="color: #1890FF;" v-if="model.id">已上传附件</a-divider>
            <a-table bordered
                     size="middle"
                     rowKey="id"
                     :dataSource="khzl.data"
                     :columns="khzl.columns"
                     :pagination="false"
                     :loading="khzl.loading"
                     v-if="model.id">
              <span slot="action" slot-scope="text, record">
                <a @click="view(record)">预览</a>
                <a-divider type="vertical" />
                <a @click="down(record)">下载</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => doDelete(record)">
                        <a>删除</a>
                </a-popconfirm>
              </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import { digitUppercase } from '@/utils/util'
  import pick from 'lodash.pick'
  import moment from "moment"
  import store from '@/store/'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JCheckbox from '@/components/jeecg/JCheckbox'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  let Base64 = require('js-base64').Base64;

  export default {
    name: "DkspKhzcModal",
    components: {
      JUploadOne, JSelectYgxx, JTreeSelect, JCheckbox, JEditableTable
    },
    props: {
      modalCreated: {
        type: Boolean,
        required: false,
        default: false
      },
      modalParam: {
        type: Object,
        required: false,
      }
    },
    watch: {
      modalCreated: {
        immediate: true,
        handler(val, oldVal) {
          console.log('watch modalCreated', val, oldVal,)
          if (val) {
            this.showModal()
          }
        }
      }
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/dksp/khzc/add",
          edit: "/dksp/khzc/edit",
          dbrxxList: '/dksp/dbrxx/queryByKhId',
          dywxxList: '/dksp/dywxx/queryByKhId',
        },
        rules: {
          khzl: { rules: [{ required: true, message: '请上传客户资料!' }] },
          cdzhzl: {rules: [{ required: true, message: '请上传承贷支行资料!' }]},
        },
        jtcyxx: {
          data:[],
          columns: [
            {
              title: '客户姓名',
              align:"center",
              dataIndex: 'khmc',
            },
            {
              title: '证件号码',
              align:"center",
              dataIndex: 'zjhm',

            },
            {
              title: '与户主关系',
              align:"center",
              dataIndex: 'yhzgx_dictText',
            },
            {
              title: '性别',
              align:"center",
              dataIndex: 'xb_dictText',
            },
            {
              title: '婚姻状况',
              align:"center",
              dataIndex: 'hyzk',
            },
            {
              title: '联系电话',
              dataIndex: 'lxfs',
              align:"center",
            },
          ],
          loading: false
        },
        disableSubmit: false,
        yggh: '',
        ygxm: '',
        zzbz: '',
        spedBegin: '',
        spedEnd: '',
        khzlList: [],
        khzl: {
          data: [],
          columns: [
            {
              title: '附件名称',
              dataIndex: 'zlmc',
              align:"center",
            },
            {
              title: '附件类型',
              dataIndex: 'zllx_dictText',
              align:"center",
            },
            {
              title: '上传人',
              dataIndex: 'scr',
              align:"center",
            },
            {
              title: '上传时间',
              dataIndex: 'scsj',
              align:"center",
            },
            {
              title: ' 操作',
              dataIndex: 'action',
              align:"center",
              scopedSlots: { customRender: 'action' },
            },
          ],
          loading: false
        },
        bldkOptions: [
          {
            label:"本人",
            value:"1"
          },
          {
            label:"家庭成员",
            value:"2"
          }
        ],
        bnbldk: [],
        bwbldk: [],
        deleteFiles: [],
        dbrxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '担保人名称',
              key: 'dbrmc',
              width: '40%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
          ]
        },
        dywxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '抵押物',
              key: 'dywmc',
              width: '40%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '抵押物价值',
              key: 'dywjz',
              width: '40%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
          ]
        },
      }
    },
    created () {
      console.log('store.getters.userInfo', store.getters.userInfo)
      this.zzbz = store.getters.userInfo.orgCode
      this.ygxm = store.getters.userInfo.realname
      this.yggh = store.getters.userInfo.workNo
    },
    methods: {
      dkjeChange(value) {
        console.log('dkjeChange', value)
        if (value) {
          let dkjedx = digitUppercase(value * 10000)
          this.form.setFieldsValue({'dkjedx': dkjedx})
        }
      },
      add () {
        this.edit({zzbz: this.zzbz, yggh: this.yggh});
      },
      showModal() {
        this.spEdit(this.modalParam.tableId)
        this.title = "编辑";
        this.disableSubmit = true;
      },
      spEdit(id) {
        getAction('/dksp/khzc/queryById', {id: id}).then(res => {
          this.edit(res.result)
        })
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        if(record.result == '0' || record.result == '3' || !record.processId) {
          this.disableSubmit = false
        }
        if (record && record.ygxm) {
          this.ygxm = record.ygxm
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','khmc','zjhm','khlx','sjhm','dz','xydj','jkyt','jkfs','dkqx','dkje','dkzl','sxed','ll','yggh','bz'))
          this.zjhmBlur()
          this.dkjeChange(this.model.dkje)
		    //时间格式化
        });
        //获取机构设置的审批金额区间
        getAction('/dksp/edsz/queryByZzbz', {zzbz: record.zzbz}).then(res => {
          this.spedBegin = res.result.spedBegin
          this.spedEnd = res.result.spedEnd
        })
        //获取其他信息
        if (record.id) {
          //获取附件信息
          getAction('/dksp/khzl/queryByKhid', {khid: record.id}).then(res => {
            if (res.success) {
              if (res.result) {
                this.khzl.data = res.result
                let khzlList = res.result.filter(item => {
                  return item.zllx == '1'
                })
                let cdzhzlList = res.result.filter(item => {
                  return item.zllx == '2'
                })
                if (khzlList && khzlList.length > 0) {
                  this.rules.khzl = {}
                }
                if (cdzhzlList && cdzhzlList.length > 0) {
                  this.rules.cdzhzl = {}
                }
                // let fjxxList = res.result
                // fjxxList.forEach(item => {
                //   item.path = item.fwlj
                // })
                // this.form.setFieldsValue({fjxxList: fjxxList})
              }
              // this.khzlList = res.result
            }
          })
          //获取表格信息
          let params = { khId: this.model.id }
          this.requestTableData(this.url.dbrxxList, params, this.dbrxxTable)
          this.requestTableData(this.url.dywxxList, params, this.dywxxTable)
        }
      },
      // 获取所有的editableTable实例
      getAllTable() {
        return Promise.all([
          getRefPromise(this, 'dbrxxTable'),
          getRefPromise(this, 'dywxxTable')
        ])
      },
      /** 查询某个tab的数据 */
      requestTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource = res.result || []
        }).finally(() => {
          tab.loading = false
        })
      },
      zjhmBlur(e) {
        let zjhm = this.form.getFieldValue('zjhm')
        //根据证件号码获取农户家庭成员列表
        if (zjhm) {
          this.jtcyxx.loading = true
          getAction('/nh/nhjbxx/queryByZjhm', {zjhm: zjhm}).then(res => {
            if (res.success) {
              if (res.result) {
                this.jtcyxx.data = res.result
                console.log('res.result', res.result)
                res.result.forEach(item => {
                  if (zjhm == item.zjhm) {
                    //本人
                    if (item.bldkye && item.bldkye > 0) {
                      this.bnbldk.push('1')
                    }
                    if (item.bwbldkye && item.bwbldkye > 0) {
                      this.bwbldk.push('1')
                    }
                    this.form.setFieldsValue({sfxdry: item.sfxdry, sfffjz: item.sfffjz})
                  } else {
                    //家庭成员
                    if (item.bldkye && item.bldkye > 0) {
                      this.bnbldk.push('2')
                    }
                    if (item.bwbldkye && item.bwbldkye > 0) {
                      this.bwbldk.push('2')
                    }
                  }
                })
              }
            }
          }).finally(() => {
            this.jtcyxx.loading = false
          })
        }
      },
      close () {
        this.$emit('ok');
        this.jtcyxx.data = []
        this.khzlList = []
        this.bnbldk = []
        this.bwbldk = []
        this.form.setFieldsValue({fjxxList: null})
        this.visible = false;
        this.$emit('modalClose')
      },
      down(record){
        console.log(record)
        //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
        window.open(
          `${window._CONFIG['staticDomainURL']}/`+ record.fwlj
        );
      },
      view(record){
        console.log(record)
        let url= `${window._CONFIG['staticDomainURL']}/`+ record.fwlj;
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(Base64.encode(url))

        );
      },
      doDelete(record) {
        console.log('doDelete', record)
        this.deleteFiles.push(record.id)
        this.khzl.data = this.khzl.data.filter(item => {
          return item.id != record.id
        })
        //判断还有没有附件
        let zllx = record.zllx
        let fjxxList = this.form.getFieldValue("fjxxList")

        let khzlList = this.khzl.data.filter(item => {
          return item.zllx == zllx
        })
        if (!fjxxList[zllx - 1] && khzlList.length === 0) {
          if (zllx == 1) {
            this.rules.khzl = { rules: [{ required: true, message: '请上传客户资料!' }] }
          } else if (zllx == 2) {
            this.rules.cdzhzl = { rules: [{ required: true, message: '请上传承贷支行资料!' }]}
          }
        }
      },
      handleOk () {
        const that = this;

        this.getAllTable().then(tables => {
          /** 一次性验证主表和所有的次表 */
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          console.log('allValues', allValues)
          let formData = this.classifyIntoFormData(allValues)
          console.log('formData', formData)
          let jkfs = formData.jkfs
          if(jkfs == '1') {
            //如果贷款方式为担保，则必须填写担保人信息
            if (!formData.dbrxxList || formData.dbrxxList.length == 0) {
              that.$message.warning("贷款方式为保证时，必须填写担保人信息！");
              return false
            }
          } else if (jkfs == '2') {
            if (!formData.dywxxList || formData.dywxxList.length == 0) {
              that.$message.warning("贷款方式为抵押时，必须填写抵押物信息！");
              return false
            }
          }
          //如果贷款方式为抵押，则必须填写抵押物信息
          // 发起请求
          return this.requestAddOrEdit(formData)
        }).catch(e => {
          console.error(e)
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : (e.index + 1).toString()
          }
        })
      },
      requestAddOrEdit(formData) {
        let that = this
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
        console.log('formData', formData);
        httpAction(httpurl,formData,method).then((res)=>{
          if(res.success){
            //如果需要审批，弹出提示，需要进入我的申请中进行提交
            let process = res.result.process
            if (process) {
              this.$Modal.confirm({
                title: "操作成功",
                content:
                  `当前为"草稿"状态，建议立即到<我的申请>中提交该审批流程，是否立即跳转到我的申请?`,
                onOk: () => {
                  this.$router.push({
                    path:'/activiti/apply-manage/applyManage'
                  });
                }
              });
            } else {
              that.$message.success(res.message);
            }
            that.close();
          }else{
            that.$message.warning(res.message);
          }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let formMain = Object.assign(this.model, allValues.formValue)
        console.log('classifyIntoFormData', this.model, allValues.formValue)
        let fjxxList = formMain.fjxxList
        let dkspKhzlList = []
        fjxxList.forEach((fjxx, index) => {
          if (fjxx) {
            console.log('fjxx', fjxx)
            let khzl = {zlmc: fjxx.name,fwlj: fjxx.path, zllx: index + 1}
            dkspKhzlList.push(khzl)
          }
        })
        //时间格式化
        return {
          ...formMain, // 展开
          dbrxxList: allValues.tablesValue[0].values,
          dywxxList: allValues.tablesValue[1].values,
          dkspKhzlList: dkspKhzlList
        }
      },
      handleCancel () {
        this.close()
      },
      imageUploadChange(data, type) {
        let path = data.path
        console.log('imageUploadChange', data, type)
      },
      selectComplete(selectedYgxxRows) {
        if (selectedYgxxRows[0]) {
          this.ygxm = selectedYgxxRows[0].ygxm
          this.yggh = selectedYgxxRows[0].yggh
          this.form.setFieldsValue({yggh: selectedYgxxRows[0].yggh})
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>