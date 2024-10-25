import { useEffect, useRef } from 'react';
import "./AppleMap.module.css"
const AppleMap = ({latitude, longitude, name}) => {

  const mapRef = useRef(null);
  const handleGetDirections = () => {
    const directionsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    window.open(directionsUrl, '_blank'); // Open directions in a new tab
  };

  useEffect(() => {
    // Initialize Apple MapKit JS if the script has loaded
    if (window.mapkit) {
      // Initialize MapKit with your token
      window.mapkit.init({
        authorizationCallback: function (done) {
          done(process.env.NEXT_PUBLIC_APPLE_MAP_TOKEN); // Replace with your actual Apple MapKit token
        },
      });

      // Create a map
      const map = new window.mapkit.Map(mapRef.current, {
        center: new window.mapkit.Coordinate(38.7276, -121.2857), // Center on Roseville, CA
        showsCompass: window.mapkit.FeatureVisibility.Hidden, // Hide the compass
        showsZoomControl: true, // Show zoom controls
        showsMapTypeControl: true, // Show map type control (satellite, hybrid, etc.)
        zoomLevel: 10,
      });

      // Create some markers (annotations) for the map
      const locations = [
        {
          coordinate: new window.mapkit.Coordinate(38.7521, -121.2880), // Apple Fix Pros
          title: "Apple Fix Pros LLC",
          subtitle: "500 Cirby Way, Roseville, CA",
        },
        {
          coordinate: new window.mapkit.Coordinate(38.721, -121.273), // Gibson Ranch
          title: "Gibson Ranch",
          subtitle: "Elverta, CA",
        },
        {
          coordinate: new window.mapkit.Coordinate(38.680, -121.180), // Beals Point
          title: "Beals Point",
          subtitle: "Granite Bay, CA",
        },
      ];

      // Loop through locations and add markers
      locations.forEach((location) => {
        const annotation = new window.mapkit.MarkerAnnotation(location.coordinate, {
          title: location.title,
          subtitle: location.subtitle,
          color: "#FF0000", // Marker color
        });
        map.addAnnotation(annotation);
      });

      // Add directions from Apple Fix Pros to Beals Point
      const directions = new window.mapkit.Directions();
      directions.route(
        {
          origin: locations[0].coordinate, // Apple Fix Pros
          destination: locations[2].coordinate, // Beals Point
        },
        (error, data) => {
          if (error) {
            console.error("Error fetching directions:", error);
            return;
          }

          // Access the route and draw it on the map
          const route = data?.routes[0];
          const routeLine = new window.mapkit.PolylineOverlay(route?.path, {
            style: {
              lineWidth: 5, // Thickness of the route
              strokeColor: "#00FF00", // Color of the route
            },
          });

          // Add the route line to the map
          map.addOverlay(routeLine);
        }
      );

      // Clean up the map instance on unmount
      return () => {
        map.destroy();
      };
    }
  }, []);


  return (
    <div className="mapContainer">
      {/* Title box in the top left corner */}
      <div className="titleBox">
        <h2>Apple Fix Pros LLC</h2>
        <p>500 Cirby Way STE D, Roseville, CA 95678, United States</p>
      </div>
      {/* Map container */}
      <div ref={mapRef} className="map" />
    </div>
  );
};

export default AppleMap;


