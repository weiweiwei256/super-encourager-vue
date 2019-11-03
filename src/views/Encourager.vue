<template>
    <div id="encourager"
        ref='encourager'>
        <div class='header'>
            <span>当前时间: {{time}}</span>
        </div>
        <div class='hi-container'>
            <span class='title'>一言精选: </span>
            <span class='icon iconfont'
                @click.stop='getHiWord'>&#xe711;

            </span>
            <span class='icon iconfont'>&#xe611;</span>

            <p class='hi-content'>{{hiData.hitokoto}}</p>
            <p class='from'>出处:
                <span style='font-weight:bold'>{{hiData.from }}</span> 类型:
                <span style='font-weight:bold'>{{hType}}</span></p>
            <p class='thanks'>
                <span style='vertical-align: middle'>鸣谢:</span>
                <el-link href='https://hitokoto.cn/'>https://hitokoto.cn/提供一言资源</el-link>
            </p>
        </div>
        <div class='image-container'>
            <div class='title'
                flex='main:justify'>
                <span>欣赏美图休息一下吧！！！(点击切换下一张)</span>
                <el-checkbox v-model="isCollected"
                    class='combo'
                    @change="handleCollect">收藏至"⭐我的最爱"</el-checkbox>
            </div>
            <el-tooltip class='link'
                content="点击切换至下一张"
                transition='el-fade-in-linear'
                :open-delay='3000'
                :hide-after='5000'
                placement="top">
                <img class='image-content'
                    :src='imageUrl'
                    @click.stop='getImage'>
            </el-tooltip>

        </div>
    </div>
</template>

<script>
const LOAD_TIP = '加载中...'
const TYPE_MAP = new Map(
  [['a', '动画'], ['b', '漫画'], ['c', '游戏'], ['d', '小说'], ['e', '原创'], ['f', '来自网络'], ['g', '其他']])
import * as cmds from '@/store/cmd-constant.js';
export default {
  name: 'encoureager',
  components: {
  },
  props: {
  },
  data() {
    return {
      timer: undefined,
      time: LOAD_TIP,
      // hi
      hiData: {
        hitokoto: LOAD_TIP,
        from: LOAD_TIP
      },
      imageUrl: '',
      isCollected: false,
    }
  },
  computed: {
    hType() {
      if (this.hiData.type) {
        return TYPE_MAP.get(this.hiData.type)
      }
      return LOAD_TIP
    }
  },
  async created() {
    this.timer = setInterval(() => {
      let d = new Date()
      this.time =
        d.toLocaleDateString() + " " + d.toLocaleTimeString()
    }, 1000)
    this.getHiWord();
    this.getImage();
  },
  methods: {
    handleCollect() {
      this.sendMessage(cmds.ENCOURAGER_CHANGE_IMAGE_COLLECT, { imageUrl: this.imageUrl, collectState: this.isCollected })
    },
    getHiWord() {
      this.axios.get('https://v1.hitokoto.cn/?c=').then(data => {
        this.hiData = data.data;
      })
    },
    async getImage() {
      let { result } = await this.sendMessage(cmds.ENCOURAGER_IMAGE)
      this.imageUrl = result.imageUrl;
      this.isCollected = result.isCollected;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang='less' scoped>
#encourager {
    height: 100%;
    .header {
        font-size: 16px;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
    }
    .hi-container {
        user-select: text;
        .icon {
            width: 18px;
            height: 18px;
        }
        .hi-content {
            width: 80%;
            margin: 0 auto;
            margin-top: 15px;
            word-break: break-all;
            text-indent: 25px;
            text-align: left;
            font-weight: bold;
            font-size: 18px;
        }
        .from {
            text-align: right;
            font-size: 16px;
        }
        .thanks {
            text-align: center;
            font-size: 16px;
        }
    }
    .image-container {
        text-align: center;
        .image-content {
            width: 90%;
            margin-top: 10px;
        }
        .combo {
            font-size: 16px;
        }
    }
}
</style>
