<template>
    <div class="flex flex-col md:flex-row h-screen bg-[#0D0D0D] text-white">
        <div
            class="hidden md:flex w-full md:w-1/2 items-center justify-center bg-[#1E1B4B] px-8"
        >
            <img
                src="/login.webp"
                alt="Imagem login"
                class="w-[500px] max-w-full object-contain"
            />
        </div>

        <div class="w-full md:w-1/2 flex flex-col h-screen bg-[#0D0D0D]">
            <div
                class="flex-1 overflow-y-auto p-8 flex flex-col justify-center"
            >
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
