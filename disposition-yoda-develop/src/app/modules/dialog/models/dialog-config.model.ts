export class DialogConfig<D = any> {
    data?: D;
    width?: number;
    height?: number;
    positionX?: number;
    positionY?: number;
    modalType: DialogModalType = DialogModalType.MODAL;
    closeOnOutsideClicked = true;
    title?: string;
    showTitle ? = true;
}

export enum DialogModalType {
    MODAL,
    LEFT,
    RIGHT,
}
