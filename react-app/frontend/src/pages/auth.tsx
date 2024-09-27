import SigninForm from "@/components/auth/SigninForm";
import { useCheckAuth } from "@/hooks/useAuth";

function Home() {
  const checkAuth = useCheckAuth();

  const handleCheckAuth = async (event) => {
    event.preventDefault();
    const authStatus = await checkAuth();

    if (authStatus.result) {
      // User is authenticated
      console.log("User is authenticated:", authStatus.message);
    } else {
      // User is not authenticated, handle it without redirecting
      console.log("User is not authenticated:", authStatus.message);
      // Optionally, show a message or handle the state
    }
  };

  return (
    <>
      <SigninForm OpenModal={() => {}} />
      <button type="button" onClick={handleCheckAuth}>
        Check Auth
      </button>
    </>
  );
}

export default Home;
