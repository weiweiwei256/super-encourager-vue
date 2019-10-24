<template>
    <div id='root'>
        <el-tabs tab-position="left"
            style="height: 100%">
            <el-tab-pane label="放松一下">用户管理</el-tab-pane>
            <el-tab-pane label="开发辅助">
                开发辅助
                <assist></assist>
            </el-tab-pane>
            <el-tab-pane label="减压游戏">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Assist from '@/views/Assist.vue'
export default {
  components: {
    Assist
  },
  data() {
    return {
    };
  }
};
</script>
<style lang='less'>
html,
body,
#app,
#root {
    height: 100%;
}
</style>
