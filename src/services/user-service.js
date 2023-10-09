// the user service was made to handle all fetch requests to perform crud operations

const requestOptions = (method, headers, data) => {
    let res;
    const token = localStorage.getItem("token")
    if (headers === false) {
        res = {
            method: method,
            redirect: "follow",
            headers:{
                "Authorization": "Bearer " + JSON.parse(token)
            }
            
        }
    } else {
        res = {
            method: method,
            redirect: "follow",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + JSON.parse(token),
                "accept": "*/*",
                "Content-Type": "application/json",
                referrerPolicy: "strict-origin-when-cross-origin"
            }
        }
    }
    
    return res;
}

const getUsers = async () => {
    return await fetch(process.env.REACT_APP_Baseurl + `User/GetAll`, requestOptions("GET", false, {}))
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("auth", true);
            }
            return response.json()
        })
        .then(data => data)
        .catch(error => error);
};

const createUsers = async (data) => {
    return await fetch(process.env.REACT_APP_Baseurl + `User/Create`, requestOptions("POST", true, data))
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem("auth", true);
      }
      return response.json()
    })
    .then(result => result)
    .catch(error => error);
}

const updateUsers = async (data) => {
    return await fetch(process.env.REACT_APP_Baseurl + `User/Update`, requestOptions("PUT", true, data))
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("auth", true);
          }
          return response.json()
        })
        .then(result => result)
        .catch(error => error);
}

const deleteUser = async (id) => {
    return await fetch(process.env.REACT_APP_Baseurl + `User/Delete?userID=${id}`, requestOptions("DELETE", true, {}))
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("auth", true);
            }

            return response.json()
        })
        .then(result => result)
        .catch(error => error);
}

export const userService = {
    getUsers, createUsers, updateUsers, deleteUser
};