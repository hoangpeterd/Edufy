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

		$("#calendar").fullCalendar("addEventSource", userSpecTime);

		$("#calendar > div.fc-view-container > div > table > tbody > tr > td > div > div > div:nth-child(3) > div.fc-content-skeleton > table > tbody > tr > td.fc-event-container").on("click", function() {
			alert("clicked");
		})

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
		editable: true, // enable draggable events
		aspectRatio: 1.25,
		nowIndicator: true,
		slotEventOverlap: false,
		eventOverlap: false,
		slotDuration: '00:60:00',

		//This element should be custom based on User's registration.
		businessHours: userSpecTime,

		displayEventTime: true,
		displayEventEnd: true,
		scrollTime: '00:00', // undo default 6am scrollTime
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaDay,agendaWeek,month,listMonth'
		},
		defaultView: 'month',
		events: FC.events,
		eventBorderColor: "#4CAE4C", 
		eventBackgroundColor: "rgba(76, 174, 76, .5)",
		select: function(start, end, jsEvent, view) {
			
			newEvent.id = FC.events.events.length + 1;
			newEvent.start = start.format();
			newEvent.end = end.format();
			newEvent.title = "Available Time"; 
			FC.events.events.push(newEvent);
			$("#calendar").fullCalendar("addEventSource", [newEvent]);
		}
	});
});

	FC.events = {
		events: [
				{
					"id": '1',
					"start": '2017-02-06T10:00:00',
					"end": '2017-02-06T16:00:00',
					"title": 'Available Time'
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
				dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
				start: '16:30', // 
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