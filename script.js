const loadPlaces = function (coords) {
    return loadPlaceStatic();
};
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

// ------------------------------------BUTTON FUNCTIONS--------------------------------
/*
function NextHole(){
    //resetPlaces();
    Count++;
    if (Count > 18){  // Future change, Count <= Hole + if statement checking if it reads it
        alert('You are finished!');
        Count--;
    }
    else{
        //  renderPlaces(places);
    }
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
    }
    document.getElementById("field1").value = ('Hole ' + Count);
}*/


window.onload = () => {
    /*const dbref = ref(db);
    get(child(dbref,"Gracehill Golf Course/Hole" + Count + "P")).then((snapshot) =>{
        if (snapshot.exists()){
            alert("Test");
        }
    });*/

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
                    text.setAttribute('scale', '10 10 10');

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