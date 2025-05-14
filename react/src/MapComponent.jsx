import React, { useEffect, useRef, useState } from 'react';
import styles from './MapComponent.module.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const panelRef = useRef(null);
  const [map, setMap] = useState(null);
  const [currentInput, setCurrentInput] = useState('');

  // Center of map, adjust as needed
  const mapCenter = { lat: 42.3327, lng: -83.0458 };


  // This array contains the points that will be rendered on the map
  const [locations, setLocations] = useState([
    "5200 Woodward Ave, Detroit, MI 48202",
    "2645 Woodward Ave, Detroit, MI 48201",
    "2934 Russell St, Detroit, MI, 48207"
  ]);

  // In theory, the locations array can be populated by an API call here
  useEffect(() => {
    initMap();
  }, []);

  // Initialize the map
  function initMap (){

    const styledMap = createStyledMap();
    setMap(styledMap);
  };


  // adds to locations
  function addToList () {
    if (currentInput.trim().length === 0) {
      alert("Location cannot be empty");
      return;
    }
    setLocations([...locations, currentInput]);
    setCurrentInput('');
  };


  // removes from locations
  function removeFromList (index) {
    if (locations.length === 2) {
      alert("A start and end location must be present");
      return;
    }
    const updated = [...locations];
    updated.splice(index, 1);
    setLocations(updated);
  };

  // 
  function generateRoute() {
    
    for (const loc of locations) {
      if (loc.trim().length === 0) {
        alert("Location cannot be empty");
        return;
      }
    }

    panelRef.current.innerHTML = '';
  
    // Reinitialize map
    const newMap = createStyledMap();
  
    const service = new window.google.maps.DirectionsService();
    const renderer = new window.google.maps.DirectionsRenderer();
  
    renderer.setMap(newMap);
    renderer.setPanel(panelRef.current);

        /*
        The API expects a single waypoint to be an object like this:
        
        {
          location: "123 somewhere St...",
          stopover: true
        }
      */
    const waypoints = locations.slice(1, -1).map(location => ({
      location,
      stopover: true
    }));
  
    service.route({
      origin: locations[0],
      destination: locations[locations.length - 1],
      waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      avoidTolls: true,
      optimizeWaypoints: true
    }).then(result => {
      renderer.setDirections(result);
    }).catch(error => {
      console.error("Could not generate route:", error);
    });
  };

  function createStyledMap() {
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 14,
      maxZoom: 20,
      minZoom: 3,
      streetViewControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
    });
  
    const noPOIStyle = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ];
  
    newMap.setOptions({ styles: noPOIStyle });
  
    return newMap;
  }


  return (
    <div className={styles.gridcontainer}>
      <div className={styles.map} ref={mapRef}></div>

      <div className={styles.inputarea}>
        <p>
          For best results the address should have this format:{" "}
          <em>2934 Russell St, Detroit, MI, 48207</em>
        </p>

        Location to Add:{" "}
        <input
          value={currentInput}
          onChange={ (e) => setCurrentInput(e.target.value) }
          type="text"
        />
        <button onClick={ () => addToList() }>Add to Route</button>

        <p>Current Locations:</p>
        <button onClick={ () => generateRoute() }>Generate Route</button><br /><br />
        {locations.map((location, index) => (
          <div key={index} id="currentList">
            <input
              className= {styles.currentinputs}
              value={location}
              onChange= {
                (e) => {
                        const updated = [...locations];
                        updated[index] = e.target.value;
                        setLocations(updated);
                }
              }
            />
            <button onClick={ () => removeFromList(index) }>Remove</button>
          </div>
        ))}
      </div>

      <div className={styles.panel} ref={panelRef}></div>
    </div>
  );
};

export default MapComponent;