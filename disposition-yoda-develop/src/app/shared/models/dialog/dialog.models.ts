import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

export interface DialogCloseResult {
  result: DialogCloseResultType;
  data?: any;
}
