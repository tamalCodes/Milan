//* All the AXIOS API calls will be made from here to the backend
//* These functions will be exported and then imported wherever needed

import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const API = import.meta.env.VITE_MILANAPI;
const API = "http://localhost:5000";

const User_Log = `${API}/user/login`;
const User_Reg = `${API}/user/register`;
const User_Updt = `${API}/user/update`;
const Club_Log = `${API}/club/login`;
const Club_Reg = `${API}/club/register`;
const All_Clubs = `${API}/display/clubs`;
const Report_Log = `${API}/user/userreport`;

const All_Events = `${API}/display/allevents`;
const Contact_Us = `${API}/user/contactus`;
const Create_Event = `${API}/club/createevent`;
const loginSuccess = `${API}/auth/login/success`;

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to login a User
//* IF success we alert user made else we alert user failed
//* we get the credentials from the Awb.jsx

//* UPDATE USER
export const UpdateUser = async (credentials) => {
  try {
    const response = await Axios.post(User_Updt, credentials);
    const success_message = response.data.message;
    if (success_message) {
      alert(success_message);
      return response;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

//* LOGIN USER
export const LoginUser = async (credentials) => {
  try {
    const User = await Axios.post(User_Log, credentials);
    return User;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* REGISTER USER
export const RegisterUser = async (credentials) => {
  try {
    const response = await Axios.post(User_Reg, credentials);
    console.log(response);
  } catch (error) {
    toast.warning(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* LOGIN CLUB
export const LoginClub = async (credentials) => {
  try {
    const Post = await Axios.post(Club_Log, credentials);
    return Post;
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

//* REGISTER CLUB
export const RegisterClub = async (credentials) => {
  try {
    const response = await Axios.post(Club_Reg, credentials);
    console.log(response);
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* GET ALL CLUBS
export const GetAllClubs = async () => {
  try {
    const response = await Axios.get(All_Clubs);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* Get single club details

export const getClubDetails = async (id) => {
  try {
    const response = await Axios.get(`${API}/display/clubs?id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* REPORT PROBLEMS
export const ReportProblem = async (credentials) => {
  try {
    const response = await Axios.post(Report_Log, credentials);
    if (response.data.success === true) {
      return true;
    } else if (response.data.message === "tryagain") {
      return "tryagain";
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* GET ALL EVENTS
export const GetAllEvents = async () => {
  try {
    const response = await Axios.get(All_Events);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//* CONTACT
export const Contact = async (formData) => {
  try {
    const response = await Axios.post(Contact_Us, formData);
    return response;
  } catch (error) {
    return error;
  }
};

//* CREATE EVENT

export const CreateEvent = async (eventdata) => {
  try {
    const response = await Axios.post(Create_Event, eventdata);
    return response;
  } catch (error) {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error);
  }
};

//* Google Auth screen

export const GoogleAuth = async () => {
  try {
    const response = await Axios.get(`${API}/auth/google`);
    return response.data.url;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
    console.log(error);
  }
};

//* Google Auth callback
export const successCallback = async () => {
  try {
    const response = await Axios.get(loginSuccess, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const resObject = response.data;
      // console.log("this is accessToken", resObject.accessToken);

      return resObject.accessToken;
    } else {
      throw new Error("Authentication has failed");
    }
  } catch (err) {
    console.log(err);
  }
};

//* Google logout

export const logoutCallback = async () => {
  try {
    const response = await Axios.get(`${API}/auth/logout`);

    if (response.data.success) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
