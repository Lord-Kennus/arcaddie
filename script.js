var Count = 1;
const loadPlaces = function (coords) {
    return loadPlaceStatic();
};

function loadPlaceStatic() {
    const PLACES = [
        {
            name: 'Hole 1',
            location: {
                lat: 55.085435,
                lng: -6.453691,  
            }
        },
        {
            name: 'Bunker',
            location: {
                lat: 55.085828,
                lng: -6.452037,
            }
        },
    ];

    return new Promise((resolve, reject) => {
        try {
            resolve(PLACES)
        } catch (err) {
            reject(err)
        }
    })
}

function resetPlaces(){
    if(PLACES.length > 0){
        for(const i = 0; i > PLACES.length; i++){
            PLACES.shift();
        }
    }
}


function NextHole(){
    //scene.parentElement.removeChild(scene);
    //resetPlaces();
    Count++;
    if (Count > 18){  // Future change, Count <= Hole + if statement checking if it reads it
        ;//  renderPlaces(places);
    }
    else{
        alert('You are finished!');
        Count--;
      
    }//*/
    document.getElementById("field1").value = ('Hole ' + Count);
}

function PreviousHole(){
    //scene.parentElement.removeChild(scene);
    //resetPlaces();
    Count--;
    if(Count < 1){
        alert('There is no previous hole!');
        Count = 1;
    }
    else{
       //renderPlaces(places);
        
    }//*/
    document.getElementById("field1").value = ('Hole ' + Count);
}

function renderPlaces(){
    loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('scale', '8 8 8');
                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });
                    scene.appendChild(text);
                });
            });
}

window.onload = () => {
    const scene = document.querySelector('a-scene');
    return navigator.geolocation.getCurrentPosition(function (position) {
        loadPlaces(position.coords)
            .then((places) => {
                alert(position.coords.latitude + " : " + position.coords.longitude);
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('scale', '8 8 8');
                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });
                    scene.appendChild(text);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};