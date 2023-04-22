import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl text-center mb-12">Successfully submitted form!</div>
      <div className="w-64 bg-blue-500 text-3xl text-white font-bold py-6 px-8 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 transition duration-300">
        <Link href={"/form/create"}>Create a Form</Link>
      </div>
    </div>
  );
}
