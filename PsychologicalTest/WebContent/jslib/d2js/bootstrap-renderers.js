/**
 * bootstrap 渲染器
 * @namespace
 */
d2js.Renderers.bootstrap = {}

/**
 * label 渲染器
 * 一个demo性的渲染器，没有实际效果。
 * 用法：
 * renderer="bootstrap.label('default')", renderer="bootstrap.label('primary')" etc 
 */
d2js.Renderers.bootstrap.label = function(level){
	level = level || 'default';
	return function(element, value, columnName, row, index, rows, _1, table){
		element.innerHTML = value + '';
		element.className = 'label label-' + level;
	}
}

/**
 * 分页组件
 * 用法：
 * ```html
 * <nav>
	  <ul class="pagination" data="#table" renderer="pagination">
	  </ul>
   </nav>
   ```
 */
d2js.Renderers.pagination = d2js.KNOWN_RENDERERS['pagination'] = function(element, table){
	[{$:'.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus, .pagination > li > a:hover, .pagination > li > span:hover, .pagination > li > a:focus, .pagination > li > span:focus'
		,cursor : 'pointer'
	}].defCss();
	
	table.page *= 1;
	
	var MAX_PAGE_SIZE = 9;
	var FIXED_PAGE_SIZE = 5;
	var FIXED_CENTER_PAGE = Math.ceil(FIXED_PAGE_SIZE / 2);
	var ul = $(element);
	ul.html('');
	ul.append('<div class="ui-pager"></div');
	ul.find('> .ui-pager').append('<div class="ui-pager-wrap"></div>');
	ul = ul.find('> .ui-pager > .ui-pager-wrap').append('<div class="ui-page-num"></div>').find('> .ui-page-num');
	
	var isFirstPage = (table.page == 0);
	var isLastPage = (table.page >= table.pageCount -1);
	
	var a = $(document.createElement('a')).appendTo(ul);
	if(isFirstPage) a.addClass('disabled');
	a.addClass('prev');
	a.href = '###';
	if(!isFirstPage){
		a.on('click', function(){
			table.navigatePage(table.page - 1);
		});
	}
	a.html('&lt;');
	
	if (table.pageCount <= MAX_PAGE_SIZE) {
		for(var i=0; i < table.pageCount; i++){
			addItemBtn(i + 1);
		}
	} else {
		var startFixedPage = 1, endFixedPage = FIXED_PAGE_SIZE;
		if (table.page + 1 < FIXED_CENTER_PAGE) {
			startFixedPage = 1;
		} else {
			startFixedPage = table.page + 1 - FIXED_CENTER_PAGE + 1;
		}
		if (table.pageCount - table.page - 1 < FIXED_CENTER_PAGE) {
			startFixedPage = table.pageCount - FIXED_PAGE_SIZE + 1;
			endFixedPage = table.pageCount;
		} else {
			endFixedPage = startFixedPage + FIXED_PAGE_SIZE - 1;
		}
		if (table.page + 1 > FIXED_CENTER_PAGE) {
			addItemBtn(1);
		}
		if (table.page + 1 > FIXED_CENTER_PAGE + 1) {
			ul.append('<span class="tpage tpage-ellipsis">...</span>');
		}
		for(var i = startFixedPage; i <= endFixedPage; i++){
			addItemBtn(i);
		}
		if (table.pageCount - table.page - 1 > FIXED_CENTER_PAGE) {
			ul.append('<span class="tpage tpage-ellipsis">...</span>');
		}
		if (table.pageCount - table.page - 1 > FIXED_CENTER_PAGE - 1) {
			addItemBtn(table.pageCount);
		}
	}
	var a = $(document.createElement('a')).appendTo(ul);
	if(isLastPage) a.addClass('disabled');
	a.addClass('next');
	a.href = '###';
	if(!isLastPage){
		a.on('click', function(){
			table.navigatePage(table.page + 1);
		});
	}
	a.html('&gt;');
	
	ul.append('共<em id="page-count" class="page-count">' + table.pageCount + '</em>页，到第<input class="target-page-text" type="text">页 <a class="target-page-btn">确定</a>');
	ul.find('.target-page-btn').on('click', function () {
		var targetPageNum = parseInt(ul.find('.target-page-text').val(), 10);
		table.navigatePage(isNaN(targetPageNum) ? 0 : targetPageNum - 1);
	});
	
	function addItemBtn(pageNum) {
		var a = $(document.createElement('a')).appendTo(ul);
		a.href = '###';
		a.addClass('tpage');
		console.log(pageNum, table.page);
		if(pageNum - 1 == table.page){
			a.addClass('current');
			a.html((pageNum));
		} else {
			a.attr('page', pageNum - 1);
			a.on('click', function(){
				table.navigatePage(this.getAttribute('page'));
			});
			a.html((pageNum));
		}
	}
}


/**
 * 标准错误渲染器
 * 渲染错误，当没有错误时隐藏元素。
 */
d2js.Renderers.stderr = d2js.KNOWN_RENDERERS['stderr'] = function(element,  value, columnName, row, index, rows, _1, table){
	var e = $(element), v = value;
	if(value == null){
		e.addClass('hide');
	} else {
		e.attr('class', '');
		switch(v.level){
		case 'warning' :
			e.addClass('label label-warning');
			break;
		default :
			e.addClass('label label-danger');
		}
		e.html(value.message);
	}
}

/**
 * 字段错误渲染器。结合表单使用。
 */
d2js.Renderers.flderr = d2js.KNOWN_RENDERERS['flderr'] = function(element,  value, columnName, row, index, rows, _1, table){
	var e = $(element), v = value;
	var helpDiv = null;
	if(e.is('.help-block.with-errors')){
		helpDiv = e;
		e = helpDiv.parent();
	} else {
		helpDiv = e.find('.help-block.with-errors');
		if(helpDiv.length == 0){
			helpDiv = $(document.createElement('div')).appendTo(e);
			helpDiv.addClass('help-block with-errors');
		}
	}	
	if(value == null){
		e.removeClass('has-error');
		helpDiv.html('');
	} else {
		e.addClass('has-error');
		helpDiv.html(value.message || value + '');
	}
}