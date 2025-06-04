export const useAlert = () => {
    const { add } = useToast()

    const alertSucess = async (message: string) => add({ color: "success", description: message })

    const alertError = (error: string) => add({ color: "error", description: error })

    const alertWarn = (message: string) => add({ color: "warning", description: message })

    return {
        alertSucess,
        alertError,
        alertWarn,
    }
}
