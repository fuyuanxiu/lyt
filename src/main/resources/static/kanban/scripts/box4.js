
var dataList = dataType2.data//原始数据
dataList=dataList[2]
console.log(dataList)

var nameList=[];
var valueList=[];

if(dataList.length==0){//无数据时显示整圆
	nameList.push('None:0');
	valueList.push({
		value:0,
		name:'None:0',
		itemStyle:{
			normal:{
				color:'rgb(0,100,0)'
			}
		}
	})
}else{
	$.each(dataList,function (i, item) {
		nameList.push(item.DEFECT_NAME)
		var arr={}
		arr['value']=item.DEFCODE_QTY
		arr['name']=item.DEFECT_NAME;

		valueList.push(arr)
	})
}


	




var dom = document.getElementById("box4");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b} : {c} ({d}%)'
	    },
	    legend: {
	    	type: 'scroll',
	        orient: 'vertical',
	        right: 90,
	        top: 20,
	        bottom: 20,
	        data: nameList,
	        textStyle:{//图例文字的样式
                color:'#dbdbdb',
                fontSize:14
           },
	    },
	    series: [
	        {
	            type: 'pie',
	            radius: '65%',
	            center: ['50%', '50%'],
	            selectedMode: 'single',
	            data: valueList,
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}