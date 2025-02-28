const Menu = require('../models/Menu');

const addItem = async ({ truckId, category, name, price, description }) => {
    try {
        let menu = await Menu.findOne({ truckId, category });

        if (menu) {
            // Update existing category with new item
            menu.items.push({ name, price, description });
        } else {
            // Create a new menu entry
            menu = new Menu({
                truckId,
                category,
                items: [{ name, price, description }]
            });
        }

        await menu.save();
        return { success: true, data: menu };
    } catch (error) {
        console.error("Error adding item:", error);
        return { success: false, message: error.message };
    }
};

const getMenu = async (truckId) => {
    try {
        const menu = await Menu.findOne({truckId})
        return menu
    } catch (error) {
    throw new Error ('Error occured')        
    }
}

const deleteItem = async (menuId, itemId) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(
            menuId,
            { $pull: { items: { _id: itemId } } }, // Removes the specific item
            { new: true } // Returns the updated document
        );

        if (!updatedMenu) {
            return false
        }

        return true;
    } catch (error) {
        console.error("Error deleting item:", error);
        return false;
    }
};


module.exports = { addItem ,getMenu,deleteItem};
