import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import styled from "styled-components";


function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");


    const fetchDetails = async() => {        
            const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const detailData = await data.json();
            console.log("detailData",detailData)
            setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);


  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button 
            className={activeTab === "instructions" ? 'active' : ''} 
            onClick={() => {setActiveTab("instructions")}}>
                Instructions
        </Button>
        <Button 
            className={activeTab === "ingredients" ? 'active' : ''}
            onClick={() => {setActiveTab("ingredients")}}>
                Ingredients
        </Button>
        {activeTab === "instructions" && (
            <div>
                <h3 dangerouslySetInnerHTML={{ __html: details.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{ __html: details.instructions}}></h3>
            </div>
        )}
        {activeTab === "ingredients" && (
            <div>
            <ul>
                {details.extendedIngredients.map((ingredient) => {
                    return(
                        <li key={ingredient.id}>{ingredient.original}</li>
                    )
                })}
            </ul>
            </div>
            )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }

`;

const Button = styled.div`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    margin-right: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 4rem;

`

const Info = styled.div`
    margin-left: 10rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export default Recipe
