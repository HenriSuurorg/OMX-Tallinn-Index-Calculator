import React, { useEffect, useState } from "react";
import "../Style.css";

import { OmxStockData } from "../APIs/Omx";
import { lhvStockData1, lhvStockData2 } from "../APIs/Lhv";
import { talStockData1, talStockData2 } from "../APIs/Tal";
import { tkmStockData1, tkmStockData2 } from "../APIs/Tkm";
import { tsmStockData1, tsmStockData2 } from "../APIs/Tsm";
import { mrkStockData1, mrkStockData2 } from "../APIs/Mrk";
import { tveStockData1, tveStockData2 } from "../APIs/Tve";
import { sfgStockData1, sfgStockData2 } from "../APIs/Sfg";
import { arcStockData1, arcStockData2 } from "../APIs/Arc";
import { bltStockData1, bltStockData2 } from "../APIs/Blt";
import { cpaStockData1, cpaStockData2 } from "../APIs/Cpa";
import { eegStockData1, eegStockData2 } from "../APIs/Eeg";
import { haeStockData1, haeStockData2 } from "../APIs/Hae";
import { sknStockData1, sknStockData2 } from "../APIs/Skn";
import { pkgStockData1, pkgStockData2 } from "../APIs/Pkg";
import { prfStockData1, prfStockData2 } from "../APIs/Prf";
import { tpdStockData1, tpdStockData2 } from "../APIs/Tpd";
import { ncnStockData1, ncnStockData2 } from "../APIs/Ncn";

import { Instrument } from "./Instruments";
import { EquationUsed } from "./EquationUsed";
import { Sources } from "./Sources";

let isScraping = true;
let isLooping = true;
let isDivising = true;
let isCalculating = true;
let currentState = "Scraping...";
let omxIndex;
let omxIndexDivisor;
let omxIndexSummation;
let valChange;
let differnce;
let calAccuracy;
let secInterval;

