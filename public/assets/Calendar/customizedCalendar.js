

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

	// $.post("/tutorAvailability", availability).done(function(result) {
		
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
		

		slotLabelFormat: 'h(:mm)a',
		businessHours: availability,	
		// selectConstraint: true,
		// eventConstraint: true,
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
		// dayRender: function(min_date, max_date, date, cell){
		// 	// var min_date = moment.startOf('month');
		// 	// var max_date = moment.endOf('month');  
		// 	var before_min = date.diff(min_date, "days") < 0;
		// 	var after_max = date.diff(max_date, "days") >= 0;
		// 	if (before_min || after_max){
		// 	cell.addClass("out-of-range");
		// 		if(before_min){
		// 			cell.addClass("out-of-range-before");
		// 		}
		// 		else if(after_max){
		// 			cell.addClass("out-of-range-after");
		// 		}
		// 	}
		// }.bind(this, min_date, max_date),
        dayClick: function() {
			console.log($(this));
		},
		// function() { tooltip.hide(); },
		select: function(start, end, jsEvent, view) { //Removing select function for now because I want it to come from Student selections only.

						// console.log($(this)[0].options);

			// if ($("body").is("#studentBody")) {
				var i = 0;
				var newEvent = {
					id: i, 
					start: null, 
					end: null, 
					title: null,
				};
				var trueStart = start.clone();

				newEvent.id = events.length + 1;
				newEvent.start = start;
				console.log(start.format());
				newEvent.end = trueStart.add(1000*60*60);
				console.log(newEvent.end.format());
				newEvent.title = "Scheduled Appointment";
				
				events.push(newEvent);
				$("#calendar").fullCalendar("addEventSource", [newEvent]);
				$("#sessions").fullCalendar("addEventSource", [newEvent]);

				var timeSpan = end.diff(start)/(1000*60*60); //Returns the number of hours per selected timespan.
				for (var j = 0; j < timeSpan - 1; j++) {
					newEvent.id = events.length + 1;
					newEvent.start = newEvent.end;
					console.log(newEvent.start.format());
					var newEnd = newEvent.start.clone();
					newEvent.end = newEnd.add(1000*60*60);
					console.log(newEvent.end.format());
					newEvent.title = "Scheduled Appointment";

					events.push(newEvent);
					$("#calendar").fullCalendar("addEventSource", [newEvent]);
					$("#sessions").fullCalendar("addEventSource", [newEvent]);
				}
				console.log(newEvent);
				console.log(events);
				//@BUILD UP THE OPTION TO REMOVE EVENT IF ERRONEOUSLY selected
				//@CREATE AN EVENT LISTENER FOR POST FUNCTION
				// $.post("/scheduledAppointments", events).done(function(result) {

				// });
			// } else if ($("body").is("#tutorBody")) {	
			// var k = 0;
			// var newAvailability = {
			// 	id: k,
			// 	dow: null,
			// 	start: null,
			// 	end: null
			// };

			// 	newAvailability.id = availability.length + 1;
			// 	newAvailability.dow = start.day();
			// 	newAvailability.start = start.format();
			// 	newAvailability.end = end.format();

			// 	availability.push(newAvailability);
			// 	$("#calendar").fullCalendar("businessHours", [availability]);
			// 	console.log(newAvailability);
		}
	// }
};
//   FC.dayRender = function(min_date, max_date, date, cell){
//              console.log(min_date);
//              console.log(max_date);
//              console.log(date);
//              console.log(cell);
//     var before_min = date.diff(min_date, "days") < 0;
//              console.log(before_min);
//     var after_max = date.diff(max_date, "days") >= 0;
//              console.log(after_max);
//     if (before_min || after_max){
//       cell.addClass("out-of-range");
//       if(before_min){
//         cell.addClass("out-of-range-before");
//       }
//       else if(after_max){
//         cell.addClass("out-of-range-after");
//       }
//     }
//   }.bind(this, min_date, max_date),


	$('#calendar').fullCalendar(FC);

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
			// console.log(date.format());
			// console.log(jsEvent);
			// console.log(view.name);
		}
	});
});

var availability = [];
var events = [ //Appointments
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

function defaultView() {
	if ($("body").is("#tutorBody")) {
		return 'month';
	} else if ($("body").is("#studentBody")) {
		return 'agendaWeek';
	}
}
