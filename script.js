// ------------------------------------FIREBASE--------------------------------
/*
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

const loadPlaces = function (coords) {
    return loadPlaceStatic();
};
*/


function loadPlaceStatic() {
    ///*
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
    ];//*/
    /*
        const dbref = ref(db);
            get(child(dbref,"Gracehill Golf Course/Hole" + Count + "P")).then((snapshot)=>{
                const PLACES;
                PLACES.push(snapshot);
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
        for(let i = 0; i > PLACES.length; i++){
            PLACES.shift();
        }
    }
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