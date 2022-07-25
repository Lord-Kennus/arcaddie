var Count = 0;

const POI = function (coords) {
    return LoadPOI();
};

function LoadPOI() {
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
    //scene.parentElement.removeChild(scene);
    //resetPlaces();
    Count++;
    /*if (Count <= 18){  // Future change, Count <= Hole + if statement checking if it reads it
        alert('You are finished!');
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
    /*if(Count < 1){
        alert('There is no previous hole!');
        Count = 1;
    }
    else{
        //renderPlaces(places);
    }//*/
    document.getElementById("field1").value = ('Hole ' + Count);
}

window.onload = () => {
    const scene = document.querySelector('a-scene');
    document.getElementById('Hole').innerHTML = ('Hole' + Count);
    return navigator.geolocation.getCurrentPosition(function (position) {
        POI(position.coords)
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
                    
                    /*document.querySelector('button2[data-action="next"]').addEventListener('click', function () {
                        //var entity = document.querySelector('[gps-entity-place]');
                        Count++;
                        //NextHole();
                        document.getElementById("field1").value = ('Hole ' + Count);
                        
                    });
                    document.querySelector('button[data-action="back"]').addEventListener('click', function () {
                        //var entity = document.querySelector('[gps-entity-place]');
                        Count--;
                        //PreviousHole();
                        document.getElementById("field1").value = ('Hole ' + Count);
                    });*/
            

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