import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    FiCheck,
    FiChevronLeft,
    FiChevronRight,
    FiCheckCircle,
} from "react-icons/fi";

function MultiStepForm() {
    const [step, setStep] = useState(1);

    const validationSchemas = {
        1: Yup.object({
            firstName: Yup.string()
                .required("First Name is required"),

            lastName: Yup.string()
                .required("Last Name is required"),
        }),

        2: Yup.object({
            city: Yup.string()
                .required("City is required"),

            country: Yup.string()
                .matches(/^[A-Za-z\s]*$/, "Country must only contain letters")
                .required("Country is required"),
        }),

        3: Yup.object({
            email: Yup.string()
                .email("Invalid Email")
                .required("Email is required"),

            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            city: "",
            country: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchemas[step],
        validateOnMount: false,
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: (values, { resetForm }) => {
            alert("Form Submitted Successfully!");
            console.log("Submitted Data:", values);
            
            // Clear all data and go back to step 1
            resetForm({
                values: {
                    firstName: "",
                    lastName: "",
                    city: "",
                    country: "",
                    email: "",
                    password: "",
                },
                touched: {},
                errors: {}
            });
            setStep(1);
        },
    });

    const nextStep = async () => {
        let fieldsToTouch = {};

        if (step === 1) {
            fieldsToTouch = { ...formik.touched, firstName: true, lastName: true };
        } else if (step === 2) {
            fieldsToTouch = { ...formik.touched, city: true, country: true };
        } else if (step === 3) {
            fieldsToTouch = { ...formik.touched, email: true, password: true };
        }

        formik.setTouched(fieldsToTouch);

        const errors = await formik.validateForm();

        const currentStepHasErrors = Object.keys(fieldsToTouch).some(
            (field) => errors[field]
        );

        if (!currentStepHasErrors && step < 3) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const getInputClass = (fieldName) => {
        const hasError = formik.touched[fieldName] && formik.errors[fieldName];

        return `
    w-full px-4 py-3 rounded-xl border
    transition-all duration-200
    focus:outline-none focus:ring-4
    ${hasError
                ? "border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
            }
  `;
    };

    return (
        <>
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-10">
                    {/* Header Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                            Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Setup</span>
                        </h1>
                        <p className="text-sm text-slate-500">Please fill out your details to continue.</p>
                    </div>

                    {/* Visual Progress Stepper */}
                    <div className="relative flex items-center justify-between mb-10 px-2">
                        {/* Background Line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
                        {/* Active Line */}
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full -z-10 transition-all duration-500 ease-out"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        ></div>

                        {/* Step Indicators */}
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-[3px] transition-all duration-500 shadow-sm
            ${step > i ? "bg-indigo-600 border-indigo-600 text-white" : ""}
            ${step === i ? "bg-white border-indigo-600 text-indigo-600 scale-110 shadow-indigo-200" : ""}
            ${step < i ? "bg-white border-slate-200 text-slate-400" : ""}
          `}
                            >
                                {step > i ? <FiCheck size={18} strokeWidth={3} /> : i}
                            </div>
                        ))}
                    </div>

                    {/* Form Body */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (step === 3) {
                            formik.handleSubmit(e);
                        } else {
                            nextStep();
                        }
                    }}>

                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <div className="space-y-5 animate-in fade-in duration-500">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="e.g. Jane"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("firstName")}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.firstName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="e.g. Doe"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("lastName")}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location Info */}
                        {step === 2 && (
                            <div className="space-y-5 animate-in fade-in duration-500">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="e.g. New York"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("city")}
                                    />
                                    {formik.touched.city && formik.errors.city && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.city}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="e.g. United States"
                                        value={formik.values.country}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^[A-Za-z\s]*$/.test(val)) {
                                                formik.handleChange(e);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("country")}
                                    />
                                    {formik.touched.country && formik.errors.country && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.country}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Account Credentials */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in fade-in duration-500">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="jane.doe@example.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("email")}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={getInputClass("password")}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1">
                                            {formik.errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Form Navigation Controls */}
                        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                            {/* Previous Button Placeholder / Button */}
                            <div className="w-1/3">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition-all duration-200 active:scale-95"
                                    >
                                        <FiChevronLeft size={18} />
                                        <span>Back</span>
                                    </button>
                                )}
                            </div>

                            {/* Next / Submit Button */}
                            <div className="flex justify-end w-2/3">
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center gap-2 px-7 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                    >
                                        <span>Continue</span>
                                        <FiChevronRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-7 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-md shadow-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                    >
                                        <span>Complete Setup</span>
                                        <FiCheckCircle size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}

export default MultiStepForm;