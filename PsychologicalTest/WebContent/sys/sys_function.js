function listActions() {
    return [{
        name: '查询系统功能', code: 'sys_function.query', status: 'N'
    }, {
        name: '增加系统功能', code: 'sys_function.add', status: 'N', dependence: 'sys_function.query'
    }, {
        name: '编辑系统功能', code: 'sys_function.edit', status: 'N', dependence: 'sys_function.query'
    }, {
        name: '删除系统功能', code: 'sys_function.delete', status: 'N', dependence: 'sys_function.query'
    }];
}

if (typeof (ListOfValues) != 'undefined') {
    ListOfValues.sys_function_status = {
        "N": "正常", "D": "禁用"
    };
    ListOfValues.sys_function_open_mode = {
        "N": "无界面", "t": "在Ext TabPanel中开启", "W": "在新窗口开启", "M": "在新模式对话框开启", "w": "以Ext新窗口开启（仍在原页面）", "m": "以Ext新模式对话框开启（仍在原页面）"
    };
}

function getModelDefs() {
    var defs = {
        sys_function: {
            url: website + 'sys/sys_function.d2js', fields: [

			{
			    name: 'id', type: 'int', useNull: true
			},

			{
			    name: 'name', type: 'string', useNull: true
			},

			{
			    name: 'parent_id', type: 'int', useNull: true
			},

			{
			    name: 'menu_index', type: 'int', useNull: true
			},

			{
			    name: 'status', type: 'string', useNull: true, defaultValue: "N"
			},

			{
			    name: 'developer', type: 'int', useNull: true
			},

			{
			    name: 'code', type: 'string', useNull: true
			},

			{
			    name: 'uri', type: 'string', useNull: true
			},
			
			{
			    name: 'icon_url', type: 'string', useNull: true
			},

			{
			    name: 'open_mode', type: 'string', useNull: true, defaultValue: "t"
			}

            ], newItem: function (store) {
                return {
                    'id': null
                };
            }, sorters: [], // {property : , direction: 'asc' | 'desc'},
            validations: [

			{
			    type: 'presence', field: 'name'
			},

			{
			    type: 'length', field: 'name', min: 3, max: 100
			},

			{
			    type: 'presence', field: 'status'
			},

			{
			    type: 'length', field: 'status', max: 1
			},

			{
			    type: 'presence', field: 'code'
			},

			{
			    type: 'length', field: 'code', max: 200
			},

			{
			    type: 'length', field: 'uri', max: 200
			},

			{
			    type: 'length', field: 'open_mode', max: 1
			}]
        }, sub_function: {
            fields: [{
                name: 'id', type: 'int', useNull: true
            }, {
                name: 'name', type: 'string', useNull: true
            }, {
                name: 'sys_function', type: 'int', useNull: true
            }, {
                name: 'menu_index', type: 'int', useNull: true
            }, {
                name: 'status', type: 'string', useNull: true
            }, {
                name: 'code', type: 'string', useNull: true
            }, {
                name: 'dependence', type: 'string', useNull: true
            }]
        }, developer: {
            fields: [{
                name: 'name', type: 'auto'
            }, {
                name: 'id', type: 'auto'
            }]
        }

    };
    return defs;
}

