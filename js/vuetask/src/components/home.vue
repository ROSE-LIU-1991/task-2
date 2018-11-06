<template>
<div>
  <div class="header">
    <h1 id="abc" class="header-title">后台管理系统</h1>
    <ul>
      <li class="header-father" :class="{active:item.show}"  @click="changeli(index,item)" v-for="(item,index) in headerData" :key="index">
         {{item.name}}
         <i style="line-height: 35px;" class="glyphicon pull-right" :class="{'glyphicon-chevron-down': item.show, 'glyphicon-chevron-right': !item.show}"></i>
          <ul v-show="item.show">
            <li  v-for="(list,index) in item.list" :key="index">
              <a  class="header-son" @click.stop="doThis(item.list[index].b,index)" :class="{act:isact == index}">
                <span class="header-content">{{list.a}}</span>
              </a>
            </li>
          </ul>
      </li>
    </ul>
    <div class="admin">
      <i class="quit glyphicon glyphicon-off" @click="out()"></i>
      <a class="identity" href="">admin</a>
      <a class="identity" href="">管理员</a>
    </div> 
  </div>
  <router-view></router-view>
</div>
</template>

<script>
$("#abc").append("Hello world!");
export default {
  data() {
    return {
      headerData: [
        {
          name: "信息管理",
          list: [
            { a: "公司列表", b: "/home/dist" },
            { a: "职位列表", b: "/home/dist" }
          ],
          show: false
        },
        {
          name: "内容管理",
          list: [{ a: "Article列表", b: "/home/list" }],
          show: false
        },
        {
          name: "后台管理",
          list: [
            { a: "账号管理", b: "/home/dist" },
            { a: "角色管理", b: "/home/dist" },
            { a: "修改管理", b: "/home/dist" },
            { a: "模块管理", b: "/home/dist" }
          ],
          show: false
        }
      ],
      isact: this.isact
    };
  },
  methods: {
    // 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
    changeli: function(index, item) {
      //状态保存
      sessionStorage.setItem("session", index);
      this.headerData.forEach(i => {
        // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
        if (i.show != this.headerData[index].show) {
          i.show = false;
        }
      });
      item.show = !item.show;
    },
    doThis: function(x, y) {
      // console.log(this.isact);
      this.isact = y;
      this.$router.push({ path: x });
      sessionStorage.setItem("sessiony", y);
    },
    out() {
      this.$http.post("/api/a/logout").then(result => {
        console.log(result.data);
        if (result.data.code == 0) {
          alert("退出登陆");
          this.$router.push({ path: "/" });
        }
      });
    }
  },
  mounted() {
    if (window.sessionStorage.getItem("session")) {
      var session = parseInt(window.sessionStorage.getItem("session"));
      console.log(session);
      this.headerData[session].show = true;
    }
    if (window.sessionStorage.getItem("sessiony")) {
      var y = parseInt(window.sessionStorage.getItem("sessiony"));
      this.isact = y;
    }
  }
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  text-align: center;
  background-color: #232a3a;
}
.header-title {
  margin: 0;
  margin-bottom: 20px;
  border-bottom: solid 1px #999999;
  font-size: 20px;
  font-weight: 700;
  line-height: 50px;
  color: #fff;
}
.active {
  border-bottom: solid 1px #999999;
}
.header-father {
  padding: 15px 0 0 0;
  line-height: 35px;
  font-size: 16px;
  color: #fff;
}
.header-son {
  display: inline-block;
  padding-right: 14px;
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  background: #336666;
  color: #fff;
}
.header-son:hover {
  background: #99ccff;
}
.act {
  background: #333399;
}
.header-content {
  display: inline-block;
  width: 100%;
}
a:hover {
  text-decoration: none;
}
.goto {
  position: absolute;
  left: 0;
  width: 220px;
  height: 50px;
}
ul {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  list-style: none;
}
.admin {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 220px);
  height: 50px;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-bottom: solid 1px #ededed;
  z-index: 9999;
}
.identity {
  width: 70px;
  line-height: 30px;
  border-right: solid 1px #c9c9c9;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.quit {
  width: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
