<template>
    <div id="tools">
        <div class='list'
            flex='main:center'>
            <el-radio-group v-model="activeTools">
                <el-radio-button label="生成二维码"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </div>
        <div class='tool-container'>
            <QRcode></QRcode>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import QRcode from '@/substance/tools/QRcode.vue'
export default {
  name: 'tools',
  components: {
    QRcode,
  },
  data() {
    return {
      webConfig: {},
      activeTools: '',
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
}
</style>
