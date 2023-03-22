import * as L from 'leaflet';

export const createMarkerIcon = (bgColor: string, displayIcon: string) =>
  `<div style=\'background-color:${bgColor};\' class=\'marker-pin\'></div><i class=\'material-icons\'>${displayIcon}</i>`;

export const createMarkerClusterIcon = (cluster: L.MarkerCluster) => L.divIcon({
  html:
    '<div class="unassignedClusterIcon">' + cluster.getChildCount() + '</div>',
});
