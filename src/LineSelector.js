import React, {useState, useEffect} from "react";
import StopSelector from "./StopSelector";

const LineSelector = ({selectedMode}) => {
	const [lines, setLines] = useState('');
	const [line, setLine] = useState('');

	useEffect(() => {
		fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode}`)
		.then(response => response.json())
		.then(data => setLines(data))
	}, [selectedMode]);

	const toggleLines = (e) => {
		setLine(e.target.value);
	}

	if (lines) {
		return (
			<>
			{lines.length > 0 ? 
			<select onChange={toggleLines}>
				<option value="">Choose a line</option>
				{lines.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
			</select> : <h3>No lines available for this mode of transport</h3>
			}
			{line && <StopSelector selectedMode={selectedMode} line={line}/>}
			</>
		);
	} else {
		return (<h3>Loading...</h3>);
	}
}

export default LineSelector;