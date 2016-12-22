
function listActions() {
    return [{ name: '查询系统角色', code: 'sys_role.query', status: 'N' },
	        { name: '增加系统角色', code: 'sys_role.add', status: 'N', dependence: 'sys_role.query' },
	        { name: '编辑系统角色', code: 'sys_role.edit', status: 'N', dependence: 'sys_role.query' },
	        { name: '删除系统角色', code: 'sys_role.delete', status: 'N', dependence: 'sys_role.query' }];
}

if (typeof (ListOfValues) != 'undefined') {

    ListOfValues.sys_role_status = { "N": "正常", "P": "暂停" };
    ListOfValues.sys_function_status = { "N": "正常", "D": "禁用" };
    ListOfValues.sys_role_function_mode = { "O": "不可转授", "T": "可转授", "D": "无权" };
    ListOfValues.sys_role_node_scope = { "R": "随角色所在节点", "U": "随用户所在节点" };


}
function getModelDefs() {
    var defs =
		{
		    sys_role:
                 {
                     url: website + 'sys/sys_role.d2js',
                     fields: [

                         { name: 'id', type: 'int', useNull: true },

                         { name: 'node', type: 'int', useNull: true },

                         { name: 'name', type: 'string', useNull: true },

                         { name: 'node_scope', type: 'string', useNull: true, defaultValue: "R" },

                         { name: 'role_level', type: 'float', useNull: true },

                         { name: 'status', type: 'string', useNull: true, defaultValue: "N" },

                         { name: 'remarks', type: 'string', useNull: true },

                         { name: 'node_name', type: 'string' },

                         { name : 'code', type : 'string', useNull: true},

                       'dispatched_functions'	// json [{id: , type : , mode : }, ...]
                     ],
                     newItem: function (store) {
                         return { 'id': null };
                     },
                     sorters: [],		// {property : , direction: 'asc' | 'desc'},
                     validations: [

                         { type: 'presence', field: 'node' },

                         { type: 'length', field: 'name', max: 100 },
                         { type: 'length', field: 'code', max: 100 },
                         { type: 'length', field: 'role_level', max: 5 },
                         { type: 'length', field: 'status', max: 1 }


                     ]
                 },
		    sys_function: { fields: ['name', 'id', 'status', 'code', 'parent_id', 'dependence', 'dispatch_mode', 'type', 'allow', 'total', 'deny', 'involve'] }
		};
    return defs;
}

function createListUiDef() {

    var nodeStore = new Com.Softview.TreeStore({
        model: 'Com.SoftView.NodeModel', url: website + 'common/node.d2js',
        baseParams: { params: { _m: 'listAll' } }
    });

    nodeStore.q({ types: findParentTypes('SYS_ROLE') });
    nodeStore.load();
    arguments.callee.nodeStore = nodeStore;


    return {
        searchCondition: [

					'所属单位:', { xtype: 'treecombobox', argname: 'node', store: nodeStore, displayField: 'name', valueField: 'id', width: 250 },

					'角色名称:', { xtype: 'textfield', argname: 'name' },

					'状态:', { xtype: 'lovcombobox', argname: 'status', listOfValues: ListOfValues.sys_role_status, allowEmpty: true, value: '' }

        ],
        applyItem: '系统角色',
        store: 'sys_role',
        layoutStyle: 'default',
        allowEdit: allowed['sys_role.edit'],
        allowDelete: allowed['sys_role.delete'],
        allowAdd: allowed['sys_role.add'],
        columns: [

				{ header: '所属单位', dataIndex: 'node_name', flex: 1 },


				{ header: '角色名称', dataIndex: 'name', flex: 1 },

                { header: '角色代码', dataIndex: 'code', flex: 1 },

				{ header: '视野', dataIndex: 'node_scope', flex: 1, renderer: ListOfValues.renderer('sys_role_node_scope') },

				{ header: '角色级别', dataIndex: 'role_level', flex: 1 },


				{ header: '状态', dataIndex: 'status', flex: 1, renderer: ListOfValues.renderer('sys_role_status') }


        ]
    };
}

