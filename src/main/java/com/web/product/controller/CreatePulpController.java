package com.web.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.base.control.WebController;
import com.app.base.data.ApiResponseResult;
import com.web.product.service.CreatPulpService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(description = "创建制浆作业")
@RestController
@RequestMapping(value = "/create_pulp")
public class CreatePulpController extends WebController {
	
	 @Autowired
	 private CreatPulpService creatPulpService;
	 
	 @ApiOperation(value = "根据设备号获取信息", notes = "根据设备号获取信息")
	    @RequestMapping(value = "/afterDevice", method = RequestMethod.POST, produces = "application/json")
	    public ApiResponseResult afterDevice(@RequestParam(value = "device") String device){
	        try{
	            return creatPulpService.afterDevice(device);
	        }catch (Exception e){
	            e.printStackTrace();
	            return ApiResponseResult.failure(e.toString());
	        }
	 }
	 
	 @ApiOperation(value = "根据工号获取信息", notes = "根据工号获取信息")
	    @RequestMapping(value = "/afterJob", method = RequestMethod.POST, produces = "application/json")
	    public ApiResponseResult afterJob(String userCode) throws Exception{
	        try{
	            return creatPulpService.afterJob(userCode);
	        }catch (Exception e){
	            e.printStackTrace();
	            return ApiResponseResult.failure(e.toString());
	        }
	    }
	 
	 @ApiOperation(value = "根据工单获取信息", notes = "根据工单获取信息")
	    @RequestMapping(value = "/afterOrder", method = RequestMethod.POST, produces = "application/json")
	    public ApiResponseResult afterOrder(String order) throws Exception{
	        try{
	            return creatPulpService.afterOrder(order);
	        }catch (Exception e){
	            e.printStackTrace();
	            return ApiResponseResult.failure(e.toString());
	        }
	    }
	 
	 @ApiOperation(value = "根据批量获取信息", notes = "根据批量获取信息")
	    @RequestMapping(value = "/afterBatch", method = RequestMethod.POST, produces = "application/json")
	    public ApiResponseResult afterBatch(String param) throws Exception{
	        try{
	            return creatPulpService.afterBatch(param);
	        }catch (Exception e){
	            e.printStackTrace();
	            return ApiResponseResult.failure(e.toString());
	        }
	    }
	 
	 @ApiOperation(value = "删除工单", notes = "删除工单")
	    @RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json")
	    public ApiResponseResult delete(String order) throws Exception{
	        try{
	            return creatPulpService.delete(order);
	        }catch (Exception e){
	            e.printStackTrace();
	            return ApiResponseResult.failure(e.toString());
	        }
	    }
}
