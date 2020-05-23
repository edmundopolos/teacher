import axios from 'axios'



const getparam = (url,data) =>{
    axios.get(url, {
        params: data
      },{timeout: 1000,
      headers: {'Content-Type': 'application/json'}})
      .then(function (response) {
         return response;
      })
      .catch(function (error) {
        console.log(error)
        return false
      })
      .then(function () {
        // always executed
      });  
}

const get = (url) =>{
  var a = []
  axios.get(url,{timeout: 2000,
    headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      a = response.data
      if (response.status == 200 ) {
        
        
       a.push(response.data)
      }
       
    })
    .catch(function (error) {
      console.log(error)
      return error.status
    })
    .then(function () {
      // always executed
    });
    return a
}


const post = (url,data) => {
    axios.post(url, data,{timeout: 5000,
        headers: {'Content-Type': 'application/json'}})
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const getbaseUrl = 'http://school.mstudio.com.ng/api';

const postBaseUrl = 'http://192.168.43.136:5000'
//212.71.253.219
export {get,post,getparam,getbaseUrl,postBaseUrl}