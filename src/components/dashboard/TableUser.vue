<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { upperFirst } from "scule";

import type { TableColumn } from "@nuxt/ui";

const table = useTemplateRef("table");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const tableUsersStore = useTableUsersStore();
const editUserStore = useEditUserStore();

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
        header: "Data Criação",
        cell: ({ row }) => {
            return new Date(row.getValue("date")).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
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
                        await editUserStore.openModal(String(row.original.id));
                    },
                },
                {
                    label: "Excluir",
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
            <UPagination
                v-model="tableUsersStore.page"
                color="neutral"
                variant="soft"
                :page-count="
                    Math.ceil(
                        tableUsersStore.users.length / tableUsersStore.pageSize,
                    )
                "
                class="text-white"
            />
            <DashboardModalEditUser />
        </div>
    </div>
</template>
