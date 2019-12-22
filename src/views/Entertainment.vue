<template>
    <div id="entertainment">
        <el-divider content-position="left">小游戏</el-divider>
        <div class='container'>
            <el-button @click.stop="invoke('game','box-game')">推箱子</el-button>
            <el-button @click.stop="invoke('game','cross-road')">过马路</el-button>
            <el-button @click.stop="invoke('game','card-game')">匹配卡片</el-button>
        </div>
        <el-divider content-position="left">搞破坏</el-divider>
        <div class='container'>
            <el-button @click.stop="invoke('smash','elasticity-text')">弹性文字</el-button>
            <el-button @click.stop="invoke('smash','extrusion')">小球退散</el-button>
            <el-button @click.stop="invoke('smash','fog-fire')">火焰绘画</el-button>
        </div>
        <el-divider content-position="left">发发呆</el-divider>
        <div class='container'>
            <el-button @click.stop="invoke('daze','solar-animation')">太阳系</el-button>
            <el-button @click.stop="invoke('daze','3d-pixel-graph')">炫酷3D粒子</el-button>
            <el-button @click.stop="invoke('daze','firestorm')">火焰风暴</el-button>
        </div>
    </div>
</template>

<script>
import * as cmds from '@/store/cmd-constant.js';
export default {
  name: 'entertainment',
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    invoke(type, name) {
      this.sendMessage(cmds.CALL_ENTERAINMENT, { type, name }).then(({ msg }) => {
        this.$message(msg);
      })
    }
  }
}
</script>
<style lang='less' scoped>
#entertainment {
    .container {
        text-align: center;
    }
}
</style>
