import React from 'react';
//name attribute is what we are going to use to fetch values out of these inputs
//function doesnt use "this" key word
const Form = props => (
    <form onSubmit={props.getWeather}> 
    <input type="text" name="city" placeholder="City..."/>
    <input type="text" name="country" placeholder="Country..." />
    <button>Get Weather</button>

</form>
);

//using class
// class Form extends React.Component {
//     render() {
//         return (
//             <form onSubmit={this.props.getWeather}> 
//                 <input type="text" name="city" placeholder="City..."/>
//                 <input type="text" name="country" placeholder="Country..." />
//                 <button>Get Weather</button>

//             </form>
//         );
//     }
// }

export default Form;
//how to make sure when we press this button that the api will get called?, we will use props for this, it is an html attribute