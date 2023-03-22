export const strategicDispoConfig = {
  map: {
    zoom: 13,
    center: {
      lat: 49.54887,
      lng: 8.66697
    },
    grid: {
      size_lat: 0.002703,
      size_lon: 0.004280,
      minZoom: 10,
      center: {
        lat: 51.000000,
        lng: 10.000000
      },
      styles: {
        color: {
          border: 'black',
          hover: 'red', // 'grey',
          selected: 'red',
          assigned: 'green',
          currentRaster: 'blue'
        },
        heatMap: [{
          min: 1,
          max: 8,
          color: 'gold'
        }, {
          min: 9,
          max: 21,
          color: 'rgb(255,180,0)'
        }, {
          min: 22,
          max: 58,
          color: 'rgb(255,130,0)'
        }, {
          min: 59,
          color: 'orangered'
        }]
      }
    }
  }
};
