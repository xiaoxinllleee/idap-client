<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    footer=""
  >
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
       <!-- <a-tabs default-active-key="1">
          <a-tab-pane tab="客户基本信息" key="1" :forceRender="true">-->
        <a-divider orientation="left" style="color: #1890FF;">客户基本信息</a-divider>
        <a-row  class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input  hidden="true"  v-decorator="['hhbm', {}]"   />
              <a-input  hidden="true"  v-decorator="['sszh', {}]"   />
              <a-input  hidden="true"  v-decorator="['ssyxdy', {}]"   />
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码"  :disabled="this.showZjhm" v-decorator="['zjhm', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="地址">
              <a-input placeholder="请输入地址" v-decorator="['dz', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>





        <a-divider orientation="left" style="color: #1890FF;">共同借款人承诺书</a-divider>
        <a-row  class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="对外担保">
              <a-input placeholder="请输入对外担保" v-decorator="['dwdb', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="担保对象">
              <a-input placeholder="请输入担保对象" v-decorator="['dbdx', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="其他用信">
              <a-input placeholder="请输入其他用信" v-decorator="['qtyx', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row  class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="共同借款人">
              <a-input placeholder="请输入共同借款人" v-decorator="['gtjkr', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指定签收人">
              <a-input placeholder="请输入指定签收人" v-decorator="['zdqsr', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="签收人手机">
              <a-input placeholder="请输入签收人手机" v-decorator="['qsrsj', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row  class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="签收人传真">
              <a-input placeholder="请输入签收人传真" v-decorator="['qsrcz', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="签收人邮箱">
              <a-input placeholder="请输入签收人邮箱" v-decorator="['qsryx', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="签收人微信">
              <a-input placeholder="请输入签收人微信" v-decorator="['qsrwx', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row  class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="其他签收方式">
              <a-input placeholder="请输入其他签收方式" v-decorator="['qtqsfs', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              >

            </a-form-item>
          </a-col>

          <a-col :lg="8" align="right">
              <a-button type="primary" @click="viewGt()">
                预览打印共同借款人承诺书
              </a-button>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="color: #1890FF;">征信报告修正</a-divider>
        <div>
          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              配偶名称:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请输入配偶名称"  v-model="pname"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              配偶身份证号码:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请输入配偶身份证号码"  v-model="pzjhm"  type="number"  size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row type="flex"  justify="end">
            <a-button type="primary" @click="viewZxbg()">
              预览打印征信报告
            </a-button>
          </a-row>
        </div>

        <a-divider orientation="left" style="color: #1890FF;">个人贷款面谈记录修正</a-divider>
        <div>
          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              申请金额:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请输入金额"  type="number" prefix="￥" v-decorator="['sqje', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>万元
              </a-form-item>
            </a-col>
          </a-row>
          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              借款用途:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请填写借款用途(不多于50字)"  v-decorator="['jkyt', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              借款期限:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请输入月数"  v-decorator="['jkqx', {}]"  type="number"  size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px"/>月
              </a-form-item>
            </a-col>
          </a-row>

          <a-row type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              家庭年收入合计:
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item >
                <a-input    placeholder="请输入金额"  type="number" v-decorator="['zczeHj', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
              </a-form-item>
            </a-col>
          </a-row>

          <a-row type="flex"  justify="end">
            <a-button type="primary" @click="viewMt()">
              预览打印个人贷款面谈记录
            </a-button>
          </a-row>
        </div>

        <a-divider orientation="left" style="color: #1890FF;">抵押物评估报告单修正</a-divider>


        <a-card class="card" :bordered="false">

            <a-tab-pane tab="抵押担保" :key="refKeys[0]" :forceRender="true">
              <j-editable-table
                :ref="refKeys[0]"
                :loading="dydbTable.loading"
                :columns="dydbTable.columns"
                :dataSource="dydbTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="true"/>
            </a-tab-pane>
        </a-card>
        <a-row type="flex"  justify="end">
          <a-button type="primary" @click="viewDydb()">
            预览打印抵押物评估报告单
          </a-button>
        </a-row>

        <br/>
        <br/>
        <br/>
        <a-row type="flex"  justify="end">
          <a-button type="dashed" @click="handleCancel">
            关闭
          </a-button>
        </a-row>
          <!--</a-tab-pane>
        </a-tabs>-->
      </a-form>


      <!-- 子表单区域 -->

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import JSelectEjyxdy from '@/views/yxdygl/pqzrrgl/modules/JSelectEjyxdy'
  import JSelectSjyxdy from '@/views/yxdygl/pqzrrgl/modules/JSelectSjyxdy'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import ARow from 'ant-design-vue/lib/grid/Row'
  import { VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { getAction, putAction } from '@/api/manage'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import PhotoView from './PhotoView.vue'

  export default {
    name: 'GrdkglModal',
    mixins: [JEditableTableMixin],
    components: {ARow,JSelectEjyxdy,JSelectSjyxdy,JDictSelectTag,JMultiSelectTag},
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['dydb'],
        activeKey: 'dydb',
        sfrqksmShow:false,
        fxxxqksmShow:false,
        pname:"",
        pzjhm:"",
        pid:"",
        // 抵押担保
        dydbTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '抵押物类型',
              key: 'zywlx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'grdk_dzylx_dy',

            },
            {
              title: '所有权人',
              key: 'syqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '与被调查人关系',
              key: 'ybdcrgx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'yhzgx',

            },
            {
              title: '评估值',
              key: 'pgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '使用权面积',
              key: 'syqmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产登记证号',
              key: 'bdcdjzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产用途',
              key: 'bdcyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产建成时间',
              key: 'bdcjcsj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产每方单价',
              key: 'bdcmpfdj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '所有权人电话',
              key: 'syqrdh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '抵押贷款金额',
              key: 'dydkje',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地证号',
              key: 'tdzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地类型',
              key: 'tdlx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地用途',
              key: 'tdyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地使用面积',
              key: 'tdsymj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地终止日期',
              key: 'tdzzrq',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产证号',
              key: 'fczh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '总层数',
              key: 'zcs',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '整栋用途',
              key: 'zdyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产建成时间',
              key: 'fcjcsj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋楼层',
              key: 'fclc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋用途',
              key: 'fcyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋建筑面积',
              key: 'fcjzmj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '整栋建筑面积',
              key: 'zdljzmj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/xdgl/grdkgl/add",
          edit: "/xdgl/grdkgl/edit",
          jtcyxx: {
            list: '/xdgl/grdkgl/queryPeiouByMainId',
            query:'/xdgl/grdkgl/queryJtcyxxByMainHhbm'
          },
          dydb: {
            list: '/xdgl/grdkgl/queryDydbByMainId'
          }
        },
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        showZjhm:true,
      }
    },

    methods: {
      add (value) {
        this.edit({});
        this.$nextTick(() => {
           this.form.setFieldsValue({ zjhm: value.zjhm})
           this.form.setFieldsValue({csny:value.zjhm.substr(6,8)})
        });
      },

      edit(record) {
        console.log(record)
        if (typeof this.editBefore === 'function') this.editBefore(record)
        this.visible = true
        this.activeKey = this.refKeys[1]
        this.form.resetFields()
        this.pid = "";
        this.pname = "";
        this.pzjhm = "";
        this.model = Object.assign({}, record)

        if (typeof this.editAfter === 'function') this.editAfter(this.model)
      },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'khmc', 'zjhm',  'dwdb', 'dbdx', 'qtyx', 'gtjkr', 'zdqsr', 'qsrsj', 'qsrcz', 'qsryx', 'qsrwx', 'qtqsfs',   'sqje', 'jkyt', 'jkqx',  'dz','zczeHj' ))
        })
        // 加载子表数据
        if (this.model.id) {
          let paramshhmm = { hhbm: this.model.hhbm }
          let paramszjhm = { id: this.model.zjhm }
          //this.requestSubTableData(this.url.jtcyxx.list, paramshhmm, this.jtcyxxTable)
          this.initPeiou(this.url.jtcyxx.query,paramshhmm)
          this.requestSubTableData(this.url.dydb.list, paramszjhm, this.dydbTable)
        }

      },
      initPeiou(url,params){
        getAction(url, params).then(res => {
          if (res.success){
            if (res.result != null){
              this.pname = res.result.khmc;
              this.pzjhm = res.result.zjhm;
              this.pid = res.result.id;
            }
          }
        })
      },


      /** 整理成formData */
      classifyIntoFormData(allValues) {

        //main.sfrqksm = main.sfrqksm ? main.sfrqksm.format() : null;
        return {
          jtcyxxList: allValues.tablesValue[0].values,
          dydbList: allValues.tablesValue[1].values,
        }
      },

      handleCancel() {
        this.close()
      },
      viewMt(){

        this.form.validateFields((err, values) => {
          let formData={}
          formData.sqje = values.sqje;
          formData.id = this.model.id;
          formData.jkyt = values.jkyt;
          formData.jkqx = values.jkqx;
          formData.zczeHj = values.zczeHj;
          putAction('/wordinfo/camsZcsxWordinfo/grdkMt',formData).then((res)=>{
            if(res.success){
              let url= `${window._CONFIG['staticDomainURL']}/`+ res.message
              window.open(
                //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }else {
              this.$message.warning("预览文件失败");
            }
          })
        })

      },

      viewGt(){

        this.form.validateFields((err, values) => {
          let formData={}
          formData.id = this.model.id;
          formData.zjhm = this.model.zjhm;
          formData.khmc = this.model.khmc;
          formData.dwdb = values.dwdb;
          formData.dbdx = values.dbdx;
          formData.qtyx = values.qtyx;
          formData.gtjkr = values.gtjkr;
          formData.zdqsr = values.zdqsr;
          formData.qsrsj = values.qsrsj;
          formData.qsrcz = values.qsrcz;
          formData.qsryx = values.qsryx;
          formData.qsrwx = values.qsrwx;
          formData.qtqsfs = values.qtqsfs;
          formData.dz = values.dz;
          console.log(formData)
          putAction('/wordinfo/camsZcsxWordinfo/grdkGt',formData).then((res)=>{
            if(res.success){
              let url= `${window._CONFIG['staticDomainURL']}/`+ res.message
              window.open(
                //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }else {
              this.$message.warning("预览文件失败");
            }
          })
        })

      },
      viewDydb(){
      // 获取所有表单的值，并进行验证
        this.$refs.dydb.getValues((error, values) => {
          let formData={}
          formData.id = this.model.id;
          formData.zjhm = this.model.zjhm;
          formData.khmc = this.model.khmc;
          formData.dydbs = values;
          putAction('/wordinfo/camsZcsxWordinfo/grdkDydb',formData).then((res)=>{
            if(res.success){
              let url= `${window._CONFIG['staticDomainURL']}/`+ res.message
              window.open(
                //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }else {
              this.$message.warning("预览文件失败");
            }
          })
        })
      },viewZxbg(){
        let formData={}
        formData.id = this.model.id;
        formData.pid = this.pid;
        formData.zjhm = this.model.zjhm;
        formData.khmc = this.model.khmc;
        formData.hhbm = this.model.hhbm;
        formData.pname = this.pname;
        formData.pzjhm = this.pzjhm;
        putAction('/wordinfo/camsZcsxWordinfo/zxbg',formData).then((res)=>{
          if(res.success){
            let url= `${window._CONFIG['staticDomainURL']}/`+ res.message
            window.open(
              //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
          }else {
            this.$message.warning("预览文件失败");
          }
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>