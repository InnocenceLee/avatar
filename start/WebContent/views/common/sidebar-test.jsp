<%@page import="org.json.JSONObject"%>
<%@page import="org.apache.http.HttpRequest"%>
<%@page import="java.util.*"%>

<%@page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!--    <link href=".././css/common.sidebar.css" rel="stylesheet"> -->
	<!-- BEGIN SIDEBAR -->
	
	<%! List<Map> trimInvisible(List<Map> fun){
			List<Map> re = new ArrayList<Map>();
			for(int i = 0; i < fun.size(); i++){
				Map curr = fun.get(i);
				if(curr.get("status").equals("N")){
					if(curr.containsKey("data")){
						List<Map> l = (List<Map>)curr.get("data");
						if(l.size() > 0){
							curr.put("data", trimInvisible(l));
						}
					}
					re.add(curr);
				}
			}
			return re;
		} %>
		
		<% 
		List<Map> funcRoots = (List<Map>)(session.getAttribute("func"));
		Map userMap = (Map)session.getAttribute("userJava");
		List functions = (List)(userMap.get("functions"));
		if(funcRoots == null){
			List stk = new LinkedList();
			List<Map> tops = new ArrayList<Map>();
			for(int i = 0; i < functions.size(); i++){
				Map row = (Map)functions.get(i);
				while(stk.isEmpty() == false){
					Map prev = (Map)stk.get(stk.size() - 1);
					if(row.get("parent_id").toString().equals(prev.get("id").toString())){
						if(prev.containsKey("data")){
							((List)(prev.get("data"))).add(row);
						}else{
							List<Map> prevData = new ArrayList<Map>();
							prevData.add(row);
							prev.put("data", prevData);
						}
						if(stk.size() <= 2){
							prev.put("expanded", true);
						}
						break;
					}else{
						prev.put("leaf", prev.get("data") == null);
						stk.remove(stk.size() -1);
					}
				}
				if(stk.size() == 0){
					tops.add(row);
				} 
				stk.add(row);
			}
			if(stk.size() > 0){
				Map now = (Map)stk.get(stk.size()-1);
				now.put("leaf", true);
			}
			
			funcRoots = trimInvisible(tops);
			session.setAttribute("func",funcRoots);
			
			System.out.println("funcRoots：" + JSONObject.valueToString(funcRoots));
		}
		%>
		
		<%! String getIcon(Map fun){
			if((fun.get("icon_url")) != null){
	    		if((fun.get("icon_url").toString()).indexOf("icon-") == 0)
		    		return "<i class= '"+ fun.get("icon_url").toString()+"'></i>";  
	    		else
		    		return "<img width='16' height='16' src = '"+fun.get("icon_url").toString()+"'/>";
   			}else{
   				return "";
   			}
		} %>
		
		<%!
			String createSysFunLink(Map fun , int level,HttpServletRequest request){
				String fun_name = "";
				if (level == 1) {
                        fun_name = getIcon(fun) + "<span class='title'>" + fun.get("name") + "</span>";
                    } else if (level == 2) {
                        fun_name = fun.get("name").toString();
                    }
                    if((fun.get("open_mode")).equals("W") || (fun.get("open_mode")).equals("w")){
                        return "<a href='" + fun.get("uri") + "' target='_blank'>" + fun_name + "</a>";
                    } else if((fun.get("open_mode")).equals("t")){
                        return "<a href='###' fun-uri='" + request.getContextPath() + fun.get("uri") + "' fun-code='" + fun.get("code") + "'>" + fun_name  + "</a>";
                    } else if((fun.get("open_mode")).equals("N")){
                        return "<a href='###'>" + fun_name + "</a>";
                    } else if((fun.get("open_mode")).equals("C")){
                        return "<a href='front/main.jssp?fun="+fun.get("code")+"' data-molecule='true' fun-uri='" + fun.get("uri") + "' fun-code='" + fun.get("code") + "'>" + fun_name  + "</a>";
                    } else if((fun.get("open_mode").equals("P"))){
                    	return "<a href='"+request.getContextPath()+""+fun.get("uri")+"'><i class='icon-user'></i><span class='title'>"+fun_name+"</span></a>";// Modal 
                    }else{
                    	return "";
                    }
			}
		
		 %>
				
		<div class="page-sidebar nav-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->        
			<ul class="page-sidebar-menu">
				<% List<Map> menuFunc = funcRoots; %>
				<% for(int i = 0; i < ((List<Map>)(menuFunc.get(0).get("data"))).size();i++){ %>
				
				<% 		Map curr = ((List<Map>)(menuFunc.get(0).get("data"))).get(i);%>
					<% 		if(curr.containsKey("data")&& ((List<Map>)(curr.get("data"))).size() > 0){%>
							<li class="">
                            <a href="###">
                                <%= getIcon(curr) %> 
                                <span class="title"><%= curr.get("name") %></span>
                                <span class="arrow "></span>
                            </a>
                            <ul class="sub-menu">
                            	<% for(int j = 0; j < ((List<Map>)(curr.get("data"))).size(); j++){ %>
                            	<% 		Map currFunc = ((List<Map>)(curr.get("data"))).get(j);%>
                            		<li class="myli1">
                                        <%= createSysFunLink(currFunc, 2, request) %>
                                    </li>
                            		
                            	<%}%>	
                            </ul>
                        </li>
						<%} else {%>
						<li><%= createSysFunLink(curr, 1,request) %></li>
                    <% } %>
				<% } %>
				
			</ul>
			
		</div>
		