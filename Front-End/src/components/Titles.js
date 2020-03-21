import React from 'react';
//rcc is shortcut for creating class

//using function
const Titles = () => (
	<div>
		<h1 className="title-container__title">Weather Finder</h1>
		<h3 className="title-container__subtitle">Find out temperature, conditions and more...</h3>
	</div>
);
//using class
// class Titles extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>Weather Finder</h1>
//                 <p>FInd out temperature,conditions and more...</p>
//             </div>
//         );
//     }
// }

export default Titles;
