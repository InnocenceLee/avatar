 /*试卷题目分析饼图*/
    var myChart1 = echarts.init(document.getElementById('myEpaspan1'));
 myChart1.setOption({
     tooltip : {
         trigger: 'item',
         formatter: "{a} <br/>{b} : {c} ({d}%)"
     },
     series : [
         {
             name: '结果分析',
             type: 'pie',
             radius : '73%',
             center: ['50%', '60%'],
             data:[
                 {value:50, name:'错误率',itemStyle: {
                     normal: {
                         color: '#F67000'
                     }
                 }},
                 {value:50, name:'正确率',itemStyle: {
                     normal: {
                         color: '#4FC9E4'
                     }
                 }}
             ],
             itemStyle: {
                 emphasis: {
                     shadowBlur: 10,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
             }
         }
     ]
 })
/* 饼图二*/
  var myChart2 = echarts.init(document.getElementById('chart2'));
 myChart2.setOption({
     tooltip : {
         trigger: 'item',
         formatter: "{a} <br/>{b} : {c} ({d}%)"
     },
     series : [
         {
             name: '结果分析',
             type: 'pie',
             radius : '73%',
             center: ['50%', '60%'],
             data:[
                 {value:10, name:'错误率',itemStyle: {
                     normal: {
                         color: '#F67000'
                     }
                 }},
                 {value:90, name:'正确率',itemStyle: {
                     normal: {
                         color: '#4FC9E4'
                     }
                 }}
             ],
             itemStyle: {
                 emphasis: {
                     shadowBlur: 10,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
             }
         }
     ]
 })