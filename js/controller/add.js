document.getElementById('mahasiswaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const namalengkap = document.getElementById('namalengkap').value;
    const prodi = document.getElementById('prodi').value;
    const alamat = document.getElementById('alamat').value;
    const asalsekolah = document.getElementById('asalsekolah').value;

    const data = {
        namalengkap: namalengkap,
        prodi: prodi,
        alamat: alamat,
        asalsekolah: asalsekolah
    };

    fetch('https://pbo-tugasbesar-c553f4142173.herokuapp.com/api/mahasiswa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Data berhasil dikirim!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Gagal mengirim data.');
    });
});