<template>
  <a-card :bordered="false">

    <a-tabs default-active-key="1" @change="changeTabs">

      <a-tab-pane tab="存款人民币" key="1" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery(1)">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期（月末）" v-model="queryParam.fiscalDate"  :defaultValue="defaultDateOpera"
                                 :format="dateFormat" style="width: 100%;" @change="beforeUpload(1)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="所属机构">
                  <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization, zzjc, ywjgdm"
                                 treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                                 condition='{"sjywjgdm": "ywjgdm"}'>
                  </j-tree-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="机构名称">
                  <j-input placeholder="模糊查询" v-model="queryParam.branchName" type='likemore'></j-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="机构名称(1)">
                  <j-input placeholder="模糊查询" v-model="queryParam.branchName1" type='likemore'></j-input>
                </a-form-item>
              </a-col>
<!--              <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--                <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>-->
<!--                  <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>-->
<!--                  <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>-->
<!--                </span>-->
<!--              </a-col>-->

            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button type='primary' @click='searchQuery(1)' icon='search'>查询</a-button>
          <a-button type='primary' @click='searchReset(1)' icon='reload'>重置</a-button>
          <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('业务状况表月报_存款人民币',1)" style='margin-left: 8px'>导出</a-button>
          <a-button icon="import" @click="excelImport(1)">导入</a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table ref="table"
                   size="small"
                   bordered
                   :rowKey="rowKey"
                   :columns="columns"
                   :dataSource="dataSource1"
                   :pagination="ipagination1"
                   :loading="loading"
                   :scroll="{x:5500,y:500}"
                   @change="handleTableChange1">

            <span slot="branchName" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>
            <span slot="branchName1" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>

          </a-table>
        </div>
        <!-- table区域-end -->

        <excel-import ref="excelImportModal" @ok="importComplete" />
      </a-tab-pane>

      <a-tab-pane tab="现金人民币" key="2" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery(2)">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期（月末）" v-model="queryParam.fiscalDate"  :defaultValue="defaultDateOpera"
                                 :format="dateFormat" style="width: 100%;" @change="beforeUpload(2)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="所属机构">
                  <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization, zzjc, ywjgdm"
                                 treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                                 condition='{"sjywjgdm": "ywjgdm"}'>
                  </j-tree-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="机构名称">
                  <j-input placeholder="模糊查询" v-model="queryParam.branchName" type='likemore'></j-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="机构名称(1)">
                  <j-input placeholder="模糊查询" v-model="queryParam.branchName1" type='likemore'></j-input>
                </a-form-item>
              </a-col>
<!--              <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--                </span>-->
<!--              </a-col>-->

            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button type="primary" @click="searchQuery(2)" icon="search">查询</a-button>
          <a-button type="primary" @click="searchReset(2)" icon="reload">重置</a-button>
          <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('业务状况表月报_现金人民币',2)" style="margin-left: 8px">导出</a-button>
          <a-button icon="import" @click="excelImport(2)">导入</a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table ref="table"
                   size="small"
                   bordered
                   :rowKey="rowKey"
                   :columns="columns1"
                   :dataSource="dataSource2"
                   :pagination="ipagination2"
                   :loading="loading"
                   :scroll="{x:4500,y:500}"
                   @change="handleTableChange2">

            <span slot="branchName" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>
            <span slot="branchName1" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>

          </a-table>
        </div>
        <!-- table区域-end -->

        <excel-import ref="excelImportModal" @ok="importComplete" />
      </a-tab-pane>

      <a-tab-pane tab="表外人民币" key="3" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery(3)">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期（月末）" v-model="queryParam.fiscalDate"  :defaultValue="defaultDateOpera"
                                 :format="dateFormat" style="width: 100%;" @change="beforeUpload(3)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="所属机构">
                  <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization, zzjc, ywjgdm"
                                 treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                                 condition='{"sjywjgdm": "ywjgdm"}'>
                  </j-tree-select>
                </a-form-item>
              </a-col>
<!--              <template v-if="toggleSearchStatus">-->
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="机构名称">
                    <j-input placeholder="模糊查询" v-model="queryParam.branchName" type='likemore'></j-input>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="机构名称(1)">
                    <j-input placeholder="模糊查询" v-model="queryParam.branchName1" type='likemore'></j-input>
                  </a-form-item>
                </a-col>
