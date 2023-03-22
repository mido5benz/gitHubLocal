export class TourFilter {
  constructor(
    public column: string = null,
    public filters: TextFilter[] = []
  ) {}
}

export class LayerFilter {
  constructor(
    public column: string = null,
    public filters: TextFilter[] = []
  ) {}
}

export interface TextFilter {
  type: string;
  filter: string;
}
