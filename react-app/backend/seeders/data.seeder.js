import { connect } from '../util/db.js'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { User } from '../src/models/user.model.js'
import { Project } from '../src/models/project.model.js'
import { Tag } from '../src/models/tags.model.js'
import { generateFriendlyId } from '../util/herlper.js'
import { Credential } from '../src/models/credential.model.js'
import { preDefinedProfessions, preDefinedLinks, preDefinedTags, countriesList } from '../config/user.data.config.js'
dotenv.config({ path: '../.env' })
import dotenv from 'dotenv'
const generateBio = (user) => {
    const templates = [
        `I'm ${user.firstName}, a ${user.profession} from ${user.country}. I'm known for my problem-solving skills and a passion for teamwork.`,
        `Hi, I’m ${user.firstName}! As a ${user.profession} based in ${user.country}, I thrive on creativity and collaboration to bring ideas to life.`,
        `Hello! My name is ${user.firstName}, and I work as a ${user.profession}. Currently living in ${user.country}, I believe in continuous improvement and adaptability.`,
        `I'm ${user.firstName}, a ${user.profession} from ${user.country}. I pride myself on my communication skills and love tackling challenges head-on.`,
        `Hey there! I’m ${user.firstName}, a ${user.profession} residing in ${user.country}. I'm passionate about innovation and enjoy working with diverse teams to achieve great results.`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
}
const fetchProfileImages = async (numImages = 1) => {
    const accessKey = 'vBOJId18dzavM7DE0Z_YkBKikfQPTewf3s1zgM-bNy4'
    const images = []

    try {
        const randomTag = faker.helpers.arrayElement([
            'person',
            'face',
            'portrait',
            'people',
            'man',
            'woman',
            faker.person.jobTitle(),
            faker.location.country(),
        ])

        const randomPage = Math.floor(Math.random() * 10) + 1
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${randomTag}&page=${randomPage}&client_id=${accessKey}&per_page=${numImages}`
        )
        const data = await response.json()
        data.results.forEach((image) => images.push(image.urls.regular))
    } catch (error) {
        console.error('Error fetching profile images:', error)
    }
    return images
}
const generateProjectTitle = (profession) => {
    const professionTitles = {
        'Web Developer': [
            'Responsive Portfolio for Modern Web Development',
            'E-commerce Platform for Seamless Shopping',
            'Social Media Dashboard with Real-time Features',
        ],
        'Software Engineer': [
            'Task Management System for Efficient Teamwork',
            'Inventory Management Software for Optimized Operations',
            'Smart Home Automation System with IoT Integration',
        ],
        'Graphic Designer': [
            'Brand Identity Revamp for Local Business',
            'Event Promotion Campaign with Eye-Catching Graphics',
            'Interactive Infographic Series for Data Visualization',
        ],
    }

    const defaultTitles = [
        'Innovative Project in Development',
        'Creative Solution for Industry Challenges',
        'Next-Gen Platform for Enhanced Experiences',
    ]
    return faker.helpers.arrayElement(professionTitles[profession] || defaultTitles)
}

const generateUserData = async (firstName, count) => {
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const users = await Promise.all(
        Array.from({ length: count }).map(async () => {
            const profession = getRandomElement(preDefinedProfessions)
            const country = getRandomElement(countriesList)

            const userImages = await fetchProfileImages()

            return {
                personalInfo: {
                    bio: generateBio({ firstName, profession, country }),
                    profession,
                    country,
                    username: firstName
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .concat(Math.floor(Math.random() * 1000).toString()),
                    // profilePicture: 'https://avatars.dicebear.com/api/bottts/tazim.svg',
                    profilePicture: userImages[0],
                    links: [
                        {
                            name: faker.helpers.arrayElement(preDefinedLinks),
                            url: faker.internet.url(),
                        },
                    ],
                },
                friendlyId: generateFriendlyId(firstName),
                userRole: 'user',
                approved: true,
                active: false,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            }
        })
    )

    return users
}
const generateProjectDescription = (profession) => {
    const professionDescriptions = {
        'Web Developer': [
            `This project titled "Responsive Portfolio" showcases my expertise in modern web technologies. As a web developer, I focused on creating a seamless user experience by employing responsive design principles, ensuring that the site performs well on various devices. I integrated features such as interactive elements and dynamic content, utilizing frameworks like React and Node.js to build an efficient and maintainable codebase. This project reflects my dedication to front-end and back-end development, as well as my commitment to delivering high-quality digital experiences.`,
            `In my project "E-commerce Solution," I tackled the challenge of creating a robust online shopping platform. As a web developer, I concentrated on enhancing user engagement through intuitive navigation and secure payment processing. By utilizing RESTful APIs and integrating third-party services, I aimed to provide a smooth and efficient shopping experience. This project not only demonstrates my technical skills but also my understanding of user behavior and market trends in e-commerce.`,
            `The project "Social Media Dashboard" reflects my work as a web developer, where I aimed to create an engaging platform for users to connect and share ideas. I utilized technologies such as HTML, CSS, and JavaScript to build an interactive user interface, while implementing backend services with Express and MongoDB for data management. This project emphasizes my ability to combine design with functionality, ensuring that users have an enjoyable and productive experience online.`,
        ],
        'Software Engineer': [
            `In my project "Task Management System," I developed a software solution that enhances team collaboration and productivity. As a software engineer, I focused on building a user-friendly interface that allows teams to track their tasks efficiently. I employed Agile methodologies throughout the development process to ensure that the project met user needs and adapted to changing requirements. This project showcases my skills in software architecture, database design, and effective communication with stakeholders.`,
            `The "Inventory Management Application" is a comprehensive software solution that I designed to optimize resource allocation and reduce operational costs. As a software engineer, I implemented features that allow users to monitor inventory levels in real-time, automate reorder processes, and generate detailed reports. This project highlights my ability to analyze business needs and translate them into technical solutions, demonstrating my commitment to delivering valuable software products.`,
            `Through the project "Smart Home Automation," I created a system that enhances daily living through technology. As a software engineer, I focused on integrating IoT devices to allow users to control their home environment seamlessly. This project involved extensive research and development in areas like cloud computing and machine learning, reflecting my ability to innovate and stay current with emerging technologies.`,
        ],
        'Graphic Designer': [
            `This design project, "Brand Identity Revamp," showcases my ability to convey ideas visually while enhancing brand recognition. As a graphic designer, I developed a comprehensive visual identity for a local business, including logo design, color palette, and typography. My approach involved researching the target audience and industry trends to create a cohesive and engaging brand presence. This project not only highlights my design skills but also my understanding of marketing strategies and consumer psychology.`,
            `In the project "Event Promotion Campaign," I focused on creating eye-catching visuals that effectively communicate the essence of the event. As a graphic designer, I utilized tools like Adobe Illustrator and Photoshop to craft promotional materials, including posters, social media graphics, and banners. This project underscores my commitment to collaboration, as I worked closely with the event organizers to ensure that the design aligns with their vision and goals.`,
            `The "Interactive Infographic Series" project demonstrates my expertise in transforming complex information into engaging visual content. As a graphic designer, I aimed to educate the audience through creative layouts and compelling visuals. By combining data visualization techniques with storytelling, I created a series of infographics that not only inform but also captivate viewers. This project reflects my passion for merging design with meaningful communication.`,
        ],
    }

    const descriptions = professionDescriptions[profession] || [
        `This project showcases my skills and commitment to quality work. I strive to create effective solutions that meet user needs and exceed expectations.`,
    ]

    return faker.helpers.arrayElement(descriptions)
}

const fetchProjectImages = async (profession, numImages = 3) => {
    const accessKey = 'vBOJId18dzavM7DE0Z_YkBKikfQPTewf3s1zgM-bNy4'
    const images = []
    const randomPage = Math.floor(Math.random() * 15) + 1

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${profession}&page=${randomPage}&client_id=${accessKey}&per_page=${numImages}`
        )
        const data = await response.json()
        data.results.forEach((image) => images.push(image.urls.regular))
    } catch (error) {
        console.error(`Error fetching images for profession: ${profession}`, error)
    }

    return images
}

