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

import { useEffect, useRef } from 'react';

const AppleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize MapKit JS using your token
      window.mapkit.init({
        authorizationCallback: function (done) {
          done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN); // replace with your actual Apple Maps token
        }
      });

      // Create a map instance
      const map = new window.mapkit.Map(mapRef.current);

      // Set the initial region (optional)
      const coordinate = new window.mapkit.Coordinate(38.7521, -121.2880); // Example: San Francisco
      map.setRegion(new window.mapkit.CoordinateRegion(coordinate, new window.mapkit.CoordinateSpan(0.1, 0.1)));

      // Add a sample annotation for the location
      const annotation = new window.mapkit.MarkerAnnotation(coordinate, {
        title: "Apple Fix Pros LLC",
        color: "red"
      });
      map.addAnnotation(annotation);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      
      {/* Title and Directions Box */}
      <div style={styles.titleBox}>
        <h2 style={styles.title}>San Francisco</h2>
        <button style={styles.directionButton}>
          <img src="/direction-icon.svg" alt="Directions" style={styles.icon} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  titleBox: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000, // Ensure it stays on top of the map
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  directionButton: {
    marginLeft: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  icon: {
    width: '24px',
    height: '24px',
  },
};

export default AppleMap;

