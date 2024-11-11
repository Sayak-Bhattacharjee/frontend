<template>
    <div ref="map" class="map-container"></div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  import MapboxDraw from '@mapbox/mapbox-gl-draw';
  import * as turf from '@turf/turf';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
  
  export default {
    name: 'MapComponent',
    data() {
      return {
        map: null,
        draw: null,
        markers: []
      };
    },
    mounted() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5YWstYiIsImEiOiJjbTM2NmN2NWgwMmo0MnFxeGtyeHE0azY4In0.BqrqSgTnZMgOb1ZYygSK4Q';
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
      });
  
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: true,
          point: true,
          trash: true
        },
      });
      this.map.addControl(this.draw);
  
      this.map.on('draw.create', this.saveDrawnShape);
      this.map.on('draw.update', this.saveDrawnShape);
    },
    methods: {
      saveDrawnShape(e) {
        console.log('e', e);
        const data = this.draw.getAll();
        console.log('Drawn shape data:', data);
      },
      calculateDistance() {
        const data = this.draw.getAll();
        if (data.features.length < 2) return;
  
        const line = turf.lineString(data.features.map(f => f.geometry.coordinates));
        const distanceInKm = turf.length(line, { units: 'kilometers' });
        const distanceInMiles = turf.length(line, { units: 'miles' });
  
        console.log(`Distance: ${distanceInKm} km / ${distanceInMiles} miles`);
      },
      addMarker(lngLat) {
        const marker = new mapboxgl.Marker({ draggable: true })
          .setLngLat(lngLat)
          .addTo(this.map);
  
        marker.on('dragend', () => {
          const position = marker.getLngLat();
          console.log('New marker position:', position);
        });
  
        this.markers.push(marker);
      }
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 500px;
    width: 100%;
  }
  </style>
  