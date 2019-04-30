import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() events: any[];
  options: any;
  selectedEvent;
  displayDialog = false;
  start;
  end;
  constructor() { }

  ngOnInit() {
    const _this = this;
    this.options = {
      defaultDate: '2016-01-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
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
      }
    };
  }

}
