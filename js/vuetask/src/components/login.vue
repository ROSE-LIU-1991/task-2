<template>
<div class="img">
<div class="page-container">
            <h1 style="margin:0;">后台登陆</h1>
            <form style="margin:0;  position: relative;" name="loginform">
                <input type="text" name="namefrom" class="username" placeholder="请输入账号" v-model="username">
                <span class="warn-top" v-if ="!username">*</span>
                <input type="password" name="password" class="password" placeholder="请输入密码" v-model="password">
                <span class="warn-buttom" v-if ="!password">*</span>
                <p class="message" v-show="isShow">{{message}}</p>
                <p style="height:24px;margin:0;" v-show="!isShow"></p>
                <button style="margin-top:10px" type="button" @click="postData">登陆</button>
            </form>
        </div>
</div>
</template>

<script>
var qs = require("qs");
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      isShow: true
    };
  },
  methods: {
    postData() {
      this.$http
        .post(
          // "/api/a/login?" + "name=admin&pwd=123456",
          "/api/a/login",
          // { name: "admin", pwd: 123456 },
          qs.stringify({ name: this.username, pwd: this.password }),
          {
            headers: { "Content-type": "application/x-www-form-urlencoded" }
          }
        )
        .then(result => {
          console.log(result.data);
          if (result.data.code == 0) {
            this.isShow = !true;
            alert("登陆成功");
            window.location.href = "http://localhost:8080/home/hellow";
          } else {
            this.message = result.data.message;
            setTimeout(() => {
              this.isShow = !true;
            }, 500);
          }
        });
      // fetch("/api/a/login", {
      //   method: "post",
      //   headers: {
      //     "Content-type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     name: "admin",
      //     pwd: 123456
      //   })
      // })
      //   .then(function(result) {
      //     return result.json();
      //   })
      //   .then(data => {
      //     console.log(data);
      //   });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  padding: 40% auto;
  display: flex;
  height: 100vh;
  background: url(../assets/1.png);
}
.message {
  margin: 0;
  margin-top: 10px;
  height: 14px;
  font-size: 14px;
  color: #ff0000;
}
.warn-top {
  position: absolute;
  top: 25px;
  left: 14%;
  font-size: 40px;
  font-weight: 700;
  color: #ff0000;
}
.warn-buttom {
  position: absolute;
  top: 90px;
  left: 14%;
  font-size: 40px;
  font-weight: 700;
  color: #ff0000;
}

.page-container {
  margin: 200px auto auto auto;
  padding: 35px 55px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 30px;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

input {
  width: 60%;
  height: 42px;
  margin-top: 25px;
  padding: 0 15px;
  background: #2d2d2d; /* browsers that don't support rgba */
  background: rgba(45, 45, 45, 0.15);
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #3d3d3d; /* browsers that don't support rgba */
  border: 1px solid rgba(255, 255, 255, 0.15);
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

input:-moz-placeholder {
  color: #fff;
}
input:-ms-input-placeholder {
  color: #fff;
}
input::-webkit-input-placeholder {
  color: #fff;
}

input:focus {
  outline: none;
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
  width: 60%;
  height: 44px;
  margin-top: 25px;
  padding: 0;
  background: #ef4300;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #ff730e;
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

button:hover {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button:active {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
    0 1px 4px 0 rgba(0, 0, 0, 0.1);

  border: 0px solid #ef4300;
}
</style>  