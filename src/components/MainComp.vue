<template>
  <div class="hello">
    <div style="font-size: 14px" class="title-container">
      {{ dataList[0] && dataList[0][pageIndex - 1]['docstring'] }}
    </div>

    <div v-for="(_, index) in dataList" :key="index" class="code-container">
      <b>{{ funcNames[index] }}</b>
      <br />
      <div class="row-container">
        <Code ref="mycode" class="code-inner"></Code>
        <div class="desc-container">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="is pass">{{
              dataList[index] &&
              dataList[index][pageIndex - 1]['generate_results'][0]['is_pass']
            }}</el-descriptions-item>
            <el-descriptions-item label="error message">{{
              dataList[index] &&
              dataList[index][pageIndex - 1]['generate_results'][0][
                'errormessage'
              ]
            }}</el-descriptions-item
            ><el-descriptions-item label="detail message">{{
              dataList[index] &&
              dataList[index][pageIndex - 1]['generate_results'][0][
                'error_detail_message'
              ]
            }}</el-descriptions-item>
            <el-descriptions-item label="code level">{{
              dataList[index] && dataList[index][pageIndex - 1]['code_level']
            }}</el-descriptions-item>
            <el-descriptions-item label="project name">{{
              dataList[index] && dataList[index][pageIndex - 1]['project_name']
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <!-- <div class="code-container">
      {{ funcNames[1] }}
      <br />
      <Code ref="mycode1" class="code-inner"></Code>
    </div>
    <div class="code-container">
      {{ funcNames[2] }}
      <br />
      <Code ref="mycode2" class="code-inner"></Code>
    </div> -->
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="1"
        layout="total, prev, pager, next, jumper"
        :total="dataList[0] && dataList[0].length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fileName, funcNames, path } from '@/config.js';

import Code from './Code';

export default {
  name: 'MainComp',
  props: {
    msg: String,
  },
  components: {
    Code,
  },
  data: function () {
    return {
      dataList: [],
      funcNames: funcNames,
      codeList: [],
      pageIndex: 1,
    };
  },
  created: function () {
    this.addKeyDownListener();

    this.changeCode(this.pageIndex - 1);
    setTimeout(() => {
      for (let i = 0; i < this.dataList.length; i++) {
        this.$refs.mycode[i].code_text = this.codeList[i];
      }
    });
    console.log(this.dataList);
  },
  methods: {
    handleCurrentChange(val) {
      if (val <= 1) {
        val = 1;
      } else if (val >= this.dataList[0].length) {
        val = this.dataList[0].length;
      }
      this.pageIndex = val;
      this.changeCode(val - 1);
    },
    changeCode(index) {
      this.codeList = [];
      this.dataList = [];
      for (let funcName of funcNames) {
        let data = require(`../../static/${path}/${funcName}/${fileName}`);
        this.dataList.push(data);
        let unformattedCode =
          data[index]['generate_results'][0]['generate_code'] || '';
        // let formattedCode = prettier.format(unformattedCode, {
        //   parser: 'java',
        //   plugins: [parserJava],
        // });
        this.codeList.push(unformattedCode);
      }
      if (this.$refs.mycode) {
        for (let i = 0; i < this.$refs.mycode.length; i++) {
          this.$refs.mycode[i].code_text = this.codeList[i];
        }
      }
    },
    addKeyDownListener: function () {
      var that = this;
      document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowRight') {
          that.handleCurrentChange(that.pageIndex + 1);
        } else if (e.key == 'ArrowLeft') {
          that.handleCurrentChange(that.pageIndex - 1);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-container {
  padding-left: 20px;
  white-space: pre-line;
  height: 10vh;
  overflow-y: scroll;
}
.code-container {
  padding-left: 10px;
  padding-right: 10px;
  height: 30vh;
  background-color: aliceblue;
}

.code-inner {
  margin-top: 8px;
  height: 90%;
  width: 60%;
}
.row-container {
  height: 100%;
  width: 100%;
  display: flex;
}
.desc-container {
  margin-top: 8px;
  padding-left: 10px;
  width: 40%;
}
</style>
