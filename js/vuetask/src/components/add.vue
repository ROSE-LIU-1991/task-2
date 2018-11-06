<template>
    <div class="add-box">
        <div class="add-title">
        <p class="title-txt" id="articletitle">新增Article</p>    
        </div>
        <div class="add-word">
            <div class="add-input">
                <p class="add-txt">标题名称</p>
                <input class="inputbox" type="text" v-model="addTitle" v-validate="'required'" name="title" placeholder="请输入你的标题">
                <span class="add-hint" v-show="errors.has('title')"> {{errors.first('title')}}</span>
            </div>
            <div class="add-input">
                <p class="add-txt">类&emsp;&emsp;型</p>
                <el-select style="width:140px;margin-left:20px;" v-model="type" placeholder="请选择">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.type"></el-option>
                </el-select>
                <span class="add-hint" v-show="this.type ==null">请选择类型</span>
                <el-select  v-show ="this.type ==3" style="width:140px;margin-left:20px;" v-model="industry" placeholder="请选择">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.industry"></el-option>
                </el-select>
                <span class="add-hint" v-show="this.type ==3&this.industry ==null">请选择产业</span>
            </div>
            <div class="add-input">
                <p class="add-txt">说&emsp;&emsp;明</p>
                <div id="editorElem" style="text-align:left"></div>
                     <!-- <quill-editor style="margin-left:20px;width:90%;" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" 
                     @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor> -->
            </div>
            <div class="add-input">
                <p class="add-txt">跳转链接</p>
                <input class="inputbox" type="text" v-model="addUrl" v-validate="'required|url:require_protocol'" name="url" placeholder="请输入正确的url地址">
                <span class="add-hint" v-show="errors.has('url')"> {{errors.first('url')}}</span>
            </div>
            <div class="add-input">
                <p class="add-txt">配&emsp;&emsp;图</p>
                <input type="file" class="add-img" id="uoload" name="file" accept="image/*" ng-model="addFile" @change="fileChange"/>
                <el-button style="margin-left: -104px;" type="primary" round>上传图片</el-button>
                <div class="add-preview">
                    <img src="/static/image/avatar.png" id="imges">
                </div>
            </div>
            <table class="table">
                <tr>
                    <th style="text-align: center;">图片名字</th>
                    <th style="text-align: center;">文件大小</th>
                    <th style="text-align: center;">上传进度</th>
                    <th style="text-align: center;">上传结果</th>
                    <th style="text-align: center;">操作</th>
                </tr>
                <tr>
                    <th style="text-align: center;">{{imgName}}</th>
                    <th style="text-align: center;">{{imgSize}}</th>
                    <th style="text-align: center;">
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="this.widthPro" status="success"></el-progress>
                    </th>
                    <th style="text-align: center;">{{this.message}}</th>
                    <th style="text-align: center;">
                        <el-button type="warning war-btn" @click="loading" v-on="stop(this.widthPro)"  v-bind:disabled="!imgName||loaddisabled">上传</el-button>
                        <el-button type="danger war-btn" @click="abandon">放弃</el-button>
                    </th>
                </tr>
            </table>
            <div style="text-align:left"> 
                <el-button type="success" v-on:click="data(x=1)" v-bind:disabled="errors.has('title')||errors.has('url')||this.type ==null||this.type ==3&this.industry ==null||this.src==undefined">立即上线</el-button>
                <el-button type="warning" v-on:click="data(x=2)" v-bind:disabled="errors.has('title')||errors.has('url')||this.type ==null||this.type ==3&this.industry ==null||this.src==undefined">保存为草稿</el-button>
                <el-button style="float:right" type="danger" @click="cancel">取消</el-button>
            </div>
        </div>    
    </div>
</template>

