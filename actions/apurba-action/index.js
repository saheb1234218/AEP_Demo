/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */
const envData = require('../env.json')
const fetch = require('node-fetch')
const {Core} = require('@adobe/aio-sdk')
const rs = require('jsrsasign')
//const rsu = require('jsrsasign-util')
const {errorResponse,getBearerToken,stringParameters,checkMissingRequestInputs} = require('../utils')
// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  var Access;
  var AccountData;
  // envData.values[0].value //clientSecret
  // envData.values[1].value // API_KEY
  // envData.values[2].value[0] // META_SCOPE
  // envData.values[3].value // ACCESS_TOKEN
  // envData.values[4].value // PRIVATE_KEY
  // envData.values[5].value //jwt_token
  // envData.values[6].value //TECHNICAL_ACCOUNT_ID
  // envData.values[7].value  //IMS
  // envData.values[8].value //IMS_ORG
  // envData.values[9].value //clientID
  const prvKey = '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDCxguwuFuippeUBbBeosmIg7nMpl5rJuT+QMLqWyNkAcqvdnwLiHxu1zCSMhQtCD7TfbVwm/mZzZyxKjpy9tuOOrHvmt5iygBACshkR6TuiEsEINHe6DBEB8SOlFQTykCU2Yg6bnks8yuDHsNEH6lmKOCKlDI7CYJX7YePKTPDRj5lXB1ITtQ6q2ML6xyyVRtb7GwokNfBzeVGsqHqiFyZ469TI/u2hK1D/gbDCFUzM0Ts0XYLbPsaGNkxh29A/zeaUfaETjooSYDiESQgVTOaV4lpVUzms7RRs7ZbG7jhUlCJMJsEFdOZ2Wiv8AhnkyB9M4J9c/RqYgUs9SBM2jTBAgMBAAECggEAVZYtAOSh76EArlypmYwyvrgTZugcST14FnlirRSLQqC+7cdEztSUySfqAfPbhcY/xTNSDT+cuIbvObJyqJ3s8Fy+X6lP210kKwAR+m64/NALFq9NSYQB4YMATh7Dq0aOhlnoULTGrofUMPPNnhvDlk6UDJD+WY7eJcEMdk4GnuF0mHHOlkpxBNvNZTDztS/MRkp8R/tMCLm1rhheuLtySvNN5jttX+mpDnfZ+cv5ph7WxbK6uRSuHyFV6HxpQQIgabTl660X/iJ4NTbAoQS3ofbeSPo2gFhfQEN7whpz9rLY36p4JpwKYBFZ+8JpUBkpEnQ3/a8Ka8SwlyAtsaT2WQKBgQDoOJ48H7fAMBdTuHVFhmI6cToFUXsuki9YJmgWS9Pw2KZCG3+qDSFiUilf3sBuToMX7azeV9Q+xVZYvGRn3Y4r4B7SGN7qgkKggADody9QKiVxtCGDIP/d/dxPoNPKWyIpXp96ChW+n0gFLjVXRnrGndGeU0Y3DXAJPXpbtelWgwKBgQDWt8ms9WCglzP61fSGmJCsDxn+tFAHfFaK7Fu2cJWi5t0p21bXb9P3rzRjURtMn7yhg/lwbe0NA5FegFEmYeZ7OJRBKckiNlXCSTe0L8tVibRAI3+1jXWvdPmXEo1JfThjc0n2B9k1UV4T+KrXXg4eI3brfZawMwxLO0PAm9MEawKBgHZmv886AM999bbbGvgK77SKnKGvjNYO9RLF6lZL7VEktYiJSstijH38FFpsUcMsRs0Bgx2OvIoQxdjSnYMTxPR7/lrzEV2ScvQwr8XXVwlRo+vYgym/vpXqZNU41COd2cosE7X+xF2ACxGRIONR7TGtr/5AyVEyicg8T1HJa6KPAoGAMlY7zXRpBrzrzq5B+RvjLrMLoQ6chGS91Su8BHU4X0xIJPvqy+7HfpVwbqghAkGgcy0BWT4sCJUBi2oBnEHvSovlFbG6GW8rg7SufmuF+7OgsjigQ+u53zxJFwWeYdAdXBM3D5qfbUR6DayKQJsoLCCcTHDQ1tXg1/I42/qr6akCgYBot8oZp6CtBiVrnukdVuxxZLQttuv9TAP1L4f1rvdEwQzfJiyDfuXoSA33iBN9fai9FU2hZk99Lw7WSqf72lwMMlRKHuexneGkvLARko1xz3m51nRJhRhDWKwlcEtlxGC/Q4epIJx7BFHvVBelOeCnBWVtcaALqgn7CB2QV0UYsw==-----END PRIVATE KEY-----';
  const api_key = envData['api-key']
  const TECHNICAL_ACCOUNT_ID = envData['TECHNICAL_ACCOUNT_ID']
  const ims_org = envData['ims_org']
  const client_secret = envData['client_secret']
  const META_SCOPE = envData['META_SCOPE']
  const data = {
    "exp": Math.round(87000 + Date.now() / 1000),
    "iss": ims_org,
    "sub": TECHNICAL_ACCOUNT_ID,
    "aud": "https://ims-na1.adobelogin.com/c/" + api_key,
    "https://ims-na1.adobelogin.com/s/ent_dataservices_sdk": "true"

  }
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  logger.info(envData['api-key'])
  var meta_scope = "https://ims-na1.adobelogin.com/s/" + META_SCOPE
  data[meta_scope] = true
  const header = {
    alg: 'RS256'
  }
  const Jwt = rs.KJUR.jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(data), prvKey);
  const apiEndpoint = 'https://ims-na1.adobelogin.com/ims/exchange/jwt/'
  const sessionTokenHeader = new Headers()
  sessionTokenHeader.append("Cookie", "ftrset=839; relay=ca32a2d9-622e-4da5-9756-875314334e26")
  const formdata = new FormData()
  formdata.append("client_id", api_key)
  formdata.append("client_secret", client_secret)
  formdata.append("jwt_token", Jwt)
  const requestOptions = {
    method: 'POST',
    headers: sessionTokenHeader,
    body: formdata,
    redirect: 'follow'
  }
  const res = await fetch(apiEndpoint, requestOptions)
  const content = await res.json()
  //const content = Jwt
  //console.log(content.access_token);
  // const response = {
  //   statusCode: 200,
  //   body: content["access_token"]

  // }
  Access = content["access_token"];
  logger.info(Access)
  var myHeaders = new Headers();

myHeaders.append("Accept", "application/json");

myHeaders.append("Authorization", `Bearer `+Access);
myHeaders.append("x-api-key", "c8f6cfb450934f6fac6d86482ebc5151");

myHeaders.append("x-gw-ims-org-id", "D1D7123F524450A60A490D45@AdobeOrg");

myHeaders.append("x-sandbox-name", "prod");

 

var requestOption = {

  method: 'GET',

  headers: myHeaders,

  redirect: 'follow'

};

 

 

// const response = {
//      statusCode: 200,
//      body: result

//   }
const x=await  fetch('https://platform.adobe.io/data/foundation/export/datasets/642ba57d6ff5a41c0625dbbf/preview', requestOption);
const cont= await x.json()
    const response = {
      statusCode: 200,
      body: cont
    }

  // return fetch('https://platform.adobe.io/data/foundation/export/datasets/642ba57d6ff5a41c0625dbbf/preview', requestOption)

  // .then(response => response.text())

  // .then(result => console.log(result))

  // .catch(error => console.log('error', error));

  return response;


 
}
exports.main = main