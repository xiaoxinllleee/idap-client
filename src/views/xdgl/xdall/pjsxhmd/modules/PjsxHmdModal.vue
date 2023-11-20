<template>
<a-modal :title="title" :width="1200" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">

    <a-spin :spinning="confirmLoading">
        <a-form :form="form">

            <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评定时间">
                        <a-date-picker v-decorator="[ 'pdsj', {}]" />
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
                        <a-input placeholder="请输入姓名" v-decorator="['khmc', validatorRules.khmc]" />
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号码" width="120px">
                        <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', validatorRules.zjhm]" />
                    </a-form-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="认定理由">
                        <j-dict-select-tag placeholder="请选择认定理由" v-decorator="['rdly', validatorRules.rdly ]" dictCode="pjsx_hmd_rdly" 
                        :trigger-change="true" />
                    </a-form-item>
                </a-col>
                

            </a-row>


        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import {
    httpAction
} from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"

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
        }
    },
    created() {},
    methods: {
        add() {
            this.edit({});
        },
        edit(record) {
            this.form.resetFields();
            this.model = Object.assign({}, record);
            this.visible = true;
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'khmc', 'zjhm', 'rdly'))
                //时间格式化
                this.form.setFieldsValue({
                    pdsj: this.model.pdsj ? moment(this.model.pdsj) : null
                })
            });

        },
        close() {
            this.$emit('close');
            this.visible = false;
        },
        handleOk() {
            const that = this;
            // 触发表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.confirmLoading = true;
                    let httpurl = '';
                    let method = '';
                    if (!this.model.id) {
                        httpurl += this.url.add;
                        method = 'post';
                    } else {
                        httpurl += this.url.edit;
                        method = 'put';
                    }
                    let formData = Object.assign(this.model, values);
                    //时间格式化
                    formData.pdsj = formData.pdsj ? formData.pdsj.format() : null;

                    console.log(formData)
                    httpAction(httpurl, formData, method).then((res) => {
                        if (res.success) {
                            that.$message.success(res.message);
                            that.$emit('ok');
                        } else {
                            that.$message.warning(res.message);
                        }
                    }).finally(() => {
                        that.confirmLoading = false;
                        that.close();
                    })

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
