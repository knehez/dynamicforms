import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() events: any[] = [];
  @ViewChild('fullCalendar') fullCalendar?: FullCalendarComponent;

  options: CalendarOptions;
  machines: any[] = [];
  selectedEvent?: EventApi;
  selectedMachine: any;
  displayDialog = false;

  id: any;
  title = '';
  description = '';
  start: Date;
  end: Date;

  // p-calendar dialog z-indexes
  startZIndex = 1000;
  endZIndex = 999;

  constructor() { }

  ngOnInit(): void {
    this.machines = Array.from(new Set(this.events.map((s) => s.id))).map((o) => ({
      label: o,
      value: this.events.find((s) => s.id === o).id
    }));

    if (this.machines.length > 0) {
      this.selectedMachine = this.machines[0].value;
    }

    this.options = {
      initialDate: this.events[0]?.start,
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay,listWeek,listMonth'
      },
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
        listMonth: { buttonText: 'list month' }
      },
      locale: 'hu',
      timeZone: 'local',
      editable: true,
      allDaySlot: false,
      navLinks: true,
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      eventClick: (arg: EventClickArg) => {
        this.title = 'Edit Event';
        this.selectedEvent = arg.event;
        this.description = arg.event.title;
        this.start = arg.event.start;
        this.end = arg.event.end;
        this.id = arg.event.id;
        if (arg.event.backgroundColor === 'red') {
          this.displayDialog = true;
        }
      },
      dateClick: (info: any) => {
        this.title = 'Add Maintenance Intervall';
        this.description = 'Maintenance';
        this.start = info.date;
        this.end = info.date;
        this.id = this.selectedMachine;
        this.displayDialog = true;
      },
      eventDidMount: (info: any) => {
        const shouldDisplay = ['all', this.selectedMachine].indexOf(info.event.id) >= 0;
        info.el.style.display = shouldDisplay ? '' : 'none';
      }
    } as CalendarOptions;
  }

  saveEvent(): void {
    if (this.title === 'Add Maintenance Intervall') {
      this.events = [
        ...this.events,
        {
          title: this.description,
          id: this.selectedMachine,
          start: this.start,
          end: this.end,
          color: 'red'
        }
      ];
      this.refreshCalendar();
    }

    if (this.title === 'Edit Event' && this.selectedEvent) {
      this.selectedEvent.setProp('title', this.description);
      this.selectedEvent.setStart(this.start);
      this.selectedEvent.setEnd(this.end);
      this.refreshCalendar();
    }
  }

  onMachineChange(event: any): void {
    console.log('event :' + event);
    console.log(event.value);
    this.refreshCalendar();
  }

  endCalendarSwapZIndex(): void {
    this.startZIndex = 999;
    this.endZIndex = 1000;
  }

  startCalendarSwapZIndex(): void {
    this.startZIndex = 1000;
    this.endZIndex = 999;
  }

  private refreshCalendar(): void {
    this.fullCalendar?.getApi().render();
  }
}
