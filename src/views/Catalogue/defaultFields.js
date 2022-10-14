import {computed, ref} from "vue";

export function useFilteredCards(cards) {
    return computed(() => {
        const cardsCopy = JSON.parse(JSON.stringify(cards.value))

        switch (filter.value) {
            case "min":
                return cardsCopy.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1)
            case "max":
                return cardsCopy.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1)
            case "default":
            default:
                return cardsCopy
        }
    })
}

export const dropdownParams = [
    {label: 'По умолчанию', key: 'default'},
    {label: 'Мин. цена', key: 'min'},
    {label: 'Макс. цена', key: 'max'},
]

export const filter = ref("")