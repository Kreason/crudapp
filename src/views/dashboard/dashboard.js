import './dashboard.css'
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user-service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";

const Users = (props) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState([])
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [updatemodal, setUpdateModal] = useState(false);

  const [userID, setUserID] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [isActive, setisActive] = useState("")
  const [role, setRole] = useState(1)

  // Modal Style
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: 400,
      height: "400px",
      "box-shadow": "-1px -1px 14px 2px #0000007d, 0px -20px 20px 20px white",
    },
  };

  // Get, Create, Update, Delete => Uses Service Layer
  const getData = async () => {
    const res = await userService.getUsers();

    if (res !== undefined) {
      if (res.code !== 0) {
        setData(res.users)
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error(res.message);
    }
  }

  const validateUser = async () => {
    if (checkInputs(true)) {

      const postdata = {
        name: name,
        surname: surname,
        username: username,
        password: password,
        email: email,
        mobile: mobile,
        roleID: role
      }

      const res = await userService.createUsers(postdata);

      if (res !== undefined) {
        if (res.code === 1) {
          getData();
          toast.success(res.message);
          setModal(false)
        } else if (res.code === 0) {
          toast.error(res.message);
        }
      }

    }
  }

  const updateuser = async () => {
    console.log(isActive);
    if (checkInputs(false)) {

      const data = {
        name: name,
        surname: surname,
        email: email,
        mobile: mobile,
        isActive: isActive,
        userID: userID
      }

      const res = await userService.updateUsers(data);

      if (res !== undefined) {
        if (res.code === 0) {
          getData();
          toast.success(res.message);
          setUpdateModal(false)
        } else {
          toast.error(res.message);
        }
      }

    }
  }

  const deleteuser = async (index) => {
    const res = await userService.deleteUser(data[index].id);

    if (res !== undefined) {
      if (res.code === 1) {
        getData();
        toast.success(res.message);
      } else if (res.code === 0) {
        toast.error(res.message);
      }
    }
  }

  // Validate Inputs
  const checkInputs = (isCreate) => {
    var numbercharcheck = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
      var passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
      var emailcheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      var numbercheck = /^\d{10}$/;
    
    if (isCreate === true) {
      setName("")
      setSurname("")
      setUsername("")
      setPassword("")
      setEmail("")
      setMobile("")

      

      if (username === "" || username.length > 50) {
        toast.error("Username Required");
        return false;
      }

      if (password === "" || !passwordcheck.test(password)) {
        toast.error("Invalid Password! Password must contain atleast 1 uppercase letter, 1 lowercase letter and 1 numeric digit.");
        return false;
      }
    }

    

    if (name === "" || numbercharcheck.test(name) || name.length > 50) {
      toast.error("Name Required");
      return false;
    }

    if (surname === "" || numbercharcheck.test(surname) || surname.length > 50) {
      toast.error("Surname Required");
      return false;
    }

    if (email === "" || !emailcheck.test(email)) {
      toast.error("Email Required - Correct Format");
      return false;
    }

    if (mobile === "" || !numbercheck.test(mobile)) {
      toast.error("Mobile Required - Correct Format");
      return false;
    }

    return true;
  }

  // Toggle Modals
  const toggleModal = () => {
    setName("")
    setSurname("")
    setUsername("")
    setPassword("")
    setEmail("")
    setMobile("")

    setModal(!modal);
  };

  function toggleUpdateModal(index) {
    if (index === null) {
      setName("")
      setSurname("")
      setUsername("")
      setEmail("")
      setMobile("")

      setUpdateModal(!updatemodal)
    } else {
      setName(data[index].name)
      setSurname(data[index].surname)
      setEmail(data[index].email)
      setMobile(data[index].mobile)
      setisActive(data[index].isActive)
      setUserID(data[index].id)
  
      setUpdateModal(!updatemodal);
    }


  };

  // Logout
  const logout = () => {
    // You'll update this function later
    navigate("/");
    localStorage.clear()
  }

  useEffect(() => {
    if (userData !== null) {
      if (userData.roleID !== 1) {
        setDisable(true)
      }

      getData()
    } else {
      navigate("/");
    }


  }, []);


  // HTML
  return userData !== null ? (
    <div className='dashboard-main'>
      <nav className="navbar navbar-light bg-light" variant="dark" expand="lg" >
        <a>Welcome {userData.username}, you can CRUD here!</a>

        <div>
          <button  onClick={toggleModal} disabled={disable}>Create User</button>
          <button  onClick={logout}>Logout</button>
        </div>
      </nav>

      <ToastContainer limit={2}></ToastContainer>

      <div className='users-main'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Role Name</th>
              <th>IsActive</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {
              data.map((user, index) => {
                return <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.roleName}</td>
                  <td><input type="checkbox" checked={user.isActive} readOnly={true}></input></td>
                  <td><button  disabled={disable} onClick={() => toggleUpdateModal(index)}>Update</button></td>
                  <td><button  disabled={disable} onClick={() => deleteuser(index)}>Delete</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}

      <Modal isOpen={modal} style={customStyles}>
        <p> Create User </p>

        <div className='modal-content'>
          <input value={name} placeholder="Name"
            onChange={ev => setName(ev.target.value)} />

          <input value={surname} placeholder="Surname"
            onChange={ev => setSurname(ev.target.value)} />

          <input value={username} placeholder="Username"
            onChange={ev => setUsername(ev.target.value)} className={"inputBox"} />

          <input value={password} placeholder="Password"
            onChange={ev => setPassword(ev.target.value)} />

          <input value={email} placeholder="Email Address"
            onChange={ev => setEmail(ev.target.value)} />

          <input value={mobile} placeholder="Mobile Number"
            onChange={ev => setMobile(ev.target.value)} />

          <div className='modal-btn-con'>
            <div className='select-con'>
              <select value={role} onChange={ev => setRole(ev.target.value)}>
                <option value={1}>Super Admin</option>
                <option value={2}>Read Only</option>
              </select>
            </div>

            <div className='btn-con'>
              <button className='blue' onClick={validateUser}>Submit</button>
              <button className='red' onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal isOpen={updatemodal} style={customStyles}>
        <div className='modal-content'>
          <p>Update User</p>

          <input value={name} placeholder="Name"
            onChange={ev => setName(ev.target.value)} className={"inputBox"} />

          <input value={surname} placeholder="Surname"
            onChange={ev => setSurname(ev.target.value)} className={"inputBox"} />

          <input value={email} placeholder="Email Address"
            onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />

          <input value={mobile} placeholder="Mobile Number"
            onChange={ev => setMobile(ev.target.value)} className={"inputBox"} />

          <div className='modal-btn-con'>
            <div className='select-con'>
              <input type="checkbox" checked={isActive} onChange={ev => setisActive(ev.target.checked)} />
              <label>isActive</label>
            </div>

            <div className='btn-con'>
              <button className='blue' onClick={updateuser}>Submit</button>
              <button className='red' checked={isActive} onClick={() => toggleUpdateModal(null)}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div></div>
  )
}

export default Users