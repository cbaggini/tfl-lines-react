import React, {useState, useEffect} from "react";

const StopSelector = ({line}) => {
	const [stops, setStops] = useState([]);

	useEffect(() => {
		fetch(`https://api.tfl.gov.uk/Line/${line}/Route`)
		.then(response => {if (response.status === 200) {
			return response.json();
		} 	
		})
		.then(data => {
			if (data) {
				setStops([data.routeSections[0].originationName, data.routeSections[0].destinationName]);
			} else {
				setStops([]);
			}
			
		})
	}, [line]);

	if (stops.length > 0) {
		return (<section>
					<h3>LINE: {line.toUpperCase()}</h3>
					<div>
						Start of line: {stops[0]}
					</div>
					<div>
						End of line: {stops[1]}
					</div>
				</section>);
	} else {
		return <h3>No stops available</h3>
	}
}

export default StopSelector;