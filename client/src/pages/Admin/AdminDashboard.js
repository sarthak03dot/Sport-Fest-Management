import API from "../../utils/api";

const fetchRegistrations = async () => {
    try {
        const response = await API.get("/admin/registrations");
        setRegistrations(response.data);
    } catch (error) {
        toast.error("Error loading registrations");
    }
};
