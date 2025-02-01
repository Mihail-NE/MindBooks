import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { createOrUpdateUser } from "../../firebase/users";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await createOrUpdateUser(result.user);
            navigate("/profile");
        } catch (error) {
            console.error("Ошибка входа:", error.message);
        }
    };

    return (
        <button
            className="flex items-center justify-center mt-6 w-full gap-3 px-6 py-2.5
    bg-white text-gray-700 rounded-lg border border-gray-300
    hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
            onClick={handleGoogleSignIn}
        >
            <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                    fill="#4285F4"
                    d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                />
                <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                />
                <path
                    fill="#FBBC05"
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                />
                <path
                    fill="#EA4335"
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                />
            </svg>
            Google
        </button>
    );
};

export default GoogleAuth;
