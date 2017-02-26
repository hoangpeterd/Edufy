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
		businessHours: availability,	
		selectConstraint: availability,
		eventConstraint: availability,
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaWeek,month,listMonth' 
		},
		defaultView: defaultView(), 
		views: { 
			month: { selectable: false }
		},
		events: events,
		eventBorderColor: "#4CAE4C", 
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		eventClick: function(data, jsEvent, view, callback) {
			if ($("body").is("#studentBody")) {
				selectAppointment(start, end, jsEvent, view);
			} else if ($("body").is("#tutorBody")) {
				if (confirm("delete?")) {
					eventDestroy(data, jsEvent, view);
					//@DAN DELETE THIS EVENT
				}
			}
		},	
		eventDestroy: function ( event, element, view, callback) {
			eventDestroy(event, element, view);
		},
		select: function(start, end, jsEvent, view, callback) {
			if ($("body").is("#tutorBody")) {
				defineAvailability(start, end, jsEvent, view);
			} 
			if ($("body").is("#tutorBody")) {
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

var availability = [
	{
		date: '2017-03-03',
		dow: 4,
		start: "06:00:00",
		end: "15:00:00"
	}
];

var events = [
// 	{
// 		date: "2017-02-28",
// 		start: "10:00:00",
// 		end: "16:00:00",
// 		title: "check it out"
// 	}
];
// //Syntax to revert passed dates in a useful manner.
// var convertedDate = new Date(events[0].date).toUTCString();
// console.log(convertedDate);
// events[0].date = convertedDate;

function defaultView() {
	if ($("body").is("#tutorBody")) {
		return 'month';
	} else if ($("body").is("#studentBody")) {
		return 'agendaWeek';
	}
}

function defineAvailability(start, end, jsEvent, view) {
	if ($("body").is("#tutorBody")) {
		var availableSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected availablespan.
		var weekday = start.clone();
		if (end.diff(start)/(1000*60*60) % 1 !== 0) {
			end.add(30, 'minutes');
		}

		var availabilityArray = [];
		for (var j = 0; j < availableSpan; j++) {
			var newAvailability = {
				date: null,
				dow: null,
				start: null,
				end: null
			};

			var startTime = start.clone();
			var endTime = end.clone();
			var newEnd = startTime;
			newAvailability.date = start.format('YYYY-MM-DD');
			newAvailability.dow = weekday.day();
			startTime = startTime.add(1*j, 'hour');
			newAvailability.start = startTime.format('H:mm');
			newAvailability.end = newEnd.add(1, 'hour'); 
			newAvailability.end = newAvailability.end.format('H:mm');
			availabilityArray.push(newAvailability);
		}
		
		if (confirm("are you free between " + start.format('h:mm T') + "M and " + end.format('h:mm T') + "M?")) {
			for (var i = 0; i < availabilityArray.length; i++) {
				availability.push(availabilityArray[i]);
				$("#calendar").fullCalendar("addEventSource", availabilityArray[i]);
				$("#sessions").fullCalendar("addEventSource", availabilityArray[i]);
			}
		}
		
		$.post("/tutorAvailability", availability).done(function(result) {
			console.log(result);
		});
	}
}

function selectAppointment(start, end, jsEvent, view) {
	if ($("body").is("#studentBody")) {
		var newEventsArray = [];
		var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected timespan.
		for (var j = 0; j < timeSpan; j++) {
			var newEvent = {
				date: null,
				start: null, 
				end: null, 
				title: null
			};

			newEvent.start = start.add(1*j/j, 'hour');
			var newEnd = newEvent.start.clone();
			newEvent.date = newEnd.format("YYYY-MM-DD");
			newEvent.start = newEvent.start.format("H:mm");
			newEvent.end = newEnd.add(1, 'hour'); 
			newEvent.end = newEvent.end.format("H:mm");
			newEvent.title = "Scheduled Appointment";
			newEventsArray.push(newEvent);
		}
		if (confirm("schedule these times?")) {
			for (var i = 0; i < newEventsArray.length; i++) {
				events.push(newEventsArray[i]);
				$("#calendar").fullCalendar("addEventSource", newEventsArray[i]);
				$("#sessions").fullCalendar("addEventSource", newEventsArray[i]);
			}
		}
		$("#calendar").fullCalendar("rerenderEvents", events);
		$("#sessions").fullCalendar("rerenderEvents", events);

	// 	$.post("/scheduledAppointments", events).done(function(result) {
	// 		console.log(result);
	// 	});
	}
}

function eventDestroy( event, element, view ) {
	console.log("Appointment on " + event.start.format("MMM DD, YYYY") + " at " + event.start.format("h:mm T") + "M to be deleted");
	$("#calendar").fullCalendar("removeEvent", event);
	//@Create a delete function for database
}