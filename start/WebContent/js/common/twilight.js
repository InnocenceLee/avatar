/*
* Twilight JavaScript Module Framework v1.2.0
* Copyright 2014, Troy
* Create: 2014-7-16
* Update: 2015年3月16日13:58:04
* Remark: 1. 1.2版本中添加$t.config()方法, 主要用于第三方库的配置
*            1.2版本define定义模块demo如下:
*            $t.define("b", { a: "aModule"}, function ($t, deps, plugin) {
*                return {
*                    name: "this is b",
*                    a: deps.a
*                };
*            });
*         2. define中的factory必须为3个参数, 其中第三个位config中配置的plugin
***********************************************************************************************************************************         
*         1. 1.1版本中添加依赖关系模型, 如果一个模块A定义了依赖模块B.那么在模块A之中就不需要再using模块B了.现在的define定义如下
*               $t.define(moduleName, deps?, factory), 其中deps(依赖)为可选(向下兼容)
*         2. 剔除了不常使用的$t(moduleName)方法.
*         3. 去除了twilightjs对第三方扩展的依赖, 自身不使用任何第三方扩展.
*         4. 优化了部分逻辑
*         5. 依赖模型demo如下:
*            $t.define("aModule", function ($t, deps) {
*                return {
*                    name: "this is a"
*                };
*            });

*            $t.define("b", { a: "aModule"}, function ($t, deps) {
*                return {
*                    name: "this is b",
*                    a: deps.a
*                };
*            });
***********************************************************************************************************************************
*         1. 1.0.12中新增$t()方法, 此方法与$t.using相同
***********************************************************************************************************************************
*         1. 1.0.11中新增$t.has方法, 该方法主要用于检查模块是否已经存在.
***********************************************************************************************************************************
*         1. 1.0.1中去除了 window.Twilight, window.util两个命名空间的引用.统一使用$t
*         2. 1.0.1中提升$t的独立性, $t不允许与其他库共享. 
***********************************************************************************************************************************
*         1. 1.0版本更新了大规模算法, 剔除了$t.ui, $t.logic两个包.
*         2. 去除了直接 $t.模块名 访问方式, 现只能通过$t.using进行模块访问.         
*/
!(function (window, factory) {
    window.$t = factory(window.$t = {});
} (window, function ($t) {
    var moduleArray = [],
        twilightConfig = {
            plugin: {
                name: "$"
            }
        };

    var isFunction = function (checkObj) {
        return typeof checkObj === "function";
    };
    var findCurrModule = function (moduleName) {
        for (var i = 0; i < moduleArray.length; i++) {
            if (moduleArray[i].name === moduleName) {
                return moduleArray[i];
            }
        }
        return undefined;
    }

    $t.config = function (config) {
        if (!config)
            return;
        for (var i in config) {
            twilightConfig[i] = config[i];
        }
    };

    //向外部暴露定义自定义对象/函数方法.
    $t.define = function (moduleName, deps, factory) {
        if ($t.hasOwnProperty(moduleName)) {
            alert("twilight message: contains this module, module name is: " + moduleName);
            return;
        }

        if (isFunction(deps)) {
            factory = deps;
            deps = undefined;
        }

        moduleArray.push({
            usinged: false,
            factory: factory,
            name: moduleName,
            deps: deps
        });
    };

    $t.has = function (moduleName) {
        if (findCurrModule(moduleName)) {
            return true;
        } else {
            return false;
        }
    };

    $t.using = function (moduleName) {
        var currModule = findCurrModule(moduleName);

        if (!currModule) {
            alert("twilight message: " + moduleName + " is undefined");
            return;
        }

        if (!currModule.usinged) {
            if (!isFunction(currModule.factory)) {
                alert("twilight message: " + moduleName + " is not a function");
                return;
            }

            //重新封装依赖项
            if (currModule.deps) {
                for (var i in currModule.deps) {
                    currModule.deps[i] = $t.using(currModule.deps[i]);
                }
            }

            //重新封装using返回对象
            currModule.factory = currModule.factory($t, currModule.deps ? currModule.deps : undefined, window[twilightConfig.plugin.name] ? window[twilightConfig.plugin.name] : undefined);
            currModule.usinged = true;
        }
        return currModule.factory;
    };

    $t.config();
    return $t;
}));
