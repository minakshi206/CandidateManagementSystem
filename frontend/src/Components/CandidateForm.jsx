import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box
} from "@mui/material";


function CandidateForm({
    open,
    onClose,
    onSave,
    candidate
}) {

    const [form, setForm] = useState({
        candidateName: "",
        email: "",
        mobileNumber: "",
        dateOfBirth: "",
        gender: "",
        qualification: "",
        experience: "",
        skills: "",
        preferredLocation: "",
        employmentType: "",
        status: "Active"
    });


    const [errors, setErrors] = useState({});


    // Fill form when editing a candidate
    useEffect(() => {

        if (candidate) {

            setForm({
                candidateName: candidate.candidateName || "",
                email: candidate.email || "",
                mobileNumber: candidate.mobileNumber || "",
                dateOfBirth: candidate.dateOfBirth
                    ? candidate.dateOfBirth.split("T")[0]
                    : "",
                gender: candidate.gender || "",
                qualification: candidate.qualification || "",
                experience: candidate.experience !== null &&
                    candidate.experience !== undefined
                    ? candidate.experience.toString()
                    : "",
                skills: candidate.skills || "",
                preferredLocation: candidate.preferredLocation || "",
                employmentType: candidate.employmentType || "",
                status: candidate.status || "Active"
            });

        } else {

            setForm({
                candidateName: "",
                email: "",
                mobileNumber: "",
                dateOfBirth: "",
                gender: "",
                qualification: "",
                experience: "",
                skills: "",
                preferredLocation: "",
                employmentType: "",
                status: "Active"
            });

        }

        setErrors({});

    }, [candidate, open]);


    function handleChange(e) {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });

    }


    function validate() {

        const newErrors = {};


        if (!form.candidateName.trim()) {
            newErrors.candidateName =
                "Candidate name is required";
        }


        if (!form.email.trim()) {
            newErrors.email =
                "Email is required";
        }


        if (!form.mobileNumber.trim()) {
            newErrors.mobileNumber =
                "Mobile number is required";
        }


        if (!form.dateOfBirth) {
            newErrors.dateOfBirth =
                "Date of birth is required";
        }


        if (!form.gender) {
            newErrors.gender =
                "Gender is required";
        }


        if (!form.qualification.trim()) {
            newErrors.qualification =
                "Qualification is required";
        }


        if (!form.experience) {
            newErrors.experience =
                "Experience is required";
        }


        if (!form.skills.trim()) {
            newErrors.skills =
                "Skills are required";
        }


        if (!form.preferredLocation.trim()) {
            newErrors.preferredLocation =
                "Preferred location is required";
        }


        if (!form.employmentType) {
            newErrors.employmentType =
                "Employment type is required";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }


    function handleSubmit() {

        if (!validate()) {
            return;
        }

        onSave(form);

    }


    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: "#172033",
                    fontSize: "24px"
                }}
            >
                {candidate
                    ? "Edit Candidate"
                    : "Add Candidate"}
            </DialogTitle>


            <DialogContent>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr"
                        },
                        gap: 2,
                        mt: 1
                    }}
                >

                    {/* Candidate Name */}

                    <TextField
                        fullWidth
                        label="Candidate Name"
                        name="candidateName"
                        value={form.candidateName}
                        onChange={handleChange}
                        error={!!errors.candidateName}
                        helperText={errors.candidateName}
                    />


                    {/* Email */}

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />


                    {/* Mobile */}

                    <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobileNumber"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        error={!!errors.mobileNumber}
                        helperText={errors.mobileNumber}
                    />


                    {/* Date of Birth */}

                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                    />


                    {/* Gender */}

                    <TextField
                        select
                        fullWidth
                        label="Gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        error={!!errors.gender}
                        helperText={errors.gender}
                    >

                        <MenuItem value="Male">
                            Male
                        </MenuItem>

                        <MenuItem value="Female">
                            Female
                        </MenuItem>

                        <MenuItem value="Other">
                            Other
                        </MenuItem>

                    </TextField>


                    {/* Qualification */}

                    <TextField
                        fullWidth
                        label="Qualification"
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                        error={!!errors.qualification}
                        helperText={errors.qualification}
                    />


                    {/* Experience */}

                    <TextField
                        select
                        fullWidth
                        label="Experience"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        error={!!errors.experience}
                        helperText={errors.experience}
                    >

                        <MenuItem value="0">
                            Fresher
                        </MenuItem>

                        <MenuItem value="1">
                            1 Year
                        </MenuItem>

                        <MenuItem value="2">
                            2 Years
                        </MenuItem>

                        <MenuItem value="3">
                            3 Years
                        </MenuItem>

                        <MenuItem value="4">
                            4 Years
                        </MenuItem>

                        <MenuItem value="5">
                            5+ Years
                        </MenuItem>

                    </TextField>


                    {/* Skills */}

                    <TextField
                        fullWidth
                        label="Skills"
                        name="skills"
                        placeholder="C#, SQL, ASP.NET Core"
                        value={form.skills}
                        onChange={handleChange}
                        error={!!errors.skills}
                        helperText={errors.skills}
                    />


                    {/* Preferred Location */}

                    <TextField
                        fullWidth
                        label="Preferred Location"
                        name="preferredLocation"
                        value={form.preferredLocation}
                        onChange={handleChange}
                        error={!!errors.preferredLocation}
                        helperText={errors.preferredLocation}
                    />


                    {/* Employment Type */}

                    <TextField
                        select
                        fullWidth
                        label="Employment Type"
                        name="employmentType"
                        value={form.employmentType}
                        onChange={handleChange}
                        error={!!errors.employmentType}
                        helperText={errors.employmentType}
                    >

                        <MenuItem value="Full Time">
                            Full Time
                        </MenuItem>

                        <MenuItem value="Part Time">
                            Part Time
                        </MenuItem>

                        <MenuItem value="Contract">
                            Contract
                        </MenuItem>

                    </TextField>

                </Box>

            </DialogContent>


            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <Button
                    onClick={onClose}
                    sx={{
                        textTransform: "none"
                    }}
                >
                    Cancel
                </Button>


                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        textTransform: "none",
                        px: 3
                    }}
                >
                    {candidate
                        ? "Update Candidate"
                        : "Save Candidate"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default CandidateForm;