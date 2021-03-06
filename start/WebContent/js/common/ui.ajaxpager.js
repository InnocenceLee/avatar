$t.define("tableAjax", function ($t, deps, $) {
    //是否正在执行回调函数(回调可能存在请求服务器事件过长,导致用户连续点击)
    var inCallBack = false;
    //默认属性
    var deffauArray = {
    		/*        pageMain: $('.ui-pager .ui-page-num'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('.ui-pager a.prev'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('.ui-pager a.next'),
        //跳转指定页文本框
        targetPageText:$('.target-page-text'),
        //跳转指定页确定按钮
        targetPageBtn:$('.target-page-btn'),
        //总页数DOM对象
        pageCountDom:$('.ui-pager .page-count'),*/
        
        pageMain: $('#ui-pager #ui-page-num'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('#ui-pager #prev'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('#ui-pager #next'),
        //跳转指定页文本框
        targetPageText:$('#target-page-text'),
        //跳转指定页确定按钮
        targetPageBtn:$('#target-page-btn'),
        //总页数DOM对象
        pageCountDom:$('#ui-pager .page-count'),
        
        //页码标签名称
        pageTag: "a",
        //页码标签未选中状态的CSS样式支持多个CSS样式 如"css1 css2 css3"
        pageClass: "",
        //页码标签选中状态的CSS样式
        currClass: "current",
        //当前页码(可选)
        currPage: 1,
        //总页数
        maxPage: 10,
        //显示多少个页码
        showCount: 5,
        //首次加载时是否执行回调函数(可选)
        firstCallBack: false,
        //更换页码后的回调函数,参数为当前页码(可选)
        callback:function(pageIndex){
        	//alert("ewqr");
        	switch(options.modelName){
        	case "courseList":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.node,options.state,options.modelName);
        		break;
        	case "courseDetailList":
        	case "courseDetailComment":
        		TableAjax(pageIndex,options.maxVisible,options.modelName,false,options.id);
        		break;
        	case "notify":
        		tableAjax(pageIndex,options.maxVisible,false,options.keyword,options.dateBegin,options.dateEnd,options.modelName);
        		break;
        	case "questBankList":
        		tableAjax(pageIndex,options.maxVisible,false,options.type,options.difficulty,options.title,options.knowledge,options.modelName);
        		break;
        	case "question_list":
        		tableAjax(pageIndex,options.maxVisible,false,options.modelName)
        		break;
        	case "nonEntryManagement":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.modelName);
        		break;
        	case "examPaperList":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.mode,options.state,options.modelName);
        		break;
        	case "paperAuditingList":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.state,options.modelName);
        		break;
        	case "learnPlanAddCourse":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.type,options.modelName);
        		break;
        	case "learnPlayList":
        		tableAjax(pageIndex,options.maxVisible,false,options.name,options.modelName);
        		break;
        	case "learnPlanDetail":
        		tableAjax(pageIndex,options.maxVisible,options.modelName,false,options.id);
        		break;

        	case "commentlList":
        		commentAjax(pageIndex,options.maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.lessonName,options.courseId,options.planId);
        		break;
        	case "learnDetailNoteslList":
        		learnNotesAjax(pageIndex,options.maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.courseId,options.planId,options.lessonId);
        		break;
        	case "noEntryPerson":
        		noEntryPersontableAjax(pageIndex,options.maxVisible,false,options.name,options.nodeName,options.personId,options.modelName);
        		break;
        	case "groupPerson":
        		groupPerson(pageIndex,options.maxVisible,false,options.names);
        		break;
        	case "examList":
        		tableAjax(pageIndex,options.maxVisible,false,options.names,options.modelName);
        		break;
        	case "courseAuditing":
        		tableAjax(pageIndex,options.maxVisible,false,options.names,options.state,options.modelName);
        		break;
        	case "staffCourseList":
        		tableAjax(pageIndex,options.maxVisible,false,options.names,options.modelName);
        		break;
        	case "examPersontableAjax":
        		examPersontableAjax(pageIndex,options.maxVisible,false,options.planId,options.students,options.personId,options.personName,options.nodeName,options.modelName)
        		break;

        	

        	}
        			
    	            }//回调
    };
    var options = {};

    var logic={
        runCallBack:function(){
            if(typeof options.callback=='function'){
                options.callback(options.currPage);
            }
        },
        //创建页码htm
        creatPageHtml:function(index){
            var pageHtml='';
            if(index==options.currPage){
                pageHtml='<a href="#" class="tpage '+options.currClass+'"pindex="'+index+'"'+"modelName="+options.modelName+'>'+index+'</a>';
            }else{
                pageHtml='<a href="#" class="tpage" pindex="'+index+'"'+"modelName="+options.modelName+'>'+index+'</a>';
            }
            return pageHtml;
        },
        //省略号
        creatEllipsisPage:function(){
            return '<span class="tpage tpage-ellipsis">...</span>';
        }
    };

    //重绘页码方法
    //@pageIndex 当前页
    function refreshPage(pageIndex) {
        //删除之前的页码
        $(options.pageMain).find(".tpage").remove();
        //当前最大页码
        var maxPage=options.maxPage;
        //当前最多显示的页码数
        var showCount=options.showCount;

        var pagesHtml=[];
        //当最大页码小于等于应该显示的页码数时，显示全部页码
        if (maxPage<=showCount) {
            for(var i=1;i<=maxPage;i++){
                pagesHtml.push(logic.creatPageHtml(i));
            }
        }else{
            if(pageIndex<=(showCount-1)){
                for(var i=1;i<=showCount-1;i++){
                     pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));

            }else if(pageIndex>=(maxPage-showCount+2)){
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(maxPage-showCount+2);i<=maxPage;i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
            }else{
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(pageIndex-(showCount-3)/2);i<=(pageIndex+(showCount-3)/2);i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));
            }
        }

        //将页码添加到页面
        options.prevBtn.after(pagesHtml.join(''));

        //设置页码的点击事件
        $('a[modelName='+options.modelName+']').click(function () {
            //将当前页码设置为点击的标签的页码属性
            options.currPage = parseInt($(this).attr("pindex"));

            //重绘页码
            refreshPage(options.currPage);
            //回调
            logic.runCallBack();
            //避免a标签造成的页面重绘
            return false;
        });

        //如果当前页是第一页，则为上一页按钮添加不可用样式，反之则删除
        if(pageIndex==1){
            options.prevBtn.addClass('disabled');
        }else{
            options.prevBtn.removeClass('disabled');
        }

        //如果当前页是最后一页，则为下一页按钮添加不可用样式,反之则删除
        if (pageIndex==options.maxPage) {
            options.nextBtn.addClass('disabled');
        }else{
            options.nextBtn.removeClass('disabled');
        }

        //页码输入框验证
        $(".target-page-text").keyup(function(){
            if(this.value.length==1)
            {this.value=this.value.replace(/[^1-9]/g,'')}
            else if(this.value>options.maxPage){
                this.value=options.maxPage;
            }
            else{this.value=this.value.replace(/\D/g,'')}
        });
        //页码框自适应宽度
        $(".target-page-text").on('keydown', function () {
        	$(this).width(20 + this.value.length * 7);
    	})
    }

    return {
        init: function (optionsData) {
            //合并参数
            options = $.extend(deffauArray, optionsData);
            //showCount最小为3
            options.showCount=options.showCount<3?3:options.showCount;
            //showCount只能为奇数
            options.showCount=options.showCount%2==0?options.showCount:options.showCount+1;
            options.currPage=1;

            if(options.maxPage < 1){
                $('.ui-pager').hide();
                return false;
            }
            $('.ui-pager').show();

            //缓存当前执行插件的DOM对象
            options.showCount = options.showCount - 1;
            //重绘页码
            refreshPage(options.currPage);
            //设置上一页点击事件
            $(options.prevBtn).unbind("click");
            $(options.prevBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为第一页
                if (options.currPage > 1) {
                    //页码减一
                    options.currPage -= 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });
            $(options.nextBtn).unbind("click");
            //设置下一页点击事件
            $(options.nextBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为最后一页
                if (options.currPage < options.maxPage) {
                    //页码加一
                    options.currPage = parseInt(options.currPage) + 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置跳转到指定页点击事件
            $(options.targetPageBtn).click(function(){

                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                var targetPage=parseInt(options.targetPageText.val());
                //如果用户输入的页码不是数字，或小于1，或大于最大页码，或等于当前页码。则不做任何操作
                if(!targetPage||isNaN(targetPage)||targetPage<1||targetPage>options.maxPage||targetPage==options.currPage){
                    return false;
                }else{
                    //当前页码重置为用户输入页码
                    options.currPage=targetPage;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置总页数显示
            options.pageCountDom.html(options.maxPage);

            //执行首次callback
            if(options.firstCallBack){
                logic.runCallBack();
            }

        },
        reset: function (maxPage) {
            options.maxPage = maxPage;
            options.currPage = 1;
            //重绘页码
            refreshPage(options.currPage);
        }
    };
});




//////////////////////////////////////////使用每页的第二个分页控件/////////////////////////////////
$t.define("table2Ajax", function ($t, deps, $) {
    //是否正在执行回调函数(回调可能存在请求服务器事件过长,导致用户连续点击)
    var inCallBack = false;
    //默认属性
    var deffauArray = {
    		/*        pageMain: $('.ui-pager .ui-page-num'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('.ui-pager a.prev'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('.ui-pager a.next'),
        //跳转指定页文本框
        targetPageText:$('.target-page-text'),
        //跳转指定页确定按钮
        targetPageBtn:$('.target-page-btn'),
        //总页数DOM对象
        pageCountDom:$('.ui-pager .page-count'),*/
        
        pageMain: $('#ui-pager-2 #ui-page-num-2'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('#ui-pager-2 #prev-2'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('#ui-pager-2 #next-2'),
        //跳转指定页文本框
        targetPageText:$('#target-page-text-2'),
        //跳转指定页确定按钮
        targetPageBtn:$('#target-page-btn-2'),
        //总页数DOM对象
        pageCountDom:$('#ui-pager-2 #page-count-2'),
        
        //页码标签名称
        pageTag: "a",
        //页码标签未选中状态的CSS样式支持多个CSS样式 如"css1 css2 css3"
        pageClass: "",
        //页码标签选中状态的CSS样式
        currClass: "current",
        //当前页码(可选)
        currPage: 1,
        //总页数
        maxPage: 10,
        //显示多少个页码
        showCount: 5,
        //首次加载时是否执行回调函数(可选)
        firstCallBack: false,
        //更换页码后的回调函数,参数为当前页码(可选)
        callback:function(pageIndex){
        	switch(options.modelName){
        	case "learnPlanDetail":
        		personAjax(pageIndex,options.maxVisible,options.modelName,false,options.id,options.personName,options.nodeName,options.personId);
        		break;
        	case "learnPlanPerson":
        		personAjax(pageIndex,options.maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.state,options.courseId,options.planId);
        		break;
        	case "noLearnPlanPerson":
        		noLearnPersonAjax(pageIndex,options.maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.courseId,options.planId,options.lessonId);
        		break;
        	case "courseDetailList":
        		lessonTableAjax(pageIndex,options.maxVisible,options.modelName,false,options.id);
        		break;
        	case "nodePersonAjax":
        		nodePerson(pageIndex-1,options.id,options.maxVisible,false)
        		break;
        	}
        			
    	            }//回调
    };
    var options = {};

    var logic={
        runCallBack:function(){
            if(typeof options.callback=='function'){
                options.callback(options.currPage);
            }
        },
        //创建页码htm
        creatPageHtml:function(index){
            var pageHtml='';
            if(index==options.currPage){
                pageHtml='<a href="#" class="tpage '+options.currClass+'"pindex="'+index+'"'+"modelName2="+options.modelName+'>'+index+'</a>';
            }else{
                pageHtml='<a href="#" class="tpage" pindex="'+index+'"'+"modelName2="+options.modelName+'>'+index+'</a>';
            }
            return pageHtml;
        },
        //省略号
        creatEllipsisPage:function(){
            return '<span class="tpage tpage-ellipsis">...</span>';
        }
    };

    //重绘页码方法
    //@pageIndex 当前页
    function refreshPage(pageIndex) {
        //删除之前的页码
        $(options.pageMain).find(".tpage").remove();
        //当前最大页码
        var maxPage=options.maxPage;
        //当前最多显示的页码数
        var showCount=options.showCount;

        var pagesHtml=[];
        //当最大页码小于等于应该显示的页码数时，显示全部页码
        if (maxPage<=showCount) {
            for(var i=1;i<=maxPage;i++){
                pagesHtml.push(logic.creatPageHtml(i));
            }
        }else{
            if(pageIndex<=(showCount-1)){
                for(var i=1;i<=showCount-1;i++){
                     pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));

            }else if(pageIndex>=(maxPage-showCount+2)){
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(maxPage-showCount+2);i<=maxPage;i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
            }else{
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(pageIndex-(showCount-3)/2);i<=(pageIndex+(showCount-3)/2);i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));
            }
        }

        //将页码添加到页面
        options.prevBtn.after(pagesHtml.join(''));

        //设置页码的点击事件
        $('a[modelName2='+options.modelName+']').click(function () {
            //将当前页码设置为点击的标签的页码属性
            options.currPage = parseInt($(this).attr("pindex"));

            //重绘页码
            refreshPage(options.currPage);
            //回调
            logic.runCallBack();
            //避免a标签造成的页面重绘
            return false;
        });

        //如果当前页是第一页，则为上一页按钮添加不可用样式，反之则删除
        if(pageIndex==1){
            options.prevBtn.addClass('disabled');
        }else{
            options.prevBtn.removeClass('disabled');
        }

        //如果当前页是最后一页，则为下一页按钮添加不可用样式,反之则删除
        if (pageIndex==options.maxPage) {
            options.nextBtn.addClass('disabled');
        }else{
            options.nextBtn.removeClass('disabled');
        }

        //页码输入框验证
        $(".target-page-text").keyup(function(){
            if(this.value.length==1)
            {this.value=this.value.replace(/[^1-9]/g,'')}
            else if(this.value>options.maxPage){
                this.value=options.maxPage;
            }
            else{this.value=this.value.replace(/\D/g,'')}
        });
    }

    return {
        init: function (optionsData) {
            //合并参数
            options = $.extend(deffauArray, optionsData);
            //showCount最小为3
            options.showCount=options.showCount<3?3:options.showCount;
            //showCount只能为奇数
            options.showCount=options.showCount%2==0?options.showCount:options.showCount+1;
            options.currPage=1;

            if(options.maxPage < 1){
                $('.ui-pager').hide();
                return false;
            }
            $('.ui-pager').show();

            //缓存当前执行插件的DOM对象
            options.showCount = options.showCount - 1;
            //重绘页码
            refreshPage(options.currPage);
            $(options.prevBtn).unbind("click");
            //设置上一页点击事件
            $(options.prevBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为第一页
                if (options.currPage > 1) {
                    //页码减一
                    options.currPage -= 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });
            $(options.nextBtn).unbind("click");
            //设置下一页点击事件
            $(options.nextBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为最后一页
                if (options.currPage < options.maxPage) {
                    //页码加一
                    options.currPage = parseInt(options.currPage) + 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置跳转到指定页点击事件
            $(options.targetPageBtn).click(function(){

                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                var targetPage=parseInt(options.targetPageText.val());
                //如果用户输入的页码不是数字，或小于1，或大于最大页码，或等于当前页码。则不做任何操作
                if(!targetPage||isNaN(targetPage)||targetPage<1||targetPage>options.maxPage||targetPage==options.currPage){
                    return false;
                }else{
                    //当前页码重置为用户输入页码
                    options.currPage=targetPage;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置总页数显示
            options.pageCountDom.html(options.maxPage);

            //执行首次callback
            if(options.firstCallBack){
                logic.runCallBack();
            }

        },
        reset: function (maxPage) {
            options.maxPage = maxPage;
            options.currPage = 1;
            //重绘页码
            refreshPage(options.currPage);
        }
    };
});








//////////////////////////////////////////使用每页的第    3 个分页控件/////////////////////////////////
$t.define("table3Ajax", function ($t, deps, $) {
    //是否正在执行回调函数(回调可能存在请求服务器事件过长,导致用户连续点击)
    var inCallBack = false;
    //默认属性
    var deffauArray = {
    		/*        pageMain: $('.ui-pager .ui-page-num'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('.ui-pager a.prev'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('.ui-pager a.next'),
        //跳转指定页文本框
        targetPageText:$('.target-page-text'),
        //跳转指定页确定按钮
        targetPageBtn:$('.target-page-btn'),
        //总页数DOM对象
        pageCountDom:$('.ui-pager .page-count'),*/
        
        pageMain: $('#ui-pager-3 #ui-page-num-3'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('#ui-pager-3 #prev-3'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('#ui-pager-3 #next-3'),
        //跳转指定页文本框
        targetPageText:$('#target-page-text-3'),
        //跳转指定页确定按钮
        targetPageBtn:$('#target-page-btn-3'),
        //总页数DOM对象
        pageCountDom:$('#ui-pager-3 #page-count-3'),
        
        //页码标签名称
        pageTag: "a",
        //页码标签未选中状态的CSS样式支持多个CSS样式 如"css1 css2 css3"
        pageClass: "",
        //页码标签选中状态的CSS样式
        currClass: "current",
        //当前页码(可选)
        currPage: 1,
        //总页数
        maxPage: 10,
        //显示多少个页码
        showCount: 5,
        //首次加载时是否执行回调函数(可选)
        firstCallBack: false,
        //更换页码后的回调函数,参数为当前页码(可选)
        callback:function(pageIndex){
        	switch(options.modelName){
        	case "commentlList":
        		commentAjax(pageIndex,maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.courseID,options.planID,options.lessonId);
        		break;
        	case "learnNoteslList":
        		learnNotesAjax(pageIndex,options.maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.lessonName,options.courseId,options.planId);
        		break;

        	}
        			
    	            }//回调
    };
    var options = {};

    var logic={
        runCallBack:function(){
            if(typeof options.callback=='function'){
                options.callback(options.currPage);
            }
        },
        //创建页码htm
        creatPageHtml:function(index){
            var pageHtml='';
            if(index==options.currPage){
                pageHtml='<a href="#" class="tpage '+options.currClass+'"pindex="'+index+'"'+"modelName3="+options.modelName+'>'+index+'</a>';
            }else{
                pageHtml='<a href="#" class="tpage" pindex="'+index+'"'+"modelName3="+options.modelName+'>'+index+'</a>';
            }
            return pageHtml;
        },
        //省略号
        creatEllipsisPage:function(){
            return '<span class="tpage tpage-ellipsis">...</span>';
        }
    };

    //重绘页码方法
    //@pageIndex 当前页
    function refreshPage(pageIndex) {
        //删除之前的页码
        $(options.pageMain).find(".tpage").remove();
        //当前最大页码
        var maxPage=options.maxPage;
        //当前最多显示的页码数
        var showCount=options.showCount;

        var pagesHtml=[];
        //当最大页码小于等于应该显示的页码数时，显示全部页码
        if (maxPage<=showCount) {
            for(var i=1;i<=maxPage;i++){
                pagesHtml.push(logic.creatPageHtml(i));
            }
        }else{
            if(pageIndex<=(showCount-1)){
                for(var i=1;i<=showCount-1;i++){
                     pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));

            }else if(pageIndex>=(maxPage-showCount+2)){
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(maxPage-showCount+2);i<=maxPage;i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
            }else{
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(pageIndex-(showCount-3)/2);i<=(pageIndex+(showCount-3)/2);i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));
            }
        }

        //将页码添加到页面
        options.prevBtn.after(pagesHtml.join(''));

        //设置页码的点击事件
        $('a[modelName3='+options.modelName+']').click(function () {
            //将当前页码设置为点击的标签的页码属性
            options.currPage = parseInt($(this).attr("pindex"));

            //重绘页码
            refreshPage(options.currPage);
            //回调
            logic.runCallBack();
            //避免a标签造成的页面重绘
            return false;
        });

        //如果当前页是第一页，则为上一页按钮添加不可用样式，反之则删除
        if(pageIndex==1){
            options.prevBtn.addClass('disabled');
        }else{
            options.prevBtn.removeClass('disabled');
        }

        //如果当前页是最后一页，则为下一页按钮添加不可用样式,反之则删除
        if (pageIndex==options.maxPage) {
            options.nextBtn.addClass('disabled');
        }else{
            options.nextBtn.removeClass('disabled');
        }

        //页码输入框验证
        $(".target-page-text").keyup(function(){
            if(this.value.length==1)
            {this.value=this.value.replace(/[^1-9]/g,'')}
            else if(this.value>options.maxPage){
                this.value=options.maxPage;
            }
            else{this.value=this.value.replace(/\D/g,'')}
        });
    }

    return {
        init: function (optionsData) {
            //合并参数
            options = $.extend(deffauArray, optionsData);
            //showCount最小为3
            options.showCount=options.showCount<3?3:options.showCount;
            //showCount只能为奇数
            options.showCount=options.showCount%2==0?options.showCount:options.showCount+1;
            options.currPage=1;

            if(options.maxPage < 1){
                $('.ui-pager').hide();
                return false;
            }
            $('.ui-pager').show();

            //缓存当前执行插件的DOM对象
            options.showCount = options.showCount - 1;
            //重绘页码
            refreshPage(options.currPage);
            //设置上一页点击事件
            $(options.prevBtn).unbind("click");
            $(options.prevBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为第一页
                if (options.currPage > 1) {
                    //页码减一
                    options.currPage -= 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置下一页点击事件
            $(options.nextBtn).unbind("click");
            $(options.nextBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为最后一页
                if (options.currPage < options.maxPage) {
                    //页码加一
                    options.currPage = parseInt(options.currPage) + 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置跳转到指定页点击事件
            $(options.targetPageBtn).click(function(){

                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                var targetPage=parseInt(options.targetPageText.val());
                //如果用户输入的页码不是数字，或小于1，或大于最大页码，或等于当前页码。则不做任何操作
                if(!targetPage||isNaN(targetPage)||targetPage<1||targetPage>options.maxPage||targetPage==options.currPage){
                    return false;
                }else{
                    //当前页码重置为用户输入页码
                    options.currPage=targetPage;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置总页数显示
            options.pageCountDom.html(options.maxPage);

            //执行首次callback
            if(options.firstCallBack){
                logic.runCallBack();
            }

        },
        reset: function (maxPage) {
            options.maxPage = maxPage;
            options.currPage = 1;
            //重绘页码
            refreshPage(options.currPage);
        }
    };
});

//////////////////////////////////////////使用每页的第    4 个分页控件/////////////////////////////////
$t.define("table4Ajax", function ($t, deps, $) {
    //是否正在执行回调函数(回调可能存在请求服务器事件过长,导致用户连续点击)
    var inCallBack = false;
    //默认属性
    var deffauArray = {
    		/*        pageMain: $('.ui-pager .ui-page-num'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('.ui-pager a.prev'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('.ui-pager a.next'),
        //跳转指定页文本框
        targetPageText:$('.target-page-text'),
        //跳转指定页确定按钮
        targetPageBtn:$('.target-page-btn'),
        //总页数DOM对象
        pageCountDom:$('.ui-pager .page-count'),*/
        
        pageMain: $('#ui-pager-4 #ui-page-num-4'),
        //上一页按钮DOM对象(可选)
        prevBtn: $('#ui-pager-4 #prev-4'),
        //下一页按钮DOM对象(可选)
        nextBtn: $('#ui-pager-4 #next-4'),
        //跳转指定页文本框
        targetPageText:$('#target-page-text-4'),
        //跳转指定页确定按钮
        targetPageBtn:$('#target-page-btn-4'),
        //总页数DOM对象
        pageCountDom:$('#ui-pager-4 #page-count-4'),
        
        //页码标签名称
        pageTag: "a",
        //页码标签未选中状态的CSS样式支持多个CSS样式 如"css1 css2 css3"
        pageClass: "",
        //页码标签选中状态的CSS样式
        currClass: "current",
        //当前页码(可选)
        currPage: 1,
        //总页数
        maxPage: 10,
        //显示多少个页码
        showCount: 5,
        //首次加载时是否执行回调函数(可选)
        firstCallBack: false,
        //更换页码后的回调函数,参数为当前页码(可选)
        callback:function(pageIndex){
        	switch(options.modelName){
        	case "commentlList":
        		commentAjax(pageIndex,maxVisible,options.modelName,false,options.personId,options.personName,options.nodeName,options.lessonName,options.courseId,options.planId);
        		break;
        	}
        			
    	            }//回调
    };
    var options = {};

    var logic={
        runCallBack:function(){
            if(typeof options.callback=='function'){
                options.callback(options.currPage);
            }
        },
        //创建页码htm
        creatPageHtml:function(index){
            var pageHtml='';
            if(index==options.currPage){
                pageHtml='<a href="#" class="tpage '+options.currClass+'"pindex="'+index+'"'+"modelName4="+options.modelName+'>'+index+'</a>';
            }else{
                pageHtml='<a href="#" class="tpage" pindex="'+index+'"'+"modelName4="+options.modelName+'>'+index+'</a>';
            }
            return pageHtml;
        },
        //省略号
        creatEllipsisPage:function(){
            return '<span class="tpage tpage-ellipsis">...</span>';
        }
    };

    //重绘页码方法
    //@pageIndex 当前页
    function refreshPage(pageIndex) {
        //删除之前的页码
        $(options.pageMain).find(".tpage").remove();
        //当前最大页码
        var maxPage=options.maxPage;
        //当前最多显示的页码数
        var showCount=options.showCount;

        var pagesHtml=[];
        //当最大页码小于等于应该显示的页码数时，显示全部页码
        if (maxPage<=showCount) {
            for(var i=1;i<=maxPage;i++){
                pagesHtml.push(logic.creatPageHtml(i));
            }
        }else{
            if(pageIndex<=(showCount-1)){
                for(var i=1;i<=showCount-1;i++){
                     pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));

            }else if(pageIndex>=(maxPage-showCount+2)){
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(maxPage-showCount+2);i<=maxPage;i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
            }else{
                pagesHtml.push(logic.creatPageHtml(1));
                pagesHtml.push(logic.creatEllipsisPage());
                for(var i=(pageIndex-(showCount-3)/2);i<=(pageIndex+(showCount-3)/2);i++){
                    pagesHtml.push(logic.creatPageHtml(i));
                }
                pagesHtml.push(logic.creatEllipsisPage());
                pagesHtml.push(logic.creatPageHtml(maxPage));
            }
        }

        //将页码添加到页面
        options.prevBtn.after(pagesHtml.join(''));

        //设置页码的点击事件
        $('a[modelName4='+options.modelName+']').click(function () {
            //将当前页码设置为点击的标签的页码属性
            options.currPage = parseInt($(this).attr("pindex"));

            //重绘页码
            refreshPage(options.currPage);
            //回调
            logic.runCallBack();
            //避免a标签造成的页面重绘
            return false;
        });

        //如果当前页是第一页，则为上一页按钮添加不可用样式，反之则删除
        if(pageIndex==1){
            options.prevBtn.addClass('disabled');
        }else{
            options.prevBtn.removeClass('disabled');
        }

        //如果当前页是最后一页，则为下一页按钮添加不可用样式,反之则删除
        if (pageIndex==options.maxPage) {
            options.nextBtn.addClass('disabled');
        }else{
            options.nextBtn.removeClass('disabled');
        }

        //页码输入框验证
        $(".target-page-text").keyup(function(){
            if(this.value.length==1)
            {this.value=this.value.replace(/[^1-9]/g,'')}
            else if(this.value>options.maxPage){
                this.value=options.maxPage;
            }
            else{this.value=this.value.replace(/\D/g,'')}
        });
    }

    return {
        init: function (optionsData) {
            //合并参数
            options = $.extend(deffauArray, optionsData);
            //showCount最小为3
            options.showCount=options.showCount<3?3:options.showCount;
            //showCount只能为奇数
            options.showCount=options.showCount%2==0?options.showCount:options.showCount+1;
            options.currPage=1;

            if(options.maxPage < 1){
                $('.ui-pager').hide();
                return false;
            }
            $('.ui-pager').show();

            //缓存当前执行插件的DOM对象
            options.showCount = options.showCount - 1;
            //重绘页码
            refreshPage(options.currPage);
            //设置上一页点击事件
            $(options.prevBtn).unbind("click");
            $(options.prevBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为第一页
                if (options.currPage > 1) {
                    //页码减一
                    options.currPage -= 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });
            $(options.nextBtn).unbind("click");
            //设置下一页点击事件
            $(options.nextBtn).click(function () {
                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                //判断是否不为最后一页
                if (options.currPage < options.maxPage) {
                    //页码加一
                    options.currPage = parseInt(options.currPage) + 1;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置跳转到指定页点击事件
            $(options.targetPageBtn).click(function(){

                //如果正在执行回调,则不执行转页操作
                if (inCallBack)
                    return;
                var targetPage=parseInt(options.targetPageText.val());
                //如果用户输入的页码不是数字，或小于1，或大于最大页码，或等于当前页码。则不做任何操作
                if(!targetPage||isNaN(targetPage)||targetPage<1||targetPage>options.maxPage||targetPage==options.currPage){
                    return false;
                }else{
                    //当前页码重置为用户输入页码
                    options.currPage=targetPage;
                    //重绘页码
                    refreshPage(options.currPage);
                    //回调
                    logic.runCallBack();
                }
                //避免a标签造成的页面重绘
                return false;
            });

            //设置总页数显示
            options.pageCountDom.html(options.maxPage);

            //执行首次callback
            if(options.firstCallBack){
                logic.runCallBack();
            }

        },
        reset: function (maxPage) {
            options.maxPage = maxPage;
            options.currPage = 1;
            //重绘页码
            refreshPage(options.currPage);
        }
    };
});
