import prisma from '../config/db.js';
import Validator from '../utils/validations.js';
import { comparePassword, hashPassword } from '../utils/auth.utils.js';

const validator = new Validator();
const getUser = async (req, res) => {
    const { id } = req.user;
    if (!validator.isUUID(id)) return res.status(500).json({ message: "invalid user information" });
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                saved_posts: { include: { property: { include: { media: true } } } }, avatar: true, posts: { include: { property: { include: { media: true } } } }
            }
        });
        if (!user) return res.status(404).json({ message: "user does not exist" });
        return res.status(200).json({ user });
    }

    catch (err) {
        console.log("Error getting user", err);
        return res.status(500).json({ message: "Error while getting user" });
    }
}
const updateUser = async (req, res) => {
    const { id } = req.user;
    const { phone, full_name, isSeller } = req.body;
    if (!validator.isUUID(id)) return res.status(500).json({ message: "invalid user information" });
    if (phone && !validator.isPhoneNumber(phone)) return res.status(400).json({ message: "invalid phone number" });
    if (full_name && typeof full_name !== 'string') return res.status(400).json({ message: "invalid full name" });
    if (isSeller !== undefined && typeof isSeller !== 'boolean') return res.status(400).json({ message: "invalid seller status" });

    try {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user does not exist" });
        await prisma.user.update({
            where: { id },
            data: {
                phone: phone ? validator.sanitizeInput(phone) : undefined,
                full_name: full_name ? validator.sanitizeInput(full_name) : undefined,
                isSeller
            }
        });
        return res.status(200).json({ message: "user updated successfully" });
    }
    catch (err) {
        console.log("Error updating user", err);
        return res.status(500).json({ message: "Error while updating user" });
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.user;
    const { email, password } = req.body;
    if (!validator.isUUID(id)) return res.status(500).json({ message: "invalid user information" });
    if (!email || !password) return res.status(400).json({ message: "missing required fields" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "invalid email" });
    try {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user does not exist" });
        if (user.email !== email) return res.status(403).json({ message: "invalid email or password" });
        if (!await comparePassword(validator.sanitizeInput(password), user.password)) return res.status(403).json({ message: "invalid email or password" });

        await prisma.user.delete({ where: { id } });
        res.cookie('access', null, { maxAge: 0 })
        res.cookie('refresh', null, { maxAge: 0 })
        return res.status(200).json({ message: "user deleted successfully" });

    }
    catch (err) {
        console.log("Error deleting user", err);
        return res.status(500).json({ message: "Error while deleting user" });
    }
}
const changePassword = async (req, res) => {
    const { id } = req.user;
    const { old_password, new_password, confirm } = req.body;
    if (!validator.isUUID(id)) return res.status(500).json({ message: "invalid user information" });
    if (!validator.isStrongPassword(validator.sanitizeInput(new_password))) return res.status(400).json({ message: "weak password" });
    if (new_password !== confirm) return res.status(400).json({ message: "passwords do not match" });
    try {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user does not exist" });
        if (!await comparePassword(validator.sanitizeInput(old_password), user.password)) return res.status(403).json({ message: "invalid old password" });
        await prisma.user.update({
            where: { id },
            data: { password: await hashPassword(validator.sanitizeInput(new_password)) }
        });

        return res.status(200).json({ message: "password changed successfully" });

    }

    catch (err) {
        console.log("Error changing password", err);
        return res.status(500).json({ message: "Error while changing password" });
    }
}
const changeEmail = async (req, res) => {
    const { id } = req.user;
    const { password, newEmail } = req.body;

    if (!validator.isUUID(id)) return res.status(500).json({ message: "invalid user information" });
    if (!validator.isEmail(newEmail)) return res.status(400).json({ message: "invalid email" });
    try {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user does not exist" });
        if (!await comparePassword(validator.sanitizeInput(password), user.password)) return res.status(403).json({ message: "invalid password" });
        await prisma.user.update({
            where: { id },
            data: { email: validator.sanitizeInput(newEmail) }
        });

        return res.status(200).json({ message: "email changed successfully" });
    }
    catch (err) {
        console.log("Error changing email", err);
        return res.status(500).json({ message: "Error while changing email" });
    }
}
const changeAvatar = async (req, res) => {
    const { id } = req.user;
    const { display_url, bucket_url } = req.body;
    if (!validator.isUUID(id)) return res.status(500).json({ message: 'Invalid User Information' });
    if (!display_url || !bucket_url) return res.status(400).json({ message: 'Missing required Data' });

    try {

        const avatar = await prisma.avatar.findUnique({ where: { user_id: id } });
        if (!avatar) {
            await prisma.avatar.create({
                data: {
                    user_id: id,
                    display_url,
                    bucket_url
                }
            });
            return res.status(201).json({ message: "avatar added successfully" })
        };
        await prisma.avatar.update({
            where: { user_id: id },
            data: { display_url, bucket_url }
        });
        return res.status(200).json({ message: 'avatar changed successfully' });
    }

    catch (err) {
        console.log("Error changing avatar", err);
        return res.status(500).json({ message: 'Error while changing avatar' });
    }

}

const deleteAvatar = async (req, res) => {
    const { id } = req.user;

    if (!validator.isUUID(id)) return res.status(500).json({ message: 'Invalid User Information' });
    try {

        const avatar = await prisma.avatar.findUnique({ where: { user_id: id } });
        if (!avatar) return res.status(400).json({ message: "the user does not have avatar to delete" });
        await prisma.avatar.delete({

            where: { user_id: id }
        });
        return res.status(200).json({ message: 'avatar deleted successfully' });
    }

    catch (err) {
        console.log("Error Deleting avatar", err);
        return res.status(500).json({ message: 'Error while Deleteing avatar' });
    }
}

const addSavedPost = async (req, res) => {
    const { id: user_id } = req.user;
    const { post_id } = req.params;
    if (!validator.isUUID(user_id)) return res.status(500).json({ message: 'Invalid User Information' });
    if (!validator.isUUID(post_id)) return res.status(400).json({ message: 'Invalid Post Information' });

    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        const post = await prisma.post.findUnique({ where: { id: post_id, saved_by: { none: { id: user_id } } } });
        if (!user) return res.status(500).json({ message: 'can not add posts at this time' });
        if (!post) return res.status(404).json({ message: 'can not find post' });

        await prisma.post.update({
            where: { id: post_id }, data: {
                saved_by: {
                    connect: { id: user_id }
                }
            }
        })

        return res.status(200).json({ message: 'post saved successfully' });


    }

    catch (err) {
        console.log("Error Saving post", err);
        return res.status(500).json({ message: 'Error while Saving post' });
    }
}

