//[% include(''); %]
function listActions() {
    return [{ name: '查询系统用户', code: 'sys_user.query', status: 'N' },
	        { name: '增加系统用户', code: 'sys_user.add', status: 'N', dependence: 'sys_user.query' },
	        { name: '编辑系统用户', code: 'sys_user.edit', status: 'N', dependence: 'sys_user.query' },
	        { name: '删除系统用户', code: 'sys_user.delete', status: 'N', dependence: 'sys_user.query' }];
}

if (typeof (ListOfValues) != 'undefined') {
    Ext.Loader.loadScript({ url: website + 'jslib/sha1.js' });
    ListOfValues.sys_user_status = { "N": "正常", "D": "禁用" };
    ListOfValues.sys_user_login_type = { "G": "个人全局账户", "N": "机构账户", "B": "均可" };
}
function getModelDefs() {

    var defs =
		{
		    sys_user:
                 {
                     url: website + 'sys/sys_user.d2js',
                     //params: {newStatus: 'delivered'},
                     fields: [

                         { name: 'id', type: 'int', useNull: true },

                         { name: 'username', type: 'string', useNull: true },

                         { name: 'password', type: 'string', useNull: true },

                         { name: 'node', type: 'int', useNull: true },

                         { name: 'status', type: 'string', useNull: true, defaultValue: 'N' },

                         { name: 'remarks', type: 'string', useNull: true },

                         { name: 'node_name', type: 'string' },
                         { name: 'email', type: 'string' },
                         { name: 'mobile', type: 'string' },
                         { name: 'login_type', type: 'string', defaultValue: 'N' },
                         { name: 'name', type: 'string' },
                         { name: 'global_account', type: 'string' },

                         'roles'
                     ],
                     newItem: function (store) {
                         return { 'id': null };
                     },
                     sorters: [],		// {property : , direction: 'asc' | 'desc'},
                     validations: [

                         { type: 'length', field: 'username', max: 40 },


                         { type: 'length', field: 'password', max: 40 },


                         { type: 'length', field: 'status', max: 1 },


                         { type: 'length', field: 'remarks', max: 4000 }


                     ]
                 }
		};
    return defs;
}

function createListUiDef() {

    var nodeStore = new Com.Softview.TreeStore({
        model: 'Com.SoftView.NodeModel', url: website + 'common/node.d2js',
        baseParams: { params: { _m: 'listAll' } }
    });
    nodeStore.q({ types: findParentTypes('SYS_USER') });
    nodeStore.load();
    arguments.callee.nodeStore = nodeStore;


    return {
        searchCondition: [

					'用户名:', { xtype: 'textfield', argname: 'username' },

					'所属单位:', { xtype: 'treecombobox', argname: 'node', store: nodeStore, displayField: 'name', valueField: 'id', width: 250 },

					'状态:', { xtype: 'lovcombobox', argname: 'status', listOfValues: ListOfValues.sys_user_status, allowEmpty: true, value: '' }

        ],
        applyItem: '系统用户',
        store: 'sys_user',
        allowEdit: allowed['sys_user.edit'],
        allowDelete: allowed['sys_user.delete'],
        allowAdd: allowed['sys_user.add'],
        columns: [

				{ header: '用户名', dataIndex: 'username', flex: 1 },

				{ header: '所属单位', dataIndex: 'node_name', flex: 1 },

				{ header: '状态', dataIndex: 'status', flex: 1, renderer: ListOfValues.renderer('sys_user_status') },
                { header: '登录方式', dataIndex: 'login_type', flex: 1, renderer: ListOfValues.renderer('sys_user_login_type') },
	 			{ header: '个人姓名', dataIndex: 'name', flex: 1 },
                { header: '全局账号', dataIndex: 'global_account', flex: 1 },


				{ header: '备注', dataIndex: 'remarks', flex: 1 }


        ]
    };
}

