
/* initialize the calendar
	-----------------------------------------------------------------
	FULL VIEW CALENDAR */
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
	defaultView: 'agendaWeek',
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
			selectAppointment(data, jsEvent, view);
		}
	},
	select: function (start, end) {
		if ($("body").is("#tutorBody")) {
			defineAvailability(start, end);
		}
	}
};

/* EACH STUDENT'S CALENDAR */
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

/* SMALL LIST-STYLE CALENDAR FOR TUTORS*/
var sideView = {
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	aspectRatio: 0,
	eventLimit: true,
	eventBorderColor: "#4CAE4C",
	eventBackgroundColor: "rgba(76, 174, 76, .5)",
	header: {
		left: 'prev,next',
		center: '',
		right: ''
	},
	defaultView: "listWeek"
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

	//-----------------------------------------------------------------------------------------------

	//set up requests to communicate with back end
	if ($("body").is("#tutorBody")) { //Grabs available times per tutor
		$.post("/tutorAvailability").done(function (result) {
			fc.events = result;
			sideView.events = result;
			$('#calendar').fullCalendar(fc);
			$("#listMonth").fullCalendar(sideView);
		});
	}
	//inputs student appointments to their calendar
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
});
	//-----------------------------------------------------------------------------------------------
	/* Capture tutor's selected timeslots for work */
	function defineAvailability(start, end) {
		var availability = [];
		if (end.diff(start) / (1000 * 60 * 60) % 1 !== 0) {
			end.add(30, 'minutes');
		}//Finds whether time selected falls on half-hour mark, and completes the hour slot.
		if ($("body").is("#tutorBody")) {
			var newAvailability = {};
			var timeSpan = end.diff(start) / (1000 * 60 * 60); //Returns the number of hours per selected availablespan.
			var infoArray = []; //Temporary array will hold each object as it is generated
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
				newAvailability = { //Object which represents time slot in calendar
					dow: dow,
					hourTop: startTime.format(),
					title: "Available Timeslot"
				};

				infoArray.push(newAvailability);
			}
			var displayStart = start.clone();
			var displayEnd = end.clone();
			//Modal will capture the tutor's confirmation that correct times have been selected
			if (displayEnd._isValid) {
				event.preventDefault();
				jQuery.noConflict();
				$('#freeModal').modal();
				$("#free").html("<p>are you free between " + displayStart.format('hh:mm T') + "M and " + displayEnd.format('hh:mm T') + "M?</p>");
			}
			$("#confirmFree").on("click", function () {
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
	//This function will take in the availability of the tutor and parse it into the back-end
	function parseData(localArr) {
		if ($("body").is("#tutorBody")) {
			$.post("/createTutorAvailability", { dates: localArr }).done(function (result) {
				if (result.reload) {
					location.reload();
				}
			});
		}
	}

	//How the student will be able to click on an existing "tutor availability" to claim that time slot on their own calendar.
	function selectAppointment(data, jsEvent, view) {
		var start = data.start;
		var newEvent = { //date object, missing certain queries from back-end
			start: start.toISOString(),
			title: "Scheduled Appointment"//Dynamically input names
		};
		var displayStart = start.clone();
		if (displayStart._isValid) { //Modal will confirm time slot is the one desired
			event.preventDefault();
			jQuery.noConflict();
			$('#freeModal').modal();
			$("#free").html("<p>would you like to claim this " + displayStart.format('hh:mm T') + "M appointment?</p>");
			$("#confirmFree").on("click", function () {
				events.push(newEvent); //The events array represents student appointments
			});
		}
	}
