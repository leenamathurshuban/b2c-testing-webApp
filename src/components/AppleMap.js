import { useEffect } from 'react';
const NEXT_PUBLIC_APPLE_MAP_TOKEN='eyJraWQiOiJSTURSQVA5UlA2IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJLV001MzI5RjVYIiwiaWF0IjoxNzI4NDkyMjYyLCJvcmlnaW4iOiJ3d3cuYXBwbGVmaXhwcm9zLmNvbSJ9.WJeBk-KIZrav_zhBWlrUMaImPGqEM6P8LKpBfuXHGHLIHCXBGbrqqkaLkftp9Yl6K5iA-Y7O25_BV5TcS2PfEw'

const AppleMap = () => {
  useEffect(() => {
    console.log('Current Origin:', window.location.origin);

    const mapScript = document.createElement('script');
    mapScript.src = `https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js`;
    mapScript.async = true;
    mapScript.onload = () => {
      if (window.mapkit) {
        window.mapkit.init({
          authorizationCallback: function (done) {
            done(NEXT_PUBLIC_APPLE_MAP_TOKEN);
          },
        });

        const map = new window.mapkit.Map('map-container');
        const coordinate = new window.mapkit.Coordinate(37.7749, -122.4194); // Example: San Francisco coordinates
        map.center = coordinate;
        map.showItems = ['standard', 'satellite', 'hybrid'];
      }
    };
    document.head.appendChild(mapScript);
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '500px' }} />;
};

export default AppleMap;
