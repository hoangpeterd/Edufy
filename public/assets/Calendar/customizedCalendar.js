var i = 0;
var newEvent = {
	id: i, 
	start: null, 
	end: null, 
	title: null,
};
var FC = $.fullCalendar;

$(function() { // document ready
	/* initialize the external events
	-----------------------------------------------------------------*/
	
	$('#external-events .fc-event').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});


		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
	});

	/* initialize the calendar
	-----------------------------------------------------------------*/
	$('#calendar').fullCalendar({
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
		businessHours: businessHours,	
		selectConstraint: businessHours,
		eventConstraint: businessHours,
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaWeek,month,listMonth' //Need to set up path call for when rendered on Student page, only weekly should display.
		},
		defaultView: defaultView(), //Need to set up path call for when rendered on Student page, only weekly should display.
		views: { //Need to set up path call for when rendered on Student page, only weekly should display.
			month: {
				selectable: false
			}
		},
		events: events,
		eventBorderColor: "#4CAE4C", 
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		// eventClick: function(data, event, view) {
		// 	tooltip.set({
		// 		'content.text': content
		// 	})
		// 	.reposition(event).show(event);
		// },
        // dayClick: 
		// function() { tooltip.hide(); },
		select: function(start, end, jsEvent, view) { //Removing select function for now because I want it to come from Student selections only.
						console.log($(this)[0].options);

			// if (window.location.pathname === '/student.html' {
				var trueStart = start.clone();

				newEvent.id = events.length + 1;
				newEvent.start = start;
				newEvent.end = trueStart.add(1000*60*60);
				newEvent.title = "Scheduled Appointment";
				
				events.push(newEvent);
				$("#calendar").fullCalendar("addEventSource", [newEvent]);
				$("#sessions").fullCalendar("addEventSource", [newEvent]);

				var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected timespan.
				for (var j = 0; j < timeSpan - 1; j++) {
					newEvent.id = events.length + 1;
					newEvent.start = newEvent.end;
					var newEnd = newEvent.start.clone();
					newEvent.end = newEnd.add(1000*60*60);
					newEvent.title = "Scheduled Appointment";
				
					events.push(newEvent);
					$("#calendar").fullCalendar("addEventSource", [newEvent]);
					$("#sessions").fullCalendar("addEventSource", [newEvent]);
				}
     	//    } else if (window.location.pathname == '/tutor.html') {
			// }
		}
	});

	$("#sessions").fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		header: {
			left: '',
			center: '',
			right: 'today prev,next'
		},
		defaultView: 'listMonth',
		events: events,
		eventBorderColor: "#4CAE4C", 
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		dayClick: function(date, jsEvent, view) {
			console.log(date.format());
			console.log(jsEvent);
			console.log(view.name);
		}
	});
});

var events = [
		{
			"id": '1',
			"start": '2017-02-06T10:00:00',
			"end": '2017-02-06T16:00:00',
			"title": 'Scheduled Appointment',
		}, {
			"id": '2',
			"start": '2017-02-14',
			"end": '2017-02-14',
			"title": "Valentine's Day",
		}
	];

var businessHours = 
// {  
	//I want this to be customizeable based on Tutor's registration..
	// businessHours: [ // specify an array instead
	[
		{
			dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
			start: '16:00', // 
			end: '20:00' // 
		},
		{
			dow: [ 4, 5 ], // Thursday, Friday
			start: '12:00', // 10am
			end: '20:00' // 4pm
		},
		{
			dow: [6], 
			start: '14:00',
			end: '18:00'
		}
	];
// };
function defaultView() {
	if (window.location.pathname === '/tutor.html') {
		return 'month';
	} else if (window.location.pathname === '/student.html') {
		return 'agendaWeek';
	}
};