const API_URL = "https://localhost:7141/api/Candidates";

export async function getCandidates() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getCandidate(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function addCandidate(candidate) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
    });

    return response;
}

export async function updateCandidate(id, candidate) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
    });

    return response;
}

export async function deleteCandidate(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    return response;
}

export async function searchCandidates(name, skills, experience, status) {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (skills) params.append("skills", skills);
    if (experience) params.append("experience", experience);
    if (status) params.append("status", status);

    const response = await fetch(
        `${API_URL}/search?${params.toString()}`
    );

    return response.json();
}