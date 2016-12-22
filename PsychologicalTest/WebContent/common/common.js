if (!Array.prototype.map) {
	Array.prototype.map = function(fn, scope) {
		var result = new Array();
		for (var i = 0; i < this.length; i++) {
			result.push(fn.call(scope, this[i], i));
		}
		return result;
	};
}
if (!String.prototype.repeat) {
	String.prototype.repeat = function(n) {
		var s = '';
		for (var i = 0; i < n; i++) {
			s += this;
		}
		return s;
	};
}


if(Array.prototype.forEach == null) {
	Array.prototype.forEach = function(fn, scope) {
		for (var i = 0; i < this.length; i++) {
			fn.call(scope, this[i], i);
		}
	};
}

if(Array.prototype.every == null) {
	Array.prototype.every = function(fn, scope) {
		for (var i = 0; i < this.length; i++) {
			if (!fn.call(scope, this[i], i))
				return false;
		}
		return true;
	};
}

if(Array.prototype.some == null) {
	Array.prototype.some = function(fn, scope) {
		for (var i = 0; i < this.length; i++) {
			if (fn.call(scope, this[i], i))
				return true;
		}
		return false;
	};
}

if(Array.prototype.reduce == null){
	Array.prototype.reduce = function(fn, scope) {
		if (this.length == 0) return null;
		if (this.length == 1) return this[0];
		var v = fn(this[0], this[1], 0);
		for (var i = 2; i < this.length; i++)
			v = fn.call(scope, v, this[i], i);
		return v;
	};
}

if(Array.prototype.filter == null){
	Array.prototype.filter = function(fn, scope) {
		var result = new Array();
		for (var i = 0; i < this.length; i++) {
			var v = this[i];
			if (fn.call(scope, v, i))
				result.push(v);
		}
		return result;
	};
}

if(Array.prototype.find == null){
	Array.prototype.find = function(fn, scope){
		for(var i=0; i< this.length; i++){
			if(fn.call(scope, this[i], i)) return i;
		}
		return -1;
	};
}

if(Array.prototype.indexOf == null){
	Array.prototype.indexOf = function(item){
		for(var i=0; i< this.length; i++){
			if(this[i] == item) return i;
		}
		return -1;
	};
}

// 为 CardLayout 提供 getActiveIndex 方法 
Ext.override(Ext.layout.CardLayout, {
    getActiveIndex: function() {
        return this.getLayoutItems().indexOf(this.activeItem);
    }
});

// 为 treepanel 提供 expandDepth 方法
Ext.override(Ext.tree.Panel, {
    expandDepth : function (maxDepth) {
        var root = this.getRootNode();
        expand(root, 1);

        function expand(nd, depth) {
            if (depth == maxDepth) return;            
            if (!nd.isLeaf()) {
                for (var i = 0; i < nd.childNodes.length; i++) {
                    expand(nd.childNodes[i], depth + 1)
                }
            }
            nd.expand(false);
        }
    }
});

Ext.override(Ext.data.Store, {
    loadJsonArray: function (jsonArray) {
        var flds = this.model.getFields();
        var arr = jsonArray.map(function (json) {
            var arr = [];
            for (var i = 0; i < flds.length; i++) {                
                arr.push(json[flds[i].name]);
            }
            return arr;
        });
        this.loadData(arr);
    }, 
    toJsonArray : function(){
    	var arr = [];
    	for(var i=0; i< this.count(); i++){
    		 arr.push(this.getAt(i).getData());
    	}
    	return arr;
    }
});



function createModels(modelDefs) {
	var fun = function(store, rcds) {
		if (!rcds.length)
			rcds = [ rcds ];
		rcds.forEach(function(rcd) {
			rcd.associations.filterBy(function(ass) {
				return ass.type == 'belongsTo';
			}).each(function(ass) {
				var store = stores[ass.associatedModel.modelName];
				var coll = store.queryBy(function(mrcd) {
					return mrcd.get(ass.primaryKey) == rcd.get(ass.foreignKey);
				});
				coll.each(function(mrcd) {
					mrcd.associations.each(function(ass) {
						var store = mrcd[ass.storeName];
						mrcd.set(ass.name, getChangedRecords(store));
					});
				});
			});
		});

		function getChangedRecords(store) {
			var arr = [];
			putRcds(store.getNewRecords(), 'new');
			putRcds(store.getRemovedRecords(), 'remove');
			putRcds(store.getUpdatedRecords(), 'edit');

			function putRcds(rcds, state) {
				for (var i = 0; i < rcds.length; i++) {
					var data = {};
					var rcd = rcds[i];
					var flds = rcd.fields;
					flds.each(function(fld) {
						data[fld.name] = rcd.get(fld.name);
					});
					data._state = state;
					arr.push(data);
				}
			}
			return arr;
		}
	};
	for ( var m in modelDefs) {
		if (modelDefs.hasOwnProperty(m)) {
			var def = modelDefs[m];
			
			if(def.hasMany){
				var ass = def.hasMany;
				if(def.hasMany.length == null){
					ass = [def.hasMany];
				}
				ass.forEach(function(h){
					h.storeConfig = {
						type : 'Com.Softview.Store', listeners : {
							remove : fun, update : fun, add : fun
						}
					};
				});
			}
						
			Ext.define(m, Ext.applyIf({
				extend : 'Ext.data.Model'
			}, def));
		}
	}
}

