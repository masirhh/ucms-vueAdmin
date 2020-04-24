<template>
  <div class="file">
    <el-table :data="filelist" border style="width: 100%">
      <el-table-column fixed prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="原文件名"></el-table-column>
      <el-table-column prop="path" label="文件路径"></el-table-column>
      <el-table-column prop="createTime" label="上传时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <a :href="scope.row.path" target="_blank">
            <el-button type="text" size="small">查看</el-button>
          </a>
          <el-button @click="handledelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqFileUrl } from "@/network";

export default {
  name: "ufiles",
  data() {
    return {
      filelist: []
    };
  },
  methods: {
    handledelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqFileUrl({
            method: "delete",
            data: {
              id: row.id
            }
          }).then(res => {
            if (res == true)
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
    }
  },
  created: function() {
    reqFileUrl({
      method: "get",
      url: "/filelist"
    }).then(res => {
      this.filelist = res;
    });
  }
};
</script>

<style scoped>
.file {
  margin: 30px;
}
</style>