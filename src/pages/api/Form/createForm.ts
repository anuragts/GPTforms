import type { NextApiRequest, NextApiResponse } from "next";
import  {prisma}  from "@/db/client";

interface Form {
    name: string;
    description: string;
    user_id: number;
}

export default async (req:NextApiRequest,res:NextApiResponse) => {
    const {name , description , user_id } :Form = req.body;

    
}