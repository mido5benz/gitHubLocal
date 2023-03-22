import * as L from 'leaflet';

export const stopEventPropagation = (componentEl: HTMLElement): void => {
  L.DomEvent.addListener(componentEl, 'click', (event) => {
      L.DomEvent.stopPropagation(event);
      L.DomEvent.disableClickPropagation(componentEl);
    }
  );
  L.DomEvent.addListener(componentEl, 'dblclick', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'mouseout', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'mousemove', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'contextmenu', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'mouseup', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'mousedown', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'mousewheel', (event) =>
    L.DomEvent.stopPropagation(event)
  );
  L.DomEvent.addListener(componentEl, 'wheel', (event) =>
    L.DomEvent.stopPropagation(event)
  );
};
