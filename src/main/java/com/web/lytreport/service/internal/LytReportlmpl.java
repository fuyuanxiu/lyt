package com.web.lytreport.service.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

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
	 * 电芯测试结果报表导出
	 * **/
	public void getDXTestExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_BATTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
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
	 * 模组测试结果报表导出
	 * **/
	public void getMZTestExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_MODULETEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
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
	 * 气密性测试结果报表导出
	 * **/
	public void getQMXTestExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_AIRTIGHTTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
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
	 * 整机测试结果报表导出
	 * **/
	public void getZJTestExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_MACHINETEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
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
	 * 电芯配对测试结果报表导出
	 * **/
	public void getPDTestExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_PAIRTEST_RESULT", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
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
	 * 电芯配对统计报表导出
	 * **/
	public void getPDSumExport(HttpServletResponse response,String taskNo,
			String batNo,String begTime,String endTime)throws Exception{
		List<Object> list = getReportPrc("PRC_APP_PAIRTEST_RESULT_SUM", UserUtil.getSessionUser().getFcompany() + "",
				UserUtil.getSessionUser().getFfactory() + "", taskNo, batNo, begTime, endTime,
				1000000, 0);//上限100万条数据
		Export3(response,list.get(3),list.get(4));
	}
	
	/**
	 * 质量IQC来料检验台账(1)-汇总
	 **/
	public ApiResponseResult getQualCheckReport1(String year, String month, String target, Integer dataType)
			throws Exception {
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA",
				UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode(),0);
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}	
		return ApiResponseResult.success().data(list.get(2));
	}
	public void getQualCheckExport1(HttpServletResponse response,String year,
			String month, String target, Integer dataType)throws Exception{
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA", UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode(),1);
		Export3(response,list.get(2),list.get(3));
	}
	
	/**
	 * 质量IQC来料检验台账(2)-明细
	 **/
	public ApiResponseResult getQualCheckReport2(String year, String month, String target, Integer dataType)
			throws Exception {
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA",
				UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode(),0);
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		return ApiResponseResult.success().data(list.get(2));
	}
	public void getQualCheckExport2(HttpServletResponse response,String year,
			String month, String target, Integer dataType)throws Exception{
		List<Object> list = getQualCheckReportPrc("PRC_APP_IQCREPORT_DATA", UserUtil.getSessionUser().getFcompany() + "", UserUtil.getSessionUser().getFfactory() + "", year, month,
				target, dataType, UserUtil.getSessionUser().getFcode(),1);
		Export3(response,list.get(2),list.get(3));
	}
	
	/**
	 * 生产日报-按工单
	 * dataType:0[取工序列表]/1[数据明细]/2[图表明细]
	 **/
	public ApiResponseResult getProdDailyByTaskReport(String proc,String begTime,
			String endTime, Integer dataType)
			throws Exception {
		List<Object> list = getProdDailyByTaskReportPrc("PRC_APP_TASK_CALCULATE_DATA",
				proc, begTime,endTime, dataType);
		if (!list.get(0).toString().equals("0")) {// 存储过程调用失败 //判断返回游标
			return ApiResponseResult.failure(list.get(1).toString());
		}
		return ApiResponseResult.success().data(list.get(2));
	}
	public void getProdDailyByTaskExport(HttpServletResponse response,String proc,String begTime,
			String endTime, Integer dataType)throws Exception{
		List<Object> list = getProdDailyByTaskReportPrc("PRC_APP_TASK_CALCULATE_DATA",
				proc, begTime,endTime, dataType);
		Export3(response,list.get(2),list.get(3));
	}
}
