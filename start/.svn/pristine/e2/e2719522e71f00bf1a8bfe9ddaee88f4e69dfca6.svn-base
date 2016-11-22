package com.rkjh.eschool.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * @author fernador
 * 权限标签
 */
public class PermissionTag extends TagSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String permissionCode;
	private String permissionCodeAll = "all";

	@Override
	public int doStartTag() throws JspException {
		
		Object sessionUser = this.pageContext.getSession().getAttribute("user");
		JSONObject sessionUserJson = (JSONObject) JSON.toJSON(sessionUser);
		JSONObject userAllows = sessionUserJson.getJSONObject("allowed");
		Boolean hasPerm = userAllows.getBooleanValue(permissionCodeAll);
		if(null!=hasPerm && hasPerm){
			return EVAL_BODY_INCLUDE;
		} else {
			hasPerm = userAllows.getBooleanValue(permissionCode);
			if(null!=hasPerm && hasPerm){
				return EVAL_BODY_INCLUDE;
			}else{
				return SKIP_BODY;
			}
		}
		
	}
	
	

	@Override
	public int doEndTag() throws JspException {
		// TODO Auto-generated method stub
		return super.doEndTag();
	}



	public String getPermissionCode() {
		return permissionCode;
	}

	public void setPermissionCode(String permissionCode) {
		this.permissionCode = permissionCode;
	}

	
}
