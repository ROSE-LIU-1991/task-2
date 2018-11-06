<template>
    <div>
        <div class="acticle">
            <div class="acticle-header">
                <div class="header-top">
                    <div class="top-title">
                        <p class="title-txt">标&emsp;题</p>
                        <input class="acticle-input" type="text" v-model="title">
                    </div>
                      <div class="top-title">
                        <p class="title-txt">创建者</p>
                        <input class="acticle-input" type="text" v-model="author">
                    </div>
                    <div class="top-title">
                        <p class="demonstration">修改时间</p>
                        <el-date-picker class="demon-input" v-model="startAt1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        <div class='calendar-txt'></div>
                        <el-date-picker class="demon-input" v-model="endAt1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                    </div>
                </div>
                <div class="header-bottom">
                    <div class="top-title">
                        <p class="title-txt">状&emsp;态</p>
                        <el-select style="width:170px;margin-left:10px;" v-model="status" placeholder="全部">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.status"></el-option>
                        </el-select>
                    </div>  
                    <div class="top-title">
                        <p class="title-txt">类&emsp;型</p>
                        <el-select style="width:170px;margin-left:10px;" v-model="type" placeholder="全部">
                            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.type"></el-option>
                        </el-select>
                    </div>
                    <div class="bottom-btn" style="width:451px;">
                        <el-button style="margin-left:20px;margin-right:8px" type="danger" @click="search()">搜索</el-button> 
                        <el-button type="warning" @click="empty()">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="acticle-main">
                <div class="main-title">Article管理
                    <el-button type="success acticle-btn" @click="add">+新增</el-button>
                </div>
                <div class="main-box">
                    <table class="table">
                        <tr>
                            <th class="table-th">序号</th>
                            <th class="table-th">图片</th>
                            <th class="table-th">标题</th>
                            <th class="table-th">类型</th>
                            <th class="table-th">创建者</th>
                            <th class="table-th">创建时间</th>
                            <th class="table-th">修改时间</th>
                            <th class="table-th">状态</th>
                            <th class="table-th">操作</th>
                        </tr>
                        <tr style="text-align:center" v-for="(list, index) in articleList" :key="list.value">
                            <td>{{index+1}}</td>
                            <td><img  v-bind:src="list.img" width="130px"></td>
                            <td>{{list.title}}</td>
                            <td>{{list.type | types}}</td>
                            <td>{{list.author}}</td>
                            <td>{{list.createAt | time}}</td>
                            <td>{{list.updateAt | time}}</td>
                            <td>{{list.status | statu1}}</td>
                            <td style="min-width: 200px">
                              <el-button style="margin:0" type="primary" v-on:click="ONOFF(index)" plain>{{list.status | statu2}}</el-button>
                              <el-button style="margin:0" type="success" v-on:click="compile(articleList[index].id)" plain>编辑</el-button>
                              <el-button style="margin:0" type="danger" v-on:click="Delete(articleList[index].id)" plain>删除</el-button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div> 
            <div class="acticle-footer">
              <!-- 分页 -->
              <div class="input-show">
              每页显示
              <input style="width:60px;height:22px;text-align: center;" type="text" v-model="size" v-on:input ="size=size.replace(/[^\d]/g,'')">
              条
              </div>
              <!-- 分页插件 -->
              <el-pagination @current-change="none" :current-page.sync="this.currentPage" 
              :page-size="this.size" layout="total, prev, pager, next" :total="this.total"></el-pagination>
              <div class="input-show">
              跳转至
              <input style="width:60px;height:22px;text-align: center;" type="text" v-model="page" v-on:input="page=page.replace(/[^\d]/g,'')">
              条
              </div>
              <button class="arti-btns" v-on:click="submit()">确定</button> 
            </div>   
        </div>
    </div>
</template>

