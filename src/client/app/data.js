import uuid from 'uuid';

const data = {
    regularGroups: [
        {
            id: uuid.v4(),
            name: 'Sunnuntaipelaajat',
            location: {
                name: 'Juttutupa',
                streetAddress: 'Säästöpankinranta 6',
                district: 'Hakaniemi',
                city: 'Helsinki',
                position: {lat: 60.178879, lng: 24.947472}
            },
            time: 'sunnuntai, 13:00',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewforum.php?f=60',
            homepageUrl: null
        },
        {
            id: uuid.v4(),
            name: 'Viikin pelikerho',
            location: {
                name: 'Viikin Eko-Keidas/Eko-Helmi kerhotila',
                streetAddress: 'Norkkokuja 10',
                district: 'Viikki',
                city: 'Helsinki',
                position: {lat: 60.225727, lng: 25.028099}
            },
            time: 'maanantai/tiistai, yleensä 18:00',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewforum.php?f=23',
            homepageUrl: 'http://lautapeliseura.fi/toiminta/pelikerhot/viikin-pelikerho/'
        },
        {
            id: uuid.v4(),
            name: 'K-BGC',
            location: {
                name: 'KG restaurant, Scandic Espoo',
                streetAddress: 'Nihtisillantie 1',
                district: 'Kilo',
                city: 'Espoo',
                position: {lat: 60.207001, lng: 24.755170}
            },
            time: 'tiistai, yleensä 17:00',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewforum.php?f=46'
        },
        {
            id: uuid.v4(),
            name: 'Leppävaaran kirjasto',
            location: {
                name: 'Ryhmätyötila, Leppävaaran kirjasto',
                streetAddress: 'Leppävaarankatu 9',
                district: 'Leppävaara',
                city: 'Espoo',
                position: {lat: 60.217445, lng: 24.809790}
            },
            time: 'torstai, 16:00',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewforum.php?f=13'
        }
    ]
};

export default data;
