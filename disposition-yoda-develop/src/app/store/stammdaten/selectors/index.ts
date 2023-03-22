import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {MASTERDATA_FEATURE_KEY, MasterDataState} from '@store/stammdaten';

export const selectStammdatenState: MemoizedSelector<object,
  any> = createFeatureSelector<MasterDataState>(MASTERDATA_FEATURE_KEY);
