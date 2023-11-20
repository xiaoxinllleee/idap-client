<template>
<a-modal :title="title" :width="1200" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">

    <a-spin :spinning="confirmLoading">
        <a-form :form="form">

            <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
                        <a-input placeholder="请输入姓名" v-decorator="['khmc', validatorRules.khmc]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                        <a-input placeholder="请输入证件号码" v-decorator="['zjhm',  validatorRules.zjhm]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="镇">
                        <a-select placeholder="请选择镇" v-decorator="['zhen', validatorRules.zhen]" @change="selectValue" :allowClear="true">
                            <a-select-option v-for="item in zhenList" :key="item.wgbh" :value="item.wgmc">{{ item.wgmc }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="村">
                        <a-select placeholder="请选择村" v-decorator="['cun', validatorRules.cun]"  :allowClear="true">
                            <a-select-option v-for="item in cunList" :key="item.wgbh" :value="item.wgmc">{{ item.wgmc }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组">
                        <a-input placeholder="请输入组" v-decorator="['zu', validatorRules.zu]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                        <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户主姓名">
                        <a-input placeholder="请输入户主姓名" v-decorator="['hzxm', {}]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户主证件号码">
                        <a-input placeholder="请输入户主证件号码" v-decorator="['hzzjhm', {}]" />
                    </a-form-item>
                </a-col>

                <a-col :lg="8">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                        <a-input placeholder="请输入与户主关系" v-decorator="['yhzgx', {}]" />
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
import {
    getAction
} from '../../../../../api/manage'

export default {
    name: "PjsxZhsjModal",
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
                    span: 5
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                },
            },

            confirmLoading: false,
            form: this.$form.createForm(this),
            validatorRules: {
                khmc: {
                    rules: [{
                        required: true,
                        message: '姓名不能为空!'
                    }]
                },
                zjhm: {
                    rules: [{
                        required: true,
                        message: '身份证号码不能为空!'
                    }]
                },
                cun: {
                    rules: [{
                        required: true,
                        message: '村不能为空!'
                    }]
                },
                zu: {
                    rules: [{
                        required: true,
                        message: '组不能为空!'
                    }]
                },
                zhen: {
                    rules: [{
                        required: true,
                        message: '镇不能为空!'
                    }]
                },
            },
            url: {
                add: "/nhxq/pjsxZhsj/add",
                edit: "/nhxq/pjsxZhsj/edit",
            },
            zhenList:[],
            cunList:[],
        }
    },
    created() {
    },
    methods: {
        loadZhen() {
            getAction("/nhxq/pjsxZhsj/getByQydm", {
                wgxz: '1'
            }).then(res => {
                if (res.success){
                    this.zhenList = res.result
                }
            })
        },

        loadCun(val) {
            this.form.setFieldsValue({cun: ''})
            getAction("/nhxq/pjsxZhsj/getByQydm", {
                parentId: val
            }).then(res => {
                if (res.success){
                    this.cunList = res.result
                }
            })
        },

        selectValue(value) {
            let wgbh;
            for(var i =0;i<this.zhenList.length;i++){
                let obj = this.zhenList[i];
                if (obj.wgmc = value){
                    wgbh = obj.wgbh
                }
            }
            this.loadCun(wgbh);
        },
        add() {
            this.edit({});
        },
        edit(record) {
            this.loadZhen();
            this.form.resetFields();
            this.model = Object.assign({}, record);
            this.visible = true;
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'creator', 'updator', 'zzbz', 'khmc', 'zjhm', 'zhen', 'cun', 'zu', 'hhbm', 'hzxm', 'hzzjhm', 'yhzgx'))
                //时间格式化
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
