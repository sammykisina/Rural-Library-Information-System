import React from "react";
import { Icons } from "./icons";

type EmptyProps = {
  title: string;
};

const Empty: React.FC<EmptyProps> = ({ title }) => {
  return (
    <div className="grid h-[70vh] place-content-center  px-4">
      <div className="text-center flex flex-col justify-center items-center">
        <Icons.file className="h-20 w-20 font-black text-gray-200" />

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default Empty;