Ext.override(Ext.data.reader.Json, {
	useRemoteMeta : false,

	readRecords : function(data) {

		var me = this, meta;

		if (me.useRemoteMeta) {
			if (me.getMeta) {
				meta = me.getMeta(data);
				if (meta) {
					me.onMetaChange(meta);
				}
			} else if (data.metaData) {
				me.onMetaChange(data.metaData);
			}			
		}

		me.jsonData = data;
		return me.callSuper([ data ]);
	}
});

Ext.data.Types.DATE.JSON_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/;
Ext.data.Types.DATE.convert = function(v) {	
    var df = this.dateReadFormat || this.dateFormat,
	    parsed;
	if (!v) {
	    return null;
	}
	
	if (v instanceof Date) {
	    return v;
	}
	if (df) {
	    return Ext.Date.parse(v, df);
	}
	var a = Ext.data.Types.DATE.JSON_PATTERN.exec(v);
    if (a) {
        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
            +a[5], +a[6]));
    }
	
	parsed = Date.parse(v);
	return parsed ? new Date(parsed) : null;
};

Ext.override(Ext.data.AbstractStore,{
	statics: {
	    
	    create: function(store) {
	        if (!store.isStore) {
	            if (!store.type) {
	                store.type = 'store';
	            }
	            if(Ext.isDefined(store.type)){
	            	store = Ext.create(store.type, store);
	            } else {
	            	store = Ext.createByAlias('store.' + store.type, store);
	            }
	        }
	        return store;
	    }
	}
});

Ext.define('Ext.data.reader.Db2jsJson', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.db2js',
    successProperty : null,
    messageProperty : null,
    totalProperty : 'total',
    
    getResponseData: function(response) {
        var data, error;
 
        try {
            data = Ext.decode(response.responseText);
            if(data.error) {
            	error = new Ext.data.ResultSet({
	                total  : 0, count  : 0, records: [], success: false,
	                message: data.error
	            });
            }
        } catch(ex){
        	error = new Ext.data.ResultSet({
        		total  : 0, count  : 0, records: [], success: false,
                message: response.responseText
            });
        }        
        if(!error){
        	try{        		
	            return this.readRecords(data);
	        } catch (ex) {
	        	error = new Ext.data.ResultSet({
	        		total  : 0, count  : 0, records: [], success: false,
	                message: ex.message
	            });	            
	        }
        }
        this.fireEvent('exception', this, response, error);
    	
        Ext.Logger.warn('Unable to parse the JSON returned by the server');

        return error;
    },
    
    getMeta : function(data){
    	return {root : 'rows', fields : data.columns};
    },

    readRecords: function(data) {
    	if(data.error){
    		throw new Error(data.error);
    	} else {
    		return this.callParent(arguments);
    	}
    },
    buildExtractors : function(){
    	this.callParent(arguments);
    	this.getRoot = function(data){
    		if(data.data) return data.data.rows;
    		if(data.rows) return data.rows;
    		return null;
    	}
    	this.getMeta = function(data){
    		if(data.data) return data.data.columns;
    		if(data.columns) return data.columns;
    		return null;
    	}
    }
	
});

Ext.define('Ext.data.writer.Db2jsJson', {
    extend: 'Ext.data.writer.Json',
    alias : 'writer.db2js',
    writeRecords: function(request, data) {
    	var root = this.root;
        
        if (this.expandData) {
            data = this.getExpandedData(data);
        }
        
        if (this.allowSingle && data.length === 1) {
            data = data[0];
        }

        var params = request.params.params;
        if(params) params = JSON.parse(params);
        
        Ext.apply(params, data);
        
        request.params.params = JSON.stringify(params);
        
        return request;
    }, 
    getRecordData: function(record, operation) {
    	var r = this.callParent(arguments);
    	if(operation.action == 'update'){
    		r._origin = record.raw;
    	}
    	return r;
    }
});

Ext.define('Ext.data.proxy.Db2js', {
    extend: 'Ext.data.proxy.Rest',
    alternateClassName: 'Ext.data.RestProxy',
    alias : 'proxy.db2js',
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'POST',
        destroy: 'POST'
    },
    db2jsMethods: {
        create : 'create',
        read   : 'fetch',
        update : 'modify',
        destroy: 'destroy'
    },
    reader : {
		type : 'db2js'
	}, writer : {
		type : 'db2js'
	},
	appendId : false,
	
    getParams: function(operation) {
        var me = this,
            params = {},
        	sorters = operation.sorters;
        
        params = operation.params.q || {};        

        if(operation.start != null && operation.limit != null){
        	params._page = {start : operation.start || 0, limit : operation.limit || 0};        
        }
        
        if(sorters){
	        var sorts = {};
	        for(var i=0; i<sorters.length; i++){
	        	sorts[sorters[i].property] = sorters[i].direction; 
	        }
	        params._sorts = sorts;
        }

        delete operation.params.q;
        
        params = { params : JSON.stringify(params)};
        if(operation.params._m){
        	params._m = operation.params._m; 
        } else {
        	params._m = this.db2jsMethods[operation.action];
        }
        return params;
    }
});


