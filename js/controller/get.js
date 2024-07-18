document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://pbo-tugasbesar-9b0df08c0d9c.herokuapp.com/api/mahasiswa';

    function fetchDataAndRender() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const mahasiswa = data.data;
                const tableBody = document.getElementById('mahasiswa-body');
                tableBody.innerHTML = ''; // Clear existing table rows

                mahasiswa.forEach(mhs => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${mhs.namalengkap}</td>
                        <td>${mhs.prodi}</td>
                        <td>${mhs.alamat}</td>
                        <td>${mhs.asalsekolah}</td>
                        <td>
                            <button class="delete-btn" data-userid="${mhs.userid}">Hapus</button>
                            <a href="formEdit.html?id=${mhs.userid}">
                                <button class="edit-btn">Edit</button>
                            </a>
                        </td>
                    `;
                    tableBody.appendChild(row);

                    // Add event listener to delete button
                    const deleteButton = row.querySelector('.delete-btn');
                    deleteButton.addEventListener('click', function() {
                        const userId = deleteButton.getAttribute('data-userid');
                        deleteMahasiswa(userId);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    fetchDataAndRender();

    function deleteMahasiswa(userId) {
        const deleteUrl = `${apiUrl}/${userId}`;

        fetch(deleteUrl, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Jika berhasil dihapus, ambil ulang data dan render kembali
                fetchDataAndRender();
            } else {
                console.error('Failed to delete:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });
    }
});
