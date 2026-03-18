const Admin = require('./models/admin');
const bcrypt = require('bcryptjs');

const createDefaultAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();

        if (adminCount === 0) {
            console.log('No admin found. Creating default admin...');

            const salt = await bcrypt.genSalt(10);

            // USE PROCESS.ENV HERE
            const password = process.env.DEFAULT_ADMIN_PASS;
            const username = process.env.DEFAULT_ADMIN_USER;

            if (!password || !username) {
                console.error("Error: DEFAULT_ADMIN_PASS or USER is missing in .env file");
                return;
            }

            const hashedPassword = await bcrypt.hash(password, salt);

            await Admin.create({
                username: username,
                password: hashedPassword
            });

            console.log(`Default Admin Created! Username: ${username}`);
        } else {
            console.log('Admin account exists.');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

module.exports = createDefaultAdmin;