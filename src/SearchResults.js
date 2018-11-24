import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './App.css';


class Infocard extends React.Component {
constructor (props) {
    super(props);
      this.state = {
    open: false,
    isOpen: false,
    placeID: '',
    webSite: ''
  };

  this.handleGetInfo = this.handleGetInfo.bind(this);
  this.handleGoogleInfo = this.handleGoogleInfo.bind(this);
  this.handlePlaceDetails = this.handlePlaceDetails.bind(this);
  }


  onOpenModal = () => {
    this.handleGetInfo();
    this.handleGoogleInfo();
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

   handleGetInfo(event) {
  	const self = this;
    	axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + this.props.id,{
        headers: {
            Authorization: `Bearer 9ieIkr1BsBWuaxHVV5ZG7iMast3LnfMUDcBC7McTVr8HGg3SjluntY3zlLg6eSf2u2OzH3OGzWY5vMzBRDWloXXzyx6pwOyVp2jM5lgwXaMbdQX4685510z5Xf7oW3Yx`
        }
    })

    .then(function (res){
        console.log(res)
      	self.setState({isOpen:res.data.hours[0].is_open_now});
    })
    .catch(function(err){
        console.log(err)
    })
  } 

  handleGoogleInfo(event) {
    const self=this;
    axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+this.props.name+'&inputtype=textquery&fields=photos,id,place_id,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAhFXEDzk_C8XQdByz0pka_6Pff_GPeJ48')
    .then(function (res){
        console.log(res)
        self.setState({placeID: res.data.candidates[0].place_id});
        self.handlePlaceDetails();
    })
    .catch(function(err){
        console.log(err)
    })
  }

  handlePlaceDetails(event) {
    const self=this;
    axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=' + this.state.placeID + '&key=AIzaSyAhFXEDzk_C8XQdByz0pka_6Pff_GPeJ48')
    .then(function (res){
        console.log(res)
        self.setState({webSite: res.data.result.website});
    })
    .catch(function(err){
        console.log(err)
    })
  }

	render() {
		const style = {
		border:'1px solid lightgray',
		width:'361px',
		textAlign:'left',
		alignItems: 'center',
		minHeight:'600px',
		maxHeight: '600px',
		margin: '35px',
		backgroundColor: '#fff'
		};

		const imgstyle = {
			width: '360px',
			height: '360px',
			justifyContent: 'center'
		}

		const red = {
			color: 'red'
		}

		const green = {
			color: 'green'
		}

		return (
			<div style={style}>
			<img src = {this.props.img} style={imgstyle}/>
			<section className="resInfo">
			<h1 id="restaurantName">{this.props.name}</h1>
			<p>{this.props.address[0]} {this.props.address[1]}</p>
			<p>Price: {this.props.price}</p>
			<p>Rating: {this.props.rating}</p>
			<p>{this.props.isClosed}</p>
			<button id="moreInfo" onClick={this.onOpenModal}>More Info</button>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
     <section style={{
            width: '100%',
            height: '600px',
            paddingLeft: '110px',
            paddingRight: '110px'}}>
                    <img src='https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=300x300&key=AIzaSyAhFXEDzk_C8XQdByz0pka_6Pff_GPeJ48'/>

          <h1>{this.props.name}</h1>
          <p>Rating: {this.props.rating} - Total Reviews: {this.props.reviewCount}</p>
          <p>Phone: {this.props.phone}</p>
          <section style={this.state.isOpen ? green : red}>
          <p>{this.state.isOpen ? 'Currently Open' : 'Currently Closed'}</p>
          </section>
           <a href={this.props.yelpURL} target='blank'>Yelp Page</a>
           <br/>
           <p>{this.state.webSite ? <a href={this.state.webSite} target='blank'>Website</a> : null}</p>
        </section>
        </Modal>
			</section>
			</div>
			);
	}
};




class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    locValue: '',
    termValue: '',
    comments: [], 
    name: '', 
    img: '',
    price: '',
    rating: '',
    address: '',
    phone: '',
    isClosed: false,
    yelpURL: '',
    reviewCount: '',
    id: ''
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(event) {
    this.setState({locValue: event.target.value});
  }

  handleTermChange(event) {
  	this.setState({termValue: event.target.value});
  }
 
  handleSubmit(event) {
  	const self = this;
    	axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&term=' + this.state.termValue + '&location=' + this.state.locValue,{
        headers: {
            Authorization: `Bearer 9ieIkr1BsBWuaxHVV5ZG7iMast3LnfMUDcBC7McTVr8HGg3SjluntY3zlLg6eSf2u2OzH3OGzWY5vMzBRDWloXXzyx6pwOyVp2jM5lgwXaMbdQX4685510z5Xf7oW3Yx`
        }
    })

    .then(function (res){
        console.log(res)
       let restaurants = res.data.businesses.map(function(place){
      	console.log(place.name);
      	self.setState({comments: res.data.businesses,
      		name: res.data.businesses.name,
      		img: res.data.businesses.image_url,
      		price: res.data.businesses.price,
      		rating: res.data.businesses.rating,
      		address: res.data.businesses.display_address,
      		phone: res.data.businesses.display_phone,
      		isClosed: res.data.businesses.is_closed,
      		yelpURL: res.data.businesses.url ,
      		reviewCount: res.data.businesses.review_count,
      		id: res.data.businesses.id
      	})
      	return restaurants;
    });
    })
    .catch(function(err){
        console.log(err)
    })
    event.preventDefault();
    console.log(this.state.city);
  } 

  render() {
  	{/*const options = this.state.comments.map((item, index) => <li key={index}>{`${item.name}`}</li>)*/}
  	const options = this.state.comments.map((item, index) =>        <Infocard
          key={index}
          name={item.name}
          img={item.image_url}
          price={item.price}
          rating={item.rating}
          address={item.location.display_address}
          phone={item.display_phone}
          isClosed={item.is_closed}
          yelpURL={item.url}
          reviewCount={item.review_count}
          id={item.id}
        />)

 			const container = {
			display:'flex',
			flexDirection:'row',
			alignContent:'center',
			justifyContent:'center',
			textAlign:'center'
		};

{/*<h1>Results for {this.state.termValue.charAt(0).toUpperCase() + this.state.termValue.slice(1)} in {this.state.locValue}</h1>*/}

    return (
    <div>
    <p id="instruction">Enter what you're in the mood for and your city to see your options!</p>
      <form onSubmit={this.handleSubmit}>
      		<input id="search-field" className="col col-6" type="text" placeholder="What do you feel like?" value={this.state.value} onChange={this.handleTermChange} required autoComplete="off"/>
          <input id="search-field" className="col col-6" type="text" placeholder="Enter City Name" value={this.state.value} onChange={this.handleCityChange} required autoComplete="off"/>
        <input id="submitButton" type="submit" value="Submit"/>
      </form>    
 <div style={container}>
 <div className="row align-items-center justify-content-center">
 {options}
 </div>
 </div>
 </div>
    );
  }
}



export default SearchBar;