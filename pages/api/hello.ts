// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const SUCCESS_STATUS_CODE = 200;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(SUCCESS_STATUS_CODE).json({ name: "John Doe" });
}
