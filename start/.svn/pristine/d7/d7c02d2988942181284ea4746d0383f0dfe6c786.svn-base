var chart;
			$(document).ready(function() {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'container',
						margin: [50, 200, 60, 70]
					},
					title: {
						text: 'Browser market shares at a specific website, 2010'
					},
					plotArea: {
						shadow: null,
						borderWidth: null,
						backgroundColor: null
					},
					tooltip: {
						formatter: function() {
							return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
						}
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								formatter: function() {
									if (this.y > 5) return this.point.name;
								},
								color: 'white',
								style: {
									font: '13px Trebuchet MS, Verdana, sans-serif'
								}
							}
						}
					},
					legend: {
						layout: 'vertical',
						style: {
							left: 'auto',
							bottom: 'auto',
							right: '50px',
							top: '100px'
						}
					},
				    series: [{
						type: 'pie',
						name: 'Browser share',
						data: [
							/*['Firefox',   45.0],
							['IE8',       55.0]
							{
								name: 'Chrome',    
								y: 12.8,
								sliced: true,
								selected: true
							},
							['Safari',    8.5],*/
							['正确',     50.0],
							['错误',   50.0]
						]
					}]
				});
			});