<template>
  <div class="clubtype">
    <div class="newtype">
      <el-button type="primary" @click="dialogFormVisible=true">新建类型</el-button>
    </div>
    <div class="typetable">
      <el-table :data="types" border style="width: 100%">
        <el-table-column fixed prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="新建社团类型" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="类型名称">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型描述">
          <el-input v-model="desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNewType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqClubtype } from "@/network";

export default {
  name: "clubtype",
  data() {
    return {
      types: [],
      dialogFormVisible: false,
      name: "",
      desc: ""
    };
  },
  methods: {
    handleNewType() {
      reqClubtype({
        method: "post",
        data: {
          name: this.name,
          description: this.desc
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("操作失败");
          this.dialogFormVisible = false;
        }
      });
    }
  },
  created: function() {
    reqClubtype({
      method: "get"
    }).then(res => {
      this.types = res;
    });
  }
};
</script>

<style scoped>
.clubtype {
  margin: 30px;
}
.newtype {
  margin-bottom: 20px;
}
</style>