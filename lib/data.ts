export interface JobDetail {
  id: string;
  jurusan: string;
  daerah: string;
  bulan: string;
  tahun: number;
  slug: string;
  title: string;
  thumbnail: string;
  university: string;
  description: string;
  qualificationIntro: string;
  qualifications: string[];
  applyEmail: string;
}

export interface Jurusan {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  items: JobDetail[];
}

export const DATA_JURUSAN: Jurusan[] = [
  {
    id: "1",
    name: "Manajemen",
    slug: "manajemen",
    thumbnail: "/img/manajemen.png",
    description: "Informasi lowongan dosen manajemen terbaru di berbagai kota dan provinsi di Indonesia.",
    items: [
      {
        id: "m1",
        jurusan: "manajemen",
        daerah: "Semarang",
        bulan: "April",
        tahun: 2026,
        slug: "semarang-april-2026",
        title: "Loker Dosen Manajemen Semarang April 2026",
        university: "Universitas Negeri Semarang",
        thumbnail: "/img/campus.png",
        description: "Universitas di Semarang membuka lowongan dosen manajemen untuk periode April 2026. Posisi ini ditujukan bagi kandidat yang memiliki kemampuan mengajar, komunikasi, dan latar belakang pendidikan sesuai bidang.",
        qualificationIntro: "Pelamar diharapkan memenuhi beberapa persyaratan berikut.",
        qualifications: [
          "Pendidikan minimal S2 Manajemen",
          "Memiliki pengalaman mengajar lebih disukai",
          "Mampu mengoperasikan komputer dan aplikasi perkantoran",
          "Memiliki kemampuan komunikasi yang baik",
          "Bersedia ditempatkan di Semarang"
        ],
        applyEmail: "hrd@stekom.ac.id"
      },
      {
        id: "m2",
        jurusan: "manajemen",
        daerah: "Bandung",
        bulan: "April",
        tahun: 2026,
        slug: "bandung-april-2026",
        title: "Loker Dosen Manajemen Bandung April 2026",
        university: "Universitas Padjadjaran",
        thumbnail: "/img/campus_2.png",
        description: "Universitas Padjadjaran membuka kesempatan berkarir sebagai dosen tetap Manajemen bagi lulusan S2/S3 yang berdedikasi.",
        qualificationIntro: "Kualifikasi dan persyaratan umum:",
        qualifications: [
          "Lulusan S2/S3 Manajemen dari PTN terkemuka",
          "IPK Minimal 3.50",
          "Sertifikasi TOEFL minimal 550",
          "Publikasi ilmiah terindeks Scopus menjadi nilai tambah"
        ],
        applyEmail: "rekruitmen@unpad.ac.id"
      },
      {
        id: "m3",
        jurusan: "manajemen",
        daerah: "Surabaya",
        bulan: "April",
        tahun: 2026,
        slug: "surabaya-april-2026",
        title: "Loker Dosen Manajemen Surabaya April 2026",
        university: "Universitas Airlangga",
        thumbnail: "/img/campus.png",
        description: "Fakultas Ekonomi dan Bisnis UNAIR membuka lowongan dosen tetap Manajemen Pemasaran.",
        qualificationIntro: "Kriteria pelamar:",
        qualifications: [
          "Lulusan S3 Manajemen",
          "Memiliki NIDN menjadi nilai tambah",
          "Bersedia melaksanakan Tri Dharma Perguruan Tinggi"
        ],
        applyEmail: "sdm@unair.ac.id"
      }
    ]
  },
  {
    id: "2",
    name: "Hukum",
    slug: "hukum",
    thumbnail: "/img/hukum.png",
    description: "Informasi lowongan dosen hukum terbaru di berbagai kota dan provinsi di Indonesia.",
    items: [
      {
        id: "h1",
        jurusan: "hukum",
        daerah: "Bandung",
        bulan: "Mei",
        tahun: 2026,
        slug: "bandung-mei-2026",
        title: "Loker Dosen Hukum Bandung Mei 2026",
        university: "Universitas Katolik Parahyangan",
        thumbnail: "/img/campus_2.png",
        description: "Fakultas Hukum UNPAR mencari dosen penuh waktu untuk bidang Hukum Perdata dan Hukum Pidana.",
        qualificationIntro: "Persyaratan:",
        qualifications: [
            "Pendidikan S2/S3 Hukum",
            "Mampu mengajar dalam bahasa Inggris",
            "Memiliki pengalaman praktik hukum diutamakan"
        ],
        applyEmail: "hrd@unpar.ac.id"
      },
      {
        id: "h2",
        jurusan: "hukum",
        daerah: "Surabaya",
        bulan: "Mei",
        tahun: 2026,
        slug: "surabaya-mei-2026",
        title: "Loker Dosen Hukum Surabaya Mei 2026",
        university: "Universitas Surabaya",
        thumbnail: "/img/campus_3.png",
        description: "UBAYA membuka lowongan dosen hukum internasional untuk penguatan riset global.",
        qualificationIntro: "Syarat utama:",
        qualifications: [
            "S2/S3 Hukum Internasional",
            "Fasih bahasa Inggris lisan & tulisan",
            "Memiliki networking internasional"
        ],
        applyEmail: "recruitment@ubaya.ac.id"
      }
    ]
  },
  {
    id: "3",
    name: "Teknik Informatika",
    slug: "teknik-informatika",
    thumbnail: "/img/informatika.png",
    description: "Informasi lowongan dosen teknik informatika terbaru untuk berbagai jurusan dan daerah di Indonesia.",
    items: [
      {
        id: "ti1",
        jurusan: "teknik-informatika",
        daerah: "Yogyakarta",
        bulan: "April",
        tahun: 2026,
        slug: "yogyakarta-april-2026",
        title: "Loker Dosen Teknik Informatika Yogyakarta April 2026",
        university: "Universitas Gadjah Mada",
        thumbnail: "/img/campus.png",
        description: "Departemen TEDI UGM membuka lowongan dosen untuk riset kecerdasan buatan dan keamanan siber.",
        qualificationIntro: "Kriteria pelamar:",
        qualifications: [
            "Lulusan S3 Ilmu Komputer/Teknik Informatika",
            "Memiliki H-index publikasi yang baik",
            "Mampu membimbing mahasiswa S2/S3"
        ],
        applyEmail: "sdm@ugm.ac.id"
      },
      {
        id: "ti2",
        jurusan: "teknik-informatika",
        daerah: "Semarang",
        bulan: "Mei",
        tahun: 2026,
        slug: "semarang-mei-2026",
        title: "Loker Dosen Teknik Informatika Semarang Mei 2026",
        university: "Universitas Diponegoro",
        thumbnail: "/img/campus_3.png",
        description: "UNDIP mencari talenta muda untuk posisi dosen Teknik Informatika.",
        qualificationIntro: "Persyaratan:",
        qualifications: [
            "Lulusan S2/S3 Linear",
            "IPK Minimal 3.25",
            "Inovatif dan mampu bekerja sama"
        ],
        applyEmail: "kepegawaian@undip.ac.id"
      }
    ]
  },
  {
    id: "4",
    name: "Akuntansi",
    slug: "akuntansi",
    thumbnail: "/img/akuntansi.png",
    description: "Temukan lowongan dosen akuntansi terbaru untuk berbagai universitas di Indonesia.",
    items: [
      {
        id: "ak1",
        jurusan: "akuntansi",
        daerah: "Jakarta",
        bulan: "April",
        tahun: 2026,
        slug: "jakarta-april-2026",
        title: "Loker Dosen Akuntansi Jakarta April 2026",
        university: "Universitas Indonesia",
        thumbnail: "/img/akuntansi_job.png",
        description: "FEB UI mencari kandidat dosen Akuntansi Keuangan.",
        qualificationIntro: "Kualifikasi:",
        qualifications: [
            "S2/S3 Akuntansi",
            "Gelar CA/CPA menjadi nilai tambah",
            "Bersedia mengajar di kampus Depok/Salemba"
        ],
        applyEmail: "recruitment.feb@ui.ac.id"
      }
    ]
  },
  {
    id: "5",
    name: "Psikologi",
    slug: "psikologi",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    description: "Daftar lowongan dosen psikologi untuk penguatan fakultas psikologi di berbagai daerah.",
    items: [
      {
        id: "ps1",
        jurusan: "psikologi",
        daerah: "Yogyakarta",
        bulan: "Mei",
        tahun: 2026,
        slug: "yogyakarta-mei-2026",
        title: "Loker Dosen Psikologi Yogyakarta Mei 2026",
        university: "Universitas Negeri Yogyakarta",
        thumbnail: "/img/campus_2.png",
        description: "UNY membuka kesempatan bagi lulusan Psikologi Pendidikan.",
        qualificationIntro: "Persyaratan:",
        qualifications: [
            "S2 Psikologi Profesi",
            "Memiliki SIPP aktif",
            "Berdedikasi tinggi dalam pendidikan"
        ],
        applyEmail: "hrd@uny.ac.id"
      }
    ]
  }
];
