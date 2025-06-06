export const getWalletERC20Transfers = async (address: string) => {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2.2/${address}/erc20/transfers?chain=eth`,
    {
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de l'appel à l'API Moralis");
  }

  return res.json();
};
