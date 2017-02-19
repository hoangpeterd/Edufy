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
		// now: todayDate,
		selectable: true,
		selectHelper: true,
		editable: true, // enable draggable events
		aspectRatio: 1.25,
		scrollTime: '00:00', // undo default 6am scrollTime
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'agendaDay,basicWeek,month'
		},
		defaultView: 'month',
		events: FC.events,
		select: function(start, end, jsEvent, view) {
			
			newEvent.id = FC.events.events.length + 1;
			newEvent.start = start.format();
			newEvent.end = end.format();
			newEvent.title = "Click to name."; //@FIGURE OUT HOW TO DISPLAY BAR, DYNAMICALLY ADD INPUT ELEMENT TO ACCEPT TITLE@
			FC.events.events.push(newEvent);
			console.log(newEvent);
			console.log(FC.events);
		}
	});
});

	FC.events = {
		events: [
				{
					id: '1',
					start: '2017-02-06',
					end: '2017-02-08',
					title: 'All-day Event'
					//Maybe add a <span>x</span> ELEMENT to fire
					//.fullCalendar( 'removeEvents' [, idOrFilter ] )
					//when clicked
				}, {
					id: '2',
					start: '2017-02-14',
					end: '2017-02-14',
					title: "Valentine's Day"
				}
			],
		color: "#4CAE4C",
	};
