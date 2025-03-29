// backend/controllers/marketController.js
// Controller for Marketplace functions

export const listMarketItems = async (req, res) => {
  try {
    // Return dummy marketplace items
    const dummyItems = [
      { id: 1, name: "IP Asset 1", price: 1000 },
      { id: 2, name: "IP Asset 2", price: 2000 },
    ];
    res.status(200).json({
      message: "Marketplace items retrieved successfully",
      data: dummyItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMarketItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Return dummy detail for a marketplace item
    const dummyItem = {
      id,
      name: "IP Asset 1",
      price: 1000,
      description: "Detailed info about IP Asset 1",
    };
    res.status(200).json({
      message: "Marketplace item retrieved successfully",
      data: dummyItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