function createListUiDef() {
    var parentStore = new Com.Softview.TreeStore({
        model: 'sys_function', url: website + 'sys/sys_function.d2js', baseParams: {
            params: {
                _m: 'listAll'
            }
        }
    });
    parentStore.load();

    var mainStore = new Com.Softview.TreeStore({
        model: 'sys_function', url: website + 'sys/sys_function.d2js'
    });
    mainStore.isMainStore = true;

    var actionStore = new Com.Softview.Store({
        model: 'sub_function', url: website + '/sys/sys_function.d2js', baseParams: {
            params: {
                _m: 'listAction'
            }
        }
    });
    return {
        searchCondition: [

		    '名称:', {
		        xtype: 'textfield', argname: 'name'
		    },

		    '上级功能:', {
		        argname: 'parent_id', width: 120, value: '0', xtype: 'treecombobox', store: parentStore, displayField: 'name', valueField: 'id', width: 250
		    },

		    '状态:', {
		        xtype: 'lovcombobox', listOfValues: ListOfValues.sys_function_status, allowEmpty: true, value: '', argname: 'status'
		    },

		    '开发者:', {
		        xtype: 'textfield', argname: 'developer'
		    }

        ],
        applyItem: '系统功能', store: mainStore,
        autoScroll : true,
        onStoreWrite: function (store, operation, eOpts) { parentStore.load(); },
        allowEdit: true, xtype: 'treepanel', rootVisible: false, // this will raise store load
        autoLoad: false, supportPage: false, allowEdit: allowed['sys_function.edit'], allowDelete: allowed['sys_function.delete'], allowAdd: allowed['sys_function.add'], viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop', containerScroll: true
            }, listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    // dropHandlers.wait = true;
                    // Ext.MessageBox.confirm('Drop', 'Are you sure',
                    // function(btn){
                    // if (btn === 'yes') {
                    // dropHandlers.processDrop();
                    // } else {
                    // dropHandlers.cancelDrop();
                    // }
                    // });
                }, drop: function (node, data, overModel, dropPosition, eOpts) {
                    switch (dropPosition) {
                        case 'before':
                        case 'after':
                            for (var i = 0; i < data.records.length; i++) {
                                var rcd = data.records[i];
                                rcd.set('parent_id', overModel.get('parent_id'));
                            }
                            var silblings = overModel.parentNode.childNodes;
                            for (var i = 0; i < silblings.length; i++) {
                                var rcd = silblings[i];
                                rcd.set('menu_index', i);
                            }
                            break;
                        case 'append':
                            for (var i = 0; i < data.records.length; i++) {
                                var rcd = data.records[i];
                                rcd.set('parent_id', overModel.get('id'));
                            }
                            var silblings = overModel.childNodes;
                            for (var i = 0; i < silblings.length; i++) {
                                var rcd = silblings[i];
                                rcd.set('menu_index', i);
                            }
                            break;
                    }
                    mainStore.sync();
                }
            }
        }, columns: [{
            xtype: 'treecolumn', text: '名称', flex: 2, sortable: true, dataIndex: 'name'
        },

		{
		    header: '操作代码', dataIndex: 'code', flex: 2
		},

		{
		    header: '状态', dataIndex: 'status', flex: 1, renderer: ListOfValues.renderer('sys_function_status')
		},

		{
		    header: '开发者', dataIndex: 'developer', flex: 1
		},

		{
		    header: 'URI', dataIndex: 'uri', flex: 3
		},

		{
		    header: '打开方式', dataIndex: 'open_mode', flex: 1, renderer: ListOfValues.renderer('sys_function_open_mode')
		},

		{
		    text: '动作', menuDisabled: true, width: 55, icon: website + 'images/icons/edit_task.png', xtype: 'actioncolumn', handler: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
		        var actionsForm = new Ext.Window({
		            title: '动作', width: 600, height: 320, modal: true, items: [{
		                xtype: 'grid', store: actionStore, viewConfig: {
		                    emptyText: '该功能不具备任何动作，这可能是因为还没有编写', deferEmptyText: false
		                }, columns: [{
		                    header: '名称', dataIndex: 'name'
		                }, {
		                    header: '代码', dataIndex: 'code', width: 200
		                }, {
		                    header: '依赖操作', dataIndex: 'dependence', width: 200
		                }, {
		                    header: '状态', dataIndex: 'status', renderer: ListOfValues.renderer('sys_function_status')
		                }]
		            }], tbar: {
		                items: ['修改了子功能列表后，可在此处重新加载到数据库。', {
		                    xtype: 'button', text: '重新设置', handler: function () {
		                        var uri = actionStore.uri;
		                        actionStore.baseParams.params = {
		                            _m: 'resetActions'
		                        };
		                        actionStore.q({
		                            id: actionStore.sys_function, uri: uri
		                        });
		                        actionStore.load();
		                    }
		                }]
		            }
		        });

		        actionStore.baseParams.params = {
		            _m: 'listAction'
		        };
		        actionStore.q({
		            id: record.get('id')
		        });
		        actionStore.sys_function = record.get('id');
		        actionStore.uri = record.get('uri');
		        actionStore.load();
		        actionsForm.show();
		    }
		}

        ]
    };
}

