<template>
    <div id='test'>
        <h4>test</h4>
        <el-button @click.stop="handleMutations">invoke mutations</el-button>
        <el-button @click.stop="handleActions">invoke actions</el-button>
        <el-button @click.stop='testSendMessage'>test send message</el-button>
    </div>
</template>

<script>
import * as cmds from '@/global/cmd-constant.js';
export default {
    name: 'Test',
    mounted() {
        console.log(this.code)
    },
    computed: {
        code: function () {
            return this.getters('vscode')
        }
    },
    methods: {
        handleMutations() {
            this.commit(types.TEST_MUTATIONS, 'page invoke');
        },
        // 同步调用
        handleActions() {
            this.dispatch(types.TEST_ACTIONS)
        },
        async testSendMessage() {
            let data = await this.sendMessage(cmds.LOG, { msg: 'arg' })
        }
    }
}
</script>

<style>
</style>
