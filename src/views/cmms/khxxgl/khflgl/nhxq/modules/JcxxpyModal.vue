<template>
  <a-modal :title='title'
           :width='1450'
           :visible='visible'
           :confirmLoading='confirmLoading'
           :okButtonProps='{ props: {disabled: true} }'
           :destroyOnClose='true'
           @ok='handleCancel'
           @cancel='handleCancel'
           cancelText='关闭'>

    <!--客户管理\农户信息管理\新增农户信息-->
    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>
        <a-card class='card' :bordered='false'>
          <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>基本信息</a-divider>
          <a-row class='form-row' :gutter='16'>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='户号编码'>
                <a-input v-model='model.hhbm' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='客户名称'>
                <a-input v-model='model.khmc' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='证件号码'>
                <a-input v-model='model.zjhm' />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>评议详情</a-divider>
          <a-row class='form-row' :gutter='16'
                 v-if="qybm=='310' || qybm=='150' || qybm == '100' || qybm == '375' || qybm == '320'">
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='家庭存款日平合计'>
                <a-input v-model='jtckrphjShow' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='健康状况'>
                <a-select v-model='model.jkztqk'>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>很好</a-select-option>
                  <a-select-option value='2'>较好</a-select-option>
                  <a-select-option value='3'>一般</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='家庭收入'>
                <a-select v-model='model.jtsr' v-if="qybm == '320'">
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>1-5万（含）</a-select-option>
                  <a-select-option value='2'>5-10万（含）</a-select-option>
                  <a-select-option value='3'>10-20万（含）</a-select-option>
                  <a-select-option value='4'>20万以上</a-select-option>
                </a-select>
                <a-select v-model='model.jtsr' v-else>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>1-5万（含）</a-select-option>
                  <a-select-option value='2'>5-10万（含）</a-select-option>
                  <a-select-option value='3'>10万以上</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='房屋价值'>
                <a-select v-model='model.fwjzqk' v-if="qybm == '320'">
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>20万元以下</a-select-option>
                  <a-select-option value='2'>20万-60万元</a-select-option>
                  <a-select-option value='3'>60万-100万元</a-select-option>
                  <a-select-option value='4'>100万-150万元</a-select-option>
                  <a-select-option value='5'>150万元以上</a-select-option>
                </a-select>
                <a-select v-model='model.fwjzqk' v-else>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>10万元以下</a-select-option>
                  <a-select-option value='2'>10万-50万元</a-select-option>
                  <a-select-option value='3'>50万元以上</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='有无车辆'>
                <a-select v-model='model.ywcl' v-if="qybm == '320'">
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>30万以上</a-select-option>
                  <a-select-option value='2'>10万-30万元</a-select-option>
                  <a-select-option value='3'>10万以下</a-select-option>
                  <a-select-option value='4'>无</a-select-option>
                </a-select>
                <a-select v-model='model.ywcl' v-else>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>有</a-select-option>
                  <a-select-option value='2'>无</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='客户信誉度'>
                <a-select v-model='model.xyzk'>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>很好</a-select-option>
                  <a-select-option value='2'>较好</a-select-option>
                  <a-select-option value='3'>一般</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8' v-if="qybm == '320'">
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='家庭有无公职人员'>
                <a-select v-model='model.xfdyhgzry'>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>有</a-select-option>
                  <a-select-option value='2'>无</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8' v-if="qybm == '320'">
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='家庭有无大学生'>
                <a-select v-model='model.jtywdxs'>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>有</a-select-option>
                  <a-select-option value='2'>无</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8' v-if="qybm == '320'">
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='家庭劳动人数'>
                <a-select v-model='model.jtndlrsqk'>
                  <a-select-option value='0'>请选择</a-select-option>
                  <a-select-option value='1'>4人以上</a-select-option>
                  <a-select-option value='2'>3人</a-select-option>
                  <a-select-option value='3'>2人以下</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='基础模型测算'>
                <a-input v-model='jysxedShow' addon-after='万元' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员建议额度'>
                <a-input v-model='pyyjyedShow' addon-after='万元' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员姓名'>
                <a-input v-model='model.pyyxm' />
              </a-form-item>
            </a-col>

            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员证件号'>
                <a-input v-model='model.pyyzjhm' />
              </a-form-item>
            </a-col>


            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议时间'>
                <a-input v-model='model.pysj' />
              </a-form-item>
            </a-col>

            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='备注'>
                <a-input v-model='model.bz' />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class='form-row' :gutter='16' v-else-if="qybm=='130'">
            <a-form>
              <a-row style='margin: 10px'>
                1、婚姻情况（8分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.hyzk'>
                  <a-radio value='1'>已婚有子女（8分）</a-radio>
                  <a-radio value='2'>已婚无子女（5分）</a-radio>
                  <a-radio value='3'>未婚（4分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                2、年龄情况（10分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.nnqk'>
                  <a-radio value='1'>31-45岁（10分）</a-radio>
                  <a-radio value='2'>18-30岁（7分）</a-radio>
                  <a-radio value='3'>46-60岁（5分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                3、健康情况（10分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.jkztqk'>
                  <a-radio value='1'>良好（10分）</a-radio>
                  <a-radio value='2'>一般（6分）</a-radio>
                  <a-radio value='3'>较差（2分）</a-radio>
                  <a-radio value='4'>差（0分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                4、家庭劳动力人数情况（12分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.jtndlrsqk'>
                  <a-radio value='1'>4人及以上（12分）</a-radio>
                  <a-radio value='2'>3人（10分）</a-radio>
                  <a-radio value='3'>2人及以下（8分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                5、房屋价值情况（10分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.fwjzqk'>
                  <a-radio value='1'>20万及以上（10分）</a-radio>
                  <a-radio value='2'>10万-19.99万（8分）</a-radio>
                  <a-radio value='3'>10万以下（5分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                6、家庭纯收入情况（10分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.jtcsrqk'>
                  <a-radio value='1'>15万以上（10分）</a-radio>
                  <a-radio value='2'>10万-15万（8分）</a-radio>
                  <a-radio value='3'>5万-10万（6分）</a-radio>
                  <a-radio value='4'>5万以下（3分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                7、存款业务往来情况（7分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.ckywwl'>
                  <a-radio value='1' style='margin-bottom: 8px;'>与农商行有业务往来， 存款金额超过10万（7分）</a-radio>
                  <br />
                  <a-radio value='2' style='margin-bottom: 8px;'>与农商行有业务往来，存款金额5-10万（5分）</a-radio>
                  <br />
                  <a-radio value='3'>与农商行有业务往来，存款金额5万以下（3分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                8、职业情况（5分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.zwqk'>
                  <a-radio value='1'>村干部及有固定工作者（5分）</a-radio>
                  <a-radio value='2'>多种经营者（4分）</a-radio>
                  <a-radio value='3'>普通农户（2分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                9、家庭成员关系情况（5分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.jtcygx'>
                  <a-radio value='1'>团结和睦（5分）</a-radio>
                  <a-radio value='2'>基本团结，无突出矛盾（3分）</a-radio>
                  <a-radio value='3'>不和睦，矛盾冲突（0分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                10、信誉情况（10分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.xyzk'>
                  <a-radio value='1'>非常好（10分）</a-radio>
                  <a-radio value='2'>良好（8分）</a-radio>
                  <a-radio value='3'>一般（6分）</a-radio>
                  <a-radio value='4'>较差（1分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                11、社会关系情况（5分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.shgxzk'>
                  <a-radio value='1' style='margin-bottom: 8px;'>同居民、邻里之间关系良好，未发生过任何纠纷（5分）</a-radio>
                  <br />
                  <a-radio value='2' style='margin-bottom: 8px;'>同居民、邻里之间关系一般，未发生过大的纠纷（3分）</a-radio>
                  <br />
                  <a-radio value='3' style='margin-bottom: 8px;'>同居民、邻里之间关系较差，经常发生纠纷（0分）</a-radio>
                </a-radio-group>
              </a-row>

              <a-row style='margin: 10px'>
                12、经营能力情况（8分）
              </a-row>
              <a-row style='margin: 10px'>
                <a-radio-group v-model='model.jynl'>
                  <a-radio value='1' style='margin-bottom: 8px;'>生产经营正常，产品有销路、有效益，前景好（8分）</a-radio>
                  <br />
                  <a-radio value='2' style='margin-bottom: 8px;'>生产经营状况一般（3分）</a-radio>
                  <br />
                  <a-radio value='3' style='margin-bottom: 8px;'>无生产经营或生产经营难以维持，存在潜在风险（0分）
                  </a-radio>
                </a-radio-group>
              </a-row>
              <a-row :gutter='20'>
                <a-col :span='12'>
                  <a-form-item label='评议得分' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入评议得分' style='width: 220px;' v-model='model.pydf' readonly />
                  </a-form-item>
                </a-col>
                <a-col :span='12'>
                  <a-form-item label='评定等级' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-select v-model='model.cxd' style='width: 150px;' readonly>
                      <a-select-option value='0'>请选择</a-select-option>
                      <a-select-option value='1'>三星等级</a-select-option>
                      <a-select-option value='2'>四星等级</a-select-option>
                      <a-select-option value='3'>五星等级</a-select-option>
                      <a-select-option value='4'>不予授信</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='20'>
                <a-col :span='12'>
                  <a-form-item label='建议授信额度' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入建议授信额度' style='width: 220px;' v-model='jysxedShow'
                             addon-after='万元' readonly />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='20'>
                <a-col :lg='8'>
                  <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员姓名'>
                    <a-input v-model='model.pyyxm' />
                  </a-form-item>
                </a-col>
                <a-col :lg='8'>
                  <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员证件号'>
                    <a-input v-model='model.pyyzjhm' />
                  </a-form-item>
                </a-col>
                <a-col :lg='8'>
                  <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议时间'>
                    <a-input v-model='model.pysj' />
                  </a-form-item>
                </a-col>
                <a-col :lg='8'>
                  <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='备注'>
                    <a-input v-model='model.bz' />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-row>

          <a-row class='form-row' :gutter='16' v-else-if="qybm=='095'">
            <a-form>
              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='客户分类' :labelCol='labelCol' :wrapperCol='wrapperCol' prop='khfq'>
                    <j-dict-select-tag v-model='model.khfq' dict-code='ty_khfl'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='就业分类' prop='jyfl' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.jyfl' dict-code='ty_jyfl'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='行业分类' prop='hyfl' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.hyfl' dict-code='ty_hyfl'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='就业地点' prop='jydd' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.jydd' dict-code='ty_jydd'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='收入' prop='sr' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.sr' dict-code='bkbpy_sr'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='婚姻状况' prop='hyzk' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.hyzk' dict-code='hyzk'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='手机号码（下发）' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='自动生成'
                             v-model='model.sjhmXf' disabled />
                    <!--                    <el-link type="primary" @click="confirmSjhm('1')">确定为最新</el-link>-->
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='手机号码（导入）' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='自动生成'
                             v-model='model.sjhmImport' disabled />
                    <!--                    <el-link type="primary" @click="confirmSjhm('2')">确定为最新</el-link>-->
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='最新手机号码' prop='sjhm' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入最新号码' clearable v-model='model.sjhm' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='长期居住地' prop='selectedOptions' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入长期居住地' v-model='model.cqjzdxq' />
                    <a-input placeholder='请输入长期居住地备注' v-model='model.cqjzdbz' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='配偶姓名' prop='poxm' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入配偶姓名' v-model='model.poxm' />
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='配偶证件号码' prop='pozjhm' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入配偶姓名证件号码'
                             v-model='model.pozjhm' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='农村房产情况' prop='ncfcqk' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.ncfcqk' dict-code='ncfcqk'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='农村房产情况备注' prop='ncfcqkBz' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入备注' v-model='model.ncfcqkBz' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='8'>
                  <a-form-item label='城区有无房产' prop='cqywfc' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-select v-model='model.cqywfc'>
                      <a-select-option value='1'>有</a-select-option>
                      <a-select-option value='2'>无</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg='8'>
                  <a-form-item label='城区房产位置' prop='cqfcwz' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-select v-model='model.cqfcwz' placeholder='请选择城区房产位置'>
                      <a-select-option value='1'>湘潭县</a-select-option>
                      <a-select-option value='2'>湘潭市</a-select-option>
                      <a-select-option value='3'>湖南省</a-select-option>
                      <a-select-option value='4'>其他</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg='8'>
                  <a-form-item label='房产备注' prop='cqywfcBz' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入备注' clearable v-model='model.cqywfcBz' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='有无车辆' prop='ywcl' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <j-dict-select-tag v-model='model.ywcl' dict-code='ywbz'></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='有无车辆备注' prop='ywclBz' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入备注'
                             v-model='model.ywclBz' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='基础模型测算(单位：元)' prop='jcmxcs' :labelCol='labelCol'
                               :wrapperCol='wrapperCol'>
                    <a-input placeholder='自动生成'
                             v-model='model.jcmxcs' />
                  </a-form-item>
                </a-col>
                <a-col :lg='12'>
                  <a-form-item label='评议员建议额度(单位：元)' prop='pyyjyed' :labelCol='labelCol'
                               :wrapperCol='wrapperCol'>
                    <a-input placeholder='手工输入'
                             v-model='model.pyyjyed' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg='12'>
                  <a-form-item label='备注:' prop='bz' :labelCol='labelCol' :wrapperCol='wrapperCol'>
                    <a-input placeholder='请输入备注' v-model='model.bz' />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="评议照片">
                    <j-image-upload text="上传" isMultiple v-model="pyzppicList" disabled></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-row>

          <a-row class='form-row' :gutter='16' v-else>
            <a-col :lg='12'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='农村房产情况' v-if="qybm=='425'">
                <j-dict-select-tag v-model='model.ncfcqk' dict-code='ncfcqk_xt'
                                   style='width: 150px;'></j-dict-select-tag>
                <a-input placeholder='请输入备注' style='width: 250px;margin-left: 5px;'
                         v-model='model.ncfcqkBz' />
              </a-form-item>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='农村房产情况' v-else>
                <j-dict-select-tag v-model='model.ncfcqk' dict-code='ncfcqk' style='width: 150px;'></j-dict-select-tag>
                <a-input placeholder='请输入备注' style='width: 250px;margin-left: 5px;'
                         v-model='model.ncfcqkBz' />
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='城区有无房产'>
                <j-dict-select-tag v-model='model.cqywfc' dict-code='ywbz' style='width: 150px;'></j-dict-select-tag>
                <a-input placeholder='请输入备注' style='width: 250px;margin-left: 5px;'
                         v-model='model.cqywfcBz' />
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='有无车辆'>
                <j-dict-select-tag v-model='model.ywcl' dict-code='ywbz' style='width: 150px;'></j-dict-select-tag>
                <a-input placeholder='请输入备注' style='width: 250px;margin-left: 5px;'
                         v-model='model.ywclBz' />
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='长期居住地'>
                <j-dict-select-tag v-model='model.cqjzd' dict-code='sfzbd' style='width: 150px;'></j-dict-select-tag>
                <a-input placeholder='请输入备注' style='width: 250px;margin-left: 5px;'
                         v-model='model.cqjzdBz' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='是否在本地'>
                <j-dict-select-tag v-model='model.sfzbd' dict-code='sfzbd'></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='工作类型'>
                <j-dict-select-tag v-model='model.gzlx' dict-code='gzlx'></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='收入'>
                <j-dict-select-tag v-model='model.sr' dict-code='bkbpy_sr'></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='主营项目'>
                <a-input v-model='model.zyxm' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='基础模型测算'>
                <a-input v-model='model.jcmxcs' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员姓名'>
                <a-input v-model='model.pyyxm' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议员证件号'>
                <a-input v-model='model.pyyzjhm' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='评议时间'>
                <a-input v-model='model.pysj' />
              </a-form-item>
            </a-col>
            <a-col :lg='8'>
              <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='备注'>
                <a-input v-model='model.bz' />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>


  </a-modal>


