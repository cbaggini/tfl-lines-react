import React, {useState, useEffect} from "react";

const StopSelector = ({line, selectedMode}) => {
	const [stops, setStops] = useState([]);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		fetch(`https://api.tfl.gov.uk/Line/${line.replace(' ','-')}/Route`)
		.then(response => {if (response.status === 200) {
			setIsError(false);
			return response.json();
		} else {
			setIsError(true);
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

	useEffect(() => {
		setStops([]);
		setIsError(false);
	}, [selectedMode]);

	if (stops.length > 0) {
		return (<section>
					<h3>LINE: {line.toUpperCase()}</h3>
					<div className="stops">
						<p className="box">Start of line: {stops[0]}</p>
						<p className="box">End of line: {stops[1]}</p>
					</div>
				</section>);
	} else if (isError) {
		return <h3>No stops available</h3>
	} else {
		return <section></section>
	}
}

export default StopSelector;