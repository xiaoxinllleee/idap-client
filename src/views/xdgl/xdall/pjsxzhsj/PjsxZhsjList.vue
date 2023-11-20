<template>
<a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="镇">
                        <a-select placeholder="请选择镇" v-model="queryParam.zhen" @change="selectValue" :allowClear="true">
                            <a-select-option v-for="item in zhenList" :key="item.wgmc"> {{ item.wgmc}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="村">
                        <a-select placeholder="请选择村" :allowClear="true" @change="selectValue2">
                            <a-select-option v-for="item in cunList" :key="item.wgmc">{{ item.wgmc }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="组">
                        <a-input placeholder="组" v-model="queryParam.updator"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="导入人">
                        <a-input placeholder="请输入导入人" v-model="queryParam.creator"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="姓名">
                        <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="证件号码">
                        <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="所属支行">
                        <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" treeNodeFilterProp="title" pid-field="sjzzbz" dict="v_hr_bas_organization_cmms, zzjc, zzbz" :showSearch="true" :treeDefaultExpandAll="true" />
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
        <a-button @click="handleAdd" type="primary" icon="plus" v-has="'pjsxzhsj:add'">>新增</a-button>
        <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('评级授信支行数据')" v-has="'pjsxzhsj:exp'">导出</a-button>
        <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
        <a-button type="primary" icon="download" @click="expComonTemp('zhsj.xlsx ')">导入模版下载
        </a-button>

        <a-button icon="import" @click="excelImport">导入支行基础数据</a-button>

        <a-button type="primary" icon="download" :loading="gxsjLoading" @click="gxsj()">更新参考数据
        </a-button>

        <a-button type="primary" icon="download" :loading="nsbLoading" @click="dcnsb()">导出评级授信参考数据
        </a-button>

        <a-button type="primary" icon="download" @click="excelImport2">导入评级授信初审数据
        </a-button>

        <a-button type="primary" icon="download" :loading="exportLoadingKd" @click="drhnkdbmd">生成惠农快贷白名单数据
        </a-button>

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

        <a-table ref="table" size="middle" bordered :rowKey="rowKey" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange" :scroll="{ x: 2000 }">

            <span slot="action" slot-scope="text, record">
                <a @click="handleEdit(record)">编辑</a>

                <a-divider type="vertical" />
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
    <pjsxZhsj-modal ref="modalForm" @ok="modalFormOk"></pjsxZhsj-modal>
    <excel-import ref="excelImportModal" @okFile="importComplete" />

</a-card>
</template>

<script>
import PjsxZhsjModal from './modules/PjsxZhsjModal'
import {
    JeecgListMixin
} from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import {
    getAction,
    putAction
} from '@api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'

export default {
    name: "PjsxZhsjList",
    mixins: [JeecgListMixin],
    components: {
        PjsxZhsjModal,
        ExcelImport,
        JTreeSelect
    },
    data() {
        return {
            description: '评级授信支行数据管理页面',
            nsbLoading: false,
            gxsjLoading: false,
            exportLoadingKd: false,
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
                    title: '导入人',
                    align: "center",
                    dataIndex: 'creator_dictText',
                    width: 120
                },
                {
                    title: '所属支行',
                    align: "center",
                    dataIndex: 'zzbz_dictText',
                    width: 120

                },
                {
                    title: '姓名',
                    align: "center",
                    dataIndex: 'khmc',
                    width: 120
                },
                {
                    title: '证件号码',
                    align: "center",
                    dataIndex: 'zjhm',
                    width: 200
                },
                {
                    title: '镇',
                    align: "center",
                    dataIndex: 'zhen',
                    width: 120
                },
                {
                    title: '村',
                    align: "center",
                    dataIndex: 'cun',
                    width: 120
                },
                {
                    title: '组',
                    align: "center",
                    dataIndex: 'zu',
                    width: 120
                },
                {
                    title: '户号编码',
                    align: "center",
                    dataIndex: 'hhbm',
                    width: 120
                },
                {
                    title: '户主姓名',
                    align: "center",
                    dataIndex: 'hzxm',
                    width: 120
                },
                {
                    title: '户主证件号码',
                    align: "center",
                    dataIndex: 'hzzjhm',
                    width: 120
                },
                {
                    title: '与户主关系',
                    align: "center",
                    dataIndex: 'yhzgx',
                    width: 120
                },
                {
                    title: '原信用等级',
                    align: "center",
                    dataIndex: 'yyxdj',
                    width: 120
                },
                {
                    title: '原授信金额',
                    align: "center",
                    dataIndex: 'ysxje',
                    width: 120

                },
                {
                    title: '存款金额',
                    align: "center",
                    dataIndex: 'ckje',
                    width: 120

                },
                {
                    title: '贷款金额',
                    align: "center",
                    dataIndex: 'dkje',
                    width: 120

                },
                {
                    title: '存款日平',
                    align: "center",
                    dataIndex: 'ckrp',
                    width: 120

                },
                {
                    title: '表内不良',
                    align: "center",
                    dataIndex: 'blbl',
                    width: 120

                },
                {
                    title: '表外不良',
                    align: "center",
                    dataIndex: 'bwbl',
                    width: 120

                },
                {
                    title: '年审分类',
                    align: "center",
                    dataIndex: 'nsfl',
                    width: 120

                },
                {
                    title: '年审分类原因',
                    align: "center",
                    dataIndex: 'nsflyy',
                    width: 120

                },
                {
                    title: '信贷金额',
                    align: "center",
                    dataIndex: 'xdje',
                    width: 120

                },
                {
                    title: '信贷冻结金额',
                    align: "center",
                    dataIndex: 'xddjje',
                    width: 120

                },
                {
                    title: '近三年日平',
                    align: "center",
                    dataIndex: 'sanckrp',
                    width: 120

                },
                {
                    title: '逾期次数',
                    align: "center",
                    dataIndex: 'yqcs',
                    width: 120

                },
                {
                    title: '户籍地址',
                    align: "center",
                    dataIndex: 'hjdz',
                    width: 200

                },
                {
                    title: '信贷系统业务机构',
                    align: "center",
                    dataIndex: 'xdjgdm',
                    width: 120

                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: "center",
                    scopedSlots: {
                        customRender: 'action'
                    },
                    width: 200,
                    fixed: 'right',
                }
            ],
            url: {
                list: "/nhxq/pjsxZhsj/list",
                delete: "/nhxq/pjsxZhsj/delete",
                deleteBatch: "/nhxq/pjsxZhsj/deleteBatch",
                exportXlsUrl: "nhxq/pjsxZhsj/exportXls",
                importExcelUrl: "nhxq/pjsxZhsj/importExcel2",
            },
            zhenList: [],
            cunList: [],
        }
    },
    computed: {
        importExcelUrl: function () {
            return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
    },
    created() {
        this.loadZhen()
    },
    methods: {
        loadZhen() {
            getAction("/nhxq/pjsxZhsj/getByQydm", {
                wgxz: '1'
            }).then(res => {
                if (res.success) {
                    this.zhenList = res.result
                }
            })
        },

        loadCun(val) {
            this.queryParam.cun = null
            getAction("/nhxq/pjsxZhsj/getByQydm", {
                parentId: val
            }).then(res => {
                if (res.success) {
                    this.cunList = res.result
                }
            })
        },

        selectValue(value) {
            console.log(value);
            let wgbh;
            for (var i = 0; i < this.zhenList.length; i++) {
                let obj = this.zhenList[i];
                if (obj.wgmc == value) {
                    wgbh = obj.wgbh
                }
            }
            console.log(wgbh);
            this.loadCun(wgbh);
        },

        selectValue2(value) {
            console.log(value);
            this.queryParam.cun = value
        },

        importComplete(val) {
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + val
        },
        dcnsb() {
            this.nsbLoading = true;
            let param = {
                ...this.queryParam
            }
            if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
                param['selections'] = this.selectedRowKeys.join(',')
            }
            let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
            param.paramsStr = paramsStr;

            getAction("/nhxq/pjsxZhsj/exportNsb", param).then(res => {
                if (res.success) {
                    if (res.message) {
                        window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
                    }
                } else {
                    this.errorInfo(res.message)
                }

                this.nsbLoading = false;
            })

        },
        gxsj() {
            this.gxsjLoading = true;

            getAction("/nhxq/pjsxZhsj/gxsj").then(res => {
                if (res.success) {
                    this.successInfo(res.message)
                } else {
                    this.errorInfo(res.message)
                }
                this.gxsjLoading = false;
            })
        },
        excelImport2() {
            let params = {}
            params.exportTemplateUrl = this.url.exportTemplateUrl
            params.importExcelUrl = '/nhxq/pjsxZhsj/importExcel3'
            params.exportTemplateName = this.exportTemplateName
            this.$refs.excelImportModal.showModal(params)
        },
        drhnkdbmd() {
            this.exportLoadingKd = true;
            getAction("/khflgl/nhxq/sphdrhnkdbmd").then(res => {
                this.successInfo("导入成功")
                this.exportLoadingKd = false;
            })
        },
        importComplete(val) {
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + val;
            this.loadData();
        },
    }
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>
