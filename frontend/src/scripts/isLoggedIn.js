import axios from "axios";

async function isLoggedIn(url) {
  let token = localStorage.getItem("token");
  if (token) {
    console.log(token, url);
    try {
      let res = await axios.get(`${url}/auth/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
          // token: `Bearer ${token}`,
          // token: `${token}`,
        },
      });
      res = await res.data;
      console.log(res);
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
      console.log(err);
      return { status: false, msg: "not logged in" };
    }
  } else {
    return { status: false, msg: "not logged in" };
  }
}

export default isLoggedIn;
