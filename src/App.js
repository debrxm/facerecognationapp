import React, { Component } from 'react';
import Particles from 'react-particles-js';
import {
  Navigation,
  NavigationNotSigned
} from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }
  loadUser = data => {
    const { id, name, email, entries, joined } = data;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    });
  };
    calculateFaceLocation = data => {
      const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
      leftCol: Face.left_col * width,
      topRow: Face.top_row * height,
      rightCol: width - Face.right_col * width,
      bottomRow: height - Face.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState({ input: value });
  };

  handleSubmit = () => {
    const { input } = this.state;
    this.setState({ imageUrl: input });
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  handleRouteChange = route => {
    this.setState({
      route: route
    });
  };
  clearPreviousUserData = () => {
    this.setState(initialState);
  };

  render() {
    const { box, route, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        {route === 'home' ? (
          <Navigation
            changeRoute={this.handleRouteChange}
            clearData={this.clearPreviousUserData}
          />
        ) : (
          <NavigationNotSigned changeRoute={this.handleRouteChange} />
        )}
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
            <FaceRecognation box={box} image={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin
            loadUser={this.loadUser}
            changeRoute={this.handleRouteChange}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            changeRoute={this.handleRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
