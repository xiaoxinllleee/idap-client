<template>
<a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="任务名称">
                        <a-input placeholder="请输入任务名称" v-model="queryParam.title"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="任务类型">
                        <j-dict-select-tag v-model="queryParam.rwlx" placeholder="请选择任务类型" dictCode="marketing_type1" allowClear />
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="营销类型">
                        <j-dict-select-tag v-model="queryParam.marketingType" placeholder="请选择营销类型" dictCode="marketing_type" allowClear />
                    </a-form-item>
                </a-col>

                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                        <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                        <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

                    </span>
                </a-col>

            </a-row>
        </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table ref="table" size="middle" bordered :rowKey="rowKey" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange">

            <span slot="action" slot-scope="text, record">
                <a @click="viewMxsj(record)" v-has="'taskCreate:edit'">查看明细</a>
                <a-divider type="vertical"  />
                <a @click="downMxsj(record)" v-has="'taskCreate:edit'">导出明细</a>
            </span>

        </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <TaskMxsjModal ref="taskMxsjModal" @ok="modalFormOk"></TaskMxsjModal>
</a-card>
</template>

<script>
import TaskMxsjModal from './modules/WdTaskMxsjModal'
import { deleteAction, getAction, downFile } from '@/api/manage'
import {
    JeecgListMixin
} from '@/mixins/JeecgListMixin'
import { mapGetters } from 'vuex'

export default {
    name: 'wdrwList',
    mixins: [JeecgListMixin],
    components: {
        TaskMxsjModal
    },
    data() {
        return {
            description: '任务创建管理页面',
            // 表头
            columns: [{
                    title: '#',
                    dataIndex: '',
                    key: 'rowIndex',
                    width: 60,
                    align: 'center',
                    customRender: function (t, r, index) {
                        return parseInt(index) + 1
                    }
                },
                {
                    title: '任务名称',
                    align: 'center',
                    dataIndex: 'title'
                },
                {
                    title: '任务类型',
                    align: 'center',
                    dataIndex: 'rwlx_dictText'
                },
                {
                    title: '营销类型',
                    align: 'center',
                    dataIndex: 'marketingType_dictText'
                },
                {
                    title: '开始时间',
                    align: 'center',
                    dataIndex: 'startTime'
                },
                {
                    title: '结束时间',
                    align: 'center',
                    dataIndex: 'endTime'
                },
                {
                    title: '营销人数',
                    align: 'center',
                    dataIndex: 'rs'
                },
                {
                    title: '任务对象类型',
                    align: 'center',
                    dataIndex: 'dxlx_dictText'
                },

                /* {
                   title: '已走访',
                   align: 'center',
                   dataIndex: 'yyx'
                 },
                 {
                   title: '未走访',
                   align: 'center',
                   dataIndex: 'wyx'
                 },*/
                /*{
                  title: '状态',
                  align: 'center',
                  dataIndex: 'status_dictText'
                },*/
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: {
                        customRender: 'action'
                    }
                }
            ],

            url: {
                list: '/rwcj/taskCreate/getWdrwList',
                delete: '/rwcj/taskCreate/delete',
                deleteBatch: '/rwcj/taskCreate/deleteBatch',
                exportXlsUrl: 'rwcj/taskCreate/exportXls',
                exportXlsUrl1: 'rwmxsj/taskRwmxDklsh/exportXls',
                exportXlsUrl2: 'rwmxsj/taskRwmxEczf/exportXls',
                exportXlsUrl3: 'rwmxsj/taskRwmxZzrw/exportXls',
                importExcelUrl: 'rwcj/taskCreate/importExcel'
            }
        }
    },
    computed: {
        importExcelUrl: function () {
            return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
        }
    },
    created:{
        

    },
    methods: {
        ...mapGetters(["userInfo"]),
        viewMxsj(row) {
            this.$refs.taskMxsjModal.visible = true;
            this.$refs.taskMxsjModal.edit(row);
        },
        downMxsj(row) {
            /**

  不同的任务类型去不同的表

  rwlx=1 /rwmxsj/taskRwmxDklsh/list

  rwlx=2 /rwmxsj/taskRwmxEczf/list

  rwlx=3 /rwmxsj/taskRwmxZzrw/list

  * */

            if (row.rwlx == '1') {
                this.url.exportXlsUrl = this.url.exportXlsUrl1;
            } else if (row.rwlx == '2') {
                this.url.exportXlsUrl = this.url.exportXlsUrl2;
            } else if (row.rwlx == '3') {
                this.url.exportXlsUrl = this.url.exportXlsUrl3;
            }

            let fileName = "任务明细";
            if (!fileName || typeof fileName != 'string') {
                fileName = '导出文件'
            }

            let id = '*'+this.userInfo().workNo+'*';
        
            //let param = {...this.queryParam};
            let param = {
                rwid: row.id,dxid:id
            }
            this.exportLoading = true

            console.log(param);
            downFile(this.url.exportXlsUrl, param).then((data) => {
                if (!data) {
                    this.$message.warning('文件下载失败')
                    return
                }

                var blob = new Blob([data])
                if ('msSaveOrOpenBlob' in navigator) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
                    return
                }
                var eleLink = document.createElement('a')
                eleLink.download = fileName + '.xls'
                eleLink.style.display = 'none'
                eleLink.href = URL.createObjectURL(blob)
                document.body.appendChild(eleLink)
                eleLink.click()
                document.body.removeChild(eleLink)
                this.exportLoading = false
            })
        },

    }
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>
