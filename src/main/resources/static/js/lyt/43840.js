/**
 * 生产报表——按工单
 */
var pageCurr;
$(function() {
	layui.use([ 'form', 'table', 'laydate', 'echarts' ], function() {
		var table = layui.table, form = layui.form, laydate = layui.laydate, echarts = layui.echarts;
		form.render();
		setSelectData()
		tableIns = table.render({
			elem : '#listTable',
			// url : context + '/base/line/getList',
			method : 'get',// 默认：get请求
			// toolbar : '#toolbar', // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			cellMinWidth : 80,
			height : 'full-330',// 固定表头&full-查询框高度
			even : true,// 条纹样式
			data : [],
			page : false,
			request : {
				pageName : 'page', // 页码的参数名称，默认：page
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			parseData : function(res) {
				// console.log(res)
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
					"count" : 0,
					"msg" : res.msg,
					"data" : res.data,
					"code" : res.status
				// code值为200表示成功
				}
			},
			cols : [ [ {
				type : 'numbers'
			}, {
				field : '生产工单',
				title : '生产工单',
				width : 120,
			}, {
				field : '机种编码',
				title : '机种编码',
				width : 120,
			}, {
				field : '产品型号',
				title : '产品型号',
				width : 100,
			}, {
				field : '工序编码',
				title : '工序编码',
				width : 90,
			}, {
				field : '工序名称',
				title : '工序名称',
				width : 110,
			}, {
				field : '工单计划数量',
				title : '工单计划数量',
				width : 110,
			}, {
				field : '投入数量',
				title : '投入数量',
				width : 90,
			}, {
				field : '产出数量',
				title : '产出数量',
				width : 85,
			}, {
				field : '不良数量',
				title : '不良数量',
				width : 85,
			}, {
				field : '工单完成率',
				title : '工单完成率',
				width : 100,
			}, {
				field : '工单良品率',
				title : '工单良品率',
				width : 100,
			} ] ],
			done : function(res, curr, count) {
				pageCurr = curr;
			}
		});

		// 监听搜索框
		form.on('submit(searchSubmit)', function(data) {
			var params1 = {
				"proc" : data.field.inputCode,
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
				"dataType" : 1
			};
			getReport1(params1)
			var params2 = {
				"proc" : "",
				"begTime" : data.field.begTime,
				"endTime" : data.field.endTime,
				"dataType" : 2
			};
			getReport2(params2)
			return false;
		});
		
		var tip_index = 0;
		$(document).on('mouseover', '#exportData', function(data) {
			tip_index = layer.tips("<span style='font-size:13px;line-height:18px;'>两次导出间隔为15秒</span>", ($(this)), {
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
					"proc" : data.field.inputCode,
					"begTime" : data.field.begTime,
					"endTime" : data.field.endTime,
			};
			doExport(params)
			
			var countdown = setInterval(function(){
				$("#exportData").removeClass("layui-btn-disabled");
				$('#exportData').attr("disabled",false);
			},15*1000);
			
			return false;
		});
		
		form.on('select(selectCode)', function(data) { // 选择移交单位 赋值给input框
			var select_text = data.elem[data.elem.selectedIndex].text;
			$("#inputCode").val(select_text.substring(0, select_text.indexOf("-")));
			$("#selectCode").next().find("dl").css({
				"display" : "none"
			});
			$("#defName").val("");
			form.render();
		});
		// 日期
		laydate.render({
			elem : '#begTime',
			type : 'date',
			trigger : 'click',
		});
		laydate.render({
			elem : '#endTime',
			type : 'date',
			trigger : 'click',
			value : new Date()
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
		function getReport2(params) {
			$.ajax({
				type : "get",
				url : context + 'lyt_report/getProdDailyByTaskReport',
				data : params,
				dataType : 'json',
				success : function(res) {
					console.log(res)
					if (res.result) {
						if (res.data.length > 0) {
							setEcharts(res.data)
						} else {
							setEcharts()
						}

					} else {
						setEcharts()
					}
				}
			})
		}

		function setEcharts(listData) {
			var xData = [];
			var yData = [];// -bar
			var tData = [];// -line
			var maxDt = 0;
			if (listData) {
				maxDt = listData[0].总不良数;
				for (var i = 0; i < listData.length; i++) {
					xData.push(listData[i].不良名称)
					yData.push(listData[i].不良数量)
					var f = listData[i].累计不良率.substr(0, 1)
					if (f == ".") {
						var t = listData[i].累计不良率.split("");// 字符串处理
						t.splice(0, 0, "0");
						t = t.join("")
						tData.push(t)
					} else {
						tData.push(listData[i].累计不良率)
					}
				}
			}

			var my_echarts = echarts.init(document.getElementById('echart1'));
			my_echarts.setOption({
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'cross',
						crossStyle : {
							color : '#999'
						}
					},
					formatter : '不良数量: {c0}<br />累计不良率: {c1}'
				},
				grid : {
					x : 30,// 左边距
					y : 30,// 上边距
					x2 : 30,// 右边距
					y2 : 20,// 下边距
					borderWidth : 0
				},
				legend : {
					// orient: 'vertical',
					x : 'center', // 可设定图例在左、右、居中
					top : 0,
					data : [ '累计不良率' ],
					textStyle : {
						fontSize : 12,// 字体大小
						color : '#000000'// 字体颜色
					},
				},
				color : [ '#0000FF' ],
				xAxis : [ {
					type : 'category',
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
							color : '#000000'
						}
					},
					minorTick : {
						show : true
					},
					minorSplitLine : {
						show : true
					}
				} ],
				yAxis : [ {
					type : 'value',
					name : '(个)',
					min : 0,
					max : maxDt,
					nameTextStyle : {
						fontSize : 12
					},
					splitLine : {
						show : false
					},
					axisLabel : {
						// formatter : '{value} ',
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
				}, {
					type : 'value',
					min : 0,
					max : 1,
					fontSize : 12,// 字体大小
					splitLine : {
						show : false
					},
					axisLabel : {
						// formatter : '{value} %',
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
				} ],
				series : [ {
					type : 'bar',
					data : yData,
					yAxisIndex : 0,// 设置柱子颜色都不一样
					itemStyle : {
						normal : {
							color : function(params) {//柱图不同颜色设置
								var colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
								                 '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
								                 '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'];
								return colorList[params.dataIndex]
							}
						}
					},
					label : {
						show : true,
						position : 'inside',
						color : '#ffffff'
					},
				}, {
					name : '累计不良率',
					type : 'line',
					yAxisIndex : 1,
					data : tData,
					label : {
						show : true,
						position : 'top'
					},
					markLine : {
						symbol : "none",
						data : [ {
							silent : true, // 鼠标悬停事件 true没有，false有
							label : {
								show : false,
							},
							lineStyle : { // 警戒线的样式 ，虚实 颜色
								type : "solid",
								color : "#CC0033",
							},
							yAxis : 0.8
						// 警戒线的标注值，可以有多个yAxis,多条警示线
						} ]
					}
				} ]

			})
		}

	});
});

function doExport(params){	
	location.href = context + "lyt_report/getProdDailyByTaskExport?proc="+params.proc+"&begTime="+
	params.begTime+"&endTime="+ params.endTime;
}

function setSelectData() {
	var data = procList.data
	// console.log(data)
	$("#selectCode").empty();
	$("#selectCode").append("<option value=''></option>");
	for (var i = 0; i < data.length; i++) {
		$("#selectCode").append("<option value=" + data[i].工序号 + ">" + data[i].工序号 + "-" + data[i].工序名称 + "</option>");
	}
	layui.form.render('select');
}

function getReport1(params) {
	tableIns.reload({
		url : context + 'lyt_report/getProdDailyByTaskReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})
}
