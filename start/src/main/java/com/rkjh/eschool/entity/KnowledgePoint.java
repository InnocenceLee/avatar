package com.rkjh.eschool.entity;

import java.util.Map;

public class KnowledgePoint {
	private Map<String, Object> map;

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public KnowledgePoint(Map<String, Object> map) {
		this.map = map;
	}

	public KnowledgePoint() {
	}
}
