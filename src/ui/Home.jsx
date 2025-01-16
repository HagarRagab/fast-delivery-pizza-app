import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { getUsername } from "../features/user/userSlice";
import Button from "./Button";

function Home() {
  const registeredName = useSelector(getUsername);

  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {registeredName === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue ordering, {registeredName}
        </Button>
      )}
    </div>
  );
}

export default Home;
