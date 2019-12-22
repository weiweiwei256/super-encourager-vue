<template>
    <div id='recommendation'>
        <p>推荐列表：
            <el-button type="primary"
                @click="addFormVisible = true">我要投稿</el-button>
            <span class='reload icon iconfont'
                @click.stop='reloadBlogs'>&#xe711;
            </span>
        </p>
        <p style='font-size:10px'>投稿后，审核通过就可以在列表里看到啦！并会向提供的邮箱发送通知。由于都是人工审核，我尽量每天下班后都看看。<br>ps:本人干前端的，服务端水平有限，服务器配置也低。如出现获取不到的情况，多多包含，我会尽快处理。</p>
        <div class='blog-container'
            v-if='blogs.length'>
            <share-area v-for="(item,index) in blogs"
                :key='index'
                :item='item'></share-area>
        </div>
        <!--新增界面-->
        <el-dialog title="新增推荐"
            top='5vh'
            width='90%'
            :visible.sync="addFormVisible"
            :close-on-click-modal="false">
            <el-form :model="addForm"
                label-suffix=':'
                label-width="100px"
                :rules="addFormRules"
                ref="addForm">
                <el-form-item label="博客/项目"
                    prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="url地址"
                    prop="address">
                    <el-input v-model="addForm.address"
                        placeholder="可访问，且不和已有推荐重复"></el-input>
                </el-form-item>
                <el-form-item label="简介"
                    prop="desc">
                    <el-input v-model="addForm.desc"
                        type="textarea"
                        :maxlength='200'
                        show-word-limit
                        placeholder="简要介绍博客/项目内容，方便大家选择"
                        :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="标签"
                    prop="tags">
                    <el-tag :key="tag"
                        v-for="tag in addForm.tags"
                        closable
                        :disable-transitions="false"
                        @close="addForm.tags.splice(addForm.tags.indexOf(tag), 1)">
                        {{ tag }}
                    </el-tag>
                    <el-input class="input-new-tag"
                        v-if="addTagVisible"
                        v-model="addTagValue"
                        ref="saveAddTagInput"
                        size="small"
                        @keyup.enter.native="handleAddTagInputConfirm(addForm)"
                        @blur="handleAddTagInputConfirm(addForm)">
                    </el-input>
                    <el-button v-else
                        class="button-new-tag"
                        size="small"
                        @click="showAddTagInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="其他">
                    <el-checkbox v-model="addForm.english">是否是英文</el-checkbox>
                    <el-checkbox v-model="addForm.block">是否需要翻墙</el-checkbox>
                </el-form-item>

                <el-divider>推荐人信息</el-divider>
                <el-form-item label="名字"
                    prop="name">
                    <el-input v-model="addForm.name"
                        placeholder="网名即可"></el-input>
                </el-form-item>
                <el-form-item label="推荐人主页"
                    prop="user_link">
                    <el-input v-model="addForm.user_link"
                        placeholder="可通过点击推荐人名字跳转至主页"></el-input>
                </el-form-item>
                <el-form-item label="email"
                    prop="email">
                    <el-input v-model="addForm.email"
                        placeholder="方便后续沟通"></el-input>
                </el-form-item>
                <el-divider>快捷辅助</el-divider>
                <el-input type="textarea"
                    placeholder="当前数据结构展示。方便查看，备份，快速导入等辅助"
                    :rows="10"
                    v-model="addAssist"></el-input>
                <el-button @click.native="addForm = JSON.parse(addAssist)">应用配置</el-button>
            </el-form>
            <div slot="footer"
                class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary"
                    @click.native="addSubmit"
                    :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
import ShareArea from '@/substance/ShareArea.vue'
import NProgress from 'nprogress'
export default {
    name: "recommendation",
    components: {
        ShareArea
    },
    data() {
        var isUrl = (rule, value, callback) => {
            var matchUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            if (!value) {
                this.$message('地址不能为空！')
                return;
            }
            if (!matchUrl.test(value.trim())) {
                this.$message(
                    {
                        message: '不是正确网址!',
                        type: 'error'
                    })
                return
            }
            callback();
        }
        return {
            blogs: [],
            //新增界面数据
            addTagVisible: false,
            addTagValue: '',
            addForm: {
                tags: [],
            },
            addAssist: '', // 辅助的值
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                title: [{ required: true, message: '请输入博客/项目', trigger: 'blur' }],
                address: [{ required: true, message: '请输入地址', trigger: 'blur', validator: isUrl }],
                desc: [{ required: true, message: '请输入简介', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.loadBlogs();
    },
    watch: {
        addForm: {
            deep: true,
            handler: function (newVal) {
                this.addAssist = JSON.stringify(newVal, null, '\t')
            },
        },
    },
    methods: {
        loadBlogs() {
            return this.sendMessage(cmds.PROXY_COMMUNICATION, { method: 'get', url: 'http://39.105.32.133/graphql?query=%7B%0A%20%20blogs%20%7B%0A%20%20%20%20name%0A%20%20%20%20tags%0A%20%20%20%20user_link%0A%20%20%20%20title%0A%20%20%20%20address%0A%20%20%20%20desc%0A%20%20%20%20english%0A%20%20%20%20block%0A%20%20%20%20meta%20%7B%0A%20%20%20%20%20%20createdAt%0A%20%20%20%20%20%20updatedAt%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' }).then(data => {
                this.blogs = data.data.blogs;
            })
        },
        addBlog(params) {
            return this.sendMessage(cmds.PROXY_COMMUNICATION, { method: 'post', url: 'http://39.105.32.133/addblog', params })
        },
        reloadBlogs() {
            this.loadBlogs().then(() => {
                this.$message('获取博客列表成功')
            })
        },
        showAddTagInput() {
            this.addTagVisible = true
            this.$nextTick(_ => {
                this.$refs.saveAddTagInput.$refs.input.focus()
            })
        },

        handleAddTagInputConfirm(item) {
            let addTagValue = this.addTagValue
            if (addTagValue) {
                item.tags.push(addTagValue)
            }
            this.addTagVisible = false
            this.addTagValue = ''
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true
                        NProgress.start();
                        let para = Object.assign({}, this.addForm)
                        this.addBlog(para).then((res) => {
                            this.addLoading = false;
                            NProgress.done();
                            if (res.data.success) {
                                this.$message({
                                    message: '提交成功,等待审核中...',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.loadBlogs();
                            } else {
                                this.$message({
                                    message: res.data.blog,
                                    type: 'error'
                                });
                            }
                        })
                    })
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
#recommendation {
    text-align: left;
    .reload {
        float: right;
        margin-right: 31px;
    }
    .blog-container {
        width: 90%;
    }
}
</style>

