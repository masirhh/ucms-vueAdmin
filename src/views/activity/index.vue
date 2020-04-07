<template>
  <div class="activity">
    <div class="activitytable">
      <el-table :data="acts" border style="width: 100%">
        <el-table-column fixed prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="description" label="简介"></el-table-column>
        <el-table-column prop="organizeTime" :formatter="formattime" label="活动时间"></el-table-column>
        <el-table-column prop="organizeLocation" label="活动地点"></el-table-column>
        <el-table-column prop="userId" label="发布者"></el-table-column>
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
import { reqActivities } from "@/network";

export default {
  name: "activity",
  data() {
    return {
      acts: []
    };
  },
  methods: {
    handledelete(row) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqActivities({
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
    formattime(row) {
      let ct = new Date(row.organizeTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqActivities({
      method: "get",
      url: "/getallacts"
    }).then(res => (this.acts = res));
  }
};
</script>

<style>
.activity {
  margin: 30px;
}
</style>