import AppleMap from "@/components/AppleMap";

export default function map_page() {
  const latitude = 38.7276; // Replace with your latitude
  const longitude = -121.2857; // Replace with your longitude
  const name = 'Apple Fix Pros LLC'; // Replace with your location name
  return (
    <>    
      <AppleMap latitude={latitude} longitude={longitude} name={name} />
    </>
  );
}
