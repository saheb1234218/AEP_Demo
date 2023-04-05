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
require('dotenv').config();
const fetch = require('node-fetch')
const {Core} = require('@adobe/aio-sdk')
const rs = require('jsrsasign')
//const rsu = require('jsrsasign-util')
const {errorResponse,getBearerToken,stringParameters,checkMissingRequestInputs} = require('../utils')
// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  var Access;
  const prvKey = '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDCxguwuFuippeUBbBeosmIg7nMpl5rJuT+QMLqWyNkAcqvdnwLiHxu1zCSMhQtCD7TfbVwm/mZzZyxKjpy9tuOOrHvmt5iygBACshkR6TuiEsEINHe6DBEB8SOlFQTykCU2Yg6bnks8yuDHsNEH6lmKOCKlDI7CYJX7YePKTPDRj5lXB1ITtQ6q2ML6xyyVRtb7GwokNfBzeVGsqHqiFyZ469TI/u2hK1D/gbDCFUzM0Ts0XYLbPsaGNkxh29A/zeaUfaETjooSYDiESQgVTOaV4lpVUzms7RRs7ZbG7jhUlCJMJsEFdOZ2Wiv8AhnkyB9M4J9c/RqYgUs9SBM2jTBAgMBAAECggEAVZYtAOSh76EArlypmYwyvrgTZugcST14FnlirRSLQqC+7cdEztSUySfqAfPbhcY/xTNSDT+cuIbvObJyqJ3s8Fy+X6lP210kKwAR+m64/NALFq9NSYQB4YMATh7Dq0aOhlnoULTGrofUMPPNnhvDlk6UDJD+WY7eJcEMdk4GnuF0mHHOlkpxBNvNZTDztS/MRkp8R/tMCLm1rhheuLtySvNN5jttX+mpDnfZ+cv5ph7WxbK6uRSuHyFV6HxpQQIgabTl660X/iJ4NTbAoQS3ofbeSPo2gFhfQEN7whpz9rLY36p4JpwKYBFZ+8JpUBkpEnQ3/a8Ka8SwlyAtsaT2WQKBgQDoOJ48H7fAMBdTuHVFhmI6cToFUXsuki9YJmgWS9Pw2KZCG3+qDSFiUilf3sBuToMX7azeV9Q+xVZYvGRn3Y4r4B7SGN7qgkKggADody9QKiVxtCGDIP/d/dxPoNPKWyIpXp96ChW+n0gFLjVXRnrGndGeU0Y3DXAJPXpbtelWgwKBgQDWt8ms9WCglzP61fSGmJCsDxn+tFAHfFaK7Fu2cJWi5t0p21bXb9P3rzRjURtMn7yhg/lwbe0NA5FegFEmYeZ7OJRBKckiNlXCSTe0L8tVibRAI3+1jXWvdPmXEo1JfThjc0n2B9k1UV4T+KrXXg4eI3brfZawMwxLO0PAm9MEawKBgHZmv886AM999bbbGvgK77SKnKGvjNYO9RLF6lZL7VEktYiJSstijH38FFpsUcMsRs0Bgx2OvIoQxdjSnYMTxPR7/lrzEV2ScvQwr8XXVwlRo+vYgym/vpXqZNU41COd2cosE7X+xF2ACxGRIONR7TGtr/5AyVEyicg8T1HJa6KPAoGAMlY7zXRpBrzrzq5B+RvjLrMLoQ6chGS91Su8BHU4X0xIJPvqy+7HfpVwbqghAkGgcy0BWT4sCJUBi2oBnEHvSovlFbG6GW8rg7SufmuF+7OgsjigQ+u53zxJFwWeYdAdXBM3D5qfbUR6DayKQJsoLCCcTHDQ1tXg1/I42/qr6akCgYBot8oZp6CtBiVrnukdVuxxZLQttuv9TAP1L4f1rvdEwQzfJiyDfuXoSA33iBN9fai9FU2hZk99Lw7WSqf72lwMMlRKHuexneGkvLARko1xz3m51nRJhRhDWKwlcEtlxGC/Q4epIJx7BFHvVBelOeCnBWVtcaALqgn7CB2QV0UYsw==-----END PRIVATE KEY-----';
  const api_key = "7ef8f40dcd4446c7b9a8104031cb0fe8"
  const TECHNICAL_ACCOUNT_ID = "6D4C28526427BD980A495E24@techacct.adobe.com"
  const ims_org = "D1D7123F524450A60A490D45@AdobeOrg"
  const client_secret = "p8e-VTcnzv4ypmy5_cm0I2yIuea_JL9uh4cC"
  const META_SCOPE = "ent_dataservices_sdk"
  const data = {
    "exp": Math.round(87000 + Date.now() / 1000),
    "iss": ims_org,
    "sub": TECHNICAL_ACCOUNT_ID,
    "aud": "https://ims-na1.adobelogin.com/c/" + api_key,
    "https://ims-na1.adobelogin.com/s/ent_dataservices_sdk": "true"

  }
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
  console.log(content.access_token);
  // const response = {
  //   statusCode: 200,
  //   body: content["access_token"]

  // }
  Access = content["access_token"];
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')
    logger.info(process.env.APS_KEY)
    logger.info(process.env.AIO_runtime_apihost)
    logger.info('Calling the sps action')
    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = [/*'Authorization'*/]
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
   // const token = getBearerToken(params)

    // replace this with the api you want to access
    const apiEndpoint = 'https://ims-na1.adobelogin.com/ims/profile/v1'

    // fetch content from external api endpoint
    const res = await fetch(apiEndpoint,{
      headers: {
        'Authorization' : `Bearer `+Access
        //eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2Nzk5NzE5OTg4MjhfZjJmZWVjMTQtODk5Zi00N2M0LWFmZjAtMDEyOGQ5MjBmZWUyX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI0MDc1NjFhOTk3NTU0MTNmOTVkODY3MTAwZGI4NjY1YiIsInVzZXJfaWQiOiIwNzc4MURDMzYzNkM3NjI2MEE0OTVDQTBAdGVjaGFjY3QuYWRvYmUuY29tIiwic3RhdGUiOiJ7XCJzZXNzaW9uXCI6XCJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vaW1zL3Nlc3Npb24vdjEvTkdVMk5EVXdOV010T1RRd09DMDBORFJrTFRrd01qUXRNV1l6WkRrelpXVTJPR0l6TFMwd056YzRNVVJETXpZek5rTTNOakkyTUVFME9UVkRRVEJBZEdWamFHRmpZM1F1WVdSdlltVXVZMjl0XCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIwNzc4MURDMzYzNkM3NjI2MEE0OTVDQTBAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJmZyI6IlhKNkEzNVNVSFBON05QNktFT1FWWkhRQVdVPT09PT09IiwibW9pIjoiNWZjMzYxMzEiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6Im9wZW5pZCxzZXNzaW9uLEFkb2JlSUQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCIsImNyZWF0ZWRfYXQiOiIxNjc5OTcxOTk4ODI4In0.Ozlc7mFcXtFf2UWRrplJmKS0VmyaX3oLDndEi197Hx_SHOGoJQnMCmtKpXTb6AlQEf2M8Ncu_qIXv9N0jzaVwmmLIinacqEMwRiOIZ8QPvKaZ253BAsjajS32ligka-R-Xv42gF7aAZI2mBM8w8MG_6ZsNzza4QO7FZVEmf0TuIp5s4NXGT7cnTp_bacIVAXj61CmhhE2V6CZosv415BzTcgXZXrn5B4xraAurLYrYgiHdWuGNwqaHIdHOK__V9hHahtoEH3Gl4LQlpf-iz7pHE28vUgXcNbJKNLHR6FKzVc4B57wmU3ZyaG1uleshugsSDRgaSHMNdiWhrpdJ0U-A'
      }
    });
    if (!res.ok) {
      throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
    }
    const content = await res.json()
    const response = {
      statusCode: 200,
      body: content
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
 
  //return response




 
}
exports.main = main