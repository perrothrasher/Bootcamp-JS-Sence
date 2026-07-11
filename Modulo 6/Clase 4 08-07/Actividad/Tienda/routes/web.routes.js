import { Router } from "express";

const router = Router();
const nombreTienda = "Tienda";
const mensajeBienvenida = "Bienvenido a nuestra tienda ficticia de productos destacados.";

const productos = [
    {
        nombre: "Camiseta Básica",
        precio: 15,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600"
    },
    {
        nombre: "Pantalón Jeans",
        precio: 30,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Zapatos Deportivos",
        precio: 50,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Chaqueta de Cuero",
        precio: 80,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1727524366429-27de8607d5f6?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Gorra Clásica",
        precio: 12,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Bolso de Mano",
        precio: 45,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Reloj Digital",
        precio: 60,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1590454973420-ec89dc9ad192?q=80&w=916&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Bufanda de Lana",
        precio: 18,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Sudadera Hoodie",
        precio: 35,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1680292783974-a9a336c10366?q=80&w=788&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        nombre: "Gafas de Sol",
        precio: 25,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

router.get("/", (req, res) => {
    res.render("home", {
        nombreTienda,
        mensajeBienvenida,
        productos
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        nombreTienda
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        nombreTienda
    });
});

router.post("/contact", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    res.render("success", {
        nombre,
        email,
        mensaje
    });
});

router.all("/", (req, res) => {
    res.status(405).send("Método no permitido");
});

router.all("/about", (req, res) => {
    res.status(405).send("Método no permitido");
});

router.all("/contact", (req, res) => {
    res.status(405).send("Método no permitido");
});

export default router;