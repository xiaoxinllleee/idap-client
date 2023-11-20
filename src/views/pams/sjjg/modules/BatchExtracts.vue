<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <a-card style="margin-top: 10px" :bordered="false" title="批量提取">
      <form>
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开始日期">
              <a-date-picker  placeholder="请输入开始日期" v-model="tjrqb"></a-date-picker >
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="结束日期">
              <a-date-picker placeholder="请输入结束日期" v-model="tjrqe"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-button type="primary" icon="download"  @click="doExec()">提取</a-button>
          </a-col>
        </a-row>
      </form>
      <a-divider type="horizontal" />

    </a-card>
  </a-modal>
</template>

<script>
  import {jxextractBatchs} from '@/api/api'
  import moment from 'moment'
  import { notification } from 'ant-design-vue';

  export default {
    name: 'BatchExtract',
    description: '提取',
    components: {
      notification
    },
    data(){
      return {
        rowData:{},
        ids:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        tjrqb:'',
        tjrqe:'',
        title: '',
        visible: false,
        confirmLoading: false,
        videoPaths: '',
        filePaths: '',
        url:{
          list: '',
          exportXlsUrl: '',
          importExcelUrl: '',
        },
        disabled: true,
      }
    },
    methods: {
      created() {
        this.disabled = true
      },
      showModal(ids) {
        this.ids=ids;
        this.visible = true
      },
      importChange(data) {
        console.log("data")
        console.log(data)
        this.filePaths = data.path
        if (this.filePaths.length > 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }

      },
      doExec() {
        var that=this;
        if(that.tjrqb==''||that.tjrqe==''){
          that.$message.error("请选择开始日期或者结束日期！");
          return;
        }
        if(that.tjrqe.isBefore(that.tjrqb)){
          that.$message.error("开始日期必须小于结束日期！");
          return;
        }
        var newDate=new Date();
        if(moment(newDate).isBefore(that.tjrqe)){
          that.$message.error("结束日期不能大于系统当前日期！");
          return;
        }
        jxextractBatchs({rwid:that.ids,ksrq:that.tjrqb.format("YYYYMMDD"),jsrq:that.tjrqe.format("YYYYMMDD") }).then((res) => {
          if (res.success) {
            notification.open({
              type:'success',
              message: '提取成功',
              description:
                '请前往日历页面查看提取详情！',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          } else {
            notification.open({
              type:'error',
              message: '提取失败',
              description: res.message,
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          }
        });
        that.handleOk();
      },
      handleOk () {
        this.$emit('ok');
        this.close()
      },
      handleCancel () {
        this.close()
      },
      close () {
        this.tjrqe='';
        this.tjrqb='';
        this.rowData={};
        this.$emit('close')
        this.visible = false
      },
    }
  }
</script>

<style scoped>

</style>