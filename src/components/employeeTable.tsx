"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees, deleteEmployee, employeeById } from "@/api/employees";
interface EmployeeFormProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const EmployeeTable: React.FC<EmployeeFormProps> = ({ setId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 10000,
  });
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteEmployee(id);
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });

  // Check if data is still loading
  if (isLoading) {
    return <div>Loading...</div>; // You can show a loading indicator
  }
  // Check if there's an error during data fetching
  if (error) {
    return <div>Error loading data: {error.message}</div>; // Show an error message
  }

  return (
    <div className="flex flex-col min-h-full text-white justify-center px-6 py-12 lg:px-15">
      <div className="sm:mx-auto sm:w-full sm:max-w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Employee Table
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-full border border-solid border-3 rounded-lg border-black-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Phone
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((employee: any, index: number) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee?.phone}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {employee?.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setId(employee?.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deleteEmployeeMutation.mutate(employee?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
