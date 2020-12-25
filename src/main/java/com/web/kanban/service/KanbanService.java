package com.web.kanban.service;

import com.app.base.data.ApiResponseResult;

import java.util.List;

import org.springframework.data.domain.PageRequest;

public interface KanbanService {

	/**
	 * kanbanNo:看板号，1-表示车间看板
	 * lingNo:线号，没有线号时可为空
	 * dataType:看板上的第几个数据源，1表示第一个
	 * date:2020-12-23
	 * **/
    public ApiResponseResult getKanbanData(String kanbanNo,String lingNo,String dataType)throws Exception;
}
