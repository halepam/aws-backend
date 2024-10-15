export async function main(event: any) {
  console.log("got id", event.productId);
  return {
    message: "Products fetched successfully",
    success: true,
    data: handleGetProductById(parseInt(event.productId)),
  };
}

const data = [
  {
    id: 1,
    title: "FVP 495K6 Multi-V",
    description: "some desc",
    price: 34.75,
  },
  {
    id: 2,
    title: "DAYCO 5060495DR Drive Rite",
    description: "some desc",
    price: 22.99,
  },
  {
    id: 3,
    title: "BANDO 6PK1255",
    description: "some desc",
    price: 18.22,
  },
  {
    id: 4,
    title: "CONTINENTAL 6PK1256",
    description: "some desc",
    price: 90.96,
  },
  {
    id: 5,
    title: "SKP SK39106",
    description: "some desc",
    price: 56.78,
  },
  {
    id: 6,
    title: "ULTRA-POWER 39106",
    description: "some desc",
    price: 190.53,
  },
];

function handleGetProductById(id: number) {
  return data.find((item) => item.id === id);
}
