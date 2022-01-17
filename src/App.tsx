import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client/core"

import React, { useState } from "react";
//import {  useFormik } from 'formik';
//import * as Yup from 'yup';

function App() {


  //const formik = useFormik({
  //  initialValues: {
  //    rocketName: '',
  //  },
  //  validationSchema: Yup.object({
  //    rocketName: Yup.string()
  //      .max(15, 'Must be 15 characters or less')
  //      .required('Required').min(3)}),
  //  onSubmit: values => {
  //    graphqlCall(values.rocketName)
  //  },
  //});

  const [rocketData, setNumberList] = useState([]);

  const [inputRocket, setRocketName] = useState('');

  const client = new ApolloClient({
      uri: "https://api.spacex.land/graphql",
      cache: new InMemoryCache()
  });

  const GET_ROCKETS = gql`
    query GetRockets($input: String!) {
      launches(find:{rocket_name: $input}) {
      mission_name
      id
      launch_date_local
      launch_success
      launch_year
      }
    }
  `;


  function graphqlCall(name:string){
    
              client.query({
                  query: GET_ROCKETS,
                  variables: { input: name },
              })
              .then((response:any) => {
                  if (response.data.launches.length > 0) {

                      setNumberList(response.data.launches);
                  }
                  else {
                      setNumberList([]);
                  }


              }).catch((err:any) => console.error(err));
  }

  const handleInputChange = (param:any) => {

      const name = param.target.value;


      setRocketName(name);

      if (name.length > 2) {
          
        graphqlCall(name)
          
      }

  }


  return (

      <div>
          <h2>Welcome</h2>
          <label>Enter Rocket Name:  </label>
          <input
              type="text"
              name="intRange"
              value={inputRocket}
              onChange={handleInputChange}
              placeholder="Type Rocket Name"
          />
          <br></br>
          <br></br>

         
         {rocketData.map((object:Rocket, i) => <ul key={i}>
           <li>{object.mission_name}</li>
           <ul>{object.launch_date_local}</ul>
           <ul>{object.launch_year}</ul>
           <br />
         </ul>)}

      </div>

  )
}

export interface Rocket{
  mission_name:string,
  id:string,
  launch_date_local:string
  launch_success:string,
  launch_year:string
}

export default App;
