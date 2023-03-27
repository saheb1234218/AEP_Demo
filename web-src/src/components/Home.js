/*
* <license header>
*/

import React, { useState } from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import { Form, TextField, Checkbox } from '@adobe/react-spectrum'
import FormShow from "./Form.jsx";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';



export const Home = () => {
  const cardData = [{
    "name": "Adobe Experience Platform",
    "image": "https://yt3.ggpht.com/a/AGF-l79c3yXjA-ID1TRWFd71Pj4yUlOdXwoKAa4bQg=s900-c-k-c0xffffffff-no-rj-mo"
  },
  {
    "name": "Settings",
    "image": "https://i.pinimg.com/736x/27/8e/aa/278eaa134a686ab147b49a5cf6c3d4f9.jpg"
  },
  ]
  const [show, setShow] = useState(false)
   function dis(){
    let url1 = `https://cors-anywhere.herokuapp.com/https://www.abplive.com/home/feed`;
  axios.get(url1, {
    headers: new Headers({
      Accept: "text/html",
      "content-type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Allow-Headers": "Content-Type",
    }),
    mode: "no-cors",
  }).then((res)=>{
    var xml = new XMLParser().parseFromString(res.data);
    let news = xml.children[0].children;
    console.log(news);
  })

// axios.post('https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
//            xmls,
//            {headers:
//              {'Content-Type': 'text/xml',
             
//              'Access-Control-Allow-Origin': 'https://localhost:9080/'}
//            }).then(res=>{
//              console.log(res);
//            }).catch(err=>{console.log(err)});
  
   }
  return (
    <View width='size-10000'>
      <div role="grid" className='d-flex'>
        {show ? <FormShow /> : <>
          {
            cardData.map(x => {
              return (
                <MDBCard style={{ width: '250px', textAlign: 'center', marginRight: '70px' }}>
                  <MDBCardImage width={200} style={{ height: '200px' }} src={x.image} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardTitle style={{ fontSize: '15px' }}>{x.name}</MDBCardTitle>
                    <MDBCardText>

                    </MDBCardText>
                    <MDBBtn color='dark' onClick={() => dis()}>
                      Use Now
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              )

            })}
        </>
        }
      </div>

    </View>
  )
}
