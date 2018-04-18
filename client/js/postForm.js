var MAP_ZOOM = 15;




    Template.postForm.onCreated(function () {

        var self = this;

        GoogleMaps.ready('map', function (map) {
            var marker;

            // Create and move the marker when latLng changes.
            self.autorun(function () {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng.lat, latLng.lng),
                        map: map.instance
                    });
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        });
    });


    Template.postForm.events({
        "submit .form-post": function (event) {
            var postInput = event.target.postInput.value;
            var moduleId = event.target.moduleId.value;
            console.log(moduleId)

            if (isNotEmpty(postInput)) {

                Meteor.call('addPosts', postInput, moduleId)

                // event.target.postSubject.value ="";
                event.target.postInput.value = "";

                Bert.alert("Your Post Was Successful!", "success", "growl-top-right")

            }

            return false;


        },

        'click #deleteFileButton ': function (event) {
            event.preventDefault();
            console.log("deleteFile button ", this);
            Meteor.call('removeTempUpload', this.upload_id);
            FileCollection.remove({_id: this.upload_id});


        },

        'click #deleteRealFileButton ': function (event) {
            event.preventDefault();
            console.log("deleteFile button ", this);
            var id = this._id
            console.log(id)
            Meteor.call('deletePostByUpload', id)
        },

        'change .your-upload-class': function (event, template) {
            event.preventDefault();
            console.log("uploading...")
            FS.Utility.eachFile(event, function (file) {
                console.log("each file...");
                var yourFile = new FS.File(file);
                yourFile.metadata = {
                    fileOwner: Meteor.userId()
                }
                FileCollection.insert(yourFile, function (err, result) {
                    console.log("callback for the insert, err: ", err);
                    var fileLocation = 'http://localhost:3000/cfs/files/FileCollection/' + result._id + '/' + result.original.name
                    //  var fileLocation = 'https://notelly.herokuapp.com/cfs/files/FileCollection/'+result._id+'/'+result.original.name


                    if (!err) {
                        console.log("inserted without error");
                        $("#file-input").replaceWith($("#file-input").val('').clone(true));

                        TempPostCollection.insert({
                            upload_id: result._id,
                            userId: Meteor.userId(),
                            file: fileLocation,
                            name: result.original.name
                        })


                    }
                    else {
                        console.log("there was an error", err);
                    }
                });
            });
        },


    })

    Template.postForm.helpers({


        theCurrentUser: function () {
            var uploads = TempPostCollection.find({userId: Meteor.userId()}).fetch();
            if (uploads == undefined || uploads.length < 1) {
                return false
            }
            else {
                return true
            }
        },

        theFiles: function () {
            return FileCollection.find();
        },

        theTemps: function () {
            return TempPostCollection.find({userId: Meteor.userId()}).fetch();
        },


        geolocationError: function () {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function () {
            var latLng = Geolocation.latLng();
            console.log(latLng)
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    })

