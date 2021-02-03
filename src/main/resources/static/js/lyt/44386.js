/**
 * 电芯测试结果报表
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
			height : 'full-80',// 固定表头&full-查询框高度

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
				field : '工单号',
				title : '工单号',
				width : 110,
				sort : true
			}, {
				field : '线号',
				title : '线号',
				width : 80,
			}, {
				field : '测试人员',
				title : '测试人员',
				width : 90,
			}, {
				field : '测试时间',
				title : '测试时间',
				width : 160,
			},{
				field : '电芯条码',
				title : '电芯条码',
				width : 200,
			},{
				field : '电压V',
				title : '电压V',
				width : 120,
			},{
				field : '内阻MΩ',
				title : '内阻MΩ',
				width : 100,
			},{
				field : '测试结果',
				title : '测试结果',
				width : 90,
			},{
				field : '重测人',
				title : '重测人',
				width : 140,
			}, {
				field : '重测时间',
				title : '重测时间',
				width : 160,
			}, {
				field : '内阻设置上限MΩ',
				title : '内阻设置上限MΩ',
				width : 160,
			}, {
				field : '内阻设置下限MΩ',
				title : '内阻设置下限MΩ',
				width : 120,
			},{
				field : '来料容量',
				title : '来料容量',
				width : 120,
			}, {
				field : '来料内阻MΩ',
				title : '来料内阻MΩ',
				width : 120,
			},{
				field : '来料OCV2电压V',
				title : '来料OCV2电压V',
				width : 120,
			},{
				field : '来料OCV2测试时间',
				title : '来料OCV2测试时间',
				width : 160,
			},{
				field : '来料分档',
				title : '来料分档',
				width : 120,
			},   {
				field : 'K值',
				title : 'K值',
				width : 100,
			}, {
				field : 'K值上限',
				title : 'K值上限',
				width : 100,
			}, {
				field : '测试设备编号',
				title : '测试设备编号',
				width : 120,
			},  {
				field : '电压设置上限V',
				title : '电压设置上限V',
				width : 120,
			}, {
				field : '电压设置下限V',
				title : '电压设置下限V',
				width : 120,
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
		
		var tip_index = 0;
		$(document).on('mouseover', '#exportData', function(data) {
			tip_index = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为20秒</span>", ($(this)), {
				tips : [ 3, '5CBA59' ],
				time : 0,
				time : 0,
				area : [ '150px' ]
			});

		}).on('mouseleave', '#exportData', function() {
			layer.close(tip_index);
		});
		
		form.on('submit(exportData)', function(data) {
			$("#exportData").addClass("layui-btn-disabled");
			$('#exportData').attr("disabled",true);				
			
			var params = {
				"taskNo" :data.field.taskNo,
				"batNo" : data.field.batNo,
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
			};
			doExport(params)
			
			var countdown = setInterval(function(){
				$("#exportData").removeClass("layui-btn-disabled");
				$('#exportData').attr("disabled",false);
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
		url : context + 'lyt_report/getDXTestReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})	
}

function doExport(params){
	location.href = context + "lyt_report/getDXTestPrint?taskNo="+params.taskNo+"&batNo="+
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