Ext.define('Com.Softview.Store', {
	extend : 'Ext.data.Store', autoLoad : false,
	// autoSync : true,
	pageSize : 10, remoteSort : true, proxy : { type : 'db2js' }, listeners : {
		update : Ext.emptyFn
	}, load : function(options) {
		var bparams = this.baseParams;
		if (options && options.params && bparams && bparams.params) {
			Ext.applyIf(options.params, bparams.params);
		}
		options = Ext.applyIf(options || {}, bparams);
		this.callParent([ options ]);
	}, constructor : function(config) {
		this.proxy.model = this.model;
		this.callParent([ config ]);
		this.proxy.url = this.proxy.url || (this.model ? (new this.model()).url : null) || config.url;
		this.baseParams = config.baseParams;
	}, q : function(query) {	/* {cond : value, cond : value} */
		var qd = this.baseParams && this.baseParams.params && this.baseParams.params.q;
		if (qd) {
			qd = Ext.apply(qd, query);
		} else {
			qd = query;
		}
		if (!this.baseParams)
			this.baseParams = {};
		if (!this.baseParams.params)
			this.baseParams.params = {};
		this.baseParams.params.q = qd;
		return this;
	}, m : function(method) {
		if (!this.baseParams)
			this.baseParams = {};
		if (!this.baseParams.params)
			this.baseParams.params = {};
		this.baseParams.params._m = method;
		return this;
	}
});

// 使用服务器提供的 metaData 的 Store，不需要定义 MODEL。因为这种方式会冲掉检查器等等其它属性，所以不作为 Store 的默认方式。
/**
 * 使用方法  :
 * var store = Ext.create('Com.Softview.DynaStore', {url : '../sys/person.d2js'});
 * store.m('fetch').load({params : {name : 'ohn'}}); 
 */
Ext.define('Com.Softview.DynaStore', {
	extend : 'Com.Softview.Store', autoLoad : false, proxy : {
		type : 'db2js', reader : {type : 'db2js', useRemoteMeta : true} 
	},
	setProxy: function(proxy) {		// ext 忘了设置 proxy.store,但是在proxy.setModel(model, true)需要用到
		var p = this.callParent([proxy]);
		p.store = this;
		return p;
    },
    setModel: function(model){		// ext 没有这个函数,但是 proxy.setModel(model, true) 调用到了它
    	this.model = model;
    }
});

Ext.define('Ext.data.reader.PTreeJson', {
	extend : Ext.data.reader.Db2jsJson, alias : 'reader.ptreejson',

	root : 'rows',
	
	readRecords : function(data) {
		data = this.buildTree(data);
		return this.callParent([data]);
	},

	buildTree : function(result) {
		if (result.error || result.rows == null)
			return result;
		var stk = [];
		var tops = [];
		var data = result.rows;
		for (var i = 0; i < data.length; i++) {
			var row = data[i];
			while (stk.length) {
				var prev = stk[stk.length - 1];
				if (row.parent_id == prev.id) {
					if (prev.rows)
						prev.rows.push(row);
					else
						prev.rows = [ row ]; // 因为行数组用的属性名是 rows，子节点也必须用 rows，如果用children，因为没有标为 leaf，会发生反复递归
					if (stk.length <= 2) { // 展开 2 层
						prev.expanded = true;
					}
					break;
				} else {
					prev.leaf = (prev.rows == null);
					stk.pop();
				}
			}
			if (stk.length == 0)
				tops.push(row);
			stk.push(row);
		}
		if (stk.length) {
			stk[stk.length - 1].leaf = true;
		}
		result.rows = tops;

		return {
			"success" : true, "rows" : tops
		};
	}
});

Ext.define('Com.Softview.TreeStore', {
	extend : 'Ext.data.TreeStore', autoLoad : false, clearOnLoad : true, clearRemovedOnLoad : true, 
	// autoSync : true,
	pageSize : 10, remoteSort : true, findExact : function(property, value, start) {
		var rcds = this.tree.flatten();
		for (var i = start || 0; i < rcds.length; i++) {
			var rcd = rcds[i];
			if (rcd.get(property) == value)
				return i;
		}
		return -1;
	},

	getCount : function() {
		return this.tree.flatten().length;
	},

	getAt : function(index) {
		var rcds = this.tree.flatten();
		return rcds[index];
	}, indexOf : function(value) {
		var rcds = this.tree.flatten();
		for (var i = 0; i < rcds.length; i++) {
			if (rcds[i] == value)
				return i;
		}
		return -1;
	},

	proxy : {
		type : 'db2js', reader : {
			type : 'ptreejson'
		}, writer : {
			type : 'db2js'
		}, appendId : false
	}, listeners : {
		update : Ext.emptyFn
	}, load : function(options) {
		var bparams = this.baseParams;
		if (options && options.params && bparams && bparams.params) {
			Ext.applyIf(options.params, bparams.params);
		}
		options = Ext.applyIf(options || {}, bparams);

		this.callParent([ options ]);
	}, constructor : function(config) {
		this.proxy.model = this.model;
		this.callParent([ config ]);
		this.proxy.url = this.proxy.url || this.model.url || config.url;
		this.baseParams = config.baseParams;
	}, q : function(query) {	/* {cond : value, cond : value} */
		var qd = this.baseParams && this.baseParams.params && this.baseParams.params.q;
		if (qd) {
			qd = Ext.apply(qd, query);
		} else {
			qd = query;
		}
		if (!this.baseParams)
			this.baseParams = {};
		if (!this.baseParams.params)
			this.baseParams.params = {};
		this.baseParams.params.q = qd;
		return this;
	}, m : function(method) {
		if (!this.baseParams)
			this.baseParams = {};
		if (!this.baseParams.params)
			this.baseParams.params = {};
		this.baseParams.params._m = method;
		return this;
	}
});

