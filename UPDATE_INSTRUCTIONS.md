# 🔄 Update Instructions - LabKom Unila Website

## ✅ Yang Sudah Selesai

### Backend
1. ✅ Model baru dibuat:
   - `Pengajuan.js` - untuk form pengajuan
   - `PraktikumDetail.js` - untuk detail praktikum
   - `Gallery.js` - untuk galeri foto

2. ✅ Controller baru dibuat:
   - `pengajuanController.js`
   - `praktikumDetailController.js`
   - `galleryController.js`

3. ✅ Routes baru dibuat:
   - `/api/pengajuan`
   - `/api/praktikum-detail`
   - `/api/gallery`

4. ✅ Server.js sudah diupdate dengan routes baru

5. ✅ Middleware upload sudah diupdate untuk support PDF & dokumen

### Frontend
1. ✅ Package.json sudah ditambah `jspdf`
2. ✅ API utilities sudah ditambah untuk fitur baru
3. ✅ Navbar sudah diupdate:
   - Menu "Admin" dihapus
   - Menu "Pengajuan" ditambah dengan 3 submenu

4. ✅ Pages baru dibuat:
   - `PengajuanForm.jsx` - form reusable
   - `Pengajuan/Seminar.jsx`
   - `Pengajuan/Kelas.jsx`
   - `Pengajuan/Penelitian.jsx`
   - `PraktikumNew.jsx` - dengan search, filter, history, dan gallery

5. ✅ Utility PDF generator dibuat (`pdfGenerator.js`)

6. ✅ App.jsx sudah diupdate dengan routes baru

---

## 📝 Yang Perlu Dilakukan Selanjutnya

### 1. Install Dependencies Baru

**Backend:**
```bash
cd server
# Tidak ada dependency baru, sudah menggunakan yang ada
```

**Frontend:**
```bash
cd client
npm install jspdf
```

### 2. Restart Server

Setelah install, restart kedua server:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend (terminal baru):**
```bash
cd client
npm run dev
```

### 3. Database akan Auto-Update

Saat server backend dijalankan, Sequelize akan otomatis membuat tabel baru:
- `pengajuan`
- `praktikum_detail`
- `gallery`

### 4. Update Admin Dashboard (Manual)

Anda perlu menambahkan 3 tab baru di Dashboard untuk mengelola:

**Tambahkan di `client/src/pages/Admin/Dashboard.jsx`:**

#### A. Import API baru (di bagian atas):
```javascript
import { dosenAPI, asistenAPI, pengurusAPI, jadwalAPI, pengajuanAPI, praktikumDetailAPI, galleryAPI } from '../../utils/api';
import { FileText, Image } from 'lucide-react';
```

#### B. Tambah state baru (setelah state yang ada):
```javascript
const [pengajuan, setPengajuan] = useState([]);
const [praktikumDetails, setPraktikumDetails] = useState([]);
const [galleryItems, setGalleryItems] = useState([]);
```

#### C. Update fetchAllData untuk include data baru:
```javascript
const fetchAllData = async () => {
  try {
    const [
      dosenRes, asistenRes, pengurusRes, 
      piketRes, praktikumRes, seminarRes,
      pengajuanRes, praktikumDetailRes, galleryRes
    ] = await Promise.all([
      dosenAPI.getAll(),
      asistenAPI.getAll(),
      pengurusAPI.getAll(),
      jadwalAPI.getAll('piket'),
      jadwalAPI.getAll('praktikum'),
      jadwalAPI.getAll('seminar'),
      pengajuanAPI.getAll(),
      praktikumDetailAPI.getAll(),
      galleryAPI.getAll(),
    ]);

    setDosen(dosenRes.data);
    setAsisten(asistenRes.data);
    setPengurus(pengurusRes.data);
    setJadwalPiket(piketRes.data);
    setJadwalPraktikum(praktikumRes.data);
    setJadwalSeminar(seminarRes.data);
    setPengajuan(pengajuanRes.data);
    setPraktikumDetails(praktikumDetailRes.data);
    setGalleryItems(galleryRes.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Gagal memuat data');
  }
};
```

