import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Du bist nicht eingeloggt" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const userRequest = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await userRequest.json();

    if (user.success) {
      res.status(200).json({ user: user.data });
    } else {
      res.status(403).json({ message: "Dazu bist du nicht berechtigt" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