</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import JImageUpload from '@/components/jeecg/JImageUpload'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction, getAction } from '@api/manage'
import store from '@/store/'

export default {
  name: 'JcxxpyModal',
  components: {
    JTreeSelect, JTreeSelectNotJg, JImageUpload
  },
  data() {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '基础信息评议详情',
      visible: false,
      dictOptions: [],
      result: [],
      model: {},
      qybm: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      pyzppicList: [],
    }
  },
  created() {
    this.qybm = store.getters.qybm
    console.log('qybm', this.qybm)
  },
  computed: {
    jtckrphjShow() {
      if (this.qybm == '375' || this.qybm == '320') {
        //汝城 显示实际的值
        return this.model.jtckrphj
      }
      return this.model.jtckrphj > 0 ? '有' : '无'
    },
    jysxedShow() {
      return this.model.jysxed ? this.model.jysxed / 10000 : ''
    },
    pyyjyedShow() {
      return this.model.pyyjyed ? this.model.pyyjyed / 10000 : ''
    }
  },
  methods: {
    view(record) {
      this.model = record
      console.log('view', record)
      this.visible = true
      if(this.qybm == '095') {
        getAction('/pad/pyxx/nhplpy/getSjhm', {'khId': record.id}).then(res => {
          if (res.success && res.result) {
            this.$set(this.model, 'sjhmXf', res.result.sjhmXf)
            this.$set(this.model, 'sjhmImport', res.result.sjhmImport)
            this.$set(this.model, 'sjhm', res.result.sjhm)
          }
        })
        //获取批量评议照片
        let pylx = ''
        if (this.model.pylc == '2') {
          pylx = '11'
        } else if (this.model.pylc == '1,3') {
          pylx = '12'
        } else {
          pylx = '10'
        }
        getAction('/pad/pyxx/pyfjxx/queryPyFjxx', {id: record.id,pylx:pylx,zllx:'批量评议照片'}).then(res => {
          if (res.success && res.result) {
            this.pyzppicList = res.result;
          }else{
            this.pyzppicList = [];
          }
        })
      }

    },
    close() {
      this.visible = false
    },
    handleCancel() {
      this.close()
    }


  }
}
</script>

<style scoped>

</style>