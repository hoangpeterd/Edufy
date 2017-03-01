var fc = {
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	selectable: true,
	selectHelper: true,
	editable: false, // enable draggable events
	aspectRatio: 1.25,
	nowIndicator: true,
	slotEventOverlap: false,
	eventOverlap: false,
	slotDuration: '00:30:00',
	minTime: '06:00:00',
	defaultTimedEventDuration: '01:00:00',
	slotLabelFormat: 'hh:mm',
	header: {
		left: 'title',
		center: '',
		right: 'today prev,next agendaWeek,month'
	},
	defaultView: defaultView(),
	views: {
		month: {
			selectable: false,
			eventLimit: 3,
		}
	},
	eventLimit: true,
	eventBorderColor: "#4CAE4C",
	eventBackgroundColor: "rgba(76, 174, 76, .5)",
	eventClick: function (data, jsEvent, view) {
		if ($("body").is("#studentBody")) {
			selectAppointment(start, end, jsEvent, view);
		// } else
		// 	if ($("body").is("#tutorBody")) {
		// 		if (confirm("delete?")) {
		// 			eventDestroy(data, jsEvent, view);
		// 			// 		//@DAN DELETE THIS EVENT
		// 		}
			}
	},
	select: function (start, end, jsEvent, view) {
		if ($("body").is("#tutorBody")) {
			defineAvailability(start, end);
		}
	}
};

var businessHours = [];
var events = [];
$(function () { // document ready
	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#external-events .fc-event').each(function () {
		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});
	});
// fs.writeFile('events.json', data[, options]
	if ($("body").is("#tutorBody")) {
		$.post("/tutorAvailability", { tutorUserName: $(".lead").text().trim() }).done(function (result) {
			for (var i = 0; i < result.length; i++) {
				businessHours.push(result[i]);
			}
			fc.events = businessHours;
			$('#calendar').fullCalendar(fc);
		});
		$.post("/scheduledAppointments", { tutorUserName: $(".lead").text().trim() }).done(function (result) {
			for (var i = 0; i < result.length; i++) {
				var actualTitle = result[i].title.split(", ");
				var subject = result[i].subject;
				actualTitle = actualTitle[1];
				result[i].title = actualTitle + " - " + subject;;
			}
			events.push(result);
		});
	}
	if ($("body").is("#studentBody")) {
		$.post("/scheduledAppointments", { studentUserName: $(".lead").text().trim() }).done(function (result) {
			for (var i = 0; i < result.length; i++) {
				var subject = result[i].subject;
				var actualTitle = result[i].title.split(", ");
				actualTitle = actualTitle[0];
				result[i].title = actualTitle + " - " + subject;
			};
			events.push(result);
		});
	}

	/* initialize the calendar
	-----------------------------------------------------------------*/


	$("#sessions").fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		header: {
			left: 'prev, today, next',
			center: '',
			right: ''
		},
		defaultView: 'listMonth',
		events: events,
		eventBorderColor: "#4CAE4C",
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
	});

	$("#listMonth").fullCalendar({
		aspectRatio: 1.25,
		eventSources: ['/tutorAvailability', events],
		eventLimit: true,
		eventBorderColor: "#4CAE4C",
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
				header: {
			left: 'prev,next',
			center: '',
			right: ''
		}
	});
});

function defaultView() {
	if ($("body").is("#tutorBody")) {
		return 'month';
	} else if ($("body").is("#studentBody")) {
		return 'agendaWeek';
	}
}

function defineAvailability(start, end, jsEvent, view) {
	var availability = [];
	if (end.diff(start) / (1000 * 60 * 60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	if ($("body").is("#tutorBody")) {
		var timeSpan = end.diff(start) / (1000 * 60 * 60); //Returns the number of hours per selected availablespan.
		var infoArray = [];
		var startTime = start.clone();
		var endTime = end.clone();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			if (j >= 1) k = 1;
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			newEnd = newEnd.add(1, 'hour');
			var newAvailability = {
				dow: [start.day()],
				hourTop: startTime.format('hh:mm:ss'),
				start: startTime.toISOString(),
				color: null,
				rendering: 'background',
				hourBottom: newEnd,
				title: "Available Timeslot"
			};
			infoArray.push(newAvailability);
		}
		var displayStart = start.clone();
		var displayEnd = end.clone();
		if (confirm("are you free between " + displayStart.format('hh:mm T') + "M and " + displayEnd.format('hh:mm T') + "M?")) {
			availability.push(displayStart.format('YYYY-MM-DD'));
			for (var i = 0; i < infoArray.length; i++) {
				availability.push(infoArray[i].hourTop);
			}
			events.push(availability);
			parseData(availability);
		}
	}
	availability = [];
}

function selectAppointment(start, end, jsEvent, view) {
	if (end.diff(start) / (1000 * 60 * 60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	// //Use starting and ending for passing into Calendar
	var starting = start.clone();
	var ending = end.clone();

	if ($("body").is("#studentBody")) {
		var timeSpan = end.diff(start) / (1000 * 60 * 60); //Returns the number of hours per selected availablespan.
		var infoArray = [];
		var startTime = start.clone();
		var endTime = end.clone();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			if (j >= 1) k = 1;
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			// startingAt = startTime.format('H:mm:00');
			newEnd = newEnd.add(1, 'hour');
			// newEnd = newEnd.format('H:mm:00');
			var newEvent = {
				// dow: start.day(),
				hourTop: startTime.format('hh:mm:ss'),
				start: startTime.toISOString(),
				// end: newEnd.format('H:mm:ss'),
				// hourBottom: newEnd,
				title: "Scheduled Appointment"
			};
			infoArray.push(newEvent);
			parseData(start, end);
		}
		var displayStart = start.clone();
		if (confirm("Schedule this appointment on " + displayStart.format('MMMM DD YYYY') + " at " + displayStart.format('hh:mm T') + "M?")) {
			for (var i = 0; i < infoArray.length; i++) {
				events.push(infoArray[i]);
			}
		}
	}
}

function parseData(localArr) {

	if ($("body").is("#tutorBody")) {
		$.post("/createTutorAvailability", { tutorUserName: $(".lead").text().trim(), dates: localArr }).done(function (result) {
			if(result.reload){
				location.reload();
			}
		});
	}
}
