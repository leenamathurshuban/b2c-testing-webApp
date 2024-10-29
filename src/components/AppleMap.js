import { useEffect, useRef } from 'react';
import styles from "./AppleMap.module.css";
import Image from "next/image";
import Direction_icon from "../../public/assets/images/arrow-direction-1.png";
const AppleMap = () => {

  const mapRef = useRef(null);
  const handleDirections = () => {
    const appleMapsUrl = `http://maps.apple.com/?daddr=38.7276,-121.2857`;
    window.open(appleMapsUrl, '_blank');
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      mapkit.init({
        authorizationCallback: function (done) {
          // Use your Apple MapKit token here
          done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN);
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

      // Set the map's center to the coordinate
      map.center = coordinate;

      // Optionally, set the region to control zoom level
      map.region = new mapkit.CoordinateRegion(coordinate, new mapkit.CoordinateSpan(0.01, 0.01));
    }
  }, []);

  return (
    <div className={styles.mapContainer}>
      {/* Title box in the top left corner */}
      <div className={styles.titleBox}>
        <div className='map-addressinfo'>
          <h2>Apple Fix Pros LLC</h2>
          <small>500 Cirby Way, Roseville, CA</small>
        </div>
        <span onClick={handleDirections} className={styles.direction_link}>
          <Image src={Direction_icon} alt="Apple Fix Pro" className={styles.direction_link_img} />
          Direction
        </span>
      </div>
      {/* Map container */}
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export default AppleMap;


// import { useEffect, useRef } from 'react';
// import './AppleMap.module.css'; // Import styles

// const AppleMap = () => {
//   const mapRef = useRef(null);
//   const destination = new window.mapkit.Coordinate(38.7521, -121.2880); // Apple Fix Pros location

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.mapkit) {
//       // Initialize the Apple Map
//       window.mapkit.init({
//         authorizationCallback: function (done) {
//           // Use your Apple MapKit token here
//           done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN);
//         }
//       });

//       const map = new window.mapkit.Map(mapRef.current, {
//         center: destination,
//         zoom: 12
//       });

//       // Add destination annotation (Apple Fix Pros LLC)
//       const destinationAnnotation = new window.mapkit.MarkerAnnotation(destination, {
//         title: "Apple Fix Pros LLC",
//         subtitle: "500 Cirby Way, Roseville, CA"
//       });
//       map.addAnnotation(destinationAnnotation);

//       // Check if browser supports geolocation
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const userLocation = new window.mapkit.Coordinate(
//             position.coords.latitude,
//             position.coords.longitude
//           );

//           // Add user location annotation
//           const userAnnotation = new window.mapkit.MarkerAnnotation(userLocation, {
//             title: "Apple Fix Pros LLC"
//           });
//           map.addAnnotation(userAnnotation);

//           // Calculate directions
//           const directions = new window.mapkit.Directions();

//           directions.route({
//             origin: userLocation,
//             destination: destination,
//             transportType: window.mapkit.Directions.Transport.Automobile // Options: Walking, Automobile, Transit
//           }, (error, data) => {
//             if (error) {
//               console.error('Error calculating directions:', error);
//               return;
//             }

//             // Display the route on the map
//             const route = data?.routes[0];
//             const polyline = new window.mapkit.PolylineOverlay(route?.path);
//             map.addOverlay(polyline);

//             // Zoom to show the full route
//             map.region = new window.mapkit.CoordinateRegion(route.path[0], route.path[route.path.length - 1]);
//           });
//         });
//       } else {
//         console.log("Geolocation is not supported by this browser.");
//       }
//     }
//   }, []);

//   return (
//     <div className="mapContainer">
//       {/* Title box in the top left corner */}
//       <div className="styles.titleBox">
//         <h2>Apple Fix Pros LLC</h2>
//         <p>500 Cirby Way, Roseville, CA</p>
//       </div>
//       {/* Map container */}
//       <div ref={mapRef} className="map" />
//     </div>
//   );
// };

// export default AppleMap;
