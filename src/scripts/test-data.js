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
        },
        {
            id: uuid.v4(),
            name: 'Kärmes',
            location: {
                name: 'Lukema',
                streetAddress: 'Yliopistonranta 3',
                district: 'Itä-Suomen yliopisto',
                city: 'Kuopio',
                position: {lat: 62.893694, lng: 27.639278}
            },
            time: 'aika vaihtelee',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewforum.php?f=17',
            facebookUrl: 'https://www.facebook.com/karmeskuopio/?fref=ts'
        }
    ],
    events: [
        {
            id: uuid.v4(),
            name: 'Kinkkucon 2017',
            location: {
                name: 'Lukema',
                streetAddress: 'Yliopistonranta 3',
                city: 'Kuopio',
                position: {lat: 62.893694, lng: 27.639278}
            },
            time: '5.1. 17:00 - 8.1. 14:00',
            forumUrl: 'http://www.lautapeliseura.fi/foorumi/viewtopic.php?f=2&t=16597',
            vimpeliUrl: 'http://anybo.dy.fi/vimpeli/show_event.php?evid=75',
            homepageUrl: null,
            facebookUrl: 'https://www.facebook.com/events/1116400425104201/',
            twitterUrl: null
        },
        {
            id: uuid.v4(),
            name: 'Tracon Hitpoint 2017',
            location: {
                name: 'Tampere-talo',
                streetAddress: 'Yliopistonkatu 55',
                city: 'Tampere',
                position: {lat: 61.495850, lng: 23.781716}
            },
            time: '4.3. 10:00 - 5.3. 18:00',
            forumUrl: null,
            vimpeliUrl: null,
            homepageUrl: 'https://2017.hitpoint.tracon.fi/fi',
            facebookUrl: 'https://www.facebook.com/events/1789359844654527/',
            twitterUrl: 'https://twitter.com/Tracon_FI'
        }

    ]
};

export default data;
