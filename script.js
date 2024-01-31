document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById("seats-container");
    const loginForm = document.getElementById("login-form");

    function showSeats() {
        loginForm.style.display = "none";
        seatsContainer.style.display = "flex";

        // Hapus semua elemen kursi sebelum membuat kursi baru
        seatsContainer.innerHTML = '';

        // Membuat kursi bioskop awal
        const rows = ['A', 'B', 'C', 'D', 'E',];
        for (let row of rows) {
            for (let i = 1; i <= 6; i++) {
                createSeat(row + i);
            }
        }
    }

    // Fungsi untuk membuat elemen kursi bioskop
    function createSeat(seatNumber) {
        const seat = document.createElement("div");
        seat.className = "seat empty";
        seat.textContent = "Seat " + seatNumber;

        // Menambahkan event listener untuk memilih atau mengosongkan kursi
        seat.addEventListener("click", function () {
            const role = localStorage.getItem("role");

            if (role === "admin") {
                if (seat.classList.contains("empty")) {
                    reserveSeat(seat);
                } else {
                    emptySeat(seat);
                }
            } else {
                reserveSeat(seat);
            }
        });

        seatsContainer.appendChild(seat);
    }

    // Fungsi untuk mereservasi kursi
    function reserveSeat(seat) {
        seat.classList.remove("empty");
        seat.classList.add("occupied");
        alert("Seat " + seat.textContent + " berhasil direservasi!");
    }

    // Fungsi untuk mengosongkan kursi
    function emptySeat(seat) {
        seat.classList.remove("occupied");
        seat.classList.add("empty");
        alert("Seat " + seat.textContent + " berhasil dikosongkan!");
    }

    // Fungsi untuk login
    window.login = function () {
        const role = document.getElementById("role").value;
        localStorage.setItem("role", role);
        showSeats();
    };

    // Cek apakah sudah login sebelumnya
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
        showSeats();
    }
});

function backToRoleSelection() {
    document.getElementById("seats-container").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}