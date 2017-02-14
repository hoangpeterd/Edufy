//http://www.bootstrap-year-calendar.com/#Documentation/Options
//http://www.bootstrap-year-calendar.com/#Documentation/Methods
//The bootstrap year calendar widget is under Apache license V2.0.

//This mean you can reuse, modify and distribute the code, for a open source or a commercial use.

//You just have to provide the Apache license with your project. All modified files must be tagged as such, and must contain the original copyright.

//http://www.apache.org/licenses/LICENSE-2.0

$('.calendar').calendar();
$(".datepicker").datepicker();
// $(".datepicker").on("click", function() {
// if ($("[name='event-start-date']")) {
// $("[name='event-start-date']").datepicker("setDate", 0);
// }
// if ($("[name='event-end-date']")) {
// $("[name='event-end-date']").datepicker("setDate", 0);
// }
// });
    //  $('#calendar').data('calendar').setDataSource(...);

function editEvent(event) {
    $('#event-modal input[name="event-index"]').val(event ? event.id : '');
    $('#event-modal input[name="event-name"]').val(event ? event.name : '');
    $('#event-modal input[name="event-location"]').val(event ? event.location : '');
    $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
    $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
    $('#event-modal').modal();
}

function deleteEvent(event) {
    var dataSource = $('#calendar').data('calendar').getDataSource();

    for(var i in dataSource) {
        if(dataSource[i].id == event.id) {
            dataSource.splice(i, 1);
            break;
        }
    }
    
    $('#calendar').data('calendar').setDataSource(dataSource);
}

$(function() {
    var currentYear = new Date().getFullYear();

    $('#calendar').calendar({ 
        disabledDays: [
            //Example structure for disabling a block of days.
            // new Date(currentYear,1,2),
            // new Date(currentYear,1,3),
            // new Date(currentYear,1,8),
            // new Date(currentYear,1,9),
            // new Date(currentYear,1,10),
            // new Date(currentYear,1,11),
            // new Date(currentYear,1,13),
            // new Date(currentYear,1,14),
            // new Date(currentYear,1,15)
        ]
    });
});

function saveEvent() {
    var event = {
        id: $('#event-modal input[name="event-index"]').val(),
        name: $('#event-modal input[name="event-name"]').val(),
        location: $('#event-modal input[name="event-location"]').val(),
        startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
        endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
    };
    
    var dataSource = $('#calendar').data('calendar').getDataSource();
    var i;
    if(event.id) {
        for(i in dataSource) {
            if(dataSource[i].id == event.id) {
                dataSource[i].name = event.name;
                dataSource[i].location = event.location;
                dataSource[i].startDate = event.startDate;
                dataSource[i].endDate = event.endDate;
            }
        }
    }
    else
    {
        var newId = 0;
        for(i in dataSource) {
            if(dataSource[i].id > newId) {
                newId = dataSource[i].id;
            }
        }
        
        newId++;
        event.id = newId;
    
        dataSource.push(event);
    }
    
    $('#calendar').data('calendar').setDataSource(dataSource);
    $('#event-modal').modal('hide');
}

$(function() {
    var currentYear = new Date().getFullYear();

    $('#calendar').calendar({ 
        enableContextMenu: true,
        enableRangeSelection: true,
        contextMenuItems:[
            {
                text: 'Update',
                click: editEvent
            },
            {
                text: 'Delete',
                click: deleteEvent
            }
        ],
        selectRange: function(e) {
            editEvent({ startDate: e.startDate, endDate: e.endDate });
        },
        mouseOnDay: function(e) {
            if(e.events.length > 0) {
                var content = '';
                
                for(var i in e.events) {
                    content += '<div class="event-tooltip-content">' + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>' + '<div class="event-location">' + e.events[i].location + '</div>' + '</div>';
                }
            
                $(e.element).popover({ 
                    trigger: 'manual',
                    container: 'body',
                    html:true,
                    content: content
                });
                
                $(e.element).popover('show');
            }
        },
        mouseOutDay: function(e) {
            if(e.events.length > 0) {
                $(e.element).popover('hide');
            }
        },
        dayContextMenu: function(e) {
            $(e.element).popover('hide');
        },
        dataSource: [
            //Array of date objects
            //Example: 
            /* {
                id: 1,
                name: 'Microsoft Convergence',
                location: 'New Orleans, LA',
                startDate: new Date(currentYear, 2, 16),
                endDate: new Date(currentYear, 2, 19)
            }*/
        ]
    });
    
    $('#save-event').click(function() {
        saveEvent();
    });
});