<script>
var qs = require("qs");
export default {
  inject: ["reload"],
  data() {
    return {
      title: this.$route.query.title,
      author: this.$route.query.author,
      startAt: Math.floor(new Date(this.$route.query.startAt1).valueOf()),
      endAt: Math.floor(new Date(this.$route.query.endAt1).valueOf()),
      startAt1: this.$route.query.startAt1,
      endAt1: this.$route.query.endAt1,
      options1: [
        {
          status: 1,
          label: "草稿"
        },
        {
          status: 2,
          label: "上线"
        }
      ],
      status: this.$route.query.status,
      options2: [
        {
          type: 0,
          label: "首页banner"
        },
        {
          type: 1,
          label: "找职位banner"
        },
        {
          type: 2,
          label: "找精英banner"
        },
        {
          type: 3,
          label: "行业大图"
        }
      ],
      type: this.$route.query.type,
      articleList: this.articleList,
      size: this.$route.query.size,
      page: "",
      total: "",
      currentPage: this.$route.query.page
    };
  },
  mounted() {
    this.acticle();
    console.log(this.size);
  },
  methods: {
    acticle() {
      console.log(this);
      isNaN(this.startAt) == true
        ? (this.startAt = "")
        : console.log(this.startAt);
      isNaN(this.endAt) == true ? (this.endAt = "") : console.log(this.endAt);
      if (
        this.startAt == Math.floor(new Date(this.$route.query.endAt1).valueOf())
      ) {
        this.endAt =
          Math.floor(new Date(this.$route.query.startAt1).valueOf()) + 86399000;
      } else if (
        Math.floor(new Date(this.$route.query.endAt1).valueOf()) -
          this.startAt <=
        86400000
      ) {
        this.endAt =
          Math.floor(new Date(this.$route.query.endAt1).valueOf()) + 86399000;
      }
      console.log(this.startAt);
      console.log(this.endAt);
      this.$http
        .get("/api/a/article/search", {
          params: {
            title: this.title,
            author: this.author,
            startAt: this.startAt,
            endAt: this.endAt,
            type: this.type,
            status: this.status,
            size: this.size,
            page: this.currentPage
          }
        })
        .then(result => {
          this.articleList = result.data.data.articleList;
          this.total = result.data.data.total;
          this.size = this.$route.query.size;
          if (this.size == undefined) {
            this.size = 10;
            console.log(this.size);
          }
          this.currentPage = this.$route.query.page;
          this.title = this.$route.query.title;
          this.author = this.$route.query.author;
          this.startAt = this.$route.query.startAt;
          this.endAt = this.$route.query.endAt;
          //发送编辑参数
          if (this.$route.query.status) {
            this.status = parseInt(this.$route.query.status);
          }
          if (this.$route.query.type) {
            this.type = parseInt(this.$route.query.type);
          }
        })

        .catch(err => {
          console.log(err);
        });
    },
    //跳转每页消息数
    submit: function() {
      this.$router.push({
        path: "/home/list/",
        query: {
          page: this.page,
          size: this.size,
          title: this.title,
          author: this.author,
          startAt1: this.startAt1,
          endAt1: this.endAt1,
          status: this.status,
          type: this.type
        }
      });
      this.reload();
    },
    //跳转页数
    none: function(val) {
      this.$router.push({
        path: "/home/list/",
        query: {
          page: val,
          size: this.size,
          title: this.title,
          author: this.author,
          startAt1: this.startAt1,
          endAt1: this.endAt1,
          status: this.status,
          type: this.type
        }
      });
      this.reload();
    },
    //搜索跳转
    search: function() {
      this.$router.push({
        path: "/home/list/",
        query: {
          title: this.title,
          author: this.author,
          startAt1: this.startAt1,
          endAt1: this.endAt1,
          status: this.status,
          type: this.type
        }
      });
      this.reload();
    },
    //清空跳转
    empty: function() {
      this.$router.push({
        path: "/home/list/"
      });
      this.reload();
    },
    //删除
    Delete: function(x) {
      var id = x;
      console.log(id);
      var mymessage = confirm("确定要删除吗？");
      if (mymessage == true) {
        this.$http.delete("/api/a/u/article/" + id).then(res => {
          this.reload();
        });
      }
    },
    //上下线
    ONOFF: function(index) {
      var id = this.articleList[index].id;
      var Status;
      this.articleList[index].status == 1 ? (Status = 2) : (Status = 1);
      console.log(id);
      console.log(Status);
      this.$http
        .put(
          "/api/a/u/article/status/",
          qs.stringify({
            id: id,
            status: Status
          })
        )
        .then(res => {
          console.log(res);
          this.reload();
        });
    },
    //新增列表
    add: function() {
      this.$router.push({
        path: "/home/add/"
      });
      this.reload();
    },
    //编辑列表
    compile: function(id) {
      console.log(id);
      this.$router.push({
        path: "/home/add/",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.acticle {
  position: absolute;
  top: 90px;
  left: 270px;
  right: 50px;
  z-index: -1;
}
.acticle-header {
  border-radius: 10px;
  background-color: #e6e6e6;
}

.header-top {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 100%;
  padding: 20px 0;
}
.header-bottom {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 100%;
  padding: 20px 0;
}
.top-title {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}
.bottom-btn {
  display: flex;
  flex-flow: row-reverse wrap;
}
.acticle-input {
  margin-left: 10px;
  width: 170px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-align: center;
  outline: 0;
}
.title-txt {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}
.demonstration {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}
.demon-input {
  margin-left: 10px;
  margin-right: 10px;
  width: 170px;
}
.calendar-txt {
  width: 15px;
  border: 2px solid #000;
}
.acticle-main {
  margin-top: 60px;
  border-radius: 8px;
  border: solid 1px #e6e6e6;
  font-weight: 700;
}
.main-title {
  padding: 0 20px;
  line-height: 50px;
  background: #e5eaeb;
  text-align: left;
}
.main-box {
  margin: 10px;
  padding: 0 10px;
  border: solid 1px #e6e6e6;
  border-radius: 5px;
}
.acticle-btn {
  float: right;
  margin-top: 10px;
  padding: 0;
  width: 50px;
  line-height: 30px;
}
.table-th {
  width: 100px;
  height: 50px;
  text-align: center;
}
.acticle-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  font-weight: 700;
}
.input-show {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  height: 28px;
  font-size: 14px;
}
.arti-btns {
  margin-top: 10px;
  line-height: 30px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #ff0000;
  text-decoration: none;
}
</style> 