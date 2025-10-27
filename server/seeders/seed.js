import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import Dosen from '../models/Dosen.js';
import Asisten from '../models/Asisten.js';
import Pengurus from '../models/Pengurus.js';
import Jadwal from '../models/Jadwal.js';

export const seedDatabase = async () => {
  try {
    // Check if data already exists
    const adminCount = await Admin.count();
    if (adminCount > 0) {
      console.log('✅ Database already seeded');
      return;
    }

    console.log('🌱 Seeding database...');

    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@labkom.unila.ac.id',
      password: hashedPassword,
      name: 'Admin LabKom'
    });

    // Create dosen
    await Dosen.bulkCreate([
      {
        name: 'Dr. Ahmad Fauzi, S.Kom., M.Kom',
        nip: '197801012005011001',
        subject: 'Pemrograman Web',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Dr. Siti Nurhaliza, S.Kom., M.T',
        nip: '198205152008012002',
        subject: 'Basis Data',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Budi Santoso, S.Kom., M.Kom',
        nip: '198907202012011003',
        subject: 'Jaringan Komputer',
        photo: '/uploads/default-avatar.png'
      }
    ]);

    // Create asisten
    await Asisten.bulkCreate([
      {
        name: 'Andi Pratama',
        division: 'Web Development',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Dewi Lestari',
        division: 'Database Management',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Reza Firmansyah',
        division: 'Network Administration',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Sari Indah',
        division: 'UI/UX Design',
        photo: '/uploads/default-avatar.png'
      }
    ]);

    // Create pengurus
    await Pengurus.bulkCreate([
      {
        name: 'Muhammad Rizki',
        position: 'Ketua Laboratorium',
        contact: '081234567890',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Fitri Handayani',
        position: 'Sekretaris',
        contact: '081234567891',
        photo: '/uploads/default-avatar.png'
      },
      {
        name: 'Dimas Prasetyo',
        position: 'Bendahara',
        contact: '081234567892',
        photo: '/uploads/default-avatar.png'
      }
    ]);

    // Create jadwal
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    await Jadwal.bulkCreate([
      // Piket
      {
        type: 'piket',
        title: 'Piket Senin',
        description: 'Shift pagi',
        date: today.toISOString().split('T')[0],
        time: '08:00 - 12:00',
        location: 'Lab Komputer 1',
        day: 'Senin'
      },
      {
        type: 'piket',
        title: 'Piket Selasa',
        description: 'Shift siang',
        date: tomorrow.toISOString().split('T')[0],
        time: '13:00 - 17:00',
        location: 'Lab Komputer 2',
        day: 'Selasa'
      },
      // Praktikum
      {
        type: 'praktikum',
        title: 'Praktikum Pemrograman Web',
        description: 'Kelas A - React.js Fundamentals',
        date: today.toISOString().split('T')[0],
        time: '10:00 - 12:00',
        location: 'Lab Komputer 1',
        day: 'Senin'
      },
      {
        type: 'praktikum',
        title: 'Praktikum Basis Data',
        description: 'Kelas B - SQL Advanced',
        date: tomorrow.toISOString().split('T')[0],
        time: '14:00 - 16:00',
        location: 'Lab Komputer 2',
        day: 'Selasa'
      },
      // Seminar
      {
        type: 'seminar',
        title: 'Seminar Teknologi AI dan Machine Learning',
        description: 'Membahas perkembangan terkini AI dan implementasinya',
        presenter: 'Dr. Ahmad Fauzi, S.Kom., M.Kom',
        date: nextWeek.toISOString().split('T')[0],
        time: '09:00 - 12:00',
        location: 'Auditorium Gedung H',
        day: 'Senin'
      },
      {
        type: 'seminar',
        title: 'Workshop Cybersecurity',
        description: 'Pelatihan keamanan jaringan dan sistem',
        presenter: 'Budi Santoso, S.Kom., M.Kom',
        date: nextWeek.toISOString().split('T')[0],
        time: '13:00 - 16:00',
        location: 'Lab Komputer 1',
        day: 'Rabu'
      }
    ]);

    console.log('✅ Database seeded successfully');
    console.log('📧 Admin email: admin@labkom.unila.ac.id');
    console.log('🔑 Admin password: admin123');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};
