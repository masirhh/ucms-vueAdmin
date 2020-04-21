<template>
  <div class="newclub">
    <div class="newclubtable">
      <el-form label-width="100px">
        <el-form-item label="社团名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="社团类型">
          <el-select v-model="type" placeholder="请选择社团类型">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社团管理员">
          <el-select v-model="admin" placeholder="请选择社团管理员">
            <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初始头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:18082/ucms/file"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="avatarUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUser, reqClubtype, reqClub } from "@/network";

export default {
  name: "newclub",
  data() {
    return {
      name: "",
      type: "",
      admin: "",
      users: "",
      types: "",
      imageUrl: false,
      avatarUrl: "",
      avatarId: ""
    };
  },
  methods: {
    onSubmit() {
      reqClub({
        method: "post",
        data: {
          name: this.name,
          type: this.type,
          admin: this.admin,
          avatar: this.avatarId
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    handleAvatarSuccess(res) {
      this.avatarUrl = res.data.path;
      this.avatarId = res.data.id;
      this.imageUrl = true;
    }
  },
  created: function() {
    reqUser({
      method: "get",
      url: "getUser"
    }).then(res => {
      this.users = res;
    });
    reqClubtype({
      method: "get"
    }).then(res => {
      this.types = res;
    });
  }
};
</script>

<style scoped>
.newclub {
  margin: 30px;
}
.newclubtable {
  width: 300px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>