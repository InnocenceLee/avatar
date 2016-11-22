 $(function(){
	 var code = $("body").attr("code");
	 if(!code) return;
	 var li = $(".page-sidebar-menu > li > a[fun-code=" + code + "]").parent();
	 var subCode = $("body").attr("sub-code");
	 if(subCode){
		 var a = li.children("a");
		 a.find("span.arrow ").addClass("open");
		 li.find("ul > li > a[fun-code=" + subCode + "]").parent().addClass("active")
	 }
	 
	 li.addClass("active");
})


