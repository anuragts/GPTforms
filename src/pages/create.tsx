import Link from "next/link";

export default function create() {
  return (
    <div className="flex justify-center mt-10">
      <Link
        href="/form/normal"
        className="bg-indigo-600 hover:bg-indigo-700 text-3xl py-8 px-10 mx-[2rem]   mt-[20%] text-white font-bold  rounded-lg  cursor-pointer transition-all duration-200"
      >
        Manual Creation
      </Link>
      <Link
        href="/form/AI"
        className="bg-indigo-600 hover:bg-indigo-700 text-3xl py-8 px-10 mx-[2rem]  mt-[20%] text-white font-bold  rounded-lg  cursor-pointer transition-all duration-200"
      >
        Create using AI
      </Link>
    </div>
  );
}
