/**
 * 电芯配对结果报表
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
			},{
				field : '电芯条码',
				title : '电芯条码',
				width : 220,
			},{
				field : '模组码',
				title : '模组码',
				width : 150,
			},{
				field : '容量',
				title : '容量',
				width : 100,
			},{
				field : '电压',
				title : '电压',
				width : 100,
			},{
				field : '内阻',
				title : '内阻',
				width : 100,
			},{
				field : '档位',
				title : '档位',
				width : 120,
			},{
				field : '测试时间',
				title : '测试时间',
				width : 160,
			} ,{
				field : '线体号',
				title : '线体号',
				width : 100,
			}, {
				field : '测试员工工号',
				title : '测试员工工号',
				width : 120,
			}, {
				field : 'QC核对',
				title : 'QC核对',
				width : 100,
			}, {
				field : '关联条码2',
				title : '关联条码2',
				width : 120,
			}, {
				field : '子条码数',
				title : '子条码数',
				width : 100,
			},{
				field : '工序号',
				title : '工序号',
				width : 100,
			},{
				field : '工序顺序号',
				title : '工序顺序号',
				width : 120,
			}, {
				field : '数量',
				title : '数量',
				width : 100,
			}, {
				field : '更新人',
				title : '更新人',
				width : 120,
			}, {
				field : '更新时间',
				title : '更新时间',
				width : 160,
			},{
				field : '备注',
				title : '备注',
				width : 200,
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
				field : '档位',
				title : '档位',
			},{
				field : '模组个数',
				title : '模组个数',
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
		url : context + 'lyt_report/getPDTestReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})
	tableIns2.reload({
		url : context + 'lyt_report/getPDSumReport',
		where : params,
		done : function(res1, curr, count) {
			pageCurr = curr;
		}
	})
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

