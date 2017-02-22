var i = 0;
var newEvent = {
	id: i, 
	start: null, 
	end: null, 
	title: null 
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
		
		$("span.tc-title").on("click", function() {
			$(this).attr("contenteditable='true'");
		})

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: false,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
	});
		//Maybe add a <span>x</span> ELEMENT to fire
		//when clicked
	/* initialize the calendar
	-----------------------------------------------------------------*/
	$('#calendar').fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		selectable: true,
		selectHelper: true,
		editable: true, // enable draggable events
		aspectRatio: 1.25,
		nowIndicator: true,
		slotEventOverlap: false,
		eventOverlap: false,

		//This element should be custom based on User's registration.
		// businessHours: userSpecTime,

		displayEventTime: true,
		displayEventEnd: true,
		scrollTime: '00:00', // undo default 6am scrollTime
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaDay,agendaWeek,month,listMonth'
		},
		// views: {
		// 	month: {
		// 	},
		// 	agenda: {
		// 	},
		// 	list: {
		// 	}
		// },
		defaultView: 'month',
		events: FC.events,
		eventColor: "#4CAE4C", 
		select: function(start, end, jsEvent, view) {
			
			newEvent.id = FC.events.events.length + 1;
			newEvent.start = start.format();
			newEvent.end = end.format();
			newEvent.title = "Click to name."; 
		 	//http://qtip2.com/

			//@FIGURE OUT HOW TO DISPLAY BAR, DYNAMICALLY ADD INPUT ELEMENT TO ACCEPT TITLE@
			FC.events.events.push(newEvent);
			// $("#calendar").fullCalendar("addEventSource", userSpecTime);
			$("#calendar").fullCalendar("addEventSource", [newEvent]);
		}
	});
});

	FC.events = {
		events: [
				{
					"id": '1',
					"start": '2017-02-06',
					"end": '2017-02-08',
					"title": 'All-day Event'
				}, {
					"id": '2',
					"start": '2017-02-14',
					"end": '2017-02-14',
					"title": "Valentine's Day"
				}
			],
	};

	userSpecTime = [ // specify an array instead
    		{
				dow: [ 2, 3 ], // Monday, Tuesday, Wednesday
				start: '09:30', // 
				end: '17:00' // 
			},
			{
				dow: [ 4, 5 ], // Thursday, Friday
				start: '10:00', // 10am
				end: '16:00' // 4pm
			},
			{
				dow: [6],
				start: '14:00',
				end: '18:00'
			}
		];