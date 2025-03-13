<template>
    <div class=" bg-gray-900 h-screen flex items-center justify-center">
        <div class="border rounded-2xl p-8 border-gray-700 bg-gray-800 text-white w-96  shadow-lg">
            <H1 class="text-center font-bold text-3xl border-b border-gray-600 pb-4 mb-6 ">Profilim</H1>
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">E-mail</label>
                <input
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="email" placeholder="E-mail Giriniz">
            </div>
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Ad Soyad</label>
                <input type="text"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Adı ve Soyadı">
            </div>
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Şifre</label>
                <input
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="password" placeholder="Şifrenizi Giriniz">
            </div>
            <div class="mt-4">
                <label class="text-gray-300 text-sm mb-1 block">Şifreyi Tekrar Giriniz</label>
                <input
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="password" placeholder="Şifrenizi Tekrar Giriniz">
            </div>
            <div class="w-full mt-6 flex flex-col gap-3">
                <button class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">
                    Profilimi Güncelle
                </button>
            </div>
        </div>
    </div>
</template>