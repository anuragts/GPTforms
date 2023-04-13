import { prisma } from "@/db/client"



export default async (email:string ) => {

    const exists = await prisma.user.findMany({
        where: { email  },
      });

      if (( exists).length > 0) {
        return true
      } else {
        return false
      }

}