var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';

var dataList = dataType1.data

var Items = dataList[2]
//(+item.PlanFinish).toFixed(2)//保留二位小数

$.each(Items,function (i, item) {
    str = '<tr>'+
        '<td>'+isNull(item.TASK_NO)+'</td>'+
        '<td>'+isNull(item.MODEL)+'</td>'+
        '<td>'+isNull(item.PLAN_QTY)+'</td>'+
        '<td>'+isNull(item.TRQTY)+'</td>'+
        '<td>'+isNull(item.COMPLETE_QTY)+'</td>'+
        '<td>'+isNull(item.PFY)+'</td>'+
        '<td>'+isNull(item.PASS_PERCENT)+'</td>'+
        '<td>'+isNull(item.UPH)+'</td>'+
        '<td>'+isNull(item.PRODUCE_STATE)+'</td>'+
        '</tr>'

    $('.tbl-body tbody').append(str);
    $('.tbl-header tbody').append(str);
});

function isNull(str){
	if(str==null){
		return ""
	}else{
		return str
	}
}

if(Items.length > 8){
    $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
    $('.tbl-body').css('top', '0');
    var tblTop = 0;
    var speedhq = 50; // 数值越大越慢
    var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();
    function Marqueehq(){
        if(tblTop <= -outerHeight*Items.length){
            tblTop = 0;
        } else {
            tblTop -= 1;
        }
        $('.tbl-body').css('top', tblTop+'px');
    }

    MyMarhq = setInterval(Marqueehq,speedhq);

    // 鼠标移上去取消事件
    $(".tbl-header tbody").hover(function (){
        clearInterval(MyMarhq);
    },function (){
        clearInterval(MyMarhq);
        MyMarhq = setInterval(Marqueehq,speedhq);
    })

}