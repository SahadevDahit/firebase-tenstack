
import * as z from "zod";
const formSchema = z
    .object({
        username: z.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
        email: z.string().email({
            message: "Invalid email address.",
        }),
        password: z.string().min(5).max(15, {
            message: "Password must be between 5 and 15 characters.",
        }),
        confirmPassword: z.string().min(5),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });
const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export { formSchema, initialValues }