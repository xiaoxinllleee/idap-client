<template>
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="接收人姓名">
              <j-select-yggwxx type="radio" ref="selectYggwxx" @change="getYgxx"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="接收人工号">
              <a-input placeholder="请输入接收人工号" v-decorator="['yggh', validatorRules.yggh]" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标志">
          <a-input placeholder="请输入组织标志" v-decorator="['zzbz', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <a-input placeholder="请输入组织名称" v-decorator="['zzmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="移交日期">
          <a-date-picker v-decorator="[ 'yjrq', validatorRules.yjrq ]" style="width: 100%"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="移交类型">
              <a-select placeholder="请选择移交类型" v-decorator="['yjlx', validatorRules.yjlx]" style="width: 100%">
                <a-select-option value="null">
                  请选择
                </a-select-option>
                <a-select-option value="1">
                  全部移交
                </a-select-option>
                <a-select-option value="2">
                  选择移交
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请说明">
          <a-input placeholder="请输入申请说明" v-decorator="['sqsm', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
		
      </a-form>

      <!-- table区域-begin -->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :scroll="{x:1600}"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JSelectYggwxx from '@/components/jeecgbiz/JSelectYggwxx'
  export default {
    name: "EtcyxxxglModal",
    mixins:[JeecgListMixin],
    components: {
      JSelectYggwxx
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: true,
        disableMixinCreated: true,
        model: {},
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
        validatorRules:{
          yggh:{rules: [{ required: true, message: '请选择接收员工' }]},
          yjrq:{rules: [{ required: true, message: '请选择移交日期' }]},
          yjlx:{rules: [{ required: true, message: '请选择移交类型' }]},
        },
        url: {
          list: "/etcyxxxgl/etcyxxxgl/transfer",
          transferSave: "/etcyxxxgl/etcyxxxgl/transfer/save",
        },
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '开户网点名称',
            align:"center",
            dataIndex: 'frhjgmc'
          },
          {
            title: '营业网点名称',
            align:"center",
            dataIndex: 'yywdmc'
          },
          {
            title: '办理渠道',
            align:"center",
            dataIndex: 'blqd',
            width: 100
          },
          {
            title: '办理员工姓名',
            align:"center",
            dataIndex: 'blygxm'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'khsfzh'
          },
          {
            title: '车牌号码',
            align:"center",
            dataIndex: 'cphm',
            width: 110
          },
          {
            title: '车牌颜色',
            align:"center",
            dataIndex: 'cpys'
          },
          {
            title: '营销人姓名',
            align:"center",
            dataIndex: 'yxrxm'
          },
          {
            title: '营销机构名称',
            align:"center",
            dataIndex: 'yxjgdm'
          },
        ],
      }
    },
    methods: {
      showModal (queryParam) {
        console.log('showModal', queryParam)
        delete queryParam.khrq;
        this.queryParam = Object.assign({}, queryParam)
        if (this.queryParam.tjyf) {
          this.queryParam.tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        this.visible = true
        this.loadData(1)
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
            let formData = Object.assign(this.model, values, this.queryParam);
            //时间格式化
            formData.yjrq = formData.yjrq?formData.yjrq.format('YYYY-MM-DD'):null;
            //选中的记录
            formData.selectionRows = this.selectionRows
            console.log(formData)
            httpAction(this.url.transferSave,formData,'post').then((res)=>{
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
      getYgxx(ygxx) {
        console.log('getYgxx', ygxx)
        this.form.setFieldsValue({zzbz: ygxx.zzbz, zzmc: ygxx.zzmc, yggh: ygxx.yggh})
      }

    }
  }
</script>

<style lang="less" scoped>

</style>