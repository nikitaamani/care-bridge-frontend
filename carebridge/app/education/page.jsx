'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaHandsHelping, FaChartBar, FaUsers, FaSchool, FaBookReader, FaDonate } from "react-icons/fa";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const EducationCharityImpact = () => {
    const [selectedDonation, setSelectedDonation] = useState("");

    const handleDonationChange = (donationType) => {
        setSelectedDonation(donationType);
    };

    const handleSubmit = async () => {
        const donationData = { donationType: selectedDonation };
        
        try {
            const response = await fetch("https://carebridge-backend-fys5.onrender.com/api/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donationData),
            });
            if (response.ok) {
                alert(`Thank you for your ${selectedDonation} donation!`);
            } else {
                alert("There was an error processing your donation.");
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="bg-gray-100 text-gray-800 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">How Charity Supports Education</h2>
                    <p className="text-lg mb-8">Charity programs provide access to education, resources, and support for children worldwide, ensuring a brighter future.</p>
                </div>

                {/* Video Section */}
                <div className="flex justify-center mb-12">
                    <ReactPlayer url="https://www.youtube.com/watch?v=mPRXhNFPgwo" controls width="50%" />
                </div>

                {/* Why Education Matters */}
                <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center mb-12">
                    <h3 className="text-2xl font-bold mb-4">Why Education Matters</h3>
                    <p className="text-lg">Education is the foundation for a better future. It empowers individuals, reduces poverty, and promotes equality.</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-6">
                        <div className="p-4 border rounded-lg">
                            <FaSchool size={40} className="text-blue-500 mx-auto mb-3" />
                            <h4 className="font-semibold">School Access</h4>
                            <p>Charities build schools in underserved areas, providing children with the opportunity to learn.</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <FaBookReader size={40} className="text-green-500 mx-auto mb-3" />
                            <h4 className="font-semibold">Learning Resources</h4>
                            <p>Books, technology, and mentorship programs help students excel in their education.</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <FaUsers size={40} className="text-yellow-500 mx-auto mb-3" />
                            <h4 className="font-semibold">Community Support</h4>
                            <p>Scholarships and donations allow students to complete their studies without financial burdens.</p>
                        </div>
                    </div>
                </div>

                {/* Success Stories */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <Image src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" alt="Student" width={500} height={300} className="rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">Mary’s Journey</h3>
                        <p className="mt-2">Mary, a young girl from Kenya, was able to complete her education thanks to donations providing school fees and books.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <Image src="https://images.pexels.com/photos/5212344/pexels-photo-5212344.jpeg" alt="Student" width={500} height={300} className="rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">Ahmed’s Success</h3>
                        <p className="mt-2">Ahmed received access to a new library and mentorship programs that changed his academic performance and future opportunities.</p>
                    </div>
                </div>

                {/* How to Donate */}
                <div className="max-w-7xl mx-auto text-center my-16 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold">How to Donate</h2>
                    <p className="text-lg my-4">Your donation can change lives. Choose how you want to support students in need:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {["Monetary Donation", "Books & Learning Materials", "Sponsorship", "Volunteer Mentorship"].map((option, index) => (
                            <div key={index} className={`p-4 border rounded-lg cursor-pointer ${selectedDonation === option ? 'border-blue-500 bg-blue-100' : ''}`} onClick={() => handleDonationChange(option)}>
                                <h4 className="text-xl font-bold">{option}</h4>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSubmit} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto mt-4">
                        <FaDonate className="mr-2" /> Submit Donation
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default EducationCharityImpact;
