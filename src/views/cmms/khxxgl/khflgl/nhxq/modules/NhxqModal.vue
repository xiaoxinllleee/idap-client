<template>
  <j-modal :title="title"
           :width="1600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           switchFullscreen
           :fullscreen="true"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs animated="animated">
          <a-tab-pane key="1" forceRender v-if="qybm == '400' && model.id">
            <span slot="tab"><a-icon type="book"/>走访信息</span>
            <a-card class="card" :bordered="false">
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属网格">
                    <JTreeSelectNotJg placeholder="请选择归属网格"
                                      v-decorator="['wgbh', {}]"
                                      treeNodeFilterProp="title"
                                      pidField="PARENT_ID"
                                      dict="YXDYGL_MAIN,WGMC,ID"
                                      pidValue="0"
                                      :showSearch="true"
                                      disabled
                                      :treeDefaultExpandAll="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属机构">
                    <j-tree-select placeholder="请选择所属机构"
                                   v-decorator="['jgdm', {}]"
                                   treeNodeFilterProp="title"
                                   pid-field="sjywjgdm"
                                   dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                                   :showSearch="true"
                                   disabled
                                   :treeDefaultExpandAll="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户号编码">
                    <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户姓名">
                    <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件号码">
                    <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与户主关系">
                    <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {}]"  :optionDisabled="optionDisabled"
                                       :triggerChange="true"  dict-code="yhzgx"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="性别">
                    <j-dict-select-tag placeholder="请选择性别" v-decorator="['xb', {}]"  :triggerChange="true"  dict-code="sex" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="年龄">
                    <a-input placeholder="请输入年龄" v-decorator="['nl', {}]"  disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型">
                    <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', {}]"  :triggerChange="true"  dict-code="xtpdjg" disabled/>
                  </a-form-item>
                </a-col>
                <!--<a-col :lg="8">-->
                <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="手机号码">-->
                <!--<a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />-->
                <!--</a-form-item>-->
                <!--</a-col>-->
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="户籍地址">
                    <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="走访地址">
                    <a-input placeholder="请输入走访地址" v-decorator="['zfdz', {rules: [{ required: true, message: '请输入走访地址!' }]}]" style="width: 80%"/>
                    <a-button type="link" @click="syncHjdz">同步户籍地址</a-button>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="走访面见人">
                    <a-select
                      v-decorator="['zfmjr', {rules: [{ required: true, message: '请选择走访面见人!' }]}]"
                      style="width: 100%"
                      placeholder="请选择"
                    >
                      <a-select-option
                        v-for="(item) in tableDataJtcyxx"
                        :key= "item.zjhm"
                        :label="item.khmc"
                        :value="item.zjhm"
                      >
                        {{ item.khmc }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与目标客户关系">
                    <a-input placeholder="请输入与目标客户关系" v-decorator="['ymbkhgx', {rules: [{ required: true, message: '请输入与目标客户关系!' }]}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="联系方式">
                    <a-input placeholder="请输入联系方式" v-decorator="['sjhm', {rules: [{ required: true, message: '请输入联系方式!' }]}]" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否加微信好友">
                    <j-dict-select-tag placeholder="请选择是否加微信好友" v-decorator="['sfjwxhy', {rules: [{ required: true, message: '请选择是否加微信好友!' }]}]"  :triggerChange="true"  dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款意向书">
                    <j-dict-select-tag placeholder="请选择贷款意向书" v-decorator="['dkyxs', {rules: [{ required: true, message: '请选择贷款意向书!' }]}]"  :triggerChange="true"  dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="走访人员">
                    <!--<a-auto-complete v-decorator="['zfry', {rules: [{ required: true, message: '请输入走访人员!' }]}]" :dataSource="zfryData" />-->

                    <!--<a-input placeholder="请输入走访人员" v-decorator="['zfry', {rules: [{ required: true, message: '请输入走访人员!' }]}]" />-->
                    <a-select placeholder="请输入走访人员" mode="multiple" v-decorator="['zfry', {rules: [{ required: true, message: '请输入走访人员!' }]}]"
                              style="width: 100%" @change="zfryChange">
                      <a-select-option v-for="item in zfryData" :key="item" :value="item">{{ item }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="走访日期">
                    <a-date-picker placeholder="请选择走访日期" v-decorator="['zfrq', {rules: [{ required: true, message: '请选择走访日期!' }]}]" style="width: 100%;"
                                   :format="dateFormat"></a-date-picker>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="备注">
                    <a-textarea placeholder="请输入备注" v-decorator="['hzbz', {rules: [{ required: true, message: '请输入备注!' }]}]" :autoSize="true"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;">佐证材料</a-divider>
              <a-row :gutter="24">
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与客户合影">
                    <j-image-upload text="上传" :bizPath="NhHzfjxxurl" :imageType="3" @imageChange="imageChange" isMultiple v-model="YkhhypicList"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款意向书">
                    <j-image-upload text="上传" :bizPath="NhHzfjxxurl" :imageType="8" @imageChange="imageChange" isMultiple v-model="DkyxspicList"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="微信照片">
                    <j-image-upload text="上传" :bizPath="NhHzfjxxurl" :imageType="9" @imageChange="imageChange" isMultiple v-model="WxzppicList"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="其他">
                    <j-image-upload text="上传" :bizPath="NhHzfjxxurl" :imageType="6" @imageChange="imageChange" isMultiple v-model="QtfjpicList"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

            </a-card>
          </a-tab-pane>

          <a-tab-pane key="2" forceRender>
            <span slot="tab"><a-icon type="book"/>基本信息</span>
            <a-card  class="card" :bordered="false">
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属网格">
                    <a-spin :spinning="wgxxTreeLoading">
                      <a-tree-select
                        :treeData=sswgTreeDateoptions
                        :replaceFields=replaceFields
                        v-decorator="['wgbh', {rules: [{required: true, message: '请选择归属网格！'}]}]"
                        loading
                        :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                        showSearch
                        treeNodeFilterProp="title"
                        :disabled="model.id != null"
                        @change="wgxxTreeChange"
                      >
                      </a-tree-select>
                    </a-spin>
                    <!--<JTreeSelectNotJg placeholder="请选择归属网格"-->
                    <!--v-decorator="['wgbh', {}]"-->
                    <!--treeNodeFilterProp="title"-->
                    <!--pidField="PARENT_ID"-->
                    <!--dict="YXDYGL_MAIN,WGMC,ID"-->
                    <!--pidValue="0"-->
                    <!--:showSearch="true"-->
                    <!--:treeDefaultExpandAll="true"/>-->
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属机构">
                    <a-input placeholder="请输入归属机构" v-decorator="['zzjc', {rules: [{required: true, message: '归属机构不能为空！'}]}]" disabled/>
                    <a-input type="hidden" placeholder="请输入归属机构" v-decorator="['sszh', {}]"/>

                    <!--<j-tree-select placeholder="请选择所属机构"-->
                    <!--v-decorator="['jgdm', {}]"-->
                    <!--treeNodeFilterProp="title"-->
                    <!--pid-field="sjywjgdm"-->
                    <!--dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"-->
                    <!--:showSearch="true"-->
                    <!--disabled-->
                    <!--:treeDefaultExpandAll="true"/>-->
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="姓名">
                    <a-input placeholder="请输入姓名" v-decorator="['khmc', {rules: [{required: true, message: '请输入姓名！'}]}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件号码">
                    <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {rules: [{required: true, message: '请输入证件号码！'}]}]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与户主关系">
                    <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {rules: [{required: true, message: '请选择与户主关系！'}]}]"
                                       :optionDisabled="optionDisabled" :triggerChange="true" @change="yhzgxChange"  dict-code="yhzgx"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="联系方式">
                    <a-input placeholder="请输入联系方式" v-decorator="['sjhm', {}]" />
                  </a-form-item>
                </a-col>
                <!--<a-col :lg="6">-->
                <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="客户类型">-->
                <!--<j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', {}]"  :triggerChange="true"  dict-code="clkhlx"/>-->
                <!--</a-form-item>-->
                <!--</a-col>-->
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="民族">
                    <j-dict-select-tag placeholder="请选择民族" v-decorator="['mz', {}]"  :triggerChange="true" dict-code="mz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="婚姻状况">
                    <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]"  :triggerChange="true" dict-code="hyzk"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户口性质">
                    <j-dict-select-tag placeholder="请选择户口性质" v-decorator="['hkxz', {}]"   :triggerChange="true" dict-code="khgl_hkxz"/>

                  </a-form-item>
                </a-col>

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="文化程度">
                    <j-dict-select-tag placeholder="请选择文化程度" v-decorator="['whcd', {}]"  :triggerChange="true"  dict-code="whcd"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="职业">
                    <j-dict-select-tag placeholder="请选择职业" v-decorator="['cshygz', {}]"  :triggerChange="true"  dict-code="cszy"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="住地邮编">
                    <a-input placeholder="请输入住地邮编" v-decorator="['zdyb', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户籍地址">
                    <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="常住地址">
                    <a-input placeholder="请输入常住地址" v-decorator="['zz', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6" v-if="hzxxSearchShow">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户主姓名">
                    <a-input placeholder="请输入户主姓名" style="width: 180px;margin-right: 5px;" disabled v-decorator="['hzxm', {rules: [{required: true, message: '请选择户主！'}]}]" />
                    <a-button type="primary" icon="search" @click="searchNhxx">选择户主</a-button>
                  </a-form-item>
                </a-col>
                <a-col :lg="6" v-if="hzxxSearchShow">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户号编码">
                    <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    label="备注">
                    <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>

            <a-card  title="补充信息">
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="原所属乡镇">
                    <a-input placeholder="请输入原所属乡镇" v-decorator="['yssxz', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="原行政村">
                    <a-input placeholder="请输入原行政村" v-decorator="['yxzc', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="住址1">
                    <a-input placeholder="请输入住址1" v-decorator="['zz1', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="住址2">
                    <a-input placeholder="请输入住址2" v-decorator="['zz2', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否不良贷款客户">
                    <j-dict-select-tag placeholder="请选择是否不良贷款客户" v-decorator="['sfbldkh', {}]"  :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否贫困户">
                    <j-dict-select-tag  placeholder="请选择是否贫困户" v-decorator="['sfpkh', {}]" :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否低保户">
                    <j-dict-select-tag  placeholder="请选择是否低保户" v-decorator="['sfdbh', {}]" :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否吸毒人员">
                    <j-dict-select-tag  placeholder="请选择是否吸毒人员" v-decorator="['sfxdry', {}]" :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户重要程度">
                    <j-dict-select-tag  placeholder="请选择客户重要程度" v-decorator="['kfyyqk', {}]" :triggerChange="true" dict-code="khgl_khzycd"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户潜在业务">
                    <j-dict-select-tag  placeholder="请选择客户潜在业务" v-decorator="['kcqzyw', {}]" :triggerChange="true" dict-code="khqzyw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户授信情况">
                    <j-dict-select-tag  placeholder="请选择客户授信情况" v-decorator="['khsxqk', {}]" :triggerChange="true" dict-code="khgl_sxqk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="备用号码">
                    <a-input placeholder="请输入备用号码" v-decorator="['byhm', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="陪访人">
                    <a-input placeholder="请输入陪访人" v-decorator="['pfr', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型1">
                    <j-dict-select-tag  placeholder="请选择客户类型1" v-decorator="['khlx1', {}]" :triggerChange="true" dict-code="khlx1"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型2">
                    <j-dict-select-tag  placeholder="请选择客户类型2" v-decorator="['khlx2', {}]" :triggerChange="true" dict-code="khlx2"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型3">
                    <j-dict-select-tag  placeholder="请选择客户类型3" v-decorator="['khlx3', {}]" :triggerChange="true" dict-code="khlx3"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="有无子女">
                    <j-dict-select-tag  placeholder="请选择有无子女" v-decorator="['ywzn', {}]" :triggerChange="true" dict-code="ywbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="健康状况">
                    <j-dict-select-tag  placeholder="请选择健康状况" v-decorator="['jkzk', {}]" :triggerChange="true" dict-code="jkzk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="劳动能力">
                    <j-dict-select-tag  placeholder="请选择劳动能力" v-decorator="['ldnl', {}]" :triggerChange="true" dict-code="ldnl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="居住年限">
                    <j-dict-select-tag  placeholder="请选择居住年限" v-decorator="['jznx', {}]" :triggerChange="true" dict-code="jznx"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="最高学历">
                    <j-dict-select-tag  placeholder="请选择最高学历" v-decorator="['zgxl', {}]" :triggerChange="true" dict-code="xl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="最高学位">
                    <j-dict-select-tag  placeholder="请选择最高学位" v-decorator="['zgxw', {}]" :triggerChange="true" dict-code="zgxw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="道德品质综合评价">
                    <j-dict-select-tag  placeholder="请选择道德品质综合评价" v-decorator="['ddpzzhpj', {}]" :triggerChange="true" dict-code="ddpzzhpj"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="居住状态">
                    <j-dict-select-tag  placeholder="请选择居住状态" v-decorator="['jzzt', {}]" :triggerChange="true" dict-code="jzzk"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件签发日期">
                    <a-date-picker v-decorator="[ 'zjqfrq', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件到期日期">
                    <a-date-picker v-decorator="[ 'zjdqrq', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="返乡时间">
                    <a-date-picker v-decorator="[ 'fxsj', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否授信">
                    <j-dict-select-tag  placeholder="请选择是否授信" v-decorator="['sfsx', {}]" :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="所属客户经理">
                    <a-input placeholder="请输入所属客户经理" v-decorator="['sskhjl', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="工作单位">
                    <a-input placeholder="请输入工作单位" v-decorator="['gzdw', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="工作单位地址">
                    <a-input placeholder="请输入工作单位地址" v-decorator="['gzdwdz', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="腾讯QQ号码">
                    <a-input placeholder="请输入腾讯QQ号码" v-decorator="['qq', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否外出务工">
                    <j-dict-select-tag  placeholder="请选择是否外出务工" v-decorator="['sfycdg', {}]" :triggerChange="true" dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工类型">
                    <a-input placeholder="请输入务工类型" v-decorator="['wglx', {}]" />
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工城市">
                    <a-input placeholder="请输入务工城市" v-decorator="['wgcs', {}]" />
                  </a-form-item>
                </a-col>

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工地区">
                    <a-input placeholder="请输入务工地区" v-decorator="['wgdq', {}]" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="3" forceRender v-if="qybm == '400' && model.id">
            <span slot="tab"><a-icon type="book"/>走访评议</span>
            <a-steps :current="current">
              <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content">
              <a-card class="card" :bordered="false"  v-show="current==0">
                <a-form :form="form">
                  <a-row class="form-row" :gutter="24">
                    <a-col :span="24" :offset="1">
                      <a-checkbox-group @change="handleCheckedChange" v-model="checkedBysxqx" >
                        <a-row>
                          <template v-for="item in dictOptions">
                            <template>
                              <a-col :span="24">
                                <a-checkbox :disabled="item.disabled"  :checked="true" :value="item.value">{{ item.text }}</a-checkbox>
                              </a-col>
                            </template>
                          </template>
                        </a-row>
                      </a-checkbox-group>
                    </a-col>
                  </a-row>
                </a-form>
              </a-card>
              <a-card class="card" :bordered="false"   v-show="current==1">
                <a-form-model :model="sxxq" :rules="rules">
                  <a-row class="form-row" :gutter="24">
                    <a-col span="8">
                      <a-form-model-item label='农村房产情况' prop='ncfcqk' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <j-dict-select-tag     v-model='sxxq.ncfcqk'  dict-code='ncfcqk'></j-dict-select-tag>
                      </a-form-model-item>
                    </a-col>
                    <a-col  span="8">
                      <a-form-model-item label='农村房产情况备注'  :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <a-input placeholder='请输入备注' v-model='sxxq.ncfcqkBz' />
                      </a-form-model-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8">
                      <a-form-model-item label='城区有无房产' prop='cqywfc' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <a-select v-model='sxxq.cqywfc'>
                          <a-select-option value='1'>有</a-select-option>
                          <a-select-option value='2'>无</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col  span="8">
                      <a-form-model-item label='城区房产情况备注'  :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <a-input placeholder='请输入备注' v-model='sxxq.cqywfcBz' />
                      </a-form-model-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8">
                      <a-form-model-item label='有无车辆' prop='ywcl' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <a-select v-model='sxxq.ywcl'>
                          <a-select-option value='1'>有</a-select-option>
                          <a-select-option value='2'>无</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col  span="8">
                      <a-form-model-item label='有无车辆备注'  :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <a-input placeholder='请输入备注' v-model='sxxq.ywclBz' />
                      </a-form-model-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8">
                      <a-form-model-item label='是否在本地' prop='sfzbd' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                        <j-dict-select-tag v-model='sxxq.sfzbd' dict-code='sfzbd'></j-dict-select-tag>
                      </a-form-model-item>
                    </a-col>
                    <a-col  span="8">
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8">
                      <a-form-model-item prop='gzlx' :labelCol='labelCol' :wrapperCol='wrapperCol' label='工作类型'>
                        <j-dict-select-tag v-model='sxxq.gzlx' dict-code='gzlx'></j-dict-select-tag>
                      </a-form-model-item>
                    </a-col>
                    <a-col  span="8">
                      <a-form-model-item prop='sr'   :labelCol='labelCol' :wrapperCol='wrapperCol' label='收入'>
                        <j-dict-select-tag v-model='sxxq.sr' dict-code='bkbpy_sr'></j-dict-select-tag>
                      </a-form-model-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8" >
                      <a-form-model-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='长期居住地'>
                        <a-input placeholder='请输入长期居住地' v-model='sxxq.cqjzd' />
                      </a-form-model-item>
                    </a-col>

                  </a-row>

                  <a-row class="form-row" :gutter="24">
                    <a-col span="8" >
                      <a-form-model-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='主营项目'>
                        <a-input v-model='sxxq.zyxm' />
                      </a-form-model-item>
                    </a-col>

                  </a-row>
                  <a-row class="form-row" :gutter="24">
                    <a-col span="8" >
                      <a-form-model-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='基础模型测算'>
                        <a-input v-model='sxxq.jcmxcs' :disabled="true" style="width: 60%"/>（单位：元）
                      </a-form-model-item>
                    </a-col>
                    <a-col span="8" >
                      <a-form-model-item prop='pyyjyed' :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员建议额度'>
                        <a-input v-model='sxxq.pyyjyed' style="width: 60%"/>（单位：元）
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="24">
                    <a-col span="8" >
                      <a-form-model-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='备注'>
                        <a-input v-model='sxxq.bz' />
                      </a-form-model-item>
                    </a-col>

                  </a-row>

                </a-form-model>
              </a-card>

            </div>
            <div class="steps-action">
              <a-button v-if="current ==0" type="primary" @click="next" style="margin-left: 100px">
                {{this.stepname}}
              </a-button>
              <a-button
                style="margin-left: 100px"
                v-if="current == 1"
                type="primary"
                @click="subpyxx"
              >
                提交评议信息
              </a-button>
              <a-button v-if="current > 0" style="margin-left: 10px" @click="prev">
                上一步
              </a-button>
            </div>

          </a-tab-pane>
        </a-tabs>


        <!--
                <a-form-item
                   :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                     label="具体从事经营项目">
                   <a-input placeholder="请输入具体从事经营项目" v-decorator="['jtcsxm', {}]" />
                 </a-form-item>

                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否授信对象">
                  <a-input placeholder="请输入是否授信对象" v-decorator="['sfsxdx', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="采集点（定位地址）">
                  <a-input placeholder="请输入采集点（定位地址）" v-decorator="['gddz', {}]" />
                </a-form-item>

                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="不予授信情况">
                  <a-input placeholder="请输入不予授信情况" v-decorator="['bysxqx', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="采集状态(1:采集户 ，2:收集户， 3:不予授信,)">
                  <a-input placeholder="请输入采集状态(1:采集户 ，2:收集户， 3:不予授信,)" v-decorator="['cjzt', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="收集户原因">
                  <a-input placeholder="请输入收集户原因" v-decorator="['sjhyy', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="上传状态">
                  <a-input placeholder="请输入上传状态" v-decorator="['cjwczt', {}]" />
                </a-form-item>




                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="经度">
                  <a-input placeholder="请输入经度" v-decorator="['longitude', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="纬度">
                  <a-input placeholder="请输入纬度" v-decorator="['latitude', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="电子签名1">
                  <a-input placeholder="请输入电子签名1" v-decorator="['sign1', {}]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="电子签名2">
                  <a-input placeholder="请输入电子签名2" v-decorator="['sign2', {}]" />
                </a-form-item>

                 <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="电子签名3">
                  <a-input placeholder="请输入电子签名3" v-decorator="['sign3', {}]" />
                </a-form-item>
               -->


      </a-form>
    </a-spin>
    <nhxx-search-modal ref="nhxxSearchModal" @selectFinished="searchNhxxFinished"/>
  </j-modal>
