// 应用特定的 jssp 入口文件，根据本应用设置修改本文件名称

imports('jssp.js')

imports("../config/website.js");

imports('d2js.js')

imports("./d2js/node.js");

imports("./permission.js");

defineNodeSql(d2js.executor);

initTypeRelations(d2js.executor);
