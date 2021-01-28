package com.web.lytreport.service.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.app.base.data.ApiResponseResult;
import com.utils.UserUtil;
import com.web.lytreport.service.LytReportService;

@Service(value = "LytReportService")
@Transactional(propagation = Propagation.REQUIRED)
public class LytReportlmpl extends ReportPrcUtils implements LytReportService {

	/**
	 * 获取工单下拉数据源
	 **/
	public ApiResponseResult getTaskNo(String keyword) throws Exception {
		List<Object> list = getTaskNoPrc(UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", keyword);
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		return ApiResponseResult.success().data(list);
	}

	/**
	 * 获取电芯测试结果报表
	 **/
	public ApiResponseResult getDXTestReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_BATTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 获取模组测试结果报表
	 **/
	public ApiResponseResult getMZTestReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_MODULETEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 获取气密性测试结果报表
	 **/
	public ApiResponseResult getQMXTestReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_AIRTIGHTTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 获取整机测试结果报表
	 **/
	public ApiResponseResult getZJTestReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_MACHINETEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 获取电芯配对测试结果报表
	 **/
	public ApiResponseResult getPDTestReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_PAIRTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 电芯配对统计报表
	 **/
	public ApiResponseResult getPDSumReport(String taskNo, String batNo, String begTime, String endTime,
			PageRequest pageRequest) throws Exception {
		List<Object> list = getReportPrc("PRC_APP_PAIRTEST_RESULT_SUM", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				pageRequest.getPageSize(), pageRequest.getPageNumber());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		Map map = new HashMap();
		map.put("total", list.get(2));
		map.put("rows", list.get(3));
		return ApiResponseResult.success().data(map);
	}

	/**
	 * 质量IQC来料检验台账(1)
	 **/
	public ApiResponseResult getQualCheckReport1(String year, String month, String target, Integer dataType)
			throws Exception {
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA",
				UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}	
		return ApiResponseResult.success().data(list.get(2));
	}
	
	/**
	 * 质量IQC来料检验台账(2)
	 **/
	public ApiResponseResult getQualCheckReport2(String year, String month, String target, Integer dataType)
			throws Exception {
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA",
				UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode());
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		return ApiResponseResult.success().data(list.get(2));
	}
}
