if(typeof(document.getElementById("maps")) != 'undefined' && document.getElementById("maps") != null) {
    buildMaps('.maps');
}

function buildMaps(selector) {
    const maps = document.querySelector(selector);
    const mapProperties = getMapProperties(maps);
    const myLatLng = new google.maps.LatLng(mapProperties.centerLat, mapProperties.centerLon);

    const styles = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ];

    var myOptions = {
        center: myLatLng,
        zoom: mapProperties.zoom,
        mapTypeControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        fullscreenControl: false,
        panControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        styles: styles
    };

    var map = new google.maps.Map(maps, myOptions);

    if(mapProperties.markers.length > 0) {
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < mapProperties.markers.length; i++) {
            var markerProperties = mapProperties.markers[i];
            var markerLatLng = new google.maps.LatLng(markerProperties.markerLat, markerProperties.markerLon);

            var icon = {
                url: markerProperties.image,
                size: new google.maps.Size(42,54),
                scaledSize: new google.maps.Size(42,54),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(21,54), //Position of the marker
            };

            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon: icon
            });

            var infowindow = new google.maps.InfoWindow({
                content: markerProperties.infoWindow
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(mapProperties.markers[i].infoWindow);
                    infowindow.open(map, marker);
                }
            })(marker, i));

            if (markerProperties.showInfoWindow) {
                //infowindow.open(map,marker);
            }

            /**
             * Add marker for centering on all markers
             */
            bounds.extend(new google.maps.LatLng(markerProperties.markerLat, markerProperties.markerLon));
        }

        /**
         * Set center on all markers
         */
        // Don't zoom in too far on only one marker
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.02, bounds.getNorthEast().lng() + 0.02);
            var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.02, bounds.getNorthEast().lng() - 0.02);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
        }
        map.fitBounds(bounds);
    }
}

function getMapProperties(map) {
    const markers = [];

    const markersList = map.querySelectorAll('.marker');

    markersList.forEach(m => {
        markers.push({
            markerLat : parseFloat(m.querySelector('.location').innerHTML.split(',')[0]),
            markerLon : parseFloat(m.querySelector('.location').innerHTML.split(',')[1]),
            infoWindow : m.querySelector('.infowindow'),
            image : m.querySelector('.image').innerHTML,
        });
    })

    properties = {
        zoom: parseInt(map.querySelector('.zoomlevel').innerHTML,10),
        centerLat: parseFloat(map.querySelector('.mapcenter').innerHTML.split(',')[0]),
        centerLon: parseFloat(map.querySelector('.mapcenter').innerHTML.split(',')[1]),
        markers: markers
    };

    return properties;
}