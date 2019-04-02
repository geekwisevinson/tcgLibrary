import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'vf-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit, OnChanges {
  @Input() public error;
  public errorMessage = '';

  constructor() { }
  ngOnChanges ( changes : SimpleChanges ) : void {
    console.log('changes', changes);
    if (changes && changes.error && changes.error.currentValue) {
      this.errorMessage = changes.error.currentValue.error.errmsg;
      console.log('changes.error.currentValue', changes.error.currentValue);
    }
  }

  ngOnInit() {
  }

}
