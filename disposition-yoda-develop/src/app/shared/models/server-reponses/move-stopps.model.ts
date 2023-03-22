export interface MoveStoppServerResponse {
  unprocessable: MoveStoppServerResponseObject[];
}

export interface MoveStoppServerResponseObject {
  quell_dispostopp_id: number;
  ziel_tour_id: number;
  sendungIds?: number[];
  uebernahmeIds?: number[];
  ziel_dispostopp_id?: number;
  error?: {
    code: string;
    message: string;
  };
}
