import Navbar from "../components/Navbar";

const Dashboard = () => {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b] text-white">

        <h1 className="text-4xl font-bold mb-6">
          Welcome to Dashboard 🚀
        </h1>

        

      </div>

    </>

  );

};

export default Dashboard;