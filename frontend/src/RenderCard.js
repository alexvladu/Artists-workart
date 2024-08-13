import React, {useState, useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import CardOwner from "./CardOwner";
import Card from "./Card";
const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
};
const colStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const RenderCards=(username, refreshKey, setRefreshKey, setLoggedIn)=>{
    const [artworks, setArtworks] = useState([]);
    const rows = [];
    useEffect(() => {
        if(username==null)
        {
            fetch('http://localhost:3001/workart/visible')
            .then(response => response.json())
            .then(data =>{
                setArtworks(data);
            })
            .catch(error => console.error('Error fetching artworks:', error));
        }
        else if(username!==localStorage.getItem("username"))
        {
            fetch(`http://localhost:3001/workart/byuser/visible/${username}`)
            .then(response => response.json())
            .then(data=>{
                setArtworks(data);
            }).catch(error=>{
            })
        }
        else
        {
            fetch(`http://localhost:3001/workart/byuser/all/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  "token" : localStorage.getItem("token")})
            }).then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`${response.statusText},  ${response.status}`);
                }
                return response.json();
            })
            .then(data=>{
                setArtworks(data);
            }).catch(error=>{
                setLoggedIn(false);
                setRefreshKey(refreshKey+1);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
            })
        }
      }, [username, refreshKey, setRefreshKey, setLoggedIn]);
    for(let i=0; i<artworks.length; i+=2)
    {
        if(i+1<artworks.length)
        {
            rows.push(<Row key={i} style={rowStyle}>
                <Col style={colStyle} xs={12} sm={10} md={6}>
                {username===localStorage.getItem("username") && username!=null ? 
                  <CardOwner artwork={artworks[i]}/>:
                  <Card artwork={artworks[i]} />
                }
                </Col>
                <Col style={colStyle} xs={12} sm={10} md={6}>
                {username===localStorage.getItem("username") && username!=null ? 
                  <CardOwner artwork={artworks[i+1]}/>:
                  <Card artwork={artworks[i+1]} />
                }
                </Col>
              </Row>);
        }
        else rows.push(<Row key={i} style={rowStyle}>
            <Col style={colStyle} xs={12} sm={10} md={6}>
            {username===localStorage.getItem("username") && username!=null ? 
                  <CardOwner artwork={artworks[i]}/>:
                  <Card artwork={artworks[i]} />
            }
            </Col>
            </Row>);
    }
    return rows;
};
export default RenderCards;