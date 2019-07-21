import { Component, OnInit, Input, ViewChild } from '@angular/core';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() events = [];
  @ViewChild('fullCalendar') fullCalendar;
  options: any;
  machines: any;
  selectedEvent;
  selectedMachine;
  displayDialog = false;

  id;
  title;
  description;
  start;
  end;

  // p-calendar dialog z-indexes
  startZIndex = 1000;
  endZIndex = 999;

  constructor() { }

  ngOnInit() {
    // select distinct machines
    this.machines = Array.from(new Set(this.events.map(s => s.id))).
      map(o => {
        return {
          label: o,
          value: this.events.find(s => s.id === o).id
        };
      });

    if (Array.isArray(this.machines) && this.machines.length > 0) {
      // select the first machine
      this.selectedMachine = this.machines[0].value;
    }

    this.options = {
      defaultDate: this.events[0].start,
      plugins: [listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'dayGridMonth',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay, listDay, listWeek, listMonth'
      },
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
        listMonth: { buttonText: 'list month' }
      },
      locale: 'hu',
      timezone: 'local',
      editable: true,
      textEscape: false,
      allDaySlot: false,
      navLinks: true,
      eventClick: event => {
        this.title = 'Edit Event';
        this.selectedEvent = event.event;
        this.description = event.event.title;
        this.start = event.event.start;
        this.end = event.event.end;
        this.id = event.event.id;
        if (event.event.backgroundColor === 'red') {
          this.displayDialog = true;
        }
        // console.log('coucou' + moment(event.event.start).format('YYYY-MM-DD HH:mm:ss'));
        // this.eventOut = event
        // this.eventOut.type = 'update'
      },
      dateClick: info => {
        this.title = 'Add Maintenance Intervall';
        this.description = 'Maintenance';
        this.start = info.date;
        this.end = info.date;
        this.id = this.selectedMachine;
        this.displayDialog = true;
        // info.dayEl.style.backgroundColor = 'red';
      },
      eventRender: (event, element, view) => {
        return ['all', event.event.id].indexOf(this.selectedMachine) >= 0;
      }
    };
  }

  saveEvent() {
    if (this.title === 'Add maintenance') {
      this.events = [...this.events, {
        'title': this.description,
        'id': this.selectedMachine,
        'start': this.start,
        'end': this.end,
        'color': 'red'
      }];
    }
    if (this.title === 'Edit Event') {
      this.selectedEvent.setProp('title', this.description);
      this.selectedEvent.setStart(this.start);
      this.selectedEvent.setEnd(this.end);
      this.fullCalendar.calendar.updateEvent(this.selectedEvent);
    }
  }

  onMachineChange(event) {
    console.log('event :' + event);
    console.log(event.value);
    this.fullCalendar.calendar.rerenderEvents();
  }

  endCalendarSwapZIndex() {
    this.startZIndex = 999;
    this.endZIndex = 1000;
  }

  startCalendarSwapZIndex() {
    this.startZIndex = 1000;
    this.endZIndex = 999;
  }

}
