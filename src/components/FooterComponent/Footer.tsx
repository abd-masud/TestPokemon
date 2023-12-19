import React from "react";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <main className="bg-black text-white relative z-10 h-20 flex items-center justify-center">
      <p className="text-center sm:text-[16px] text-[12px]">
        Copyright © 2023 ABD. All Rights Reserved
        <br />
        Developed With <span className="text-rose-500">&#10084;</span> By&nbsp;
        <Link
          target="_blank"
          className="underline"
          href={"https://www.linkedin.com/in/abdmasud2000/"}
        >
          Abdullah Al Masud
        </Link>
      </p>
    </main>
  );
}
