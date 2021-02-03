/**
 * 质量IQC来料检验台账
 */
var pageCurr;
$(function() {
	/*layui.extend({
		echarts : '{/}/layuiadmin/lib/extend/echarts' // {/}的意思即代表采用自有路径，即不跟随base路径
	})*/
	layui.use([ 'form', 'table', 'laydate', 'echarts' ], function() {
		var table = layui.table, form = layui.form, laydate = layui.laydate, echarts = layui.echarts;
		form.render();
		tableIns = table.render({
			elem : '#listTable',
			// url : context + '/base/line/getList',
			method : 'get',// 默认：get请求
			// toolbar : '#toolbar', // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			cellMinWidth : 80,
			height : 'full-340',// 固定表头&full-查询框高度

			even : true,// 条纹样式
			data : [],
			page : false,
			request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			parseData : function(res) {
				console.log(res)
				if (!res.result) {
					setEcharts()
					return {
						"count" : 0,
						"msg" : res.msg,
						"data" : [],
						"code" : res.status
					}
				}
				setEcharts(res.data[1])
				// 可进行数据操作
				return {
					"count" : 0,
					"msg" : res.msg,
					"data" : res.data[0].ordData,
					"code" : res.status
				// code值为200表示成功
				}
			},
			cols : [ [ {
				type : 'numbers'
			}, {
				field : '项目',
				title : '项目',
				width : 120,
			}, {
				field : '合计',
				title : '合计',
				width : 90,
			}, {
				field : 'D1',
				title : 'D1',
				width : 80,
			}, {
				field : 'D2',
				title : 'D2',
				width : 80,
			}, {
				field : 'D3',
				title : 'D3',
				width : 80,
			}, {
				field : 'D4',
				title : 'D4',
				width : 80,
			}, {
				field : 'D5',
				title : 'D5',
				width : 80,
			}, {
				field : 'D6',
				title : 'D6',
				width : 80,
			}, {
				field : 'D7',
				title : 'D7',
				width : 80,
			}, {
				field : 'D8',
				title : 'D8',
				width : 80,
			}, {
				field : 'D9',
				title : 'D9',
				width : 80,
			}, {
				field : 'D10',
				title : 'D10',
				width : 80,
			}, {
				field : 'D11',
				title : 'D11',
				width : 80,
			}, {
				field : 'D12',
				title : 'D12',
				width : 80,
			}, {
				field : 'D13',
				title : 'D13',
				width : 80,
			}, {
				field : 'D14',
				title : 'D14',
				width : 80,
			}, {
				field : 'D15',
				title : 'D15',
				width : 80,
			}, {
				field : 'D16',
				title : 'D16',
				width : 80,
			}, {
				field : 'D17',
				title : 'D17',
				width : 80,
			}, {
				field : 'D18',
				title : 'D18',
				width : 80,
			}, {
				field : 'D19',
				title : 'D19',
				width : 80,
			}, {
				field : 'D20',
				title : 'D20',
				width : 80,
			}, {
				field : 'D21',
				title : 'D21',
				width : 80,
			}, {
				field : 'D22',
				title : 'D22',
				width : 80,
			}, {
				field : 'D23',
				title : 'D23',
				width : 80,
			}, {
				field : 'D24',
				title : 'D24',
				width : 80,
			}, {
				field : 'D25',
				title : 'D25',
				width : 80,
			}, {
				field : 'D26',
				title : 'D26',
				width : 80,
			}, {
				field : 'D27',
				title : 'D27',
				width : 80,
			}, {
				field : 'D28',
				title : 'D28',
				width : 80,
			}, {
				field : 'D29',
				title : 'D29',
				width : 80,
			}, {
				field : 'D30',
				title : 'D30',
				width : 80,
			}, {
				field : 'D31',
				title : 'D31',
				width : 80,
			} ] ],
			done : function(res, curr, count) {
				pageCurr = curr;
			}
		});

		tableIns2 = table.render({
			elem : '#listTable2',
			// url : context + '/base/line/getList',
			method : 'get',// 默认：get请求
			// toolbar : '#toolbar', // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			cellMinWidth : 80,
			height : 'full-115',// 固定表头&full-查询框高度
			even : true,// 条纹样式
			data : [],
			page : false,
			request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			parseData : function(res) {
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
					"data" : res.data,
					"code" : res.status
				// code值为200表示成功
				}
			},
			cols : [ [ {
				type : 'numbers'
			}, {
				field : '供应商名称',
				title : '供应商名称',
				width : 180,
			}, {
				field : '供应商编码',
				title : '供应商编码',
				width : 150,
			}, {
				field : '年份',
				title : '年份',
				width : 100,
			}, {
				field : '月份',
				title : '月份',
				width : 100,
			}, {
				field : '批次',
				title : '批次',
				width : 120,
			}, {
				field : '检验时间',
				title : '检验时间',
				width : 160,
			}, {
				field : '检验结果',
				title : '检验结果',
				width : 120,
			}, {
				field : '物料名称',
				title : '物料名称',
				width : 150,
			}, {
				field : '物料编码',
				title : '物料编码',
				width : 150,
			} ] ],
			done : function(res, curr, count) {
				// console.log(res)
				pageCurr = curr;
			}
		});
		// 自定义验证规则
		form.verify({
			double : function(value) {// 可为空	
				if (/^\d+$/.test(value) == false && /^\d+\.\d+$/.test(value) == false && value != "" && value != null) {
					return '只能输入数字';
				}else if(value>100){
					 return '目标值应小于100';
				 }else if(value.toString().indexOf(".")!=-1){
					 if(value.toString().split(".")[1].length>2){
						 return '目标值最多含2位小数';
					 }	 
				 }
			}
		});

		// 监听搜索框
		form.on('submit(searchSubmit)', function(data) {
			// 重新加载table
			// console.log(data.field)
			var params1 = {
				"target" : data.field.target,
				"month" : data.field.month,
				"year" : data.field.inputCode,
				"dataType" : 1
			};
			console.log(params1)
			getReport1(params1)
			var params2 = {
				"target" : data.field.target,
				"month" : data.field.month,
				"year" : data.field.inputCode,
				"dataType" : 2
			};
			console.log(params2)
			getReport2(params2)
			return false;
		});
		/**导出-start**/
		//提示语句
		var tip_index1 = 0;
		$(document).on('mouseover', '#exportData1', function(data) {
			tip_index1 = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为15秒</span>", ($(this)), {
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
			tip_index2 = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为15秒</span>", ($(this)), {
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
				"target" : data.field.target,
				"month" : data.field.month,
				"year" : data.field.inputCode,
				"dataType" : 1
			};
			doExport1(params)	
			var countdown = setInterval(function(){
				$("#exportData1").removeClass("layui-btn-disabled");
				$('#exportData1').attr("disabled",false);
				$("#exportData2").removeClass("layui-btn-disabled");
				$('#exportData2').attr("disabled",false);
			},15*1000);	
			return false;
		});
		form.on('submit(exportData2)', function(data) {
			$("#exportData1").addClass("layui-btn-disabled");
			$('#exportData1').attr("disabled",true);
			$("#exportData2").addClass("layui-btn-disabled");
			$('#exportData2').attr("disabled",true);		
			var params = {
				"target" : data.field.target,
				"month" : data.field.month,
				"year" : data.field.inputCode,
				"dataType" : 2
			};
			doExport2(params)			
			var countdown = setInterval(function(){
				$("#exportData1").removeClass("layui-btn-disabled");
				$('#exportData1').attr("disabled",false);
				$("#exportData2").removeClass("layui-btn-disabled");
				$('#exportData2').attr("disabled",false);
			},15*1000);
			return false;
		});
		/**导出-end**/
		form.on('select(selectCode)', function(data) { // 选择移交单位 赋值给input框
			var select_text = data.elem[data.elem.selectedIndex].text;
			$("#inputCode").val(select_text);
			$("#selectCode").next().find("dl").css({
				"display" : "none"
			});
			$("#defName").val("");
			form.render();
		});

		$('#inputCode').bind('input propertychange', function() {
			var value = $("#inputCode").val();
			$("#selectCode").val(value);
			form.render();
			$("#selectCode").next().find("dl").css({
				"display" : "block"
			});
			var dl = $("#selectCode").next().find("dl").children();
			var j = -1;
			for (var i = 0; i < dl.length; i++) {
				if (dl[i].innerHTML.indexOf(value) <= -1) {
					dl[i].style.display = "none";
					j++;
				}
				if (j == dl.length - 1) {
					$("#selectCode").next().find("dl").css({
						"display" : "none"
					});
				}
			}
		});

		function setEcharts(listData) {
			var xData = [];
			var yData = [];
			var tData = [];
			if (listData) {
				xData = listData.columnNames;
				xData.splice(0, 2)// 去掉项目、合计

				yData = listData.index3;
				yData.splice(0, 2)// 去掉项目、合计-数据

				tData = listData.index4;
				tData.splice(0, 2)// 去掉项目、合计-数据
			}

			var my_echarts = echarts.init(document.getElementById('echart1'));
			my_echarts.setOption({
				color : [ "#0033CC", "#CC0033" ],
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'cross',
						crossStyle : {
							color : '#999'
						}
					},
					formatter : '合格批率: {c0}%<br />目标值: {c1}%'
				},
				grid : {
					x : 30,// 左边距
					y : 30,// 上边距
					x2 : 0,// 右边距
					y2 : 20,// 下边距
					borderWidth : 0
				},
				legend : {
					//orient: 'vertical',
			        x:'right',      //可设定图例在左、右、居中
			        top:2,   
					data : ['合格批率', '目标值' ],
					textStyle : {
						fontSize : 14,// 字体大小
					},
				},
				xAxis : {
					type : 'category',
					// data : [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
					// ],
					data : xData,
					splitLine : {
						show : false
					},
					axisPointer : {
						type : 'shadow'
					},
					axisLabel : {
						show : true,
						textStyle : {
							color : '#000000',
							fontSize : 12,
						}
					},
					axisLine : {
						lineStyle : {
							color : 12
						}
					},
				},
				yAxis : {
					type : 'value',
					name : '(%)',
					nameTextStyle : {
						fontSize : 12
					},
					splitLine : {
						show : false
					},
					axisLabel : {
						textStyle : {
							color : '#000000',
							fontSize : 12,// 字体大小
						}
					},
					axisLine : {
						lineStyle : {
							color : '#000000'
						}
					},
				},
				series : [ {
					name : '合格批率',
					data : yData,// 合格批率深蓝色线
					type : 'line',

				}, {
					name : '目标值',
					data : tData,// 目标值：红色线
					type : 'line'
				} ]

			})
		}

	});
});

function doExport1(params){
	location.href = context + "lyt_report/getQualCheckExport1?target="+params.target+"&month="+
	params.month+"&year="+ params.year+"&dataType="+params.dataType;
}
function doExport2(params){
	location.href = context + "lyt_report/getQualCheckExport2?target="+params.target+"&month="+
	params.month+"&year="+ params.year+"&dataType="+params.dataType;
}

function getReport1(params) {
	tableIns.reload({
		url : context + 'lyt_report/getQualCheckReport1',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})
}
function getReport2(params) {
	tableIns2.reload({
		url : context + 'lyt_report/getQualCheckReport2',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})
}
