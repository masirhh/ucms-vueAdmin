<template>
  <div class="clublist">
    <div class="club-table">
      <el-table :data="clubs" border style="width: 100%">
        <el-table-column fixed prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="createTime" :formatter="formattime" label="创立时间"></el-table-column>
        <el-table-column prop="admin" label="管理员"></el-table-column>
        <el-table-column prop="members" label="人数"></el-table-column>
        <el-table-column prop="enableFlag" label="是否启用" :formatter="formatenable"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleChangeAdmin(scope.row)" type="text" size="small">变更管理员</el-button>
            <el-button
              @click="handleChangeEnable(scope.row)"
              v-if="scope.row.enableFlag==1"
              type="text"
              size="small"
            >禁用</el-button>
            <el-button @click="handleChangeEnable1(scope.row)" v-else type="text" size="small">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="选择管理员" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="管理员" label-width="200px">
            <el-select v-model="newadmin" placeholder="请选择管理员">
              <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeAdminOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqClub, reqUser } from "@/network/index.js";

export default {
  name: "clublist",
  data() {
    return {
      clubs: [],
      dialogFormVisible: false,
      users: "",
      currentclub: "",
      oldadmin: "",
      newadmin: ""
    };
  },
  methods: {
    handleChangeAdmin(row) {
      reqUser({
        method: "get",
        url: "getUser"
      }).then(res => {
        this.users = res;
      });
      this.oldadmin = row.admin;
      this.currentclub = row.id;
      this.dialogFormVisible = true;
    },
    changeAdminOk() {
      reqClub({
        method: "put",
        data: {
          id: this.currentclub,
          admin: this.newadmin
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
      reqUser({
        method: "put",
        data: {
          id: this.oldadmin,
          userType: 1
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
      reqUser({
        method: "put",
        data: {
          id: this.newadmin,
          userType: 2
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
      this.dialogFormVisible = false;
    },
    handleChangeEnable(row) {
      reqClub({
        method: "put",
        data: {
          id: row.id,
          enableFlag: 0
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    handleChangeEnable1(row) {
      reqClub({
        method: "put",
        data: {
          id: row.id,
          enableFlag: 1
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    formattime(row) {
      let ct = new Date(row.createTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    },
    formatenable(row) {
      if (row.enableFlag === 1) {
        return "启用";
      }
      return "禁用";
    }
  },
  created: function() {
    reqClub({
      url: "/getall"
    }).then(res => {
      this.clubs = res;
    });
  }
};
</script>

<style scoped>
.clublist {
  margin: 30px;
}
</style>