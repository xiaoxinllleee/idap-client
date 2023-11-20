<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="true"  :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户名称">
            <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="采集状态">
              <j-dict-select-tag placeholder="请选择采集状态"  v-model="queryParam.cjzt"  dictCode="cjzt"/>
            </a-form-item></a-col>
          </template>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('小额农贷采集信息')" v-has="'vKhglKrkhgl:exp'">导出</a-button>
     <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>

        </a-menu>

        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="small"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 1000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'vKhglKrkhgl:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <!--<a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zjhm)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>-->
              <a-menu-item>
                <a href="javascript:;" @click="handlePrint(record)" v-has="'vKhglKrkhgl:ckzxsqs'">查看征信授权书</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleQrsqzPrint(record)" v-has="'vKhglKrkhgl:ckxxtgqrs'">查看信息提供确认书</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <Print ref="Print"></Print>
    <Photo ref="Photo"></Photo>
    <QrsqzPrint ref="QrsqzPrint"></QrsqzPrint>
    <word-supplement ref="wordForm"></word-supplement>
    <khgl-krkhgl-modal ref="modalForm" @ok="modalFormOk"></khgl-krkhgl-modal>
  </a-card>
</template>

<script>
  import KhglKrkhglModal from './modules/KhglKrkhglModal'
  import WordSupplement from './modules/WordSupplement'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction, putAction, getAction, downFile } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import Print from './modules/Print'
  import Photo from './modules/Photo'
  import QrsqzPrint from './modules/QrsqzPrint'

  export default {
    name: 'vKhglKrkhglList',
    mixins: [JeecgListMixin],
    components: {
      KhglKrkhglModal, JTreeSelect, WordSupplement, Print,Photo,QrsqzPrint
    },
    data() {
      return {
        description: '小额农贷-调查',
        isAll: false,
        zjhm: '',
        // 表头
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex:'sszh_dictText',
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '镇',
            align: 'center',
            dataIndex: 'yjyxdybh_dictText',
          },
          {
            title: '村',
            align: 'center',
            dataIndex: 'ejyxdybh_dictText',
          },
          {
            title: '组',
            align: 'center',
            dataIndex: 'sjyxdybh_dictText',
          },
          {
            title: '客户经理',
            align: 'center',
            dataIndex: 'khjl_dictText',
          },
          {
            title: '采集状态',
            align: 'center',
            dataIndex: 'cjzt_dictText',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
        url: {
          list: '/khgl/vKhglKrkhgl/list',
          delete: '/khgl/vKhglKrkhgl/delete',
          deleteBatch: '/khgl/vKhglKrkhgl/deleteBatch',
          exportXlsUrl: '/khgl/vKhglKrkhgl/exportXls',
          exportXlsUrl2: 'khgl/vKhglKrkhgl/downloadNotApprovalYearAudit',
          importExcelUrl: '/khgl/vKhglKrkhgl/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.isAll = store.getters.isRoot
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      handlePrint: function(record) {
        this.$refs.Print.edit(record)
      },
      handlePhoto: function(record) {
        this.$refs.Photo.add(record)
      },
      handleQrsqzPrint: function(record) {
        this.$refs.QrsqzPrint.edit(record)
      },
      initQueryParams() {
        if (!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if (!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1)
      },
      handleAdd: function() {
        var params = this.queryParam
        if (params.zjhm == null || params.zjhm == 'undefined' || params.zjhm == '') {
          this.$message.error('请先输入证件号码!')
          return
        }
        let zjhm = params.zjhm

        if (this.validateIdCard(zjhm) == false) {
          this.$message.error('请输入正确证件号码!')
          return
        }
        let param = { 'zjhm': zjhm }
        putAction('khgl/vKhglKrkhgl/nhcjxx', param, 'put').then((res) => {
          console.log(res.result)
          if (res.result) {
            this.$message.error('该客户已存在采集信息，请勿重复操作')
            delete this.queryParam.zjhm
            return
          } else {
            this.$refs.modalForm.add(param)
            this.$refs.modalForm.title = '新增'
            this.$refs.modalForm.disableSubmit = false
          }
        })
      },
      wordEdit: function(record) {
        this.$refs.wordForm.edit(record)
        this.$refs.wordForm.title = '新增'
        this.$refs.wordForm.disableSubmit = true
      },
      close() {
        this.$refs.wordForm.confirmLoading = true
      },
      downloadCredit() {
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        let url = `${window._CONFIG['domianURL']}/${'khgl/vKhglKrkhgl/downloadNotApprovalYearAudit'}?paramsStr=${paramsStr}`
        window.location.href = url
        window.location.href = `${window._CONFIG['domianURL']}/` + 'khgl/vKhglKrkhgl/downloadNotApprovalYearAudit'
        //return `${window._CONFIG['domianURL']}/${"/khgl/vKhglKrkhgl/downloadNotApprovalYearAudit"}`;
      },
      validateIdCard(idCard) {
        var vcity = {
          11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古',
          21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏',
          33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南',
          42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆',
          51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
          63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
        }
        //是否为空
        if (idCard === '') {
          return false
        }
        //校验长度，类型
        if (this.isCardNo(idCard) === false) {
          return false
        }
        //检查省份
        if (this.checkProvince(idCard, vcity) === false) {
          return false
        }
        //校验生日
        if (this.checkBirthday(idCard) === false) {
          return false
        }
        //检验位的检测
        if (this.checkParity(idCard) === false) {
          return false
        }
        return true
      },
      // 检查号码是否符合规范，包括长度，类型
      isCardNo(card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(card) === false) {
          return false
        }
        return true
      },
      // 取身份证前两位,校验省份
      checkProvince(card, vcity) {
        var province = card.substr(0, 2)
        if (vcity[province] == undefined) {
          return false
        }
        return true
      },
      // 检查生日是否正确
      checkBirthday(card) {
        var len = card.length
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
          var arr_data = card.match(re_fifteen)
          var year = arr_data[2]
          var month = arr_data[3]
          var day = arr_data[4]
          var birthday = new Date('19' + year + '/' + month + '/' + day)
          return this.verifyBirthday('19' + year, month, day, birthday)
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/
          var arr_data = card.match(re_eighteen)
          var year = arr_data[2]
          var month = arr_data[3]
          var day = arr_data[4]
          var birthday = new Date(year + '/' + month + '/' + day)
          return this.verifyBirthday(year, month, day, birthday)
        }
        return false
      },
      // 校验日期
      verifyBirthday(year, month, day, birthday) {
        var now = new Date()
        var now_year = now.getFullYear()
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
          //判断年份的范围（0岁到100岁之间)
          var time = now_year - year
          if (time >= 0 && time <= 100) {
            return true
          }
          return false
        }
        return false
      },
      // 校验位的检测
      checkParity(card) {
        //15位转18位
        card = this.changeFivteenToEighteen(card)
        var len = card.length
        if (len == '18') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
          var cardTemp = 0, i, valnum
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i]
          }
          valnum = arrCh[cardTemp % 11]
          if (valnum == card.substr(17, 1).toLocaleUpperCase()) {
            return true
          }
          return false
        }
        return false
      },
      // 15位转18位身份证号
      changeFivteenToEighteen(card) {
        if (card.length == '15') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
          var cardTemp = 0, i
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i]
          }
          card += arrCh[cardTemp % 11]
          return card
        }
        return card
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>