<template>
    <div class="bg-gray-900 h-screen flex items-center justify-center">
        <div class="border rounded-2xl p-8 border-gray-700 bg-gray-800 text-white w-96 shadow-lg">
            <h1 class="text-center font-bold text-3xl border-b border-gray-600 pb-4 mb-6">Profilim</h1>
            
            <!-- E-mail Alanı (readonly) -->
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">E-mail</label>
                <input
                    v-model="email"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="email" placeholder="E-mail Giriniz" readonly>
            </div>

            <!-- Ad Soyad Alanı (readonly) -->
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Ad Soyad</label>
                <input
                    v-model="fullName"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="text" placeholder="Adı ve Soyadı" readonly>
            </div>

            <!-- Şifre Alanı -->
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Şifre</label>
                <input
                    v-model="password"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="password" placeholder="Şifrenizi Giriniz">
            </div>

            <!-- Şifreyi Tekrar Giriniz Alanı -->
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Şifreyi Tekrar Giriniz</label>
                <input
                    v-model="confirmPassword"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="password" placeholder="Şifrenizi Tekrar Giriniz">
            </div>

            <div class="w-full mt-6 flex flex-col gap-3">
                <button 
                    @click="updateProfile"
                    class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">
                    Profilimi Güncelle
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const firstname = ref('');
const lastname = ref('');
const fullName = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

// Kullanıcının bilgilerini localStorage'dan alabiliriz ya da başka bir API'den alabiliriz
const getUserData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const parsedData = JSON.parse(userData);
        email.value = parsedData.email; // E-mail'i otomatik olarak doldur
        fullName.value = parsedData.firstName + ' ' + parsedData.lastName; // Ad Soyad'ı otomatik olarak doldur
    }
};

// Profil güncelleme işlemi
const updateProfile = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Şifreler uyuşmuyor!');
        return;
    }

    try {
        // Kullanıcının ID'si localStorage'dan alınabilir
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = userData.id; // Kullanıcı ID'si

        if (!userId) {
            alert('Kullanıcı bulunamadı.');
            return;
        }

        // Güncellenen bilgileri hazırlıyoruz
        const updatedUser = {
            id: userId,
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
            password: password.value, // Şifreyi güncelliyoruz
        };

        // API'ye PUT isteği gönderiyoruz (JSON Server için örnek URL)
        const response = await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);

        if (response.status === 200) {
            // Güncellenen veriyi localStorage'da da güncelle
            localStorage.setItem('user', JSON.stringify(updatedUser));

            alert('Profiliniz başarıyla güncellenmiştir.');
            // Profil güncellendikten sonra home sayfasına yönlendirme yapılabilir
            router.push({ name: 'home' });
        }
    } catch (error) {
        console.error('Güncelleme sırasında bir hata oluştu:', error);
        alert('Bir hata oluştu.');
    }
};

// Sayfa yüklendiğinde kullanıcı bilgilerini al
onMounted(() => {
    const user = localStorage.getItem('user');
    if (!user) {
        router.push({ name: 'login' });  // Kullanıcı yoksa login sayfasına yönlendir
    }
    getUserData();
});
</script>
