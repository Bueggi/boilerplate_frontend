import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
    });

    const data = await tokenRes.json();
    console.log(data);
    console.log("hallo");

    if (data.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.token, {
          httpOnly: true,
          // secure: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res
        .status(200)
        .json({ success: true, token: data.token, data: data.data });
    } else {
      res.status(401).json({
        success: false,
        error: data.error,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ success: false, error: "Diese Methode ist nicht erlaubt" });
  }
};