<!--              </template>-->
<!--              <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--                  <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                    {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                    <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--                  </a>-->
<!--                </span>-->
<!--              </a-col>-->

            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button type="primary" @click="searchQuery(3)" icon="search">查询</a-button>
          <a-button type="primary" @click="searchReset(3)" icon="reload">重置</a-button>
          <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('业务状况表月报_表外人民币',3)" style="margin-left: 8px">导出</a-button>
          <a-button icon="import" @click="excelImport(3)">导入</a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table ref="table"
                   size="small"
                   bordered
                   :rowKey="rowKey"
                   :columns="columns2"
                   :dataSource="dataSource3"
                   :pagination="ipagination3"
                   :loading="loading"
                   :scroll="{x:3000,y:500}"
                   @change="handleTableChange3">

            <span slot="branchName" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>
            <span slot="branchName1" slot-scope="text">
              <j-ellipsis :value="text" :length="10" />
            </span>

          </a-table>
        </div>
        <!-- table区域-end -->

        <excel-import ref="excelImportModal" @ok="importComplete" />
      </a-tab-pane>

    </a-tabs>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { deleteAction, downFile, getAction } from '@api/manage'
import ExcelImport from '@comp/common/ExcelImport'
import { filterObj } from '@/utils/util'
import moment from 'moment'
import JEllipsis from "@/components/jeecg/JEllipsis";
import JTreeSelect from "@/components/jeecg/JTreeSelect";
import JInput from "@/components/jeecg/JInput";
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'SgtzYwzkbRmbList',
  mixins: [JeecgListMixin],
  components: {
    ExcelImport,JEllipsis,JTreeSelect,JInput
  },
  data () {
    return {
      description: '手工台账-业务状况月表-人民币 管理页面',
      dateFormat: 'YYYY-MM-DD',
      //默认当前月份
      defaultDateOpera: '',
      //当前数据日期
      rq: '',
      //报表类型 1 存款 2 现金 3 表外
      bblx: undefined,
      tabsKey: '',
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],
      ipagination1: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true
      },
      ipagination2: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination3: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '所属机构',
          align: 'center',
          children: [
            {
              title: '机构编码',
              align: 'center',
              dataIndex: 'branchNo'
            },
            {
              title: '机构名称',
              align: 'center',
              dataIndex: 'branchName',
              scopedSlots: { customRender: 'branchName' },
            },
            {
              title: '机构名称(1)',
              align: 'center',
              dataIndex: 'branchName1',
              scopedSlots: { customRender: 'branchName1' },
            },
          ],
        },
        {
          title: '单位活期存款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'dwhqckQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'dwhqckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'dwhqckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'dwhqckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'dwhqckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'dwhqckQmdfye'
            },
          ],
        },
        {
          title: '个人活期存款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'grhqckQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'grhqckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'grhqckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'grhqckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'grhqckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'grhqckQmdfye'
            },
          ],
        },
        {
          title: '银行卡存款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'yhkckQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'yhkckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'yhkckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'yhkckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'yhkckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'yhkckQmdfye'
            },
          ],
        },
        {
          title: '财政性存款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'czxckQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'czxckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'czxckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'czxckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'czxckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'czxckQmdfye'
            },
          ],
        },
        {
          title: '应解汇款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'yjhkQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'yjhkQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'yjhkBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'yjhkBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'yjhkQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'yjhkQmdfye'
            },
          ],
        },
        {
          title: '保证金存款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'bzjckQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'bzjckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'bzjckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'bzjckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'bzjckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'bzjckQmdfye'
            },
          ],
        },
        {
          title: '各项存款',
          align: 'center',
          children: [

            {
              title: '各项存款',
              align: 'center',
              dataIndex: 'gxck'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'gxckQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'gxckBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'gxckBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'gxckQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'gxckQmdfye'
            },
          ],
        },
      ],
      columns1: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '所属机构',
          align: 'center',
          children: [
            {
              title: '机构编码',
              align: 'center',
              dataIndex: 'branchNo'
            },
            {
              title: '机构名称',
              align: 'center',
              dataIndex: 'branchName',
              scopedSlots: { customRender: 'branchName' },
            },
            {
              title: '机构名称(1)',
              align: 'center',
              dataIndex: 'branchName1',
              scopedSlots: { customRender: 'branchName' },
            },
          ],
        },
        {
          title: '现金',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'xjQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'xjQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'xjBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'xjBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'xjQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'xjQmdfye'
            },
          ],
        },
        {
          title: '应收利息',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'yslxQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'yslxQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'yslxBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'yslxBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'yslxQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'yslxQmdfye'
            },
          ],
        },
        {
          title: '贴现资产',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'txzcQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'txzcQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'txzcBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'txzcBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'txzcQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'txzcQmdfye'
            },
          ],
        },
        {
          title: '各项贷款',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'gxdkQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'gxdkQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'gxdkBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'gxdkBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'gxdkQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'gxdkQmdfye'
            },
          ],
        },
        {
          title: '农业贷款小计',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'nydkxjQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'nydkxjQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'nydkxjBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'nydkxjBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'nydkxjQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'nydkxjQmdfye'
            },
          ],
        },
      ],
      columns2: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '所属机构',
          align: 'center',
          children: [
            {
              title: '机构编码',
              align: 'center',
              dataIndex: 'branchNo'
            },
            {
              title: '机构名称',
              align: 'center',
              dataIndex: 'branchName',
              scopedSlots: { customRender: 'branchName' },
            },
            {
              title: '机构名称(1)',
              align: 'center',
              dataIndex: 'branchName1',
              scopedSlots: { customRender: 'branchName' },
            },
          ],
        },
        {
          title: '承兑汇票',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'cdhpQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'cdhpQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'cdhpBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'cdhpBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'cdhpQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'cdhpQmdfye'
            },
          ],
        },
        {
          title: '已核销资产',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'yhxzcQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'yhxzcQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'yhxzcBqjffse'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'yhxzcBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'yhxzcQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'yhxzcQmdfye'
            },
          ],
        },
        {
          title: '已置换资产',
          align: 'center',
          children: [
            {
              title: '期初借方余额',
              align: 'center',
              dataIndex: 'yzhzcQcjfye'
            },
            {
              title: '期初贷方余额',
              align: 'center',
              dataIndex: 'yzhzcQcdfye'
            },
            {
              title: '本期借方发生额',
              align: 'center',
              dataIndex: 'yzhzcBqjffse'
            },
            {
              title: '本期借方发生额(1)',
              align: 'center',
              dataIndex: 'yzhzcBqjffse1'
            },
            {
              title: '本期贷方发生额',
              align: 'center',
              dataIndex: 'yzhzcBqdffse'
            },
            {
              title: '期末借方余额',
              align: 'center',
              dataIndex: 'yzhzcQmjfye'
            },
            {
              title: '期末贷方余额',
              align: 'center',
              dataIndex: 'yzhzcQmdfye'
            },
          ],
        },
      ],
      url: {
        list1: '/report/sgtzgl/YwzkbCkrmb/list',
        exportXlsUrl1: 'report/sgtzgl/YwzkbCkrmb/exportXls',
        importExcelUrl1: 'report/sgtzgl/YwzkbCkrmb/importExcel',
        exportTemplateUrl1: 'report/sgtzgl/YwzkbCkrmb/exportTemplateXls',

        list2: '/report/sgtzgl/YwzkbXjrmb/list',
        exportXlsUrl2: 'report/sgtzgl/YwzkbXjrmb/exportXls',
        importExcelUrl2: 'report/sgtzgl/YwzkbXjrmb/importExcel',
        exportTemplateUrl2: 'report/sgtzgl/YwzkbXjrmb/exportTemplateXls',

        list3: '/report/sgtzgl/YwzkbBwrmb/list',
        exportXlsUrl3: 'report/sgtzgl/YwzkbBwrmb/exportXls',
        importExcelUrl3: 'report/sgtzgl/YwzkbBwrmb/importExcel',
        exportTemplateUrl3: 'report/sgtzgl/YwzkbBwrmb/exportTemplateXls'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created () {
    this.changeTabs()
  },
  methods: {
    handleTableChange1 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination1 = pagination
      this.loadData(1)
    },
    handleTableChange2 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination2 = pagination
      this.loadData(2)
    },
    handleTableChange3 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination3 = pagination
      this.loadData(3)
    },

    handleExportXls (fileName,num) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      //let param = {...this.queryParam};
      let param = this.getQueryParams();
      if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
        param['selections'] = this.selectedRowKeys.join(",")
        param['rowKey'] = this.rowKey
      }
      fileName = fileName + moment(new Date()).format('YYYYMMDDHHmmss')
      //let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      //param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      console.log('handleExportXls.num->',num)
      if (num == 1) {
        downFile(this.url.exportXlsUrl1, param).then((data) => {
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
      } else if (num == 2) {
        downFile(this.url.exportXlsUrl2, param).then((data) => {
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
      } else {
        downFile(this.url.exportXlsUrl3, param).then((data) => {
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
      }
    },
    /**
     * 数据日期格式化
     * @param num 报表类型 1 存款 2 现金 3 表外
     */
    beforeUpload(num) {
      console.log('beforeUpload.num->',num)
      if (num == 1) {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      } else if (num == 2) {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      } else {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      }
    },
    /**
     * 导入方式
     * @param num 报表类型 1 存款 2 现金 3 表外
     */
    excelImport(num) {
      console.log('excelImport.num->',num)
      let params = {}
      if (num == 1) {
        if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
          notification.error({ message: '系统提示', description:'请选择数据日期!',duration: 4})
          return
        } else {
          params.exportTemplateUrl = this.url.exportTemplateUrl1
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl1}?fiscalDate=${this.rq}`
          this.exportTemplateName = '业务状况表月报_存款人民币_导入模板' + '_' + moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
      } else if (num == 2) {
        if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
          notification.error({ message: '系统提示', description:'请选择数据日期!',duration: 4})
          return
        } else {
          params.exportTemplateUrl = this.url.exportTemplateUrl2
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl2}?fiscalDate=${this.rq}`
          this.exportTemplateName = '业务状况表月报_现金人民币_导入模板' + '_' + moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
      } else {
        if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
          notification.error({ message: '系统提示', description:'请选择数据日期!',duration: 4})
          return
        } else {
          params.exportTemplateUrl = this.url.exportTemplateUrl3
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl3}?fiscalDate=${this.rq}`
          this.exportTemplateName = '业务状况表月报_表外人民币_导入模板' + '_' + moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
      }
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },
    changeTabs(key){
      console.log('changeTabs.key->',key)
      if (key == undefined) {
        key = 1
      }
      this.bblx = key
      this.searchReset(key)
    },
    ok(num){
      console.log('ok.num->',num)
      this.loadData(num)
    },
    searchQuery(num){
      console.log('searchQuery.num->',num)
      this.loadData(num,1);
    },
    searchReset(num){
      console.log('searchReset.num->',num)
      this.ipagination1.current = 1
      this.ipagination2.current = 1
      this.ipagination3.current = 1
      this.queryParam = {}
      this.loadData(num);
    },
    loadData(num,arg){
      console.log('loadData.num->',num)
      console.log('loadData.arg->',arg)
      this.loading = true;
      if (arg == 1) {
        this.ipagination1.current = 1
        this.ipagination2.current = 1
        this.ipagination3.current = 1
      }
      var params = this.getQueryParams();//查询条件
      if (num == 1) {
        console.log('存款人民币')
        getAction(this.url.list1, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records
            this.ipagination1.total = res.result.total
            this.loading = false
          } else {
            this.$message.error(res.message, 5)
            this.loading = false
          }
        })
      } else if (num == 2) {
        console.log('现金人民币')
        getAction(this.url.list2, params).then((res) => {
          if (res.success) {
            this.dataSource2 = res.result.records
            this.ipagination2.total = res.result.total
            this.loading = false
          } else {
            this.$message.error(res.message, 5)
            this.loading = false
          }
        })
      } else {
        console.log('表外人民币')
        getAction(this.url.list3, params).then((res) => {
          if (res.success) {
            this.dataSource3 = res.result.records
            this.ipagination3.total = res.result.total
            this.loading = false
          } else {
            this.$message.error(res.message, 5)
            this.loading = false
          }
        })
      }
    },
    getQueryParams () {
      //获取查询条件
      let sqp = {}
      let tjMoment = ''
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      console.log('报表类型',this.bblx)
      if (this.bblx == 1) {
        if (this.queryParam.fiscalDate) {
          tjMoment = moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
        param.fiscalDate = tjMoment
        param.pageNo = this.ipagination1.current
        param.pageSize = this.ipagination1.pageSize
      } else if (this.bblx == 2) {
        if (this.queryParam.fiscalDate) {
          tjMoment = moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
        param.fiscalDate = tjMoment
        param.pageNo = this.ipagination2.current
        param.pageSize = this.ipagination2.pageSize
      } else {
        if (this.queryParam.fiscalDate) {
          tjMoment = moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
        param.fiscalDate = tjMoment
        param.pageNo = this.ipagination3.current
        param.pageSize = this.ipagination3.pageSize
      }
      console.log('param',param)
      return filterObj(param)
    },
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>