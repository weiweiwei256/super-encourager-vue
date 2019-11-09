<template>
    <div id="tools">
        <div class='list'
            flex='main:center'>
            <el-radio-group v-model="activeTools">
                <el-radio-button :label='QR_CODE'>生成二维码</el-radio-button>
                <el-radio-button :label="DATE_TRANSFORM">日期<=>时间戳</el-radio-button>
                <el-radio-button :label="STRING_RELATED">字符串处理</el-radio-button>
                <el-radio-button :label="CALCULATOR">计算器</el-radio-button>
            </el-radio-group>
        </div>
        <div class='tool-container'>
            <div class='introduction'
                v-if='!activeTools'>
                <p>当前版本提供的工具还很有限,RUNNERUP会根据大家的实际需要,逐步追加.</p>
                <p>快来为你想要的工具点赞,或者反馈你想要的工具吧.</p>
                <span>地址</span>
                <el-link href='https://github.com/weiweiwei256/super-encourager'>github super-encourager advice issue</el-link>
            </div>
            <QRcode v-if='activeTools===QR_CODE'></QRcode>
            <DateTransform v-if='activeTools===DATE_TRANSFORM'></DateTransform>
            <StringRelated v-if='activeTools===STRING_RELATED'></StringRelated>
            <calculator v-if='activeTools===CALCULATOR'></calculator>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import QRcode from '@/substance/tools/QRcode.vue'
import DateTransform from '@/substance/tools/DateTransform.vue'
import StringRelated from '@/substance/tools/StringRelated.vue'
import Calculator from '@/substance/tools/Calculator.vue'
export default {
  name: 'tools',
  components: {
    QRcode,
    DateTransform,
    StringRelated,
    Calculator
  },
  data() {
    return {
      webConfig: {},
      QR_CODE: 'qrcode',
      DATE_TRANSFORM: 'date_transform',
      STRING_RELATED: 'string_related',
      CALCULATOR: 'calculator',
      activeTools: 'calculator',  // 需要与产量保持一致
    }
  },
  created() {
    this.webConfig = this.getters('setting').globalState
  },
  methods: {
    changeHiType() {
      this.sendMessage(cmds.UPDATE_WEB_CONFIG, { page: 'encourager', key: 'hitokoto_type', value: this.webConfig.hitokoto_type })
    }
  }
}
</script>
<style lang='less' scoped>
#tools {
    height: 100%;
    .list {
        /deep/ .el-radio-button__inner {
            padding: 10px;
            margin-left: 5px;
            margin-right: 5px;
            border-left: 1px solid;
            border-radius: 4px;
        }
    }
    .tool-container {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        .introduction {
            text-align: center;
        }
    }
}
</style>
