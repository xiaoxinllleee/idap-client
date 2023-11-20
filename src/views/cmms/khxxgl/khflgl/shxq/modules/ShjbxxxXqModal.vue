<template>
  <a-modal :title="title"
           :width="1450"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: true} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--客户管理\农户信息管理\新增农户信息-->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-tabs default-active-key="1" animated="animated">
          <!--Tab 1：商户户基本信息\Begin-->
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book" />基本资料</span>
            <a-card class="card" :bordered="false">
              <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">基本信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属网格">
                    <a-input placeholder="所属网格" v-model="dqUser.wgbh_dictText" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                    <j-dict-select-tag placeholder="请输入所属支行" v-model="dqUser.sszh" :triggerChange="true"
                                       dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商铺名称">
                    <a-input placeholder="请输入商铺名称" v-model="dqUser.shmc" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="成立时间">
                    <a-input placeholder="请输入成立时间" v-model="dqUser.clrq" />
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾用名">
                    <a-input placeholder="请输入曾用名" v-model="dqUser.cym" />
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营状态">
                    <j-dict-select-tag placeholder="请选择经营状态" v-model="dqUser.jyzt" :triggerChange="true"
                                       dictCode="jyzt" />
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法定代表人">
                    <a-input placeholder="请输入法定代表人" v-model="dqUser.fddbr" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人证件号码">
                    <a-input placeholder="请输入法人证件号码" v-model="dqUser.frzjhm" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="注册资本">
                    <a-input placeholder="请输入注册资本" v-model="dqUser.zczb" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统一社会信用代码">
                    <a-input placeholder="请输入统一社会信用代码" v-model="dqUser.tyshxydm" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
                    <a-input placeholder="请输入联系方式" v-model="dqUser.lxfs" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更多联系方式">
                    <a-input placeholder="请输入更多联系方式" v-model="dqUser.gdlxfs" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属行业">
                    <a-input placeholder="请输入所属行业" v-model="dqUser.sshy" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="邮箱">
                    <a-input placeholder="请输入邮箱" v-model="dqUser.yxdz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商户类型">
                    <a-input placeholder="请输入商户类型" v-model="dqUser.shlx_dictText" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资产类型">
                    <a-input placeholder="请输入资产类型" v-model="dqUser.zclx" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资产评估价">
                    <a-input placeholder="请输入资产评估价" v-model="dqUser.zcpgj" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总行陪访人">
                    <a-input placeholder="请输入总行陪访人" v-model="dqUser.zhpfr" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象">
                    <a-input placeholder="请输入授信对象" v-model="dqUser.sxdxmc" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营期限（月份）">
                    <a-input placeholder="请输入经营期限（月份）" v-model="dqUser.jyqx" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="陪访人">
                    <a-input placeholder="请输入陪访人" v-model="dqUser.pfr" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商户分类">
                    <a-input placeholder="请选择商户分类" v-model="dqUser.shfl_dictText" />
                  </a-form-item>
                </a-col>
                <a-col :lg="24">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户潜在业务">
                    <a-checkbox-group :value="khqzywList" style="width: 100%;margin-top: 10px;">
                      <a-row>
                        <a-col :span="3">
                          <a-checkbox value="1">存款</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="2">贷款</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="3">手机银行</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="4">网上银行</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="5">ETC等</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="6">信用卡</a-checkbox>
                        </a-col>
                        <a-col :span="3">
                          <a-checkbox value="7">社保卡</a-checkbox>
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-form-item>

                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业地址">
                    <a-input placeholder="请输入企业地址" v-model="dqUser.dz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务跟踪人">
                    <a-input placeholder="请输入服务跟踪人" v-model="dqUser.fwgzr" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营范围">
                    <a-input :rows="3" type="textarea" placeholder="请输入经营范围" v-model="dqUser.jyfw" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                    <a-input :rows="3" type="textarea" placeholder="请输入备注" v-model="dqUser.bz" />
                  </a-form-item>
                </a-col>

              </a-row>


            </a-card>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book" />家庭相关情况</span>
            <a-divider orientation="left" style="color: #1890FF;">关系人信息</a-divider>
            <a-card>
              <form>
                <a-table bordered
                         :columns="columns_glrxx"
                         :dataSource="glrxxList"
                         :loading="loading"
                         :pagination="false"
                />
              </form>
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">法人家庭信息</a-divider>
            <a-card>
              <a-table bordered
                       :columns="columns_jtqk"
                       :dataSource="frjtxxList"
                       :loading="loading"
                       :pagination="false"
              >
                  <span slot="detail" slot-scope="khmc,record"><a @click="handlepjsxjdmxEdit(record)">{{ khmc }}</a>
              </span>
              </a-table>

            </a-card>
          </a-tab-pane>
          <!--          <a-tab-pane key="2">
                      <span slot="tab"><a-icon type="book" />对公业务信息</span>
                      <a-divider orientation="left" style="color: #1890FF;">存款信息</a-divider>
                      <a-card>
                        <form>
                          <a-table bordered
                                   :columns="columns_glrxx"
                                   :dataSource="glrxxList"
                                   :loading="loading"
                                   :pagination="false"
                          />
                        </form>
                      </a-card>

                      <a-divider orientation="left" style="color: #1890FF;">贷款信息</a-divider>
                      <a-card>
                        <form>
                          <a-table bordered
                                   :columns="columns_jtqk"
                                   :dataSource="frjtxxList"
                                   :loading="loading"
                                   :pagination="false"
                          />
                        </form>
                      </a-card>
                    </a-tab-pane>-->

          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book" />对公业务信息</span>
            <a-card class="card" :bordered="false">

              <a-divider orientation="left" style="color: #1890FF;">存款信息</a-divider>
              <a-table bordered
                       :columns="ckxxColunms"
                       :dataSource="dgywxxInfo.ywhywwlxxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">贷款信息</a-divider>
              <a-table bordered
                       :columns="dkxxColunms"
                       :dataSource="dgywxxInfo.ywhywwlxxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">贷款数据明细</a-divider>
              <a-table bordered
                       :columns="dksjmxColunms"
                       :dataSource="dgywxxInfo.dksjmxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">手机银行信息</a-divider>
              <a-table bordered
                       :columns="sjyhColunms"
                       :dataSource="dgywxxInfo.sjyhList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">福祥E支付</a-divider>
              <a-table bordered
                       :columns="fxezfcolum"
                       :dataSource="dgywxxInfo.fxezhList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">信用卡信息</a-divider>
              <a-table bordered
                       :columns="xykcolunms"
                       :dataSource="dgywxxInfo.xykList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">现金流归行检测</a-divider>
              <a-table bordered
                       :columns="xjlghjccolum"
                       :dataSource="dgywxxInfo.xjlghjcList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="book" />评级授信</span>
            <a-divider orientation="left" style="color: #1890FF;">房产情况</a-divider>
            <a-table bordered
                     :columns="fcqkColumns"
                     :dataSource="fcxxList"
                     rowKey="id"
                     :pagination="false"
                     :loading="loading"
            />
            <a-divider orientation="left" style="color: #1890FF;">资产情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="camsZcsxNhpjsxxxPads.shzcxx"
                       :columns="Cams_Zcsx_NhzcqkTable.columns" />
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">负债情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="camsZcsxNhpjsxxxPads.shfzxx"
                       :columns="Cams_Zcsx_NhfzqkTable.columns" />
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">总评打分</a-divider>
            <a-card class="card" :bordered="true">

              <a-row class="form-row" :gutter="8">
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="谈话综合素质">
                    <j-dict-select-tag placeholder="请选择谈话综合素质" v-model="camsZcsxNhpjsxxxPads.thzhsz"
                                       :triggerChange="true"
                                       dictCode="shgl_thzhsz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当前经营项目从业时间">
                    <j-dict-select-tag placeholder="请选择当前经营项目从业时间" v-model="camsZcsxNhpjsxxxPads.dqjyxmcysj"
                                       :triggerChange="true"
                                       dictCode="shgl_dqjyxmcysj" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营证照齐全、合法性">
                    <j-dict-select-tag placeholder="请选择经营证照齐全、合法性" v-model="camsZcsxNhpjsxxxPads.jyzjqqhfx"
                                       :triggerChange="true"
                                       dictCode="shgl_jyzzqqhfx" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="银行贷款情况">
                    <j-dict-select-tag placeholder="请选择银行贷款情况" v-model="camsZcsxNhpjsxxxPads.yhdkqk"
                                       :triggerChange="true"
                                       dictCode="shgl_yhdkqk" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="银行利息偿还记录">
                    <j-dict-select-tag placeholder="请选择银行利息偿还记录" v-model="camsZcsxNhpjsxxxPads.yhlxchjl"
                                       :triggerChange="true"
                                       dictCode="shgl_yhlxchjl" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营创收能力">
                    <j-dict-select-tag placeholder="请选择经营创收能力" v-model="camsZcsxNhpjsxxxPads.jycsnl"
                                       :triggerChange="true"
                                       dictCode="shgl_jycsnl" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资产负债率">
                    <j-dict-select-tag placeholder="请选择资产负债率" v-model="camsZcsxNhpjsxxxPads.zcfzl" :triggerChange="true"
                                       dictCode="shgl_zcfzl" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="自有资金占比">
                    <j-dict-select-tag placeholder="请选择自有资金占比" v-model="camsZcsxNhpjsxxxPads.zyzjzb"
                                       :triggerChange="true"
                                       dictCode="shgl_zyzjzb" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年收入增长率">
                    <j-dict-select-tag placeholder="请选择年收入增长率" v-model="camsZcsxNhpjsxxxPads.nsrzzl"
                                       :triggerChange="true"
                                       dictCode="shgl_nsrzzl" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="国家产业政策">
                    <j-dict-select-tag placeholder="请选择国家产业政策" v-model="camsZcsxNhpjsxxxPads.gjcyzc"
                                       :triggerChange="true"
                                       dictCode="shgl_gjcyzc" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对客户依赖度">
                    <j-dict-select-tag placeholder="请选择对客户依赖度" v-model="camsZcsxNhpjsxxxPads.dkhyld"
                                       :triggerChange="true"
                                       dictCode="shgl_dkhyld" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对供应商依赖度">
                    <j-dict-select-tag placeholder="请选择对供应商依赖度" v-model="camsZcsxNhpjsxxxPads.dgysyld"
                                       :triggerChange="true"
                                       dictCode="shgl_dgysyld" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合竞争势力">
                    <j-dict-select-tag placeholder="请选择综合竞争势力" v-model="camsZcsxNhpjsxxxPads.zhjzsl"
                                       :triggerChange="true"
                                       dictCode="shgl_zhjzsl" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与信用社往来时间">
                    <j-dict-select-tag placeholder="请选择与信用社往来时间" v-model="camsZcsxNhpjsxxxPads.yxyswlsj"
                                       :triggerChange="true"
                                       dictCode="shgl_yxyswlsj" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="人身保险">
                    <j-dict-select-tag placeholder="请选择人身保险" v-model="camsZcsxNhpjsxxxPads.rsbx" :triggerChange="true"
                                       dictCode="ywbz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="财产保险">
                    <j-dict-select-tag placeholder="请选择财产保险" v-model="camsZcsxNhpjsxxxPads.ccbx" :triggerChange="true"
                                       dictCode="ywbz" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
                    <a-input v-model="camsZcsxNhpjsxxxPads.zpdfxj" disabled></a-input>
                  </a-form-item>
                </a-col>
                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭总资产">-->
                <!--                    <a-input v-model="camsZcsxNhpjsxxxPads.jtzzc" disabled> </a-input>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->
                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负债">-->
                <!--                    <a-input v-model="camsZcsxNhpjsxxxPads.fz" disabled> </a-input>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->
              </a-row>

            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">评级授信</a-divider>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="16">
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算等级">
                    <a-input v-model="camsZcsxNhpjsxxxPads.xtcspddj" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.xtcssxed" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="等级调整事项">
                    <a-input v-model="camsZcsxNhpjsxxxPads.djtzsx" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调整后等级">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.tzhdj" dictCode="tzhdj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理评定等级">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.khjlpddj" dictCode="tzhdj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.khjlsxed" />
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终评定等级">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.zzpddj" dictCode="tzhdj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.zzsxed" />
                  </a-form-item>
                </a-col>

                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                    <a-input style="width: 640px" type="textarea" v-model="camsZcsxNhpjsxxxPads.bz" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="8" forceRender>
            <span slot="tab"><a-icon type="book" />附件管理</span>
            <!--新化 展示照片预览图 方便客户抽检 -->
            <a-form layout="vertical" v-if="qybm == '320'">
              <a-row :gutter="12">
                <a-col :lg="8">
                  <a-form-item
                    label="入户照片">
                    <j-image-upload text="上传" :imageType="1" isMultiple v-model="RhzppicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="商铺照片">
                    <j-image-upload text="上传" :imageType="2" isMultiple v-model="SpzppicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="与客户合影">
                    <j-image-upload text="上传" :imageType="3" isMultiple v-model="YkhhypicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="12">
                <a-col :lg="8">
                  <a-form-item
                    label="室内照片">
                    <j-image-upload text="上传" :imageType="4" isMultiple v-model="SnzppicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="营业执照">
                    <j-image-upload text="上传" :imageType="5" isMultiple v-model="YyzzpicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="特种行业经营许可证明">
                    <j-image-upload text="上传" :imageType="6" isMultiple v-model="TzhyjyxkzmpicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="12">
                <a-col :lg="8">
                  <a-form-item
                    label="经营项目">
                    <j-image-upload text="上传" :imageType="7" isMultiple v-model="JyxmpicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="经营场地租赁合同">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="JycdzlhtpicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="其他附件">
                    <j-image-upload text="上传" :imageType="9" isMultiple v-model="QtfjpicList" class="shfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>

            <!--            <a-button type="primary" @click="fjxz(1)">-->
            <!--              个人附件下载-->
            <!--            </a-button>-->
            <!--            {{ fgf }}{{ fgf }}-->
            <!--            <a-button type="primary" @click="fjxz(2)">-->
            <!--              家庭附件下载-->
            <!--            </a-button>-->

            <a-divider orientation="left" style="color: #1890FF;">附件信息</a-divider>
            <a-table bordered
                     :columns="columns_fjgl"
                     :dataSource="fjxxList"
                     rowKey="id"
                     :pagination="false"
                     :loading="loading"
            >
                         <span slot="action" slot-scope="text,record">
                          <a @click="ylFj(record)">预览</a>{{ fgf }}
                          <a @click="xzFj(record)">下载</a>
                          </span>
            </a-table>

          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
    <fj-modal ref="fjModal"></fj-modal>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />

  </a-modal>
