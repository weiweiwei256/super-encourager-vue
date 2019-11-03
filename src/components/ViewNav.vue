<template>
    <div id='view-nav'
        ref='nav'
        @mouseover='handleOver'>
        <el-radio-group v-model="radioValue">
            <el-radio-button class="iconfont item"
                :label='ENCOURAGER'>&#xe614;
            </el-radio-button>
            <el-radio-button class="iconfont item"
                :label='COMMONAPI'>&#xe64f;</el-radio-button>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    name: 'view-nav',
    components: {
    },

    props: {
        defView: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isMoveNav: false,
            yOffset: 0,
            radioValue: this.defView,
            ENCOURAGER: 'encourager',
            COMMONAPI: 'common-API',
        };
    },
    watch: {
        radioValue: function (newVal) {
            this.$emit('change', newVal);
        }
    },
    methods: {
        handleOver() {
            let navDom = this.$refs['nav']
            navDom.style.cursor = 'move';
        }
    },
    mounted() {
        let navDom = this.$refs['nav']
        navDom.onmousedown = function (e) {
            let y = e.clientY;
            let t = navDom.offsetTop;
            this.yOffset = y - t;
            this.isMoveNav = true;
            navDom.style.cursor = 'move';
        }
        navDom.onmousemove = function (e) {
            if (this.isMoveNav == false) {
                return;
            }
            var ny = e.clientY;
            var nt = ny - this.yOffset;
            navDom.style.top = nt + 'px';
        }
        navDom.onmouseup = function () {
            //开关关闭
            this.isMoveNav = false;
            navDom.style.cursor = 'default';
        }
    }
};
</script>
<style lang="less" scoped>
#view-nav {
    position: absolute;
    width: 30px;
    top: 40%;
    word-break: break-word;
    border: 1px solid;
    text-align: center;
    border-radius: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    z-index: 10;
    user-select: none;
    .item {
        margin-top: 3px;
        margin-bottom: 3px;
        /deep/ .el-radio-button__inner {
            background-color: inherit;
            border: none;
            border-radius: 2px !important;
            padding: 0;
            font-size: 22px;
            color: inherit;
        }
        /deep/ .el-radio-button__orig-radio {
            margin: 0;
        }
        /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            box-shadow: none;
            border: 1px dashed;
            color: inherit;
        }
    }
}
</style>



