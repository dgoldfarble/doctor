var firsts = ["Winfred","Mazie","Laurena","Talia","Noreen","Fanny","Tressa","Clair","Kiara","Ilda","Magen","Raguel","Robbyn","Monty","Joanie","Gita","Nam","Vince","Lessie","Jesse","Burl","Lindsay","Lesia","Sarah","Boris","Lynn","Loris","Georgetta","Marita","Dessie","Valentina","Mitchel","Annabel","Roxann","Maribel","Josephine","Etha","Randolph","Queen","Keenan","Odessa","Sherita","Sanjuanita","Ji","Don","Katheryn","Mei","Grazyna","Lavinia","Winona","Alphonse","Rocky","September","Lowell","Cathey","Argelia","Agnes","Florance","Jefferey","Glen","Alda","Charlyn","Austin","Ema","Bryant","Rusty","Kellee","Leisha","Lisa","Asha","Zana","Keturah","Isabel","Shanae","Tyson","Ines","Marcella","Charmain","Vernice","Shanice","Chassidy","Tammie","Leslee","Jeane","Tarsha","Eunice","Federico","Katrice","Kiesha","Shantae","Abbey","Sue","Sofia","Donny","Margrett","Guadalupe","Eve","Diamond","Wilton","Wilhemina"];

var lasts = ["Contreras","Christian","Morse","Koch","Phelps","Wise","Church","Chavez","Page","Kaiser","Park","Taylor","Leach","Stanton","Poole","Dennis","Norton","Craig","Valencia","Pennington","Kaufman","Marquez","Shelton","Flores","Charles","Garrison","Wyatt","Floyd","Brown","Barron","Chen","Brennan","Short","Maldonado","Callahan","Hall","Mccoy","Pham","Bonilla","Mcclain","Vaughan","Velez","Jefferson","Nielsen","Deleon","Blake","Leonard","Valdez","Stout","Massey","Ross","Boyle","Dorsey","Stark","Browning","Booker","Walton","Glover","Hodges","Stokes","Barry","Dominguez","Wall","Kim","Sosa","Mercado","Griffith","Jackson","Barrera","Singleton","Cameron","Casey","Cisneros","Pace","Berry","Dillon","Sutton","Daniel","Hopkins","Zimmerman","Andrews","Ritter","Rogers","Myers","Salazar","Carroll","Holloway","Pierce","Chan","Murray","Goodman","Crane","Day","Mendoza","Christensen","Padilla","Castillo","Faulkner","Macdonald","Garrett"];

var specialties = ["Anesthesiologist","CardiologistCoroner","Dentist","Dermatologist","Diabetologist","Emergency physician","Endocrinologist","Euthanasia doctor","Gastroenterologist","General practitioner","Gynaecologist","Hematologist","High-altitude medicine physician","Hygienist","Immunologist","Internist","Leprologist","Military physician","Nephrologist","Neurologist","Neurosurgeon","Nuclear medicine physician","Obstetrician","Oncologist","Ophthalmologist","Orthopaedist","Osteopathic physician","Otolaryngologist","Parasitologist","Pathologist","Pediatrician","Phthisiatrist","Podiatrist","Primary care physician","Psychiatrist","Pulmonologist","Radiologist","Rheumatologist","Serologist","Surgeon","Team physician","Toxicologist","Traumatologist","Tropical physician","Urologist","Venereologist","Virologist"]

exports.randomFirstName = function() {
	return firsts[Math.floor(Math.random() * firsts.length)];
}

exports.randomLastName = function() {
	return lasts[Math.floor(Math.random() * lasts.length)];
}

exports.randomSpecialty = function() {
	return specialties[Math.floor(Math.random() * specialties.length)];
}

exports.randomLocation = function() {
	// Latitude: -85 to +85 (actually -85.05115 for some reason)
	// Longitude: -180 to +180
	return {
		'latitude': Math.random() * 170 - 85,
		'longitude': Math.random() * 360 - 180
	};
}

exports.randomRating = function() {
	return Math.random() * 5;
}
