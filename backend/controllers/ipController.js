// backend/controllers/ipController.js
// Controller for Intellectual Property (IP) management (dummy implementations)

export const listIPs = async (req, res) => {
  try {
    // Return some dummy IP asset data
    const dummyIPs = [
      { id: 1, title: "Patent A", description: "Description for Patent A" },
      {
        id: 2,
        title: "Trademark B",
        description: "Description for Trademark B",
      },
    ];
    res.status(200).json({
      message: "IP assets retrieved successfully",
      data: dummyIPs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getIP = async (req, res) => {
  try {
    const { id } = req.params;
    // Return dummy detail for a specific IP asset
    const dummyIP = {
      id,
      title: "Patent A",
      description: "Detailed info about Patent A",
    };
    res.status(200).json({
      message: "IP asset detail retrieved successfully",
      data: dummyIP,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createIP = async (req, res) => {
  try {
    // In a real app, you would save req.body to your database
    const newIP = req.body;
    res.status(201).json({
      message: "IP asset created successfully",
      data: newIP,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateIP = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Dummy update logic
    res.status(200).json({
      message: `IP asset ${id} updated successfully`,
      data: updateData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteIP = async (req, res) => {
  try {
    const { id } = req.params;
    // Dummy deletion logic
    res.status(200).json({ message: `IP asset ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
