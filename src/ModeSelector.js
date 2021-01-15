import React, {useState, useEffect} from "react";
import LineSelector from "./LineSelector";

const ModeSelector = () => {

	const [modes, setModes] = useState('');
	const [selectedMode, setSelectedMode] = useState('');

	useEffect(() => {
		fetch('https://api.tfl.gov.uk/Line/Meta/Modes')
		.then(response => response.json())
		.then(data => setModes(data));
	}, [])

	const toggleModes = (e) => {
		setSelectedMode(e.target.value);
	}

	if (modes) {
		return (
			<>
			<select onChange={toggleModes}>
				<option value="">Choose a mode of transport</option>
				{modes.map(el => <option key={el.modeName} value={el.modeName}>{el.modeName}</option>)}
			</select>
			{selectedMode && <LineSelector selectedMode={selectedMode}/>}
			</>
		);
	} else {
		return (<h3>Loading...</h3>);
	}
}

export default ModeSelector;