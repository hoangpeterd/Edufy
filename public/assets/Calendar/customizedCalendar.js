
		var moment = moment();
		var todayDate = moment.format("YYYY-MM-DD");

	$(function() { // document ready
		/* initialize the external events
		-----------------------------------------------------------------*/

		$('#external-events .fc-event').each(function() {

			// store data so the calendar knows to render an event upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
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
				right: 'timelineDay,agendaWeek,month'
			},
			defaultView: 'month',
			events: [
				{
					id: '3',
					start: '2017-02-06',
					end: '2017-02-08',
					title: 'event 3'
				}
			],
			select: function(start, end, jsEvent, view) {
				console.log(
					'select callback',
					start.format(),
					end.format(),
					view
				);
			},
			dayClick: function(date, jsEvent, view) {
				console.log(
					'dayClick',
					date.format()
				);
			}
		});

		$('#select-G').on('click', function() {
			$('#calendar').fullCalendar('select', '2017-02-07T02:00:00', '2017-02-07T07:00:00', 'g');
		});

		$('#select-unspecified').on('click', function() {
			$('#calendar').fullCalendar('select', '2017-02-07T02:00:00', '2017-02-07T07:00:00');
		});

	});
