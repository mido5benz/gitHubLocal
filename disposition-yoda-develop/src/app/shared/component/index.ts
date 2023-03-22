import {ButtonComponent} from './buttons/button/button.component';
import {FilterControlComponent} from './filter-control/filter-control.component';
import {FilterInputControlComponent} from './filter-input-control/filter-input-control.component';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TimeSliderComponent} from './time-slider/time-slider.component';
import {ToggleButtonComponent} from './buttons/toggle-button/toggle-button.component';
import {TourFilterComponent} from './tour-filter/tour-filter.component';
import {TourFilterInputControlComponent} from './tour-filter-input-control/tour-filter-input-control.component';
import {CurrentFiltersComponent} from './navigation/components/current-filters/current-filters.component';
import {FilterLinkComponent} from './navigation/components/filter-link/filter-link.component';
import {NavBadgeIconLinkComponent} from './navigation/components/nav-badge-icon-link/nav-badge-icon-link.component';
import {TagItemComponent} from './filter-input-control/components/tag-item/tag-item.component';
import {LockTourComponent} from './lock-tour/lock-tour.component';
import {SelectDepotModalComponent} from './select-depot-modal/select-depot-modal.component';
import {TourNumberCellComponent} from './aggrid/components/tour-number-cell/tour-number-cell.component';
import {TourInfoComponent} from './tour-info/tour-info.component';
import {ReloadDataButtonComponent} from '@shared/component/buttons/reload-data-button/reload-data-button.component';
import {UmdispoInfoComponent} from '@shared/component/umdispo-info/umdispo-info.component';
import {SelectionCountButtonComponent} from '@shared/component/buttons/selection-count-button/selection-count-button.component';
import {NavigationItemComponent} from '@shared/component/navigation/navigation-item/navigation-item.component';
import {LoadingComponent} from '@shared/component/loading/loading.component';
import {LoadingNotificationComponent} from '@shared/component/loading-notification/loading-notification.component';
import {SelectedListEmergencyButtonComponent} from '@shared/component/emergency/selected-list-emergency-button/selected-list-emergency-button.component';
import {UpdateToursComponent} from '@shared/component/update-tours/update-tours.component';
import {TakeoverAddressModalComponent} from '@shared/component/spontaneous-takeover/takeover-address-modal/takeover-address-modal.component';
import {ShipperAddressButtonCellRendererComponent} from '@shared/component/spontaneous-takeover/shipper-address-button-cell-renderer/shipper-address-button-cell-renderer.component';

export * from './buttons/button/button.component';
export * from './filter-control/filter-control.component';
export * from './filter-input-control/filter-input-control.component';
export * from './navigation/navigation.component';
export * from './range-slider/range-slider.component';
export * from './time-slider/time-slider.component';
export * from './buttons/toggle-button/toggle-button.component';
export * from './tour-filter/tour-filter.component';
export * from './tour-filter-input-control/tour-filter-input-control.component';
export * from './navigation/components/current-filters/current-filters.component';
export * from './navigation/components/nav-badge-icon-link/nav-badge-icon-link.component';
export * from './filter-input-control/components/tag-item/tag-item.component';
export * from './lock-tour/lock-tour.component';
export * from './select-depot-modal/select-depot-modal.component';
export * from './aggrid/components/tour-number-cell/tour-number-cell.component';
export * from './tour-info/tour-info.component';
export * from './buttons/reload-data-button/reload-data-button.component';
export * from './umdispo-info/umdispo-info.component';
export * from './buttons/selection-count-button/selection-count-button.component';
export * from './navigation/navigation-item/navigation-item.component';
export * from './loading/loading.component';
export * from './loading-notification/loading-notification.component';
export * from './emergency/selected-list-emergency-button/selected-list-emergency-button.component';
export * from './update-tours/update-tours.component';
export * from './spontaneous-takeover/shipper-address-button-cell-renderer/shipper-address-button-cell-renderer.component';

export const components: any[] = [
  ReloadDataButtonComponent,
  ButtonComponent,
  FilterControlComponent,
  FilterInputControlComponent,
  RangeSliderComponent,
  NavigationComponent,
  TimeSliderComponent,
  ToggleButtonComponent,
  TourFilterComponent,
  TourFilterInputControlComponent,
  CurrentFiltersComponent,
  FilterLinkComponent,
  NavBadgeIconLinkComponent,
  TagItemComponent,
  LockTourComponent,
  SelectDepotModalComponent,
  TourNumberCellComponent,
  TourInfoComponent,
  UmdispoInfoComponent,
  SelectionCountButtonComponent,
  NavigationItemComponent,
  LoadingComponent,
  LoadingNotificationComponent,
  SelectedListEmergencyButtonComponent,
  UpdateToursComponent,
  TakeoverAddressModalComponent,
  ShipperAddressButtonCellRendererComponent
];