function createEditFormDef() {
    var nodeStore = createListUiDef.nodeStore;
    Ext.define('Ext.data.reader.RoleTreeJson', {
        extend: Ext.data.reader.PTreeJson,
        alias: 'reader.roletreejson',

        buildTree: function (result) {
            if (!result.success) return this.callParent([result]);;

            var root = null, currLevel = -1;
            var data = result.data;
            var inv = {};
            for (var i = 0; i < data.length; i++) {
                var rcd = nodeStore.getNodeById(data[i].node);
                for (var r = rcd, lv = 0; r != nodeStore.getRootNode() ; r = r.parentNode, lv++) {
                    if (lv > currLevel) {
                        root = r;
                        currLevel = lv;
                    }
                    inv[r.id] = r;
                }
            }
            var flatt = [];
            for (var stk = [root]; stk.length > 0;) {
                var rcd = stk.pop();
                if (inv[rcd.id]) {
                    var raw = Ext.clone(rcd.copy().raw);
                    delete raw.data;
                    delete raw.leaf;
                    flatt.push(raw);
                    raw.id = -raw.id;
                    raw.parent_id = -raw.parent_id;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].node == rcd.get('id')) {
                            data[i].parent_id = -rcd.get('id');
                            data[i].type = 'ROLE';
                            data[i].checked = false;
                            flatt.push(data[i]);
                        }
                    }
                }
                for (var i = rcd.childNodes.length - 1; i >= 0; i--) {
                    stk.push(rcd.childNodes[i]);
                }
            }
            result.data = flatt;
            return this.callParent([result]);
        }
    });

    var roleStore = new Com.Softview.DynaStore({
        model: 'Com.SoftView.Store', url: website + 'sys/sys_role.d2js',
        baseParams: { params: { _m: 'fetchAvaliableRoles' } }
    });

    if (nodeStore.getCount() == 2) {		// always has a root node
        var rcd = nodeStore.getAt(0);
        roleStore.q({ node: rcd.get('id') }).load();
    }

    return {
        applyItem: '系统用户',
        items: [

					{ name: 'username', fieldLabel: '用户名', xtype: 'textfield', size: 15, anchor: '90%' },
					{ name: 'pwd', fieldLabel: '密码', xtype: 'textfield', size: 15, inputType: 'password', anchor: '90%' },
					{
					    name: 'repwd',
					    xtype: 'textfield',
					    size: 15,
					    fieldLabel: '再次输入',
					    inputType: 'password',
					    anchor: '90%',
					    validator: function (value) {
					        var pw = this.previousSibling().value;

					        if (value != pw && pw != null) {
					            return '两次输入的密码不一致';
					        } else {
					            return true;
					        }
					    }
					},
					{
					    fieldLabel: '电子邮箱', xtype: 'textfield',
					    name: 'email',
					    vtype: 'email',
					    anchor: '90%',
					    tooltip: 'Enter your email address'
					},
			        {
			            fieldLabel: '手机',
			            xtype: 'textfield',
			            anchor: '90%',
			            name: 'mobile'
			        },

					{
					    name: 'node', fieldLabel: '所属单位', xtype: 'treecombobox', anchor: '90%', store: createListUiDef.nodeStore, displayField: 'name', valueField: 'id', width: 250,
					    listConfig: {
					        listeners: {
					            selectionchange: function (list, selectedRecords) {
					                var rcd = selectedRecords[0];
					                if (rcd) {
					                    roleStore.q({ node: rcd.get('id') }).load();
					                }
					            }
					        }
					    }
					},


					{
					    name: 'roles', fieldLabel: '角色', xtype: 'gridcombobox', store: roleStore, valueField: 'id',
					    anchor: '90%',
					    //						width : 250,
					    displayField: 'name',
					    multiSelect: true, checkAsSelecting: true,
					    gridConfig: {
					        selType: 'checkboxmodel',
					        columns: [{ text: '角色名', dataIndex: 'name' }, { text: '所属单位', dataIndex: 'node_name' }]
					    }
					},

					{ name: 'status', fieldLabel: '状态', xtype: 'lovcombobox', anchor: '90%', listOfValues: ListOfValues.sys_user_status },

					{
					    name: 'remarks', fieldLabel: '备注', xtype: 'textareafield',
					    anchor: '90%',
					    //						width : 400, 
					    height: 100
					},
					{ xtype: 'hiddenfield', name: 'password' }
        ],
        onBeforeSubmit: function (record) {
            var encrypt;
            if (record.get('pwd') != "") {
                encrypt = CryptoJS.SHA1(record.get('pwd').trim());
                record.set('password', encrypt.toString());
            }
            debugger;
        },
        onSetRecord: function (rcd, goAhead) {
            var r = function () {
                if (!rcd.phantom) {
                    if (rcd.get('roles') == '') {
                        var store = new Com.Softview.DynaStore({
                            url: website + 'sys/sys_user.d2js'
                        }).m('fetchRoles').q({ user: rcd.get('id') }).load({
                            callback: function (records, operation, success) {
                                if (success) {
                                    rcd.set('roles', records.map(function (r) { return r.get('sys_role') }));   // [sys_role.ids]
                                    rcd.commit(true, ['roles']);
                                    roleStore.q({ node: rcd.get('node') }).load();       // check with id
                                    goAhead();
                                } else {
                                    Ext.MessageBox.alert('错误', operation.error);
                                }
                            }
                        });
                        return false;	// 本身有异步
                    }
                } else {
                    if (rcd.get('roles') == '') {
                        rcd.set('roles', []);
                    }
                }
            }();
            if (r == null) {
                roleStore.q({ node: rcd.get('node') }).load();
            }
            return r;
        }
    };
}