Ext.define('Com.Softview.TreeCombobox', {
	extend : 'Ext.form.field.ComboBox', alias : 'widget.treecombobox', type : 'treecombobox', 
	callback : Ext.emptyFn, triggerAction : 'all', maxHeight : 200, anchor : '95%', onSelect : Ext.emptyFn, store : null,

	checkAsSelecting : false,

	initComponent : function() {
		this.callParent();
	}, createPicker : function() {
		var me = this;
		if (this.multiSelect) {
			Ext.apply(me.listConfig, {
				selModel : {
					mode : 'SIMPLE'
				}
			});
		}
		if (this.checkAsSelecting) {
			Ext.apply(me.listConfig, {
				viewConfig : {
					listeners : {
						checkchange : function(rcd, checked) {
							// me.onListSelectionChange(picker,
							// picker.getSelectionModel().getSelection());
							// var m = picker.getSelectionModel();
							// var s = m.getSelection();
							// if(checked){
							// if(s.indexOf(rcd) == -1) m.select(rcd);
							// } else {
							// if(s.indexOf(rcd) != -1) m.deselect(rcd);
							// }
						}
					}
				}
			});
		}
		;
		var pickerConfig = Ext.apply({
			hidden : true, floating : true, height : 300, store : this.store, displayField : this.displayField, rootVisible : false
		}, me.listConfig);

		var picker = Ext.create('Ext.tree.Panel', pickerConfig);

		me.mon(picker, {
			itemclick : me.onItemClick, refresh : me.onListRefresh, scope : me
		});

		me.mon(picker.getSelectionModel(), {
			beforeselect : me.onBeforeSelect, beforedeselect : me.onBeforeDeselect, selectionchange : me.onListSelectionChange, scope : me
		});
		this.picker = picker;
		return picker;
	},

	onListSelectionChange : function(list, selected) {
		if (this.checkAsSelecting) {
			this.syncCheck.apply(this, [ selected ]);
			this.callParent(arguments);
		} else {
			this.callParent(arguments);
		}
	},

	syncCheck : function(selected) {
		var picker = this.picker;
		var checked = picker.getChecked();
		var shouldSelect = checked.filter(function(rcd) {
			return selected.indexOf(rcd) == -1;
		});
		if (shouldSelect.length) {
			shouldSelect.forEach(function(rcd) {
				rcd.set('checked', false);
			});
		}

		var shouldDeselect = selected.filter(function(rcd) {
			return checked.indexOf(rcd) == -1;
		});
		if (shouldDeselect.length) {
			console.log('should check ' + shouldDeselect.length + ' total selected length ' + selected.length);
			setTimeout(function() { // onListSelectionChange
									// 是尾随mousedown事件调用的，不知为什么，在
									// rcd.set(,true)后，会导致grid发生重绘(?)，在重绘(?)时后面检查鼠标在不在区域就会返回不在区域，最后导致picker被
									// collapse，没有找到原因，使用
									// settimeout避开mousedown事件
				shouldDeselect.forEach(function(rcd) {
					rcd.set('checked', true);
				});
			}, 50);
		}
	},

	collapseIf : function(e) {
		var me = this;
		if (!me.isDestroyed && !e.within(me.bodyEl, false, true) && !e.within(me.picker.el, false, true) && !me.isEventWithinPickerLoadMask(e)) {
			me.collapse();
		}
	},

	doAutoSelect : function() {
		var me = this, picker = me.picker, lastSelected, itemNode;
		if (picker && me.autoSelect && me.store.getCount() > 0) {

			lastSelected = picker.getSelectionModel().lastSelected;
			itemNode = picker.view.getNode(lastSelected || 0);
			if (itemNode) {
				picker.view.highlightItem(itemNode);
				picker.view.el.scrollChildIntoView(itemNode, false);
			}
		}
	},

	syncSelection : function() {
		this.callParent();
		if (this.checkAsSelecting && this.picker)
			this.syncCheck(this.picker.getSelectionModel().getSelection());
	}

});

// 不可编辑的下拉列表框。
Ext.define('Com.Softview.FixedComboBox', {
	extend : 'Ext.form.field.ComboBox', alias : 'widget.fixedcombobox', type : 'fixedcombobox', displayField : 'name', valueField : 'id', forceSelection : true, editable : false, grow : true
});

// 值列表下拉列表框。提供 listOfValues 形如 lov | listOfValues : {M : '男', F : '女'} 的初始化属性。
Ext.define('Com.Softview.LovCombo', {
	extend : 'Ext.form.field.ComboBox', alias : 'widget.lovcombobox', type : 'lovcombobox', queryMode : 'local', displayField : 'name', valueField : 'value', forceSelection : true, editable : false, grow : true,

	initComponent : function() {
		var arr = [];
		var listOfValues = this.listOfValues || this.lov || {};
		for ( var k in listOfValues) {
			if (listOfValues.hasOwnProperty(k)) {
				arr.push({
					name : listOfValues[k], value : k
				});
			}
		}
		if (this.allowEmpty) {
			arr = [ {
				name : '-', value : ''
			} ].concat(arr);
		}
		var store = Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ], data : arr
		});
		this.store = store;
		this.callParent();
	},

	afterComponentLayout : function() {
		if (this.grow) {
			this.grow = false;
			this.setWidth(this.getWidth() + this.getTriggerWidth());
		}
		this.callParent(arguments);
	}

});

