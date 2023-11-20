<template>
<a-modal :title="title" :width="1200" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="拒绝" ok-text="通过" >
    <template slot="footer">
      <a-button @click="handleCancel">
        关闭
      </a-button>

      <a-button type="primary" @click="handleOk(2)">
        拒绝
      </a-button>

      <a-button type="primary" @click="handleOk(1)">
        通过
      </a-button>
   
    </template>

    <a-spin :spinning="confirmLoading">

        <a-form :form="form">

            <a-card title="审批历史" :bordered="true" v-if="splsTable.dataSource.length > 0">
                <a-table size="small" :columns="splsTable.columns" :dataSource="splsTable.dataSource" :pagination="ipagination" @change="handleTableChange" bordered>
                </a-table>

            </a-card>

            <a-divider>黑名单基础信息</a-divider>
            <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评定时间">
                        <a-input v-model="model.pdsj" disabled></a-input>
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
                        <a-input placeholder="请输入姓名" v-model="model.khmc" disabled />
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号码" width="120px">
                        <a-input placeholder="请输入身份证号码" v-model="model.zjhm" disabled />
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="认定理由">
                        <a-input v-model="model.rdly" disabled />
                    </a-form-item>
                </a-col>

            </a-row>

            <a-divider>审批</a-divider>

            <a-row justify="center">
                <a-col :span="8" :offset="8">
                    <a-timeline>
                        <a-timeline-item color="green">客户经理申请:{{ model.updator_dictText }}</a-timeline-item>
                        <a-timeline-item :color=" model.status > 2 ?'green': 'gray'">风险经理审批:{{ sprall.fxjl != null ? sprall.fxjl:'请设置风险经理'  }}
                        </a-timeline-item>
                        <a-timeline-item :color=" model.status > 3 ?'green': 'gray'">
                            支行行长审批:{{ sprall.zhhz != null ? sprall.zhhz:'请设置支行行长'}}
                        </a-timeline-item>
                        <a-timeline-item :color=" model.status > 4 ?'green': 'gray'">
                            总行审批:{{ sprall.zhspr != null ? sprall.zhspr:'请设置总行审批人员' }}
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>

            <a-row type="flex" justify="start" align="middle">
                <a-col :span="12" :offset="2">
                    <a-form-item>
                        <font bold color="red"> <strong>评定意见:</strong></font>
                        <a-textarea :rows="4" v-model="model.yj" />
                    </a-form-item>
                </a-col>

            </a-row>

        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import {
    httpAction,
    getAction
} from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
import {
    get
} from 'xe-utils/methods'
import store from '@/store/'

export default {
    name: "PjsxHmdModal",
    data() {
        return {
            title: "操作",
            visible: false,
            model: {},
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },

            confirmLoading: false,
            form: this.$form.createForm(this),
            validatorRules: {
                rdly: {
                    rules: [{
                        required: true,
                        message: '请选择认定理由!'
                    }]
                },
                khmc: {
                    rules: [{
                        required: true,
                        message: '请输入姓名!'
                    }]
                },
                zjhm: {
                    rules: [{
                        required: true,
                        message: '请输入证件号码!'
                    }]
                },
            },
            url: {
                add: "/pjsx/pjsxHmd/add",
                edit: "/pjsx/pjsxHmd/edit",
            },
            splsTable: {
                loading: false,
                dataSource: [],
                columns: [{
                        title: '审批人',
                        key: 'yggh',
                        align: 'center',
                        dataIndex: 'yggh_dictText'

                    },
                    {
                        title: '审批意见',
                        key: 'spyj',
                        align: 'center',
                        dataIndex: 'spyj'
                    },
                    {
                        title: '审批结果',
                        key: 'status',
                        align: 'center',
                        dataIndex: 'status_dictText'
                    },
                    {
                        title: '审批时间',
                        key: 'createTime',
                        align: 'center',
                        dataIndex: 'createTime'

                    }
                ]
            },
            sprall: {}
        }
    },
    created() {},
    methods: {
        add() {
            this.edit({});
        },
        edit(record) {
            this.loadSpls(record.zjhm);
            this.loadsprall();
            this.model = Object.assign({}, record);
            this.visible = true

        },
        loadSpls(zjhm) {
            getAction("/pjsx/pjsxHmd/spls", {
                zjhm: zjhm
            }).then(res => {
                if (res.success) {
                    if (res.success) {
                        this.splsTable.dataSource = res.result.records
                        this.ipagination.total = res.result.total
                    } else {
                        this.dataSource = []
                        this.ipagination.total = 0
                    }
                }
            })
        },
        loadsprall() {
            getAction("/pjsx/pjsxHmd/sprall").then(res => {
                if (res.success) {
                    if (res.success) {
                        this.sprall = res.result
                    }
                }
            })
        },

        close() {
            this.$emit('close');
            this.visible = false;
        },
        handleOk(val) {

            if (this.model.yj == undefined || this.model.yj == null || this.model.yj == '') {
                this.$message.error('请填写审批意见')
                return
            }
            this.model.ty=val

            getAction("/pjsx/pjsxHmd/updateSpls", this.model).then(res => {
                if (res.success) {
                    this.$message.success("成功")
                    this.visible = false
                    this.$emit('ok');
                }
            })

        },
        handleCancel() {
            this.close()
        },

    }
}
</script>

<style lang="less" scoped>

</style>
