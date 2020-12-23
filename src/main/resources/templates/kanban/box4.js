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
	        data: ['test1', 'test2', 'test3', 'test4', 'test5'],
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
	            data: [
	                {value: 1548, name: 'test1'},
	                {value: 535, name: 'test2'},
	                {value: 510, name: 'test3'},
	                {value: 634, name: 'test4'},
	                {value: 735, name: 'test5'}
	            ],
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