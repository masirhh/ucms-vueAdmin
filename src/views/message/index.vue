<template>
  <div class="message">
    <div class="messagetable">
      <div class="newmsg">
        <el-button type="primary" @click="dialogFormVisible=true">发送消息</el-button>
      </div>
      <el-table :data="messages" border style="width: 100%">
        <el-table-column fixed prop="id" label="id"></el-table-column>
        <el-table-column prop="fromUserId" label="发送者id"></el-table-column>
        <el-table-column prop="fromName" label="发送者"></el-table-column>
        <el-table-column prop="toUserId" label="接收者id"></el-table-column>
        <el-table-column prop="toName" label="接收者"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="createTime" :formatter="formattime" label="发送时间"></el-table-column>
        <el-table-column prop="checked" :formatter="formatcheck" label="是否已读"></el-table-column>
        <el-table-column prop="opreated" :formatter="formattype" label="消息类型"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handledelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新建普通消息" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="接收者">
            <el-select v-model="getter" placeholder="请选择接收者">
              <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息内容">
            <el-input v-model="desc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSend">发送</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqMessage, reqUser } from "@/network";

export default {
  name: "message",
  data() {
    return {
      messages: [],
      dialogFormVisible: false,
      getter: "",
      users: "",
      desc: ""
    };
  },
  methods: {
    handleSend() {
      if (this.desc != "") {
        reqMessage({
          method: "post",
          data: {
            fromUserId: 1,
            toUserId: this.getter,
            content: this.desc,
            opreated: 1
          }
        }).then(res => {
          if ("content" in res) {
            this.$message({
              type: "success",
              message: "发送成功!"
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              type: "error",
              message: "发送失败!"
            });
            this.dialogFormVisible = false;
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "发送失败!消息内容为空"
        });
      }
    },
    handledelete(row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqMessage({
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
      let ct = new Date(row.createTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    },
    formatcheck(row) {
      switch (row.checked) {
        case 0: {
          return "未读";
          break;
        }
        case 1: {
          return "已读";
          break;
        }
      }
    },
    formattype(row) {
      switch (row.opreated) {
        case 1: {
          return "普通信息";
          break;
        }
        case 2: {
          return "申请加入";
          break;
        }
        case 3: {
          return "申请退出";
          break;
        }
      }
    }
  },
  created: function() {
    reqMessage({
      method: "get",
      url: "/getallmessage"
    }).then(res => {
      this.messages = res;
    });
    reqUser({
      method: "get",
      url: "getUser"
    }).then(res => {
      this.users = res;
    });
  }
};
</script>

<style scoped>
.message {
  margin: 30px;
}
.newmsg {
  margin-bottom: 20px;
}
</style>