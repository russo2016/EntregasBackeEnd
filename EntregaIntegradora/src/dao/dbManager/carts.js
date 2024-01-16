import { CartsModel } from "../models/carts.js";

export default class Cart {
    constructor() {
        console.log("Cart DAO created");
    }

    async getAll() {
        const carts = await CartsModel.find().lean();
        return carts;
    }

    async getById(id) {
        const cart = await CartsModel.findById(id).lean();
        return cart;
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getById(cid);
            const { product } = cart;
    
            const productIndex = product.findIndex(
                (item) => item.product.toString() === pid
            );
    
            if (productIndex !== -1) {
                product[productIndex].quantity++;
            } else {
                product.push({
                    product: pid,
                    quantity: 1,
                });
            }
    
            await this.updateCart(cid,cart);
            return cart;
        } catch (err) {
            console.log(err);
        }
    };
    
    async saveCart(cart) {
        const newCart = new CartsModel(cart);
        let result = await newCart.save();
        return result;
    }

    async updateCart(id, cart) {
        const result = await CartsModel.updateOne({ _id: id }, cart);
        return result;
    }

    /*async deleteCart(id) {
        const result = await CartsModel.deleteOne({ _id: id });
        return result;
    }*/

    async deleteProductsFromCart(id) {
        try {
            const cart = await CartsModel.findById(id);
            if (!cart) {
                return { error: 'Carrito no encontrado' };
            }
            cart.product = [];
            const result = await cart.save();

            return result;
        } catch (error) {
            console.error('Error al eliminar elementos del carrito:', error);
            return { error: 'Error interno del servidor' };
        }
    }
}