const User = require('../models/User');

exports.updateAvatar = async (req, res) => {
  try {
    const userIdFromParams = req.params.id;
    const userIdFromToken = req.user.id;

    // Optional: allow only the same user to update their avatar
    if (userIdFromParams !== userIdFromToken) {
      return res.status(403).json({ msg: 'Unauthorized to update this profile' });
    }

    const user = await User.findById(userIdFromParams);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.avatar = req.file.path; // This is the Cloudinary URL
    await user.save();

    res.status(200).json({ msg: 'Avatar updated', avatar: user.avatar });
  } catch (error) {
    console.error('Avatar update error:', error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
