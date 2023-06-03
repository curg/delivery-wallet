import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { walletStateAtom } from "@/states/globalAtom";

const fetchAddress = async (signingKey: string) => {
  const { data } = await axios.post("/api/wallet", {
    signingKey: signingKey,
  });
  return data;
};

const CreateWallet = () => {
  const { signingKey: privateKey } = useRecoilValue(walletStateAtom);
  const mutation = useMutation(fetchAddress, {
    onSuccess: (data) => {
      console.log(`SimpleAccount address: ${data.SimpleAccountAddress}`);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleClick = () => {
    const signingKey = privateKey; // replace this with the actual signing key
    mutation.mutate(signingKey);
  };

  return (
    <div>
      {mutation.isLoading
        ? "Loading..."
        : mutation.isError
        ? "An error occurred"
        : mutation.data
        ? `SimpleAccount address: ${mutation.data.SimpleAccountAddress}`
        : null}

      <button onClick={handleClick} disabled={mutation.isLoading}>
        Fetch Address
      </button>
    </div>
  );
};

export default CreateWallet;
