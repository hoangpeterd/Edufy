window.chartColors = {
	green: 'rgb(76, 174, 76)',
	greenFill: 'rgba(76, 174, 76, .3)',
};

window.newDataPoint = function() {
	var newValue = document.getElementById("input").value;
	return newValue;
};

// window.randomScalingFactor = function() {
// 	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
// }
