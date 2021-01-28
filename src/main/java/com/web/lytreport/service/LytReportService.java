package com.web.lytreport.service;

import org.springframework.data.domain.PageRequest;

import com.app.base.data.ApiResponseResult;

public interface LytReportService {

	//获取工单下拉数据源
	public ApiResponseResult getTaskNo(String keyword)throws Exception;
	
	//获取电芯测试结果报表-44386.html
	public ApiResponseResult getDXTestReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//模组测试结果报表-45112.html
	public ApiResponseResult getMZTestReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//气密性测试结果报表-44962.html
	public ApiResponseResult getQMXTestReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//整机测试结果报表-44939.html
	public ApiResponseResult getZJTestReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//电芯配对测试结果报表-45119.html(1)
	public ApiResponseResult getPDTestReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//电芯配对统计报表-45119.html(2)
	public ApiResponseResult getPDSumReport(String taskNo,String batNo,String begTime,String endTime,PageRequest pageRequest)throws Exception;
	
	//质量IQC来料检验台账-1
	public ApiResponseResult getQualCheckReport1(String year,String month, String target,Integer dataType)throws Exception;
	
	//质量IQC来料检验台账-2
	public ApiResponseResult getQualCheckReport2(String year,String month, String target,Integer dataType)throws Exception;
}