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

bookingRouter.get("/trainer", authRole(["trainer"]), async (req, res) => {
  const { userID } = req.body;
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0];
  const q = req.query;
  const queDate = q?.selected_date;
  const types = q?.types;
  if (queDate === "nodate") {
    await appointments
      .findAll({
        where: {
          trainer_id: userID,

          booked_date: {
            [Op.gte]: curr_date,
          },
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .send({ status: "error", msg: "error getting trainer bookings" });
      });
  } else {
    await appointments
      .findAll({
        where: {
          trainer_id: userID,
          booked_date: queDate,
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: "error",
          msg: "error getting trainer bookings for selected date",
        });
      });
  }
});
