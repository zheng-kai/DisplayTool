<template>
  <div>
    <codemirror
      v-model="code_text"
      :options="cmOptions"
      class="code"
    ></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/theme/idea.css'; //导入选中的theme主题,与初始化theme配置一致
require('codemirror/mode/clike/clike.js');
require('codemirror/addon/edit/closebrackets.js');
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/hint/show-hint.js'; //导入自动提示核心文件
import 'codemirror/addon/display/autorefresh.js';

export default {
  name: 'CodeComp',
  props: {},
  methods: {
    // select(index) {
    //   this.selectedIndex = index;
    //   let extension = this.fileNames[index].split('.')[1];
    //   if (['c', 'h', 'cpp'].indexOf(extension) >= 0) {
    //     this.cmOptions.mode = 'text/x-c';
    //   } else if (['java', 'jasm'].indexOf(extension) >= 0) {
    //     this.cmOptions.mode = 'text/x-java';
    //   }
    // },
  },
  components: {
    codemirror,
  },
  data() {
    return {
      cmOptions: {
        mode: 'text/x-java', //第一个将模式名称映射到它们的构造函数，第二个将MIME类型映射到模式规范。
        theme: 'idea', //编辑器样式的主题
        indentWithTabs: true, //在缩进时，是否tabSize 应该用N个制表符替换前N *个空格。默认值为false。
        smartIndent: true, //是否使用模式提供的上下文相关缩进（或者只是缩进与之前的行相同）。默认为true。
        lineNumbers: true, //是否在编辑器左侧显示行号。
        matchBrackets: true, //括号匹配
        autofocus: true, //可用于使CodeMirror将焦点集中在初始化上
        autoCloseBrackets: true, // 自动补全括号
        autoRefresh: true,
      },
      code_text: '',
    };
  },
};
</script>

<style>
.CodeMirror {
  height: 100% !important;
}
.code {
  height: calc(100%) !important;
}
</style>
