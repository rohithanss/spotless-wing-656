import axios from "axios";

const url = "https://brohfitness.onrender.com";
// const url = "http://localhost:8000";

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
      data: [],
    };
  }
}

async function getBookedSlots(reg_date, activity_type) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.get(
      `${url}/booking/trainer?selected_date=${reg_date}&type=${activity_type}`,
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
      msg: "something went wrong while fetching booked slots",
      data: [],
    };
  }
}

async function updatedBookedSlots(id, zoom_link, booking_status) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.patch(
      `${url}/trainer/updateslotdetails`,
      {
        id,
        zoom_link,
        booking_status,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.data;
  } catch (err) {
    return { status: "error", msg: "error while updating slot details" };
  }
}

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
  let token = localStorage.getItem("token");
  try {
    let res = await axios.get(
      `${url}/user/availableslots?selected_date=${reg_date}&type=${type}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      msg: "something went wrong while fetching slots",
      data: [],
    };
  }
}

async function bookTraining(trainer_id, booked_date, slot, type, fees) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.post(
      `${url}/booking/bookslot`,
      {
        trainer_id,
        booked_date,
        slot,
        type,
        fees,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    res = await res.data;

    return res;
  } catch (err) {
    return { status: "error", msg: "error while booking training slot" };
  }
}

async function getMyBookings(reg_date, activity_type) {
  let token = localStorage.getItem("token");
  try {
    let res = await axios.get(
      `${url}/booking/user?selected_date=${reg_date}&type=${activity_type}`,
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
      msg: "something went wrong while fetching my bookings",
    };
  }
}

export {
  isLoggedIn,
  logout,
  signup,
  login,
  createSlots,
  getFreeSlots,
  reserveSlot,
  closeAllSlots,
  getBookedSlots,
  updatedBookedSlots,
  getAllTrainings,
  bookTraining,
  getMyBookings,
};
