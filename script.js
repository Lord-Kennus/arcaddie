var Count = 1;
let PLACES;
let scene = document.querySelector('a-scene');
const loadPlaces = function (coords) {
    return loadPlaceStatic();
};
let places = loadPlaces();
// ------------------------------------FIREBASE--------------------------------
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

// ------------------------------------PLACES--------------------------------

function loadPlaceStatic() {
    ///*
    PLACES = [
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
    ];//*/
        /*
        const dbref = ref(db);
            get(child(dbref,"Gracehill Golf Course/Hole" + Count + "P")).then((HoleSnap)=>{
                const PLACES;
                PLACES.push(HoleSnap);
            });
        //*/
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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    //scene.remove();   //Need to reset the scene
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
// ------------------------------------DISTANCE--------------------------------

const calcDist = function(lat2, lon2){
    const R = 6371e3; 
    const φ1 = position.coords.latitude * Math.PI/180;
    const φ2 = position.coords.longitude * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
} 

// ------------------------------------BUTTON FUNCTIONS--------------------------------

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

// ------------------------------------ON PAGE LOAD--------------------------------

window.onload = () => {
    alert(get(child(dbref,"Gracehill Golf Course/Hole1P")));
    return navigator.geolocation.getCurrentPosition(function (position) {
        loadPlaces(position.coords)
            .then((places) => {
                alert(position.coords.latitude + " : " + position.coords.longitude);
                renderPlaces(places);
                /*
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
                //*/
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