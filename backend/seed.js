import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import User from './models/user.js';
import Event from './models/events.js';
import News from './models/news.js';

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');

        // Clear existing data (optional, ensures clean slate)
        console.log('Clearing old data...');
        await User.deleteMany({});
        await Event.deleteMany({});
        await News.deleteMany({});

        // 1. Create Admin User
        console.log('Creating Admin User...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const admin = new User({
            nis: 12345,
            password: hashedPassword
        });
        await admin.save();
        console.log('Admin user created (NIS: 12345, Password: admin123)');

        // 2. Create Sample Events
        console.log('Creating Sample Events...');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const events = [
            {
                judul: 'Rapat Paripurna MPK',
                start: today,
                end: today,
                time: '13:00 - 15:00',
                location: 'Aula Serbaguna',
                type: 'Keagamaan'
            },
            {
                judul: 'Debat Kandidat Ketua OSIS',
                start: tomorrow,
                end: tomorrow,
                time: '08:00 - 11:30',
                location: 'Lapangan Basket',
                type: 'Olahraga'
            }
        ];
        await Event.insertMany(events);
        console.log('Sample Events created');

        // 3. Create Sample News
        console.log('Creating Sample News...');
        const newsList = [
            {
                judul: 'Masa Kampanye Segera Dimulai!',
                deskripsi: 'Persiapkan dirimu untuk mendengarkan visi dan misi dari para kandidat ketua OSIS periode MABAR 2026/2027. Jangan lupa gunakan hak suaramu dengan bijak!',
                kategori: 'Pemberitahuan',
                authorName: 'Admin Pilkosis',
                isNewItem: true,
                tanggal: today
            },
            {
                judul: 'Sistem e-Voting Pilkosis Diresmikan',
                deskripsi: 'Tahun ini kita menggunakan sistem baru yang lebih transparan dan cepat untuk menghitung hasil suara secara realtime.',
                kategori: 'Berita Acara',
                authorName: 'Tim IT',
                isNewItem: true,
                tanggal: today
            }
        ];
        await News.insertMany(newsList);
        console.log('Sample News created');

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
