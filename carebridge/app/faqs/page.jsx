export default function FAQPage() {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-4">
                <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
                <h2 className="text-3xl mt-4">[FAQ's]</h2>
                <p className="text-lg mt-4">What can we help you find?</p>
                <div className="mt-6 flex items-center bg-white text-black rounded-full px-4 py-2 shadow-md">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="outline-none bg-transparent px-2 w-64"
                    />
                    <button className="text-black-700">
                        🔍
                    </button>
                </div>
            </div>
            <div className="container mx-auto py-10 text-center">
                <h2 className="text-4xl font-bold text-black">FAQs</h2>
                <p className="text-gray-600 mt-2">Learn About Our Humanitarian Mission for Children | Salvus Children Organisation</p>
                <div className="flex justify-center mt-6 space-x-4">
                    <button className="bg-black text-white px-6 py-2 rounded">General</button>
                    <button className="bg-white border-black border px-6 py-2 rounded">Donation</button>
                    <button className="bg-white border-black border px-6 py-2 rounded">Charity</button>
                </div>
                <div className="mt-10 max-w-2xl mx-auto bg-gray-100 p-6 rounded">
                    <details className="mb-4">
                        <summary className="font-semibold text-black cursor-pointer">Can You Explain How Child Sponsorship Works And What Impact It Has On The Lives Of Children In Need?</summary>
                        <p className="mt-2 text-gray-700">Child sponsorship through Salvus presents a transformative and impactful chance to improve the life of a child in need. By opting to sponsor a child, your contributions support their access to education, healthcare, nutritious food, and other essential resources they might otherwise lack.</p>
                    </details>
                </div>
            </div>
        </div>
        
    );
}



