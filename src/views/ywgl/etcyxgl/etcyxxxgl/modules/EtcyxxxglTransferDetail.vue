<template>
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: true} }"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
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
        handler(val) {
          console.log('watch modalCreated', val)
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
        disableMixinCreated: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          yggh:{rules: [{ required: true, message: '请选择接收员工' }]},
          yjrq:{rules: [{ required: true, message: '请选择移交日期' }]},
          yjlx:{rules: [{ required: true, message: '请选择移交类型' }]},
        },
        url: {
          list: "/etcyxxxgl/etcyxxxgl/transfer/detail",
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
            title: '原营销机构代码',
            align:"center",
            dataIndex: 'yyxjgdm',
            width: 100
          },
          {
            title: '原营销人工号',
            align:"center",
            dataIndex: 'yyxrgh',
            width: 100
          },
          {
            title: '移交营销机构代码',
            align:"center",
            dataIndex: 'xyxjgdm',
            width: 100
          },
          {
            title: '移交营销人工号',
            align:"center",
            dataIndex: 'xyxrgh',
            width: 100
          },
          {
            title: '办理渠道',
            align:"center",
            dataIndex: 'blqd',
            width: 100
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm',
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'khsfzh',
            width: 140
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
            dataIndex: 'cpys',
            width: 100
          },
        ],
      }
    },
    methods: {
      showModal (queryParam) {
        this.queryParam = Object.assign({}, queryParam)
        if (this.queryParam.tjyf) {
          this.queryParam.tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        this.queryParam.tableId = this.modalParam.tableId
        this.visible = true
        this.loadData(1)
      },
      initQueryParams() {
        console.log('initQueryParams', this.modalParam)
        this.queryParam.tableId = this.modalParam.tableId
      },
      close () {
        this.$emit('close');
        this.modalCreated = false
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