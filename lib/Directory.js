var Doctor = require("./Doctor");

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

var haversineDistance = function(location1, location2) {
	var R = 6371; //
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

module.exports = function () {
	var doctors = [];
	this.addDoctor = function(doctor) {
		if (doctor instanceof Doctor) {
			doctors.push(doctor);
		} else {
			throw new TypeError("addDoctor: parameter must be instanceof Doctor");
		}
	};

	this.getSimilarDoctors = function(doctor, distance) {
		if (typeof(distance) === 'undefined') {
			var d = 1000;
		} else {
			var d = distance;
		}
		if (!(doctor instanceof Doctor)) {
			throw new TypeError("getSimilarDoctors: parameter must be instance of Doctor");
		} else {
			var similar = doctors.filter(
				function(otherDoctor) {
					return (typeof(distance) === 'undefined' ? true : haversineDistance(doctor.location, otherDoctor.location) < distance) &&
						doctor.specialty === otherDoctor.specialty &&
						doctor !== otherDoctor;
				}
			);
			var sorted = similar.sort(function(doc1, doc2) {
				if (typeof(distance) !== 'undefined') {
					return haversineDistance(doctor.location, doc2.location)
									- haversineDistance(doctor.location, doc1.location);
				} else {
					return doc2.rating - doc1.rating;
				}
			});
			return sorted;
		}
	};
}
