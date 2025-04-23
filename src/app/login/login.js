"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@mui/material/Button";
import { TextField, InputAdornment, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from 'next/navigation'; // Change this to `next/navigation` for client-side navigation
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibilityoff';
import { SUPABASE_URL, API_KEY, BackgroundColor } from "../supabase";
import * as motion from "motion/react-client"
import validator from "validator";

const supabase = createClient(SUPABASE_URL, API_KEY);

const LoginDialog = ({
    handleUsername,
    handlePassword,
    showPassword,
    handleSignIn,
    open,
    handleSignUp
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 40 }}
            transition={{
                type: "spring",
                bounce: 0.02,
                stiffness: 300,
                damping: 100,
                mass: 10,
                duration: 2,
            }}
            className="flex align-center justify-center" style={{ marginTop: "25vh" }}>
            <Box sx={{ maxWidth: 400 }}>
                <div className="grid grid-flow-row gap-2 rounded-lg p-4 shadow-md shadow-cyan-950" style={{
                    background: "rgba(128, 128, 128, 0.45)", // Set the background with 15% opacity
                }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="email"
                        size="small"
                        color="success"
                        onChange={handleUsername}
                        style={{
                            background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                        }}
                        sx={{ input: { color: 'lime' }, label: { color: 'whitesmoke' } }}
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle sx={{ color: "whitesmoke" }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="password"
                        size="small"
                        color="success"
                        onChange={handlePassword}
                        style={{
                            background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                        }}
                        type={open ? "password" : "text"}
                        sx={{ input: { color: 'lime' }, label: { color: 'whitesmoke' } }}
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon sx={{ color: "whitesmoke" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <div>
                                        {open ? (
                                            <InputAdornment position="end">
                                                <Button onClick={showPassword}><VisibilityIcon sx={{ color: "whitesmoke", bgcolor: "transparent" }} /></Button>
                                            </InputAdornment>
                                        ) : (
                                            <InputAdornment position="end">
                                                <Button onClick={showPassword}><VisibilityOffIcon sx={{ color: "whitesmoke", bgcolor: "transparent" }} /></Button>
                                            </InputAdornment>
                                        )}
                                    </div>
                                ),
                            },
                        }}
                    />
                    <div className="grid grid-flow-col gap-1 mt-2">
                        <Button
                            size="small"
                            onClick={handleSignIn}
                            fullWidth={false}
                            sx={{
                                textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.8)", color: "#9af5f5",
                                '&:hover': {
                                    backgroundColor: BackgroundColor,
                                    color: 'white',
                                }
                            }}

                        >
                            Login
                        </Button>
                        <Button
                            size="small"
                            fullWidth={false}
                            onClick={handleSignUp}
                            sx={{
                                textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.8)", color: "#9af5f5",
                                '&:hover': {
                                    backgroundColor: BackgroundColor,
                                    color: 'white',
                                }
                            }}
                        >
                            Sign Up
                        </Button>

                    </div>
                </div>
            </Box>
        </motion.div>)
}

const SignUpDialog = ({
    handleConfirmPassword,
    handlePasswordEdit,
    handleEmail,
    handleLastName,
    handleFirstName,
    handleSignUpBack,
    handleSignUpSubmit,
    ErrorMessage,
    password,
    ConfirmPassword }) => {
    var Error_description = ErrorMessage.code

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 40 }}
            transition={{
                type: "spring",
                bounce: 0.02,
                stiffness: 300,
                damping: 100,
                mass: 10,
                duration: 2,
            }}
            className="flex align-center justify-center" style={{ marginTop: "25vh" }}>
            <Box sx={{ minWidth: 400, backgroundColor: "rgba(128, 128, 128, 0.45)" }}>
                <div className="grid grid-flow-row gap-2 rounded-lg shadow-md shadow-cyan-950 p-4">
                    <TextField
                        id="input-with-icon-textfield"
                        label="First Name"
                        size="small"
                        onChange={handleFirstName}
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Last Name"
                        size="small"
                        onChange={handleLastName}
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Cell"
                        size="small"
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Address"
                        size="small"
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="email"
                        size="small"
                        onChange={handleEmail}
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Password"
                        size="small"
                        onChange={handlePasswordEdit}
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Confirm Password"
                        onChange={handleConfirmPassword}
                        size="small"
                        sx={{ borderColor: "116d80" }}
                        variant="standard"
                        color={ConfirmPassword === password ? "success" : "error"}
                    />
                    {ErrorMessage === "" ? null : <div className="text-sm text-cyan-900 font-bold text-center justify-center">{Error_description}</div>}
                    <div className="grid grid-cols-2 gap-1 mt-2">
                        <Button
                            size="small"
                            fullWidth={false}
                            onClick={handleSignUpSubmit}
                            sx={{
                                textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.80)", color: "#9af5f5",
                                '&:hover': {
                                    backgroundColor: BackgroundColor,
                                    color: 'white',
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            size="small"
                            fullWidth={false}
                            onClick={handleSignUpBack}
                            sx={{
                                textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.80)", color: "#9af5f5",
                                '&:hover': {
                                    backgroundColor: BackgroundColor,
                                    color: 'white',
                                }
                            }}
                        >
                            Back
                        </Button>

                    </div>
                </div>
            </Box>
        </motion.div>
    )
}

const Login = () => {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [SignUpPassword, setSignUpPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [auth, setAuth] = useState(true);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");


    const router = useRouter(); // Use useRouter from next/navigation for client-side routing

    async function handleSignIn() {
        try {
            const response = await supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });

            localStorage.setItem("user_id", response.data.user.id)

            // Access properties directly from the raw response
            const { user, session, error } = response;

            if (error) {
                console.error("Error during sign-in:", error.message);
                return;
            }

            if (session) {
                await supabase.auth.setAuth(session.access_token);
            }
            router.push("/");
        } catch (err) {
            console.error("Error during sign-in:", err);
        }
    }


    async function handleSignUpSubmit() {
        const { data, error } = await supabase.auth.signUp({
            email: Email,
            password: SignUpPassword,
            options: {
                emailRedirectTo: '/',
            },
        })
        if (error) {
            setErrorMessage(error)
        }
    }

    const showPassword = () => { setOpen(!open); };
    const handleUsername = (e) => { setUsername(e.target.value); };
    const handlePassword = (e) => { setPassword(e.target.value); };
    const handlePasswordEdit = (e) => { setSignUpPassword(e.target.value); };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (validator.isEmail(Email)) {
            console.log("valid email")
        } else {
            console.log("not valid email")
        }
    };

    const handleLastName = (e) => { setLastName(e.target.value); };
    const handleFirstName = (e) => { setFirstName(e.target.value); };
    const handleSignUp = () => { setAuth(false) }
    const handleSignUpBack = () => { setAuth(true) }

    return (
        <React.Fragment>
            {auth ?
                <LoginDialog
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    showPassword={showPassword}
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                    open={open} />
                :
                <SignUpDialog
                    handleConfirmPassword={handleConfirmPassword}
                    handlePasswordEdit={handlePasswordEdit}
                    handleEmail={handleEmail}
                    handleLastName={handleLastName}
                    handleFirstName={handleFirstName}
                    handleSignUpBack={handleSignUpBack}
                    handleSignUpSubmit={handleSignUpSubmit}
                    ErrorMessage={ErrorMessage}
                    password={password}
                    ConfirmPassword={ConfirmPassword}
                />
            }
        </React.Fragment>
    );
};

export default Login;
