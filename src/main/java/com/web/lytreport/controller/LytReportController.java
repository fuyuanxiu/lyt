package com.web.lytreport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.app.base.control.WebController;
import com.app.base.data.ApiResponseResult;
import com.web.lytreport.service.LytReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(description = "lyt报表")
@CrossOrigin
@ControllerAdvice
//@RestController
@Controller
@RequestMapping(value = "/lyt_report")
public class LytReportController extends WebController {

	@Autowired
	private LytReportService lytReportService;
	
	@RequestMapping(value = "/toPage", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView toPage(String pageId) {
		String method = "/lyt_report/toPage"+pageId;
		String methodName ="报表页";
		ModelAndView mav=new ModelAndView();
		
		try {	
			ApiResponseResult taskNoList = lytReportService.getTaskNo("");
			mav.addObject("taskNoList",taskNoList);
			mav.setViewName("/lyt/"+pageId+".html");//返回路径-报表文件名设置为ID，从数据获取的内容
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取报表页"+pageId+".html 异常！", e);
		}	
		return mav;
	}
	/**
	 * 44386.html
	 * **/
	@ApiOperation(value = "获取电芯测试结果报表", notes = "获取电芯测试结果报表", hidden = true)
	@RequestMapping(value = "/getDXTestReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getDXTestReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getDXTestReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取电芯测试结果报表=getDXTestReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取电芯测试结果报表失败！", e);
			return ApiResponseResult.failure("获取电芯测试结果报表失败！");
		}
	}
	
	/**
	 * 45112.html
	 * **/
	@ApiOperation(value = "获取模组测试结果报表", notes = "获取模组测试结果报表", hidden = true)
	@RequestMapping(value = "/getMZTestReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getMZTestReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getMZTestReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取模组测试结果报表=getMZTestReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取模组测试结果报表失败！", e);
			return ApiResponseResult.failure("获取模组测试结果报表失败！");
		}
	}
	
	/**
	 * 44962.html
	 * **/
	@ApiOperation(value = "获取气密性测试结果报表", notes = "获取气密性测试结果报表", hidden = true)
	@RequestMapping(value = "/getQMXTestReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getQMXTestReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getQMXTestReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取气密性测试结果报表=getQMXTestReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取气密性测试结果报表失败！", e);
			return ApiResponseResult.failure("获取气密性测试结果报表失败！");
		}
	}
	
	/**
	 * 44939.html
	 * **/
	@ApiOperation(value = "获取整机测试结果报表", notes = "获取整机测试结果报表", hidden = true)
	@RequestMapping(value = "/getZJTestReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getZJTestReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getZJTestReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取整机测试结果报表=getZJTestReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取整机测试结果报表失败！", e);
			return ApiResponseResult.failure("获取整机测试结果报表失败！");
		}
	}
	
	/**
	 * 45119.html(1)
	 * **/
	@ApiOperation(value = "获取电芯配对测试结果报表", notes = "获取电芯配对测试结果报表", hidden = true)
	@RequestMapping(value = "/getPDTestReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getPDTestReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getPDTestReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取电芯配对测试结果报表=getPDTestReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取电芯配对测试结果报表失败！", e);
			return ApiResponseResult.failure("获取电芯配对测试结果报表失败！");
		}
	}
	
	/**
	 * 45119.html(2)
	 * **/
	@ApiOperation(value = "获取电芯配对统计报表", notes = "获取电芯配对统计报表", hidden = true)
	@RequestMapping(value = "/getPDSumReport", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getPDSumReport(String taskNo,String batNo,String begTime,String endTime) {
		try {
			Sort sort = Sort.unsorted();
			ApiResponseResult result = lytReportService.getPDSumReport(taskNo,batNo,begTime,endTime,super.getPageRequest(sort));
			logger.debug("获取电芯配对统计报表=getPDSumReport:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取电芯配对统计报表失败！", e);
			return ApiResponseResult.failure("获取电芯配对统计报表失败！");
		}
	}
	
	@ApiOperation(value = "获取工单信息", notes = "获取工单信息", hidden = true)
	@RequestMapping(value = "/getTaskNo", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getTaskNo(String keyword) {
		try {
			ApiResponseResult result = lytReportService.getTaskNo(keyword);
			logger.debug("获取工单信息=lyt/getTaskNo:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取工单信息失败！", e);
			return ApiResponseResult.failure("获取工单信息失败！");
		}
	}
	
	/**
	 * 43789.html 取两次
	 * **/
	@ApiOperation(value = "获取质量IQC来料检验台账", notes = "获取质量IQC来料检验台账", hidden = true)
	@RequestMapping(value = "/getQualCheckReport1", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getQualCheckReport1(String year,String month,
			String target,Integer dataType) {
		try {
			ApiResponseResult result = lytReportService.getQualCheckReport1(year,month,target,dataType);
			logger.debug("获取质量IQC来料检验台账=getQualCheckReport1:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取质量IQC来料检验台账失败！", e);
			return ApiResponseResult.failure("获取质量IQC来料检验台账失败！");
		}
	}
	@ApiOperation(value = "获取质量IQC来料检验台账", notes = "获取质量IQC来料检验台账", hidden = true)
	@RequestMapping(value = "/getQualCheckReport2", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponseResult getQualCheckReport2(String year,String month,
			String target,Integer dataType) {
		try {
			ApiResponseResult result = lytReportService.getQualCheckReport2(year,month,target,dataType);
			logger.debug("获取质量IQC来料检验台账=getQualCheckReport2:" + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("获取质量IQC来料检验台账失败！", e);
			return ApiResponseResult.failure("获取质量IQC来料检验台账失败！");
		}
	}
}
