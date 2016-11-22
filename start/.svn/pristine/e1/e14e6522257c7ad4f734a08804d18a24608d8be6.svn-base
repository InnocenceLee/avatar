/*机构统计*/
// 基于准备好的dom，初始化echarts实例
   var myChart = echarts.init(document.getElementById('main'));
   myChart.setOption({
       tooltip : {
           trigger: 'axis',
           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
               type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
       },
       legend: {
           data:['应参考人数','实际参考人数','及格人数','及格率']
       },
       grid: {
           left: '3%',
           right: '4%',
           bottom: '3%',
           containLabel: true
       },
       xAxis : [
           {
               type : 'category',
               data : ['中国银行辽宁省分行','销售部','沈阳支行本部','星海支行']
           }
       ],
       yAxis : [
           {
               type : 'value',
               min: 0,
               max: 5
           },
           {
               type: 'value',
               name: '及格率',
               min: 0,
               max: 100,
               interval: 20,
               /*axisLabel: {
                   formatter: '{value} %'
               }*/
           }
       ],
       series : [
           {
               color: ['#FF7F57'],
               name:'应参考人数',
               type:'bar',
               data:[1,3, 2, 4]
           },
           {
               color:['#91D2F5'],
               name:'实际参考人数',
               type:'bar',
               data:[0, 0, 0, 1]
           },
          {
              color: ['#DF6FD4'],
               name:'及格人数',
               type:'bar',
               data:[0, 0, 0, 0]
           },
           {
               color: ['#1ACF43'],
               name:'及格率',
               type:'bar',
               data:[0, 0, 0, 0]
           },
       ]
   })

/*分数段发布统计*/
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各分数段分布统计'
        },
        color: ['#4880BC'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['120-100', '99-90', '89-80', '79-70', '69-60', '59-50', '49-40','39-30','30以下'],
                 axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value',              
                min: 0,
                max: 30,
                interval: 5,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '40%',
                data:[4.26, 12.77, 4.26, 8.51, 4.26, 12.77, 14.89,10.64,27.66]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    
    /*饼图*/
    var myChart = echarts.init(document.getElementById('mychart1'));
    myChart.setOption({
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:[
                    {value:400, name:'单选题'},
                    {value:335, name:'多选题'},
                    {value:310, name:'判断题'}
                ]
            }
        ]
    }) 
