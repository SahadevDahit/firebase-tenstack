import {
    doc,
    addDoc,
    getDoc,
    getDocs,
    collection,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/config";
import { employee } from "@/types/user";
const fetchEmployees = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const employeeData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return employeeData;
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
};

const addEmployee = async (employeeData: employee) => {
    const { name, email, phone, position } = employeeData;
    try {
        await addDoc(collection(db, "employees"), {
            name,
            email,
            phone,
            position,
        });
        alert("sucessfully added");


    } catch (err) {
        console.log(err);
    }
};
const deleteEmployee = async (id: string) => {
    await deleteDoc(doc(db, "employees", id))
        .then((result) => {
            alert("sucess to delete")
        })
        .catch((err) => {
            console.log(err);
        });
};
const updateEmployee = async (updatedData: any) => {
    try {
        const docRef = doc(db, "employees", updatedData.id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Document exists, update its data


            await updateDoc(docRef, updatedData);
            alert("sucessfully updated");
        } else {
            console.log("Document does not exist");
            alert("Document does not exist")
        }
    } catch (error) {
        console.error("Error updating employee by ID:", error);
        alert("Error updating employee by ID")
    }
};

const employeeById = async (id: string) => {
    try {
        const docRef = doc(db, "employees", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const employeeDataWithId = {
                id: docSnapshot.id,
                ...docSnapshot.data(),
            };
            console.log(employeeDataWithId);
            return employeeDataWithId;
        } else {
            console.log("Document does not exist");
            alert("unable to fetch");
        }
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
    }
};


export { fetchEmployees, addEmployee, deleteEmployee, updateEmployee, employeeById };