const deleteSavedPost = async (req, res) => {
    const { id: user_id } = req.user;
    const { post_id } = req.params;
    if (!validator.isUUID(user_id)) return res.status(500).json({ message: 'Invalid User Information' });
    if (!validator.isUUID(post_id)) return res.status(400).json({ message: 'Invalid Post Information' });

    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        const post = await prisma.post.findUnique({ where: { id: post_id, saved_by: { some: { id: user_id } } } });
        if (!user) return res.status(500).json({ message: 'can not add posts at this time' });
        if (!post) return res.status(404).json({ message: 'can not find post' });

        await prisma.post.update({
            where: { id: post_id }, data: {
                saved_by: {
                    disconnect: { id: user_id }
                }
            }
        })

        return res.status(200).json({ message: 'post unsaved successfully' });

    }

    catch (err) {
        console.log("Error Deleting saved post", err);
        return res.status(500).json({ message: 'Error while Deleteing saved post' });
    }
}

const getSavedPost = async (req, res) => {
    const { id } = req.user;
    const {
        city, wilaya, bedrooms, bathrooms, living_rooms, garages, floor, type, status,
        min_price, max_price, min_surface, max_surface
    } = req.query;
    const filter = {
        ...(
            city || wilaya || bathrooms || bedrooms || living_rooms || garages || floor
                || type || status || min_price || max_price || min_surface || max_surface
                ? {
                    property: {
                        ...(city ? { city: { contains: city } } : {}),
                        ...(wilaya ? { wilaya: { contains: wilaya } } : {}),
                        ...(status ? { status: status } : {}),
                        ...(type ? { type: type } : {}),
                        ...(floor ? { floor: floor } : {}),
                        ...(bathrooms ? { bathrooms: { gte: bathrooms } } : {}),
                        ...(bedrooms ? { bedrooms: { gte: bedrooms } } : {}),
                        ...(living_rooms ? { living_rooms: { gte: living_rooms } } : {}),
                        ...(garages ? { garages: { gte: garages } } : {}),
                        ...(min_price || max_price ? { price: { gte: min_price || undefined, lte: max_price || undefined } } : {}),
                        ...(min_surface || max_surface ? { surface: { gte: min_surface || undefined, lte: max_price || undefined } } : {}),


                    }
                } : {}
        )
    }
    if (!validator.isUUID(id)) return res.status(500).json({ message: 'Invalid User Information' });
    try {
        const user = await prisma.user.findUnique({
            where: { id }, include: {

                saved_posts: {
                    include: { property: true, user: true, _count: true },
                    where: filter,
                    orderBy: { created_at: 'desc' }
                }
            }
        })
        if (!user) return res.status(500).json({ message: 'User information not found' });
        return res.status(200).json({ saved: user.saved_posts });


    }
    catch (err) {
        console.log("Error fetching saved posts", err);
        return res.status(500).json({ message: 'Error while fetching saved posts' });
    }
}
export { getUser, getSavedPost, addSavedPost, changeAvatar, deleteUser, deleteAvatar, deleteSavedPost, changeEmail, changePassword, updateUser }