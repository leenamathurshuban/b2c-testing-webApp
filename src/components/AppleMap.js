// import { useEffect, useRef } from 'react';
// const AppleMap = () => {
//   // useEffect(() => {
//   //   console.log('Current Origin:', window.location.origin);

//   //   const mapScript = document.createElement('script');
//   //   mapScript.src = `https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js`;
//   //   mapScript.async = true;
//   //   mapScript.onload = () => {
//   //     if (window.mapkit) {
//   //       window.mapkit.init({
//   //         authorizationCallback: function (done) {
//   //           done(NEXT_PUBLIC_APPLE_MAP_TOKEN);
//   //         },
//   //       });

//   //       const map = new window.mapkit.Map('map-container');
//   //       const coordinate = new window.mapkit.Coordinate(37.7749, -122.4194); // Example: San Francisco coordinates
//   //       map.center = coordinate;
//   //       map.showItems = ['standard', 'satellite', 'hybrid'];
//   //     }
//   //   };
//   //   document.head.appendChild(mapScript);
//   // }, []);

//   // return <div id="map-container" style={{ width: '100%', height: '500px' }} />;
//   // const mapRef = useRef(null);

//   // useEffect(() => {
//   //   if (typeof window !== 'undefined') {
//   //     mapkit.init({
//   //       authorizationCallback: function (done) {
//   //         // Use your Apple MapKit token here
//   //         done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN);
//   //       },
//   //     });

//   //     // Coordinates for 'Apple Fix Pros LLC, 500 Cirby Way, Suite D, Roseville, CA 95678'
//   //     const coordinate = new mapkit.Coordinate(38.7276, -121.2857);

//   //     // Initialize the map
//   //     const map = new mapkit.Map(mapRef.current);

//   //     // Add a marker at the location
//   //     const annotation = new mapkit.MarkerAnnotation(coordinate, {
//   //       title: 'Apple Fix Pros LLC',
//   //       subtitle: '500 Cirby Way, Suite D, Roseville, CA 95678',
//   //       color: '#FF0000', // Custom color for the marker
//   //     });

//   //     map.showItems([annotation]);

//   //     // Set the map's center to the coordinate
//   //     map.center = coordinate;

//   //     // Optionally, set the region to control zoom level
//   //     map.region = new mapkit.CoordinateRegion(coordinate, new mapkit.CoordinateSpan(0.01, 0.01));
//   //   }
//   // }, []);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Initialize Apple MapKit JS if the script has loaded
//     if (window.mapkit) {
//       // Initialize MapKit with your token
//       window.mapkit.init({
//         authorizationCallback: function (done) {
//           done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN); // Replace with your actual Apple MapKit token
//         },
//       });

//       // Create a map
//       const map = new window.mapkit.Map(mapRef.current, {
//         center: new window.mapkit.Coordinate(38.7521, -121.2880), // Center on Roseville, CA
//         showsCompass: window.mapkit.FeatureVisibility.Hidden, // Hide the compass
//         showsZoomControl: true, // Show zoom controls
//         showsMapTypeControl: true, // Show map type control (satellite, hybrid, etc.)
//         zoomLevel: 10,
//       });

//       // Create some markers (annotations) for the map
//       const locations = [
//         {
//           coordinate: new window.mapkit.Coordinate(38.7521, -121.2880), // Apple Fix Pros
//           title: "Apple Fix Pros LLC",
//           subtitle: "500 Cirby Way, Roseville, CA",
//         },
//         {
//           coordinate: new window.mapkit.Coordinate(38.721, -121.273), // Gibson Ranch
//           title: "Gibson Ranch",
//           subtitle: "Elverta, CA",
//         },
//         {
//           coordinate: new window.mapkit.Coordinate(38.680, -121.180), // Beals Point
//           title: "Beals Point",
//           subtitle: "Granite Bay, CA",
//         },
//       ];

//       // Loop through locations and add markers
//       locations.forEach((location) => {
//         const annotation = new window.mapkit.MarkerAnnotation(location.coordinate, {
//           title: location.title,
//           subtitle: location.subtitle,
//           color: "#FF0000", // Marker color
//         });
//         map.addAnnotation(annotation);
//       });

//       // Add directions from Apple Fix Pros to Beals Point
//       const directions = new window.mapkit.Directions();
//       directions.route(
//         {
//           origin: locations[0].coordinate, // Apple Fix Pros
//           destination: locations[2].coordinate, // Beals Point
//         },
//         (error, data) => {
//           if (error) {
//             console.error("Error fetching directions:", error);
//             return;
//           }

//           // Access the route and draw it on the map
//           const route = data.routes[0];
//           const routeLine = new window.mapkit.PolylineOverlay(route.path, {
//             style: {
//               lineWidth: 5, // Thickness of the route
//               strokeColor: "#00FF00", // Color of the route
//             },
//           });

//           // Add the route line to the map
//           map.addOverlay(routeLine);
//         }
//       );

//       // Clean up the map instance on unmount
//       return () => {
//         map.destroy();
//       };
//     }
//   }, []);


//   return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
// };

// export default AppleMap;


import { useEffect, useRef } from 'react';
import './AppleMap.module.css'; // Import styles

const AppleMap = () => {
  const mapRef = useRef(null);
  const destination = new window.mapkit.Coordinate(38.7521, -121.2880); // Apple Fix Pros location

  useEffect(() => {
    if (typeof window !== 'undefined' && window.mapkit) {
      // Initialize the Apple Map
      window.mapkit.init({
        authorizationCallback: function (done) {
          // Use your Apple MapKit token here
          done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN);
        }
      });

      const map = new window.mapkit.Map(mapRef.current, {
        center: destination,
        zoom: 12
      });

      // Add destination annotation (Apple Fix Pros LLC)
      const destinationAnnotation = new window.mapkit.MarkerAnnotation(destination, {
        title: "Apple Fix Pros LLC",
        subtitle: "500 Cirby Way, Roseville, CA"
      });
      map.addAnnotation(destinationAnnotation);

      // Check if browser supports geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = new window.mapkit.Coordinate(
            position.coords.latitude,
            position.coords.longitude
          );

          // Add user location annotation
          const userAnnotation = new window.mapkit.MarkerAnnotation(userLocation, {
            title: "Apple Fix Pros LLC"
          });
          map.addAnnotation(userAnnotation);

          // Calculate directions
          const directions = new window.mapkit.Directions();

          directions.route({
            origin: userLocation,
            destination: destination,
            transportType: window.mapkit.Directions.Transport.Automobile // Options: Walking, Automobile, Transit
          }, (error, data) => {
            if (error) {
              console.error('Error calculating directions:', error);
              return;
            }

            // Display the route on the map
            const route = data.routes[0];
            const polyline = new window.mapkit.PolylineOverlay(route.path);
            map.addOverlay(polyline);

            // Zoom to show the full route
            map.region = new window.mapkit.CoordinateRegion(route.path[0], route.path[route.path.length - 1]);
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  return (
    <div className="mapContainer">
      {/* Title box in the top left corner */}
      <div className="styles.titleBox">
        <h2>Apple Fix Pros LLC</h2>
        <p>500 Cirby Way, Roseville, CA</p>
      </div>
      {/* Map container */}
      <div ref={mapRef} className="map" />
    </div>
  );
};

export default AppleMap;