//add by dzr 增加对0,1,2这种
Ext.define('Com.Softview.LovStatusCombo', {
	extend : 'Ext.form.field.ComboBox', alias : 'widget.lovstatuscombo', type : 'lovstatuscombo', queryMode : 'local', displayField : 'name', valueField : 'value', forceSelection : true, editable : false, grow : true,

	initComponent : function() {
		var arr = [];
		var listOfValues = this.listOfValues || this.lov || {};
		for ( var k in listOfValues) {
			if (listOfValues.hasOwnProperty(k)) {
				var int_v;
				try{
					int_v = parseInt(k);
				}catch(e){
					int_v = k;
				};
				arr.push({
					name : listOfValues[k], value : int_v
				});
			}
		}
		if (this.allowEmpty) {
			arr = [ {
				name : '-', value : ''
			} ].concat(arr);
		}
		var store = Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ], data : arr
		});
		this.store = store;
		this.callParent();
	},

	afterComponentLayout : function() {
		if (this.grow) {
			this.grow = false;
			this.setWidth(this.getWidth() + this.getTriggerWidth());
		}
		this.callParent(arguments);
	}

});


Ext.define('Com.Softview.GridCombobox', {
	extend : 'Ext.form.field.ComboBox', alias : 'widget.gridcombobox', type : 'gridcombobox', callback : Ext.emptyFn, triggerAction : 'all', maxHeight : 200, anchor : '95%', onSelect : Ext.emptyFn, store : null,
	
	multiSelect : true,
	
	createPicker : function(){
		var me = this;
		var gridConfig = {
		    store: me.store,
		    frame : false,
		    border : 1,
		    resizable : true,
		    columns : [],
		    selModel: {
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
            },
		    floating: true,
            hidden: true,
            width : 300,
            focusOnToFront: false
		};
		gridConfig = Ext.applyIf(me.gridConfig, gridConfig); 
		
		var picker = Ext.create('Ext.grid.Panel', gridConfig);
		me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            selectionchange: me.onListSelectionChange,
            scope: me
        });
        this.picker = picker;

        me.mon(me, {
            expand: function () {                
                picker.reconfigure(me.store);
                
            	var sel = picker.getSelectionModel();    
        		var rcds = me.value == null ? [] : me.value.map(function(v){
        			return picker.store.findRecord(me.valueField, v);
        		}).filter(function(r){return r != null});
        		sel.select(rcds);
            }
        });
		return picker;
	},
	
	onItemClick: function(picker, record){
        /*
         * If we're doing single selection, the selection change events won't fire when
         * clicking on the selected element. Detect it here.
         */
        var me = this,
            selection = me.picker.getSelectionModel().getSelection(),
            valueField = me.valueField;

        if (!me.multiSelect && selection.length) {
            if (record.get(valueField) === selection[0].get(valueField)) {
                // Make sure we also update the display value if it's only partial
                me.displayTplData = [record.data];
                me.setRawValue(me.getDisplayValue());
                me.collapse();
            }
        }        
    },
    
    matchFieldWidth : false,
    
    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            /*
             * Only set the value here if we're in multi selection mode or we have
             * a selection. Otherwise setValue will be called with an empty value
             * which will cause the change event to fire twice.
             */
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }
            me.inputEl.focus();
        }
        console.log(me.getValue());     // is an array
    },
    
//    setValue : function(value){
//    	
//    	if(sel.store == null) return;
//    	
//    	this.callParent(arguments);
//    	
//    	if(value != null ){
//	var picker = this.getPicker();
//	var sel = picker.getSelectionModel();    
//    		var me = this;
//    		var rcds =  value.map(function(v){
//    			return picker.store.findRecord(me.valueField, v);
//    		}).filter(function(r){return r != null});
//    		sel.select(rcds);
//    	}
//    },
    
    doAutoSelect: function() {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            // Highlight the last selected item and scroll it into view
            lastSelected = picker.getSelectionModel().lastSelected;
            itemNode = picker.view.getNode(lastSelected || 0);
            if (itemNode) {
                picker.view.highlightItem(itemNode);
                picker.view.el.scrollChildIntoView(itemNode, false);
            }
        }
    }
    
    
});

Ext.override(Ext.LoadMask, {
	setZIndex :   function(index) {
	    var me = this,
	        owner = me.activeOwner,
	        ownerZIndex;
	        
	    if (owner) {
	        // it seems silly to add 1 to have it subtracted in the call below,
	        // but this allows the x-mask el to have the correct z-index (same as the component)
	        // so instead of directly changing the zIndexStack just get the z-index of the owner comp
	        ownerZIndex = parseInt(owner.el.getStyle('zIndex'), 10);
	        if (!isNaN(ownerZIndex)) {
	            index = ownerZIndex + 1;
	        }
	    }
	
	
	    me.getMaskEl().setStyle('zIndex', index - 1);
	    return me.mixins.floating.setZIndex.apply(me, arguments);
	}
});