</template>

<script>
import { httpAction, getAction, postAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import JImageUpload from '@/components/jeecg/JImageUpload'
import store from '@/store/'
import { IdCardValidate, getIdCardInfo } from "@/utils/idValidate"
import NhxxSearchModal from './NhxxSearchModal'

export default {
  name: "NhxqModal",
  components: {
    JTreeSelect,JTreeSelectNotJg, JImageUpload, NhxxSearchModal
  },
  watch: {
    'model.zjhm': {
      handler: function(val) {
        console.log('zjhm watch', val)
        if (val && IdCardValidate(val)) {
          let idCardInfo = getIdCardInfo(val)
          console.log('idCardInfo', idCardInfo)
          this.form.setFieldsValue({xb: idCardInfo.sex})
          this.form.setFieldsValue({nl: idCardInfo.age})
        }
      },
      immediate: true
    },
    sxxq: {
      handler: function(val) {
        console.log(' watch', val)
        var result = 0
        if (val.ncfcqk == 1) {
          result += 30000
        }
        if (val.ncfcqk == 2) {
          result += 20000
        }
        if (val.cqywfc == 1) {
          result += 10000
        }
        if (val.ywcl == 1) {
          result += 10000
        }
        if (val.gzlx == 1) {
          result += 10000
        }
        if (val.sr != null && val.sr != '') {
          if (val.sr == 1) {
            result += 10000
          }
          if (val.sr == 2) {
            result += 20000
          }
          if (val.sr == 3) {
            result += 30000
          }
          if (val.sr == 4) {
            result += 40000
          }
        }
        this.sxxq.jcmxcs=result;
        console.log(result)
      },
      deep: true
    },


  },
  data () {
    return {
      dictOptions:[],
      sxxq:{},
      current: 0,
      bysxqxformDate:{},
      bysxqxDictCode:'py_bysxqx_dx',
      steps: [
        {
          title: '不予授信情形',
          content: '第一步',
        },
        {
          title: '评议详情',
          content: '第二步',
        },

      ],
      rules:{
        ncfcqk: [{ required: true, message: 'Please input Activity name', trigger: 'change' }],
        cqywfc: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        ywcl: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        sfzbd: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        gzlx: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        sr: [{ required: true, message: 'Please select Activity zone', trigger: 'blur' }],
        pyyjyed: [{ required: true, message: 'Please select Activity zone', trigger: 'blur' }]
      },
      stepname:'无上述情形,下一步',
      title:"操作",
      visible: false,
      model: {},
      checkedBysxqx:[],
      tableDataJtcyxx: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      formZfpy: this.$form.createForm(this),
      validatorRules:{
      },
      url: {
        add: "/khflgl/nhxq/add",
        edit: "/khflgl/nhxq/edit",
        queryJtcyxx: "/khflgl/nhxq/queryJtcyxx",
        saveNhhzfjImage: "/KhglNhhzzllb/khglNhhzzllb/saveNhhzfjImage",
        deleteNhhzfjImage: "/KhglNhhzzllb/khglNhhzzllb/deleteNhhzfjImage",
        queryNhhzFjxx: "/KhglNhhzzllb/khglNhhzzllb/queryNhhzFjxx",
        editHzxx: "/khglNhhzxxgl/khglNhhzxxgl/editHzxx",
        getHzxxByHhbm: "/khglNhhzxxgl/khglNhhzxxgl/getHzxxByHhbm",
      },
      NhHzfjxxurl: 'images/khxx/',
      uploadFilesHzfjxx: [],
      deleteFileList: [],
      YkhhypicList: [],
      DkyxspicList: [],
      WxzppicList: [],
      QtfjpicList: [],
      dateFormat: 'YYYY-MM-DD',
      // 默认当前月份
      defaultMonthOpera: undefined,
      zfryData: [],
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      sswgTreeDateoptions: [],
      wgxxTreeLoading: false,
      hzxxSearchShow: false,
      optionDisabled: ['1'],
      plpyFormData:{},
      bysxqxList:[],
      hhbm:'',
    }
  },
  created () {
    this.qybm = store.getters.qybm
    this.defaultMonthOpera = moment(new Date(), this.dateFormat);

  },
  methods: {
    next() {
      if(this.checkedBysxqx.length>0){
        let bysxqx=this.checkedBysxqx.join(",");
        let zjhm= this.model.zjhm;
        let hhbm=this.hhbm;
        console.log(bysxqx)
        postAction('/nh/nhbkbpy/saveOrUpdate', {bysxqx:bysxqx,zjhm:zjhm,hhbm:hhbm}).then((response) => {
          if (response.success) {
            this.$message.success('提交评议信息成功！')
          } else {
            this.$message.warning(response.message)
          }
        }).catch((error) => {
          // this.$message.error('系统错误，请联系管理员！原因:', error)
        })

        console.log(this.checkedBysxqx);
        console.log('有选择不予授信请求')
      }else{
        this.current=1;
      }
    },
    prev() {
      this.current=0;
    },
    subpyxx(){
      this.sxxq.hhbm=this.hhbm;
      this.sxxq.zjhm= this.model.zjhm;
      console.log(this.sxxq);
      postAction('/nh/nhbkbpy/saveOrUpdate', this.sxxq).then((response) => {
        if (response.success) {
          this.$message.success('提交评议信息成功！')
        } else {
          this.$message.warning(response.message)
        }
      }).catch((error) => {
        this.$message.error('系统错误，请联系管理员！原因:', error)
      })
    },
    handleCheckedChange(val){
      console.log(val)
      if(val.length>0){
        this.stepname='确认提交';
      }else{
        this.stepname='无上述情形,下一步';
      }
    },
    add () {
      this.optionDisabled = []
      this.edit({});
    },
    getpyxx(zjhm){
      postAction('/nh/nhbkbpy/getOne', {zjhm:zjhm}).then((res) => {
        if (res.success) {
          if(res.result!=null){
            if(res.result.sfjysx=='1'){
              this.current=1;
              this.sxxq = Object.assign({}, res.result);
              this.stepname='无上述情形,下一步';
            }else if(res.result.sfjysx=='2'){
              this.current=0;
              this.stepname='确认提交';
              this.bysxqxList=res.result.bysxqx.split(',');
              this.checkedBysxqx = this.checkedBysxqx.concat(this.bysxqxList);
              const map = new Map()
              this.checkedBysxqx= this.checkedBysxqx.filter(key => !map.has(key) && map.set(key, 1))
            }
          }

        }
      })
    },
    initDict(hhbm){
      //
      this.hhbm=hhbm
      getAction('/khglNhhzxxgl/khglNhhzxxgl/queryHywxxByHhbm',{hhbm:hhbm}).then((res) => {
        if (res.success) {
          this.plpyFormData=res.result;
        }
      }).then((res)=>{
          console.log(this.plpyFormData)
          let params = null;
          getAction(`/sys/dict/getDictItems/${this.bysxqxDictCode}`,params).then((res) => {
            if (res.success) {
              let checkedArray = [];
              res.result.forEach((item, index) => {
                if(index <= 7) {
                  item.disabled = true
                }
                if (index == 0) {
                  //表内不良
                  if (this.plpyFormData.bnbldkye>0) {
                    item.text = `${item.text}[${this.plpyFormData.bnbldkye}]`;
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 1) {
                  //表外不良
                  if (this.plpyFormData.bwbldkye>0) {
                    item.text = `${item.text}[${this.plpyFormData.bwbldkye}]`;
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 2) {
                  //是否起诉
                  if(this.plpyFormData.sfss == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 3) {
                  //是否服刑
                  if(this.plpyFormData.sffx == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                }else if (index == 4) {
                  //是否涉毒
                  if(this.plpyFormData.sfsd == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 5) {
                  //是否重大疾病
                  if(this.plpyFormData.sfzdjb == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 6) {
                  //非法集资
                  if(this.plpyFormData.sfffjz == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 7) {
                  //是否符合年龄
                  if(this.plpyFormData.sfwbdbh == '1') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                } else if (index == 15) {
                  //是否符合年龄
                  if(this.plpyFormData.sffhnl == '2') {
                    item.checked = true
                    let value=index+1;
                    checkedArray.push(value.toString())
                  }
                }
              })

              this.dictOptions = res.result;
              this.getpyxx(this.model.zjhm);
              this.checkedBysxqx=checkedArray;
              //this.handleCheckedChange(checkedArray)
            }
          })
        }
      );

    },
    edit (record) {
      this.form.resetFields();
      this.model = Object.assign({}, record);
      this.visible = true;
      this.wgxxTreeLoading = true
      this.initDict(record.hhbm);


      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2', disableSelect: '1'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
        this.wgxxTreeLoading = false
      })
      if(record.hhbm) {
        //查询户主信息
        getAction(this.url.getHzxxByHhbm, {hhbm: record.hhbm}).then(res => {
          if (res.success && res.result) {
            let hzxx = pick(res.result, 'khlx', 'khlxms', 'zfdz', 'zfmjr', 'ymbkhgx', 'sfjwxhy', 'dkyxs', 'zfrq')
            if (this.qybm == '400' && hzxx.khlx == '3') {
              //黑名单增加提示信息
              this.$info({
                title: '提示',
                content: '该户为【黑名单】客户，不予授信情形为：【' + hzxx.khlxms + '】，录入走访信息后不计入有效走访！'
              })
            }
            this.$nextTick(() => {
              this.form.setFieldsValue(hzxx)
              if (res.result.zfry) {
                //没值的时候如果set了，会展示一个空的关闭选项
                this.form.setFieldsValue({zfry: res.result.zfry});
              }
              this.form.setFieldsValue({hzbz: res.result.bz});
            });
          }
        })
        //查询家庭成员信息
        getAction(this.url.queryJtcyxx, {hhbm: record.hhbm}).then((res) => {
          console.log('queryJtcyxx', res)
          if (res.success && res.result) {
            this.tableDataJtcyxx = res.result
          } else {
            this.tableDataJtcyxx = []
          }
        })
      }
      //查询支行员工信息
      this.zfryData = []
      getAction('/ygrggl/hrBasStaffPost/queryList', {zzbz: store.getters.userInfo.orgCode}).then(res => {
        if (res && res.success) {
          res.result.map(item => {
            this.zfryData.push(item.yggh_dictText)
          })
        }
      })

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'wgbh','jgdm','sszh','jgdm_dictText','khlx','hhbm','khmc','zjhm','mz','hyzk','hkxz','yhzgx','whcd','cshygz','sjhm','hjdz','zz','bz','yssxz','yxzc','zz1','zz2','sfbldkh','sfpkh','sfdbh','xtpdjg','xtpdsm','gjrpdjg','gjrpdsm','zzpdjg','zzpdsm','sfycdg','kfyyqk','kcqzyw','khsxqk','longitude','latitude','sign1','sign2','byhm','pfr','khlx1','khlx2','ywzn','jkzk','ldnl','jznx','zgxl','zgxw','ddpzzhpj','jzzt','sfsx','pyxxFlag','khxxFlag','khglFlag','signFlag','sskhjl','gzdw','gzdwdz','qq','wgcs','sfxdry','sign3','sfsxdx','gddz','zdyb','bysxqx','cjzt','sjhyy','cjwczt','jtcsxm','wgdq','wglx','khlx3','lrbz','lrr','upDt','upTm','zdyzbm','khblsh','ddpzzhpj1','ddpzzhpj2','qzywyysj'))
        this.form.setFieldsValue({zzjc: this.model.jgdm_dictText})
        //时间格式化
        this.form.setFieldsValue({zjqfrq:this.model.zjqfrq?moment(this.model.zjqfrq):null})
        this.form.setFieldsValue({zjdqrq:this.model.zjdqrq?moment(this.model.zjdqrq):null})
        this.form.setFieldsValue({fxsj:this.model.fxsj?moment(this.model.fxsj):null})
        this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})

        if (this.model.zjhm && IdCardValidate(this.model.zjhm)) {
          let idCardInfo = getIdCardInfo(this.model.zjhm)
          console.log('idCardInfo', idCardInfo)
          this.form.setFieldsValue({xb: idCardInfo.sex})
          this.form.setFieldsValue({nl: idCardInfo.age})
        }
        this.getFjxx()

      });
      if (!this.model.sjhm) {
        getAction('/pad/pyxx/nhplpy/getSjhm', {khId: record.id}).then(res => {
          if (res.success && res.result && res.result.sjhmXf) {
            this.model.sjhm = res.result.sjhmXf
            this.form.setFieldsValue({sjhm: res.result.sjhmXf})
          }
        })
      }

    },
    getFjxx(){
      let _this = this
      //请求个人附件-证件信息-身份证
      getAction(this.url.queryNhhzFjxx, { hhbm: this.model.hhbm }).then(function(response) {
        if (response.success) {
          for (let i = 0; i < response.result.length; i++) {
            if (response.result[i].zllx == 3) {
              _this.YkhhypicList.push(response.result[i])
            } else if (response.result[i].zllx == 6) {
              _this.QtfjpicList.push(response.result[i])
            } else if (response.result[i].zllx == 8) {
              _this.DkyxspicList.push(response.result[i])
            } else if (response.result[i].zllx == 9) {
              _this.WxzppicList.push(response.result[i])
            }
          }
          // for (let i = 0; i < this.picWebUrlList.length; i++) {
          //   _this.RhzppicList [i].url = process.env.VUE_APP_STATIC_URL + _this.RhzppicList [i].fwlj
          //   _this.FwzppicList [i].url = process.env.VUE_APP_STATIC_URL + _this.FwzppicList [i].fwlj
          //   _this.YkhhypicList[i].url = process.env.VUE_APP_STATIC_URL + _this.YkhhypicList[i].fwlj
          //   _this.SnzppicList [i].url = process.env.VUE_APP_STATIC_URL + _this.SnzppicList [i].fwlj
          //   _this.HkbpicList  [i].url = process.env.VUE_APP_STATIC_URL + _this.HkbpicList  [i].fwlj
          //   _this.QtfjpicList [i].url = process.env.VUE_APP_STATIC_URL + _this.QtfjpicList [i].fwlj
          //   _this.ZhpfrList   [i].url = process.env.VUE_APP_STATIC_URL + _this.ZhpfrList   [i].fwlj
          // }
        } else {
          _this.YkhhypicList = []
          _this.QtfjpicList = []
          _this.DkyxspicList = []
          _this.WxzppicList = []
        }
      }).catch(function(error) {
      })
    },
    imageChange(data) {
      console.log('imageChange', data)
      if (data.uploadFiles.length > 0) {
        for (let i = 0; i < this.uploadFilesHzfjxx.length; i++) {
          if (this.uploadFilesHzfjxx[i].zllx == data.uploadFiles[0].zllx) {
            this.uploadFilesHzfjxx.splice(i, 1)
            i--
          }
        }
      }

      for (let i = 0; i < data.uploadFiles.length; i++) {
        this.uploadFilesHzfjxx.push(data.uploadFiles[i])
      }

      for (let i = 0; i < this.uploadFilesHzfjxx.length; i++) {
        if (data.deleteFiles != undefined && data.deleteFiles.length > 0) {
          for (let y = 0; y < data.deleteFiles.length; y++) {
            if (this.uploadFilesHzfjxx[i].uid == data.deleteFiles[y].file.uid) {
              this.uploadFilesHzfjxx.splice(i, 1)
            }
          }
        }
      }
      console.info('this.uploadFilesHzfjxx', this.uploadFilesHzfjxx)

      for (let i = 0; i < data.deleteFiles.length; i++) {
        if (data.deleteFiles[i].file.zlbh) {
          this.deleteFileList.push({ zlbh: data.deleteFiles[i].file.zlbh })
        }
      }

    },
    close () {
      this.$emit('close');
      this.tableDataJtcyxx = []
      this.YkhhypicList = []
      this.QtfjpicList = []
      this.DkyxspicList = []
      this.WxzppicList = []
      this.uploadFilesHzfjxx = []
      this.deleteFileList = []
      this.hzxxSearchShow = false
      this.optionDisabled = ['1']
      this.checkedBysxqx=[]
      this.sxxq={}
      this.current=0;
      // this.stepname='无上述情形,下一步'
      this.visible = false;
    },
    zfryChange(value) {
      console.log('zfryChange', value)
    },
    syncHjdz() {
      if (this.model.hjdz) {
        this.form.setFieldsValue({zfdz: this.model.hjdz})
      }
    },
    saveNhfjxxSubmit() {
      //提交附件信息-信息
      let _this = this
      for (let i = 0; i < _this.uploadFilesHzfjxx.length; i++) {
        _this.uploadFilesHzfjxx[i].zllx = _this.uploadFilesHzfjxx[i].zllx
        _this.uploadFilesHzfjxx[i].zldx = _this.uploadFilesHzfjxx[i].size
        _this.uploadFilesHzfjxx[i].fwlj = _this.uploadFilesHzfjxx[i].fwlj
        _this.uploadFilesHzfjxx[i].zlmc = _this.uploadFilesHzfjxx[i].name
        _this.uploadFilesHzfjxx[i].hhbm = _this.model.hhbm
        _this.uploadFilesHzfjxx[i].qydm = _this.model.wgbh
      }
      let p = new Promise((resolve, reject) => {
        postAction(this.url.saveNhhzfjImage, _this.uploadFilesHzfjxx).then(function(res) {
          console.info(res)
          if (!res.success) {
            reject('保存附件信息失败')
            return false
          }
          for (let i = 0; i < _this.uploadFilesHzfjxx.length; i++) {
            _this.uploadFilesHzfjxx[i].id = i
          }
          resolve()
        }).catch(function(error) {
          console.log(error)
          reject()
        })
      })
      return p
    },
    deleteNhfjxxSubmit() {
      let _this = this
      let p = new Promise((resolve, reject) => {
        postAction(this.url.deleteNhhzfjImage, _this.deleteFileList).then(function(res) {
          console.info(res)
          if (!res.success) {
            reject('删除附件信息失败')
            return false
          }
          _this.deleteFileList = []
          resolve()
        }).catch(function(error) {
          console.log(error)
          reject()
        })
      })
      return p
    },
    editHzxx() {
      let values = this.form.getFieldsValue()
      let formData = pick(values, 'wgbh', 'jgdm', 'sszh', 'hhbm', 'khmc', 'zjhm', 'yhzgx', 'zfdz','zfmjr', 'ymbkhgx', 'sfjwxhy', 'dkyxs', 'zfry', 'zfrq', 'hzbz')
      formData.ssyxdy = formData.wgbh
      formData.hzxm = formData.khmc
      formData.hzzjhm = formData.zjhm
      formData.zfry = formData.zfry.toString()
      formData.zfrq = formData.zfrq?moment(formData.zfrq).format("YYYY-MM-DD"):null;
      formData.bz = formData.hzbz
      let p = new Promise((resolve, reject) => {
        postAction(this.url.editHzxx, formData).then(res => {
          if (!res.success) {
            reject('保存户主信息失败')
            return false
          }
          resolve()
        }).catch(function (error) {
          console.log(error)
          reject()
        })
      })
      return p
    },
    handleOk() {
      if(this.qybm != '400') {
        this.saveGrxx().then(()=> {
          this.confirmLoading = false;
          this.$emit('ok');
          this.close();
        }).catch(err => {
          this.$message.warning(err);
        })
      } else {
        this.saveGrxx().then(()=> {
          //删除附件
          return this.deleteNhfjxxSubmit()
        }).then(() => {
          //保存附件
          return this.saveNhfjxxSubmit()
        }).then(() =>{
          //保存户主信息
          if(this.model.id){
            return this.editHzxx();
          }
        }).then(() =>{
          this.confirmLoading = false;
          this.$emit('ok');
          this.close();
        }).catch(err => {
          this.$message.warning(err);
        })
      }

    },

    saveGrxx () {
      const that = this;
      // 触发表单验证
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log('formData', formData)
            //时间格式化lrsj
            formData.zjqfrq = formData.zjqfrq?formData.zjqfrq.format():null;
            formData.zjdqrq = formData.zjdqrq?formData.zjdqrq.format():null;
            formData.fxsj = formData.fxsj?formData.fxsj.format():null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                resolve()
              }else{
                reject(res.message)
              }
            })
          }else {
            console.log('error submit!!')
            reject('信息校验失败')
          }
        })
      })
    },
    handleCancel () {
      this.close()
    },
    wgxxTreeChange(value, label, extra) {
      console.log('wgxxTreeChange', value, label, extra)
      getAction('/yxdyglmain/yxdyglMain/getSswgSszh', {'sswg': value}).then(response => {
        console.log('getSswgSszh', response.result)
        // this.form.getFieldDecorator('sszh', {})
        this.form.setFieldsValue({'sszh': response.result.zzbz})
        this.form.setFieldsValue({'zzjc': response.result.zzjc})

      })
    },
    yhzgxChange(value) {
      console.log('yhzgxChange', value)
      if (value && value != '1') {
        this.hzxxSearchShow = true
      } else {
        this.hzxxSearchShow = false
      }
    },
    searchNhxx() {
      this.$refs['nhxxSearchModal'].init()
    },
    searchNhxxFinished(selectionRows) {
      console.log('searchNhxxFinished', selectionRows)
      if (selectionRows && selectionRows.length > 0) {
        let hzxx = selectionRows[0]
        this.form.setFieldsValue({'hzxm': hzxx.hzxm})
        this.form.setFieldsValue({'hhbm': hzxx.hhbm})

      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>