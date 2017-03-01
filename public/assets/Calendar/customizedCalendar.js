$(function() { // document ready
	/* initialize the external events
	-----------------------------------------------------------------*/

	$('#external-events .fc-event').each(function() {
		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});
	});
	if ($("body").is("#tutorBody")) {
		$.post("/tutorAvailability", {tutorUserName: $(".lead").text().trim()} ).done(function(result) {
			
		});
	}

	// $.post("/scheduledAppointments", events).done(function(result) {
	// 	console.log(result);
	// });
	/* initialize the calendar
	-----------------------------------------------------------------*/
	var FC = {
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
		slotLabelFormat: 'h:mm',
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaWeek,month,listMonth'
		},
		defaultView: defaultView(),
		views: {
			month: {
				selectable: false,
				eventLimit: 3,
			}
		},
		events: events,
		eventLimit: true,
		eventBorderColor: "#4CAE4C",
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		eventClick: function(data, jsEvent, view) {
			if ($("body").is("#studentBody")) {
				selectAppointment(start, end, jsEvent, view);
			} else
			if ($("body").is("#tutorBody")) {
				if (confirm("delete?")) {
					eventDestroy(data, jsEvent, view);
			// 		//@DAN DELETE THIS EVENT
				}
			}
		},
		// eventDestroy: function ( event, element, view, callback) {
		// 	eventDestroy(event, element, view);
		// },
		select: function(start, end, jsEvent, view) {
			if ($("body").is("#tutorBody")) {
				defineAvailability(start, end);
			}
			if ($("body").is("#studentBody")) {
				selectAppointment(start, end, jsEvent, view);
			}
		}
	};

	$('#calendar').fullCalendar(FC);

	$("#sessions").fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		header: {
			left: '',
			center: 'prev, today, next',
			right: ''
		},
		defaultView: 'listMonth',
		events: events,
		eventBorderColor: "#4CAE4C",
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
	});
});

var events = [
	{
		title: 'Hard Coded',
		start: '2017-02-28T10:30:00',
		end: '2017-02-28T12:30:00'
	}
];

function defaultView() {
	if ($("body").is("#tutorBody")) {
		return 'month';
	} else if ($("body").is("#studentBody")) {
		return 'agendaWeek';
	}
}

function defineAvailability(start, end, jsEvent, view) {
	var availability = [];
	if (end.diff(start)/(1000*60*60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	if ($("body").is("#tutorBody")) {
		var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected availablespan.
		var infoArray = [];
		var startTime = start.clone();
		var endTime = end.clone();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			if (j >= 1) k = 1;
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			// startingAt = startTime.format('H:mm');
			newEnd = newEnd.add(1, 'hour');
			// newEnd = newEnd.format('H:mm');
			var newAvailability = {
				dow: [start.day()],
				hourTop: startTime.format('H:mm:ss'),
				start: startTime.toISOString(),
				// end: newEnd.format('H:mm:ss'),
				color: null,
				rendering: 'background',
				hourBottom: newEnd,
				title: "Available Timeslot"
			};
			infoArray.push(newAvailability);
		}
		var displayStart = start.clone();
		var displayEnd = end.clone();
		if (confirm("are you free between " + displayStart.format('h:mm T') + "M and " + displayEnd.format('h:mm T') + "M?")) {
			availability.push(displayStart.format('YYYY-MM-DD'));
			for (var i = 0; i < infoArray.length; i++) {
				availability.push(infoArray[i].hourTop);
			}
			availability.push(displayEnd.format('H:mm:ss'));
			parseData(availability);
		}
	}
	$("#calendar").fullCalendar("refetchEvents", availability);
	$("#sessions").fullCalendar("refetchEvents", availability);
	availability = [];
}

function selectAppointment(start, end, jsEvent, view) {
	if (end.diff(start)/(1000*60*60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	// //Use starting and ending for passing into Calendar
	var starting = start.clone();
	var ending = end.clone();

	// if ($("body").is("#studentBody")) {
		var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected availablespan.
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
				hourTop: startTime.format('H:mm:ss'),
				start: startTime.toISOString(),
				// end: newEnd.format('H:mm:ss'),
				// hourBottom: newEnd,
				title: "Scheduled Appointment"
			};
			infoArray.push(newEvent);
			parseData(start, end);
		}
		var displayStart = start.clone();
		if (confirm("Schedule this appointment on " + displayStart.format('MMMM DD YYYY') + " at " + displayStart.format('h:mm T') + "M?")) {
			for (var i = 0; i < infoArray.length; i++) {
				events.push(infoArray[i]);
			}
		}
	// }
	$("#calendar").fullCalendar("renderEvents", events);
	$("#calendar").fullCalendar("addEventSource", events);
	$("#calendar").fullCalendar("refetchEvents", events);
	$("#calendar").fullCalendar("updateEvents", events);
	$("#sessions").fullCalendar("refetchEvents", events);
}

// function eventDestroy( event, element, view ) {
// 	console.log("Appointment on " + event.start.format("MMM DD, YYYY") + " at " + event.start.format("h:mm T") + "M to be deleted");
// 	$("#calendar").fullCalendar("removeEvent", event);
// 	//@Create a delete function for database
// }
function parseData(localArr) {

	// var thisDate = localArr[0];
	// var endTime = localArr.slice(-1)[0];
	// endTime = thisDate + "T" + endTime;
	// localArr.pop();
	// var eachStart = localArr;
		// for (var i = 1; localArr.length; i++) {
		// 	eachStart = thisDate + "T" + localArr[i];
	// 		var availabilityAsEvent = {
	// 			start: eachStart,
	// 			end: endTime,
	// 			rendering: 'background'
			// }
	// 	events.push(availabilityAsEvent);
	// console.log(thisDate, eachStart, endTime);
	// }
	if ($("body").is("#tutorBody")) {
		$.post("/createTutorAvailability", {tutorUserName: $(".lead").text().trim(), dates: localArr}).done(function(result) {
			if(result.reload){
				location.reload();
			}
		});
	}

		// if ($("body").is("#studentBody")) {
		// 	var pointer = url.indexOf("tutor/");
		// 	var userName = url.substring(pointer+6);
		// 	pointer = userName.indexOf(".edu");
		// 	userName = userName.substring(0, pointer+4);
		// 	$.post("/scheduledAppointments", {studentUserName: userName, date: stringJoined).done(function(result) {
		// 	});
		// }
	// }
}
