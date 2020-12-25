
var dataList = dataType1.data//原始数据
dataList=dataList[2]

var xAxis=[];
var yAxis1=[];//计划数量
var yAxis2=[];//完成数量

$.each(dataList,function (i, item) {
	xAxis.push(item.TASK_NO)
	yAxis1.push(item.PLAN_QTY)
	yAxis2.push(item.COMPLETE_QTY)
})

var dom = document.getElementById("box2");
var myChart = echarts.init(dom);
var app = {};
option = null;
var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
    }
};


var labelOption = {
    normal: {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        //formatter: '{c}  {name|{a}}',
        formatter: '{c}',
        fontSize: 10,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

option = {
    color: ['#00fff6', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
    legend: {
    	textStyle:{//图例文字的样式
                color:'#dbdbdb',
                fontSize:10
           },
        data: ['计划数量', '完成数量']
    },
    textStyle:{//图例文字的样式
                color:'#dbdbdb',
                fontSize:14
           },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisTick: {show: false},
            data: xAxis
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '计划数量',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: yAxis1
        },
        {
            name: '完成数量',
            type: 'bar',
            label: labelOption,
            data: yAxis2
        }
        /*{
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            data: [98, 77, 101, 99, 40]
        }*/
    ]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}