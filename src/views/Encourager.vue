<template>
    <div id="encourager"
        ref='encourager'>
        <h2>鼓励</h2>
        <div class='header'
            flex='main:justify'>
            <span>当前时间: {{time}}</span>
            <span v-show='countDown>0'>自动关闭: {{countDown}}秒</span>
            <span v-show='countDown<=0'>请手动关闭</span>
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
            <div class='title'>欣赏美图休息一下吧！！！</div>

            <el-tooltip class='link'
                content="点击切换至下一张"
                transition='el-fade-in-linear'
                :open-delay='3000'
                :hide-after='5000'
                placement="top">
                <img class='image-content'
                    :src='imageUrl'>
            </el-tooltip>
            <el-checkbox v-model="isCollected"
                class='combo'
                @change="handleCollect">收藏至"⭐我的最爱"</el-checkbox>
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
      Countdowner: undefined,
      countDown: 0,
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
    console.log('鼓励页获取配置' + JSON.stringify(this.getters('setting')))
    this.countDown = this.getters('setting').config.timeLast
    this.timer = setInterval(() => {
      let d = new Date()
      this.time =
        d.toLocaleDateString() + " " + d.toLocaleTimeString()
    }, 1000)
    if (this.countDown > 0) {
      this.Countdowner = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          this.close();
        }
      }, 1000)
    }
    this.getHiWord();

  },
  methods: {
    handleCollect() {
      console.log(this.isCollected)
    },
    stopClose() {
      this.countDown = -1;
      clearInterval(this.Countdowner)
    },
    close() {
      clearInterval(this.Countdowner)
    },
    getHiWord() {
      this.axios.get('https://v1.hitokoto.cn/?c=').then(data => {
        this.hiData = data.data;
      })
    },
    handRootClock() {
      this.stopClose();
      // 移除终止监听
      this.$refs['encourager'].removeEventListener('click', this.handRootClock, true)
    },
  },
  async mounted() {
    // 增加点击终止关闭监听
    this.$refs['encourager'].addEventListener('click', this.handRootClock, true)

    let { result } = await this.sendMessage(cmds.ENCOURAGER_IMAGE)
    this.imageUrl = result.imageUrl;
    this.isCollected = result.isCollected;
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