const generateUserCredentialData = (userId) => {
    return {
        _id: userId,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        mobile: faker.phone.number(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
    }
}

const generateProjectsData = async (count, userIds) => {
    const projects = []

    for (let i = 0; i < count; i++) {
        const numTags = faker.number.int({ min: 1, max: 5 })
        const projectTags = Array.from({ length: numTags }).map(
            () => new mongoose.Types.ObjectId(faker.helpers.arrayElement(userIds))
        )
        const user = await User.findById(faker.helpers.arrayElement(userIds))
        const profession = user.personalInfo.profession
        const projectImages = await fetchProjectImages(profession, 3)

        projects.push({
            userId: user._id,
            title: generateProjectTitle(profession),
            description: generateProjectDescription(profession),
            projectUrl: faker.internet.url(),
            // projectImage: 'https://source.unsplash.com/random',
            // projectThumbnail: 'https://source.unsplash.com/random',
            projectImage: projectImages,
            projectThumbnail: projectImages[0],
            tags: projectTags,
        })
    }

    return projects
}

const generateTagsData = (count) => {
    return Array.from({ length: count }).map(() => ({
        name: faker.helpers.arrayElement(preDefinedTags),
    }))
}

const deleteExistingData = async () => {
    try {
        await Promise.all([User.deleteMany({}), Project.deleteMany({}), Tag.deleteMany({}), Credential.deleteMany({})])
        console.log('Existing data deleted successfully')
    } catch (error) {
        console.error('Failed to delete existing data:', error)
        throw error
    }
}

const insertData = async () => {
    try {
        const tags = generateTagsData(10)
        await Tag.insertMany(tags)
        const allTags = await Tag.find({}, '_id').exec()
        const tagIds = allTags.map((tag) => tag._id.toString())
        const userPromises = Array.from({ length: 10 }).map(async () => {
            const userId = new mongoose.Types.ObjectId()
            const credential = generateUserCredentialData(userId)
            await Credential.create(credential)
            const userData = await generateUserData(credential.firstName, 1)
            const userWithId = { _id: userId, ...userData[0] }

            return User.create(userWithId)
        })

        await Promise.all(userPromises)
        const allUsers = await User.find({}, '_id').exec()
        const userIds = allUsers.map((user) => user._id.toString())
        const projects = await generateProjectsData(20, userIds, tagIds)
        await Project.insertMany(projects)

        console.log('Data inserted successfully')
    } catch (error) {
        console.error('Failed to insert data:', error)
        throw error
    }
}

const seed = async () => {
    try {
        await connect()
        await deleteExistingData()
        await insertData()
        console.log('Data seeding completed successfully')
        process.exit(0)
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}
seed()
