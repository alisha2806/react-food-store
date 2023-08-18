import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams, Link} from 'react-router-dom';


function Cuisine() {

    let params = useParams();
    const [cuisine,setCuisine]=useState([]);

    const getCuisine = async(name) => {        
            const data = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
                );
            const recipes = await data.json();
            console.log("recipes", recipes)
            setCuisine(recipes.results)
    };

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]);

  return (
    <Grid>
      {cuisine.map((item) => {
        return(
            <Card key={item.id}>
                <Link to= {'/recipe/' +item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                </Link>
            </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        border-radius: 2rem;
        width: 100%;
    }   
    a {
        text-decoration: none;
    } 
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;
export default Cuisine
