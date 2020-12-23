var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';
var Items = [{"Ranking":"线体1","City":"模组组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"53.00","Mom":"-13.00"},
    {"Ranking":"线体2","City":"模组组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"65.00","Mom":"43.00"},
    {"Ranking":"线体3","City":"模组组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"34.00","Mom":"7.00"},
    {"Ranking":"线体4","City":"模组组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"15.00","Mom":"-18.00"},
    {"Ranking":"线体5","City":"箱体组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-57.00","Mom":"-48.00"},
    {"Ranking":"线体6","City":"箱体组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-20.00","Mom":"-44.00"},
    {"Ranking":"线体7","City":"箱体组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-29.00","Mom":"-49.00"},
    {"Ranking":"线体8","City":"箱体组装","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"2.00","Mom":"-24.00"},
    {"Ranking":"线体9","City":"箱体老化","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"35.00","Mom":"6.00"},
    {"Ranking":"线体10","City":"箱体老化","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"30.00","Mom":"-28.00"},
    {"Ranking":"线体11","City":"箱体老化","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-48.00","Mom":"-3.00"},
    {"Ranking":"线体12","City":"箱体老化","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"128.00","Mom":"-30.00"},
    {"Ranking":"线体13","City":"包装工序","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-24.00","Mom":"-17.00"},
    {"Ranking":"线体14","City":"包装工序","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"19.00","Mom":"-6.00"},
    {"Ranking":"线体15","City":"包装工序","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-74.00","Mom":"-52.00"},
    {"Ranking":"线体16","City":"包装工序","SaleIncome":"0","SaleRough":"0","SalePlan":"0","PlanFinish":"0","TonOilincome":"0","OilTransform":"0","An":"-64.00","Mom":"-72.00"}]
$.each(Items,function (i, item) {
    str = '<tr>'+
        '<td>'+item.Ranking+'</td>'+
        '<td>'+item.City+'</td>'+
        '<td>'+(+item.SaleIncome/10000).toFixed(2)+'</td>'+
        '<td>'+(+item.PlanFinish).toFixed(2)+'</td>'+
        '<td>'+(+item.PlanFinish).toFixed(2)+'</td>'+
        '<td>'+(item.SalePlan/10000).toFixed(2)+'</td>'+
        '<td>'+(+item.PlanFinish).toFixed(2)+'</td>'+
        '</tr>'

    $('.tbl-body tbody').append(str);
    $('.tbl-header tbody').append(str);
});

if(Items.length > 10){
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