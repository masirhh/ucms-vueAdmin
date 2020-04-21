<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页轮播图管理</div>
    <div class="tips">
      <div>
        <span>注意！首页轮播图的编号如图示，请谨慎选择编号位置!</span>
      </div>
      <div>
        <span>上方图片大小为1920*400px</span>
      </div>
      <div>
        <span>右方图片大小为320*456px</span>
      </div>
      <div class="tips-img">
        <img src="~@/assets/home/tips.png" alt />
      </div>
    </div>
    <div class="inputs">
      <el-select v-model="poscode" placeholder="请选择图片区域">
        <el-option v-for="item in 10" :key="item" :label="item" :value.sync="item"></el-option>
      </el-select>
      <el-upload
        class="upload-demo"
        drag
        :data="comppos"
        :on-success="onsuccess"
        :on-error="onerror"
        name="img"
        action="http://localhost:18082/ucms/file/uphome"
        :multiple="false"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传png文件</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { upHomeImg } from "@/network";

export default {
  name: "Dashboard",
  data() {
    return {
      poscode: 1
    };
  },
  computed: {
    comppos() {
      return {
        pos: this.poscode
      };
    }
  },
  methods: {
    onsuccess() {
      this.$message.success("修改成功");
    },
    onerrror() {
      this.$message.error("修改失败");
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
