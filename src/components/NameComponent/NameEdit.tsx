import React, { FormEvent, Fragment, useState } from "react";
import { CardNameEdit } from "../SVGComponent/CardNameEditSVG";
import { useEditName } from "@/reactQueryHooks/useMutation";
import { Dialog, Transition } from "@headlessui/react";
import { CardDetails } from "../CardComponent/CardDetails";

export const NameEdit = (props: { name: string; id: string }) => {
  const { mutate: updateName } = useEditName();
  const [editOpen, setEditOpen] = React.useState(false);
  const [editedName, setEditedName] = useState("PokemonTCG");
  const handleEditOpen = () => setEditOpen(!editOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <CardDetails name={props.name}></CardDetails>
      <button
        className="absolute right-0 bg-rose-700 h-5 w-5 rounded flex justify-center items-center overflow-y-hidden"
        onClick={handleEditOpen}
      >
        <CardNameEdit />
      </button>
      <Transition.Root show={editOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-5"
          onClose={setEditOpen}
          open={editOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 dark:bg-black/50 bg-gray-700/500 backdrop-blur-xl transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center text-center items-center">
              <Transition.Child
                as={Fragment}
                enter="duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="duration-300"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 text-left shadow-xl transition-all flex justify-center my-8 sm:w-[500px] w-[300px]">
                  <form className="grid" onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-gray-600 px-4 pb-4 pt-5 p-6">
                      <div className="mt-3 mx-5">
                        <Dialog.Title
                          as="h3"
                          className="text-center font-semibold text-gray-900 dark:text-white"
                        >
                          Edit Name
                        </Dialog.Title>
                        <div className="mt-5">
                          <input
                            className="outline-1 focus:outline-rose-500 border-2 border-gray-500 rounded sm:p-3 p-2 sm:w-[400px] w-[250px] dark:text-black dark:bg-gray-200 text-[12px] sm:text-[16px]"
                            type="text"
                            autoComplete="off"
                            placeholder="Edit Name"
                            value={editedName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-600 px-4 py-3 pb-10">
                      <div className="m-auto">
                        <div className="px-10 grid grid-cols-2 text-[12px] sm:text-[16px]">
                          <div className="flex justify-start ">
                            <button
                              type="button"
                              className="form-button clear w-28 mr-2 sm:mr-0"
                              onClick={() => setEditOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="flex justify-end ">
                            <button
                              type="submit"
                              className="form-button submit w-28 ml-2 sm:ml-0"
                              onClick={() => {
                                setEditedName("PokemonTCG");
                                setEditOpen(false);
                                updateName({
                                  setId: props.id!,
                                  setName: editedName,
                                });
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
