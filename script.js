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