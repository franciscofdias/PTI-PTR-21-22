import React, { useState } from "react";
import "./completeRegister.css";
import { useTranslation } from "react-i18next";
import DatePicker from "react-date-picker";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import EmptyProfilePic from "../../assets/blank-profile-picture.png";
import { ImCamera } from "react-icons/im";
import { Controller, useForm, useFormState } from "react-hook-form";
import { UpdateUser } from "../../_services/api";
import { toast, ToastContainer } from "react-toastify";
import { Cookies } from "react-cookie";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function CompleteRegister() {
    const { t } = useTranslation();
    const cookies = new Cookies();
    const history = useHistory();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm();

    const watchProfileImage = watch(["profileImage"]);

    const feebackBoxStyling = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        draggable: true,
        toastId: "You have an error in your form.",
    };

    let profileImageClass = "preview w-40 h-40 border-2 rounded-full ";
    let profileClass = "font-bold text-lg ";
    let nameClass = "font-bold text-lg ";
    let birthdayClass = "font-bold text-lg ";
    let phoneClass = "font-bold text-lg ";
    let accountTypeClass = "font-bold text-lg ";

    if (errors.profileImage) {
        profileImageClass += "border-red-800";
        profileClass += "text-maroon";
    } else {
        profileImageClass += "border-white";
        profileClass += "text-dark_blue";
    }

    if (errors.name) {
        nameClass += "text-maroon";
    } else {
        nameClass += "text-dark_blue";
    }

    if (errors.birthday) {
        birthdayClass += "text-maroon";
    } else {
        birthdayClass += "text-dark_blue";
    }

    if (errors.phone) {
        phoneClass += "text-maroon";
    } else {
        phoneClass += "text-dark_blue";
    }

    if (errors.accountType) {
        accountTypeClass += "text-maroon";
    } else {
        accountTypeClass += "text-dark_blue";
    }

    const errorSubmit = () => toast.dark("Error on submitting, please try again", feebackBoxStyling);

    const onSubmit = (data: any) => {
        console.log(data);
        completeRegister(data)
            .then((res) => {
                history.push("/home")
            })
            .catch((err) => {
                errorSubmit()
            });
    };
    const toBase64 = (file: any) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    function completeRegister(data: any) {
        let promise = new Promise((resolve, reject) => {
            toBase64(data.profileImage[0]).then((avatar) => {
                UpdateUser(
                    data.accountType,
                    data.name,
                    data.birthday,
                    data?.bankAccount,
                    data.phone,
                    avatar
                )
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
        return promise;
    }

    let previewImage =
        watchProfileImage[0] && watchProfileImage[0]?.length > 0
            ? URL.createObjectURL(watchProfileImage[0][0])
            : EmptyProfilePic;

    let calendarLocale: string;
    if (cookies.get("lang") === "0") {
        calendarLocale = "pt-PT";
    } else {
        calendarLocale = "en-EN";
    }

    return (
        <div className="bg-main">
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mx-20 md:mx-36 lg:mx-48">
                    <div className="flex-grow mt-8 mb-16">
                        <h1 className="text-dark_blue font-bold text-3xl text-center">
                            {t("pleaseComplete")}
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                            <label className={nameClass}>
                                {t("fullName")}*:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-9/12 border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="text"
                                placeholder={t("name")}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Please fill name",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Name must have atleast 3 or more letters",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.name &&
                                    toast.dark(
                                        errors.name.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            <br />
                            <label className={birthdayClass}>
                                {t("birthday")}*:
                            </label>
                            <br />
                            <Controller
                                name={"birthday"}
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill your birthday",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className="w-full md:w-9/12 border-none rounded-xl shadow-marta bg-white px-3 py-2 my-4"
                                        value={value}
                                        onChange={onChange}
                                        locale={calendarLocale}
                                        minDate={moment()
                                            .subtract(90, "years")
                                            .toDate()}
                                        maxDate={moment()
                                            .subtract(18, "years")
                                            .toDate()}
                                        defaultValue={moment()
                                            .subtract(18, "years")
                                            .toDate()}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.birthday &&
                                    toast.dark(
                                        errors.birthday.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                        <div className="flex-1 order-first md:order-none">
                            <label className={profileClass}>
                                {t("profilePic")}*:
                            </label>
                            {previewImage && (
                                <div className="flex justify-center">
                                    <div className="relative text-white content-center">
                                        <img
                                            className={profileImageClass}
                                            src={previewImage}
                                            alt=""
                                        />
                                        <div className="icon">
                                            <label
                                                htmlFor="upload"
                                                className="cursor-pointer"
                                            >
                                                <ImCamera className="ml-36 text-4xl" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                {...register("profileImage", {
                                    required: {
                                        value: true,
                                        message: "Pick a profile Image",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.profileImage &&
                                    toast.dark(
                                        errors.profileImage.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4">
                        <div className="flex-1">
                            <label className={phoneClass}>
                                {t("phoneNum")}*:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-9/12 border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="number"
                                placeholder={t("phone")}
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please fill your phone number",
                                    },
                                    minLength: {
                                        value: 9,
                                        message: "It must have 9 digits",
                                    },
                                    maxLength: {
                                        value: 9,
                                        message: "It must have 9 digits",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.phone &&
                                    toast.dark(
                                        errors.phone.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                        <div className="flex-1">
                            <label className={accountTypeClass}>
                                {t("accountType")}*:
                            </label>
                            <div className="mt-3 ml-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="Student"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("student")}
                                    </span>
                                </label>
                                <br />
                                <label className="inline-flex items-center my-2">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="Host"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("host")}
                                    </span>
                                </label>
                                <br />
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="ServiceProvider"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("serviceProvider")}
                                    </span>
                                </label>
                                <p className="hidden">
                                    {errors.accountType &&
                                        toast.dark(
                                            errors.accountType.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 mb-20">
                        <div className="flex-1">
                            <label className="font-bold text-dark_blue text-lg">
                                {t("bankAccount")}:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-9/12 border-none rounded-xl shadow-marta mt-4 focus:ring-0"
                                type="text"
                                placeholder={t("cardNum")}
                                {...register("bankAccount", {
                                    pattern: /[0-9]{16}[0-9]{3}?$/g, //this matches credit card numbers 1234-1234-1234-1234-123
                                    maxLength: 19,
                                })}
                            />
                        </div>
                        <div className="flex-1 flex justify-center items-end">
                            <button
                                className="items-center text-xl font-semibold w-3/5 shadow-marta focus:outline-none bg-beige_a_morrer py-2 px-3 rounded-xl hover:bg-dark_blue hover:text-white mt-16 md:mt-0"
                                type="submit"
                            >
                                {t("complete")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
}