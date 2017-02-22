      
      
        var sameMonthFlag = false;
        var ranOnceFlag = false;
        var moment = moment();
        var month = moment.format("MMMM");
        // var MONTHS = ["February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];
        var MONTHS = [];
        if (MONTHS.pop() !== month) {
            console.log(MONTHS.pop());
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
                    // } else if (MONTHS.pop() === monthSet.pop()){
                    //     MONTHS.pop().replaceWith(monthSet.pop());
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
                    

                // var newValue = document.getElementById("input").innerHTML;
                // config.data.datasets.data.push(randomScalingFactor);
                // console.log(valueOf(newValue));
                window.myLine.update();
            
        });