import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'// 引入中文文件
// 配置中文
Validator.addLocale(zh)
const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags',
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
}
Vue.use(VeeValidate, config)

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      task_name: '任务名称',
      phone: '手机',
      task_type: '任务类型',
      task_template: '任务模板',
      task_tine_type: '时间类型',
      task_tine_value: '时间类型值',
      assisting_department: '协助单位',
      responsible_department: '责任单位',
      target_area: '目标新增面积',
      target_cahnge_number: '目标改造数量',
      implementation_plan: '实施方案',
      assessment_standard: '考核指标',
      grading_standard: '评分标准',
      score: '考核分值'
    }
  }
}

const projDictionary = {
  zh_CN: {
    attributes: {
      proj_sn: '项目编号',
      proj_name: '项目名称',
      region: '行政区域',
      engineering_type: '工程类型',
      proj_type: '项目类型',
      sub_proj_type: '项目类型',
      sub_proj_name: '项目名称',
      inspect_matter: '巡查与协调事项',
      inspect_issue: '问题'
    }
  }
}

Validator.updateDictionary(dictionary)
Validator.updateDictionary(projDictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