</template>

<script>
import { httpAction, putAction, getAction } from '@/api/manage'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import JUploadOne from '@/components/jeecg/JUploadOne'
import photoView from '@views/khgl/nh_old/modules/photoView'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JMultiSelectTag from '@comp/dict/JMultiSelectTag'
import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
import JDictRadioTag from '@comp/dict/JDictRadioTag'
import FjModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/FjModal'
import { provinceAndCityData } from 'element-china-area-data'
import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'
import JImageUpload from '@/components/jeecg/JImageUpload'
import store from '@/store/'

export default {
  name: 'NhjbxxModal',
  components: {
    JDictRadioTag,
    AFormItem,
    JUploadOne,
    photoView,
    JMultiSelectTag,
    JSelectYgxx,
    FjModal,NhjbxxxXqModal, JImageUpload
  },
  mixins: [JeecgListMixin],
  data () {
    return {
      khqzywList:[],
      areaOptions: provinceAndCityData,
      title: '操作',
      visible: false,
      urlDownload: window._CONFIG['staticDomainURL'],
      model: { sskhjl: ' ' },
      zkhjlacct: '',
      fgf: ' ',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      disableSubmit: true,
      confirmLoading: false,
      animated: true,
      form: this.$form.createForm(this),
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],

      //业务信息-存款信息
      ckxxColunms: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'shmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '存款累计(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'ckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'ckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'cknrpye'
            }
          ]
        },
        {
          title: '活期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'hqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'hqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'hqcknrpye'
            }
          ]
        },
        {
          title: '定期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'dqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'dqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'dqcknrpye'
            }
          ]
        }

      ],
      //贷款信息
      dkxxColunms: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'shmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'dkje'
        },
        {
          title: '贷款余额',
          align: 'center',
          dataIndex: 'dkye'
        },
        {
          title: '最近贷款到期日期',
          align: 'center',
          dataIndex: 'zjdkdqrq'
        },
        {
          title: '不良贷款余额',
          align: 'center',
          dataIndex: 'bldkye'
        },
        {
          title: '表外不良贷款余额',
          align: 'center',
          dataIndex: 'bwbldkye'
        }
      ],
      //贷款数据明细
      dksjmxColunms: [
        { title: '贷款账号', dataIndex: 'dkzh' },
        { title: '便民卡卡号', dataIndex: 'bmkkh' },
        { title: '贷款金额', dataIndex: 'dkje' },
        { title: '贷款余额', dataIndex: 'dkye' },
        { title: '贷款形态', dataIndex: 'dkxt' },
        { title: '贷款利率', dataIndex: 'dkll' },
        { title: '担保方式', dataIndex: 'dbfs' },
        { title: '第一责任人', dataIndex: 'dyzrr' },
        { title: '主客户经理', dataIndex: 'khjlbz' },
        { title: '贷款品种', dataIndex: 'dkpz' },
        { title: '借款日期', dataIndex: 'jkrq' },
        { title: '贷款日期', dataIndex: 'dqrq' },
        { title: '剩余天数', dataIndex: 'syts' },
        { title: '欠息天数', dataIndex: 'qxts' },
        { title: '表内外欠息和', dataIndex: 'bnwqxh' }
      ],
      //手机银行
      sjyhColunms: [
        { title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '开户日期', dataIndex: 'openDate' },
        { title: '开户类型', dataIndex: 'openType' },
        { title: '销户姓名', dataIndex: 'cancelGyh' },
        { title: '状态', dataIndex: 'status' },
        { title: '本月交易金额', dataIndex: 'jyjeBy' },
        { title: '本月交易笔数', dataIndex: 'jybsBy' },
        { title: '本年交易金额', dataIndex: 'jyjeBn' },
        { title: '本年交易笔数', dataIndex: 'jybsBn' },
        { title: '历史交易金额', dataIndex: 'jyjeLs' },
        { title: '历史交易笔数', dataIndex: 'jybsLs' }
      ],
      //ETC
      etcColunms: [{ title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '操作网点', dataIndex: 'operJgdm' },
        { title: '绑定时间', dataIndex: 'workDate' },
        { title: '操作人员', dataIndex: 'operYggh' },
        { title: '账户类型', dataIndex: 'zhlx' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '账号', dataIndex: 'zh' },
        { title: '车牌号码', dataIndex: 'cphm' },
        { title: '状态', dataIndex: 'status' },
        { title: '预解绑日期', dataIndex: 'yjbrq' }],
      //信用卡
      xykcolunms: [
        { title: '客户名称', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '联系电话', dataIndex: 'lxdh' },
        { title: '卡品种', dataIndex: 'kpz' },
        { title: '发卡日期', dataIndex: 'fkrq' },
        { title: '卡号', dataIndex: 'kh' },
        { title: '信用额度', dataIndex: 'xyed' },
        { title: '推广人员', dataIndex: 'tgry' }
      ],
      fxezfcolum: [
        { title: '商户名称', dataIndex: 'shmc' },
        { title: '商户类型', dataIndex: 'shlx' },
        { title: '法人代表姓名', dataIndex: 'frdbxx' },
        { title: '法人代表证件号', dataIndex: 'drzjhm' },
        { title: '商户联系电话', dataIndex: 'shlxdh' },
        { title: '营业地区', dataIndex: 'yydq' },
        { title: '商户入网状态', dataIndex: 'ssrwzt' },
        { title: '交易状态', dataIndex: 'jyzt' },
        { title: '渠道', dataIndex: 'qd' },
        { title: '商户所属支行', dataIndex: 'shsszh' },
        { title: '客户经理姓名', dataIndex: 'khjlxm' }
      ],
      xjlghjccolum: [
        { title: '时间起', dataIndex: 'ksrq' },
        { title: '时间止', dataIndex: 'jsrq' },
        { title: '客户名称', dataIndex: 'khxm' },
        { title: '证件号码', dataIndex: 'identNo' },
        { title: '现金流入', dataIndex: 'xjlr' },
        { title: '现金流出', dataIndex: 'xjlc' },
        { title: '总现金流', dataIndex: 'zxjl' },
        { title: '净现金流', dataIndex: 'jxjl' }
      ],

      // 房产情况
      fcqkColumns: [
        {
          title: '房产位置',
          dataIndex: 'fcwz',
          key: 'fcwz',
          width: '20%',
          align: 'center',
          scopedSlots: { customRender: 'fcwz' }
        },
        {
          title: '房产性质',
          dataIndex: 'fcxz',
          key: 'fcxz',
          width: '15%',
          align: 'center',
          scopedSlots: { customRender: 'fcxz' }
        },
        {
          title: '房产面积(平米)',
          dataIndex: 'fcmj',
          key: 'fcmj',
          width: '15%',
          align: 'center',
          scopedSlots: { customRender: 'fcmj' }
        },
        {
          title: '单价(元)',
          dataIndex: 'fcdj',
          key: 'fcdj',
          width: '15%',
          align: 'center',
          scopedSlots: { customRender: 'fcdj' }
        },
        {
          title: '房产价值',
          dataIndex: 'fcjz',
          key: 'fcjz',
          width: '15%',
          align: 'center',
          scopedSlots: { customRender: 'fcjz' }
        },
        {
          title: '备注',
          dataIndex: 'bz',
          key: 'bz',
          width: '15%',
          align: 'center',
          scopedSlots: { customRender: 'bz' }
        }
        // {
        //   title: '户号编码',
        //   dataIndex: 'hhbm',
        //   key: 'hhbm',
        //   width: '10%',
        //   align: "center",
        //   scopedSlots: {customRender: 'hhbm'}
        // },
        // {
        //   title: '客户名称',
        //   dataIndex: 'khmc',
        //   key: 'khmc',
        //   width: '10%',
        //   align: "center",
        //   scopedSlots: {customRender: 'khmc'}
        // },
        // {
        //   title: '证件号码',
        //   dataIndex: 'zjhm',
        //   key: 'zjhm',
        //   width: '20%',
        //   align: "center",
        //   scopedSlots: {customRender: 'zjhm'}
        // },
      ],
      Cams_Zcsx_NhfxxxTable: {
        columns: [
          {
            title: '房产位置',
            dataIndex: 'fcwz',
            key: 'fcwz',
            width: '20%',
            align: 'center',
            scopedSlots: { customRender: 'fcwz' }
          },
          {
            title: '房产性质',
            dataIndex: 'fcxz',
            key: 'fcxz',
            width: '15%',
            align: 'center',
            scopedSlots: { customRender: 'fcxz' }
          },
          {
            title: '房产面积(平米)',
            dataIndex: 'fcmj',
            key: 'fcmj',
            width: '15%',
            align: 'center',
            scopedSlots: { customRender: 'fcmj' }
          },
          {
            title: '单价(元)',
            dataIndex: 'fcdj',
            key: 'fcdj',
            width: '15%',
            align: 'center',
            scopedSlots: { customRender: 'fcdj' }
          },
          {
            title: '房产价值',
            dataIndex: 'fcjz',
            key: 'fcjz',
            width: '15%',
            align: 'center',
            scopedSlots: { customRender: 'fcjz' }
          },
          {
            title: '备注',
            dataIndex: 'bz',
            key: 'bz',
            width: '15%',
            align: 'center',
            scopedSlots: { customRender: 'bz' }
          }
          // {
          //   title: '户号编码',
          //   dataIndex: 'hhbm',
          //   key: 'hhbm',
          //   width: '10%',
          //   align: "center",
          //   scopedSlots: {customRender: 'hhbm'}
          // },
          // {
          //   title: '客户名称',
          //   dataIndex: 'khmc',
          //   key: 'khmc',
          //   width: '10%',
          //   align: "center",
          //   scopedSlots: {customRender: 'khmc'}
          // },
          // {
          //   title: '证件号码',
          //   dataIndex: 'zjhm',
          //   key: 'zjhm',
          //   width: '20%',
          //   align: "center",
          //   scopedSlots: {customRender: 'zjhm'}
          // },
        ]
      },
      // 资产情况
      zcqkColumns: [
        {
          title: '资产类型',
          dataIndex: 'zclx',
          key: 'zclx',
          width: '25%',
          align: 'center',
          scopedSlots: { customRender: 'zclx' }
        },
        {
          title: '资产数量',
          dataIndex: 'zcsl',
          key: 'zcsl',
          width: '25%',
          align: 'center',
          scopedSlots: { customRender: 'zcsl' }
        },
        {
          title: '资产价格(元)',
          dataIndex: 'zcjg',
          key: 'zcjg',
          width: '25%',
          align: 'center',
          scopedSlots: { customRender: 'zcjg' }
        },
        {
          title: '资产说明',
          dataIndex: 'zcsm',
          key: 'zcsm',
          width: '25%',
          align: 'center',
          scopedSlots: { customRender: 'zcsm' }
        }
      ],
      Cams_Zcsx_NhzcqkTable: {
        columns: [
          {
            title: '资产类型',
            dataIndex: 'zclx',
            key: 'zclx',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'zclx' }
          },
          {
            title: '资产说明',
            dataIndex: 'zcsm',
            key: 'zcsm',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'zcsm' }
          },
          {
            title: '资产数量',
            dataIndex: 'zcsl',
            key: 'zcsl',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'zcsl' }
          },
          {
            title: '资产价格(元)',
            dataIndex: 'zcjz',
            key: 'zcjz',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'zcjz' }
          }
        ]
      },
      // 负债情况
      Cams_Zcsx_NhfzqkTable: {
        columns: [
          {
            title: '借款方式',
            dataIndex: 'jkfs',
            key: 'jkfs',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'jkfs' }
          },
          {
            title: '债权人',
            dataIndex: 'zqr',
            key: 'zqr',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'zqr' }
          },
          {
            title: '借款说明',
            dataIndex: 'jksm',
            key: 'jksm',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'jksm' }
          },
          {
            title: '借款金额(元)',
            dataIndex: 'jkje',
            key: 'jkje',
            width: '25%',
            align: 'center',
            scopedSlots: { customRender: 'jkje' }
          }
        ]
      },
      // 经营情况
      Cams_Zcsx_NhjyqkTable: {
        columns: [
          {
            title: '项目类型',
            dataIndex: 'xmlx',
            align: 'center'
          },
          {
            title: '项目情况',
            dataIndex: 'xmqk',
            align: 'center'
          },
          {
            title: '项目年收入(元)',
            dataIndex: 'xmnsr',
            align: 'center'
          },
          {
            title: '项目年支出(元)',
            dataIndex: 'xmnzc',
            align: 'center'
          },
          {
            title: '项目净收入(元)',
            align: 'center',
            scopedSlots: { customRender: 'jsr' }
          }
        ]
      },
      //家庭情况
      columns_jtqk: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'xb'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'nl'
        },
        {
          title: '电话',
          dataIndex: 'lxfs',
          align: 'center'
        },
        {
          title: '与户主关系',
          dataIndex: 'yhzgx',
          align: 'center'
        },
        {
          title: '存款余额',
          dataIndex: 'ckye',
          align: 'center'
        },
        {
          title: '存款日均',
          dataIndex: 'ckrpye',
          align: 'center'
        }, {
          title: '贷款余额',
          dataIndex: 'dkye',
          align: 'center'
        }
      ],
      columns_glrxx: [
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'xb_dictText'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'nl'
        },
        {
          title: '电话',
          dataIndex: 'lxfs',
          align: 'center'
        },
        {
          title: '职业',
          dataIndex: 'cszy',
          align: 'center'
        }
        ,
        {
          title: '关系描述',
          dataIndex: 'gxms',
          align: 'center'
        }
        ,
        {
          title: '婚姻状况',
          dataIndex: 'hyzk_dictText',
          align: 'center'
        }
        ,
        {
          title: '工作单位',
          dataIndex: 'gzdw',
          align: 'center'
        }
        ,
        {
          title: '常住或经营地址',
          dataIndex: 'czhjydz',
          align: 'center'
        }
        ,
        {
          title: '存款余额',
          dataIndex: 'ckye',
          align: 'center'
        }
        ,
        {
          title: '贷款余额',
          dataIndex: 'dkye',
          align: 'center'
        }
      ],
      //附件管理
      columns_fjgl: [
        {
          title: '资料编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '资料类型',
          dataIndex: 'zllx_dictText',
          key: 'zllx_dictText'
        },
        {
          title: '资料名称',
          dataIndex: 'zlmc',
          key: 'zlmc'
        },
        {
          title: '附件备注',
          dataIndex: 'bz',
          key: 'bz'
        },
        {
          title: '上传人',
          dataIndex: 'lrr',
          key: 'lrr'
        },
        {
          title: '上传时间',
          dataIndex: 'lrsj',
          key: 'lrsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns_bkb: [
        {
          title: '评议类型',
          dataIndex: 'pylx'
        },
        {
          title: '资料类型',
          dataIndex: 'zllx'
        },
        {
          title: '资料名称',
          dataIndex: 'zlmc'
        },
        {
          title: '附件备注',
          dataIndex: 'bz'
        },
        {
          title: '上传人',
          dataIndex: 'createBy'
        },
        {
          title: '上传时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],

      //个人相关信息
      userAllInfo: {},
      dqUser: {},
      khglNhhzxxgl: {},
      camsZcsxNhpjsxxxPads: {},
      wgqds: [],
      glrxxList: [],
      frjtxxList: [],
      dgywxxInfo: {},
      fjxxList: [],
      qybm: '',
      RhzppicList: [],
      SpzppicList: [],
      YkhhypicList: [],
      SnzppicList: [],
      YyzzpicList: [],
      TzhyjyxkzmpicList: [],
      JyxmpicList: [],
      JycdzlhtpicList: [],
      QtfjpicList: [],

      fcxxList: [],
      url: {
        add: '/nh/nhjbxx/add',
        edit: '/nh/nhjbxx/edit',
        list: '/nh/nhjbxx/list',
        NhfcqkList: '/nh/nhjbxx/queryCams_Zcsx_NhfxxxByMainId',
        Cams_Zcsx_Nhzcxx: {
          list: '/nh/nhjbxx/queryCams_Zcsx_NhzcxxByMainId',
          fzqklist: '/nh/nhjbxx/queryCams_Zcsx_NhfzqkByMainId',
          jyqklist: '/khglNhhzxxgl/khglNhhzxxgl/queryPjsxJyqkTable',
          pjxxlist: '/nh/nhjbxx/queryCams_Zcsx_NhpjxxByMainId'

        }
      }
    }
  },
  created () {
    this.qybm = store.getters.qybm
  },
  mounted () {

  },
  methods: {
    fjxz (val) {

      console.log(' ==============> fjxz')
      console.log(this.userAllInfo.fjgls)
      console.log(this.userAllInfo.pyfjxxes)
      console.log(this.userAllInfo.khglNhhzzllbs)

      if (val == '1') {
        if (this.userAllInfo.fjgls == null && this.userAllInfo.pyfjxxes == null) {
          this.$message.warning('不存在个人附件信息')
          return
        }
      } else if (val == '2') {
        if (this.userAllInfo.khglNhhzzllbs == null) {
          this.$message.warning('不存在家庭附件信息')
        }
      }

      let params = {
        'val': val,
        'zjhm': this.dqUser.zjhm,
        'hhbm': this.dqUser.hhbm
      }
      getAction('/khflgl/nhxq/downloadFj', params).then((res) => {
        if (res.success) {
          window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
        }
      })
    },

    ylFj (record) {
      this.$refs.fjModal.view(record)
    },
    xzFj (record) {
      window.location.href = `${window._CONFIG['staticDomainURL']}/` + record.fwlj
    },

    viewBkbpy (record) {
      console.log('viewBkbpy')
      console.log(record)
      console.log(record.sfljqk)

      //不予授信情况 和 不了解情况
      if (record.pylx == '0' || record.sfljqk == '否') {
        this.$refs.bysxqkModal.view(record)
      } else if (record.pylx == '9') {
        this.$refs.jcxxpyModal.view(record)
      } else if (record.pylx == '6') {
        this.$refs.jydzpyModal.view(record)
      } else if (record.pylx == '5') {
        this.$refs.dzpyModal.view(record)
      } else {
        this.$refs.qtpyModal.view(record)
      }
    },
    querygxrxx (val) {
      getAction('/khgl/shxxgl/querygxrxx', { id: val }).then(res => {
        if (res.success) {
          this.glrxxList = res.result.glrxxList
          this.frjtxxList = res.result.nhJtcyxx
        }
      })
    },
    queryDgywxx (val) {
      getAction('/khgl/shxxgl/queryDgywxx', { id: val }).then(res => {
        if (res.success) {
          this.dgywxxInfo = res.result
        }
      })
    },
    ///khgl/shxxgl/queryFcxxByShid
    queryPjsxxxByShid (val) {
      getAction('/khgl/shxxgl/queryPjsxxxByShid', { shid: val }).then(res => {
        if (res.success && res.result!=null) {
          this.camsZcsxNhpjsxxxPads = res.result
        }
      })
    },
    queryFcxxByShid (val) {
      getAction('/khgl/shxxgl/queryFcxxByShid', { shid: val }).then(res => {
        if (res.success) {
          this.fcxxList = res.result
        }
      })
    },
    ///khgl/shzlgl/queryFjxxByShid
    queryFjxxByShid (val) {
      getAction('/khgl/shzlgl/queryFjxxByShid', { shid: val }).then(res => {
        if (res.success && res.result) {
          this.fjxxList = res.result
          for (let i = 0; i < res.result.length; i++) {
            let fjxx = res.result[i]
            if (fjxx.zllx == 1) {
              this.RhzppicList.push(fjxx)
            } else if (fjxx.zllx == 2) {
              this.SpzppicList.push(fjxx)
            } else if (fjxx.zllx == 3) {
              this.YkhhypicList.push(fjxx)
            } else if (fjxx.zllx == 4) {
              this.SnzppicList.push(fjxx)
            } else if (fjxx.zllx == 5) {
              this.YyzzpicList.push(fjxx)
            } else if (fjxx.zllx == 6) {
              this.TzhyjyxkzmpicList.push(fjxx)
            } else if (fjxx.zllx == 7) {
              this.JyxmpicList.push(fjxx)
            } else if (fjxx.zllx == 8) {
              this.JycdzlhtpicList.push(fjxx)
            } else if (fjxx.zllx == 9) {
              this.QtfjpicList.push(fjxx)
            }
          }
          console.log('this.RhzppicList', this.RhzppicList)
        } else {
          this.RhzppicList = []
          this.SpzppicList = []
          this.YkhhypicList = []
          this.SnzppicList = []
          this.YyzzpicList = []
          this.TzhyjyxkzmpicList = []
          this.JyxmpicList = []
          this.JycdzlhtpicList = []
          this.QtfjpicList = []
        }
      })
    },
    handlepjsxjdmxEdit(record){
      this.$refs.NhjbxxxXqModal.edit(record);
      this.$refs.NhjbxxxXqModal.title = "详情";
      this.$refs.NhjbxxxXqModal.disableSubmit = true;
    },
    add () {
      this.edit({})
    },
    edit (record) {
      console.log('record====>')
      console.log(record)

      this.dqUser = record
      if (this.dqUser.khqzyw){
        this.khqzywList=this.dqUser.khqzyw.split(",");
      }
      this.querygxrxx(record.id)
      this.queryDgywxx(record.id)
      this.queryPjsxxxByShid(record.id)
      this.queryFcxxByShid(record.id)
      this.queryFjxxByShid(record.id)
      this.visible = true
    },
    close () {
      this.$emit('close')
      this.RhzppicList = []
      this.SpzppicList = []
      this.YkhhypicList = []
      this.SnzppicList = []
      this.YyzzpicList = []
      this.TzhyjyxkzmpicList = []
      this.JyxmpicList = []
      this.JycdzlhtpicList = []
      this.QtfjpicList = []
      this.visible = false
    },
    handleOk () {
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
          formData.lrsj = formData.lrsj ? formData.lrsj.format() : null
          formData.zjqfrq = formData.zjqfrq ? formData.zjqfrq.format() : null
          formData.zjdqrq = formData.zjdqrq ? formData.zjdqrq.format() : null
          formData.fxsj = formData.fxsj ? formData.fxsj.format() : null

          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$messkhmc.success(res.messkhmc)
              that.$emit('ok')
            } else {
              that.$messkhmc.warning(res.messkhmc)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })
        }
      })
    },
    handleCancel () {
      console.log('handleCancel')
      this.userAllInfo = {}
      this.close()
    },
    GetValueZkhjl (value) {
      this.model.sskhjl = value.yggh
      this.zkhjlacct = value.ygxm
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 5px;
  }

  /deep/ .shfjUploadClass .ant-upload-list-picture-card-container {
    width: 204px;
    height: 204px;
  }
  /deep/ .shfjUploadClass .ant-upload-list-picture-card .ant-upload-list-item{
    width: 204px;
    height: 204px;
  }
  /deep/ .shfjUploadClass .ant-upload.ant-upload-select-picture-card {
    display: none !important;
  }
</style>