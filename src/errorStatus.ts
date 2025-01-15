import { computed, Ref } from "vue"

/**
 * Type for the custom error handler. Handler comes from user
 */
export type ErrorHandler = (
	error: Error | string | null | undefined
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
	error: Ref<Error | string | null | undefined>,
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
				// if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("NORESPONSE")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("NORESPONSE"))
				// ) {
				// 	return t("errStatus.noResponse")
				// } else if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("ETIMEDOUT")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("ETIMEDOUT"))
				// ) {
				// 	return t("errStatus.connectionTimedOut")
				// } else if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("ECONNREFUSED")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("ECONNREFUSED"))
				// ) {
				// 	return t("errStatus.connectionRefused")
				// } else if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("EREQERROR")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("EREQERROR"))
				// ) {
				// 	return t("errStatus.requestErr")
				// } else if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("ECONNABORTED")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("ECONNABORTED"))
				// ) {
				// 	return t("errStatus.connAbort")
				// } else if (
				// 	(typeof error.value === "string" &&
				// 		error.value.includes("ENOTFOUND")) ||
				// 	(error.value instanceof Error &&
				// 		error.value.message.includes("ENOTFOUND"))
				// ) {
				// 	return t("errStatus.notFound")
				// } else

				if (
					(typeof error.value === "string" &&
						error.value.includes("aborted")) ||
					(error.value instanceof Error &&
						error.value.message.includes("aborted"))
				) {
					return t("errStatus.abortError")
				} else if (
					(typeof error.value === "string" && error.value.includes("invalidNonce")) ||
					(error.value instanceof Error && error.value.message.includes("invalidNonce"))
				) {
					return t("errStatus.invalidNonce")
				} else if (
					(typeof error.value === "string" && error.value.includes("400")) ||
					(error.value instanceof Error && error.value.message.includes("400"))
				) {
					return t("errStatus.400")
				} else if (
					(typeof error.value === "string" && error.value.includes("401")) ||
					(error.value instanceof Error && error.value.message.includes("401"))
				) {
					return t("errStatus.401")
				} else if (
					(typeof error.value === "string" && error.value.includes("403")) ||
					(error.value instanceof Error && error.value.message.includes("403"))
				) {
					return t("errStatus.403")
				} else if (
					(typeof error.value === "string" && error.value.includes("404")) ||
					(error.value instanceof Error && error.value.message.includes("404"))
				) {
					return t("errStatus.404")
				} else if (
					(typeof error.value === "string" && error.value.includes("429")) ||
					(error.value instanceof Error && error.value.message.includes("429"))
				) {
					return t("errStatus.429")
				} else if (
					(typeof error.value === "string" && error.value.includes("500")) ||
					(error.value instanceof Error && error.value.message.includes("500"))
				) {
					return t("errStatus.500")
				} else if (
					(typeof error.value === "string" && error.value.includes("502")) ||
					(error.value instanceof Error && error.value.message.includes("502"))
				) {
					return t("errStatus.502")
				} else if (
					(typeof error.value === "string" && error.value.includes("503")) ||
					(error.value instanceof Error && error.value.message.includes("503"))
				) {
					return t("errStatus.503")
				} else if (
					(typeof error.value === "string" && error.value.includes("504")) ||
					(error.value instanceof Error && error.value.message.includes("504"))
				) {
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
		} catch (error) {
			console.error("Error in errorStatus function:", (error as Error)?.message)
			return t("errStatus.unexpectedError")
		}
	})
}
