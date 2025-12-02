import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { AdminDashboard } from "../apis";

// ✅ Call only when needed
function getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Authentication token missing. Please login.");
        throw new Error("Token missing");
    }
    return token.replace(/^"|"$/g, ""); // remove quotes
}

// -------------------------
// ADD LOCATION
// -------------------------
export function add_location(location) {
    return async () => {
        const toastId = toast.loading("Loading");

        try {
            const token = getToken(); // ✅ token fetched here only
            console.log("api calling");
            console.log(location);

            let newLoc = {
                name: location.name,
                address: location.address,
                city: location.city,
                state: location.state,
                pincode: location.pincode,
                mediaFiles: location.mediaFiles
            };

            const response = await apiConnector(
                "POST",
                AdminDashboard.ADD_LOCATION,
                newLoc,
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("response is:", response);

            if (response.data.Status !== "OK") {
                throw new Error(response.data.Message);
            }

            toast.success("Location added Successfully");
        } catch (error) {
            toast.error("location not added");
            console.error(error);
        }

        toast.dismiss(toastId);
    };
}

// -------------------------
// FETCH ALL LOCATIONS
// -------------------------
export async function fetch_all_location() {
    try {
        const token = getToken(); // ✅ SAFE
        console.log("location fetching");

        const response = await apiConnector(
            "GET",
            AdminDashboard.FETCH_ALL_LOCATION,
            null,
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("response is:", response);

        if (response.data.Status !== "OK") {
            throw new Error(response.data.Message);
        }

        return response.data.Data;
    } catch (error) {
        toast.error("Location not fetch");
        console.error(error);
        return null;
    }
}

// -------------------------
// GET LOCATION BY ID
// -------------------------
export async function getLocationById(id) {
    try {
        const token = getToken(); // ✔ safe
        console.log("location fetching");

        const response = await apiConnector(
            "GET",
            AdminDashboard.GET_LOCATION_ID + `/${id}`,
            null,
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("response is:", response);

        if (response.data.Status !== "OK") {
            throw new Error(response.data.Message);
        }

        return response.data.Data;
    } catch (error) {
        toast.error("Location not fetch");
        console.error(error);
        return null;
    }
}
