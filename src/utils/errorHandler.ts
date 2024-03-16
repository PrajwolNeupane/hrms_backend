import { Response } from "express";

export default function errorHanlder({
  res,
  e,
  title,
  message,
  code,
}: {
  res: Response<any>;
  e?: any;
  title: string;
  message: string;
  code: number;
}) {
  if (e) {
    console.log(`Error on : ${title}`);
    console.log(e);
  }
  return res.status(code).json({
    title,
    message,
    success: false,
  });
}
