import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-geoposition-form',
  templateUrl: './geoposition-form.component.html',
  styleUrls: ['./geoposition-form.component.scss']
})
export class GeopositionFormComponent implements OnInit {

  @Input() set latLng(latlng: any) {
    this.geoposForm.patchValue({
      lat: latlng?.lat,
      lng: latlng?.lng,
    });
  }

  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLatLngPasted: EventEmitter<any> = new EventEmitter<any>();

  geoposForm: FormGroup = this.fb.group({
    lat: ['', Validators.required],
    lng: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  searchClicked(): void {
    this.onSearchClick.emit(this.geoposForm.value);
  }

  onPaste(event): void {

    // @ts-ignore
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');

    // Check if we have a geoposition here
    const regex = new RegExp(`^([-+]?)([\\d]{1,2})(((\\.)(\\d+)(,)))(\\s*)(([-+]?)([\\d]{1,3})((\\.)(\\d+))?)$`);

    if (regex.test(pastedText)) {
      event.preventDefault();
      const latLnParts = pastedText.split(',');
      this.geoposForm.patchValue({
        lat: latLnParts[0],
        lng: latLnParts[1]
      });
    }

    this.onLatLngPasted.emit(this.geoposForm.value);
  }
}
