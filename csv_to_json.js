// This is a simple function that takes a CSV file, a delimiter, and optionally a specific newline character
// and converts the CSV data to JSON using Douglas Crockford's JSON library
function csv_to_json(a_csv, a_del, a_newline){ 
	
	// Default values
	var csv = a_csv;
	var del = (typeof a_del != 'string') ? ';' : a_del;
	var nl = (typeof a_newline != 'string') ? /\r\n|\r|\n/ : a_newline;
	if(typeof csv != 'string') throw "CSV data must be supplied";
	
	// Start parsing
	var result = []; // result array
	var lines = csv.split(nl); // split csv data into lines using newline var
	var headers = lines.shift(); // removes 1st element and returns it - the header
	headers = headers.split(del); // split the headers into an array by the specified delimiter
	
	// Trim leading & trailing space from headers
	for (var i = headers.length - 1; i >= 0; i--){
		headers[i] = headers[i].trimLeadTrail();
	}
	
	// Loop through the lines array
	for(var ii = lines.length - 1; ii >= 0; ii--){
		var line = lines[ii].split(del); // get current line and split it by delimiter
		var o = {}; // object for keeping the data
		 // If there is only one or less entry in the csv data, it is not a valid line so just skip it - the main purpose is to avoid blank end-rows for example
		if(line.length < 2){
			console.log("invalid line found; Line " + ii);
			continue;
		}
		
		// If we don't have the same entries and headers, there is an error
		if(line.length != headers.length) throw "Error in CSV; Line " + ii;
		
		// Add the line's data to the container object and trim the strings for unneccesary whitespace
		for (var j = line.length - 1; j >= 0; j--){
			o[headers[j]] = line[j].trimLeadTrail();
		}
		// Push the resulting object to the result array
		result.push(o);
	}
	
	// Log the resulting object
	console.log(result);
	
	// Return the JSON string
	return JSON.stringify(result);
	
}

// Trims leading and trailing whitespace
String.prototype.trimLeadTrail = function(){ 
	var r = this.replace(/^\s+/g, "");
	return r.replace(/\s+$/g, "");
}