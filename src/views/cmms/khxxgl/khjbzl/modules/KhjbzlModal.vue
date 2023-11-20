<template>
  <j-modal :title="title"
           :width="1600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           switchFullscreen
           :fullscreen="true"
           :destroyOnClose="true"
           :disableSubmit="disableSubmit"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">

      <a-card title="">
        <a-row :gutter="24" type="flex" justify="center" style="text-align: center;align-content: center">
          <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false hoverable style="width: 200px;height: 200px">
              <img style="height: 200px;width: 90%"
                   slot="cover"
                   alt="example"
                   src="./man.png"
              />
            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="5" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false style="height: 200px" :bodyStyle="{padding:'0'}">
              <table style="width:100%;height: 200px;text-align: center">
                <tr>
                  <th>所属机构</th>
                  <td>:</td>
                  <td>{{ model.jgdm_dictText }}</td>
                </tr>
                <tr>
                  <th>所属网格</th>
                  <td>:</td>
                  <td>{{ model.wgbh_dictText }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>:</td>
                  <td>{{ model.khmc }}</td>
                </tr>
                <tr>
                  <th>联系方式</th>
                  <td>:</td>
                  <td>{{ model.lxfs }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>:</td>
                  <td>{{ model.dz }}</td>
                </tr>
                <tr>
                  <th>客户等级</th>
                  <td>:</td>
                  <td>{{ model.khdj }}</td>
                </tr>
              </table>

            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false
                    :headStyle="{color:'#FCF7EE',backgroundColor:'#F58E4F',borderRadius:'15px 15px 0px 0px'}"
                    :bodyStyle="{padding:'0',color:'#615556',backgroundColor:'#FCEBE1',borderRadius:'0px 0px 15px 15px'}">
              <div slot="title">存款余额</div>
              <div slot="title" style="padding-top: 20px">{{ cksjmx.ye }} 元</div>
              <a-card-grid class="grid">
                较上月
              </a-card-grid>
              <a-card-grid class="grid" :hoverable="false">
                较年初
              </a-card-grid>

              <a-card-grid class="grid" style="border-radius:0px 0px 0px 15px">
                {{ cksjmx.yejsy }}
                <a-icon v-show="cksjmx.yejsybz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.yejsybz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>
              <a-card-grid class="grid" style="border-radius:0px 0px 15px 0px">
                {{ cksjmx.yejnc }}
                <a-icon v-show="cksjmx.yejncbz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.yejncbz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>

            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false
                    :headStyle="{color:'#FCF7EE',backgroundColor:'#3470E1',borderRadius:'15px 15px 0px 0px'}"
                    :bodyStyle="{padding:'0',color:'#615556',backgroundColor:'#E4EEFC',borderRadius:'0px 0px 15px 15px'}">
              <div slot="title">活期存款余额</div>
              <div slot="title" style="padding-top: 20px">{{ cksjmx.hqye }} 元</div>
              <a-card-grid class="grid">
                较上月
              </a-card-grid>
              <a-card-grid class="grid" :hoverable="false">
                较年初
              </a-card-grid>

              <a-card-grid class="grid" style="border-radius:0px 0px 0px 15px">
                {{ cksjmx.hqjsy }}
                <a-icon v-show="cksjmx.hqjsybz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.hqjsybz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>
              <a-card-grid class="grid" style="border-radius:0px 0px 15px 0px">
                {{ cksjmx.hqjnc }}
                <a-icon v-show="cksjmx.hqjncbz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.hqjncbz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>
            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false
                    :headStyle="{color:'#FCF7EE',backgroundColor:'#54CADA',borderRadius:'15px 15px 0px 0px'}"
                    :bodyStyle="{padding:'0',color:'#615556',backgroundColor:'#DDF5F9',borderRadius:'0px 0px 15px 15px'}">
              <div slot="title">定期存款余额</div>
              <div slot="title" style="padding-top: 20px">{{ cksjmx.dqye }} 元</div>
              <a-card-grid class="grid">
                较上月
              </a-card-grid>
              <a-card-grid class="grid" :hoverable="false">
                较年初
              </a-card-grid>

              <a-card-grid class="grid" style="border-radius:0px 0px 0px 15px">
                {{ cksjmx.dqjsy }}
                <a-icon v-show="cksjmx.dqjsybz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.dqjsybz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>
              <a-card-grid class="grid" style="border-radius:0px 0px 15px 0px">
                {{ cksjmx.dqjnc }}
                <a-icon v-show="cksjmx.dqjncbz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="cksjmx.dqjncbz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>

            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
            <a-card :bordered=false
                    :headStyle="{color:'#FCF7EE',backgroundColor:'#E5BC5A',borderRadius:'15px 15px 0px 0px'}"
                    :bodyStyle="{padding:'0',color:'#615556',backgroundColor:'#FBF3E6',borderRadius:'0px 0px 15px 15px'}">
              <div slot="title">贷款余额</div>
              <div slot="title" style="padding-top: 20px">{{ dksjmx.dkye }} 元</div>
              <a-card-grid class="grid">
                较上月
              </a-card-grid>
              <a-card-grid class="grid" :hoverable="false">
                较年初
              </a-card-grid>

              <a-card-grid class="grid" style="border-radius:0px 0px 0px 15px">
                {{ dksjmx.yejsy }}
                <a-icon v-show="dksjmx.yejsybz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="dksjmx.yejsybz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>
              <a-card-grid class="grid" style="border-radius:0px 0px 15px 0px">
                {{ dksjmx.yejnc }}
                <a-icon v-show="dksjmx.yejncbz >= 0" type="arrow-up" style="color: green"/>
                <a-icon v-show="dksjmx.yejncbz < 0" type="arrow-down" style="color: red"/>
              </a-card-grid>

            </a-card>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="行内信息">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="基本信息">
            <a-form :form="form">
              <a-row :gutter="24">
                <a-col :lg="6">
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
                                      :treeDefaultExpandAll="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
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
                                   :treeDefaultExpandAll="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类别">
                    <j-dict-select-tag placeholder="请选择客户类别" v-decorator="['khlb', {}]" :triggerChange="true"
                                       dict-code="khlb"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型">
                    <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', {}]" :triggerChange="true"
                                       dict-code="clkhlx"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户名称">
                    <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件号码">
                    <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="联系方式">
                    <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="地址">
                    <a-input placeholder="请输入地址" v-decorator="['dz', {}]"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户性质">
                    <j-dict-select-tag placeholder="请选择客户性质" v-decorator="['khxz', {}]" :triggerChange="true"
                                       dict-code="khlx"/>

                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户等级">
                    <a-input placeholder="请输入客户等级" v-decorator="['khdj', {}]"/>
                  </a-form-item>
                </a-col>
                <!--                <a-col :lg="6">
                                  <a-form-item
                                    :labelCol="labelCol"
                                    :wrapperCol="wrapperCol"
                                    label="档案编号">
                                    <a-input placeholder="请输入档案编号" v-decorator="['dabh', {}]" />
                                  </a-form-item>
                                </a-col>-->
              </a-row>
            </a-form>


          </a-tab-pane>
          <a-tab-pane key="9" tab="关联信息">
            <a-card class="card" :bordered="false">
              <a-table
                size="middle"
                :pagination="false"
                :columns="jtzycyxxTable.columns"
                :dataSource="jtzycyxxTable.dataSource"
                bordered>
              </a-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="2" tab="农户信息" v-if="model.khxz != 2">
            <a-form :form="form">
              <a-row :gutter="24">
                <!--                <a-col :lg="6">
                                  <a-form-item
                                    :labelCol="labelCol"
                                    :wrapperCol="wrapperCol"
                                    label="原所属乡镇">
                                    <a-input placeholder="请输入原所属乡镇" v-model="nhxx.yssxz"/>
                                  </a-form-item>
                                </a-col>
                                <a-col :lg="6">
                                  <a-form-item
                                    :labelCol="labelCol"
                                    :wrapperCol="wrapperCol"
                                    label="原行政村">
                                    <a-input placeholder="请输入原行政村" v-decorator="['yxzc', {}]" />
                                  </a-form-item>
                                </a-col>-->
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="住址1">
                    <a-input placeholder="请输入住址1" v-model="nhxx.zz1" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="住址2">
                    <a-input placeholder="请输入住址2" v-model="nhxx.zz2" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol2"
                    :wrapperCol="wrapperCol2"
                    label="是否不良贷款客户"
                  >
                    <j-dict-select-tag placeholder="请选择是否不良贷款客户" v-model="nhxx.sfbldkh" style="width: 255px" disabled
                                       dict-code="sfbz"/>

                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否贫困户">
                    <j-dict-select-tag placeholder="请选择是否贫困户" v-model="nhxx.sfpkh" disabled dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否低保户">
                    <j-dict-select-tag placeholder="请选择是否低保户" v-model="nhxx.sfdbh" disabled dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否吸毒人员">
                    <j-dict-select-tag placeholder="请选择是否吸毒人员" v-model="nhxx.sfxdry" disabled dict-code="sfbz"/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户重要程度">
                    <j-dict-select-tag placeholder="请选择客户重要程度" v-model="nhxx.kfyyqk" disabled dict-code="khgl_khzycd"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户潜在业务">
                    <j-dict-select-tag placeholder="请选择客户潜在业务" v-model="nhxx.kcqzyw" disabled dict-code="khqzyw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户授信情况">
                    <j-dict-select-tag placeholder="请选择客户授信情况" v-model="nhxx.khsxqk" disabled dict-code="khgl_sxqk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="备用号码">
                    <a-input placeholder="请输入备用号码" v-model="nhxx.byhm" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="陪访人">
                    <a-input placeholder="请输入陪访人" v-model="nhxx.pfr" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型1">
                    <j-dict-select-tag placeholder="请选择客户类型1" v-model="nhxx.khlx1" disabled dict-code="khlx1"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型2">
                    <j-dict-select-tag placeholder="请选择客户类型2" v-model="nhxx.khlx2" disabled dict-code="khlx2"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型3">
                    <j-dict-select-tag placeholder="请选择客户类型3" v-model="nhxx.khlx3" disabled dict-code="khlx3"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="有无子女">
                    <j-dict-select-tag placeholder="请选择有无子女" v-model="nhxx.ywzn" disabled dict-code="ywbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="健康状况">
                    <j-dict-select-tag placeholder="请选择健康状况" v-model="nhxx.jkzk" disabled dict-code="jkzk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="劳动能力">
                    <j-dict-select-tag placeholder="请选择劳动能力" v-model="nhxx.ldnl" disabled dict-code="ldnl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="居住年限">
                    <j-dict-select-tag placeholder="请选择居住年限" v-model="nhxx.jznx" disabled dict-code="jznx"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="最高学历">
                    <j-dict-select-tag placeholder="请选择最高学历" v-model="nhxx.zgxl" disabled dict-code="xl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="最高学位">
                    <j-dict-select-tag placeholder="请选择最高学位" v-model="nhxx.zgxw" disabled dict-code="zgxw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="道德品质综合评价">
                    <j-dict-select-tag placeholder="请选择道德品质综合评价" v-model="nhxx.ddpzzhpj" disabled dict-code="ddpzzhpj"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="居住状态">
                    <j-dict-select-tag placeholder="请选择居住状态" v-model="nhxx.jzzt" disabled dict-code="jzzk"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件签发日期">
                    <a-date-picker v-model="nhxx.zjqfrq" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件到期日期">
                    <a-date-picker v-model="nhxx.zjdqrq" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="返乡时间">
                    <a-date-picker v-model="nhxx.fxsj" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否授信">
                    <j-dict-select-tag v-model="nhxx.sfsx" disabled dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="所属客户经理">
                    <a-input placeholder="请输入所属客户经理" v-model="nhxx.sskhjl" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="工作单位">
                    <a-input placeholder="请输入工作单位" v-model="nhxx.gzdw" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="工作单位地址">
                    <a-input placeholder="请输入工作单位地址" v-model="nhxx.gzdwdz" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="腾讯QQ号码">
                    <a-input placeholder="请输入腾讯QQ号码" v-model="nhxx.qq" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否外出务工">
                    <j-dict-select-tag placeholder="请选择是否外出务工" v-model="nhxx.sfycdg" disabled dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工类型">
                    <a-input v-model="nhxx.wglx" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工城市">
                    <a-input placeholder="请输入务工城市" v-model="nhxx.wgcs" disabled/>
                  </a-form-item>
                </a-col>

                <a-col :lg="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="务工地区">
                    <a-input placeholder="请输入务工地区" v-model="nhxx.wgdq" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="12">
                  <a-form-item
                    label="备注">
                    <a-input type="textarea" v-model="nhxx.bz" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>


          </a-tab-pane>
          <a-tab-pane key="3" tab="商户信息" v-if="model.khxz == 2">
            <a-form :form="form">
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属网格">
                    <JTreeSelectNotJg placeholder="请选择归属网格"
                                      v-model="shxx.wgbh"
                                      treeNodeFilterProp="title"
                                      pidField="PARENT_ID"
                                      dict="YXDYGL_MAIN,WGMC,ID"
                                      pidValue="0"
                                      :showSearch="true"
                                      :treeDefaultExpandAll="true" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属机构">
                    <j-tree-select placeholder="请选择所属机构"
                                   v-model="shxx.jgdm"
                                   treeNodeFilterProp="title"
                                   pid-field="sjywjgdm"
                                   dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                                   :showSearch="true"
                                   :treeDefaultExpandAll="true"
                                   disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="商户名称">
                    <a-input placeholder="请输入商户名称" v-model="shxx.shmc" disabled/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="法定代表人">
                    <a-input placeholder="请输入法定代表人" v-model="shxx.frdb" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="法人证件号码">
                    <a-input placeholder="请输入法人证件号码" v-model="shxx.frzjhm" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="统一社会信用代码">
                    <a-input placeholder="请输入统一社会信用代码" v-model="shxx.tyshxydm" disabled/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="营业执照">
                    <a-input placeholder="请输入营业执照" v-model="shxx.yyzz" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="纳税人识别号">
                    <a-input placeholder="请输入纳税人识别号" v-model="shxx.nsrsbh" disabled/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="组织机构代码">
                    <a-input placeholder="请输入组织机构代码" v-model="shxx.zzjgdm" disabled/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="注册号">
                    <a-input placeholder="请输入注册号" v-model="shxx.zch" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="经营状态">
                    <j-dict-select-tag placeholder="请选择经营状态" v-model="shxx.jyzt" disabled dict-code="jyzt"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="注册资本">
                    <a-input placeholder="请输入注册资本" v-model="shxx.zccb" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="成立日期">
                    <a-date-picker v-model="shxx.clrq" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="联系方式">
                    <a-input placeholder="请输入联系方式" v-model="shxx.lsfs" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="更多联系方式">
                    <a-input placeholder="请输入更多联系方式" v-model="shxx.gdlsfs" disabled/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="邮箱地址">
                    <a-input placeholder="请输入邮箱地址" v-model="shxx.yxdz" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="更多邮箱地址">
                    <a-input placeholder="请输入更多邮箱地址" v-model="shxx.gdyxdz" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="地址">
                    <a-input placeholder="请输入地址" v-model="shxx.dz" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="参保人数">
                    <a-input placeholder="请输入参保人数" v-model="shxx.cbrs" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="商户类型">
                    <j-dict-select-tag placeholder="请选择商户类型" dict-code="qylx" v-model="shxx.shlx" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="所属行业">
                    <a-input placeholder="请输入所属行业" v-model="shxx.sshy" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="曾用名">
                    <a-input placeholder="请输入曾用名" v-model="shxx.cym" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="网址">
                    <a-input placeholder="请输入网址" v-model="shxx.wz" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="经营范围">
                    <a-input placeholder="请输入经营范围" v-model="shxx.jyfw" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24" style="margin-left: 50px">
                <a-col :lg="12">
                  <a-form-item
                    label="备注">
                    <a-input placeholder="请输入备注" type="textarea" v-model="shxx.bz" disabled/>
                  </a-form-item>
                </a-col>

              </a-row>
            </a-form>


          </a-tab-pane>
          <a-tab-pane key="4" tab="存款趋势">
            <ve-line :data="visitInfoCk" :settings="ckset"></ve-line>
          </a-tab-pane>
          <a-tab-pane key="5" tab="贷款趋势">
            <ve-line :data="visitInfoDk" :settings="dkset"></ve-line>
          </a-tab-pane>
          <a-tab-pane key="6" tab="产品信息">
            <a-form :form="form">
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否开通存款业务">
                    <j-dict-select-tag v-model="hmcxx.sfktckyw" disabled placeholder="请选择是否开通存款业务"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="存款余额">
                    <a-input placeholder="请输入存款余额" v-model="hmcxx.ckye" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="存款日平余额">
                    <a-input placeholder="请输入存款日平余额" v-model="hmcxx.ckrpye" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否开通贷款业务">
                    <j-dict-select-tag v-model="hmcxx.sfktdkyw" disabled placeholder="请选择是否开通贷款业务"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款金额">
                    <a-input placeholder="请输入贷款金额" v-model="hmcxx.dkje" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款余额">
                    <a-input placeholder="请输入贷款余额" v-model="hmcxx.dkye" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="不良贷款余额">
                    <a-input placeholder="请输入不良贷款余额" v-model="hmcxx.bldkye" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="表外不良贷款余额">
                    <a-input placeholder="请输入表外不良贷款余额" v-model="hmcxx.bwbldkye" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否开通手机银行">
                    <j-dict-select-tag v-model="hmcxx.sfktsjyhyw" disabled placeholder="请选择是否开通手机银行"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否办理ETC">
                    <j-dict-select-tag v-model="hmcxx.sfbletcyw" disabled placeholder="请选择是否办理ETC"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否开通社保卡">
                    <j-dict-select-tag v-model="hmcxx.sfktsbk" disabled placeholder="请选择是否开通社保卡"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否领取社保卡">
                    <j-dict-select-tag v-model="hmcxx.sflqsbk" disabled placeholder="请选择是否领取社保卡"
                                       dictCode="sfbz"/>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
          <!--          <a-tab-pane key="7" tab="资产信息">
                      Content of Tab Pane 5
                    </a-tab-pane>
                    <a-tab-pane key="8" tab="负债信息">
                      Content of Tab Pane 6
                    </a-tab-pane>-->
          <a-tab-pane key="11" tab="外部数据">
            <a-card class="card" :bordered="false" title="市局下发">
              <a-table
                size="middle"
                :pagination="false"
                :columns="sjxfsjTable.columns"
                :dataSource="sjxfsjTable.dataSource"
                bordered>
              </a-table>
            </a-card>
            <a-card class="card" :bordered="false" title="制卡数据">
              <a-table
                size="middle"
                :pagination="false"
                :columns="zksjTable.columns"
                :dataSource="zksjTable.dataSource"
                bordered>
              </a-table>
            </a-card>
            <a-card class="card" :bordered="false" title="脱贫及监测户信息">
              <a-table
                size="middle"
                :pagination="false"
                :columns="tpjchmdTable.columns"
                :dataSource="tpjchmdTable.dataSource"
                bordered>
              </a-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="10" tab="走访记录">
            <a-table
              size="middle"
              :pagination="false"
              :columns="hfxxTable.columns"
              :dataSource="hfxxTable.dataSource"
              bordered>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-card>

    </a-spin>
  </j-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import ChartCard from '@/components/ChartCard'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import LineChartMultid from '@/components/chart/LineChartMultid'
import echarts from 'echarts'

export default {
  name: 'KhjbzlModal',
  components: {
    ChartCard, JTreeSelect, JTreeSelectNotJg, LineChartMultid, echarts
  },
  data() {
    return {
      qybm: '',
      visitFieldsCk: ['存款余额', '存款月日平'],
      visitFieldsDk: ['贷款余额', '贷款月日平'],

      dkset:{
        dimension: '日期',
        metrics: ['贷款余额', '贷款月日平']
      },
      visitInfoDk: {
        columns: ['日期', '贷款余额', '贷款月日平'],
        rows:[]
      },
      ckset:{
        dimension: '日期',
        metrics: ['存款余额', '存款月日平']
      },
      visitInfoCk: {
        columns: ['日期', '存款余额', '存款月日平'],
        rows:[]
      },
      zbinfo: {},
      disableSubmit: false,
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      labelCol2: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        add: '/khjbzl/khjbzl/add',
        edit: '/khjbzl/khjbzl/edit',
        getCksjmxZhUrl: '/khywxx/khxxglCksjmxZh/getMaxDateByZjhm',
        getCksjmxQhUrl: '/khywxx/khxxglCksjmxQh/getMaxDateByZjhm',
        getDksjmxZhUrl: '/khywxx/khxxglDksjmxZh/getMaxDateByZjhm',
        getDksjmxQhUrl: '/khywxx/khxxglDksjmxQh/getMaxDateByZjhm',
        getCkqsByZjhmUrl: '/khywxx/khxxglCksjmxZh/getCkqsByZjhm',
        getCkqsByZjhmQhUrl: '/khywxx/khxxglCksjmxQh/getCkqsByZjhm',
        getDkqsByZjhmUrl: '/khywxx/khxxglDksjmxZh/getDkqsByZjhm',
        getDkqsByZjhmQhUrl: '/khywxx/khxxglDksjmxQh/getDkqsByZjhm',
        getNhxqByZjhmUrl: '/khflgl/nhxq/list',
        getShxqByZjhmUrl: '/khflgl/shxq/list',
        getGlxxByZjhmUrl: '/khflgl/nhxq/getHByZjhm',
        getHmcxxByZjhmUrl: '/khgl/khhmc/list',
        getHfxxByZjhmUrl: '/clgrkh/clgrkhjbxx/clgrkhHfxxQuery',
        getSjxfsjByZjhmUrl: '/wbsjgl/sjxfsj/queryByZjhm',
        getZksjByZjhmUrl: '/wbsjgl/zksj/queryByZjhm',
        getTpjchmdByZjhmUrl: '/wbsjgl/tpjchmd/queryByZjhm',
      },
      option: {
        grid: {
          position: 'center'
        },
        tooltip: {
          //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
          confine: true,
          enterable: true //鼠标是否可以移动到tooltip区域内
        },
        legend: {
          x: 'right',
          y: '24px',
          icon: 'circle',
          orient: 'vertical',
          data: ['岗位', '个人'],
          align: 'left',
          itemGap: 20,
          itemWidth: 8
        },
        radar: [
          {
            indicator: [
              { text: '知识', max: 100 },
              { text: '廉洁', max: 100 },
              { text: '业绩', max: 100 },
              { text: '技能', max: 100 },
              { text: '素质', max: 100 }
            ],
            center: ['40%', '55%'], // 调位置
            radius: 90, // 调大小
            splitNumber: 7, // 雷达图圈数设置
            name: {
              textStyle: {
                color: '#838D9E'
              }
            },
            // 设置雷达图中间射线的颜色
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0.15)'
              }
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: 'rgba(255,255,255,0)' // 图表背景的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(0,0,0,0.15)' // 设置网格的颜色
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            grid: { containLabel: true },
            tooltip: {
              trigger: 'item'
            },
            //设置拐点颜色
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.2
              }
            },
            symbol: 'circle', // 拐点样式
            symbolSize: 6, // 拐点大小
            itemStyle: {
              normal: { areaStyle: { type: 'default' }, color: ['#1FC48D', '3F8FFF'] }
            },
            data: [
              {
                value: [],
                name: '岗位',
                itemStyle: {
                  normal: {
                    color: '#1FC48D',
                    lineStyle: {
                      color: '#1FC48D'
                    }
                  }
                }
              },
              {
                value: [],
                name: '个人',
                itemStyle: {
                  normal: {
                    color: '#3F8FFF',
                    lineStyle: {
                      color: '#3F8FFF'
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      jtzycyxxTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '姓名',
            key: 'khmc',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '身份证号',
            key: 'zjhm',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '从事职业',
            key: 'cszy',
            align: 'center',
            dataIndex: 'cszy_dictText'
          },
          {
            title: '联系电话',
            key: 'lxfs',
            dataIndex: 'lxfs',
            align: 'center'
          },
          {
            title: '与被评价人关系',
            key: 'yhzgx',
            align: 'center',
            dataIndex: 'yhzgx_dictText'
          }

        ]
      },
      hfxxTable: {
        loading: false,
        dataSource: [],
        columns: [

          {
            title: '姓名',
            key: 'khmc',
            align: 'center',
            dataIndex: 'khmc'

          },
          {
            title: '身份证号',
            key: 'zjhm',
            align: 'center',
            dataIndex: 'zjhm'

          },
          {
            title: '回访人',
            key: 'yggh',
            align: 'center',
            dataIndex: 'yggh_dictText'
          },
          {
            title: '回访日期',
            key: 'hfrq',
            align: 'center',
            dataIndex: 'hfrq'
          },

          {
            title: '回访方式',
            key: 'hffs',
            dataIndex: 'hffs_dictText',
            align: 'center'
          },
          {
            title: '回访目的',
            key: 'hfmd',
            dataIndex: 'hfmd_dictText',
            align: 'center'
          },
          {
            title: '回访内容',
            key: 'hfxqsm',
            align: 'center',
            dataIndex: 'hfxqsm'
          }

        ]
      },
      sjxfsjTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '银行名称',
            key: 'yhmc',
            align: 'center',
            dataIndex: 'yhmc'
          },
          {
            title: '银行卡号',
            key: 'yhkh',
            align: 'center',
            dataIndex: 'yhkh'
          },
          {
            title: '卡类别',
            key: 'klb',
            align: 'center',
            dataIndex: 'klb'
          },
          {
            title: '是否本人持卡',
            key: 'sfbrck',
            align: 'center',
            dataIndex: 'sfbrck'
          },

          {
            title: '本人或亲属的签名',
            key: 'brhqsqm',
            dataIndex: 'brhqsqm',
            align: 'center'
          },
          {
            title: '本人或亲属的联系方式',
            key: 'brhqslxfs',
            dataIndex: 'brhqslxfs',
            align: 'center'
          },
          {
            title: '是否发放过待遇',
            key: 'sfffgdy',
            align: 'center',
            dataIndex: 'sfffgdy'
          },
          {
            title: '是否服刑人员',
            key: 'sffxry',
            align: 'center',
            dataIndex: 'sffxry'
          },
          {
            title: '服刑开始时间',
            key: 'fxkssj',
            align: 'center',
            dataIndex: 'fxkssj'
          },
          {
            title: '服刑结束时间',
            key: 'fxjssj',
            align: 'center',
            dataIndex: 'fxjssj'
          }
        ]
      },
      zksjTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '银行名称',
            key: 'yhmc',
            align: 'center',
            dataIndex: 'yhmc'
          },
          {
            title: '银行卡号',
            key: 'yhkh',
            align: 'center',
            dataIndex: 'yhkh'
          },
          {
            title: '卡状态',
            key: 'kzt',
            align: 'center',
            dataIndex: 'kzt'
          },
          {
            title: '医保用卡记录',
            key: 'ybykjl',
            align: 'center',
            dataIndex: 'ybykjl'
          },

          {
            title: '前期排查的疑似风险卡',
            key: 'ysfxk',
            dataIndex: 'ysfxk',
            align: 'center'
          },
          {
            title: '联系电话',
            key: 'lxdh',
            dataIndex: 'lxdh',
            align: 'center'
          },
          {
            title: '联系地址',
            key: 'lxdz',
            align: 'center',
            dataIndex: 'lxdz'
          },
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            dataIndex: 'dw'
          },
          {
            title: '网点名称',
            key: 'wdmc',
            align: 'center',
            dataIndex: 'wdmc'
          },
        ]
      },
      tpjchmdTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '健康状况',
            key: 'jkzk',
            align: 'center',
            dataIndex: 'jkzk'
          },
          {
            title: '劳动技能',
            key: 'ldjn',
            align: 'center',
            dataIndex: 'ldjn'
          },
          {
            title: '致贫原因1',
            key: 'zpyy',
            align: 'center',
            dataIndex: 'zpyy'
          },
          {
            title: '联系电话',
            key: 'lxdh',
            align: 'center',
            dataIndex: 'lxdh'
          },
          {
            title: '户类型',
            key: 'hlx',
            dataIndex: 'hlx',
            align: 'center'
          },
          {
            title: '易返贫致贫户(监测对象)类型',
            key: 'yfpzpflx',
            dataIndex: 'yfpzpflx',
            align: 'center'
          },
          {
            title: '风险是否消除',
            key: 'fxsfxc',
            align: 'center',
            dataIndex: 'fxsfxc'
          },
        ]
      },
      cksjmx: {},
      dksjmx: {},
      nhxx: {},
      hmcxx: {},
      shxx: {},
      khxz: '9'
    }
  },
  created() {
    this.qybm = sessionStorage.getItem('qybm')
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie('leiDaTu')
    })
  },
  methods: {

    add() {
      this.edit({})
    },
    edit(record) {
      console.log(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      console.log(this.model)
      this.visible = true
      //this.confirmLoading=true;
      //先查询页面上4个彩色部分数据 分为存款和贷款
      if(this.qybm == '095') {
        //天易查询全行数据
        this.getCksjmxQh(record.zjhm)
        this.getDksjmxQh(record.zjhm)
        this.getCkqsByZjhmQh(record.zjhm)
        this.getDkqsByZjhmQh(record.zjhm)
      } else {
        this.getCksjmxZh(record.zjhm, record.jgdm)
        this.getDksjmxZh(record.zjhm, record.jgdm)
        this.getCkqsByZjhm(record.zjhm, record.jgdm)
        this.getDkqsByZjhm(record.zjhm, record.jgdm)
      }
      this.getNhxqByZjhm(record.zjhm)
      this.getShxqByZjhm(record.zjhm)
      this.getGlxxByZjhm(record.zjhm)
      this.getHmcxxByZjhm(record.zjhm)
      this.getHfxxByZjhm(record.zjhm)
      this.getWbsj(record.zjhm)

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'khlb', 'jgdm', 'wgbh', 'khmc', 'zjlx', 'zjhm', 'lxfs', 'dz', 'khxz', 'khlx', 'khdj', 'dabh'))
        //时间格式化
      })

    },

    getHfxxByZjhm(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getHfxxByZjhmUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.hfxxTable.dataSource = res.result
        }
        console.log('jtzycyxxTable')
        console.log(this.jtzycyxxTable)

      }).finally(() => {
      })
    },
    getHmcxxByZjhm(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getHmcxxByZjhmUrl, params).then((res) => {
        if (res.success && res.result) {
          if (res.result.records.length > 0) {
            this.hmcxx = res.result.records[0]
          }
        }
      }).finally(() => {
      })
    },
    getGlxxByZjhm(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getGlxxByZjhmUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.jtzycyxxTable.dataSource = res.result
        }
        console.log('jtzycyxxTable')
        console.log(this.jtzycyxxTable)

      }).finally(() => {
      })
    },
    getShxqByZjhm(zjhm) {
      let params = { 'frzjhm': zjhm }
      getAction(this.url.getShxqByZjhmUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          if (res.result.records.length > 0) {
            this.shxx = res.result.records[0]
          }
        }
      }).finally(() => {
      })
    },
    getNhxqByZjhm(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getNhxqByZjhmUrl, params).then((res) => {
        if (res.success && res.result) {
          if (res.result.records.length > 0) {
            this.nhxx = res.result.records[0]
          }
        }
      }).finally(() => {
      })
    },
    getDkqsByZjhm(zjhm, jgdm) {
      let params = { 'zjhm': zjhm, 'jgdm': jgdm }
      getAction(this.url.getDkqsByZjhmUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.visitInfoDk.rows = []
          if (res.result.length > 0) {
            for (let i = 0; i < res.result.length; i++) {
              console.log(res.result[i].tjyf)
              this.visitInfoDk.rows.push({
                '日期': res.result[i].tjyf,
                '贷款余额': res.result[i].dkye,
                '贷款月日平': res.result[i].yrp
              })
            }
          } else {
            this.visitInfoDk = []
          }
        }
      }).finally(() => {
      })
    },
    getDkqsByZjhmQh(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getDkqsByZjhmQhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.visitInfoDk.rows = []
          if (res.result.length > 0) {
            for (let i = 0; i < res.result.length; i++) {
              console.log(res.result[i].tjyf)
              this.visitInfoDk.rows.push({
                '日期': res.result[i].tjyf,
                '贷款余额': res.result[i].dkye,
                '贷款月日平': res.result[i].yrp
              })
            }
          } else {
            this.visitInfoDk = []
          }
        }
      }).finally(() => {
      })
    },
    getCkqsByZjhm(zjhm, jgdm) {
      let params = { 'zjhm': zjhm, 'jgdm': jgdm }
      getAction(this.url.getCkqsByZjhmUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.visitInfoCk.rows = []
          if (res.result.length > 0) {
            for (let i = 0; i < res.result.length; i++) {
              this.visitInfoCk.rows.push({
                '日期': res.result[i].tjyf,
                '存款余额': res.result[i].ye,
                '存款月日平': res.result[i].yrp
              })
            }
          } else {
            this.visitInfoCk.rows = []
          }
        }
      }).finally(() => {
      })
    },
    getCkqsByZjhmQh(zjhm) {
      let params = { 'zjhm': zjhm}
      getAction(this.url.getCkqsByZjhmQhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.visitInfoCk.rows = []
          if (res.result.length > 0) {
            for (let i = 0; i < res.result.length; i++) {
              this.visitInfoCk.rows.push({
                '日期': res.result[i].tjyf,
                '存款余额': res.result[i].ye,
                '存款月日平': res.result[i].yrp
              })
            }
          } else {
            this.visitInfoCk.rows = []
          }
        }
      }).finally(() => {
      })
    },
    getCksjmxZh(zjhm, jgdm) {
      let params = { 'zjhm': zjhm, 'jgdm': jgdm }
      getAction(this.url.getCksjmxZhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.cksjmx = res.result
        }
      }).finally(() => {
      })
    },
    getCksjmxQh(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getCksjmxQhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.cksjmx = res.result
        }
      }).finally(() => {
      })
    },
    getDksjmxZh(zjhm, jgdm) {
      let params = { 'zjhm': zjhm, 'jgdm': jgdm }
      getAction(this.url.getDksjmxZhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.dksjmx = res.result
        }
      }).finally(() => {
      })
    },
    getDksjmxQh(zjhm) {
      let params = { 'zjhm': zjhm }
      getAction(this.url.getDksjmxQhUrl, params).then((res) => {
        console.log(res)
        if (res.success && res.result) {
          this.dksjmx = res.result
        }
      }).finally(() => {
      })
    },
    //获取外部数据
    getWbsj(zjhm){
      this.sjxfsjTable.dataSource = []
      this.zksjTable.dataSource = []
      this.tpjchmdTable.dataSource = []
      let params = {'zjhm': zjhm}
      getAction(this.url.getSjxfsjByZjhmUrl, params).then(res => {
        if (res.success && res.result) {
          this.sjxfsjTable.dataSource = res.result
        }
      })
      getAction(this.url.getZksjByZjhmUrl, params).then(res => {
        if (res.success && res.result) {
          this.zksjTable.dataSource = res.result
        }
      })
      getAction(this.url.getTpjchmdByZjhmUrl, params).then(res => {
        if (res.success && res.result) {
          this.tpjchmdTable.dataSource = res.result
        }
      })
    },

    close() {
      this.cksjmx={};
      this.dksjmx={};
      this.nhxx= {};
      this.hmcxx= {};
      this.shxx={};
      this.sjxfsjTable.dataSource=[];
      this.zksjTable.dataSource=[];
      this.tpjchmdTable.dataSource=[];
      this.jtzycyxxTable.dataSource=[];
      this.hfxxTable.dataSource=[];
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化

          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })


        }
      })
    },
    handleCancel() {
      this.close()
    },
    callback(key) {
      console.log(key)
    },
    drawPie() {
      let charts = this.$echarts.init(document.getElementById('leiDaTu'))
      var option = {
        title: {
          text: '测试结果',
          link: 'https://www.baidu.com',
          target: 'blank',
          textAlign: 'left'
        },
        tooltip: {},//提示层
        legend: {
          data: ['name1']
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff', //字体颜色
              backgroundColor: '#999', //背景色
              borderRadius: 3, //圆角
              padding: [3, 5] //padding
            }
          },
          center: ['50%', '50%'],
          radius: '60%',
          startAngle: 270,
          indicator: [{
            name: '思想道德素质',
            max: 100
          },
            {
              name: '健康与安全',
              max: 100
            },
            {
              name: '与人交往',
              max: 100
            },
            {
              name: '学习与发展',
              max: 100
            },
            {
              name: '艺术与人文',
              max: 100
            }
          ]
        },
        series: [{
          name: '测试标题名字',
          type: 'radar',
          data: [{
            value: [70, 80, 90, 85, 75],
            name: '测试结果'
          }]
        }]
      }
      charts.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.grid {
  width: 50%;
  height: 20px;
  text-align: center
}


.circle-cust {
  position: relative;
  top: 28px;
  left: -100%;
}

.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}


/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    font-size: .95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }

  p {
    line-height: 42px;
    margin: 0;

    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>