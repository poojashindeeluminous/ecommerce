var events;
$(function () {

  $(".btnClosePopup").click(function () {
    $("#appointmentModal").hide();
  });

 /* initialize the calendar
   -----------------------------------------------------------------*/
  //Date for the calendar events (dummy data)
  var date = new Date()
  var d    = date.getDate(),
      m    = date.getMonth(),
      y    = date.getFullYear()

  var Calendar = FullCalendar.Calendar;
 // var Draggable = FullCalendarInteraction.Draggable;
  // var containerEl = document.getElementById('external-events');
  // var checkbox = document.getElementById('drop-remove');
  var calendarEl = document.getElementById('calendar');

  /* filter the calendar
   -----------------------------------------------------------------*/
   $('#patient-id').on('change',function(){
      calendar.render();
   })

  var calendar = new Calendar(calendarEl, {
    plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid' ],
    header    : {
      left  : 'prev,next today',
      center: 'title',
      right : 'dayGridMonth,timeGridWeek,timeGridDay'
    }, //Random default events
    events   : {
      url: ADMINURL+'/calendar/getEvents',
      /*error: function() {
        $('#script-warning').show();
      },success: function(){
                    // not clear 
                },
            loading: function(bool) {
              $('#loading').toggle(bool);

            },*/
    },
   selectable: true,
   // editable: true,
   eventClick: function(info) {
    console.log('eventClick');
    // console.log(info);
    // console.log(info.event.title);
    // console.log(info.event.start);
    // console.log(info.event._def.extendedProps.description);
    $("#appointmentModal .modal-body").html(info.event._def.extendedProps.description);
    $("#appointmentModal").show();
    $("html, body").animate({ scrollTop: 100 }, "slow");

    //calEvent, jsEvent, view
    /*var first = $.fullCalendar.formatDate(data.start, "dddd, MMM yyyy @ HH:mmtt");
    var second = $.fullCalendar.formatDate(data.end, "dddd, MMM yyyy @ HH:mmtt");
    var title = '<h5 style="margin:0;padding:0;">'+data.title+'</h5>'; 
    var content = '<p style="margin:0;padding:2px;"><b>Start:</b> '+first+'<br />' + 
          (second && '<p style="margin:0;padding:2px;"><b>End:</b> '+second+'</p>' || '') + 
          (data.description && '<p style="margin:0;padding:2px;"><b>What:</b> '+data.description+'</p>' || '') + 
          (data.location && '<p style="margin:0;padding:2px;"><b>Where:</b> '+data.location+'</p>' || '');
      tooltip.set({
          'content.title': title,
          'content.text': content
      }).reposition(event).show(event);*/
    // console.log(calEvent.el.text);
      /* var dt = calEvent.start;
       alert('Event Clicked on : ' + dt);
        var r = confirm("Delete " + calEvent.title + "\n" + dt);
        if (r === true) {
           $('#calendar').fullCalendar('removeEvents', calEvent._id);
        }*/
    },
    eventRender: function eventRender( event, element, view ) {
       console.log('eventRender');
       var showTypes,event_patient_id, showFacilities, showSearchTerms = true;
       var patient_id = $('#patient-id').val();
       // console.log(patient_id);
       // console.log(event);
       // console.log(event.event._def.extendedProps);

       // event_patient_id = event.event._def.extendedProps.patient_id;
       // if (patient_id.length > 0){
       //   showSearchTerms = event_patient_id == patient_id;
       // }
       event_patient_email = event.event._def.extendedProps.patient_email;

       if (event_patient_email.length > 0 && patient_id.length>0){
        // console.log(event_patient_email.length);
         showSearchTerms = event_patient_email == patient_id;
       }
       return showSearchTerms;
       /*var searchTerms = $('#searchTerm').val();
       //filters 
       if (searchTerms.length > 0){
         showSearchTerms = event.title.toLowerCase().indexOf(searchTerms) >= 0 || event.desc.toLowerCase().indexOf(searchTerms) >= 0;
       }
          
       if (types && types.length > 0) {          
          if (types.trim().toLowerCase() == "all") {
            showTypes = true;
          }else {
            showTypes = types.indexOf(event.type) >= 0;
          }
       }*/
             
       //return showTypes && showSearchTerms;               
     }, //end: eventRender
    select: function(start, end, jsEvent) {
       console.log('select');
       // console.log(start,end);
       /* endtime = $.fullCalendar.moment(end).format('h:mm');
        starttime = $.fullCalendar.moment(start).format('dddd, MMMM Do YYYY, h:mm');
        var mywhen = starttime + ' - ' + endtime;
        start = moment(start).format();
        end = moment(end).format();
        $('#createEventModal #startTime').val(start);
        $('#createEventModal #endTime').val(end);
        $('#createEventModal #when').text(mywhen);
        $('#createEventModal').modal('toggle');*/
   },
    /*events   : [
                  {
                    title          : 'All Day Event',
                    start          : new Date(y, m, 1),
                    backgroundColor: '#f56954', //red
                    borderColor    : '#f56954', //red
                    allDay         : true
                  },
                  {
                    title          : 'Long Event',
                    start          : new Date(y, m, d - 5),
                    end            : new Date(y, m, d - 2),
                    backgroundColor: '#f39c12', //yellow
                    borderColor    : '#f39c12' //yellow
                  },
                  {
                    title          : 'Meeting',
                    start          : new Date(y, m, d, 10, 30),
                    allDay         : false,
                    backgroundColor: '#0073b7', //Blue
                    borderColor    : '#0073b7' //Blue
                  },
                  {
                    title          : 'Lunch',
                    start          : new Date(y, m, d, 12, 0),
                    end            : new Date(y, m, d, 14, 0),
                    allDay         : false,
                    backgroundColor: '#00c0ef', //Info (aqua)
                    borderColor    : '#00c0ef' //Info (aqua)
                  },
                  {
                    title          : 'Birthday Party',
                    start          : new Date(y, m, d + 1, 19, 0),
                    end            : new Date(y, m, d + 1, 22, 30),
                    allDay         : false,
                    backgroundColor: '#00a65a', //Success (green)
                    borderColor    : '#00a65a' //Success (green)
                  },
                  {
                    title          : 'Click for Google',
                    start          : new Date(y, m, 28),
                    end            : new Date(y, m, 29),
                    url            : 'http://google.com/',
                    backgroundColor: '#3c8dbc', //Primary (light-blue)
                    borderColor    : '#3c8dbc' //Primary (light-blue)
                  }
                ],*/
    });

  calendar.render();


});

 /*function getSelectedDateEvent(){

     $('.card').LoadingOverlay("show", {
         background: "rgba(165, 190, 100, 0.4)",
     });

     var action = ADMINURL + '/calendar/getSelectedDateEvent';

     axios.post(action, {selected_date:selected_date})
     .then(response => 
     {  
         $('.card').LoadingOverlay("hide");      
         
         
     })
     .catch(error =>
     {
         $('.card').LoadingOverlay("hide");
     })

   }*/
