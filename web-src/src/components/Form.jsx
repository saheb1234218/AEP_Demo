import React, { useState } from 'react'
import "./Form.css"
import { Item, ListView, Heading, Form, TextField, Checkbox, Button } from '@adobe/react-spectrum'
import axios from 'axios'
import actionWebInvoke from '../utils'
import allActions from '../config.json'

export default function ShowForm(props) {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [datas, setData] = useState([]);
  const [key, setKey] = useState(0);
  const [load, setLoad] = useState(false);

  const [dis, setDis] = useState({
    "sl": 1,
    "id": "abcd1234ahhdhf23fsfs12",
    "create_Date": "24/01/2023",
    "modify": "24/02/2020"
  });
  const data = [
    {
      "sl": 1,
      "id": "abcd1234ahhdhf23fsfs12",
      "create_Date": "24/01/2023",
      "modify": "24/02/2020"
    },
    {
      "sl": 2,
      "id": "abcd1234ahhdhsafsafs43",
      "create_Date": "10/03/2023",
      "modify": "04/11/2020"
    },
    {
      "sl": 3,
      "id": "abcd1234ahdsfdf767ds88",
      "create_Date": "19/02/2023",
      "modify": "09/02/2018"
    }

  ]
  const actions = Object.keys(allActions).reduce((obj, key) => {
    if (key.lastIndexOf('/') > -1) {
      obj[key] = allActions[key]
    }
    return obj
  }, {})
  const x = async () => {
    setLoad(true)
    const headers = {}
    const params = {}
   
    const actionResponse = await actionWebInvoke(actions["101APICONSOLE/apurba-action"], headers, params)

    //console.log(actionResponse.data)
    const finaldata = []
    for (var i = 0; i < 4; i++) {
      finaldata.push(actionResponse.data[i]);
    }
    console.log(finaldata)
    setData(finaldata);
    if (datas.length != 0) {
      setLoad(false)
    }
    console.log(fname, lname, ph, email,)
  }

  const newData = (key) => {
    data.map((x) => {
      if (x.sl == key) {
        console.log(x);
        setDis(x)
      }
    })
  }




  return (
    <div className='d-flex flex-column w-100 justify-content-center align-items-center'>
      <Button id="back" alignSelf="flex-start" marginBottom="size-100" width="size-200" onPress={() => props.prev()} variant="accent">Back</Button>
      <Heading>Adobe Experience Platform Profile Search</Heading>


      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <Form className="w-100">
          <div className=" d-flex flex-row justify-content-center gap-5">
            <TextField label="First Name" onChange={(e) => setFname(e)} placeholder='Enter your first name' />
            <TextField label="Last Name" onChange={(e) => setLname(e)} placeholder='Enter your first name' />
          </div>
          <div className=" d-flex flex-row justify-content-center gap-5">
            <TextField label="Email" onChange={(e) => setEmail(e)} placeholder='Enter your email' />
            <TextField label="Phone Number" onChange={(e) => setPh(e)} placeholder='Enter your phonenumber' />
          </div>

          <Button alignSelf="center" marginTop="size-300" width="size-500" onPress={() => {
            x()
            setOpen(true)
          }} variant="accent">Submit</Button>
        </Form>
      </div>


      {open && datas.length != 0 && load ? <><hr></hr>
        <div className="w-100 row p-5 pt-0">
          <div className="col-sm-4 d-flex flex-column justify-content-center">


            <ul class="list-group">
              <li class="list-group-item active mb-1">Profile ID</li>
              {datas.map((x, index) => {
                console.log(x["_cognizanttechnologys.email"])
                return (
                  <li class="list-group-item left-item" onClick={() => setKey(index)}>{datas.length != 0 ? x["_cognizanttechnologys.email"] : null
                  }</li>
                )
              })}
              {/* <li class="list-group-item left-item" onClick={()=>newData(1)}>abcd1234ahhdhf23safsaf</li>
  <li class="list-group-item left-item" onClick={()=>newData(2)}>abcd1234ahhdhf23fsfsdf</li>
  <li class="list-group-item left-item" onClick={()=>newData(3)}>abcd1234ahhdhf23fsdfdd</li>
  <li class="list-group-item left-item">abcd1234ahhdhf23esfefe</li> */}
            </ul>
          </div>
          <div className="col-sm-8 d-flex flex-column justify-content-center ">


            <ul class="list-group" style={{ marginTop: `${!show ? '18px' : '0px'}` }}>
              <div className='d-flex flex-row gap-2 mb-1'>
                <li class="list-group-item active w-50 float-left xyz1" id="xyz1" onClick={() => {
                  document.getElementById("xyz1").style.backgroundColor = "#0d6efd"
                  document.getElementById("xyz1").style.color = "white"
                  document.getElementById("xyz2").style.backgroundColor = "#ccccb3"
                  document.getElementById("xyz2").style.color = "black"

                  setShow(false)
                }}>Attributes</li>
                <li class="list-group-item  w-50 float-right xyz2" id="xyz2" onClick={() => {
                  document.getElementById("xyz2").style.backgroundColor = "#0d6efd"
                  document.getElementById("xyz2").style.color = "white"
                  document.getElementById("xyz1").style.backgroundColor = "#ccccb3"
                  document.getElementById("xyz1").style.color = "black"
                  setShow(true)
                }}>Next Best Actions</li>
              </div>

              {!show ? <>
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Attributes</th>
                      <th scope="col">Values</th>

                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Email</td>
                      <td>{datas[key]["_cognizanttechnologys.email"]}</td>

                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>FirstName</td>
                      <td>{datas[key]["_cognizanttechnologys.firstName"]}</td>

                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>LastName</td>
                      <td>{datas[key]["_cognizanttechnologys.lastName"]}</td>

                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Phone</td>
                      <td>{datas[key]["_cognizanttechnologys.phone"]}</td>

                    </tr>
                  </tbody>
                </table>
              </> : <div class="card w-100" style={{ width: '18rem' }}>
                <div class="card-body">
                  <h5 class="card-title">PEGA </h5>
                  <h6 class="card-subtitle mb-2 text-muted">Internal Information</h6>
                  <p class="card-text">All Pega related info are displayed here related to your selcetion above .</p>
                  <a href="#" class="card-link"></a>
                  <a href="#" class="card-link"></a>
                </div>
              </div>}

            </ul>
          </div>
        </div></> : <>
        {load?<div className='d-flex justify-content-center align-items-center mt-5 gap-4'>
          <div class="spinner-border text-primary" role="status">
        
        </div><span>Loading Your Data...</span></div>
      :null}
        
        </>}
    </div>


  )
}