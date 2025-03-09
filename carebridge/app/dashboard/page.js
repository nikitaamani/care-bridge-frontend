// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const DashboardPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     // Get the token from the URL search params or localStorage
//     const urlToken = searchParams.get("token");
//     const storedToken = localStorage.getItem("token");

//     if (urlToken) {
//       // If the token is in the URL, store it in localStorage
//       localStorage.setItem("token", urlToken);
//       setToken(urlToken);
//     } else if (storedToken) {
//       // If the token is in localStorage, use it
//       setToken(storedToken);
//     } else {
//       // If no token is found, redirect to the login page
//       router.push("/login");
//     }
//   }, [searchParams, router]);

//   const handleLogout = () => {
//     // Remove the token from localStorage and redirect to login
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   if (!token) {
//     // Show a loading state while checking for the token
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
//         Welcome to the Dashboard!
//         <p>
//           This is a test web page to show that Google authentication works.
//           <br />
//           The site is still under construction.
//         </p>
//       </h1>
//       <button
//         onClick={handleLogout}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default DashboardPage;