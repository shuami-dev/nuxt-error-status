## Nuxt Response Error Status

A utility package to handle and display error statuses seamlessly in Nuxt 3 applications. This package provides a flexible `errorStatus` function to manage API response error handling with customizable options.

### Features

- Handles common HTTP error statuses like 403, 404, and network errors.
- Supports custom error handling through a `optErrorHandler` function.
- Fully typed with TypeScript for better developer experience.

### Installation

To install the package, run the following command:

```bash
npm install @shuami-dev/nuxt-error-status
```

### Usage

1. Import the `errorStatus` function into your Nuxt 3 page.
2. Use it with ref variables for error.
   Example

```vue
<script setup lang="ts">
	import { errorStatus } from "@shuami-dev/nuxt-error-status"
	import { useI18n } from "vue-i18n"

	const { t } = useI18n()
	const error = ref<Error | string | null>(null)

	/* Custom error handler (optional)
	 * default response errors in @shuami-dev/nuxt-error-status are =>
	 * "403", "404", "415", "500", "502", "503", "504",
	 * "ETIMEDOUT", "ECONNREFUSED", "EREQERROR"
	 */
	const optErrorHandler = (error: Error | string | null) => {
		if (
			(typeof error === "string" && error.includes("415")) ||
			(error instanceof Error && error.message.includes("415"))
		) {
			return t("err.415")
		}

		return null
	}

	// Get HTTP error
	const err = errorStatus(error, t, optErrorHandler)

	const fetchData = async () => {
    const response = await $fetch("/api/your-api")

		if (response.err) {
			error.value = new Error(`${response.err}`)
		} else {
			result.value = response
		}
	}
</script>

<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <p v-if="err">{{ err }}</p>
    <p v-else>{{ result }}</p>
  </div>
</template>
```

   In your server/api/your_post.ts

```ts
...
...

export default defineEventHandler(async (e) => {
	const params = {
		id: "your-id",
	}

	let data = null
	const url = "http://your-endpoint"

	try {
		const result = await axios.post(url, params)

		data = result.data
	} catch (error: any) {
		if (error.response) {
			data = { err: (error as Error)?.message }
		} else if (error.request) {
			data = { err: "EREQERROR"}
		} else {
			data = { err: (error as Error)?.message }
		}
	}

	return data
})
```

### Api Reference

`errorStatus` returns a computed value based on the error.

Parameters:

- error: Ref<Error | string | null> - The error object or message.
- t: (key: string) => string - A translation function to map keys to messages.
- errorHandler?: ErrorHandler - (Optional) A custom error handler function.

### Default response errors

- 403, 404, 415, 500, 502, 503, 504
- ETIMEDOUT, ECONNREFUSED, EREQERROR

### Default ranslation json (english)

Add this in your translation file

```json
"err": {
    "missingParameters": "An internal error occurred. Missing parameters.",
    "unexpectedError": "An unexpected error occurred. Please contact helpdesk.",
    "connectionRefused": "Unable to connect to the server. Please try again later.",
    "connectionTimedOut": "Failed to process request in time. Please try again later.",
    "requestErr": "No response received from server. Please try again later.",
    "defaultStatusError": "An error occurred while fetching data.",
    "403": "You are not authorized to access this application.",
    "404": "The requested resource was not found.",
    "415": "The server refused to accept the request because the message content format is not supported.",
    "500": "Internal server error. Please try again later.",
    "502": "The server was unable to complete your request. Please try again later.",
    "503": "Service unavailable. Please try again later.",
    "504": "The server did not respond in time. Please try again later."
  }
```
