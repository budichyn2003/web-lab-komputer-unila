import { dosenAPI, asistenAPI, pengurusAPI, jadwalAPI, pengajuanAPI, praktikumDetailAPI, galleryAPI } from '../../utils/api';
import { FileText, Image } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  GraduationCap, 
  Users, 
  UserCog, 
  Calendar,
  BookOpen,
  Presentation,
  Plus,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dosen');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [praktikumDetails, setPraktikumDetails] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  // Data states
  const [dosen, setDosen] = useState([]);
  const [asisten, setAsisten] = useState([]);
  const [pengurus, setPengurus] = useState([]);
  const [jadwalPiket, setJadwalPiket] = useState([]);
  const [jadwalPraktikum, setJadwalPraktikum] = useState([]);
  const [jadwalSeminar, setJadwalSeminar] = useState([]);

  // Form states
  const [formData, setFormData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

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

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logout berhasil');
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setFormData(item || {});
    setPhotoFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({});
    setPhotoFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      if (activeTab === 'dosen') {
        formDataToSend.append('name', formData.name);
        formDataToSend.append('nip', formData.nip);
        formDataToSend.append('subject', formData.subject);
        if (photoFile) formDataToSend.append('photo', photoFile);

        if (modalMode === 'create') {
          await dosenAPI.create(formDataToSend);
          toast.success('Dosen berhasil ditambahkan');
        } else {
          await dosenAPI.update(selectedItem.id, formDataToSend);
          toast.success('Dosen berhasil diupdate');
        }
        const res = await dosenAPI.getAll();
        setDosen(res.data);
      } else if (activeTab === 'asisten') {
        formDataToSend.append('name', formData.name);
        formDataToSend.append('division', formData.division);
        if (photoFile) formDataToSend.append('photo', photoFile);

        if (modalMode === 'create') {
          await asistenAPI.create(formDataToSend);
          toast.success('Asisten berhasil ditambahkan');
        } else {
          await asistenAPI.update(selectedItem.id, formDataToSend);
          toast.success('Asisten berhasil diupdate');
        }
        const res = await asistenAPI.getAll();
        setAsisten(res.data);
      } else if (activeTab === 'pengurus') {
        formDataToSend.append('name', formData.name);
        formDataToSend.append('position', formData.position);
        formDataToSend.append('contact', formData.contact || '');
        if (photoFile) formDataToSend.append('photo', photoFile);

        if (modalMode === 'create') {
          await pengurusAPI.create(formDataToSend);
          toast.success('Pengurus berhasil ditambahkan');
        } else {
          await pengurusAPI.update(selectedItem.id, formDataToSend);
          toast.success('Pengurus berhasil diupdate');
        }
        const res = await pengurusAPI.getAll();
        setPengurus(res.data);
      } else if (activeTab === 'pengajuan') {
        // Pengajuan - only update status
        const pengajuanData = {
          status: formData.status
        };

        if (modalMode === 'edit') {
          await pengajuanAPI.update(selectedItem.id, pengajuanData);
          toast.success('Status pengajuan berhasil diupdate');
        }
        const res = await pengajuanAPI.getAll();
        setPengajuan(res.data);
      } else if (activeTab === 'praktikum-detail') {
        formDataToSend.append('nama', formData.nama);
        formDataToSend.append('tahun', formData.tahun);
        formDataToSend.append('semester', formData.semester);
        formDataToSend.append('dosenPJ', formData.dosenPJ);
        formDataToSend.append('penanggungJawab', formData.penanggungJawab);

        if (modalMode === 'create') {
          await praktikumDetailAPI.create(formDataToSend);
          toast.success('Detail praktikum berhasil ditambahkan');
        } else {
          await praktikumDetailAPI.update(selectedItem.id, formDataToSend);
          toast.success('Detail praktikum berhasil diupdate');
        }
        const res = await praktikumDetailAPI.getAll();
        setPraktikumDetails(res.data);
      } else if (activeTab === 'gallery') {
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description || '');
        formDataToSend.append('category', formData.category || 'praktikum');
        if (photoFile) formDataToSend.append('image', photoFile);

        if (modalMode === 'create') {
          await galleryAPI.create(formDataToSend);
          toast.success('Galeri berhasil ditambahkan');
        } else {
          await galleryAPI.update(selectedItem.id, formDataToSend);
          toast.success('Galeri berhasil diupdate');
        }
        const res = await galleryAPI.getAll();
        setGalleryItems(res.data);
      } else {
        // Jadwal
        const jadwalData = {
          type: activeTab === 'piket' ? 'piket' : activeTab === 'praktikum' ? 'praktikum' : 'seminar',
          title: formData.title,
          description: formData.description || '',
          presenter: formData.presenter || '',
          date: formData.date,
          time: formData.time || '',
          location: formData.location || '',
          day: formData.day || '',
        };

        if (modalMode === 'create') {
          await jadwalAPI.create(jadwalData);
          toast.success('Jadwal berhasil ditambahkan');
        } else {
          await jadwalAPI.update(selectedItem.id, jadwalData);
          toast.success('Jadwal berhasil diupdate');
        }

        if (activeTab === 'piket') {
          const res = await jadwalAPI.getAll('piket');
          setJadwalPiket(res.data);
        } else if (activeTab === 'praktikum') {
          const res = await jadwalAPI.getAll('praktikum');
          setJadwalPraktikum(res.data);
        } else {
          const res = await jadwalAPI.getAll('seminar');
          setJadwalSeminar(res.data);
        }
      }

      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      if (activeTab === 'dosen') {
        await dosenAPI.delete(id);
        const res = await dosenAPI.getAll();
        setDosen(res.data);
      } else if (activeTab === 'asisten') {
        await asistenAPI.delete(id);
        const res = await asistenAPI.getAll();
        setAsisten(res.data);
      } else if (activeTab === 'pengurus') {
        await pengurusAPI.delete(id);
        const res = await pengurusAPI.getAll();
        setPengurus(res.data);
      } else if (activeTab === 'pengajuan') {
        await pengajuanAPI.delete(id);
        const res = await pengajuanAPI.getAll();
        setPengajuan(res.data);
      } else if (activeTab === 'praktikum-detail') {
        await praktikumDetailAPI.delete(id);
        const res = await praktikumDetailAPI.getAll();
        setPraktikumDetails(res.data);
      } else if (activeTab === 'gallery') {
        await galleryAPI.delete(id);
        const res = await galleryAPI.getAll();
        setGalleryItems(res.data);
      } else {
        await jadwalAPI.delete(id);
        if (activeTab === 'piket') {
          const res = await jadwalAPI.getAll('piket');
          setJadwalPiket(res.data);
        } else if (activeTab === 'praktikum') {
          const res = await jadwalAPI.getAll('praktikum');
          setJadwalPraktikum(res.data);
        } else {
          const res = await jadwalAPI.getAll('seminar');
          setJadwalSeminar(res.data);
        }
      }
      toast.success('Data berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus data');
    }
  };

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

  const renderTable = () => {
    const actions = (row) => (
      <>
        <Button
          size="sm"
          variant="secondary"
          icon={<Edit size={16} />}
          onClick={() => openModal('edit', row)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          icon={<Trash2 size={16} />}
          onClick={() => handleDelete(row.id)}
        >
          Hapus
        </Button>
      </>
    );

    if (activeTab === 'dosen') {
      const columns = [
        { header: 'Nama', accessor: 'name' },
        { header: 'NIP', accessor: 'nip' },
        { header: 'Mata Kuliah', accessor: 'subject' },
      ];
      return <Table columns={columns} data={dosen} actions={actions} />;
    } else if (activeTab === 'asisten') {
      const columns = [
        { header: 'Nama', accessor: 'name' },
        { header: 'Divisi', accessor: 'division' },
      ];
      return <Table columns={columns} data={asisten} actions={actions} />;
    } else if (activeTab === 'pengurus') {
      const columns = [
        { header: 'Nama', accessor: 'name' },
        { header: 'Jabatan', accessor: 'position' },
        { header: 'Kontak', accessor: 'contact' },
      ];
      return <Table columns={columns} data={pengurus} actions={actions} />;
    } else if (activeTab === 'piket') {
      const columns = [
        { header: 'Judul', accessor: 'title' },
        { header: 'Hari', accessor: 'day' },
        { header: 'Tanggal', accessor: 'date', render: (row) => new Date(row.date).toLocaleDateString('id-ID') },
        { header: 'Waktu', accessor: 'time' },
        { header: 'Lokasi', accessor: 'location' },
      ];
      return <Table columns={columns} data={jadwalPiket} actions={actions} />;
    } else if (activeTab === 'praktikum') {
      const columns = [
        { header: 'Mata Kuliah', accessor: 'title' },
        { header: 'Hari', accessor: 'day' },
        { header: 'Tanggal', accessor: 'date', render: (row) => new Date(row.date).toLocaleDateString('id-ID') },
        { header: 'Waktu', accessor: 'time' },
        { header: 'Lokasi', accessor: 'location' },
      ];
      return <Table columns={columns} data={jadwalPraktikum} actions={actions} />;
    } else if (activeTab === 'seminar') {
      const columns = [
        { header: 'Judul', accessor: 'title' },
        { header: 'Pembicara', accessor: 'presenter' },
        { header: 'Tanggal', accessor: 'date', render: (row) => new Date(row.date).toLocaleDateString('id-ID') },
        { header: 'Waktu', accessor: 'time' },
        { header: 'Lokasi', accessor: 'location' },
      ];
      return <Table columns={columns} data={jadwalSeminar} actions={actions} />;
    } else if (activeTab === 'pengajuan') {
      const columns = [
        { header: 'Jenis', accessor: 'jenis', render: (row) => row.jenis.charAt(0).toUpperCase() + row.jenis.slice(1) },
        { header: 'Nama', accessor: 'nama' },
        { header: 'NPM', accessor: 'npm' },
        { header: 'Tanggal', accessor: 'tanggal', render: (row) => new Date(row.tanggal).toLocaleDateString('id-ID') },
        { header: 'Status', accessor: 'status', render: (row) => (
          <span className={`px-2 py-1 rounded text-xs ${
            row.status === 'approved' ? 'bg-green-500/20 text-green-400' :
            row.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {row.status}
          </span>
        )},
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
  };

  const renderForm = () => {
    if (activeTab === 'dosen') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">NIP</label>
            <input
              type="text"
              name="nip"
              value={formData.nip || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mata Kuliah</label>
            <input
              type="text"
              name="subject"
              value={formData.subject || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
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
    } else if (activeTab === 'asisten') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Divisi</label>
            <input
              type="text"
              name="division"
              value={formData.division || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
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
    } else if (activeTab === 'pengurus') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Jabatan</label>
            <input
              type="text"
              name="position"
              value={formData.position || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Kontak</label>
            <input
              type="text"
              name="contact"
              value={formData.contact || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
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
    } else if (activeTab === 'pengajuan') {
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
    } else if (activeTab === 'piket' || activeTab === 'praktikum' || activeTab === 'seminar') {
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
          {activeTab === 'seminar' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pembicara</label>
              <input
                type="text"
                name="presenter"
                value={formData.presenter || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Hari</label>
            <input
              type="text"
              name="day"
              value={formData.day || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              placeholder="Senin, Selasa, dll"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Waktu</label>
            <input
              type="text"
              name="time"
              value={formData.time || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
              placeholder="08:00 - 10:00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lokasi</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent"
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
              <p className="text-gray-400 text-sm">Selamat datang, {admin?.name}</p>
            </div>
            <Button
              variant="danger"
              icon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-dark-accent text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            {activeTab !== 'pengajuan' && (
              <Button
                variant="primary"
                icon={<Plus size={18} />}
                onClick={() => openModal('create')}
              >
                Tambah Data
              </Button>
            )}
          </div>

          {renderTable()}
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${modalMode === 'create' ? 'Tambah' : 'Edit'} ${tabs.find(t => t.id === activeTab)?.name}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {modalMode === 'create' ? 'Tambah' : 'Update'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
