import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecoginition from './components/FaceRecogonition/FaceRecogonition';

const PAT = '80c09b529be4488f9e34551a4a2a95a5';
const Model_ID = 'face-detection';


class App extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3010/')
      .then(response => response.json())
    // .then(console.log);
  }

  onInputChange = (event) => {
    this.setState({ searchField: event.target.value })
    console.log(event.target.value);
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  calculateFaceLocation = (boxData) => {
    const clarifaiFace = JSON.parse(boxData, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    // console.log(height, width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onButtonClick = () => {
    this.setState({ imageURL: this.state.searchField })
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "vibhor376",
        "app_id": "my-first-application"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.searchField
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${Model_ID}/outputs`, requestOptions)
      .then(response => response.text())
      .then(
        result => {
          if (result) {
            fetch('http://localhost:3010/image', {
              method: 'put',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              })
            }).then(Response => Response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
        }
      )
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App" >
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :
          (
            this.state.route === 'home' ?
              <div>
                <Logo />
                <Rank user={this.state.user} />
                <ImageLinkForm
                  searchChange={this.onInputChange}
                  onBtnClick={this.onButtonClick}
                />
                <FaceRecoginition box={this.state.box} imageURL={this.state.imageURL} />
              </div>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
