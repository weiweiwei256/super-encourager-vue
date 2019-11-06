<template>
    <div id="tools">
        <div class='list'
            flex='main:center'>
            <el-radio-group v-model="activeTools">
                <el-radio-button :label='QR_CODE'>生成二维码</el-radio-button>
                <el-radio-button :label="DATE_TRANSFORM">日期<=>时间戳</el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </div>
        <div class='tool-container'>
            <QRcode v-show='activeTools===QR_CODE'></QRcode>
            <DateTransform v-show='activeTools===DATE_TRANSFORM'></DateTransform>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import QRcode from '@/substance/tools/QRcode.vue'
import DateTransform from '@/substance/tools/DateTransform.vue'
export default {
  name: 'tools',
  components: {
    QRcode,
    DateTransform
  },
  data() {
    return {
      webConfig: {},
      activeTools: 'qrcode',
      QR_CODE: 'qrcode',
      DATE_TRANSFORM: 'date_transform'
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
    }
}
</style>
