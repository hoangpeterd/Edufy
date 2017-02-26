$(function() { // document ready
	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#external-events .fc-event').each(function() {
		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});
	});

	$.post("/tutorAvailability", availability).done(function(result) {
		
	});
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
		slotLabelFormat: 'h(:mm)a',
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
				selectAppointment(start, end, jsEvent, view)
			} else if ($("body").is("#tutorBody")) {
				if (confirm("delete?")) {
				//@DAN DELETE THIS EVENT
				console.log("to be deleted");
				}
			}
		},		
		select: function(start, end, jsEvent, view, callback) {
			if ($("body").is("#tutorBody")) {
				defineAvailability(start, end, jsEvent, view);
			} 
		}
};

	$('#calendar').fullCalendar(FC);

	$("#sessions").fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		header: {
			left: 'prev',
			center: 'today',
			right: 'next'
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
		start: "2017-02-06T10:00:00",
		end: "2017-02-06T16:00:00",
		title: "check it out"
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
	if ($("body").is("#tutorBody")) {
		console.log(start);
		var startTime = start.clone();
		var dateClicked = start.clone();
		var weekday = start.clone();
		var halfHour = start.minute();
		if (halfHour === 30) {
			startTime.add(halfHour, 'minutes' );
		}

		var newAvailability = {
			date: dateClicked.toDate(),
			dow: weekday.day(),
			start:startTime,
			end: end
		};
		console.log(newAvailability);
		availability.push(newAvailability);
		
		$("#calendar").fullCalendar("businessHours", [availability]);
		
		$.post("/tutorAvailability", availability).done(function(result) {
		
		});
	}
}

function selectAppointment(start, end, jsEvent, view) {
	if ($("body").is("#studentBody")) {
		var newEvent = {
			start: null, 
			end: null, 
			title: null
		};
		
		var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected timespan.
		for (var j = 0; j < timeSpan; j++) {
			newEvent.start = start.add(1000*60*60*j/j);
			var newEnd = newEvent.start.clone();
			newEvent.end = newEnd.add(1000*60*60); 
			newEvent.title = "Scheduled Appointment";
			$("#calendar").fullCalendar("addEventSource", [newEvent]);
			$("#sessions").fullCalendar("addEventSource", [newEvent]);
		}
		events.push(newEvent);

		//@BUILD UP THE OPTION TO REMOVE EVENT IF ERRONEOUSLY selected in EVENT CLICK 
		//@CREATE AN EVENT LISTENER FOR POST FUNCTION
		$.post("/scheduledAppointments", events).done(function(result) {

		});
	}
}