interface user {
    username: string;
    email: string;
    password: string;
}
interface employee {
    id: string;
    name: string,
    email: string,
    phone: number,
    position: string
}
const initialEmployeeState: employee = {
    id: "",
    name: "",
    email: "",
    phone: 0,
    position: "",
};


export type { user, employee, }
export { initialEmployeeState }