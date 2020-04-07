<template>
  <div class="users">
    <div class="userstable">
      <el-table :data="users" border style="width: 100%">
        <el-table-column fixed prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="账户"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="sex" :formatter="formatsex" label="性别"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="userType" label="账户类型" :formatter="formattype"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handledelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reqUser } from "@/network";
export default {
  name: "users",
  data() {
    return {
      users: []
    };
  },
  methods: {
    handledelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqUser({
            method: "delete",
            data: {
              id: row.id
            }
          }).then(res => {
            if (res != null)
              this.$message({
                type: "success",
                message: "删除成功!"
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    formatsex(row) {
      switch (row.sex) {
        case 1: {
          return "男";
          break;
        }
        case 2: {
          return "女";
          break;
        }
        case 3: {
          return "保密";
          break;
        }
      }
    },
    formattype(row) {
      switch (row.userType) {
        case 1: {
          return "普通用户";
          break;
        }
        case 2: {
          return "社团管理员";
          break;
        }
        case 3: {
          return "超级用户";
          break;
        }
      }
    }
  },
  created: function() {
    reqUser({
      method: "get",
      url: "getUser"
    }).then(res => {
      this.users = res;
    });
  }
};
</script>

<style .scoped>
.users {
  margin: 30px;
}
</style>