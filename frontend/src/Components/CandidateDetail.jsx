import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function CandidateDetails({ candidate, open, onClose }) {

    if (!candidate) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                Candidate Details

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: 10
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Candidate Name
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.candidateName}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Email
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Mobile Number
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.mobileNumber}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Date of Birth
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.dateOfBirth}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Gender
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.gender}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Qualification
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.qualification}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Experience
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.experience} years
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Skills
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.skills}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Preferred Location
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.preferredLocation}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography color="text.secondary">
                            Employment Type
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.employmentType}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography color="text.secondary">
                            Status
                        </Typography>
                        <Typography fontWeight={600}>
                            {candidate.status}
                        </Typography>
                    </Grid>

                </Grid>

            </DialogContent>
        </Dialog>
    );
}

export default CandidateDetails;