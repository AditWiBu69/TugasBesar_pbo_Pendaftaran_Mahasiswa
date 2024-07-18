var currentURL = window.location.href;

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var idValue = getParameterByName('id', currentURL);

document.getElementById('mahasiswaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const namalengkap = document.getElementById('namalengkap').value;
    const prodi = document.getElementById('prodi').value;
    const alamat = document.getElementById('alamat').value;
    const asalsekolah = document.getElementById('asalsekolah').value;

    const data = {
        userid: idValue,
        namalengkap: namalengkap,
        prodi: prodi,
        alamat: alamat,
        asalsekolah: asalsekolah
    };

    fetch('https://pbo-tugasbesar-9b0df08c0d9c.herokuapp.com/api/mahasiswa/' + idValue, {
        method: 'PUT',
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
