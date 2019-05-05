import { Component, OnInit, Input, ViewChild } from '@angular/core';
import listPlugin from '@fullcalendar/list';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() events: any[];
  @ViewChild('fullCalendar') fullCalendar;
  options: any;
  machines: any;
  selectedEvent;
  selectedMachine;
  displayDialog = false;

  id;
  start;
  end;
  constructor() { }

  ngOnInit() {
    const _this = this;
    // select distinct machines
    this.machines = Array.from(new Set(this.events.map(s => s.id))).
      map(o => {
        return {
          label: o,
          value: this.events.find(s => s.id === o).id
        };
      });

    // select the first machine
    this.selectedMachine = this.machines[0].value;

    this.options = {
      // defaultDate: '2016-01-01',
      plugins: [listPlugin],
      defaultView: 'listWeek',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month, agendaWeek, agendaDay, listDay, listWeek, listMonth'
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
      eventClick: event => {
        _this.selectedEvent = event.event;
        _this.start = event.event.start;
        _this.end = event.event.end;
        _this.id = event.event.id;
        _this.displayDialog = true;
        // console.log('coucou' + moment(event.event.start).format('YYYY-MM DD HH:mm:ss'));
        // this.eventOut = event
        // this.eventOut.type = 'update'
      },
      dateClick: function (info) {
        alert('Clicked on: ' + info.dateStr);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('Current view: ' + info.view.type);
        // change the day's background color just for fun
        // info.dayEl.style.backgroundColor = 'red';
      },
      eventRender: function eventRender(event, element, view) {
        return ['all', event.event.id].indexOf(_this.selectedMachine) >= 0;
      }
    };
  }

  onMachineChange(event) {
    console.log('event :' + event);
    console.log(event.value);
    this.fullCalendar.calendar.rerenderEvents();
  }
}
