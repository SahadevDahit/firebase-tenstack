"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { employee, initialEmployeeState } from "@/types/user";
import { addEmployee, updateEmployee, employeeById } from "@/api/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EmployeeFormProps {
  id: React.Dispatch<React.SetStateAction<string>>;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ id }) => {
  const [employeeData, setEmployeeData] =
    useState<employee>(initialEmployeeState);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchEmployeeData = async (id: any) => {
      const selectedEmployee = await employeeById(id);
      setEmployeeData(selectedEmployee);
    };
    if (id) {
      fetchEmployeeData(id);
    }
  }, [id]);

  const addEmployeeMutation = useMutation({
    mutationFn: async () => {
      await addEmployee(employeeData);
    },
    onSuccess: () => {
      console.log("success");
      setEmployeeData(initialEmployeeState);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });
  const updateEmployeeMutation = useMutation({
    mutationFn: async () => {
      await updateEmployee(employeeData);
    },
    onSuccess: () => {
      console.log("success");
      setEmployeeData(initialEmployeeState);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-15">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Employees !!! Ready to manage tasks
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-solid border-3 rounded-lg border-black-700">
          <form className="space-y-6 p-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Name
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required={true}
                  value={employeeData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  value={employeeData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-white"
              >
                Phone
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="tel"
                  required={true}
                  value={employeeData.phone}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Position Field */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-white"
              >
                Position
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="position"
                  name="position"
                  type="text"
                  autoComplete="position"
                  required={true}
                  value={employeeData.position}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => addEmployeeMutation.mutate()}
              >
                Add
              </button>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => updateEmployeeMutation.mutate()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
