import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/auth"
import { apiConnector } from "../apiConnector";
import { AuthEndPoints } from "../apis";
import { setUser } from "../../slices/profile";
import { useSelector } from "react-redux";


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", AuthEndPoints.SENDOTP_API,null ,null,{email:email});
            console.log("response is:", response);
            if (!response.data.Status == "OK") {
                throw new Error(response.data.Message);
            }
            toast.success("OTP sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
            // toast.error(error);
        }
        dispatch(setLoading(false));
    }
}

export function verifyEmailSignup(firstName, lastName, email,contact, password, otp,role, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", AuthEndPoints.VERIFY_EMAIL, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contact : contact,
                password: password,
                role:role,
                otp: otp
            })

            console.log("signup response:", response);
            dispatch(setUser(response.data.Data));

            console.log(response.data.Data);
            if (!response.data.Status == "OK") {
                toast.error(response.data.Message);
                throw new Error(response.data.Message);
            }

            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}


export function Login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", AuthEndPoints.LOGIN, { email: email, password: password });
            if (!response.data.Status == "OK") {
                toast.error(response.data.Message);
                throw new Error(response.data.Message);
            }
            toast.success("login successfull");

            dispatch(setToken(response.data.Data.token));

            console.log(response.data.Data.token)
            console.log(response.data.Data.user)
            const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.Data.user.firstName} ${response.data.Data.user.lastName}`
            dispatch(setUser({ ...response.data.Data.user, image: userImage }));

            // console.log(response.data.user.token);
            // console.log(response.data.token);
            //store USER PROFILE DATA and TOKEN in localStorage
            localStorage.setItem("user", JSON.stringify(response.data.Data.user));
            localStorage.setItem("token", JSON.stringify(response.data.Data.token));
            console.log(response.data.Data.user)
            if(response.data.Data.user.role == "ADMIN" || response.data.Data.user.role == "SUPERADMIN"  )
            {
                navigate('/admin')
            }else
            {
            navigate('/');
            }
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response.data.message);
            // toast.error();
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function Logout(navigate){
    return (dispatch)=>{
    try{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        toast.success("Logged Out");
        navigate('/')
    }catch(error){
        toast.error("Logout error");
    }
}
}
