// 应用特定的 d2js 入口文件，根据本应用设置修改本文件名称

imports('d2js.js')

imports("./d2js/node.js");

imports("./permission.js");

imports("./jsFunctionExtends.js");

defineNodeSql(d2js.executor);

initTypeRelations(d2js.executor);
