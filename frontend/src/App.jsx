import { useEffect, useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
    Paper,
    TextField,
    MenuItem,
    Chip,
    IconButton
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CandidateForm from "./Components/CandidateForm";

import {
    getCandidates,
    searchCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate
} from "./Services/CandidateService";

import CandidateDetail from "./Components/CandidateDetail";


function App() {

    const [candidates, setCandidates] = useState([]);

    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [status, setStatus] = useState("");

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);


    // Load all candidates
    useEffect(() => {
        loadCandidates();
    }, []);


    async function loadCandidates() {

        try {

            const data = await getCandidates();

            setCandidates(data);

        } catch (error) {

            console.log(error);

        }

    }


    // Search candidates
    async function search() {

        try {

            const data = await searchCandidates(
                name,
                skills,
                experience,
                status
            );

            setCandidates(data);

        } catch (error) {

            console.log(error);

        }

    }


    // Run search whenever filter changes
    useEffect(() => {

        const timer = setTimeout(() => {
            search();
        }, 300);

        return () => clearTimeout(timer);

    }, [name, skills, experience, status]);


    // Open candidate details
    function showDetails(candidate) {

        setSelectedCandidate(candidate);

        setDetailsOpen(true);

    }


    return (

        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f7fb"
            }}
        >

            {/* HEADER */}

            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: "#ffffff",
                    color: "#172033",
                    borderBottom: "1px solid #e5e7eb"
                }}
            >

                <Toolbar
                    sx={{
                        minHeight: "72px !important",
                        px: {
                            xs: 2,
                            sm: 4,
                            md: 6
                        }
                    }}
                >

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            backgroundColor: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 1.5
                        }}
                    >

                        <PeopleIcon
                            sx={{
                                color: "#ffffff",
                                fontSize: 25
                            }}
                        />

                    </Box>


                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            flexGrow: 1,
                            letterSpacing: "-0.3px"
                        }}
                    >
                        CandidateHub
                    </Typography>


                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedCandidate(null);
                            setFormOpen(true);
                        }}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: {
                                xs: 1.5,
                                sm: 2.5
                            },
                            py: 1.1,
                            fontWeight: 600,
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none"
                            }
                        }}
                    >
                        Add Candidate
                    </Button>

                </Toolbar>

            </AppBar>


            {/* MAIN */}

            <Container
                maxWidth={false}
                sx={{
                    width: "100%",
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                        lg: 7
                    },
                    py: {
                        xs: 3,
                        md: 5
                    }
                }}
            >

                {/* PAGE TITLE */}

                <Box
                    sx={{
                        mb: 4
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "28px",
                                md: "34px"
                            },
                            fontWeight: 700,
                            color: "#172033",
                            letterSpacing: "-0.8px"
                        }}
                    >
                        Candidates
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.8,
                            fontSize: "15px"
                        }}
                    >
                        Manage and search candidate information
                    </Typography>

                </Box>


                {/* DASHBOARD SUMMARY */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "260px 1fr"
                        },
                        gap: 2,
                        mb: 3
                    }}
                >

                    {/* TOTAL CANDIDATES */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 3,
                            border: "1px solid #e3e8ef",
                            backgroundColor: "#ffffff"
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 1
                            }}
                        >
                            Total Candidates
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "32px",
                                fontWeight: 700,
                                color: "#2563eb",
                                lineHeight: 1
                            }}
                        >
                            {candidates.length}
                        </Typography>

                    </Paper>


                    {/* INFORMATION CARD */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 3,
                            border: "1px solid #e3e8ef",
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >

                        <Box>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "#172033",
                                    mb: 0.5
                                }}
                            >
                                Candidate Management
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Search, view, add, edit and manage candidate records.
                            </Typography>

                        </Box>

                    </Paper>

                </Box>


                {/* SEARCH FILTER */}

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2,
                            md: 3
                        },
                        mb: 3,
                        borderRadius: 3,
                        border: "1px solid #e3e8ef",
                        backgroundColor: "#ffffff"
                    }}
                >

                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "#172033",
                            mb: 2
                        }}
                    >
                        Search & Filter
                    </Typography>


                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                lg: "2fr 1.5fr 1fr 1fr"
                            },

                            gap: 2
                        }}
                    >

                        {/* NAME */}

                        <TextField
                            fullWidth
                            label="Search Candidate"
                            placeholder="Enter candidate name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />


                        {/* SKILLS */}

                        <TextField
                            fullWidth
                            label="Skills"
                            placeholder="C#, SQL"
                            value={skills}
                            onChange={(e) =>
                                setSkills(e.target.value)
                            }
                        />


                        {/* EXPERIENCE */}

                        <TextField
                            select
                            fullWidth
                            label="Experience"
                            value={experience}
                            onChange={(e) =>
                                setExperience(e.target.value)
                            }
                        >

                            <MenuItem value="">
                                All
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

                        </TextField>


                        {/* STATUS */}

                        <TextField
                            select
                            fullWidth
                            label="Status"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <MenuItem value="">
                                All Status
                            </MenuItem>

                            <MenuItem value="Active">
                                Active
                            </MenuItem>

                            <MenuItem value="Inactive">
                                Inactive
                            </MenuItem>

                        </TextField>

                    </Box>

                </Paper>


                {/* CANDIDATE LIST */}

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: "1px solid #e3e8ef",
                        overflow: "hidden",
                        backgroundColor: "#ffffff"
                    }}
                >

                    {/* LIST HEADER */}

                    <Box
                        sx={{
                            px: {
                                xs: 2,
                                md: 3
                            },
                            py: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >

                        <Box>

                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "#172033"
                                }}
                            >
                                Candidate List
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.4
                                }}
                            >
                                Candidate records
                            </Typography>

                        </Box>

                        <Chip
                            label={`${candidates.length} Records`}
                            size="small"
                            sx={{
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                fontWeight: 600
                            }}
                        />

                    </Box>


                    {/* TABLE */}

                    <Box
                        sx={{
                            width: "100%",
                            overflowX: "auto"
                        }}
                    >

                        {/* TABLE HEADER */}

                        <Box
                            sx={{
                                minWidth: "900px",

                                display: "grid",

                                gridTemplateColumns:
                                    "1.5fr 2fr 1.3fr 2fr 1fr 120px",

                                gap: 2,

                                px: 3,
                                py: 1.8,

                                backgroundColor: "#f8fafc",

                                fontSize: "13px",

                                fontWeight: 600,

                                color: "#64748b"
                            }}
                        >

                            <span>Name</span>

                            <span>Email</span>

                            <span>Experience</span>

                            <span>Skills</span>

                            <span>Status</span>

                            <span>Actions</span>

                        </Box>


                        {/* CANDIDATES */}

                        {candidates.map((candidate) => (

                            <Box
                                key={candidate.candidateId}

                                sx={{
                                    minWidth: "900px",

                                    display: "grid",

                                    gridTemplateColumns:
                                        "1.5fr 2fr 1.3fr 2fr 1fr 120px",

                                    gap: 2,

                                    alignItems: "center",

                                    px: 3,
                                    py: 2.2,

                                    borderTop:
                                        "1px solid #edf0f3",

                                    transition: "background-color 0.2s",

                                    "&:hover": {
                                        backgroundColor: "#f8fbff"
                                    }
                                }}
                            >

                                {/* NAME */}

                                <Typography
                                    onClick={() =>
                                        showDetails(candidate)
                                    }

                                    sx={{
                                        fontWeight: 600,

                                        color: "#2563eb",

                                        cursor: "pointer",

                                        whiteSpace: "nowrap",

                                        overflow: "hidden",

                                        textOverflow: "ellipsis",

                                        "&:hover": {
                                            textDecoration:
                                                "underline"
                                        }
                                    }}
                                >
                                    {candidate.candidateName}
                                </Typography>


                                {/* EMAIL */}

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                >
                                    {candidate.email}
                                </Typography>


                                {/* EXPERIENCE */}

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        color: "#334155"
                                    }}
                                >
                                    {candidate.experience} years
                                </Typography>


                                {/* SKILLS */}

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                >
                                    {candidate.skills}
                                </Typography>


                                {/* STATUS */}

                                <Chip
                                    label={candidate.status}

                                    size="small"

                                    color={
                                        candidate.status === "Active"
                                            ? "success"
                                            : "default"
                                    }

                                    sx={{
                                        width: "fit-content",
                                        fontWeight: 500
                                    }}
                                />


                                {/* ACTIONS */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 0.5
                                    }}
                                >

                                    {/* EDIT */}

                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedCandidate(candidate);
                                            setFormOpen(true);
                                        }}
                                        sx={{
                                            backgroundColor: "#eff6ff",

                                            "&:hover": {
                                                backgroundColor: "#dbeafe"
                                            }
                                        }}
                                    >
                                        <EditIcon
                                            fontSize="small"
                                        />
                                    </IconButton>


                                    {/* DELETE */}

                                    <IconButton
                                        size="small"
                                        onClick={async () => {

                                            try {

                                                await deleteCandidate(
                                                    candidate.candidateId
                                                );

                                                await loadCandidates();

                                            } catch (error) {

                                                console.error(
                                                    "Delete error:",
                                                    error
                                                );

                                            }

                                        }}

                                        sx={{
                                            backgroundColor: "#fef2f2",
                                            color: "#dc2626",

                                            "&:hover": {
                                                backgroundColor: "#fee2e2"
                                            }
                                        }}
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                        />
                                    </IconButton>

                                </Box>

                            </Box>

                        ))}


                        {/* NO DATA */}

                        {candidates.length === 0 && (

                            <Box
                                sx={{
                                    textAlign: "center",
                                    py: 7
                                }}
                            >

                                <PeopleIcon
                                    sx={{
                                        fontSize: 42,
                                        color: "#cbd5e1",
                                        mb: 1
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        color: "#475569"
                                    }}
                                >
                                    No candidates found
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5
                                    }}
                                >
                                    Try changing your search filters.
                                </Typography>

                            </Box>

                        )}

                    </Box>

                </Paper>

            </Container>


            {/* CANDIDATE DETAILS */}

            <CandidateDetail
                candidate={selectedCandidate}
                open={detailsOpen}
                onClose={() =>
                    setDetailsOpen(false)
                }
            />


            {/* CANDIDATE FORM */}

            <CandidateForm
                open={formOpen}
                candidate={selectedCandidate}

                onClose={() => {
                    setFormOpen(false);
                    setSelectedCandidate(null);
                }}

                onSave={async (data) => {

                    try {

                        let result;

                        if (selectedCandidate) {

                            result = await updateCandidate(
                                selectedCandidate.candidateId,
                                data
                            );

                        } else {

                            result = await addCandidate(data);

                        }


                        if (!result.ok) {

                            const errorText =
                                await result.text();

                            console.log(
                                "API error:",
                                errorText
                            );

                            alert(
                                "Candidate was not saved.\n\n" +
                                "API Error: " +
                                result.status +
                                "\n\n" +
                                errorText
                            );

                            return;
                        }


                        alert(
                            selectedCandidate
                                ? "Candidate updated successfully!"
                                : "Candidate added successfully!"
                        );


                        setFormOpen(false);
                        setSelectedCandidate(null);

                        await loadCandidates();

                    } catch (error) {

                        console.error(
                            "Save candidate error:",
                            error
                        );

                        alert(
                            "Cannot connect to backend.\n\n" +
                            error.message
                        );

                    }

                }}
            />

        </Box>

    );

}


export default App;