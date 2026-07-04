# Travlr Getaways

Source: CS 465 Full Stack Application Development

The Travlr Getaways project creates a functional travel booking website using the MEAN stack. Its primary function is to securely store trip data in MongoDB, serve it via Node and Express APIs, and allow administrators to dynamically manage, update, and display vacation packages through a single-page Angular dashboard.

## High-Level Application Flow

```mermaid
flowchart LR
    U[Traveler] --> W[Public Website]
    A[Administrator] --> D[Angular Admin Dashboard SPA]

    W --> API[Node + Express API Layer]
    D --> API

    API --> Auth[Authentication + Authorization]
    API --> Trips[Trip Management Logic]

    Auth --> DB[(MongoDB)]
    Trips --> DB

    DB --> API
    API --> W
    API --> D
```
