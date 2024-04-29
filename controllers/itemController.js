const {
    WithoutParams,
    WithParams
} = require('../utils/query');

const itemController = {
    // Fungsi untuk mendapatkan semua item
    getAllItems: async (req, res) => {
        try {
            const items = await WithoutParams('SELECT * FROM mahasiswa');
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Fungsi untuk mendapatkan item berdasarkan ID
    getItemById: async (req, res) => {
        try {
            const item = await WithParams('SELECT * FROM mahasiswa WHERE nim = ?', req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Fungsi untuk membuat item baru
    createItem: async (req, res) => {
        try {
            const { nim, nama, angkatan, jurusan, alamat } = req.body;
            const savedItem = await WithParams(
                'INSERT INTO mahasiswa (nim, nama_mhs, angkatan, jurusan, alamat) VALUES (?, ?, ?, ?, ?)',
                [+nim, nama, angkatan, jurusan, alamat]
            );

            if(!savedItem) {
                return res.status(400).json({ message: 'Failed to save item' });
            }
            
            res.status(201).json({ message: 'Item saved' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Fungsi untuk mengupdate item berdasarkan ID
    updateItem: async (req, res) => {
        try {
            const { nama, angkatan, jurusan, alamat } = req.body;
            const { nim } = req.params;

            const updatedItem = await WithParams(
                'UPDATE mahasiswa SET nama_mhs = ?, angkatan = ?, jurusan = ?, alamat = ? WHERE nim = ?',
                [nama, angkatan, jurusan, alamat, nim]
            );
            
            if (!updatedItem) {
                res.status(404).json({ message: 'Item not found' });
            }
            res.json({ message: 'Item updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Fungsi untuk menghapus item berdasarkan ID
    deleteItem: async (req, res) => {
        try {
            const deletedItem = await WithParams('DELETE FROM mahasiswa WHERE nim = ?', req.params.id);
            if (deletedItem) {
                res.json({ message: 'Item deleted' });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// Export controller
module.exports = itemController;