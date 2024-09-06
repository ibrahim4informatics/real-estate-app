import { faker } from '@faker-js/faker'
import prisma from './config/db.js'
// for (let i = 0; i < 10; i++){


//     await prisma.user.create({
//         data:{
//             email: faker.internet.email(),
//             phone: faker.phone.number(),
//             full_name: faker.person.fullName(),
//             isSeller: faker.datatype.boolean(),
//             password: 'password123',
//             avatar: {create:{display_url: faker.image.avatar(), bucket_url: faker.image.avatar()}},

//         }
//     })

// }


// const getWilaya = (lat, long)={

// }

const users = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id)
const saved_users = (await prisma.user.findMany({ where: { isSeller: false }, select: { id: true } })).map(u => u.id)

console.log(saved_users)


try {
    for (let i = 0; i < 200; i++) {
        await prisma.post.create({
            data: {
                title: faker.word.words({ count: { min: 3, max: 7 } }),
                description: faker.word.words({ count: {min:5, max:20} }),
                user_id: faker.string.fromCharacters(users),
                saved_by: { connect: { id: faker.string.fromCharacters(saved_users) } },

                property: {
                    create: {
                        address: faker.word.words(3),
                        attitude: faker.location.latitude({ min: 18.96, max: 37.09 }),
                        longitude: faker.location.longitude({ min: -8.67, max: 11.98 }),
                        wilaya: faker.location.county(),
                        city: faker.location.city(),
                        bed_rooms: faker.number.int({ min: 0, max: 8 }),
                        living_rooms:faker.number.int({ min:1, max: 8 }),
                        bath_rooms: faker.number.int({ min: 1, max: 5 }),
                        floor: faker.number.int({ min: 0, max: 40 }),
                        garages: faker.number.int({ min: 0, max: 10 }),
                        type: faker.string.fromCharacters(["APARTMENT", "VILLA", "HOUSE", "OFFICE", "STUDIO", "GARAGE", "OTHER"]),
                        status: faker.string.fromCharacters(["FOR_SALE", "FOR_RENT", "SOLD", "RENTED"]),
                        surface: faker.number.float({ min: 40, max: 200 }),
                        price: faker.number.float({ min: 10000, max: 90000000 }),
                        media: {
                            createMany: {
                                data: [
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings', width:1920, height:1080 }), bucket_url: 'gs:firebase' },
                                    { display_url: faker.image.urlLoremFlickr({ category: 'buildings' , width:1920, height:1080}), bucket_url: 'gs:firebase' },
                                ]
                            }
                        }

                    }

                }
            }
        })
    }
}
catch (e){
    console.log(e)
}
console.log('finish')