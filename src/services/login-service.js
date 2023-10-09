// this service was made to handle auth requsts to api

const login = async (u, p) => {

    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };
      
    return await fetch(process.env.REACT_APP_Baseurl + `User/Authenticate?username=${u}&password=${p}`, requestOptions)
    .then(response => {
        if(response.status === 200){
            return response.json()
        }
        
    })
    .then(data => data)
    .catch(error => error = "CORSError");
};

export const loginService = {
    login
};