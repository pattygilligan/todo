import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    //check if allowed to get
    const initialData = [
      { text: "item 1", done: false, date: "2004-03-23", id: "0" },
      { text: "item 2", done: false, date: "2004-03-23", id: "1" },
      { text: "item 3", done: false, date: "2004-03-23", id: "2" },
      { text: "item 4", done: false, date: "2004-03-23", id: "3" },
    ];
    res.status(200).json({ todoList: initialData });
  } else if (req.method === "POST") {
    //check if allowed to post
    const data = req.body;
    console.log("adding data to database");
    console.log(data);
    res.status(200).json({ message: "data added to database", data });
  } else {
    res.status(405).json("method not allowed");
  }
}
