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
	const error = ref<Error | string | null | undefined>(null)

	// Custom error handler (optional)
	const optErrorHandler = (error: Error | string | null | undefined) => {
		if (
			(typeof error === "string" && error.includes("415")) ||
			(error instanceof Error && error.message.includes("415"))
		) {
			return t("errStatus.415")
		}

		return null
	}

	// Get HTTP error
	const err = errorStatus(error, t, optErrorHandler)

	const fetchData = async () => {
		const response = await $fetch("/api/your-api")

		if (!response || response.err) {
			error.value = response.err
					? new Error(`${response.err}`)
					: undefined
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
    if (!error.response) {
			data = { err: "NORESPONSE" }
		} else if (error.response) {
			data = { err: error.response.status }
		} else if (error.request) {
			data = { err: error.response.request }
		} else if (error.code) {
			data = { err: error.code }
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

- **error**: Ref<Error | string | null | undefined> - The error object or message.
- **t**: (key: string) => string - A translation function to map keys to messages.
- **errorHandler?**: ErrorHandler - (Optional) A custom error handler function.

### Default response errors

- 400, 401, 403, 404, 429, 500, 502, 503, 504
- NORESPONSE, ETIMEDOUT, ECONNREFUSED, EREQERROR, ECONNABORTED, ENOTFOUND

### Default translation json (english)

Add this in your translation file

```json
"errStatus": {
  "missingParameters": "An internal error occurred. Missing parameters.",
  "unexpectedError": "An unexpected error occurred. Please contact helpdesk.",
  "connectionRefused": "Unable to connect to the server. Please try again later.",
  "connectionTimedOut": "Failed to process request in time. Please try again later.",
  "requestErr": "No response received from server. Please try again later.",
  "noResponse": "No response received from the server.",
  "connAbort": "Request time out. Please try again later.",
  "notFound": "Network error. Server not found.",
  "defaultStatusError": "An error occurred while fetching data.",
  "400": "Bad Request: The server could not understand the request due to invalid syntax.",
  "401": "Unauthorized: Authentication is required and has failed or not been provided.",
  "403": "You are not authorized to access this application.",
  "404": "The requested resource was not found.",
  "415": "The server refused to accept the request because the message content format is not supported.",
  "429": "Too Many Requests: The user has sent too many requests in a given time.",
  "500": "Internal server error. Please try again later.",
  "502": "The server was unable to complete your request. Please try again later.",
  "503": "Service unavailable. Please try again later.",
  "504": "The server did not respond in time. Please try again later."
}
```
