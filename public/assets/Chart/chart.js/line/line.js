var sameMonthFlag = false;
var ranOnceFlag = false;
var moment = moment();
var month = moment.format("MMMM");
// var MONTHS = ["February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];
var MONTHS = [];
if (MONTHS.pop() !== month) {
    MONTHS.push(month);
    sameMonthFlag = true;
} else {
    sameMonthFlag = false;
}
var config = {
    type: 'line',
    data: {
        labels: ["", MONTHS],
        // labels: ["February"],
        datasets: [{
            label: "Dollars earned",
            backgroundColor: window.chartColors.greenFill,
            borderColor: window.chartColors.green,
            data: [
                // randomScalingFactor(), 
                newDataPoint()
            ],
            fill: true,
            pointStyle: "rectRot"
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Dollars'
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
};

document.getElementById('addData').addEventListener('click', function() {
        if (config.data.datasets.length >= 0) {
            var monthSet = MONTHS[config.data.labels.length % MONTHS.length];
            if (sameMonthFlag === false) {
                config.data.labels.push(monthSet);
            }
        }

        config.data.datasets.forEach(function(datasets) {
            if (sameMonthFlag === false) {
                var newData = newDataPoint();
                parseFloat(newData);
                datasets.data.push(newData);
            } else {
                if (ranOnceFlag === false) {
                    MONTHS.unshift("");
                    datasets.data.unshift(0);
                    ranOnceFlag = true;
                }
                var lastData = datasets.data.pop();
                if (lastData === "") {
                    lastData = 0;
                }
                lastData = parseFloat(lastData);
                var newData = newDataPoint();
                newData = parseFloat(newData); 
                var newDataTotal = parseFloat(lastData) + parseFloat(newData); 
                datasets.data.push(newDataTotal);  
            }
        });

        window.myLine.update();
});

// Define a plugin to provide data labels
Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chartInstance.chart.ctx;

        chartInstance.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                    // Draw the text in black, with the specified font
                    ctx.fillStyle = 'rgb(0, 0, 0)';

                    var fontSize = 16;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    // Just naively convert to string for now
                    var dataString = dataset.data[index].toString();

                    // Make sure alignment settings are correct
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
});