Ext.override(Ext.grid.column.CheckColumn, {
	renderer : function(value, meta, rcd) {
		if (this.isVisible && this.isVisible(value, rcd) == false) {
			return '';
		}
		var cssPrefix = Ext.baseCSSPrefix, cls = [ cssPrefix + 'grid-checkcolumn' ];

		var disabled = this.disabled || (this.isDisabled ? this.isDisabled.apply(this, [ value, rcd ]) : false);
		if (disabled) {
			meta.tdCls += ' ' + this.disabledCls;
		}
		if (value) {
			cls.push(cssPrefix + 'grid-checkcolumn-checked');
		}
		return '<img class="' + cls.join(' ') + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
	},

	processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row) {
		var me = this, key = type === 'keydown' && e.getKey(), mousedown = type == 'mousedown';

		var value = record.get(this.dataIndex);

		var disabled = this.disabled || (this.isVisible ? this.isVisible(value, record) == false : false) || (this.isDisabled ? this.isDisabled.apply(this, [ value, record ]) : false);

		if (!disabled && (mousedown || (key == e.ENTER || key == e.SPACE))) {
			var dataIndex = me.dataIndex, checked = !record.get(dataIndex);

			if (me.fireEvent('beforecheckchange', me, recordIndex, checked, record) !== false) {
				record.set(dataIndex, checked);
				me.fireEvent('checkchange', me, recordIndex, checked, record);

				if (mousedown) {
					e.stopEvent();
				}

				if (!me.stopSelection) {
					view.selModel.selectByPosition({
						row : recordIndex, column : cellIndex
					});
				}

				return false;
			} else {

				return !me.stopSelection;
			}
		} else {
			return me.callSuper(arguments);
		}
	}
});

Ext.define('Com.Softview.PhotoField', {
	extend : 'Ext.form.field.File', alias : 'widget.photofield', type : 'photofield', callback : Ext.emptyFn, triggerAction : 'all', maxHeight : 200, anchor : '95%', 

	onRender : function() {
		this.callParent();
		
		var me = this;
		
		var fileEle = this.fileInputEl.dom;
		this.fileInputEl.dom.accept = "image/*";	
		this.fileInputEl.dom.capture = "camera";
		
		if(me.previewEle == null){
			me.previewEle = Ext.create('Ext.Img', {width : 150, height : 200, src: 'data:image/jpeg;base64,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'}); 
			me.ownerCt.insert(me.ownerCt.items.indexOf(me) + 1, me.previewEle)
		}
		
		this.mon(this, {
			change : function(){
				var reader =  new FileReader();
				reader.onloadend = function () {
					me.setValue(reader.result);					
				}
				var file = fileEle.files[0];
				if (file) {
					reader.readAsDataURL(file);
					//fileEle.remove();
				} else {
					me.previewEle.setSrc('');
					me.previewEle.setVisible(false);
				}
				if(fileEle.files.length){
					 fileEle.files[0];
				}
			}
		});
	},
	
	setValue : function(v){
		this.superclass.superclass.superclass.setValue.apply(this, arguments);
		if(!this.previewEle) return;
		if(v){
			this.previewEle.setSrc(v);
			this.previewEle.setVisible(true);
		} else {
			this.previewEle.setSrc('');
			this.previewEle.setVisible(false);
		}
	},
	
	getValue : function(v){
		return this.superclass.superclass.superclass.getValue.apply(this, arguments);		// Ext.form.field.Text
	},
	
	getSubmitData : function(){
        var me = this,
            data = null,
            val;
        if (!me.disabled && me.submitValue) {		//  Ext.form.field.Text 已经指明 !me.isFileUpload() !!!!
            val = me.getSubmitValue();
            if (val !== null) {
                data = {};
                data[me.getName()] = val;
            }
        }
        return data;
	},
	
	onDestroy: function(){
	    Ext.destroyMembers(this, 'previewEl');
	    // delete this.fileInputEl;
	    this.callParent();
	},

});


function createStores(modelDefs) {
	var stores = {};
	for ( var m in modelDefs) {
		if (modelDefs.hasOwnProperty(m)) {
			var def = modelDefs[m];
			var store = new Com.Softview.Store({
				model : m, sorters : def.sorters
			});
			store.getProxy().url = def.url;
			stores[m] = store;
		}
	}

	return stores;
}

// 页面用到固定的词典（list of value LOV）挂到该词典下。
function ListOfValues() {
}

ListOfValues.renderer = function(lov) {
	lov = ListOfValues[lov];
	return function(v) {
		if(v instanceof Array){
			return v.map(function(item){return lov[item] || item}).join();
		} else {
			return lov[v] || v;
		}
	};
};

ListOfValues.toStore = function(lov) {
	lov = ListOfValues[lov];
    var store = Ext.create('Ext.data.ArrayStore', { autoLoad: false, fields: ['id', 'meaning'] }); // id is value
    var arr = [];
	for(var k in lov){
		if(lov.hasOwnProperty(k)){
			arr.push({id : k, meaning : lov[k] || k});
		}
	}
	store.loadJsonArray(arr);
	return store;
};

// 组织节点模型
Ext.define('Com.SoftView.NodeModel', {
	extend : 'Ext.data.Model', url : website +'common/d2js/node.d2js', fields : [ {
		name : 'id', type : 'int', useNull : true
	}, {
		name : 'name', type : 'string', useNull : true
	}, {
		name : 'parent_id', type : 'int', useNull : true
	}, {
		name : 'type', type : 'string', useNull : true
	} ]
});

