exports.ConvertCheckins = function (data) {
    var  checkins = [];
    for(var i = 0; i < data.checkins.items.length; i++)
    {
        var checkin = {
            name: data.checkins.items[i].venue.name,
            createdAt : data.checkins.items[i].createdAt
        };
        checkins.unshift(checkin);
    }
    return checkins;
};

exports.ConvertVenues = function (data) {
    var  venues = [];
    for(var i = 0; i < data.groups[0].items.length; i++)
    {
        var venue = {
            id :  data.groups[0].items[i].venue.id,
            name: data.groups[0].items[i].venue.name,
            location: {
              lat: data.groups[0].items[i].venue.location.lat,
              lng: data.groups[0].items[i].venue.location.lng,
              city : data.groups[0].items[i].venue.location.city,
              country : data.groups[0].items[i].venue.location.country

            },
            categories : {
                shortName :  data.groups[0].items[i].venue.categories[0].shortName
            },
            previewPhoto: data.groups[0].items[i].venue.photos.groups[0] ? {
                    prefix: data.groups[0].items[i].venue.photos.groups[0].items[0].prefix,
                    suffix: data.groups[0].items[i].venue.photos.groups[0].items[0].suffix,
                    width : data.groups[0].items[i].venue.photos.groups[0].items[0].width ,
                    height: data.groups[0].items[i].venue.photos.groups[0].items[0].height
                 }:null,
            rating : data.groups[0].items[i].venue.rating,
            ratingColor :data.groups[0].items[i].venue.ratingColor
        };

        if(!venue.previewPhoto){
            delete venue.previewPhoto
        };

        venues.unshift(venue);
    }
    return venues;
};