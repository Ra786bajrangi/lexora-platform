// controllers/userController.js
const User = require('../models/User');

const updateAvatar = async (req, res) => {
  try {
    // Verify the user making the request owns the account
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No avatar file provided' });
    }

    const avatarUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Avatar updated successfully',
      avatar: avatarUrl,
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      }
    });

  } catch (error) {
    console.error('Avatar update error:', error);
    res.status(500).json({ 
      message: 'Failed to update avatar',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { updateAvatar };