// checkbox group
Ext.override(Ext.form.CheckboxGroup,{   
    //在inputValue中找到定义的内容后，设置到items里的各个checkbox中   
    setValue : function(value){  
        this.items.each(function(f){  
            if(value.indexOf(f.inputValue) != -1){  
                f.setValue(true);  
            }else{  
                f.setValue(false);  
            }  
        });  
    },  
    //以value1,value2的形式拼接group内的值  
    getValue : function(){  
        var re = [];  
        this.items.each(function(f){  
            if(f.getValue() == true){  
                re.push(f.inputValue);  
            }  
        });  
        return re;  
    },  
    //在Field类中定义的getName方法不符合CheckBoxGroup中默认的定义，因此需要重写该方法使其可以被BasicForm找到  
    getName : function(){  
        return this.name;  
    }  
});  



/*
 * File: DateTimePicker.js
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This is part of the UX for DateTimeField developed by Guilherme Portela
 */
Ext.define('Ext.ux.DateTimePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.datetimepicker',
    requires: [
        'Ext.picker.Date',
        'Ext.slider.Single',
        'Ext.form.field.Time',
        'Ext.form.Label'
    ],
    todayText: 'Current Date',
    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
    ],
    renderTpl: [
        '<tpl if="Ext.getVersion().major &gt; 4">',
        '<div id="{id}-innerEl" data-ref="innerEl">',
        '<div class="{baseCls}-header">',
        '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="button" title="{prevText}"></div>',
        '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
        '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="button" title="{nextText}"></div>',
        '</div>',
        '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" {%',
        // If the DatePicker is focusable, make its eventEl tabbable.
        'if (values.$comp.focusable) {out.push("tabindex=\\\"0\\\"");}',
        '%} cellspacing="0">',
        '<thead><tr role="row">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
        '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody><tr role="row">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        '<tpl else>',
        '<div id="{id}-innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
        '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
        '</div>',
        '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
        '<thead role="presentation"><tr role="row">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
        '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="row">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a role="button" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        '</tpl>', {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],
    initComponent: function() {
        var me = this,
            dtAux = me.value ? new Date(me.value) : new Date();

        me.selectedCls = me.baseCls + '-selected';
        me.disabledCellCls = me.baseCls + '-disabled';
        me.prevCls = me.baseCls + '-prevday';
        me.activeCls = me.baseCls + '-active';
        me.cellCls = me.baseCls + '-cell';
        me.nextCls = me.baseCls + '-prevday';
        me.todayCls = me.baseCls + '-today';
        dtAux.setSeconds(0);

        if (!me.format) {
            me.format = Ext.Date.defaultFormat;
        }
        if (!me.dayNames) {
            me.dayNames = Ext.Date.dayNames;
        }
        me.dayNames = me.dayNames.slice(me.startDay).concat(me.dayNames.slice(0, me.startDay));

        me.callParent();

        me.value = new Date(dtAux);

        //me.addEvents (
        /**
         * @event select
         * Fires when a date is selected
         * @param {Ext.picker.Date} this DatePicker
         * @param {Date} date The selected date
         */
        //   'select'
        //);

        Ext.apply(me, {
            timeFormat: ~me.format.indexOf("h") ? 'h' : 'H',
            changeTimeValue: function(slider, e, eOpts) {
                var label = slider.up().down('toolbar').down('label'),
                    hourPrefix = '',
                    minutePrefix = me.minuteSlider.getValue() < 10 ? '0' : ''
                timeSufix = '',
                hourDisplay = me.hourSlider.getValue(),
                auxDate = new Date();

                if (me.timeFormat == 'h') {
                    timeSufix = me.hourSlider.getValue() < 12 ? ' AM' : ' PM';
                    hourDisplay = me.hourSlider.getValue() < 13 ? hourDisplay : hourDisplay - 12;
                    hourDisplay = hourDisplay || '12';
                }
                hourPrefix = hourDisplay < 10 ? '0' : ''

                label.setText(hourPrefix + hourDisplay + ':' + minutePrefix + me.minuteSlider.getValue() + timeSufix);

                if (me.pickerField && me.pickerField.getValue()) {
                	var v = new Date(me.pickerField.getValue().setHours(me.hourSlider.getValue(), me.minuteSlider.getValue()));
                	me.value = v;
                    me.pickerField.setValue(v);
                }                
            }
        });

        me.initDisabledDays();
    },
    getValue : function(){
    	debugger;
    	return this.callParent();
    },
    beforeRender: function() {
        var me = this;
        me.hourSlider = new Ext.slider.Single({
            xtype: 'slider',
            fieldLabel: 'Hour',
            labelAlign: 'top',
            labelSeparator: ' ',
            value: 0,
            minValue: 0,
            maxValue: 23,
            vertical: true,
            listeners: {
                change: me.changeTimeValue
            },
            scope: me
        });

        me.minuteSlider = new Ext.slider.Single({
            fieldLabel: 'Minutes',
            labelAlign: 'top',
            labelSeparator: ' ',
            value: 0,
            increment: 1,
            minValue: 0,
            maxValue: 59,
            vertical: true,
            listeners: {
                change: me.changeTimeValue
            },
            scope: me
        });
        me.callParent();
    },
    afterRender: function() {
        var me = this,
            el = me.el;

        me.timePicker = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            border: false,
            defaults: {
                flex: 1,
                margin: 10
            },
            width: 130,
            floating: true,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                ui: 'footer',
                items: [
                    '->', {
                        xtype: 'label',
                        text: me.timeFormat == 'h' ? '12:00 AM' : '00:00'
                    },
                    '->'
                ]
            }],
            items: [me.hourSlider, me.minuteSlider]
        });

        me.callParent();
    },
    onShow: function() {
        var me = this;
        me.showTimePicker();
        me.callParent();
    },
    showTimePicker: function() {
        var me = this,
            el = me.el,
            timePicker = me.timePicker;
        Ext.defer(function() {
            var body = Ext.getBody(),
                bodyWidth = body.getViewSize().width,
                offSet = el.getWidth() / 2 + 70,
                xPos = (bodyWidth < (el.getX() + el.getWidth() + 140)) ? -offSet : offSet,
                backgroundColor, toolbar;

            me.timePicker.setHeight(el.getHeight());
            me.timePicker.showBy(me, 'tr', [0, 0]);

            toolbar = me.timePicker.down('toolbar').getEl();
            backgroundColor = toolbar.getStyle('background-color');
            if (backgroundColor == 'transparent') {
                toolbar.setStyle('background-color', toolbar.getStyle('border-color'));
            }
        }, 1);
    },
    onHide: function() {
        var me = this;
        me.timePicker.hide();
        me.callParent();
    },
    beforeDestroy: function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.timePicker,
                me.minuteSlider,
                me.hourSlider
            );
        }
        me.callParent();
    },
    setValue: function(value) {
        value.setSeconds(0);
        this.value = new Date(value);
        return this.update(this.value);
    },
    selectToday: function() {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler
        auxDate = new Date;

        if (btn && !btn.disabled) {
            me.setValue(new Date(auxDate.setSeconds(0)));
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
        return me;
    },
    handleDateClick: function(e, t) {
        var me = this,
            handler = me.handler,
            hourSet = me.timePicker.items.items[0].getValue(),
            minuteSet = me.timePicker.items.items[1].getValue(),
            auxDate = new Date(t.dateValue);
        e.stopEvent();
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.doCancelFocus = me.focusOnSelect === false;
            auxDate.setHours(hourSet, minuteSet, 0);
            me.setValue(new Date(auxDate));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            // event handling is turned off on hide
            // when we are using the picker in a field
            // therefore onSelect comes AFTER the select
            // event.
            me.onSelect();
        }
    },
    selectedUpdate: function(date) {
        var me = this,
            dateOnly = Ext.Date.clearTime(date, true),
            t = dateOnly.getTime(),
            currentDate = (me.pickerField && me.pickerField.getValue()) || new Date(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                me.fireEvent('highlightitem', me, cell);
                cell.addCls(cls);

                if (me.isVisible() && !me.doCancelFocus) {
                    Ext.fly(cell.dom.firstChild).focus(50);
                }

                break;
            }
        }
        if (currentDate) {
            me.timePicker.items.items[0].setValue(currentDate.getHours());
            me.timePicker.items.items[1].setValue(currentDate.getMinutes());
            me.changeTimeValue(me.timePicker.items.items[0]);
        }

    }
});

