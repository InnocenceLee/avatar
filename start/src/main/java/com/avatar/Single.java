package com.avatar;

import java.util.ArrayList;
import java.util.List;

public class Single extends Question{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2970965828437108014L;
	private List<String> options=new ArrayList<String>();
	private String answer;
	
	public Single() {
		super();
	}
	public List<String> getOptions() {
		return options;
	}
	public void setOptions(List<String> options) {
		this.options = options;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
}
