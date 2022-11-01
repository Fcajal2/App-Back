import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

app.use(express.json());

const products: {
  id: number;
  name: string;
  brand: string;
  price: number;
  isEditing?: boolean;
}[] = [
  {
    name: "Teclado",
    brand: "Logitech",
    price: 12,
    id: 2131231,
    isEditing: false,
  },
  {
    name: "Placa",
    brand: "AMD",
    price: 15,
    id: 21312312,
    isEditing: false,
  },
];

/**
 * Get all products
 */
app.get("/product", (req, res) => {
  return res.status(200).json(products);
});

/**
 * Get a single Product by id
 */
app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1)
    return res.status(400).json({ message: "product could not be found" });
  return res.status(200).json(products[index]);
});

/**
 * Create product
 */
app.post("/product", (req, res) => {
  const { name, brand, price } = req.body;
  if (!name || !brand)
    return res
      .status(400)
      .json({ message: "fields 'name' and 'marca' is required" });
  products.push({ id: new Date().getTime(), name, brand, price });
  return res.status(200).json(...products.slice(-1));
});

/**
 * Edit product by id
 */
app.put("/product/:id", (req, res) => {
  const { name, brand } = req.body;
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1)
    return res.status(400).json({ message: "product could not be found" });
  if (brand) {
    products[index].brand = brand;
  }
  if (name) {
    products[index].name = name;
  }
  return res.status(200).json(products[index]);
});

/**
 * Delete product by id
 */
app.delete("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1)
    return res.status(400).json({ message: "product could not be found" });

  return res.status(200).json(products.splice(index, 1));
});

app.listen(3001);
