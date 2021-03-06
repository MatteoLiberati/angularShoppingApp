import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message : string;
  close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }
}
