window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Next Hole';
    const Count = 0;
    const icon = document.createElement('a-image');
    let scene = document.querySelector('a-scene');
    let places = staticLoadPlaces();
    renderPlaces(place);
};

/*AFRAME.registerComponent('clicker', {
    init: function() {
        this.el.addEventListener('click', e => {
            alert('Distance Is');
        });
    }
});*/

function staticLoadPlaces() {
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

function NextHole(){
    scene.removeChild(icon);
    Count++;
    if (Count < 0 || Count <= 17){
        Count = 0;
    }
    else{
        renderPlaces(places);
    }
}

/*function renderPlace(place){
    const latitude = place.location.lat;
    const longitude = place.location.lng;
    
    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
    icon.setAttribute('name', place.name);
    icon.setAttribute('src', './assets/map-marker.png');
    icon.setAttribute('scale', '20, 20');

    scene.appendChild(icon);
}*/

function renderPlaces(places) {
        const place = places[Count];
        const latitude = place.location.lat;
        const longitude = place.location.lng;


        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('name', place.name);
        icon.setAttribute('src', './assets/map-marker.png');

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        icon.setAttribute('scale', '20, 20');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const label = document.createElement('span');
                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');
                label.innerText = name;
                container.appendChild(label);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 1500);
            }
        };

        icon.addEventListener('click', clickListener);

        scene.appendChild(icon);
    
}