/*
 * File: DateTimeField.js
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 */
 Ext.define('Ext.ux.DateTimeField', {
  extend: 'Ext.form.field.Date',
  alias: 'widget.datetimefield',
  requires: ['Ext.ux.DateTimePicker'],

  //<locale>
  /**
   * @cfg {String} format
   * The default date format string which can be overriden for localization support. The format must be valid
   * according to {@link Ext.Date#parse}.
  */
  format : "m/d/Y H:i",
  //</locale>
  //<locale>
  /**
   * @cfg {String} altFormats
   * Multiple date formats separated by "|" to try when parsing a user input value and it does not match the defined
   * format.
  */
  altFormats : "m/d/Y H:i:s|c",
  width: 270,
  
  mimicBlur: function(e) {
    var me = this,
    picker = me.picker;

    // ignore mousedown events within the picker element
    if (!picker || !e.within(picker.el, false, true) && !e.within(picker.timePicker.el, false, true)) {
      me.callParent(arguments);
    }
  },
  collapseIf: function(e) {
    var me = this,
    picker = me.picker;

    if ((Ext.getVersion().major == 4
      && !me.isDestroyed 
      && !e.within(me.bodyEl, false, true) 
      && !e.within(me.picker.el, false, true) 
      && !e.within(me.picker.timePicker.el, false, true)) 
      || (Ext.getVersion().major == 5
      && !Ext.fly(e.target).isFocusable()
      && !me.isDestroyed 
      && !e.within(me.bodyEl, false, true) 
      && !me.owns(e.target))
      && !e.within(picker.timePicker.el, false, true)
      ) {
        me.collapse();
    } 
  },
  createPicker: function() {
    var me = this,
    format = Ext.String.format;
    
    return new Ext.ux.DateTimePicker({
            pickerField: me,
            floating: true,
            hidden: true,
            focusable: false, // Key events are listened from the input field which is never blurred
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
  }
});
 
Ext.override(Ext.AbstractComponent, {resetSize : function(){
	this.setSize(this.getSize());
}});
