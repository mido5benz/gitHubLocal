export interface RejectionReason {
  fotoGrundId: number,
  code: string,
  designation: string
}

export interface PhotoRequest {
  tourId: number,
  ladeSicherungId: number,
  photoId: number
}

export interface PhotoResponse {
  tourId: number,
  tourNr: string,
  abfahrtzeit: string,
  fotoData: string,
  fotoId: number
}

export interface PhotoRelease {
  tourId: number,
  fotoId: number,
  ringLadesicherungStatus: boolean,
  ablehnungGrundCode?: string,
  ringingPresort?: boolean,
  ringingFahrer?: boolean,
  ringingPresortName?: string,
  ringingFahrerName?: string,
  ringingConfirm?: boolean,
  ringingLadesicherungConfirm: boolean
}