function createEditFormDef() {

    var developerStore = new Com.Softview.Store({
        model: 'developer', url: website + 'sys/developer.d2js'
    });
    developerStore.load();
    var parentStore = new Com.Softview.TreeStore({
        model: 'sys_function', url: website + 'sys/sys_function.d2js', baseParams: {
            params: {
                _m: 'listAll'
            }
        }
    });

    var actionStore = new Ext.data.Store({
        model: 'sub_function', proxy: {
            type: 'ajax', url: ''
        }
    });

    return {
        applyItem: '系统功能',
        items: [

		    {
		        name: 'name', fieldLabel: '名称', xtype: 'textfield', size: 20, anchor: '90%'
		    },

		    {
		        name: 'parent_id', fieldLabel: '上级功能', xtype: 'treecombobox', store: parentStore, displayField: 'name', valueField: 'id', anchor: '90%'
		        //			width : 250
		    },

		    {
		        name: 'code', fieldLabel: '操作代码', xtype: 'textfield', anchor: '90%'
		    },
		    
		    {
		        name: 'icon_url', fieldLabel: '图标', xtype: 'textfield', anchor: '90%'
		    },

		    {
		        name: 'status', fieldLabel: '状态', xtype: 'lovcombobox', listOfValues: ListOfValues.sys_function_status, anchor: '90%'
		    },

		    {
		        name: 'developer', fieldLabel: '开发者', xtype: 'fixedcombobox', size: 20, store: developerStore, anchor: '90%'// 设置数据源
		    },

		    {
		        xtype: 'fieldcontainer', anchor: '90%', layout: 'hbox', items: [{
		            name: 'uri', fieldLabel: 'URI', xtype: 'textfield', size: 80
		        }, {
		            xtype: 'button', text: '查看可用操作', handler: function () {

		                var uri = this.up('form').getForm().getFieldValues().uri;
		                if (!uri) {
		                    Ext.MessageBox.alert('提示', '没有输入URI，无法提取可用操作。');
		                    return;
		                }

		                var actionsForm = new Ext.Window({
		                    title: '动作', width: 600, height: 320, items: [{
		                        xtype: 'grid', store: actionStore, viewConfig: {
		                            emptyText: '该功能不具备任何动作，这可能是因为还没有编写', deferEmptyText: false
		                        }, columns: [{
		                            header: '名称', dataIndex: 'name'
		                        }, {
		                            header: '代码', dataIndex: 'code', width: 200
		                        }, {
		                            header: '依赖操作', dataIndex: 'dependence', width: 200
		                        }, {
		                            header: '状态', dataIndex: 'status', renderer: ListOfValues.renderer('sys_function_status')
		                        }]
		                    }]
		                });

		                if (uri.indexOf('?') == -1)
		                    uri += '?_la=true';
		                else
		                    uri += '&_la=true';
		                uri = website + uri;
		                actionStore.getProxy().url = uri;
		                actionStore.load();
		                actionsForm.show(this.up('form'));
		            }
		        }]
		    },

		    {
		        name: 'open_mode', fieldLabel: '打开方式', xtype: 'lovcombobox', listOfValues: ListOfValues.sys_function_open_mode, anchor: '90%'
		    }

        ], onSetRecord: function (rcd) {
            parentStore.q({
                id: rcd.raw.id
            });
            parentStore.load();
        }
    };
}
// /

