import React, { useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import logo from "./assets/AniLibLogo.png";
import axios from "axios"
import Search from "./Search"



class AniLib extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    mangaSearch = (e) =>{
        e.preventDefault();
        let userInput = document.getElementById("input-box").value;
        console.log(userInput);
        
        axios
        .get(`https://api.jikan.moe/v3/search/manga?q=${userInput}&page=1`, )
        .then((response) =>{
            console.log(response)
            this.setState({
                data:response.data.results
            });
            console.log(this.state.data)
        })
        .catch((error) => console.log(error));
        
        // const url = `http://api.repo.nypl.org/api/v1/items/search.json?q=${userInput}`
        // const options={
        //     headers:{
        //         "Authorization": "Token token =dz6uaitssbxqr5dq "
        //     },
        //     method: 'get'
        // };
        // console.log(fetchToCurl (url, options ))

    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({ input: event.target.value });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({showLibrary: true})
        console.log("handle submit")
        };

        resetClicked (input) {

          window.location.reload();
          console.log("reset");
          window.location.reload(false);
          };



    render(){
      console.log(this.state.data)
      let mangaDisplay = [];
      this.state.data.map(manga =>{
        return mangaDisplay.push(<li >{manga.title}</li>)
        
      })
      console.log(mangaDisplay)
        
        return (
            <div>
              <img className="AniLib" src={logo}></img>
              {/* <image src={logo} /> */}
              <h1 className="Ani-text"> AniLib </h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Control
                  id='input-box'
                  type="text"
                  placeholder="Enter a title"
                  onChange={this.handleChange}
                />
                <div className="buttons">
                  <Button className="submit-button" type="submit" onClick={this.mangaSearch} variant="outline-primary">Search</Button>
                  <Button className="reset-button" type="reset" variant="outline-primary" onClick={() => window.location.reload(false)}>Reset</Button>

                </div>
              </Form>
              {this.state.data.map((manga)=>{
                return (
                  <div>
                  <div> {manga.title}</div>
                  <div> <img src={manga.image_url}></img></div>
                  <div>{manga.synopsis}</div>
                  <div>{manga.type}</div>

                  </div>)

            
          })}
          {this.mangaDisplay}
              
              </div>
    
        )}
}

export default AniLib;