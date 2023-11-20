<template>
<a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="认定支行">
                        <j-tree-select placeholder="请选择认定支行" v-model="queryParam.rdzh" treeNodeFilterProp="title" pid-field="sjzzbz" dict="v_hr_bas_organization_cmms, zzjc, zzbz" :showSearch="true" :treeDefaultExpandAll="true" />
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="状态">
                        <j-dict-select-tag v-model="queryParam.status" placeholder="请选择状态" dictCode="pjsx_hmd_status" allowClear />
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="姓名">
                        <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="身份证号码">
                        <a-input placeholder="请输入身份证号码" v-model="queryParam.zjhm"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="评定人">
                        <a-input placeholder="请输入评定人工号" v-model="queryParam.updator"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="认定理由">
                      <j-dict-select-tag v-model="queryParam.rdly" placeholder="请选择认定理由" dictCode="pjsx_hmd_rdly" allowClear />
                    </a-form-item>
                </a-col>
                <template v-if="toggleSearchStatus">

                </template>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                        <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                        <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                        <a @click="handleToggleSearch" style="margin-left: 8px">
                            {{ toggleSearchStatus ? '收起' : '展开' }}
                            <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
                        </a>
                    </span>
                </a-col>

            </a-row>
        </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
        <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
        <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('评级授信黑名单')">导出</a-button>

        <a-button type="primary" icon="download" @click="expComonTemp('pjsxhmd.xlsx')">导入模版下载
        </a-button>
        <a-button icon="import" @click="excelImport">导入</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
                <a-menu-item key="1" @click="batchDel">
                    <a-icon type="delete" />删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作
                <a-icon type="down" />
            </a-button>
        </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table ref="table" size="middle" bordered :rowKey="rowKey" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange">

            <span slot='zt' slot-scope='text, record'>
                <a-tag v-if="record.status == 2" color="red">失效</a-tag>
                <a-tag v-if="record.status == 3" color="purple">风险经理审批</a-tag>
                <a-tag v-if="record.status == 4" color="volcano">支行行长审批</a-tag>
                <a-tag v-if="record.status == 5" color="volcano">总行审批</a-tag>
                <a-tag v-if="record.status == 1" color="green">生效</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a @click="handleEdit(record)">编辑</a>

                <a-divider type="vertical" />

                <a-button type="primary" size="small" v-if="record.status==3&&roles.indexOf('风险经理') > -1" @click="jrlc(record)">去审批</a-button>
                <a-divider type="vertical" v-if="record.status==3&&roles.indexOf('风险经理') > -1" />
                <a-button type="primary" size="small" v-if="record.status==4&&roles.indexOf('支行行长') > -1" @click="jrlc(record)">去审批</a-button>
                <a-divider type="vertical" v-if="record.status==4&&roles.indexOf('支行行长') > -1" />
                <a-button type="primary" size="small" v-if="record.status==5&&sfzhspr" @click="jrlc(record)">去审批</a-button>
                <a-divider type="vertical" v-if="record.status==5&&sfzhspr" />

                <a-dropdown>
                    <a class="ant-dropdown-link">更多
                        <a-icon type="down" /></a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                                <a>删除</a>
                            </a-popconfirm>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </span>

        </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxHmd-modal ref="modalForm" @ok="modalFormOk"></pjsxHmd-modal>
    <excel-import ref="excelImportModal" @okFile="importComplete" />
    <pjsx-hmd-spls-modal ref="splsForm" @ok="loadData"></pjsx-hmd-spls-modal>

</a-card>
</template>

<script>
import PjsxHmdModal from './modules/PjsxHmdModal'
import PjsxHmdSplsModal from './modules/PjsxHmdSplsModal'
import {
    JeecgListMixin
} from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import store from '@/store/'
import {
    mapGetters
} from 'vuex'
import {
    getAction
} from '../../../../api/manage'

export default {
    name: "PjsxHmdList",
    mixins: [JeecgListMixin],
    components: {
        PjsxHmdModal,
        ExcelImport,
        JTreeSelect,
        PjsxHmdSplsModal
    },
    data() {
        return {
            description: '评级授信黑名单管理页面',
            // 表头
            columns: [{
                    title: '#',
                    dataIndex: '',
                    key: 'rowIndex',
                    width: 60,
                    align: "center",
                    customRender: function (t, r, index) {
                        return parseInt(index) + 1;
                    }
                },
                {
                    title: '创建人',
                    align: "center",
                    dataIndex: 'updator_dictText'
                },
                {
                    title: '评定时间',
                    align: "center",
                    dataIndex: 'pdsj'
                },
                {
                    title: '状态',
                    align: "center",
                    dataIndex: 'status',
                    scopedSlots: {
                        customRender: 'zt'
                    },
                },
                {
                    title: '姓名',
                    align: "center",
                    dataIndex: 'khmc'
                },
                {
                    title: '身份证号码',
                    align: "center",
                    dataIndex: 'zjhm'
                },
                {
                    title: '认定理由',
                    align: "center",
                    dataIndex: 'rdly_dictText'
                },
                {
                    title: '认定支行',
                    align: "center",
                    dataIndex: 'rdzh_dictText'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: "center",
                    scopedSlots: {
                        customRender: 'action'
                    },
                }
            ],
            url: {
                list: "/pjsx/pjsxHmd/list",
                delete: "/pjsx/pjsxHmd/delete",
                deleteBatch: "/pjsx/pjsxHmd/deleteBatch",
                exportXlsUrl: "pjsx/pjsxHmd/exportXls",
                importExcelUrl: "pjsx/pjsxHmd/importExcel",
            },
            sfzhspr: false
        }
    },
    computed: {
        importExcelUrl: function () {
            return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
    },
    methods: {
        ...mapGetters(["nickname", "avatar", "userInfo"]),

        importComplete(val) {
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + val;
            this.loadData();
        },

        jrlc(record) {
            this.$refs.splsForm.edit(record);
        },
        loadspr() {
            getAction("/pjsx/pjsxHmd/spr").then(res => {
                if (res.success) {
                    for (var i = 0; i < res.result.length; i++) {
                        let obj = res.result[i];
                        if (obj.csz == this.workNo) {
                            this.sfzhspr = true
                        }
                    }
                }
            })
        }

    },
    created() {
        this.workNo = store.getters.userInfo.workNo
        this.roles = store.getters.userInfo.roles_dictText;
        this.loadspr();
    },
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>
