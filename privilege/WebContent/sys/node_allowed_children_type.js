
function listActions() {
    return [{ name: '查询可能下属节点类型', code: 'node_allowed_children_type.query', status: 'N' },
	        { name: '增加可能下属节点类型', code: 'node_allowed_children_type.add', status: 'N', dependence: 'node_allowed_children_type.query' },
	        { name: '编辑可能下属节点类型', code: 'node_allowed_children_type.edit', status: 'N', dependence: 'node_allowed_children_type.query' },
	        { name: '删除可能下属节点类型', code: 'node_allowed_children_type.delete', status: 'N', dependence: 'node_allowed_children_type.query' }];
}

if (typeof (ListOfValues) != 'undefined') {

}
function getModelDefs() {
    var defs =
		{
		    node_allowed_children_type:
                 {
                     url: '../sys/node_allowed_children_type.d2js',
                     fields: [

                         { name: 'parent_type', type: 'string', useNull: true, },

                         { name: 'child_type', type: 'string', useNull: true, },

                         { name: 'id', type: 'auto', useNull: true, },

                     ],
                     newItem: function (store) {
                         return { 'id': null };
                     },
                     sorters: [{ property: 'parent_type', direction: 'asc' }, { property: 'child_type', direction: 'asc' }],		// {property : , direction: 'asc' | 'desc'},
                     validations: [

                         { type: 'length', field: 'parent_type', max: 200 },


                         { type: 'length', field: 'child_type', max: 200 }

                     ]
                 }
		};
    return defs;
}

function createListUiDef() {


    return {
        searchCondition: [

					'父节点:', { xtype: 'textfield', argname: 'parent_type' },

					'子节点:', { xtype: 'textfield', argname: 'child_type' },

        ],
        applyItem: '可能下属节点类型',
        store: 'node_allowed_children_type',
        allowEdit: allowed['node_allowed_children_type.edit'],
        allowDelete: allowed['node_allowed_children_type.delete'],
        allowAdd: allowed['node_allowed_children_type.add'],
        columns: [

				{ header: '父节点', dataIndex: 'parent_type', flex: 1 },


				{ header: '子节点', dataIndex: 'child_type', flex: 1 },


        ]
    };
}

function createEditFormDef() {

    return {
        applyItem: '可能下属节点类型',
        items: [

					{ name: 'parent_type', fieldLabel: '父节点', xtype: 'textfield', size: 100, },

					{ name: 'child_type', fieldLabel: '子节点', xtype: 'textfield', size: 100, }

        ]
    };
}

