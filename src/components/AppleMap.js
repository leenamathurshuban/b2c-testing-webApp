import { useEffect, useRef } from 'react';
const NEXT_PUBLIC_APPLE_MAP_TOKEN='eyJraWQiOiJSTURSQVA5UlA2IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJLV001MzI5RjVYIiwiaWF0IjoxNzI4NDkyMjYyLCJvcmlnaW4iOiJ3d3cuYXBwbGVmaXhwcm9zLmNvbSJ9.WJeBk-KIZrav_zhBWlrUMaImPGqEM6P8LKpBfuXHGHLIHCXBGbrqqkaLkftp9Yl6K5iA-Y7O25_BV5TcS2PfEw'

const AppleMap = () => {
  // useEffect(() => {
  //   console.log('Current Origin:', window.location.origin);

  //   const mapScript = document.createElement('script');
  //   mapScript.src = `https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js`;
  //   mapScript.async = true;
  //   mapScript.onload = () => {
  //     if (window.mapkit) {
  //       window.mapkit.init({
  //         authorizationCallback: function (done) {
  //           done(NEXT_PUBLIC_APPLE_MAP_TOKEN);
  //         },
  //       });

  //       const map = new window.mapkit.Map('map-container');
  //       const coordinate = new window.mapkit.Coordinate(37.7749, -122.4194); // Example: San Francisco coordinates
  //       map.center = coordinate;
  //       map.showItems = ['standard', 'satellite', 'hybrid'];
  //     }
  //   };
  //   document.head.appendChild(mapScript);
  // }, []);

  // return <div id="map-container" style={{ width: '100%', height: '500px' }} />;
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mapkit.init({
        authorizationCallback: function (done) {
          // Use your Apple MapKit token here
          done(NEXT_PUBLIC_APPLE_MAP_TOKEN);
        },
      });

      // Coordinates for 'Apple Fix Pros LLC, 500 Cirby Way, Suite D, Roseville, CA 95678'
      const coordinate = new mapkit.Coordinate(38.7276, -121.2857);

      // Initialize the map
      const map = new mapkit.Map(mapRef.current);

      // Add a marker at the location
      const annotation = new mapkit.MarkerAnnotation(coordinate, {
        title: 'Apple Fix Pros LLC',
        subtitle: '500 Cirby Way, Suite D, Roseville, CA 95678',
        color: '#FF0000', // Custom color for the marker
      });

      map.showItems([annotation]);

      // Center the map on the specified coordinates
      map.setCenter(coordinate);
      map.setRegionAnimated(new mapkit.CoordinateRegion(coordinate, new mapkit.CoordinateSpan(0.01, 0.01)), true);
    }
  }, []);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default AppleMap;
