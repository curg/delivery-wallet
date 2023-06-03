import axios from "axios";
import { useMutation } from "react-query";

const fetchAddress = async (signingKey: string) => {
  const { data } = await axios.post("/api/wallet", {
    signingKey: signingKey,
  });
  return data;
};

const useCreateWallet = () => {
  const mutation = useMutation(fetchAddress, {
    onSuccess: (data) => {
      console.log(`SimpleAccount address: ${data.SimpleAccountAddress}`);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleClick = () => {
    const signingKey = "your_signing_key_here"; // replace this with the actual signing key
    mutation.mutate(signingKey);
  };

  return {
    mutation,
    handleClick,
  };
};

export default useCreateWallet;

// <div>
// {mutation.isLoading
//   ? "Loading..."
//   : mutation.isError
//   ? "An error occurred"
//   : mutation.data
//   ? `SimpleAccount address: ${mutation.data.SimpleAccountAddress}`
//   : null}

// <button onClick={handleClick} disabled={mutation.isLoading}>
//   Fetch Address
// </button>
// </div>