export const CalculationContainer = () => {
	/* 
    Each stock has 5 State components
    Nr = quantity; Ynr = quantity yesterday; Op = opening price; P = price; Div = dividend
  */

	const [lhvStockNr, setlhvStockNr] = useState();
	const [lhvStockYnr, setLhvStockYnr] = useState();
	const [lhvStockOp, setlhvStockOp] = useState();
	const [lhvStockP, setlhvStockP] = useState();
	const [lhvStockDiv, setLhvStockDiv] = useState();

	const [talStockNr, setTalStockNr] = useState();
	const [talStockYnr, setTalStockYnr] = useState();
	const [talStockOp, setTalStockOp] = useState();
	const [talStockP, setTalStockP] = useState();
	const [talStockDiv, setTalStockDiv] = useState();

	const [tkmStockNr, setTkmStockNr] = useState();
	const [tkmStockYnr, setTkmStockYnr] = useState();
	const [tkmStockOp, setTkmStockOp] = useState();
	const [tkmStockP, setTkmStockP] = useState();
	const [tkmStockDiv, setTkmStockDiv] = useState();

	const [tsmStockNr, setTsmStockNr] = useState();
	const [tsmStockYnr, setTsmStockYnr] = useState();
	const [tsmStockOp, setTsmStockOp] = useState();
	const [tsmStockP, setTsmStockP] = useState();
	const [tsmStockDiv, setTsmStockDiv] = useState();

	const [mrkStockNr, setMrkStockNr] = useState();
	const [mrkStockYnr, setMrkStockYnr] = useState();
	const [mrkStockOp, setMrkStockOp] = useState();
	const [mrkStockP, setMrkStockP] = useState();
	const [mrkStockDiv, setMrkStockDiv] = useState();

	const [tveStockNr, setTveStockNr] = useState();
	const [tveStockYnr, setTveStockYnr] = useState();
	const [tveStockOp, setTveStockOp] = useState();
	const [tveStockP, setTveStockP] = useState();
	const [tveStockDiv, setTveStockDiv] = useState();

	const [sfgStockNr, setSfgStockNr] = useState();
	const [sfgStockYnr, setSfgStockYnr] = useState();
	const [sfgStockOp, setSfgStockOp] = useState();
	const [sfgStockP, setSfgStockP] = useState();
	const [sfgStockDiv, setSfgStockDiv] = useState();

	const [arcStockNr, setArcStockNr] = useState();
	const [arcStockYnr, setArcStockYnr] = useState();
	const [arcStockOp, setArcStockOp] = useState();
	const [arcStockP, setArcStockP] = useState();
	const [arcStockDiv, setArcStockDiv] = useState();

	const [bltStockNr, setBltStockNr] = useState();
	const [bltStockYnr, setBltStockYnr] = useState();
	const [bltStockOp, setBltStockOp] = useState();
	const [bltStockP, setBltStockP] = useState();
	const [bltStockDiv, setBltStockDiv] = useState();

	const [cpaStockNr, setCpaStockNr] = useState();
	const [cpaStockYnr, setCpaStockYnr] = useState();
	const [cpaStockOp, setCpaStockOp] = useState();
	const [cpaStockP, setCpaStockP] = useState();
	const [cpaStockDiv, setCpaStockDiv] = useState();

	const [eegStockNr, setEegStockNr] = useState();
	const [eegStockYnr, setEegStockYnr] = useState();
	const [eegStockOp, setEegStockOp] = useState();
	const [eegStockP, setEegStockP] = useState();
	const [eegStockDiv, setEegStockDiv] = useState();

	const [tpdStockNr, setTpdStockNr] = useState();
	const [tpdStockYnr, setTpdStockYnr] = useState();
	const [tpdStockOp, setTpdStockOp] = useState();
	const [tpdStockP, setTpdStockP] = useState();
	const [tpdStockDiv, setTpdStockDiv] = useState();

	const [haeStockNr, setHaeStockNr] = useState();
	const [haeStockYnr, setHaeStockYnr] = useState();
	const [haeStockOp, setHaeStockOp] = useState();
	const [haeStockP, setHaeStockP] = useState();
	const [haeStockDiv, setHaeStockDiv] = useState();

	const [sknStockNr, setSknStockNr] = useState();
	const [sknStockYnr, setSknStockYnr] = useState();
	const [sknStockOp, setSknStockOp] = useState();
	const [sknStockP, setSknStockP] = useState();
	const [sknStockDiv, setSknStockDiv] = useState();

	const [pkgStockNr, setPkgStockNr] = useState();
	const [pkgStockYnr, setPkgStockYnr] = useState();
	const [pkgStockOp, setPkgStockOp] = useState();
	const [pkgStockP, setPkgStockP] = useState();
	const [pkgStockDiv, setPkgStockDiv] = useState();

	const [prfStockNr, setPrfStockNr] = useState();
	const [prfStockYnr, setPrfStockYnr] = useState();
	const [prfStockOp, setPrfStockOp] = useState();
	const [prfStockP, setPrfStockP] = useState();
	const [prfStockDiv, setPrfStockDiv] = useState();

	const [ncnStockNr, setNcnStockNr] = useState();
	const [ncnStockYnr, setNcnStockYnr] = useState();
	const [ncnStockOp, setNcnStockOp] = useState();
	const [ncnStockP, setNcnStockP] = useState();
	const [ncnStockDiv, setNcnStockDiv] = useState();

	const [omxStockP, setOmxStockP] = useState();
	const [omxStockOp, setOmxStockOp] = useState();
	const [omxStockPrevClose, setOmxStockPrevClose] = useState();
	const [omxTime, setOmxTime] = useState();

	const [count, setCount] = useState(10);
	const [seconds, setSeconds] = useState(0);

	/* 
    Fetches data with axios and sets the gathered data as state 
  */

	useEffect(() => {
		arcStockData1().then(data => {
			setArcStockNr(data[0]);
			setArcStockYnr(data[1]);
		});
		arcStockData2().then(data => {
			setArcStockOp(data[0]);
			setArcStockP(data[1]);
			setArcStockDiv(data[2]);
		});

		bltStockData1().then(data => {
			setBltStockNr(data[0]);
			setBltStockYnr(data[1]);
		});
		bltStockData2().then(data => {
			setBltStockOp(data[0]);
			setBltStockP(data[1]);
			setBltStockDiv(data[2]);
		});

		cpaStockData1().then(data => {
			setCpaStockNr(data[0]);
			setCpaStockYnr(data[1]);
		});
		cpaStockData2().then(data => {
			setCpaStockOp(data[0]);
			setCpaStockP(data[1]);
			setCpaStockDiv(data[2]);
		});

		eegStockData1().then(data => {
			setEegStockNr(data[0]);
			setEegStockYnr(data[1]);
		});
		eegStockData2().then(data => {
			setEegStockOp(data[0]);
			setEegStockP(data[1]);
			setEegStockDiv(data[2]);
		});

		tpdStockData1().then(data => {
			setTpdStockNr(data[0]);
			setTpdStockYnr(data[1]);
		});
		tpdStockData2().then(data => {
			setTpdStockOp(data[0]);
			setTpdStockP(data[1]);
			setTpdStockDiv(data[2]);
		});

		haeStockData1().then(data => {
			setHaeStockNr(data[0]);
			setHaeStockYnr(data[1]);
		});
		haeStockData2().then(data => {
			setHaeStockOp(data[0]);
			setHaeStockP(data[1]);
			setHaeStockDiv(data[2]);
		});

		sknStockData1().then(data => {
			setSknStockNr(data[0]);
			setSknStockYnr(data[1]);
		});
		sknStockData2().then(data => {
			setSknStockOp(data[0]);
			setSknStockP(data[1]);
			setSknStockDiv(data[2]);
		});

		pkgStockData1().then(data => {
			setPkgStockNr(data[0]);
			setPkgStockYnr(data[1]);
		});
		pkgStockData2().then(data => {
			setPkgStockOp(data[0]);
			setPkgStockP(data[1]);
			setPkgStockDiv(data[2]);
		});

		prfStockData1().then(data => {
			setPrfStockNr(data[0]);
			setPrfStockYnr(data[1]);
		});
		prfStockData2().then(data => {
			setPrfStockOp(data[0]);
			setPrfStockP(data[1]);
			setPrfStockDiv(data[2]);
		});

		sfgStockData1().then(data => {
			setSfgStockNr(data[0]);
			setSfgStockYnr(data[1]);
		});
		sfgStockData2().then(data => {
			setSfgStockOp(data[0]);
			setSfgStockP(data[1]);
			setSfgStockDiv(data[2]);
		});

		tveStockData1().then(data => {
			setTveStockNr(data[0]);
			setTveStockYnr(data[1]);
		});
		tveStockData2().then(data => {
			setTveStockOp(data[0]);
			setTveStockP(data[1]);
			setTveStockDiv(data[2]);
		});

		mrkStockData1().then(data => {
			setMrkStockNr(data[0]);
			setMrkStockYnr(data[1]);
		});
		mrkStockData2().then(data => {
			setMrkStockOp(data[0]);
			setMrkStockP(data[1]);
			setMrkStockDiv(data[2]);
		});

		lhvStockData1().then(data => {
			setlhvStockNr(data[0]);
			setLhvStockYnr(data[1]);
		});
		lhvStockData2().then(data => {
			setlhvStockOp(data[0]);
			setlhvStockP(data[1]);
			setLhvStockDiv(data[2]);
		});

		talStockData1().then(data => {
			setTalStockNr(data[0]);
			setTalStockYnr(data[1]);
		});
		talStockData2().then(data => {
			setTalStockOp(data[0]);
			setTalStockP(data[1]);
			setTalStockDiv(data[2]);
		});

		tkmStockData1().then(data => {
			setTkmStockNr(data[0]);
			setTkmStockYnr(data[1]);
		});
		tkmStockData2().then(data => {
			setTkmStockOp(data[0]);
			setTkmStockP(data[1]);
			setTkmStockDiv(data[2]);
		});

		tsmStockData1().then(data => {
			setTsmStockNr(data[0]);
			setTsmStockYnr(data[1]);
		});
		tsmStockData2().then(data => {
			setTsmStockOp(data[0]);
			setTsmStockP(data[1]);
			setTsmStockDiv(data[2]);
		});

		ncnStockData1().then(data => {
			setNcnStockNr(data[0]);
			setNcnStockYnr(data[1]);
		});
		ncnStockData2().then(data => {
			setNcnStockOp(data[0]);
			setNcnStockP(data[1]);
			setNcnStockDiv(data[2]);
		});

		OmxStockData().then(data => {
			setOmxStockOp(data[0]);
			setOmxStockP(data[1]);
			setOmxStockPrevClose(data[2]);
			setOmxTime(data[3]);
		});
	}, []);

	/* 
  Creates a seperate object for each stock
*/

	const lhv = {
		volume: lhvStockNr,
		volumeYesterday: lhvStockYnr,
		openingPrice: lhvStockOp,
		price: lhvStockP,
		dividend: lhvStockDiv
	};

	const tal = {
		volume: talStockNr,
		volumeYesterday: talStockYnr,
		openingPrice: talStockOp,
		price: talStockP,
		dividend: talStockDiv
	};

	const tkm = {
		volume: tkmStockNr,
		volumeYesterday: tkmStockYnr,
		openingPrice: tkmStockOp,
		price: tkmStockP,
		dividend: tkmStockDiv
	};

	const tsm = {
		volume: tsmStockNr,
		volumeYesterday: tsmStockYnr,
		openingPrice: tsmStockOp,
		price: tsmStockP,
		dividend: tsmStockDiv
	};

	const mrk = {
		volume: mrkStockNr,
		volumeYesterday: mrkStockYnr,
		openingPrice: mrkStockOp,
		price: mrkStockP,
		dividend: mrkStockDiv
	};

	const tve = {
		volume: tveStockNr,
		volumeYesterday: tveStockYnr,
		openingPrice: tveStockOp,
		price: tveStockP,
		dividend: tveStockDiv
	};

	const sfg = {
		volume: sfgStockNr,
		volumeYesterday: sfgStockYnr,
		openingPrice: sfgStockOp,
		price: sfgStockP,
		dividend: sfgStockDiv
	};

	const arc = {
		volume: arcStockNr,
		volumeYesterday: arcStockYnr,
		openingPrice: arcStockOp,
		price: arcStockP,
		dividend: arcStockDiv
	};

	const blt = {
		volume: bltStockNr,
		volumeYesterday: bltStockYnr,
		openingPrice: bltStockOp,
		price: bltStockP,
		dividend: bltStockDiv
	};

	const cpa = {
		volume: cpaStockNr,
		volumeYesterday: cpaStockYnr,
		openingPrice: cpaStockOp,
		price: cpaStockP,
		dividend: cpaStockDiv
	};

	const eeg = {
		volume: eegStockNr,
		volumeYesterday: eegStockYnr,
		openingPrice: eegStockOp,
		price: eegStockP,
		dividend: eegStockDiv
	};

	const tpd = {
		volume: tpdStockNr,
		volumeYesterday: tpdStockYnr,
		openingPrice: tpdStockOp,
		price: tpdStockP,
		dividend: tpdStockDiv
	};

	const hae = {
		volume: haeStockNr,
		volumeYesterday: haeStockYnr,
		openingPrice: haeStockOp,
		price: haeStockP,
		dividend: haeStockDiv
	};

	const prf = {
		volume: prfStockNr,
		volumeYesterday: prfStockYnr,
		openingPrice: prfStockOp,
		price: prfStockP,
		dividend: prfStockDiv
	};

	const skn = {
		volume: sknStockNr,
		volumeYesterday: sknStockYnr,
		openingPrice: sknStockOp,
		price: sknStockP,
		dividend: sknStockDiv
	};

	const pkg = {
		volume: pkgStockNr,
		volumeYesterday: pkgStockYnr,
		openingPrice: pkgStockOp,
		price: pkgStockP,
		dividend: pkgStockDiv
	};

	const ncn = {
		volume: ncnStockNr,
		volumeYesterday: ncnStockYnr,
		openingPrice: ncnStockOp,
		price: ncnStockP,
		dividend: ncnStockDiv
	};

	const omx = {
		openingPrice: omxStockOp,
		price: omxStockP,
		previousClose: omxStockPrevClose,
		time: omxTime
	};

	/* 
    Cretes an array composed of stock objects
  */

	const stocks = [
		arc,
		blt,
		cpa,
		eeg,
		tpd,
		hae,
		lhv,
		ncn,
		mrk,
		skn,
		pkg,
		prf,
		sfg,
		tal,
		tkm,
		tsm,
		tve
	];

	/* 
    Confirmes that all the webrequests are finished by checking that none of the values are undefined, if they are, checks again. 
    If the webrequests are finished sets isScraping to false  
  */

	useEffect(() => {
		if (!isScraping || count <= -10) return;
		if (stocks.some(stock => stock.dividend === undefined || stock.volume === undefined)) {
			isScraping = true;
		} else {
			isScraping = false;
			currentState = "Looping...";
		}
		console.log("Is scraping: ", isScraping);
		const id2 = setInterval(() => {
			setCount(count - 1);
		}, 1000);
		return () => clearInterval(id2);
	}, [count]);

	/*
   Loops through each stock and converts it's values from improperly formalized strings into numbers.
   Also changes the values of divindeds that are N/A into 0s, so the Index can be calculated properly 
  */

	function noNa() {
		for (var i = 0; i < stocks.length; i++) {
			stocks[i].volume = parseFloat(stocks[i].volume.replace(/ /g, ""));
			stocks[i].volumeYesterday = parseFloat(stocks[i].volumeYesterday.replace(/ /g, ""));
			stocks[i].openingPrice = parseFloat(stocks[i].openingPrice);
			stocks[i].price = parseFloat(stocks[i].price);
			if (stocks[i].dividend === "N/A") {
				stocks[i].dividend = 0;
			} else {
				stocks[i].dividend = parseFloat(stocks[i].dividend);
			}
		}
		isLooping = false;
		console.log("Stocks:", stocks);
		currentState = "Calculating...";
		return;
	}

	if (!isScraping) {
		noNa();
	}

	/* 
    function that captures the calculation's completion time
  */

	useEffect(() => {
		secInterval = setInterval(() => {
			setSeconds(seconds + 1);
		}, 100);
		return () => {
			clearInterval(secInterval);
		};
	}, [seconds]);

	/* 
    Function that calculates how much the Index's price has fluctuated
    Will be executed after other calculations are finished
  */

	function valueChange() {
		differnce =
			parseFloat(omx.previousClose.replace(",", "")) - parseFloat(omx.price.replace(",", ""));
		const difInPercent = (differnce / parseFloat(omx.previousClose.replace(",", ""))) * 100;
		valChange =
			differnce >= 0
				? `-${Math.abs(differnce.toFixed(2))} (-${Math.abs(difInPercent.toFixed(2))}%)`
				: `+${Math.abs(differnce.toFixed(2))} (+${Math.abs(difInPercent.toFixed(2))}%)`;
	}

	/* 
    Index calcultion `+${Math.abs(differnce.toFixed(2))}(+${Math.abs(difInPercent.toFixed(2))}%)`
  */

	if (!isScraping && !isLooping) {
		omxIndexSummation = stocks.reduce(function(accumulator, currentStock) {
			return accumulator + currentStock.volume * currentStock.price;
		}, 0);

		omxIndexDivisor = stocks.reduce(function(accumulator, currentStock) {
			return (
				accumulator + currentStock.volume * (currentStock.openingPrice - currentStock.dividend)
			);
		}, 0);
		isDivising = false;
	}

	if (!isScraping && !isDivising && !isLooping && omxStockPrevClose !== undefined) {
		omxIndex =
			((omxIndexSummation / omxIndexDivisor) * parseFloat(omx.previousClose.replace(",", ""))) /
			1.1;
		valueChange();

		isCalculating = false;
		currentState = omxIndex.toFixed(2);

		// Checks how accurately the index has been calculated (Compared to the official value)
		calAccuracy = (
			100 -
			(Math.abs(omxIndex - parseFloat(omx.price.replace(",", ""))) * 100) /
				parseFloat(omx.price.replace(",", ""))
		).toFixed(2);
		clearInterval(secInterval);
	}

	return (
		<div className="container">
			<div className="IndexVal">
				<h1 className="tekst2">
					<b>OMX Tallinn_GI (^OMXT)</b>
				</h1>
				<p className="tekst3">Tallinn - Tallinn Real Time Price. Currency in EUR</p>
				<div className="hinnamuutus">
					<h2 className="tekst1">
						<b>{currentState} </b>
					</h2>
					<h2 className={differnce >= 0 ? "punane" : "roheline"}>{valChange}</h2>
				</div>
				<p className="tekst3">{omx.time}</p>
			</div>

			<div className="CalculationDetails">
				<h2 className="tekst4">Calculation details</h2>
				<div className="calSpecifics">
					<div className="calcDet">
						<h3 className="tekst5 justifyStart">Accuracy</h3>
						<h3 className="tekst5 justifyEnd">
							<b>{typeof calAccuracy === "string" ? calAccuracy + "%" : ""}</b>
						</h3>
					</div>
					<div className="calcDet">
						<h3 className="tekst5 justifyStart">Time to complete</h3>
						<h3 className="tekst5 justifyEnd">
							<b>{typeof calAccuracy === "string" ? seconds / 10 + "s" : ""}</b>
						</h3>
					</div>
					<div className="calcDet">
						<h3 className="tekst5 justifyStart">Operations</h3>
						<h3 className="tekst5 justifyEnd">
							<b>{typeof calAccuracy === "string" ? 97 : ""} </b>
						</h3>
					</div>
					<div className="calcDet">
						<h3 className="tekst5 justifyStart">Webpages visited</h3>
						<h3 className="tekst5 justifyEnd">
							<b>{typeof calAccuracy === "string" ? 52 : ""}</b>
						</h3>
					</div>
				</div>
			</div>
			<EquationUsed />
			<Instrument />
			<Sources />
		</div>
	);
};
