## Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

### 1. Server-Side Rendering (Express + Handlebars)

The customer-facing site is rendered using Express with Handlebars templates. In this approach:

* The server generates full HTML pages.
* Each request results in a complete page reload.
* Rendering occurs on the server before content is delivered to the browser.

**Advantages:**

* SEO-friendly
* Simpler initial load logic
* Clear separation of route handling

**Limitations:**

* Full page reloads reduce interactivity
* Less dynamic user experience

### 2. Angular Single Page Application (SPA)

The admin interface is built using Angular as a client-side SPA. In this architecture:

* The application loads once.
* Routing is handled client-side.
* Components dynamically update within the `router-outlet`.
* HTTP requests retrieve JSON data from REST endpoints.

**Advantages:**

* Faster user interactions
* No full page reloads
* Better state management
* Reactive forms with client-side validation
* Reusable components

**Limitations:**

* entire application is bundled and sent to client
* doesn't work with older browsers

## Why did the backend use a NoSQL MongoDB database?

Unlike relational databases, MongoDB stores data in collections of documents rather than rows and tables. This flexibility makes it easy to develop quick POCs and helps adapt to evolving application requirements.

## How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?

JSON (JavaScript Object Notation) is a data interchange format that stores only key-value pairs and cannot contain functions or executable logic. JavaScript is a full programming language that supports functions, variables, logic, and execution. JSON acts as the communication bridge between the Angular frontend, Express/Node backend, and MongoDB database. The frontend sends JSON in requests, the backend processes it and interacts with MongoDB, and the server returns JSON that Angular binds to the UI.

## Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

### 1. Separating API Routes from Server Routes

The backend was reorganized into:

* `app_server` (customer-facing routes and views)
* `app_api` (REST endpoints)

**Benefit:** Clear separation of concerns and improved maintainability.

### 2. Implementing a JWT Interceptor

An Angular HTTP interceptor was added to automatically attach the Authorization header to outgoing API requests.

**Benefit:**

* Centralized authentication logic
* Reduced duplicated code
* Improved security enforcement


### 3. Creating Reusable UI Components

Reusable components such as:

* `trip-card`
* `trip-listing`
* `navbar`

were implemented.

**Benefits of Reusable UI Components:**

* Reduced duplicated markup
* Easier updates
* Consistent design
* Improved scalability
* Faster development of new features

## Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.


Each API endpoint corresponds to an HTTP method:

* **GET** – Retrieve data
* **POST** – Create new resources
* **PUT** – Update existing resources
* **DELETE** – Remove resources

Endpoints such as:

* `/api/trips`
* `/api/trips/:tripCode`
* `/api/login`
* `/api/register`

were tested using the browser’s Network tab and verified for correct response codes and returned JSON objects.


## Security Testing with JWT Authentication

After implementing authentication:

* Protected endpoints required a valid JWT.
* Unauthorized requests returned HTTP 401.
* Logging out removed access to admin-only functionality.
* The JWT interceptor ensured tokens were attached automatically.

Testing with authentication introduced complexity because:

* Requests must include valid headers.
* Expired tokens must be handled properly.
* Frontend behavior must adjust based on authentication state.

This reinforced the importance of securing backend routes and validating credentials before granting access to administrative functionality.

## How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course strengthened my full stack engneering skills by working with frontend, backend, database, and security technologies in a single, end to end project. Throughout the course, I'ved developed abilities in REST API design, Angular SPAs, MongoDB with Mongoose, JWT authentication, debugging, and endpoint testing. This course has given me practical experience connecting all application layers, making me a more confident and marketable candidate for full stack development roles.

