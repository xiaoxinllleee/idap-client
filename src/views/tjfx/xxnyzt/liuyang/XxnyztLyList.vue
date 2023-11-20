<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" treeNodeFilterProp="title"
                pid-field="sjzzbz" dict="v_hr_bas_organization_cmms, zzjc, zzbz" :showSearch="true"
                :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主体类别">
              <j-dict-select-tag v-model="queryParam.ztlb" placeholder="请选择客户类型" dictCode="ly_xxnyzt_ztlb" allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="经营主体名称">
              <j-input placeholder="请输入经营主体名称" v-model="queryParam.ztmc"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社会信用代码">
<!--              <a-input placeholder="请输入社会信用代码" v-model="queryParam.shxydm"></a-input>-->
              <j-input placeholder="请输入社会信用代码" v-model="queryParam.shxydm"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="负责人名称">
              <j-input placeholder="请输入负责人名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号码">
              <j-input placeholder="请输入身份证号码" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定类型">
              <j-dict-select-tag v-model="queryParam.pdlx" placeholder="请选择评定类型" dictCode="ly_xxnyzt_pdlx" allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否采集">
              <j-dict-select-tag v-model="queryParam.updatot" placeholder="请选择是否采集" dictCode="sfbz" allowClear />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否填写审批额度">
              <j-dict-select-tag v-model="queryParam.sped" placeholder="请选择是否填写审批额度" dictCode="sfbz" allowClear />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否与营业执照合影">
              <j-dict-select-tag v-model="queryParam.yjyzzhy" placeholder="是否与营业执照合影" dictCode="sfbz" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="地址">
                <j-input v-model="queryParam.jydz" placeholder="请输入地址" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否黑名单">
                <j-dict-select-tag v-model="queryParam.sfhmd" placeholder="请选择是否黑名单" dictCode="sfbz" allowClear />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否小额农贷">
                <j-dict-select-tag v-model="queryParam.sfxend" placeholder="请选择评是否采集" dictCode="sfbz" allowClear />
              </a-form-item>
            </a-col>
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

      <div>
        <a-modal v-model:visible="visible" title="审批额度更新" @ok="spedok" @cancel="cancelSped">
          <a-input-number v-model="sped"></a-input-number>
        </a-modal>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('新型农业主体')">导出</a-button>
      <a-button type="primary" @click="drmb">导入模版</a-button>
      <a-button @click="tq" type="primary" :loading="tqLoading" v-has="'xxnyztly:tq'">提取下发数据</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
        @change="handleImportExcel">
        <a-button type="primary" icon="import" v-has="'xxnyztly:dr'">导入</a-button>
      </a-upload>
      <a-button type="primary" @click="dccjbpl()">批量导出采集表</a-button>

      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table" size="middle" bordered :rowKey="rowKey" :columns="columns" :dataSource="dataSource"
        :pagination="ipagination" :loading="loading" :scroll="{ x: 2000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange">

        <span slot="item_show_img" slot-scope="text, record">
          <img v-if="text != null" slot="item_show_img" style="width:70px;height:70px;" :src="pre+text" alt="未采集" @click="showImg(pre+text)" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button size="small" type="primary" v-if="record.khjlsxyx > 0" @click="spedShow(record)"
            style="padding-bottom: 5px">审批额度填写</a-button>
          <a-divider type="vertical" v-if="record.khjlsxyx > 0" />
          <a-button size="small" type="primary" @click="dccjb(record)">导出采集表</a-button>

          <!--          <a-divider type="vertical" />-->
          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
          <!--            <a-menu slot="overlay">-->
          <!--              <a-menu-item>-->
          <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--                  <a>删除</a>-->
          <!--                </a-popconfirm>-->
          <!--              </a-menu-item>-->
          <!--            </a-menu>-->
          <!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xxnyztLy-modal ref="modalForm" @ok="modalFormOk"></xxnyztLy-modal>

    <a-modal
      title="合影详情"
      :visible="hyShow"
      @ok="hyShow = false"
      @cancel="hyShow = false"
    >
      <img :src="tempImg" >
    </a-modal>

  </a-card>
</template>

