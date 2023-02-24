import axios from "axios";

const url = "http://localhost:8000";

async function signup(name, email, phone, password, role) {
  try {
    let res = await axios.post(`${url}/auth/signup`, {
      name,
      email,
      phone,
      password,
      role,
    });

    return await res.data;
  } catch (err) {
    return {
      status: "error",
      msg: "error occurred while registering, try again...",
    };
  }
}

async function login(email, password) {
  try {
    let res = await axios.post(`${url}/auth/login`, {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    return {
      status: "error",
      msg: "error occurred while logging in, try again...",
    };
  }
}

async function isLoggedIn() {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      let res = await axios.get(`${url}/auth/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
          // token: `Bearer ${token}`,
          // token: `${token}`,
        },
      });
      res = await res.data;
      if (res.status == "success") {
        return {
          status: true,
          name: res.data.name,
          role: res.data.role,
        };
      } else {
        return { status: false, msg: "not logged in" };
      }
    } catch (err) {
      return { status: false, msg: "not logged in" };
    }
  } else {
    return { status: false, msg: "not logged in" };
  }
}

async function logout() {
  let token = localStorage.getItem("token");
  localStorage.removeItem("token");
  window.location = "/";
  return;
  try {
    let res = await axios.post(
      `${url}/user/logout`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    res = await res.data;
    prof.value = { status: false };
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function createSlots(reg_date, fees, activity_type, slots) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.post(
      `${url}/trainer/addslot`,
      { reg_date, fees, activity_type, slots },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return await res.data;
  } catch (err) {
    // console.log(err);
    return { status: "error", msg: "something went wrong while opening slots" };
  }
}

async function getFreeSlots(reg_date, activity_type) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.get(
      `${url}/trainer/availableslots?selected_date=${reg_date}&type=${activity_type}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.data;
  } catch (err) {
    return {
      status: "error",
      msg: "something went wrong while fetching empty slots",
    };
  }
}

async function getBookedSlots() {}

async function updatedBookedSlots() {}

async function reserveSlot(id, slots) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.patch(
      `${url}/trainer/updateslot`,
      {
        id,
        slots,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.data;
  } catch (err) {
    return { status: "error", msg: "error while reserving slot " };
  }
}

async function closeAllSlots(id) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.delete(`${url}/trainer/closeslot/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await res.data;
  } catch (err) {
    console.log(err);
    return { status: "error", msg: "error while deleting slots" };
  }
}

async function getAllTrainings(reg_date, type, sort) {
  console.log(reg_date, type, sort);
  return {
    data: [
      {
        id: 1,
        name: "Rohit",
        email: "rhans@icloud.com",
        activity_type: "Yoga",
        fee: 1000,
        six: true,
        seven: true,
        six_eve: true,
      },
      {
        id: 1,
        name: "Rohit",
        email: "rhans@icloud.com",
        activity_type: "Fat Loss",
        fee: 1000,
        six: true,
        seven: true,
        six_eve: true,
      },
      {
        id: 1,
        name: "Brijesh",
        email: "brijesh@icloud.com",
        activity_type: "Gym",
        fee: 1500,

        ten: true,
        eleven: true,
        four: true,
        five: true,
      },
      {
        id: 1,
        name: "Brijesh",
        email: "brijesh@icloud.com",
        activity_type: "Diet",
        fee: 500,

        eight: true,
        twelve: true,
        three: true,
        seven_eve: true,
      },
      {
        id: 1,
        name: "Brijesh",
        email: "brijesh@icloud.com",
        activity_type: "Weight Gain",
        fee: 500,

        eight: true,
        twelve: true,
        three: true,
        seven_eve: true,
      },
    ],
  };
}

async function bookTraining() {}
export {
  isLoggedIn,
  logout,
  signup,
  login,
  createSlots,
  getFreeSlots,
  reserveSlot,
  closeAllSlots,
  getAllTrainings,
  bookTraining,
};
