import * as Yup from 'yup'

export const validationSignSchema = Yup.object({
    name: Yup.string()
    .min(2, "Name must be at least 2 Characters")
    .max(30, "Name must be less than 30 Characters")
    .matches(/^[A-Za-z ]{2,30}$/,"Invalid name format")
    .required("Full name is required"),

    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format")
    .required("Email is required"),

    gender: Yup.string()
    .oneOf(['male', 'female', 'other'], "Please select a gender")
    .required("Gender is required"),

    password: Yup.string()
    .min(8, "Password must be at least 8 Characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
    "Password must contain at least one uppercase letter, one lowercase letter, and one number")
    .required("Password is required"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Please confirm your password"),
});

export const validationLoginSchema = Yup.object({
    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format")
    .required("Email is required"),

    password: Yup.string()
    .min(8, "Password must be at least 8 Characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
    "Password must contain at least one uppercase letter, one lowercase letter, and one number")
    .required("Password is required")
});