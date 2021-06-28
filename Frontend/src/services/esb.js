const grupo1 = "http://localhost:3001";
const grupo2 = "http://grupo2:4091";
const grupo3 = "http://grupo3:4091";
const grupo4 = "http://grupo4:4091";

export async function setearESB(esb) {
  switch (parseInt(esb)) {
    case 1:
      localStorage.setItem("esb", JSON.stringify(grupo1));
      return grupo1;
    case 2:
      localStorage.setItem("esb", JSON.stringify(grupo2));
      return grupo2;
    case 3:
      localStorage.setItem("esb", JSON.stringify(grupo3));
      return grupo3;
    case 4:
      localStorage.setItem("esb", JSON.stringify(grupo4));
      return grupo4;
  }
}

export async function getESB() {
  return await JSON.parse(localStorage.getItem("esb"));
}
