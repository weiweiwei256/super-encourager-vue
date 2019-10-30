<template>
    <div id='test'>
        test
        <el-button @click.stop="handleMutations">invoke mutations</el-button>
        <el-button @click.stop="handleActions">invoke actions</el-button>
        <el-button @click.stop='sendMessage2'>send message</el-button>
    </div>
</template>

<script>
import * as types from '@/store/types.js';
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'test',
    mounted() {
        // console.log(this.$store.getters.vscode)
        // console.log(this.code)

    },
    computed: {
        ...mapGetters({
            code: 'vscode'
        })
    },
    methods: {
        ...mapMutations(
            {
                invokeMutations: types.TEST_MUTATIONS
            }
        ),
        ...mapActions(
            {
                invokeAction: types.TEST_ACTIONS,
                sendMessage: types.TEST_POSTMESSAGE
            }
        ),
        handleMutations() {
            // this.$store.commit(types.TEST_MUTATIONS, 'page invoke')
            this.invokeMutations('page invoke');
        },
        // promise 调用
        // handleActions() {
        //     // this.$store.dispatch(types.TEST_ACTIONS)
        //     this.invokeAction().then(data => {
        //         console.log(data)
        //     }).catch(err => {
        //         console.log(err)
        //     });
        // }
        // 同步调用
        async handleActions() {
            // this.$store.dispatch(types.TEST_ACTIONS)
            let data = await this.invokeAction()
            console.log(data)
        },
        async sendMessage2() {
            let data = await this.sendMessage({ cmd: 'log', arg: 'arg' })
            console.log('前端页面收到:' + JSON.stringify(data))
        }
    }
}
</script>

<style>
</style>
