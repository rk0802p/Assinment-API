# RemindMe API

A simple Node.js/Express API to store time-bound messages.

---

## Overview

The **RemindMe API** provides a straightforward way to store messages associated with a specific date and time. It exposes a single **POST** endpoint `/api/messages` to save your reminders to an **SQLite database**.

---

## Installation

Getting started with the RemindMe API is quick and easy.

### Clone the Repository

First, clone the project from GitHub:

```bash
git clone https://github.com/rk0802p/Assinment-API
```

### Install Dependencies

Navigate into the cloned directory and install the necessary Node.js packages:

```bash
cd Assinment-API
npm init -y
npm install express sqlite3
```

---

## Running the Server

To start the API server, run the following command:

```bash
node server.js
```

The server will be accessible at `http://localhost:3000`.

---

## Testing with Postman

You can easily test the API using Postman or any other API client.

### Setup Request

Configure your **POST** request as follows:

* **Method:** `POST`
* **URL:** `http://localhost:3000/api/messages`
* **Header:**
    * `Content-Type`: `application/json`
* **Body (JSON):**

    ```json
    {
      "date": "2025-05-23",
      "time": "12:45:00",
      "message": "Test message"
    }
    ```

### Send Request

Click **"Send"** in Postman to dispatch the request.

### Success Output

A successful request will return a `201 Created` status with the saved message details, including its new `id`:

```json
{
  "id": 1,
  "date": "2025-05-23",
  "time": "12:45:00",
  "message": "Test message"
}
```

### Error Outputs

The API provides clear error messages for common issues:

* **Missing Fields (Status: 400 Bad Request):**

    ```json
    {
      "error": "Missing required fields: date, time, message"
    }
    ```

* **Invalid JSON (Status: 400 Bad Request):**

    ```json
    {
      "error": "Request body is missing or invalid"
    }
    ```

* **Database Error (Status: 500 Internal Server Error):**

    ```json
    {
      "error": "Failed to save message"
    }
    ```

---

## Important Notes

* Always ensure your requests include the header `Content-Type: application/json`.
* Check your server logs (`node server.js` output) for detailed error messages, especially if you see "Request Body: undefined".

---