function createEditFormDef() {
    var allowedFunctions = new Com.Softview.TreeStore({
        model: 'sys_function', url: website + 'sys/sys_role.d2js',
        baseParams: { params: { _m: 'fetchDispatchedFunctions' } },
        listeners: {
            update: function (store, record, operation, fields) {
                if (this.ignoreUpdateEvent != false || fields == null) return;

                this.ignoreUpdateEvent = true;

                ensureSubFunctionDispatchMode(record);

                // update dependenced subfunction
                if (record.get('type') == 'sub') {
                    var changed = [];
                    if (record.get('deny') == true) {		// auto disable itms dependence to me 
                        this.getRootNode().cascadeBy(function (nd) {
                            if (nd.get('dependence') == record.get('code')) {
                                nd.set('deny', true);
                                changed.push(nd);
                            }
                        });
                    } else {	// auto enable dependenced item 
                        this.getRootNode().cascadeBy(function (nd) {
                            if (record.get('dependence') == nd.get('code')) {
                                nd.set('deny', false);
                                changed.push(nd);
                            }
                        });
                    }
                    if (record.get('total') == false) {		// auto disable itms dependence to me 
                        this.getRootNode().cascadeBy(function (nd) {
                            if (nd.get('dependence') == record.get('code')) {
                                nd.set('total', false);
                                changed.push(nd);
                            }
                        });
                    } else {	// auto enable dependenced item 
                        this.getRootNode().cascadeBy(function (nd) {
                            if (record.get('dependence') == nd.get('code')) {
                                nd.set('total', true);
                                changed.push(nd);
                            }
                        });
                    }
                    if (changed.length) {
                        changed.forEach(ensureSubFunctionDispatchMode);
                    }
                }

                // cast to children
                var stk = [];
                if (record.childNodes) stk = stk.concat(record.childNodes);
                if (fields == null) debugger;
                var fld = fields[0];
                while (stk.length) {
                    var child = stk.pop();
                    switch (fld) {
                        case 'allow':
                            if (child.get('type') == 'fun') {
                                child.set(fld, record.get(fld));
                            } else if (child.get('type') == 'sub') {
                                child.set('deny', !record.get('allow'));
                            }
                            break;
                        case 'total':
                            if (child.get('type') == 'fun') {
                                child.set(fld, record.get(fld));
                            } else if (child.get('type') == 'sub') {
                                child.set('total', record.get('total'));
                            }
                            ensureSubFunctionDispatchMode(child);
                            break;
                    }
                    if (child.childNodes) stk = stk.concat(child.childNodes);
                }
                // cast to parent
                for (var parent = record.parentNode; parent != null; parent = parent.parentNode) {
                    switch (fld) {
                        case 'allow':
                        case 'total':
                            if (parent.childNodes.every(function (sib) { return sib.get(fld); })) {
                                parent.set(fld, true);
                            } else {
                                parent.set(fld, false);
                            }
                            break;
                    }
                    if (parent.childNodes.every(function (sib) { return !isInvolve(sib); })) {
                        parent.set('involve', false);
                    } else {
                        parent.set('involve', true);
                    }
                }

                function isInvolve(rcd) {
                    return rcd.get('allow') == true || rcd.get('total') == true || rcd.get('involve') == true;
                }

                function ensureSubFunctionDispatchMode(record) {
                    if (record.get('type') == 'sub') {
                        if (fld == 'total' && record.get('total'))
                            record.set('deny', false);
                    }
                }

                this.ignoreUpdateEvent = false;

                // console.log(store.getUpdatedRecords());
            }
        }
    });
    allowedFunctions.load();

    var functionsTree = {
        xtype: 'treepanel',
        store: allowedFunctions,
        width: 600, height: 400,
        rootVisible: false,
        columns: [
            { xtype: 'treecolumn', text: '名称', flex: 3, sortable: true, dataIndex: 'name' },
            { header: '操作代码', dataIndex: 'code', flex: 2 },
            { header: '状态', dataIndex: 'status', flex: 1, renderer: ListOfValues.renderer('sys_function_status') },
            // { header: '权限', dataIndex: 'dispatch_mode', flex : 1, renderer : ListOfValues.renderer('sys_role_function_mode')},
            {
                xtype: 'checkcolumn', header: '可用', dataIndex: 'allow', width: 55, menuDisabled: true,
                isDisabled: function (v, rcd) {
                    return rcd.get('dispatch_mode') != 'T';
                },
                isVisible: function (v, rcd) { return rcd.get('type') == 'fun'; },
                listeners: {
                    checkchange: function (cm, rowIndex, checked, rcd) {
                        if (!checked) {
                            rcd.set('total', false);
                        }
                    }
                }
            },
            {
                xtype: 'checkcolumn', header: '可转授', dataIndex: 'total', width: 55, menuDisabled: true,
                isDisabled: function (v, rcd) {
                    return rcd.get('dispatch_mode') != 'T';
                },
                listeners: {
                    checkchange: function (cm, rowIndex, checked, rcd) {
                        if (checked) {
                            if (rcd.get('type') == 'fun') rcd.set('allow', true); else rcd.set('deny', false);
                        }
                    }
                }
            },
            {
                xtype: 'checkcolumn', header: '禁止', dataIndex: 'deny', width: 55, menuDisabled: true,
                isDisabled: function (v, rcd) {
                    return rcd.get('dispatch_mode') != 'T';
                },
                isVisible: function (v, rcd) { return rcd.get('type') == 'sub'; },
                listeners: {
                    checkchange: function (cm, rowIndex, checked, rcd) {
                        if (checked) {
                            rcd.set('total', false);
                        }
                    }
                }
            }
            //,{xtype: 'checkcolumn', header: '提到', dataIndex: 'involve', width: 55, menuDisabled: true}
        ]
    };

    var dispatch = new Com.Softview.Store({
        model: 'sys_function', url: website + 'sys/sys_role.d2js',
        baseParams: { params: { _m: 'fetchDispatchedFunctions' } }
    });

    function onDispatchRelationArrive(records, operation, success) {
        allowedFunctions.ignoreUpdateEvent = true;
        if (!success) {
            return Ext.MessageBox.alert('错误', operation.error);
        }
        for (var i = 0; i < allowedFunctions.getCount() ; i++) {
            var rcd = allowedFunctions.getAt(i);
            var d = dispatch.findRecord('id', rcd.get('id'));

            if (d == null) {
                rcd.set('allow', false); rcd.set('total', false);
            } else {
                switch (d.get('dispatch_mode')) {
                    case 'O':
                        rcd.set('allow', true); rcd.set('total', false); rcd.set('deny', false); rcd.set('involve', false);
                        break;
                    case 'T':
                        rcd.set('allow', true); rcd.set('total', true); rcd.set('deny', false); rcd.set('involve', false);
                        break;
                    case 'D':
                        rcd.set('allow', false); rcd.set('total', false); rcd.set('deny', true); rcd.set('involve', false);
                        break;
                    case 'I':
                        rcd.set('allow', false); rcd.set('total', false); rcd.set('deny', false); rcd.set('involve', true);
                        break;
                }
            }
            rcd.commit();
        }
        allowedFunctions.ignoreUpdateEvent = false;
    }

    return {
        applyItem: '系统角色',
        items: [
				{ name: 'node', fieldLabel: '所属单位', xtype: 'treecombobox', store: createListUiDef.nodeStore, displayField: 'name', valueField: 'id', width: 250 },

				{ name: 'name', fieldLabel: '角色名称', xtype: 'textfield', size: 20 },

                { name: 'code', fieldLabel: '角色代码', xtype: 'textfield', size: 20 },

				{ name: 'node_scope', fieldLabel: '视野', xtype: 'lovcombobox', listOfValues: ListOfValues.sys_role_node_scope },

				{ name: 'role_level', fieldLabel: '角色级别', xtype: 'textfield', size: 3 },

				{ name: 'status', fieldLabel: '状态', xtype: 'lovcombobox', listOfValues: ListOfValues.sys_role_status },

				{ name: 'remarks', fieldLabel: '备注', xtype: 'textarea', width: 400, height: 60 },

				{
				    xtype: 'fieldcontainer', layout: 'vbox',
				    items: [functionsTree]
				}
        ],
        onSetRecord: function (rcd) {
            dispatch.q({ id: rcd.get('id') }).load({ callback: onDispatchRelationArrive });
        },
        onBeforeSubmit: function (record) {
            var funs = [];
            for (var i = 0; i < allowedFunctions.getCount() ; i++) {
                var rcd = allowedFunctions.getAt(i);
                var mode = '';
                if (rcd.get('involve')) mode = 'I';
                if (rcd.get('allow')) mode = 'O';
                if (rcd.get('total')) mode = 'T';
                if (rcd.get('deny')) mode = 'D';
                if (mode) {
                    funs.push({ id: rcd.get('id'), type: rcd.get('type'), mode: mode });
                }
            }
            record.set('dispatched_functions', JSON.stringify(funs));
        }
    };
}