<script>
//表单验证
import VeeValidate, { Validator } from "vee-validate";
//修改默认错误信息
const dictionary = {
  zh_CN: {
    messages: {
      url: () => "url格式写错辣！",
      required: () => "这里不能空着"
    }
  }
};
Validator.updateDictionary(dictionary);
import E from "wangeditor";
import { Stats } from "fs";
var qs = require("qs");
export default {
  data() {
    return {
      addTitle: "",
      type: "",
      options1: [
        {
          type: null,
          label: "全部"
        },
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
      industry: "",
      options2: [
        {
          type: null,
          label: "全部"
        },
        {
          industry: 0,
          label: "移动互联网"
        },
        {
          industry: 1,
          label: "电子商务"
        },
        {
          industry: 2,
          label: "企业服务"
        },
        {
          industry: 3,
          label: "O2O"
        },
        {
          industry: 4,
          label: "教育 "
        },
        {
          industry: 5,
          label: "金融  "
        },
        {
          industry: 6,
          label: "游戏 "
        }
      ],
      editorContent: "",
      editorContent1: this.editorContent1,
      addUrl: "",
      addFile: "",
      src: undefined,
      imgName: "",
      imgSize: "",
      widthPro: this.widthPro,
      message: "",
      createAt: "",
      loaddisabled: this.loaddisabled
    };
  },
  methods: {
    //图片预览
    fileChange: function(e) {
      var file = e.target.files[0];
      this.file = file;
      this.imgName = file.name;
      console.log(this.imgName);
      var imgSize = file.size / 1024;
      var size = imgSize.toFixed(2);
      this.widthPro = 0;
      size >= 1024
        ? (this.imgSize = (size / 1024).toFixed(2) + "MB")
        : (this.imgSize = size + "KB");
      if (size >= 2048) {
        alert("请上传大小不要超过2MB的图片");
      } else {
        if (window.FileReader) {
          var fr = new FileReader();
          fr.onloadend = function() {
            console.log(fr.result);
            this.src = fr.result;
            document.getElementById("imges").src = this.src;
          };
          fr.readAsDataURL(file);
        }
      }
    },
    //图片上传
    loading: function() {
      var formData = new FormData();
      formData.append("file", this.file);
      console.log(formData);
      this.message = "上传中";
      this.$http
        .post("/api/a/u/img/task", formData, {
          headers: {
            "Content-Type": undefined
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.src = res.data.data.url;
            this.loaddisabled = true;
            this.time = setInterval(() => {
              this.widthPro++;
            }, 10);
          } else if (res.data.code != 0) {
            this.message = "上传失败";
          }
        })
        .catch(err => {
          console.log(err);
          this.message = "上传异常";
          alert("图片上传异常，请检查原因重新上传");
        });
    },
    //停止定时器
    stop: function(a) {
      if (a == 100) {
        clearInterval(this.time);
        this.message = "上传成功";
      }
    },
    //放弃上传
    abandon: function() {
      this.addFile = "";
      this.src = undefined;
      document.getElementById("imges").src = "";
      this.imgName = "";
      this.imgSize = "";
      this.widthPro = 0;
      this.message = "";
      this.loaddisabled = false;
    },
    //取消按钮
    cancel: function() {
      this.$router.push({ path: "/home/list" });
    },
    data: function(x) {
      var editor = new E("#editorElem");
      if (this.$route.query.id) {
        if (this.editorContent == "") {
          this.editorContent = this.editorContent1;
        }
        console.log(this.editorContent);
        console.log(this.editorContent1);
        var Status;
        x == 1 ? (Status = 2) : (Status = 1);
        this.$http
          .put(
            "/api/a/u/article/" + this.$route.query.id,
            qs.stringify({
              title: this.addTitle,
              status: Status,
              type: this.type,
              industry: this.industry,
              content: this.editorContent,
              img: this.src,
              url: this.addUrl,
              createAt: this.createAt
            })
          )
          .then(res => {
            if (res.data.code == 0) {
              this.$router.push({ path: "/home/list/" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        var Status;
        x == 1 ? (Status = 2) : (Status = 1);
        this.$http
          .post(
            "/api/a/u/article",
            qs.stringify({
              title: this.addTitle,
              status: Status,
              type: this.type,
              industry: this.industry,
              content: this.editorContent,
              img: this.src,
              url: this.addUrl
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$router.push({ path: "/home/list/" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    //富文本
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = editor.txt.html();
    };
    editor.create();
    //编辑渲染
    if (this.$route.query.id) {
      console.log(this.$route.query.id);
      document.getElementById("articletitle").innerHTML = "编辑Article";
      this.$http
        .get("/api/a/article/" + this.$route.query.id)
        .then(res => {
          console.log(res);
          var data = res.data.data.article;
          this.addTitle = data.title;
          this.type = data.type;
          this.industry = data.industry;
          editor.txt.html(data.content);
          this.editorContent1 = data.content;
          this.addUrl = data.url;
          this.src = data.img;
          document.getElementById("imges").src = this.src;
          this.createAt = data.createAt;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>   

<style  scoped>
#imges {
  max-width: 300px;
}
#editorElem {
  margin-left: 20px;
  width: 80%;
  border: 1px solid #c9c9c9;
}
.add-box {
  position: absolute;
  top: 90px;
  left: 270px;
  right: 50px;
  margin-bottom: 50px;
  border: solid 1px #e6e6e6;
  border-radius: 5px;
  z-index: -1;
}
.add-title {
  padding: 10px 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: solid 0.01rem #a2a2a2;
  text-align: left;
  color: #fff;
  background-color: #616663;
}
.title-txt {
  margin: 0;
  padding-left: 20px;
  font-weight: 700;
}
.add-word {
  padding: 20px 100px;
}
.add-txt {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}
.add-input {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 10px 0;
}
.inputbox {
  margin-left: 20px;
  padding-left: 10px;
  width: 80%;
  height: 40px;
  border-radius: 5px;
  border: solid 1px #a9a9a9;
}
.add-img {
  margin-left: 20px;
  width: 100px;
  height: 40px;
  opacity: 0;
  z-index: 9999;
}
.add-preview {
  position: relative;
  left: 20px;
  display: inline-block;
  padding: 1px;
  width: 430px;
  height: 300px;
  line-height: 300px;
  vertical-align: middle;
  border: 0.01rem transparent dashed;
}
.add-bottom {
  position: absolute;
  left: 2.8rem;
  bottom: -200px;
  right: 0.3rem;
  width: 100%;
  height: 1px;
}
.war-btn {
  padding: 0;
  width: 60px;
  height: 30px;
}
.add-hint {
  margin-left: 20px;
  font-weight: 700;
  color: #ff0000;
}
</style>
