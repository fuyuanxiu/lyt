/**
 * 包装记录结果（决策报表）
 */
var pageCurr;
$(function() {
	layui.use([ 'form', 'table', 'laydate'], function() {
		var table = layui.table, form = layui.form, laydate = layui.laydate;

		tableIns = table.render({
			elem : '#listTable',
			// url : context + '/base/line/getList',
			method : 'get' ,// 默认：get请求
			//toolbar : '#toolbar', // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			cellMinWidth : 80,
			height : 'full-150',// 固定表头&full-查询框高度
			even : true,// 条纹样式
			data : [],
			page : true,
			limit : 50,
			limits : [ 50, 100, 200, 500, 1000, 5000 ],
			request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			parseData : function(res) {
				//console.log(res)
				if (!res.result) {
					return {
						"count" : 0,
						"msg" : res.msg,
						"data" : [],
						"code" : res.status
					}
				}
				// 可进行数据操作
				return {
					"count" : res.data.total,
					"msg" : res.msg,
					"data" : res.data.rows,
					"code" : res.status
				// code值为200表示成功
				}
			},
			cols : [ [ {
				type : 'numbers'
			},
			{
				field : '工单',
				title : '工单',
				width : 110,
				sort : true
			}, {
				field : '产品条码',
				title : '产品条码',
				width : 200,
			},{
				field : '箱号最大可装数量',
				title : '箱号最大可装数量',
				width : 130,
			}, {
				field : '箱号',
				title : '箱号',
				width : 130,
			}, {
				field : '箱号已装数量',
				title : '箱号已装数量',
				width : 110,
			}, {
				field : '出货通知单号',
				title : '出货通知单号',
				width : 130,
			},{
				field : '子产品条码',
				title : '子产品条码',
				width : 200,
			},{
				field : '班次号',
				title : '班次号',
				width : 80,
			},{
				field : '线体号',
				title : '线体号',
				width : 90,
			},{
				field : '班组',
				title : '班组',
				width : 90,
			}, {
				field : '包装批次号',
				title : '包装批次号',
				width : 130,
			}, {
				field : '箱打印次数',
				title : '箱打印次数',
				width : 100,
			},{
				field : '卡板打印次数',
				title : '卡板打印次数',
				width : 110,
			},{
				field : '卡板号',
				title : '卡板号',
				width : 130,
			},{
				field : '卡板重量',
				title : '卡板重量',
				width : 100,
			},{
				field : '箱重量',
				title : '箱重量',
				width : 100,
			} ] ],
			done : function(res, curr, count) {
				//console.log(res)
				pageCurr = curr;
			}
		});
		
		tableIns2 = table.render({
			elem : '#listTable2',
			// url : context + '/base/line/getList',
			method : 'get' ,// 默认：get请求
			//toolbar : '#toolbar', // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			cellMinWidth : 80,
			height : 'full-150',// 固定表头&full-查询框高度
			even : true,// 条纹样式
			data : [],
			page : true,
			limit : 50,
			limits : [ 50, 100, 200, 500, 1000, 5000 ],
			request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			parseData : function(res) {
				console.log(res)
				if (!res.result) {
					return {
						"count" : 0,
						"msg" : res.msg,
						"data" : [],
						"code" : res.status
					}
				}
				// 可进行数据操作
				return {
					"count" : res.data.total,
					"msg" : res.msg,
					"data" : res.data.rows,
					"code" : res.status
				// code值为200表示成功
				}
			},
			cols : [ [ {
				type : 'numbers'
			},
			{
				field : '工单',
				title : '工单',
				sort : true
			},{
				field : '箱数',
				title : '箱数',
			},{
				field : '卡板数',
				title : '卡板数',
			} ] ],
			done : function(res, curr, count) {
				//console.log(res)
				pageCurr = curr;
			}
		});
		
		setTaskData()
		
		// 监听搜索框
		form.on('submit(searchSubmit)', function(data) {
			// 重新加载table
			//console.log(data.field)
			var params = {
				"taskNo" :data.field.taskNo,
				"batNo" : data.field.batNo,
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
			};
			//console.log(params)
			getReport(params)
			return false;
		});
		
		
		var tip_index1 = 0;
		$(document).on('mouseover', '#exportData1', function(data) {
			tip_index1 = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为20秒</span>", ($(this)), {
				tips : [ 3, '5CBA59' ],
				time : 0,
				time : 0,
				area : [ '150px' ]
			});
		}).on('mouseleave', '#exportData1', function() {
			layer.close(tip_index1);
		});
		var tip_index2 = 0;
		$(document).on('mouseover', '#exportData2', function(data) {
			tip_index2 = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为20秒</span>", ($(this)), {
				tips : [ 3, '5CBA59' ],
				time : 0,
				time : 0,
				area : [ '150px' ]
			});
		}).on('mouseleave', '#exportData2', function() {
			layer.close(tip_index2);
		});
		
		
		form.on('submit(exportData1)', function(data) {
			$("#exportData1").addClass("layui-btn-disabled");
			$('#exportData1').attr("disabled",true);
			$("#exportData2").addClass("layui-btn-disabled");
			$('#exportData2').attr("disabled",true);
			
			var params = {
				"taskNo" :data.field.taskNo,
				"batNo" : data.field.batNo,
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
			};
			doExport1(params)
			
			var countdown = setInterval(function(){
				$("#exportData1").removeClass("layui-btn-disabled");
				$('#exportData1').attr("disabled",false);
				$("#exportData2").removeClass("layui-btn-disabled");
				$('#exportData2').attr("disabled",false);
			},20*1000);
			
			return false;
		});
		form.on('submit(exportData2)', function(data) {
			$("#exportData1").addClass("layui-btn-disabled");
			$('#exportData1').attr("disabled",true);
			$("#exportData2").addClass("layui-btn-disabled");
			$('#exportData2').attr("disabled",true);
			
			var params = {
				"taskNo" :data.field.taskNo,
				"batNo" : data.field.batNo,
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
			};
			doExport2(params)
			
			var countdown = setInterval(function(){
				$("#exportData1").removeClass("layui-btn-disabled");
				$('#exportData1').attr("disabled",false);
				$("#exportData2").removeClass("layui-btn-disabled");
				$('#exportData2').attr("disabled",false);
			},20*1000);
			
			return false;
		});
		
		//监听下拉选择事件
		form.on('select(taskNoSelect)',function(data) { // 选择移交单位 赋值给input框
			var select_text = data.elem[data.elem.selectedIndex].text;
			var str=select_text;
			var sel=str.split("|");
			$("#taskNo").val(sel[0]);
			$("#prodCode").val(sel[1]);
			$("#prodType").val(sel[2]);
			$("#taskNoSelect").next().find("dl").css({"display" : "none"});
			form.render();
		});
		//输入事件-实现下拉框筛选
		$('#taskNo').bind('input propertychange',function() {
			var value = $("#taskNo").val();
			$("#taskNoSelect").val(value);
			form.render();
			$("#taskNoSelect").next().find("dl")
					.css({"display" : "block"});
			var dl = $("#taskNoSelect").next().find("dl").children();
			var j = -1;
			for (var i = 0; i < dl.length; i++) {
				if (dl[i].innerHTML.indexOf(value) <= -1) {
					dl[i].style.display = "none";
					j++;
				}
				if (j == dl.length - 1) {
					$("#taskNoSelect").next().find("dl").css({"display" : "none"});
				}
			}
		});
		
		// 日期
		laydate.render({
			elem : '#begTime',
			type: 'datetime',
			trigger : 'click',
		});
		laydate.render({
			elem : '#endTime',
			type: 'datetime',
			trigger : 'click',
			value: new Date() 
		});

	});

});
function getReport(params) {
	tableIns.reload({
		url : context + 'lyt_report/getPackRecordReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})	
	
	tableIns2.reload({
		url : context + 'lyt_report/getPackRecordSumReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})	
}


//function doExport(params){
//	location.href = context + "lyt_report/getDXTestPrint?taskNo="+params.taskNo+"&batNo="+
//	params.batNo+"&begTime="+ params.begTime+"&endTime="+params.endTime;
//}


function doExport1(params){
	location.href = context + "lyt_report/getPackRecordExport?taskNo="+params.taskNo+"&batNo="+
	params.batNo+"&begTime="+ params.begTime+"&endTime="+params.endTime;
}

function doExport2(params){

	location.href = context + "lyt_report/getPackRecordSumExport?taskNo="+params.taskNo+"&batNo="+
	params.batNo+"&begTime="+ params.begTime+"&endTime="+params.endTime;
}


function setTaskData(){
	var data=taskNoList.data[2]
	//console.log(data)
	$("#taskNoSelect").empty();
	$("#taskNoSelect").append("<option value=''></option>");
	for(var i=0;i<data.length;i++){
		$("#taskNoSelect").append("<option value=" + data[i].工单号 + ">"
						+ data[i].工单号 + "|"
						+ data[i].产品编码 + "|"+data[i].型号+"</option>");
	}
	layui.form.render('select');
}

