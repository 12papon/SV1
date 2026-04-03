import userTest from "../../model/userTest.js";

const getTestUser = async (req, res) => {
  const body = req.query.email;
  console.log(body);
  
  const user = await userTest.findOne({ email: body });
  if (user) {
    return res.status(200).json({
      status: true,
      data: user,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "Not found",
    });
  }
};

export default getTestUser;
