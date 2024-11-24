import { computed, Ref } from "vue"

/**
 * Type for the custom error handler. Handler comes from user
 */
export type ErrorHandler = (
	error: Error | string | null
) => string | null

/**
 * Generates a computed error status message
 *
 * @param error - Containing the error object
 * @param t - Translation function
 * @param errorHandler - Optional custom error handler
 * @returns Computed Ref for error status
 */
export function errorStatus(
	error: Ref<Error | string | null>,
	t: (key: string) => string,
	errorHandler?: ErrorHandler
) {
	return computed(() => {
		try {
			if (!error || !t) {
				console.warn("errorStatus: Missing required parameters.")
				return t("errStatus.missingParameters")
			}

			// Handle specific error cases
			if (error) {
				if (typeof error.value === "string") {
					if (error.value.includes("ETIMEDOUT")) {
						return t("errStatus.connectionTimedOut")
					} else if (error.value.includes("ECONNREFUSED")) {
						return t("errStatus.connectionRefused")
					} else if (error.value.includes("EREQERROR")) {
						return t("errStatus.requestErr")
					} else if (error.value.includes("403")) {
						return t("errStatus.403")
					} else if (error.value.includes("404")) {
						return t("errStatus.404")
					} else if (error.value.includes("500")) {
						return t("errStatus.500")
					} else if (error.value.includes("502")) {
						return t("errStatus.502")
					} else if (error.value.includes("503")) {
						return t("errStatus.503")
					} else if (error.value.includes("504")) {
						return t("errStatus.504")
					} else {
						if (errorHandler) {
							const customMessage = errorHandler(error.value)
							if (customMessage) return customMessage
						} else {
							return t("errStatus.defaultStatusError")
						}
					}
				} else if (error.value instanceof Error) {
					if (error.value.message.includes("ETIMEDOUT")) {
						return t("errStatus.connectionTimedOut")
					} else if (error.value.message.includes("ECONNREFUSED")) {
						return t("errStatus.connectionRefused")
					} else if (error.value.message.includes("EREQERROR")) {
						return t("errStatus.requestErr")
					} else if (error.value.message.includes("403")) {
						return t("errStatus.403")
					} else if (error.value.message.includes("404")) {
						return t("errStatus.404")
					} else if (error.value.message.includes("500")) {
						return t("errStatus.500")
					} else if (error.value.message.includes("502")) {
						return t("errStatus.502")
					} else if (error.value.message.includes("503")) {
						return t("errStatus.503")
					} else if (error.value.message.includes("504")) {
						return t("errStatus.504")
					} else {
						if (errorHandler) {
							const customMessage = errorHandler(error.value)
							if (customMessage) return customMessage
						} else {
							return t("errStatus.defaultStatusError")
						}
					}
				} else {
					return t("errStatus.defaultStatusError")
				}
			} else {
				return t("errStatus.defaultStatusError")
			}
		} catch (error) {
			console.error("Error in errorStatus function:", (error as Error)?.message)
			return t("errStatus.unexpectedError")
		}
	})
}
