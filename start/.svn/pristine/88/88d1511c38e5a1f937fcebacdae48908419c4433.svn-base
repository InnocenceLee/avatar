function listActions() {
	return [ {
		name : '查询开发者',
		code : 'developer.query',
		status : 'N'
	}, {
		name : '增加开发者',
		code : 'developer.add',
		status : 'N'
	}, {
		name : '编辑开发者',
		code : 'developer.edit',
		status : 'N'
	}, {
		name : '删除开发者',
		code : 'developer.delete',
		status : 'N'
	} ];
}

if (typeof (ListOfValues) != 'undefined') {

}
function getModelDefs() {
	var defs = {
		developer : {
			url : website +'sys/developer.d2js',
			fields : [

			{
				name : 'id',
				type : 'int',
				useNull : true
			},

			{
				name : 'node',
				type : 'int',
				useNull : true
			},

			{
				name : 'name',
				type : 'string',
				useNull : true
			},

			{
				name : 'email',
				type : 'string',
				useNull : true
			},

			{
				name : 'phone',
				type : 'string',
				useNull : true
			},

			{
				name : 'tel',
				type : 'string',
				useNull : true
			}

			],
			newItem : function(store) {
				return {
					'id' : null
				};
			},
			sorters : [], // {property : , direction: 'asc' | 'desc'},
			validations : [

			{
				type : 'length',
				field : 'name',
				max : 20
			},

			{
				type : 'length',
				field : 'email',
				max : 40
			},

			{
				type : 'length',
				field : 'phone',
				max : 20
			},

			{
				type : 'length',
				field : 'tel',
				max : 20
			}

			]
		}
	};
	return defs;
}

function createListUiDef() {
	var nodeStore = new Com.Softview.TreeStore({
		model : 'Com.SoftView.NodeModel',
		url : website +'common/node.d2js',
		baseParams : {
			params : {
				_m : 'listAll'
			}
		}
	});
	// nodeStore.q({types : });
	nodeStore.load();
	arguments.callee.nodeStore = nodeStore;

	return {
		searchCondition : [

		'所属单位:', {
			xtype : 'treecombobox',
			argname : 'node',
			store : nodeStore,
			displayField : 'name',
			valueField : 'id',
			width : 250
		},

		'姓名:', {
			xtype : 'textfield',
			argname : 'name'
		}

		],
		applyItem : '开发者',
		store : 'developer',
		columns : [

		{
			header : '所属单位',
			dataIndex : 'node',
			flex : 1
		},

		{
			header : '姓名',
			dataIndex : 'name',
			flex : 1
		},

		{
			header : 'Email',
			dataIndex : 'email',
			flex : 1
		},

		{
			header : '手机',
			dataIndex : 'phone',
			flex : 1
		},

		{
			header : '座机',
			dataIndex : 'tel',
			flex : 1
		}

		]
	};
}

function createEditFormDef() {
	return {
		applyItem : '开发者',
		items : [

		{
			name : 'node',
			fieldLabel : '所属单位',
			xtype : 'treecombobox',
			store : createListUiDef.nodeStore,
			displayField : 'name',
			valueField : 'id',
			width : 250
		},

		{
			name : 'name',
			fieldLabel : '姓名',
			xtype : 'textfield',
			size : 5,
			allowBlank : false
		},

		{
			name : 'email',
			fieldLabel : 'Email',
			xtype : 'textfield',
			size : 15,
			msgTarget : 'side',
			selectOnFocus : true,
			vtype : 'email'

		},

		{
			name : 'phone',
			fieldLabel : '手机',
			xtype : 'textfield',
			selectOnFocus : true,
			size : 15,
			regex : /^[1][3-8]+\d{9}$/,
			regexText : '请输入正确的手机号',
			maxLength : 32,
			maxLengthText : "手机号长度不能超过32个字符",
			margin : '10 0 0 0',
			allowBlank : false,
			msgTarget : 'side',
			anchor : '60%'
		},

		{
			name : 'tel',
			fieldLabel : '座机',
			xtype : 'textfield',
			size : 15,
			// regex : /^1[3|4|5|8][0-9]\d{4,8}$/,
			// regexText : "只能输入正确的座机号码",
			allowBlank : false,
			margin : '10 0 0 0',
			msgTarget : 'side',
			anchor : '60%'
		}

		]
	};
}
