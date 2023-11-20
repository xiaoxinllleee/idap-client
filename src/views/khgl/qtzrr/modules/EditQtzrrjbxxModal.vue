<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="农户基本信息" key="1" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                  <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属区域">
                  <a-input placeholder="所属区域" v-decorator="['ssqy', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户主姓名">
                  <a-input placeholder="请输入户主姓名" v-decorator="['hzxm', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质">
                  <j-dict-select-tag placeholder="请选择户口性质" v-decorator="['hkxz', {rules: [{  message: '请选择户口性质!' }]}]" :triggerChange="true" dictCode="khgl_hkxz"/>
                </a-form-item></a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象">
                    <a-select
                      v-model="model.sxdxzjh"
                      style="width: 100%"
                      @change="SelectChange"
                      placeholder="请选择"
                    >
                      <a-select-option
                        v-for="(item,index2) in tableDataJtcyxx"
                        :key= "item.value"
                        :label="item.khmc"
                        :value="item.zjhm"
                      >
                        {{ item.khmc }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="陪访人">
                  <a-input placeholder="陪访人" v-decorator="['pfr', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否有不良贷款">
                  <j-dict-select-tag placeholder="请选择是否有不良贷款" v-decorator="['sfbldkh', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否贫困户">
                  <j-dict-select-tag placeholder="请选择是否贫困户" v-decorator="['sfpkh', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否低保户">
                  <j-dict-select-tag placeholder="请选择是否低保户" v-decorator="['sfdbh', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度">
                  <j-dict-select-tag placeholder="请选择客户重要程度" v-decorator="['khzycd', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="khgl_khzycd"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户授信情况">
                  <j-dict-select-tag placeholder="请选择客户授信情况" v-decorator="['khsxqk', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="khgl_sxqk"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户等级">
                  <j-dict-select-tag placeholder="请选择客户等级" v-decorator="['khdj', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="khdj"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户潜在业务">
                  <j-multi-select-tag placeholder="客户潜在业务" v-decorator="['khqzyw', {}]" dict-code="padkhqzyw" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                  <a-input placeholder="备注" v-model="model.bz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="录入位置">
                  <a-input placeholder="经度：  纬度："v-model="jwdxx"  readonly></a-input>
                  <a-button type="primary" style="margin: 0 10px;" size="small" @click="getLocationInfo" icon="el-icon-location">获取位置</a-button>
                </a-form-item></a-col>
              </a-row>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF; margin-top: -10px;">家庭信息</a-divider>
            <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
              <a-table bordered
                       :columns="jtcycolumns"
                       :dataSource="tableDataJtcyxx"
                       rowKey="id"
                       @change="handleTableChange"
                       :loading="loading"
                       :pagination="ipagination"
                       :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
                <span slot="detail" slot-scope="khmc,record">
                  <a @click="handleGrxxEdit(record)">{{khmc}}</a>
                </span>
              </a-table>
           </a-card>
            <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">其他附件信息</a-divider>
            <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
              <hzxx-photo-view :bizPath="bizPath" ref="photoView" @ok="modalFormOk"  />
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="背靠背评议" key="2" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属区域">
                <a-input placeholder="所属区域" v-decorator="['ssqy', {} ]" disabled/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" disabled :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="户号编码">
                <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" disabled />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="授信对象">
                <a-input placeholder="请输入授信对象" v-model="model.sxdxmc" disabled />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="授信对象证件">
                <a-input placeholder="请输入授信对象证件" v-model="model.sxdxzjh" disabled />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主客户经理">
                <j-dict-select-tag placeholder="请输入主客户经理" v-decorator="['zkhjl', {} ]" disabled  dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
              </a-form-item></a-col>
            </a-row>

          </a-tab-pane>

          <a-tab-pane tab="评级授信" key="3" :forceRender="true">
            <pjsxxx   ref="pjsxxx" />
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
  import { httpAction,putAction,getAction,deleteAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import  photoView from './photoView.vue'
  import  HzxxPhotoView from './HzxxPhotoView.vue'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import Jtxgqk from './jtxgqk.vue'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import Pjsxxx from './Pjsxxx.vue'



  export default {
    name: "NhjbxxModal",
    components: { AFormItem ,JUploadOne,photoView,HzxxPhotoView,Jtxgqk,JMultiSelectTag,JSelectYgxx,
      JEllipsis,Pjsxxx},
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"操作",
        visible: false,
        bizPath:'images/khxx/',
        model: {sskhjl:" "},
        jwdxx:'',
        zkhjlacct:'',
        jtcy :[],
        jtxgqklist:[],
        nhcjxxb:{},
        tableDataJtcyxx:[],
        ywhxgywxxmodel:{},
        formData:{},
        formbkbpyData:{},
        zpdfmodel:{},
        zcfzqk :[],
        zcqk:[],
        jyqk:[],
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        qydm:{rules: [{ required: true, message: '请输入区域代码!' }]},
        },
        url: {
          add: "/nh/nhjbxx/add",
          edit: "/nh/nhjbxx/edit",
          list: "/nh/nhjbxx/list",
        },
        jtcycolumns: [
          {
            title: '姓名',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'detail'},
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb',
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'nl',
          },
          {
            title: '电话',
            align:"center",
            dataIndex: 'lxfs',
          },
          {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx',
          },
          {
            title: '联系电话',
            dataIndex: 'sjhm',
            align:"center",
          }, {
            title: '存款余额',
            dataIndex: 'ckye',
            align:"center",
          },
          {
            title: '存款日均',
            dataIndex: 'ckrpye',
            align:"center",
          }, {
            title: '贷款余额',
            dataIndex: 'dkye',
            align:"center",
          }, {
            title: '表内不良余额',
            dataIndex: 'bldkye',
            align:"center",
          }, {
            title: '表外不良余额',
            dataIndex: 'bwbldkye',
            align:"center",
          },
        ],
      }

    },
    created () {
      this.getLocationInfo()
    },
    /*computed: {
      jwdxx: function() {
        // return "经度：" + this.formData.longitude ? this.formData.longitude: "" + "  纬度：" + this.formData.latitude ? this.formData.latitude : ""
        return "经度：" + this.model.longitude + "  纬度：" + this.model.latitude
      },
    },*/

    methods: {
      add () {
        this.zkhjlacct="";
        this.edit({});
        this.$refs.jtcyList.add();
        this.$refs.fcxxList.dataSource_fcqkxx=[];
        this.$refs.zcfzqklist.dataSource_zcqkxx =[];
        this.$refs.fzqktable.dataSource_fzqkxx =[];
        this.$refs.jyqktable.dataSource_jyqkxx = [];

      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'hzxm','sszh','zkhjl','hhbm','ssqy','hkxz','sxdxzjh','pfr','sfbldkh','sfpkh','sfdbh','khzycd','khsxqk','khdj','khqzyw','bz'))
          //加载评级授信数据
          this.$refs.pjsxxx.edit(record)
        });

        //查询所属营销单元
        if(record.ssyxdy) {
          getAction("/nh/nhjbxx/queryCzxxByYxdy", { ssyxdy: record.ssyxdy}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue({ssqy:res.message})
              console.log("---询所属营销单元-----"+res.result)
            }
          });
        };

        //获取附件信息
        //this.bizPath =record.ssyxdy +"/"+ record.hhbm
        if (record.hhbm) {
          console.log(record.hhbm +"--------------hhbm")
          let params = { "hhbm": record.hhbm }
          getAction("/Nhhzzllb/queryNhhzFjxx", params).then((res) => {
            if (res.success) {
              console.log("===============")
              console.log(res.result)
              this.$refs.photoView.showImg(res.result)
            }
          });
        }

        // 农户采集信息
       /* if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm}
          getAction("/nh/nhjbxx/nhcjxx", params).then(res => {
            console.log(res.result)
            this.nhcjxxb = Object.assign({}, res.result.nhcjxxList);
            this.zkhjlacct=res.result.zkhjl_dictText;

            console.log("---农户采集信息-----")
            console.log(this.nhcjxxb)
            this.$nextTick(() => {
              let fieldscjxx = pick(this.nhcjxxb, 'pyxxFlag','khxxFlag','khglFlag','signFlag','sskhjl','gzdw','gzdwdz','khmc','zjhm','whcd','sjhm','hkxz','zz','zz1','zz2','sfbldkh','sfpkh','sfdbh','xtpdjg','xtpdsm','gjrpdjg','gjrpdsm','zzpdjg','zzpdsm','cshygz','sfycdg','kfyyqk','kcqzyw','khsxqk','longitude','latitude','sign1','sign2','bz','byhm','pfr','khlx1','khlx2','zdyzbm','ywzn','jkzk','ldnl','jznx','zgxl','zgxw','ddpzzhpj','jzzt','upDt','upTm','ddpzzhpj1','ddpzzhpj2','khblsh','qzywyysj','hjdz','sfsx')
              this.form.setFieldsValue(fieldscjxx)
            })
          });
        }*/

        //加载家庭相关情况字表数据
        if(record.hhbm) {
          getAction("/nh/nhjbxx/queryJtxxByHhbm", { hhbm: record.hhbm}).then((res) => {
            if (res.success) {
              this.tableDataJtcyxx = res.result;
              console.log("---家庭相关情况-----")
              console.log('dataSource_jtcy', res)
              this.tableDataJtcyxx.filter((item) =>{
                if (item.zjhm ===record.sxdxzjh){
                  console.log(item);
                  this.model.sxdxmc = item.khmc
                }
              })
            }
          });
        };

        // 加载与我行相关业务信息子表数据
       /* if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm,"hmcId":record.id}
          console.log("zjhm"+params)
          getAction("/nh/nhjbxx/queryYwhxgywxx", params,this.form).then(res => {
            this.ywhxgywxxmodel = Object.assign({}, res.result);
            console.log("---与我行相关业务信息-----")
            console.log(this.ywhxgywxxmodel)
            this.$nextTick(() => {
              let fields = pick(this.ywhxgywxxmodel, 'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk')
              this.form.setFieldsValue(fields)
            })
          });
        }*/


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
            if(!this.model.zjhm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let zbtable = Object.assign(this.model, values);

            //获取家庭相关情况子表数据
            console.log("------家庭相关情况---------")
            let jtxgqk = []
            jtxgqk.push(zbtable)
            console.log(jtxgqk)

            //获取房产情况子表数据
           /* console.log("------房产情况表数据---------")
            this.$refs.fcxxList.edit();
            console.log(this.$refs.fcxxList.fcqkxx)


            //获取资产负债情况子表数据
            console.log("------资产负债情况---------")
            this.$refs.zcfzqklist.edit();
            console.log(this.$refs.zcfzqklist.zcfzqk)
            this.zcfzqk = this.$refs.zcfzqklist.zcfzqk

            //获取负债情况子表数据
            console.log("------负债情况---------")
            this.$refs.fzqktable.edit();
            console.log(this.$refs.fzqktable.fzqkxx)
            this.zcqk = this.$refs.fzqktable.fzqkxx


            //获取经营情况子表数据
            console.log("------经营情况---------")
            this.$refs.jyqktable.edit();
            console.log(this.$refs.jyqktable.jyqkxx)
            this.jyqk = this.$refs.jyqktable.jyqkxx*/


            //遍历资产负债情况表数组把数组内的数据汇总成一条
            var zcqk={};
            var hz ={};
            for (let i=0; i<this.zcfzqk.length; i++){
              if (this.zcfzqk[i].zclx == "股权") {
                zcqk ={"gq":this.zcfzqk[i].zclx,"gqsl":this.zcfzqk[i].zcsl,"gqjz":this.zcfzqk[i].zcjg
                ,"gqxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "农机具") {
                zcqk ={"njj":this.zcfzqk[i].zclx,"njjsl":this.zcfzqk[i].zcsl,"njjjz":this.zcfzqk[i].zcjg
                  ,"njjqxsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "家用电器") {
                zcqk ={"jydq":this.zcfzqk[i].zclx,"jydqsl":this.zcfzqk[i].zcsl,"jydqjz":this.zcfzqk[i].zcjg
                  ,"jydqxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "交通工具") {
                zcqk ={"jtgj":this.zcfzqk[i].zclx,"jtgjsl":this.zcfzqk[i].zcsl,"jtgjjz":this.zcfzqk[i].zcjg
                  ,"jtgjxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "其他资产") {
                zcqk ={"qtzc":this.zcfzqk[i].zclx,"qtzcsl":this.zcfzqk[i].zcsl,"qtzcjz":this.zcfzqk[i].zcjg
                  ,"qtzcxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
            }


            var fzqk= {};
            for (let i=0;i<this.zcqk.length ;i++){
              if (this.zcqk[i].jkfs=="本系统"){
                fzqk ={"bxtjkzqr":this.zcqk[i].zqr, "bxtjksl":this.zcqk[i].jkje,"bxtjkxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="他行"){
                fzqk ={"thjkzqr":this.zcqk[i].zqr, "thjksl":this.zcqk[i].jkje,"thjkxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="信用卡"){
                fzqk ={"xykzqr":this.zcqk[i].zqr, "xyksl":this.zcqk[i].jkje,"xykxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="其他"){
                fzqk ={"qtfzzqr":this.zcqk[i].zqr, "qtfzsl":this.zcqk[i].jkje,"qtfzxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
            }


            var jyqk = {};
            for (let i=0;i<this.jyqk.length ;i++){
              if (this.jyqk[i].xmlx=="种植"){
                jyqk ={"种植":this.jyqk[i].xmlx,"zzxmqk":this.jyqk[i].xmqk, "zzxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="养殖"){
                jyqk ={"养殖":this.jyqk[i].xmlx, "yzxmqk":this.jyqk[i].xmqk, "yzxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="商业"){
                jyqk ={"商业":this.jyqk[i].xmlx, "syxmqk":this.jyqk[i].xmqk, "syxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="劳务"){
                jyqk ={"劳务":this.jyqk[i].xmlx, "nwxmqk":this.jyqk[i].xmqk, "nwxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="其他"){
                jyqk ={"其他":this.jyqk[i].xmlx, "qtxmqk":this.jyqk[i].xmqk, "qtxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
            }

            hz = Object.assign(hz,zbtable)
            let pjsxqk = []
            pjsxqk.push(hz)
            console.log("------测试结果---------")
            console.log(hz)
            console.log("------测试结果2---------")

            console.log(pjsxqk)

            let nhcjxx = []
            nhcjxx.push(zbtable)

            let ywhywwlxx = []
            ywhywwlxx.push(zbtable)



            let formData = {
              ...zbtable,
              ywhxgywList: jtxgqk,
              nhfcxxList:this.$refs.fcxxList.fcqkxx,
              nhPjsxxxList:pjsxqk,
              fjglList:[],
              nhbkbpyList:[],
              camsZcsxNhcjxxList:nhcjxx,
              ywhxgywList:ywhywwlxx
            }
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

      GetValueZkhjl(value){
        this.model.sskhjl=value.yggh;
        this.zkhjlacct=value.ygxm;
      },
      SelectChange(value) {
        console.log("-----授信对象-------");
         this.tableDataJtcyxx.filter((item) =>{
             if (item.zjhm ===value){
               console.log(item);
               this.model.sxdxmc = item.khmc
             }
          })
        console.log(this.model.sxdxmc);

      },

      getLocationInfo() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            console.log('获取位置信息成功')
            console.log(position)
            this.model.longitude = position.coords.longitude
            this.model.latitude = position.coords.latitude
           this.jwdxx = "经度：" + this.model.longitude + "  纬度：" + this.model.latitude
          }, error => {
            let message = ''
            switch (error.code) {
            case error.PERMISSION_DENIED:
              message = '您拒绝对获取地理位置的请求'
              break;
            case error.POSITION_UNAVAILABLE:
              message = '位置信息是不可用的,请检查GPS功能是否开启'
              break;
            case error.TIMEOUT:
              message = '获取地理位置超时'
              break;
            case error.UNKNOWN_ERROR:
              message = '未知错误'
              break;
            }
            this.$message({
              message: message,
              type: 'error',
              duration: 3000
            })
          });
        } else {
          console.log('获取位置信息失败')
          this.$message({
            message: '获取位置信息失败！',
            type: 'error',
            duration: 3000
          })
        }
      },
      async showMap() {
        if (!this.model.longitude) {
          //先获取位置信息
          await this.getLocationInfo()
        }
        console.log('showMap')
        console.log(this.model.longitude)
        console.log(this.model.latitude)
        if (this.model.longitude) {
          console.log(this.$refs['vueAMap'])
          // this.$refs['vueAMap'].center = [this.formData.longitude, this.formData.latitude]
          this.$refs['vueAMap'].vueAMapShow = true;
        }
      },

      handleGrxxEdit: function (record) {
        this.$refs.xqModalForm.edit(record);
        this.$refs.xqModalForm.title = "个人信息";
        this.$refs.xqModalForm.disableSubmit = false;
      },

     /* getC(value){
        let that = this;
        that.jtxgqklist=vuels ;
      }*/


      /*requestSubTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource = res.result || []
        }).finally(() => {
          tab.loading = false
        })
      },*/

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>