$(function () {

    var data = [
          ['正确率', 60], ['错误率', 40]/*, ['Light Industry', 14],
        ['Out of home', 16], ['Commuting', 7], ['Orientation', 9]*/
         ];

    $.jqplot('chart', [data], {
             seriesDefaults: {
                  renderer: $.jqplot.PieRenderer,
                         rendererOptions: {
                         showDataLabels: true
                     }
            },
          legend: {
                 show: true,
                          location: "e"
              }
     });
});

$(function () {

    var data = [
          ['正确率', 90], ['错误率', 10]
         ];

    $.jqplot('chart1', [data], {
             seriesDefaults: {
                  renderer: $.jqplot.PieRenderer,
                         rendererOptions: {
                         showDataLabels: true
                     }
            },
          legend: {
                 show: true,
                          location: "e"
              }
     });
});