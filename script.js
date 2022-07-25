
const loadPlaces = function (coords) {
    return loadPlaceStatic();
};

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, update, remove, get } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://golfar-ce0b6-default-rtdb.europe-west1.firebasedatabase.app/",
};

const firebaseConfig = {
 apiKey: "AIzaSyDObYM5Byctz3vuREPMLS3QA0yTjyxCals",
 authDomain: "golfar-ce0b6.firebaseapp.com",
 databaseURL: "https://golfar-ce0b6-default-rtdb.europe-west1.firebasedatabase.app",
 projectId: "golfar-ce0b6",
 storageBucket: "golfar-ce0b6.appspot.com",
 messagingSenderId: "41881550667",
 appId: "1:41881550667:web:ebfe5e13c7eaf5256c72ce"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// get the static places
function loadPlaceStatic() {
    const PLACES = [
        {
            name: 'Hole 2',
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

function NextHole(){
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


function renderPlaces(places) {
    /*
    let scene = document.querySelector('a-scene');
    for(let j = 0; j < scene.children.length(); j++){
        scene.removeChild(scene.lastChild);
    }//*/
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
        /*  Click Event for Distance
                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
                        // const distanceMsg = calcDist(place.location.lat,place.location.lng)
                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-dist');
                            alert(distanceMsg);
                            container.appendChild(label);
                            document.body.appendChild(container);
                            
                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                        }
                    };

                    text.addEventListener('click', clickListener);
                    //*/

        scene.appendChild(text);
    });
}

window.onload = () => {
    var Count = 1;
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                alert(position.coords.latitude + " : " + position.coords.longitude);
                renderPlaces(places);
                /*places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('scale', '10 10 10');

                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(text);
                });*/
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