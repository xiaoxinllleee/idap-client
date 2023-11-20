<template>
  <a-modal
    title='调度详情'
    width='80%'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleCancel'
    @cancel='handleCancel'
    cancelText='关闭'
    style='top:20px;'
  >
    <a-spin :spinning='confirmLoading'>
      <!-- table区域-begin -->
      <div>
        <a-table
          ref='table'
          size='middle'
          bordered
          :rowKey='rowKey'
          :columns='columns'
          :scroll='{ x:1400 }'
          :dataSource='dataSource'
          :pagination='ipagination'
          :loading='loading'
        >
          <span slot='action' slot-scope='text, record'>
            <a v-show='repeatExecutes' @click="rightAwayExecute(record)" >重新执行</a>
            <!--            <a-divider type="vertical" />
                        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                              <a>删除</a>
                            </a-popconfirm>-->
        </span>

        </a-table>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { changePassword } from '@/api/api'
  import md5 from 'md5'
  import { deleteAction, getAction, postAction } from '../../../api/manage'

  export default {
    name: 'LogModal',
    data() {
      return {
        repeatExecute:true,
        dataSource: [],
        loading: false,
        ipagination: {},
        rowKey: '',
        url: {
          delete:'/lyr/sysQuartLog/delete',
          LogUrl: '/lyr/sysQuartLog/queryByJobId',
          repeatUrl:'/lyr/sysQuartLog/repeatExecute'
        },
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          // {
          //   title: 'Job唯一标识',
          //   align: 'center',
          //   dataIndex: 'jobId',
          //   width: 170
          // },
          // {
          //   title: '任务组名',
          //   align: 'center',
          //   width: 80,
          //   dataIndex: 'jobGroup'
          // },
          {
            title: '开始时间',
            align: 'center',
            width: 80,
            dataIndex: 'startTime'
          },
          {
            title: '结束时间',
            align: 'center',
            width: 80,
            dataIndex: 'endTime'
          },
          {
            title: '任务类名',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'jobClassName'
          },
          {
            title: '执行结果',
            align: 'center',
            width: 70,
            dataIndex: 'status_dictText'
          },
          {
            title: '执行信息',
            ellipsis: true,
            align: 'center',
            width: 150,
            dataIndex: 'info'
          },
          //
          // {
          //   title: '下次执行时间',
          //   align: 'center',
          //   width: 110,
          //   dataIndex: 'nextFireTime'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'action' }
          }
        ],

        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        model: {},

        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        form: this.$form.createForm(this)
      }
    },
    created() {
      console.log('created')
    },
    computed: {

      repeatExecutes: {
        get() {
          return true
        }
      }
    },

    methods: {
      rightAwayExecute(record)
      {
        let that=this;
        postAction(that.url.repeatUrl, record).then((res) => {
          if (res.success) {
            let records={id:record.jobId};
            this.initLogInfo(records);
            that.$message.success(res.message)
          } else {
            that.$message.warning(res.message)
          }
        })

      },
      handleDelete(record)
      {
        let that = this
        deleteAction(that.url.delete, { id: record.id }).then((res) => {
          if (res.success) {
            let records={id:record.jobId};
            this.initLogInfo(records);
            that.$message.success(res.message)
          } else {
            that.$message.warning(res.message)
          }
        })
        this.visible = true
      },
      initLogInfo(record) {
        let that = this
        getAction(that.url.LogUrl, { id: record.id }).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
          } else {
            that.$message.warning(res.message)
          }
        })
        this.visible = true
      },
      show(username) {
        this.form.resetFields()
        this.visible = true
        this.model.username = username
        this.$nextTick(() => {
          this.form.setFieldsValue({ username: username })
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
      },
      handleSubmit() {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true
            let formData = Object.assign(this.model, values)
            let password = md5(values.password)
            let params = { username: values.username, password: password }
            changePassword(params).then((res) => {
              if (res.success) {
                this.$message.success(res.message)
                this.$emit('ok')
              } else {
                this.$message.warning(res.message)
              }
            }).finally(() => {
              this.confirmLoading = false
              this.close()
            })
          }
        })
      },
      handleCancel() {
        this.close()
      }

    }
  }
</script>