<script>
  import XxnyztLyModal from './modules/XxnyztLyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, postAction } from '@api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "XxnyztLyList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      XxnyztLyModal, JTreeSelect
    },
    data () {
      return {
        description: '新型农业主体浏阳管理页面',
        visible: false,
        hyShow:false,
        id: '',
        sped: 0,
        tqLoading: false,
        // 表头
        columns: [
          {
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
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '客户经理',
            align: "center",
            dataIndex: 'updatot_dictText'
          },
          {
            title: '主体分类',
            align: "center",
            dataIndex: 'ztlb_dictText'
          },
          {
            title: '经营主体名称',
            align: "center",
            dataIndex: 'ztmc'
          },
          {
            title: '社会信用代码',
            align: "center",
            dataIndex: 'shxydm'
          },
          {
            title: '负责人名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '身份证号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '与营业执照合影',
            align: "center",
            dataIndex: 'yjyzzhy',
            scopedSlots: { customRender: 'item_show_img' }
          },
          {
            title: '客户经理授信意向',
            align: "center",
            dataIndex: 'khjlsxyx'
          },
          {
            title: '审批额度',
            align: "center",
            dataIndex: 'sped'
          },
          {
            title: '地址',
            align: "center",
            dataIndex: 'jydz'
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'dkje'
          }, {
            title: '存款金额',
            align: "center",
            dataIndex: 'ckje'
          }, {
            title: '是否黑名单',
            align: "center",
            dataIndex: 'sfhmd_dictText'
          },
          {
            title: '评定类型',
            align: "center",
            dataIndex: 'pdlx_dictText'
          },
          {
            title: '待定理由',
            align: "center",
            dataIndex: 'ddly_dictText'
          },
          {
            title: '其他待定理由',
            align: "center",
            dataIndex: 'qtly'
          },
          {
            title: '是否首贷户',
            align: "center",
            dataIndex: 'sfsdh_dictText'
          },
          {
            title: '是否小额农贷',
            align: "center",
            dataIndex: 'sfxend_dictText'
          },


          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 120, fixed: 'right',
          }
        ],
        url: {
          list: "/khxxgl/xxnyztLy/list",
          delete: "/khxxgl/xxnyztLy/delete",
          deleteBatch: "/khxxgl/xxnyztLy/deleteBatch",
          exportXlsUrl: "khxxgl/xxnyztLy/exportXls",
          importExcelUrl: "khxxgl/xxnyztLy/importExcel2",
        },
        tempImg:''
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
      pre: function () {
        return `${window._CONFIG['staticDomainURL']}/`;
      }
    },
    methods: {
      showImg(val){
        this.tempImg = ''
        this.hyShow = true;
        this.tempImg = val
      },
      dccjb (val) {
        getAction("/khxxgl/xxnyztLy/xxnyztlyFtl", { id: val.id }).then(res => {
          if (res.success) {
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        })
      },

      dccjbpl () {
        let param = { ...this.queryParam }
        getAction("/khxxgl/xxnyztLy/batchXxnyztlyFtl", param).then(res => {
          if (res.success) {
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        })
      },

      spedShow (val) {
        let pdlx = Number.parseInt(val.pdlx)
        let sfxend = Number.parseInt(val.sfxend)
        if (pdlx === 1 || sfxend === 1) {
          if (val.zjhm == '' || val.zjhm == undefined) {
            this.errorInfo("基本信息未采集完成，未填写身份证号码")
            return
          }
        }
        this.id = val.id
        this.sped = 0
        this.visible = true;
      },
      spedok () {
        if (this.id == null || this.id == '') {
          this.errorInfo("更新失败，请刷新");
          return
        }
        if (this.sped == null || this.sped < 0) {
          this.errorInfo("请填写额度(额度不能小于0)");
          return
        }

        let data = { id: this.id, sped: this.sped }
        postAction("/khxxgl/xxnyztLy/edit", data).then(res => {
          if (res.success) {
            this.successInfo("更新成功")
            this.visible = false
            console.log(this.ipagination);
            this.loadData(this.ipagination.current)
          } else {
            this.successInfo("更新失败")
            this.visible = false
          }
        })

      },
      cancelSped () {
        this.visible = false;
        this.id = ''
        this.sped = 0
      },
      drmb () {
        getAction("/khxxgl/xxnyztLy/drmb").then(res => {
          if (res.success) {
            if (res.message) {
              window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
            }
          } else {
            this.errorInfo(res.message)
          }
        })
      },
      tq () {
        this.tqLoading = true;
        getAction("/khxxgl/xxnyztLy/tq").then(res => {
          this.successInfo("提取成功")
          this.tqLoading = false;
        })
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>