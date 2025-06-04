<template>
    <div class="min-h-screen bg-[#0D0D0D] text-white">
        <header class="w-full bg-[#6D28D9] px-6 py-4 flex justify-between items-center shadow-md">
            <h1 class="text-xl font-bold">Lista de Usuários</h1>

            <div class="gap-4 flex relative">
                <NotificationPush />
                <LogoutUser />
            </div>
        </header>

        <main class="p-6">
            <NuxtPage />
        </main>
    </div>
</template>
