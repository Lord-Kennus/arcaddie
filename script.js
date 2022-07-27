const loadPlaces = function (coords) {
    return loadPlaceStatic();
};

function loadPlaceStatic() {
    const PLACES = [
        {
            name: 'Hole',
            location: {
                lat: 55.085087,
                lng: -6.453370,  
            }
        },
        {
            name: 'Tee',
            location: {
                lat: 55.084894,
                lng: -6.453338,
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

function removeMarkers(){
    let scene = document.querySelector('a-scene');
    for(let j = 0; j < scene.children.length(); j++){
        scene.removeChild(scene.lastChild);
    }
}

function renderPlaces(places) {
    places.forEach((place) => {
        let name = place.name();
        let latitude = place.location.lat;  // place.lat;
        let longitude = place.location.lng; //place.lng;

        let text = document.createElement('a-link');
        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        text.setAttribute('title', place.name);
        text.setAttribute('scale', '10 10 10');

        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', { detail: { component: this.el }}))
        });
        scene.appendChild(text);
    });
}

// ------------------------------------BUTTON FUNCTIONS--------------------------------

var Count = 1;
function NextHole(){
    //removeMarkers();
    //resetPlaces();
    Count++;
    if (Count > 18){  // Future change, Count <= Hole + if statement checking if it reads it
        alert('You are finished!');
        Count--;
    }
    else{
        //  renderPlaces(places);
    }//*/
    document.getElementById("field1").value = ('Hole ' + Count);
}

function PreviousHole(){
    //removeMarkers();
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

// ------------------------------------ON PAGE LOAD--------------------------------

window.onload = () => {
    const scene = document.querySelector('a-scene');
    return navigator.geolocation.getCurrentPosition(function (position) {
        loadPlaces(position.coords)
            .then((places) => {
                alert(position.coords.latitude + " : " + position.coords.longitude);
                renderPlaces(places);
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