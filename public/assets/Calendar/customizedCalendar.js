
/* initialize the calendar
	-----------------------------------------------------------------*/
var fc = {
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	selectable: true,
	selectHelper: true,
	editable: false, // enable draggable events
	aspectRatio: 1.8,
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
		} else if ($("body").is("#tutorBody")) {
			//MODAL NAME: @bottom of tutor.html set up on click $("#availability").modal();
			if (confirm("Delete you availability in this time slot?")) {
				if ($("body").is("#tutorBody")) {
					var id = $(this).params.id;
					$.ajax({
						method: "DELETE",
						url: "/tutorAvailability/" + id
					}).done(function (result) {

					});
				}
			}
		}
	},
	select: function (start, end) {
		if ($("body").is("#tutorBody")) {
			defineAvailability(start, end);
		}
	}
};

var appoint = {
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	header: {
		left: 'prev, today, next',
		center: '',
		right: ''
	},
	defaultView: 'listMonth',
	eventBorderColor: "#4CAE4C",
	eventBackgroundColor: "rgba(76, 174, 76, .5)"
};

var sideView = {
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		aspectRatio: .0,
		eventLimit: true,
		eventBorderColor: "#4CAE4C",
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		header: {
			left: 'prev,next',
			center: '',
			right: ''
		},
		defaultView: "listWeek"
	}


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

	//-----------------------------------------------------------------------------------------------
	if ($("body").is("#tutorBody")) {
		$.post("/tutorAvailability").done(function (result) {
			fc.events = result;
			sideView.events = result;
			$('#calendar').fullCalendar(fc);
			$("#listMonth").fullCalendar(sideView);
		});

		$.post("/scheduledAppointments").done(function (result) {
			for (var i = 0; i < result.length; i++) {
				var actualTitle = result[i].title.split(", ");
				var subject = result[i].subject;
				actualTitle = actualTitle[1];
				result[i].title = actualTitle + " - " + subject;
			}
			events.push(result);
		});
	}

	if ($("body").is("#studentBody")) {
		$.post("/scheduledAppointments").done(function (result) {
			for (var i = 0; i < result.length; i++) {
				var subject = result[i].subject;
				var actualTitle = result[i].title.split(", ");
				actualTitle = actualTitle[0];
				result[i].title = actualTitle + " - " + subject;
			}
			events.push(result);
			appoint.events = result;
			$("#sessions").fullCalendar(appoint);

		});
	}
});
	//-----------------------------------------------------------------------------------------------


function defaultView() {
	if ($("body").is("#tutorBody")) {
		return 'agendaWeek'; //change back to month and add tool tips for launch
	} else if ($("body").is("#studentBody")) {
		return 'agendaWeek';
	}
}

function defineAvailability(start, end) {
	var availability = [];
	if (end.diff(start) / (1000 * 60 * 60) % 1 !== 0) {
		end.add(30, 'minutes');
	}
	if ($("body").is("#tutorBody")) {
		var newAvailability = {};
		var timeSpan = end.diff(start) / (1000 * 60 * 60); //Returns the number of hours per selected availablespan.
		var infoArray = [];
		var startTime = start.clone();
		var original = start.clone();
		var endTime = end.clone();
		var dow = start._d.getDay();
		var k = 0;
		for (var j = 0; j < timeSpan; j++) {
			if (j >= 1) k = 1;
			startTime = startTime.add(k, 'hour');
			var newEnd = startTime.clone();
			newEnd = newEnd.add(1, 'hour');
			newAvailability = {
				dow: dow,
				hourTop: startTime.format(),
				title: "Available Timeslot"
			};

			infoArray.push(newAvailability);
		}
		var displayStart = start.clone();
		var displayEnd = end.clone();
		//MODAL NAME: @bottom of tutor.html set up on click $("#free").modal();
		if (displayEnd._isValid) {
			event.preventDefault();
			jQuery.noConflict(); 
			$('#freeModal').modal();
			$("#free").html("<p>are you free between " + displayStart.format('hh:mm T') + "M and " + displayEnd.format('hh:mm T') + "M?</p>");
		}
		$("#confirmFree").on("click", function() {
			availability.push(infoArray[0].dow);
			for (var i = 0; i < infoArray.length; i++) {
				availability.push(infoArray[i].hourTop);
			}
			events.push(availability);
			parseData(availability);
		});
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
				hourTop: startTime.format('HH:mm:ss'),
				start: startTime.toISOString(),
				// end: newEnd.format('H:mm:ss'),
				// hourBottom: newEnd,
				title: "Scheduled Appointment"
			};
			infoArray.push(newEvent);
			parseData(start, end);
		}
		var displayStart = start.clone();
		//MODAL NAME: @bottom of tutor.html set up on click $("#schedule").modal();
		if (confirm("Schedule this appointment on " + displayStart.format('MMMM DD YYYY') + " at " + displayStart.format('HH:mm T') + "M?")) {
			for (var i = 0; i < infoArray.length; i++) {
				events.push(infoArray[i]);
			}
		}
	}
}

function parseData(localArr) {

	if ($("body").is("#tutorBody")) {
		$.post("/createTutorAvailability", { dates: localArr }).done(function (result) {
			if (result.reload) {
				location.reload();
			}
		});
	}
}