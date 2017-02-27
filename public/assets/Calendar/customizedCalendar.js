$(function() { // document ready
	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#external-events .fc-event').each(function() {
		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});
	});

	// $.post("/tutorAvailability", availability).done(function(result) {
	// 	console.log(result);
	// });
	
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
		businessHours: true,	
		// selectConstraint: FC.businessHours,
		// eventConstraint: FC.businessHours,
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaWeek,month,listMonth' 
		},
		defaultView: defaultView(), 
		views: { 
			month: { selectable: false }
		},
		// eventSources: events,
		events: events,
		eventBorderColor: "#4CAE4C", 
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		eventClick: function(data, jsEvent, view, callback) {
			// if ($("body").is("#studentBody")) {
				// selectAppointment(start, end, jsEvent, view);
			// } else 
			// if ($("body").is("#tutorBody")) {
			// 	if (confirm("delete?")) {
			// 		eventDestroy(data, jsEvent, view);
			// 		//@DAN DELETE THIS EVENT
			// 	}
			// }
		},	
		// eventDestroy: function ( event, element, view, callback) {
		// 	eventDestroy(event, element, view);
		// },
		select: function(start, end, jsEvent, view, callback) {
			// if ($("body").is("#tutorBody")) {
			// 	defineAvailability(start, end, jsEvent, view);
			// } 
			// if ($("body").is("#studentBody")) {
				selectAppointment(start, end, jsEvent, view);
			// }
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

var availability = [];

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
	if (end.diff(start)/(1000*60*60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	parseData(start, end, jsEvent, view);
	if ($("body").is("#tutorBody")) {
		var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected availablespan.
		var infoArray = [];
		var startTime = start.clone();
		var endTime = end.clone();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			var newAvailability = {
				dow: start.day(),
				start: starting,
				end: ending,
				title: "Available Timeslot"
			};
			if (j >= 1) {k = 1};
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			newAvailability.start = startTime.format('H:mm');
			newAvailability.end = newEnd.add(1, 'hour'); 
			newAvailability.end = newAvailability.end.format('H:mm');
			availabilityArray.push(newAvailability);
		}
		var displayStart = start.clone();
		var displayEnd = end.clone();
		if (confirm("are you free between " + displayStart.format('h:mm T') + "M and " + displayEnd.format('h:mm T') + "M?")) {
			for (var i = 0; i < availabilityArray.length; i++) {
				availability.push(availabilityArray[i]);
				$("#calendar").fullCalendar("refetchEvents", availabilityArray[i]);
				$("#sessions").fullCalendar("refetchEvents", availabilityArray[i]);
			}
		}
		
		$.post("/tutorAvailability", availability).done(function(result) {
		});
	}
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
		var infoArray = []
		var startTime = start.clone();
		var endTime = end.clone();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			if (j >= 1) {k = 1};
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			// startingAt = startTime.format('H:mm:00');
			newEnd = newEnd.add(1, 'hour');
			// newEnd = newEnd.format('H:mm:00');
			var newEvent = {
				// dow: start.day(),
				// hourTop: startTime,
				start: startTime.format(), 
				end: newEnd.format(), 
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
			console.log(events);
			$("#calendar").fullCalendar("refetchEvents", events);
			$("#sessions").fullCalendar("refetchEvents", events);
		}

	// 	$.post("/scheduledAppointments", events).done(function(result) {
	// 	});
	// }
}

// function eventDestroy( event, element, view ) {
// 	console.log("Appointment on " + event.start.format("MMM DD, YYYY") + " at " + event.start.format("h:mm T") + "M to be deleted");
// 	$("#calendar").fullCalendar("removeEvent", event);
// 	//@Create a delete function for database
// }
function parseData(start, end) {
	//Use stringStart and StringEnd to pass to Database
	var stringStart = start.format("MMM DD YYYY H:mm:ss").toString();
	var stringEnd = end.format("MMM DD YYYY H:mm:ss").toString();
	//@SEND TO DAN
	var stringJoined = stringStart + " " + stringEnd;
	console.log(stringJoined);
	// @SEND TO DAN
	var thisStartDate = stringJoined.substring(0, 11); //start date
	var thisStartTime = stringJoined.substring(12, 20); //start time
	var thisEndDate = stringJoined.substring(21, 32); //end date
	var thisEndTime = stringJoined.substring(33, 41); //end time
}