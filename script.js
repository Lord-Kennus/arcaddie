var db = firebase.firestore();
var storageRef = firebase.storage().ref();

const loadPlaces = function (coords) {
    /*const method = 'static';
    if (method === 'api') {
        return loadPlaceFromAPIs(coords);
    }*/

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
            name: 'Hole 2',
            location: {
                lat: 55.085828,
                lng: -6.452037,
            }
        },
        {
            name: 'Hole 3',
            location: {
                lat: 55.086073,
                lng: -6.450320,
        }
        },
        {
            name: 'Hole 4',
            location: {
                lat: 55.084108,
                lng: -6.453605,
            }
        },
        {
            name: 'Hole 5',
            location: {
                lat: 55.084108,
                lng: -6.451071,
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

/*
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,    
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
        clientSecret: 'GYRKWWJMO2WK3KIRWBXIN5FQAWXTVFIK2QM4VQWNQ4TRAKWH',
        version: '20300101',    
    };
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};
*/

function nextHole(){
    scene.removeChild(text);
    Count++;
    alert('Hole:',Count);
    if (Count <= 18){  // Future change, Count <= Hole 
        alert('You are finished!');
    }
    else{
        renderPlaces(places);
    }
}

function previousHole(){
    scene.removeChild(text);
    Count--;
    alert('Hole', Count);
    if(Count < 1){
        alert('There is no previous hole!');
        Count = 1;
    }
    else{
        renderPlaces(places);
    }
}

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

    const d = R * c; // in metres
    return d;
}


window.onload = () => {
    const Count = 0;
    const scene = document.querySelector('a-scene');
    return navigator.geolocation.getCurrentPosition(function (position) {
        loadPlaces(position.coords)
            .then((places) => {
                alert(position.coords.latitude + " : " + position.coords.longitude);
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('scale', '2 2 2');

                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    /*  Click Event for Distance
                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const dist = calcDist;

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-dist');
                            label.innerText = dist;
                            container.appendChild(label);
                            document.body.appendChild(container);
                            
                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                        }
                    };

                    icon.addEventListener('click', clickListener);
                    //*/

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