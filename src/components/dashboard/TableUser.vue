<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { upperFirst } from "scule";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { TableColumn } from "@nuxt/ui";

const table = useTemplateRef("table");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const tableUsersStore = useTableUsersStore();
const editUserStore = useEditUserStore();
const signupStore = useSignupStore();

const columns: TableColumn<Partial<UserType>>[] = [
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => `${row.getValue("name")}`,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();

            return h(UButton, {
                color: "neutral",
                variant: "ghost",
                label: "Email",
                icon: isSorted
                    ? isSorted === "asc"
                        ? "i-lucide-arrow-up-narrow-wide"
                        : "i-lucide-arrow-down-wide-narrow"
                    : "i-lucide-arrow-up-down",
                class: "-mx-2.5",
                onClick: () =>
                    column.toggleSorting(column.getIsSorted() === "asc"),
            });
        },
        cell: ({ row }) =>
            h("div", { class: "lowercase" }, row.getValue("email")),
    },
    {
        accessorKey: "createdAt",
        header: "Data criação",
        cell: ({ row }) => {
            const raw = row.getValue("createdAt");
            const date = new Date(String(raw));
            return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const items = [
                {
                    type: "label",
                    label: "Ações",
                },
                {
                    label: "Editar",
                    async onSelect() {
                        await editUserStore.openModalEdit(
                            String(row.original.id),
                        );
                    },
                },
                {
                    label: "Excluir",
                    async onSelect() {
                        await editUserStore.openModalDelete(
                            String(row.original.id),
                        );
                    },
                },
            ];

            return h(
                "div",
                { class: "text-right" },
                h(
                    UDropdownMenu,
                    {
                        content: {
                            align: "end",
                        },
                        items,
                        "aria-label": "Actions dropdown",
                    },
                    () =>
                        h(UButton, {
                            icon: "i-lucide-ellipsis-vertical",
                            color: "neutral",
                            variant: "ghost",
                            class: "ml-auto",
                            "aria-label": "Actions dropdown",
                        }),
                ),
            );
        },
    },
];
</script>

<template>
    <div class="flex-1 divide-y divide-accented w-full">
        <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
            <UDropdownMenu
                :items="
                    table?.tableApi
                        ?.getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => ({
                            label: upperFirst(column.id),
                            type: 'checkbox' as const,
                            checked: column.getIsVisible(),
                            onUpdateChecked(checked: boolean) {
                                table?.tableApi
                                    ?.getColumn(column.id)
                                    ?.toggleVisibility(!!checked);
                            },
                            onSelect(e?: Event) {
                                e?.preventDefault();
                            },
                        }))
                "
                :content="{ align: 'end' }"
            >
                <UButton
                    label="Columns"
                    color="neutral"
                    variant="outline"
                    trailing-icon="i-lucide-chevron-down"
                    class="ml-auto"
                    aria-label="Columns select dropdown"
                />
            </UDropdownMenu>
            <UButton
                label="Novo usuário"
                class="bg-[#FF7F11] hover:bg-[#e56e00] text-white rounded-lg px-4 py-2"
                variant="solid"
                @click="signupStore.openDialog"
            />
        </div>

        <UTable
            ref="table"
            :loading="tableUsersStore.loadingUsers"
            :data="tableUsersStore.users"
            :columns="columns"
            sticky
            class="h-96"
        >
            <template #expanded="{ row }">
                <pre>{{ row.original }}</pre>
            </template>
        </UTable>
        <div class="flex justify-center mt-4">
            <DashboardModalEditUser />
            <DashboardModalDeleteUser />
            <DashboardModalNewUser />
        </div>
    </div>
</template>
