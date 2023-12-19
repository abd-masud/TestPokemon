import Link from "next/link";
import useLogin from "@/reactQueryHooks/useLogin";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Close } from "../SVGComponent/XMarkSVG";

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logError, setError] = useState<boolean>(false);
  const [emptyField, setEmpty] = useState<boolean>(false);
  const { updateLogin, exUsername } = useLogin();
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (username == "codecamp" && password == "123") {
      router.push("/");
      exUsername();
      updateLogin("Logout");
    } else if (username == "" && password == "") {
      setEmpty(true);
      setError(false);
    } else {
      setEmpty(false);
      setError(true);
    }
  };

  return (
    <main className="bg-gray-300 dark:bg-gray-900">
      <div className="flex items-center justify-center sm:min-h-[760px] min-h-[85vh]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="shadow-2xl shadow-black border-[1px] border-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-white sm:w-[560px] w-[320px] ">
            <h2 className="sm:text-[35px] text-[25px] p-5 sm:pl-10 pl-5 sm:mb-5">
              Login
              <span className="float-right sm:mr-5 -mr-2">
                <Link href="/">
                  <button type="button">
                    <Close></Close>
                  </button>
                </Link>
              </span>
            </h2>

            <div className="sm:px-10 px-5 sm:mb-10 mb-5 grid text-[12px] sm:text-[16px]">
              <label htmlFor="username">Username : </label>
              <input
                className="input dark:text-black dark:bg-gray-300"
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                autoComplete="off"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="sm:px-10 px-5 mb-5 grid text-[12px] sm:text-[16px]">
              <label htmlFor="password">Password : </label>
              <input
                className="input dark:text-black dark:bg-gray-300"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center text-[12px] sm:text-[16px]">
              <span className="">
                {logError ? (
                  <span className="text-rose-500 font-bold">
                    Invalid Username or Password
                  </span>
                ) : (
                  <span className="text-transparent relative -z-10">.</span>
                )}
              </span>
              <span className="">
                {emptyField ? (
                  <span className="text-rose-500 font-bold">
                    Field can't be empty
                  </span>
                ) : (
                  <span className="text-transparent relative -z-10">.</span>
                )}
              </span>
            </div>
            <div className="p-5 pb-10 pt-3 grid grid-cols-2 text-[12px] sm:text-[16px]">
              <div className="flex justify-start sm:justify-center">
                <button
                  className="form-button clear w-32 "
                  type="button"
                  onClick={() => {
                    setUsername("");
                    setPassword("");
                    setError(false);
                    setEmpty(false);
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="flex justify-end sm:justify-center">
                <button
                  className="form-button submit w-32"
                  type="submit"
                  name="login"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
