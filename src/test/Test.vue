<template>
    <div id='test'>
        test
        <el-button @click="handleMutations">invoke mutations</el-button>
        <el-button @click="handleActions">invoke actions</el-button>
    </div>
</template>

<script>
import * as types from '@/store/types.js';
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'test',
    mounted() {
        console.log(this.$store.getters.vscode)
        console.log(this.code)
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
                invokeAction: types.TEST_ACTIONS
            }
        ),
        handleMutations() {
            // this.$store.commit(types.TEST_MUTATIONS, 'page invoke')
            this.invokeMutations('page invoke');
        },
        handleActions() {
            // this.$store.dispatch(types.TEST_ACTIONS)
            this.invokeAction();
        }
    }
}
</script>

<style>
</style>
