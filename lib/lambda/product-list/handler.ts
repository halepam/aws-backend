export async function main() {
  return {
    message: "Products fetched successfully",
    success: true,
    data: handleProductList(),
  };
}

function handleProductList() {
  return [
    {
      id: 1,
      sku: "FVP 495K6 Multi-V",
      description: "some desc",
      image: "http://some-domain.com/multi-v.png",
    },
    {
      id: 2,
      sku: "DAYCO 5060495DR Drive Rite",
      description: "some desc",
      image: "http://some-domain.com/mileage_maker_multi_v_belt.png",
    },
    {
      id: 3,
      sku: "BANDO 6PK1255",
      description: "some desc",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQVRj4eV9WnuaoAYp2Jp0h4xvqB579BOXn6mI4N8BvlOS6X_Ll1NSDDfhYLFSez",
    },
    {
      id: 4,
      sku: "CONTINENTAL 6PK1256",
      description: "some desc",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTVqez0LzmGmeDngCZRADI4XwypGrXvMkUaHDXD8k2RPnKZsqANeFCnWNVAuQCL",
    },
    {
      id: 5,
      sku: "SKP SK39106",
      description: "some desc",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLZuus8W0XOqAK-6ZbnHt_VeXN-uV1fGwDF7ZM4wkLSZ566G3OgJxkwLmg02u",
    },
    {
      id: 6,
      sku: "ULTRA-POWER 39106",
      description: "some desc",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLZuus8W0XOqAK-6ZbnHt_VeXN-uV1fGwDF7ZM4wkLSZ566G3OgJxkwLmg02u",
    },
  ];
}
