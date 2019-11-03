<template>
    <div id="web-config">
        <el-form ref="form"
            :model="webConfig"
            label-width="80px">
            <el-form-item label="一言类型:">
                <el-select v-model="webConfig.encourager.hitokoto_type"
                    @change="changeHiType"
                    placeholder="请选类型">
                    <el-option label="动画"
                        value="a"></el-option>
                    <el-option label="漫画"
                        value="b"></el-option>
                    <el-option label="游戏"
                        value="c"></el-option>
                    <el-option label="小说"
                        value="d"></el-option>
                    <el-option label="原创"
                        value="e"></el-option>
                    <el-option label="网络"
                        value="f"></el-option>
                    <el-option label="其他"
                        value="g"></el-option>
                    <el-option label="随机"
                        value=""></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
export default {
  name: 'web-config',
  components: {
  },
  props: {
  },
  data() {
    return {
      webConfig: {}
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
#web-config {
    height: 100%;
}
</style>