#### D. Tambah tabs baru di array `tabs`:
```javascript
const tabs = [
  { id: 'dosen', name: 'Dosen', icon: GraduationCap },
  { id: 'asisten', name: 'Asisten', icon: Users },
  { id: 'pengurus', name: 'Pengurus', icon: UserCog },
  { id: 'piket', name: 'Jadwal Piket', icon: Calendar },
  { id: 'praktikum', name: 'Jadwal Praktikum', icon: BookOpen },
  { id: 'seminar', name: 'Jadwal Seminar', icon: Presentation },
  { id: 'pengajuan', name: 'Pengajuan', icon: FileText },
  { id: 'praktikum-detail', name: 'Detail Praktikum', icon: BookOpen },
  { id: 'gallery', name: 'Galeri', icon: Image },
];
```

#### E. Tambah case di renderTable() untuk tab baru:
```javascript
// Setelah case seminar, tambahkan:

else if (activeTab === 'pengajuan') {
  const columns = [
    { header: 'Jenis', accessor: 'jenis' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'NPM', accessor: 'npm' },
    { header: 'Tanggal', accessor: 'tanggal', render: (row) => new Date(row.tanggal).toLocaleDateString('id-ID') },
    { header: 'Status', accessor: 'status' },
  ];
  return <Table columns={columns} data={pengajuan} actions={actions} />;
} else if (activeTab === 'praktikum-detail') {
  const columns = [
    { header: 'Nama', accessor: 'nama' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Semester', accessor: 'semester' },
    { header: 'Dosen PJ', accessor: 'dosenPJ' },
  ];
  return <Table columns={columns} data={praktikumDetails} actions={actions} />;
} else if (activeTab === 'gallery') {
  const columns = [
    { header: 'Judul', accessor: 'title' },
    { header: 'Kategori', accessor: 'category' },
  ];
  return <Table columns={columns} data={galleryItems} actions={actions} />;
}
```

#### F. Tambah form fields di renderForm():
```javascript
// Setelah form jadwal, tambahkan:

else if (activeTab === 'pengajuan') {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
        <select
          name="status"
          value={formData.status || 'pending'}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </>
  );
} else if (activeTab === 'praktikum-detail') {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Nama Praktikum</label>
        <input
          type="text"
          name="nama"
          value={formData.nama || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tahun</label>
          <input
            type="number"
            name="tahun"
            value={formData.tahun || new Date().getFullYear()}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Semester</label>
          <select
            name="semester"
            value={formData.semester || 'Ganjil'}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          >
            <option value="Ganjil">Ganjil</option>
            <option value="Genap">Genap</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Dosen PJ</label>
        <input
          type="text"
          name="dosenPJ"
          value={formData.dosenPJ || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Penanggung Jawab</label>
        <input
          type="text"
          name="penanggungJawab"
          value={formData.penanggungJawab || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          required
        />
      </div>
    </>
  );
} else if (activeTab === 'gallery') {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
          rows="3"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
        />
      </div>
    </>
  );
}
```

---

## 🎯 Testing Checklist

Setelah semua selesai, test fitur-fitur baru:

### Pengajuan
- [ ] Buka `/pengajuan/seminar`
- [ ] Isi form lengkap
- [ ] Klik "Simpan & Unduh PDF"
- [ ] PDF terdownload otomatis
- [ ] Modal sukses muncul
- [ ] Data tersimpan di database

### Praktikum dengan Fitur Baru
- [ ] Buka `/jadwal/praktikum`
- [ ] Search bar berfungsi
- [ ] Riwayat per tahun tampil
- [ ] Bisa expand/collapse tahun dan semester
- [ ] Klik praktikum menampilkan detail
- [ ] Galeri foto tampil di bawah

### Admin Dashboard
- [ ] Tab "Pengajuan" tampil
- [ ] Tab "Detail Praktikum" tampil
- [ ] Tab "Galeri" tampil
- [ ] Bisa CRUD untuk semua tab baru

---

## 📞 Jika Ada Error

### Error: Module not found
```bash
cd client
npm install
```

### Error: Table doesn't exist
- Restart backend server
- Sequelize akan auto-create tables

### Error: Cannot read property
- Clear browser cache
- Restart dev server

---

## 🎉 Setelah Semua Berjalan

Website Anda sekarang memiliki:
1. ✅ Menu Pengajuan dengan 3 jenis (Seminar, Kelas, Penelitian)
2. ✅ PDF auto-generate untuk pengajuan
3. ✅ Jadwal Praktikum dengan search & filter
4. ✅ Riwayat praktikum per tahun/semester
5. ✅ Detail praktikum lengkap (dosen, asisten, modul, nilai)
6. ✅ Galeri foto praktikum dengan lightbox
7. ✅ Admin dashboard untuk kelola semua data baru

**Semua dengan tema dark elegan yang konsisten!** 🚀
