import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { AdminDashboard } from "../apis";


function getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Authentication token missing. Please login.");
        throw new Error("Token missing");
    }
    return token.replace(/^"|"$/g, ""); // remove quotes if stored as string
}
 const token = getToken();
export function add_location(location, token) {
    return async () => {
        const toastId = toast.loading("Loading");
        console.log("api calling");
        console.log(location);
        let newLoc = {
            "name": location.name,
            "address":location.address,
            "city": location.city,
            "state":location.state,
            "pincode": location.pincode,
            "mediaFiles":location.mediaFiles
        }
        console.log("newlocation: ",newLoc)
        try {
            const response = await apiConnector("POST", AdminDashboard.ADD_LOCATION, newLoc, {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            });
            console.log("response is:", response);
            if(!response.data.status == "OK")
            {
                throw new Error(response.data.Message);
            }
            console.log("location added");
            toast.success("Location added Successfully")
        } catch (error) {
            toast.error("location not added");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}


export async function fetch_all_location(token) {
    try {
        console.log("location fetching " );
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

        return response.data.Data; // ✅ Return API response here

    } catch (error) {
        toast.error("Location not fetch");
        console.error(error);
        return null; // ✅ Return something so caller can handle it
    }
}



export async function getLocationById(token,id) {
    try {
        console.log("location fetching");
        const response = await apiConnector(
            "GET",
            AdminDashboard.GET_LOCATION_ID+`/${id}`,
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

        return response.data.Data; // ✅ Return API response here

    } catch (error) {
        toast.error("Location not fetch");
        console.error(error);
        return null; // ✅ Return something so caller can handle it
    }
}
