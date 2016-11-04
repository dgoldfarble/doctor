var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;
var Directory = require("../lib/Directory");
var Doctor = require("../lib/Doctor");
var g = require("./generator");

buster.testCase(
	"DirectoryTest", {
		setUp: function () {
        this.directory = new Directory();
				this.newRandomDoctor = function() {
					return new Doctor(g.randomFirstName() + " " + g.randomLastName(),
																					g.randomLocation(),
																					g.randomSpecialty(),
																					g.randomRating());
				}
				this.doctorAtLocation = function() {
					return new Doctor(g.randomFirstName() + " " + g.randomLastName(),
															{'latitude': 42.396, 'longitude': -71.113785},
															g.randomSpecialty(),
															g.randomRating());
				}

				Number.prototype.toRad = function() {
				   return this * Math.PI / 180;
				}

				this.haversineDistance = function(location1, location2) {
					var R = 6371; // kilometres
					var φ1 = location1['latitude'].toRad();
					var φ2 = location2['latitude'].toRad();
					var Δφ = (location2['latitude']-location1['latitude']).toRad();
					var Δλ = (location2['longitude']-location1['longitude']).toRad();

					var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				        Math.cos(φ1) * Math.cos(φ2) *
				        Math.sin(Δλ/2) * Math.sin(Δλ/2);
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

					var d = R * c;
					return d;
				}
    },

		"Test getSimilarDoctors exceptions" : function() {
			// require doctor input
			var happened = false;
			try {
				this.directory.getSimilarDoctors();
			} catch (err) {
				happened = true;
			}
			assert(happened);

			happened = false;
			try {
				this.directory.getSimilarDoctors("You can't just throw a string in here!");
			} catch (err) {
				if (err instanceof TypeError) {
					happened = true;
				}
			}
			assert(happened);

			happened = true;
			try {
				this.directory.getSimilarDoctors(new Doctor("John Michael Dorian", {'latitude': 42.396, 'longitude': -71.113785}, "Orthopaedics", 8.1));
			} catch (err) {
				if (err instanceof TypeError) {
					happened = false;
				}
			}
			assert(happened);
		},

		"Test Add doctors" : function() {
			var jd = new Doctor("John Michael Dorian", {'latitude': 42.396, 'longitude': -71.113785}, "Orthopaedist", 4.9);
			for (var i = 0; i < 10; i++) {
				this.directory.addDoctor(this.newRandomDoctor());
			}
			while (this.directory.getSimilarDoctors(jd).length < 5) {
				for (var i = 0; i < 100; i++) {
					this.directory.addDoctor(this.newRandomDoctor());
				}
			}
			var similarDoctors = this.directory.getSimilarDoctors(jd);
			for (var i = 1; i < similarDoctors.length; i++) {
					assert(similarDoctors[i - 1]['rating'] > similarDoctors[i]['rating']);
					assert(similarDoctors[i - 1]['specialty'] === similarDoctors[i]['specialty']);
			}
			while (this.directory.getSimilarDoctors(jd, 100).length < 5) {
				for (var i = 0; i < 100; i++) {
					this.directory.addDoctor(this.doctorAtLocation());
				}
			}
			similarDoctors = this.directory.getSimilarDoctors(jd, 100);
			for (var i = 1; i < similarDoctors.length; i++) {
				var doc1Distance = this.haversineDistance(jd.location, similarDoctors[i - 1]['location']);
				var doc2Distance = this.haversineDistance(jd.location, similarDoctors[i]['location']);
				assert(doc1Distance >= doc2Distance);
			}
			assert(true);
		}

	}
)
