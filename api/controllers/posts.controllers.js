import prisma from '../config/db.js';
import Validator from '../utils/validations.js';
const validator = new Validator();

const getPosts = async (req, res) => {
    const {
        city, wilaya, bedrooms, bathrooms, living_rooms, garages, floor, type, status,
        min_price, max_price, min_surface, max_surface, page = 1
    } = req.query;

    const pageSize = 20;
    const skip = (page - 1) * pageSize;
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
                        ...(floor ? { floor: Number.parseInt(floor) } : {}),
                        ...(bathrooms ? { bath_rooms: { gte: Number.parseInt(bathrooms) } } : {}),
                        ...(bedrooms ? { bed_rooms: { gte: Number.parseInt(bedrooms) } } : {}),
                        ...(living_rooms ? { living_rooms: { gte: Number.parseInt(living_rooms) } } : {}),
                        ...(garages ? { garages: { gte: Number.parseInt(garages) } } : {}),
                        ...(min_price || max_price ? { price: { gte: Number.parseFloat(min_price) || undefined, lte: Number.parseFloat(max_price) || undefined } } : {}),
                        ...(min_surface || max_surface ? { surface: { gte: Number.parseFloat(min_surface) || undefined, lte: Number.parseFloat(max_surface) || undefined } } : {}),


                    }
                } : {}
        )
    }
    try {
        const total = await prisma.post.count({ where: filter });
        const posts = await prisma.post.findMany({
            where: filter,
            include: {
                user: { include: { avatar: true } },
                property: {
                    include: { media: true },
                }
            },
            orderBy: {
                created_at: 'desc',
            },
            take: pageSize,
            skip
        });

        return res.status(200).json({ posts, total });
    }


    catch (err) {
        console.log("Error While Getting Posts\n", err)
        return res.status(500).json({ message: "An error occurred while processing your request" });
    }


}
const getPostsById = async (req, res) => {
    const { id } = req.params;
    if (!validator.isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                saved_by: true,
                property: {
                    include: { media: true },
                },
                user: { include: { avatar: true } },

            }
        });
        if (!post) return res.status(404).json({ message: "post not found" });
        return res.status(200).json({ post });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while getting post" });
    }
}
const createPost = async (req, res) => {
    const { id } = req.user;
    const {
        title, description, attitude, longitude, address, wilaya, city, bed_rooms, bath_rooms, garages,
        living_rooms, floor, surface, type, media, price, status
    } = req.body;


    if (!validator.isUUID(id)) return res.status(400).json({ message: "invalid user informations" });
    if (!title || !description || !attitude || !longitude || !address || !wilaya || !city || !bed_rooms || !bath_rooms || !garages || !living_rooms || floor === undefined || !surface || !type || !media || !price || !status) return res.status(400).json({ message: "missing required fields" });
    if (type !== 'APARTMENT' && type !== "VILLA" && type !== "HOUSE" && type !== "OFFICE" && type !== "STUDIO" && type !== "GARAGE" && type !== "OTHER") return res.status(400).json({ message: "invalid type provided" });
    if (status !== "FOR_SALE" && status !== "FOR_RENT" && status !== "SOLD" && status !== "RENTED") return res.status(400).json({ message: "invalid status provided" });

    if (!validator.isInt(floor)) return res.status(400).json({ message: "floor must be an integer" });
    if (!validator.isInt(bath_rooms)) return res.status(400).json({ message: "bath_rooms must be an integer" });
    if (!validator.isInt(bed_rooms)) return res.status(400).json({ message: "bed_rooms must be an integer" });
    if (!validator.isInt(garages)) return res.status(400).json({ message: "floor must be an integer" });
    if (!validator.isInt(living_rooms)) return res.status(400).json({ message: "living_rooms must be an integer" });

    if (!validator.isFloat(price)) return res.status(400).json({ message: "price must be decimal" });
    if (!validator.isFloat(surface)) return res.status(400).json({ message: "surface must be decimal" });
    if (!validator.isFloat(attitude)) return res.status(400).json({ message: "attitude must be decimal" });
    if (!validator.isFloat(longitude)) return res.status(400).json({ message: "longitude must be decimal" });




    try {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(500).json({ message: "can not create a post at the moment" });
        if (!user.isSeller) return res.status(403).json({ message: "this user can not create a post at the moment" });
        const post = await prisma.post.create({
            data: {
                title: validator.sanitizeInput(title),
                description: validator.sanitizeInput(description),
                user_id: user.id,
                property: {
                    create: {
                        attitude,
                        longitude,
                        address: validator.sanitizeInput(address),
                        wilaya: validator.sanitizeInput(wilaya),
                        city: validator.sanitizeInput(city),
                        bed_rooms,
                        bath_rooms,
                        garages,
                        living_rooms,
                        floor,
                        surface,
                        type,
                        media: {
                            createMany: { data: media }
                        },
                        price,
                        status,

                    }
                }
            }
        });
        return res.status(201).json({ post, message: "post created successfully" });


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error while creating post" });
    }
}
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;
    const { title, description, attitude, longitude, address, wilaya, city, bed_rooms, bath_rooms, garages, living_rooms, floor, surface, type, price, status } = req.body;
    if (!validator.isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    if (!validator.isUUID(user_id)) return res.status(400).json({ message: "invalid user informations" });
    if (!title || !description || !attitude || !longitude || !address || !wilaya || !city || !bed_rooms || !bath_rooms || !garages || !living_rooms || floor === undefined || !surface || !type || !price || !status) return res.status(400).json({ message: "missing required fields" });
    if (type !== 'APARTMENT' && type !== "VILLA" && type !== "HOUSE" && type !== "OFFICE" && type !== "STUDIO" && type !== "GARAGE" && type !== "OTHER") return res.status(400).json({ message: "invalid type provided" });
    if (status !== "FOR_SALE" && status !== "FOR_RENT" && status !== "SOLD" && status !== "RENTED") return res.status(400).json({ message: "invalid status provided" });

    if (!validator.isInt(floor)) return res.status(400).json({ message: "floor must be an integer" });
    if (!validator.isInt(bath_rooms)) return res.status(400).json({ message: "bath_rooms must be an integer" });
    if (!validator.isInt(bed_rooms)) return res.status(400).json({ message: "bed_rooms must be an integer" });
    if (!validator.isInt(garages)) return res.status(400).json({ message: "floor must be an integer" });
    if (!validator.isInt(living_rooms)) return res.status(400).json({ message: "living_rooms must be an integer" });

    if (!validator.isFloat(price)) return res.status(400).json({ message: "price must be decimal" });
    if (!validator.isFloat(surface)) return res.status(400).json({ message: "surface must be decimal" });
    if (!validator.isFloat(attitude)) return res.status(400).json({ message: "attitude must be decimal" });
    if (!validator.isFloat(longitude)) return res.status(400).json({ message: "longitude must be decimal" });

    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(500).json({ message: "can not update post user inforamtion invalid" });
        if (!user.isSeller) return res.status(403).json({ message: "can not update post user is not a seller" });
        const post = await prisma.post.findUnique({ where: { id, user_id } });
        if (!post) return res.status(404).json({ message: "can not find post to update" });

        await prisma.post.update({
            where: { id },
            data: {
                title: validator.sanitizeInput(title),
                description: validator.sanitizeInput(description),
                property: {
                    update: {
                        attitude,
                        longitude,
                        address: validator.sanitizeInput(address),
                        wilaya: validator.sanitizeInput(wilaya),
                        city: validator.sanitizeInput(city),
                        bed_rooms,
                        bath_rooms,
                        garages,
                        living_rooms,
                        floor,
                        surface,
                        type,
                        price,
                        status,
                    }
                }
            }
        });

        return res.status(200).json({ post, message: "post updated successfully" });

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error while updating post" });
    }
}
const deletePostById = async (req, res) => {
    const { id: user_id } = req.user;
    const { id } = req.params;
    if (!validator.isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    if (!validator.isUUID(user_id)) return res.status(400).json({ message: "invalid user informations" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(500).json({ message: "can not delete post user inforamtion invalid" });
        if (!user.isSeller) return res.status(403).json({ message: "can not delete post user is not a seller" });
        const post = await prisma.post.findUnique({ where: { id, user_id } });
        if (!post) return res.status(404).json({ message: "can not find post to delete" });
        await prisma.post.delete({ where: { id } });
        return res.status(200).json({ message: "post deleted successfully" });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error while deleting post" });
    }
}
const addMedia = async (req, res) => {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const { display_url, bucket_url } = req.body;

    if (!validator.isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    if (!validator.isUUID(user_id)) return res.status(400).json({ message: "invalid user informations" });

    if (!display_url || !bucket_url) return res.status(400).json({ message: "no url provided" });

    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(500).json({ message: "can not add media user inforamtion invalid" });
        if (!user.isSeller) return res.status(403).json({ message: "user can not update posts" });
        const post = await prisma.post.findUnique({ where: { id, user_id }, select: { property: { select: { id: true } } } });
        if (!post) return res.status(404).json({ message: "can not find post to add media" });
        const newMedia = await prisma.media.create({ data: { display_url, bucket_url, property_id: post.property.id } });
        return res.status(201).json({ media: newMedia, message: "media created successfully" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error while creating media" });
    }


}
const deleteMedia = async (req, res) => {
    const { id: user_id } = req.user;
    const { post_id, media_id } = req.params;
    if (!validator.isUUID(user_id)) return res.status(400).json({ message: "invalid user informations" });
    if (!validator.isUUID(post_id)) return res.status(400).json({ message: "invalid url parameter <post id>" });
    if (!validator.isInt(media_id)) return res.status(400).json({ message: "invalid url parameter <media id>" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(500).json({ message: "can not delete media user inforamtion invalid" });
        if (!user.isSeller) return res.status(403).json({ message: "can not delete media user is not seller" });
        const post = await prisma.post.findUnique({ where: { id: post_id, user_id }, select: { property: { select: { id: true } } } });
        if (!post) return res.status(404).json({ message: "can not find post to delete media" });

        const media = await prisma.media.findUnique({ where: { id: Number.parseInt(media_id), property_id: post.property.id } });
        if (!media) return res.status(404).json({ message: "can not find media to delete" });
        await prisma.media.delete({ where: { id: Number.parseInt(media_id) } });
        return res.status(200).json({ message: "media deleted successfully" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error while deleting media" });
    }
}
export { getPosts, getPostsById, createPost, updatePost, addMedia, deleteMedia, deletePostById }