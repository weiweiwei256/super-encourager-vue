<template>
    <div id='test'>
        <h4>test</h4>
        <el-button @click.stop="handleMutations">invoke mutations</el-button>
        <el-button @click.stop="handleActions">invoke actions</el-button>
        <el-button @click.stop='testSendMessage'>test send message</el-button>
        <h5>config</h5>
        <div>{{setting.config}}</div>
        <h5>globalState</h5>
        <div>{{setting.globalState}}</div>
    </div>
</template>

<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
export default {
    name: 'Test',
    mounted() {
        console.log('settings:' + this.setting)
    },
    computed: {
        setting: function () {
            return this.getters('setting')
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
            let data = await this.sendMessage(cmds.TEST)
        }
    }
}
</script>

<style>
</style>
