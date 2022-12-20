import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Main = () => {
	const [billboardData, setBillboardData] = useState(null);
	const [songIndex, setSongIndex] = useState(0);

	useEffect(() => {
		fetch("https://node.horizen.co.il:1515/")
		.then(response => response.json())
		.then(data => {
			setBillboardData(data);
		});
	}, []);

	const nextSong = () => {
		if (billboardData[songIndex + 1]) {
			setSongIndex(songIndex + 1);
		};
	};

	const lastSong = () => {
		if (billboardData[songIndex - 1]) {
			setSongIndex(songIndex - 1);
		};
	};

	if (billboardData == null) {
		return (<div>loading</div>);
	};

	return (<div className="flex flex-col items-center justify-center">
		<div className="flex items-center bg-white p-4 rounded-sm">
			<div className="bg-neutral-900 font-bold text-white w-24 h-24 flex justify-center items-center text-4xl rounded-l-sm">
				{billboardData[songIndex].ranking}
			</div>
			<img className="w-24 h-24 rounded-r-sm" src={billboardData[songIndex].cover}></img>
			<div className="ml-4">
				<div className="font-bold text-2xl">{billboardData[songIndex].label}</div>
				<div>{billboardData[songIndex].artist}</div>
			</div>
		</div>
		<div className="flex mt-4 text-white font-bold text-xl text-center">
			<div onClick={lastSong} className="bg-red-600 hover:bg-red-700 hover:cursor-pointer px-2 rounded-l-sm w-24">Back</div>
			<div onClick={nextSong} className="bg-green-600 hover:bg-green-700 hover:cursor-pointer px-2 rounded-r-sm w-24">Next</div>
		</div>
	</div>);
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
	<div className="min-h-screen flex justify-center items-center bg-gray-200">
		<div className="flex flex-col items-center">
			<Main />
		</div>
	</div>
);